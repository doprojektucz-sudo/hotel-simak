"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        // Simulace odeslání - zde by bylo volání API
        setTimeout(() => {
            setStatus("success");
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });

            // Reset success message po 5 sekundách
            setTimeout(() => {
                setStatus("idle");
            }, 5000);
        }, 1000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                >
                    Jméno a příjmení *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Jan Novák"
                />
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                >
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="jan.novak@email.cz"
                />
            </div>

            {/* Phone */}
            <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                >
                    Telefon
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+420 123 456 789"
                />
            </div>

            {/* Subject */}
            <div>
                <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                >
                    Předmět *
                </label>
                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option value="">Vyberte předmět...</option>
                    <option value="ubytovani">Rezervace ubytování</option>
                    <option value="restaurace">Rezervace stolu v restauraci</option>
                    <option value="akce">Poptávka akce/oslavy</option>
                    <option value="chata">Rezervace chaty Milunda</option>
                    <option value="jine">Jiný dotaz</option>
                </select>
            </div>

            {/* Message */}
            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                >
                    Zpráva *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Napište nám svůj dotaz nebo požadavek..."
                />
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    {status === "sending" ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Odesílám...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Odeslat zprávu
                        </>
                    )}
                </button>
            </div>

            {/* Success Message */}
            {status === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    <p className="font-semibold">Zpráva byla úspěšně odeslána!</p>
                    <p className="text-sm">Ozveme se vám co nejdříve.</p>
                </div>
            )}

            {/* Error Message */}
            {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    <p className="font-semibold">Nepodařilo se odeslat zprávu.</p>
                    <p className="text-sm">Zkuste to prosím později nebo nás kontaktujte telefonicky.</p>
                </div>
            )}
        </form>
    );
}