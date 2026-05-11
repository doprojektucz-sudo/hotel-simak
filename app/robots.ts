import type { MetadataRoute } from "next";

const BASE_URL = "https://www.usimaka.cz";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/zasady-cookies", "/admin/", "/api/"],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}