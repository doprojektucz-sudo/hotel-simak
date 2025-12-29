"use server";

import { Resend } from "resend";
import { HotelNotificationEmail, CustomerConfirmationEmail } from "./email-templates";
import { verifyRecaptcha } from "./verifyRecaptcha";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    recaptchaToken: string;
}

const subjectMap: Record<string, string> = {
    ubytovani: "Rezervace ubytování",
    restaurace: "Rezervace stolu v restauraci",
    akce: "Poptávka akce/oslavy",
    chata: "Rezervace chaty Milunda",
    jine: "Jiný dotaz",
};

export async function sendContactEmail(formData: ContactFormData) {
    try {
        // 1. Ověř reCAPTCHA
        const recaptchaResult = await verifyRecaptcha(
            formData.recaptchaToken,
            "contact_form",
            0.5
        );

        if (!recaptchaResult.success) {
            console.warn(
                "reCAPTCHA failed:",
                recaptchaResult.error,
                "Score:",
                recaptchaResult.score
            );
            return {
                success: false,
                error: "Ověření proti spamu selhalo. Zkuste to prosím znovu.",
            };
        }

        const subjectText = subjectMap[formData.subject] || formData.subject;

        // Email pro hotel - replyTo nastaveno na email klienta pro snadnou odpověď
        const hotelEmail = await resend.emails.send({
            from: "Hotel U Šimáka - Kontaktní formulář <noreply@usimaka.cz>",
            replyTo: formData.email,
            to: "hotresrad@seznam.cz",
            subject: `Nová zpráva z webu: ${subjectText}`,
            html: HotelNotificationEmail({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: subjectText,
                message: formData.message,
            }),
        });

        // Potvrzovací email pro odesílatele
        const confirmationEmail = await resend.emails.send({
            from: "Hotel U Šimáka <noreply@usimaka.cz>",
            to: formData.email,
            subject: "Potvrzení přijetí Vaší zprávy - Hotel U Šimáka",
            html: CustomerConfirmationEmail({
                name: formData.name,
                subject: subjectText,
                message: formData.message,
            }),
        });

        return {
            success: true,
            hotelEmailId: hotelEmail.data?.id,
            confirmationEmailId: confirmationEmail.data?.id,
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Neznámá chyba",
        };
    }
}