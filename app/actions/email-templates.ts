/**
 * Alternativní profesionální email šablony
 * 
 * Tyto šablony můžete použít místo HTML stringů v send-email.ts
 * Pro ještě lepší vzhled můžete nainstalovat @react-email/components:
 * npm install @react-email/components
 */

// Email pro hotel
export const HotelNotificationEmail = ({
    name,
    email,
    phone,
    subject,
    message,
}: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nová zpráva z webu</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                                Hotel a Restaurace U Šimáka
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #f0e6d2; font-size: 16px;">
                                Nová zpráva z kontaktního formuláře
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #8B4513; font-size: 22px; font-weight: 600;">
                                Kontaktní údaje
                            </h2>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                                        <strong style="color: #333333; display: inline-block; width: 100px;">Jméno:</strong>
                                        <span style="color: #666666;">${name}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                                        <strong style="color: #333333; display: inline-block; width: 100px;">Email:</strong>
                                        <a href="mailto:${email}" style="color: #8B4513; text-decoration: none;">${email}</a>
                                    </td>
                                </tr>
                                ${phone
        ? `
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                                        <strong style="color: #333333; display: inline-block; width: 100px;">Telefon:</strong>
                                        <a href="tel:${phone}" style="color: #8B4513; text-decoration: none;">${phone}</a>
                                    </td>
                                </tr>
                                `
        : ""
    }
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <strong style="color: #333333; display: inline-block; width: 100px;">Předmět:</strong>
                                        <span style="color: #666666;">${subject}</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <h2 style="margin: 0 0 15px 0; color: #8B4513; font-size: 22px; font-weight: 600;">
                                Zpráva
                            </h2>
                            
                            <div style="background-color: #f9f6f1; padding: 20px; border-radius: 6px; border-left: 4px solid #8B4513;">
                                <p style="margin: 0; color: #333333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </div>
                            
                            <!-- Action Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="mailto:${email}" style="display: inline-block; background-color: #8B4513; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                            Odpovědět klientovi
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9f6f1; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                                Tato zpráva byla odeslána z kontaktního formuláře<br>
                                na webu <strong>Hotel a Restaurace U Šimáka</strong>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// Potvrzovací email pro zákazníka
export const CustomerConfirmationEmail = ({
    name,
    subject,
    message,
}: {
    name: string;
    subject: string;
    message: string;
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Potvrzení přijetí zprávy</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                                Hotel a Restaurace U Šimáka
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #f0e6d2; font-size: 16px;">
                                Potvrzení přijetí Vaší zprávy
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #8B4513; font-size: 22px; font-weight: 600;">
                                Děkujeme za Vaši zprávu!
                            </h2>
                            
                            <p style="margin: 0 0 20px 0; color: #333333; line-height: 1.6; font-size: 16px;">
                                Dobrý den <strong>${name}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 20px 0; color: #333333; line-height: 1.6; font-size: 16px;">
                                děkujeme za Vaši zprávu. Obdrželi jsme ji a co nejdříve se Vám ozveme zpět.
                            </p>
                            
                            <div style="background-color: #f9f6f1; padding: 25px; border-radius: 6px; margin: 30px 0;">
                                <h3 style="margin: 0 0 15px 0; color: #8B4513; font-size: 18px; font-weight: 600;">
                                    Vaše zpráva:
                                </h3>
                                <p style="margin: 0 0 10px 0; color: #666666;">
                                    <strong>Předmět:</strong> ${subject}
                                </p>
                                <p style="margin: 0; color: #333333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </div>
                            
                            <!-- Contact Info Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff8e6; border-radius: 6px; border-left: 4px solid #8B4513; margin: 30px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="margin: 0 0 15px 0; color: #8B4513; font-size: 18px; font-weight: 600;">
                                            Kontaktujte nás přímo:
                                        </h3>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding: 5px 0;">
                                                    <span style="color: #666666; font-size: 16px;">📞</span>
                                                    <strong style="color: #333333; margin-left: 10px;">Telefon:</strong>
                                                    <a href="tel:+420728490498" style="color: #8B4513; text-decoration: none; margin-left: 10px;">720 417 130</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px 0;">
                                                    <span style="color: #666666; font-size: 16px;">✉️</span>
                                                    <strong style="color: #333333; margin-left: 10px;">Email:</strong>
                                                    <a href="mailto:hotresrad@seznam.cz" style="color: #8B4513; text-decoration: none; margin-left: 10px;">hotresrad@seznam.cz</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 5px 0;">
                                                    <span style="color: #666666; font-size: 16px;">📍</span>
                                                    <strong style="color: #333333; margin-left: 10px;">Adresa:</strong>
                                                    <span style="color: #666666; margin-left: 10px;">Radostín 95, 591 01 Žďár nad Sázavou</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0 0 0; color: #333333; line-height: 1.6; font-size: 16px;">
                                S pozdravem,<br>
                                <strong style="color: #8B4513;">Tým Hotel a Restaurace U Šimáká</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9f6f1; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0 0 10px 0; color: #333333; font-size: 14px; font-weight: 600;">
                                Hotel a Restaurace U Šimáka
                            </p>
                            <p style="margin: 0; color: #666666; font-size: 13px; line-height: 1.5;">
                                Radostín 95, 591 01 Žďár nad Sázavou<br>
                                <a href="tel:+420728490498" style="color: #8B4513; text-decoration: none;">720 417 130</a> | 
                                <a href="mailto:hotresrad@seznam.cz" style="color: #8B4513; text-decoration: none;">hotresrad@seznam.cz</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;