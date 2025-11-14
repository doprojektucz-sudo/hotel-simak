"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
    { name: "Domů", href: "/" },
    { name: "Restaurace", href: "/restaurace" },
    { name: "Ubytování", href: "/ubytovani" },
    { name: "Chata Milunda", href: "/chata-milunda" },
    { name: "Akce & Catering", href: "/akce" },
    { name: "Okolí", href: "/okoli" },
    { name: "Kontakt", href: "/kontakt" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = true

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <nav
            className={`${isHomePage ? "absolute" : "relative"
                } w-full top-0 z-50 transition-all duration-500 ${scrolled && isHomePage
                    ? "bg-white shadow-lg py-3 fixed"
                    : isHomePage
                        ? "bg-transparent py-6"
                        : "bg-white shadow-sm py-4"
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="logo-wrapper">
                        <Link href="/" className="logo">
                            <img src="/images/logo.png" className={
                                isHomePage && !scrolled ? "w-32" : "w-32"
                            } alt="" />
                            {/*  <h2
                                className={`font-bold transition-all duration-300 ${scrolled && isHomePage ? "text-2xl" : "text-3xl"
                                    } ${isHomePage && !scrolled
                                        ? "text-white drop-shadow-lg"
                                        : "text-gray-800"
                                    }`}
                            >
                                <span
                                    className={
                                        isHomePage && !scrolled ? "text-white" : "text-primary-700"
                                    }
                                >
                                    HOTEL
                                </span>{" "}
                                <span>U ŠIMÁKA</span>
                            </h2> */}
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center">
                        <ul className="flex items-center space-x-8">
                            {navigation.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <li key={item.name} className="nav-item">
                                        <Link
                                            href={item.href}
                                            className={`nav-link relative text-sm font-medium tracking-wide uppercase transition-all duration-300 py-2 group ${active
                                                ? isHomePage && !scrolled
                                                    ? "text-white"
                                                    : "text-primary-600"
                                                : isHomePage && !scrolled
                                                    ? "text-white/90 hover:text-white"
                                                    : "text-gray-700 hover:text-primary-600"
                                                } ${isHomePage && !scrolled ? "drop-shadow-md" : ""}`}
                                        >
                                            {item.name}
                                            <span
                                                className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${isHomePage && !scrolled
                                                    ? "bg-white"
                                                    : "bg-primary-600"
                                                    } ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className={`lg:hidden p-2 transition-colors ${isHomePage && !scrolled
                            ? "text-white hover:text-white/80"
                            : "text-gray-700 hover:text-primary-600"
                            }`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                >
                    <ul className="flex flex-col space-y-1 py-4 bg-white rounded-lg shadow-lg">
                        {navigation.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`block px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${active
                                            ? "text-primary-600 bg-primary-50"
                                            : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}