"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { SeasonalEvent } from "@/lib/data/seasonal-events";

interface Props {
    event: SeasonalEvent | null;
    onClose: () => void;
}

export default function PosterLightbox({ event, onClose }: Props) {
    useEffect(() => {
        if (!event) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [event, onClose]);

    if (!event) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={event.poster.alt}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in"
            onClick={onClose}
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Zavřít plakát"
            >
                <X className="w-6 h-6" />
            </button>
            <div
                className="relative max-h-[92vh] w-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={event.poster.src}
                    alt={event.poster.alt}
                    width={event.poster.width}
                    height={event.poster.height}
                    className="max-h-[92vh] w-auto h-auto object-contain rounded-sm"
                    sizes="(max-width: 768px) 100vw, 60vh"
                    quality={90}
                />
            </div>
        </div>
    );
}
