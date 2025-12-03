"use client";

import { useState, useRef, useEffect } from "react";

interface InlinePriceProps {
    price: number;
    onSave: (newPrice: number) => Promise<void>;
}

export function InlinePrice({ price, onSave }: InlinePriceProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(price.toString());
    const [isSaving, setIsSaving] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSave = async () => {
        const newPrice = parseInt(value);
        if (isNaN(newPrice) || newPrice < 0) {
            setValue(price.toString());
            setIsEditing(false);
            return;
        }

        if (newPrice === price) {
            setIsEditing(false);
            return;
        }

        setIsSaving(true);
        try {
            await onSave(newPrice);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save price:", error);
            setValue(price.toString());
        } finally {
            setIsSaving(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            setValue(price.toString());
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-1">
                <input
                    ref={inputRef}
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    disabled={isSaving}
                    className="w-20 px-2 py-1 text-right text-lg font-bold border border-primary-500 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-lg font-bold text-primary-600">Kč</span>
            </div>
        );
    }

    return (
        <span
            onDoubleClick={() => setIsEditing(true)}
            className="text-lg font-bold text-primary-600 whitespace-nowrap cursor-pointer hover:bg-primary-50 px-2 py-1 rounded transition-colors"
            title="Dvojklik pro úpravu ceny"
        >
            {price} Kč
        </span>
    );
}