import Link from "next/link";
import Image from "next/image";

interface HeroProps {
    title: string;
    subtitle: string;
    description?: string;
    primaryCta?: {
        text: string;
        href: string;
    };
    secondaryCta?: {
        text: string;
        href: string;
    };
    backgroundImage?: string;
}

export default function Hero({
    title,
    subtitle,
    description,
    primaryCta,
    secondaryCta,
    backgroundImage = "/images/hero-01.webp",
}: HeroProps) {
    return (
        <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
            {/* Background Image with Ken Burns */}
            <div className="absolute inset-0">
                <div className="relative w-full h-full overflow-hidden">
                    <Image
                        src={backgroundImage}
                        alt={title}
                        fill
                        className="object-cover animate-ken-burns"
                        priority
                        sizes="100vw"
                    />
                </div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center z-10">
                <div className="ps-84">
                    <div className="max-w-5xl">
                        {/* Subtitle */}
                        <h4 className="text-primary-300 font-semibold mb-4 text-lg uppercase tracking-widest">
                            {subtitle}
                        </h4>

                        {/* Title */}
                        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {title}
                        </h1>

                        {/* Description */}
                        {description && (
                            <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
                                {description}
                            </p>
                        )}

                        {/* CTAs */}
                        {(primaryCta || secondaryCta) && (
                            <div className="flex flex-col sm:flex-row gap-4">
                                {primaryCta && (
                                    <Link
                                        href={primaryCta.href}
                                        className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-10 uppercase text-sm tracking-widest transition-all duration-300 hover:scale-105"
                                    >
                                        <span>{primaryCta.text}</span>
                                    </Link>
                                )}
                                {secondaryCta && (
                                    <Link
                                        href={secondaryCta.href}
                                        className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold py-4 px-10 uppercase text-sm tracking-widest transition-all duration-300 hover:scale-105"
                                    >
                                        {secondaryCta.text}
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}