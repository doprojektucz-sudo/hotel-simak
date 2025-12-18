"use client";

import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
    const isHomePage = true;

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
            {/* Logo */}
                    <div className="logo-wrapper flex gap-2 items-center">
                        <Link href="/" className="flex gap-2 items-center">
                            <img
                                src={!scrolled ? "/images/logo-light.webp" : "/images/logo.webp"}
                                className="w-20 sm:w-32"
                                alt="Hotel U Šimáka logo"
                            />
                            <div>
                                <span className={`hidden sm:inline ${!scrolled ? "text-white" : ""} text-lg uppercase font-bold`}>
                                    Hotel & restaurace
                                </span>
                                <span className={`sm:hidden ${!scrolled ? "text-white" : ""} text-base uppercase font-bold`}>
                                    U Šimáka
                                </span>
                                <br className="hidden sm:block" />
                                <span className={`hidden sm:inline ${!scrolled ? "text-primary-300" : "text-primary-600"} font-semibold uppercase`}>
                                    U Šimáka Radostín
                                </span>
                            </div>
                        </Link>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-center">
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

                    {/* Animated Hamburger Button */}
                    <button
                        type="button"
                        className={`xl:hidden p-2 relative w-10 h-10 flex items-center justify-center transition-colors ${isHomePage && !scrolled
                            ? "text-white"
                            : "text-gray-700"
                            }`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-6 h-5 flex flex-col justify-between">
                            <span
                                className={`block h-0.5 w-full rounded-full transition-all duration-300 ease-in-out origin-center ${isHomePage && !scrolled ? "bg-white" : "bg-gray-700"
                                    } ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                            />
                            <span
                                className={`block h-0.5 w-full rounded-full transition-all duration-300 ease-in-out ${isHomePage && !scrolled ? "bg-white" : "bg-gray-700"
                                    } ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""}`}
                            />
                            <span
                                className={`block h-0.5 w-full rounded-full transition-all duration-300 ease-in-out origin-center ${isHomePage && !scrolled ? "bg-white" : "bg-gray-700"
                                    } ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`xl:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="flex flex-col py-4 bg-white rounded-lg shadow-lg">
                        <ul className="flex flex-col space-y-1">
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

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 px-4 pt-4 mt-2 border-t border-gray-100">
                            <a
                                href="https://www.facebook.com/profile.php?id=100063633039375"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <Facebook />
                            </a>
                            <a
                                href="https://www.instagram.com/restaurace_u_simaka_radostin/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram />
                            </a>
                        </div>
                    </div>
                </div>
            </div >
        </nav >
    );
}