"use server";

import { Resend } from "resend";
import { HotelNotificationEmail, CustomerConfirmationEmail } from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
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
        const subjectText = subjectMap[formData.subject] || formData.subject;

        // Email pro hotel - používá profesionální šablonu
        const hotelEmail = await resend.emails.send({
            from: "Hotel U Šimáka <noreply@vase-domena.cz>", // Nahraďte vaší doménou
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

        // Potvrzovací email pro odesílatele - používá profesionální šablonu
        const confirmationEmail = await resend.emails.send({
            from: "Hotel U Šimáka <noreply@vase-domena.cz>", // Nahraďte vaší doménou
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