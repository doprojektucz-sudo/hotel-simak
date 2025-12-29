const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!;
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

interface RecaptchaVerifyResponse {
    success: boolean;
    score: number;
    action: string;
    challenge_ts: string;
    hostname: string;
    "error-codes"?: string[];
}

interface VerifyResult {
    success: boolean;
    score: number;
    error?: string;
}

/**
 * Ověří reCAPTCHA token na serveru
 * @param token - Token z klienta
 * @param expectedAction - Očekávaná akce (např. "contact_form")
 * @param minScore - Minimální skóre (0.0 - 1.0), default 0.5
 */
export async function verifyRecaptcha(
    token: string,
    expectedAction: string,
    minScore: number = 0.5
): Promise<VerifyResult> {
    if (!token) {
        return { success: false, score: 0, error: "Token chybí" };
    }

    if (!RECAPTCHA_SECRET_KEY) {
        console.error("RECAPTCHA_SECRET_KEY není nastaven");
        // V development módu můžeme povolit bez ověření
        if (process.env.NODE_ENV === "development") {
            console.warn("reCAPTCHA přeskočena v development módu");
            return { success: true, score: 1 };
        }
        return { success: false, score: 0, error: "Chyba konfigurace serveru" };
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

        if (!data.success) {
            return {
                success: false,
                score: 0,
                error: `Ověření selhalo: ${data["error-codes"]?.join(", ") || "neznámá chyba"}`,
            };
        }

        // Kontrola akce
        if (data.action !== expectedAction) {
            return {
                success: false,
                score: data.score,
                error: `Neočekávaná akce: ${data.action}`,
            };
        }

        // Kontrola skóre
        if (data.score < minScore) {
            return {
                success: false,
                score: data.score,
                error: `Nízké skóre: ${data.score}`,
            };
        }

        return {
            success: true,
            score: data.score,
        };
    } catch (error) {
        console.error("reCAPTCHA verify error:", error);
        return {
            success: false,
            score: 0,
            error: "Chyba při ověřování",
        };
    }
}