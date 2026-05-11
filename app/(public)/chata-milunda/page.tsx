import type { Metadata } from "next";
import ChataMilundaClient from "@/components/chata-milunda/ChataMilundaClient";

export const metadata: Metadata = {
    title: "Chata Milunda",
    description:
        "Chata Milunda u vodní nádrže Velké Dářko – pronájem pro 8–10 osob, loďka zdarma, rybaření. Ideální pro rodinné pobyty, party a skupiny. Rezervujte chatu na Vysočině.",
    alternates: {
        canonical: "https://www.usimaka.cz/chata-milunda",
    },
    openGraph: {
        title: "Chata Milunda – Pronájem u Velkého Dářka | U Šimáka",
        description:
            "Útulná chata pro 8–10 osob přímo u Velkého Dářka. Loďka zdarma, rybaření, klid přírody. Pronájem chaty na Vysočině.",
        url: "https://www.usimaka.cz/chata-milunda",
        type: "website",
    },
};

export default function ChataMilundaPage() {
    return <ChataMilundaClient />;
}
