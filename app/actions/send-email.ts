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
        // 1. Ověř reCAPTCHA v2
        const recaptchaResult = await verifyRecaptcha(formData.recaptchaToken);

        if (!recaptchaResult.success) {
            console.warn("[Contact Form] ❌ reCAPTCHA failed:", recaptchaResult.error);
            return {
                success: false,
                error: recaptchaResult.error || "Ověření proti spamu selhalo.",
            };
        }

        // 2. Validace
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            return { success: false, error: "Vyplňte všechna povinná pole." };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return { success: false, error: "Zadejte platnou emailovou adresu." };
        }

        const subjectText = subjectMap[formData.subject] || formData.subject;

        // Email pro hotel
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

        // Potvrzovací email
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

        console.log("[Contact Form] ✅ Emaily odeslány");

        return {
            success: true,
            hotelEmailId: hotelEmail.data?.id,
            confirmationEmailId: confirmationEmail.data?.id,
        };
    } catch (error) {
        console.error("[Contact Form] ❌ Error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Neznámá chyba",
        };
    }
}