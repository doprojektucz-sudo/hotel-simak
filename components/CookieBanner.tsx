"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Check, Settings } from "lucide-react";

const COOKIE_KEY = "cookie-consent-v1";

type ConsentState = {
    analytics: boolean;
    marketing: boolean;
    timestamp: number;
};

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
    }
}

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [analytics, setAnalytics] = useState(true);
    const [marketing, setMarketing] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(COOKIE_KEY);
        if (!stored) {
            // krátké zpoždění, ať banner nevyletí dřív než stránka
            const timer = setTimeout(() => setVisible(true), 800);
            return () => clearTimeout(timer);
        } else {
            // re-aplikuj uložený souhlas pro gtag (uživatel se vrátil na web)
            try {
                const consent: ConsentState = JSON.parse(stored);
                applyConsent(consent.analytics, consent.marketing);
            } catch {
                setVisible(true);
            }
        }
    }, []);

    const applyConsent = (analyticsOk: boolean, marketingOk: boolean) => {
        if (typeof window.gtag !== "function") return;

        window.gtag("consent", "update", {
            analytics_storage: analyticsOk ? "granted" : "denied",
            ad_storage: marketingOk ? "granted" : "denied",
            ad_user_data: marketingOk ? "granted" : "denied",
            ad_personalization: marketingOk ? "granted" : "denied",
        });
    };

    const saveConsent = (analyticsOk: boolean, marketingOk: boolean) => {
        const consent: ConsentState = {
            analytics: analyticsOk,
            marketing: marketingOk,
            timestamp: Date.now(),
        };
        localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
        applyConsent(analyticsOk, marketingOk);
        setVisible(false);
    };

    const acceptAll = () => saveConsent(true, true);
    const rejectAll = () => saveConsent(false, false);
    const saveCustom = () => saveConsent(analytics, marketing);

    if (!visible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-slide-up"
            role="dialog"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-desc"
        >
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Hlavní banner */}
                {!showSettings && (
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            {/* Ikona */}
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                                    <Cookie className="w-7 h-7 text-white" />
                                </div>
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <h3
                                    id="cookie-banner-title"
                                    className="text-xl font-bold text-gray-900 mb-2"
                                >
                                    Používáme cookies
                                </h3>
                                <p
                                    id="cookie-banner-desc"
                                    className="text-gray-600 text-sm leading-relaxed mb-4"
                                >
                                    Pro správné fungování webu používáme nezbytné cookies.
                                    S vaším souhlasem také analytické cookies (Google Analytics),
                                    které nám pomáhají zlepšovat naše služby. Více informací
                                    najdete v{" "}
                                    <a
                                        href="/zasady-cookies"
                                        className="text-primary-600 hover:text-primary-700 font-medium underline"
                                    >
                                        zásadách zpracování cookies
                                    </a>
                                    .
                                </p>

                                {/* Tlačítka */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={acceptAll}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <Check className="w-4 h-4" />
                                        Přijmout vše
                                    </button>
                                    <button
                                        onClick={rejectAll}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                                    >
                                        <X className="w-4 h-4" />
                                        Odmítnout vše
                                    </button>
                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Nastavení
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Detailní nastavení */}
                {showSettings && (
                    <div className="p-6 md:p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    Nastavení cookies
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Vyberte si, které cookies chcete povolit
                                </p>
                            </div>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Zavřít nastavení"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            {/* Nezbytné — vždy zapnuté */}
                            <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-1">
                                            Nezbytné cookies
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Potřebné pro základní fungování webu. Nelze vypnout.
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                                        Vždy aktivní
                                    </div>
                                </div>
                            </div>

                            {/* Analytické */}
                            <label className="block p-4 rounded-2xl border border-gray-200 hover:border-primary-200 cursor-pointer transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-1">
                                            Analytické cookies
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Google Analytics — pomáhají nám pochopit, jak návštěvníci
                                            web používají, abychom ho mohli vylepšovat.
                                        </p>
                                    </div>
                                    <Toggle
                                        checked={analytics}
                                        onChange={setAnalytics}
                                        label="Analytické cookies"
                                    />
                                </div>
                            </label>

                            {/* Marketingové */}
                            <label className="block p-4 rounded-2xl border border-gray-200 hover:border-primary-200 cursor-pointer transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-1">
                                            Marketingové cookies
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Používané pro cílení reklam a měření jejich účinnosti.
                                        </p>
                                    </div>
                                    <Toggle
                                        checked={marketing}
                                        onChange={setMarketing}
                                        label="Marketingové cookies"
                                    />
                                </div>
                            </label>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={saveCustom}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <Check className="w-4 h-4" />
                                Uložit nastavení
                            </button>
                            <button
                                onClick={acceptAll}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                            >
                                Přijmout vše
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={(e) => {
                e.preventDefault();
                onChange(!checked);
            }}
            className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors duration-300 ${checked ? "bg-primary-500" : "bg-gray-300"
                }`}
        >
            <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"
                    }`}
            />
        </button>
    );
}