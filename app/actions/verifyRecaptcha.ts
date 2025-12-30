const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

interface RecaptchaVerifyResponse {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    "error-codes"?: string[];
}

interface VerifyResult {
    success: boolean;
    error?: string;
}

/**
 * Ověří reCAPTCHA v2 token na serveru
 */
export async function verifyRecaptcha(token: string | undefined | null): Promise<VerifyResult> {
    if (!token) {
        console.error("[reCAPTCHA] ❌ Token chybí");
        return { success: false, error: "Potvrďte, že nejste robot" };
    }

    if (!RECAPTCHA_SECRET_KEY) {
        console.error("[reCAPTCHA] ❌ RECAPTCHA_SECRET_KEY není nastaven");
        if (process.env.NODE_ENV === "development") {
            console.warn("[reCAPTCHA] ⚠️ Přeskakuji v development módu");
            return { success: true };
        }
        return { success: false, error: "Chyba konfigurace serveru" };
    }

    try {
        const response = await fetch(RECAPTCHA_VERIFY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                secret: RECAPTCHA_SECRET_KEY,
                response: token,
            }),
        });

        const data: RecaptchaVerifyResponse = await response.json();

        console.log("[reCAPTCHA] Response:", {
            success: data.success,
            hostname: data.hostname,
            errors: data["error-codes"],
        });

        if (!data.success) {
            const errorCodes = data["error-codes"] || [];

            // Timeout nebo již použitý token
            if (errorCodes.includes("timeout-or-duplicate")) {
                return { success: false, error: "Ověření vypršelo, zkuste to znovu" };
            }

            console.error("[reCAPTCHA] ❌ Ověření selhalo:", errorCodes);
            return { success: false, error: "Ověření selhalo" };
        }

        console.log("[reCAPTCHA] ✅ Úspěch");
        return { success: true };
    } catch (error) {
        console.error("[reCAPTCHA] ❌ Chyba:", error);
        return { success: false, error: "Chyba při ověřování" };
    }
}