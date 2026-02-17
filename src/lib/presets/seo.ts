import { PortfolioData } from '../../../types';

export const generateSEOMetadata = (data: PortfolioData) => {
    const title = `${data.name} | ${data.title}`;
    const description = data.bio.slice(0, 160);

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            url: '#', // TBD by deploy
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        structuredData: {
            "@context": "https://schema.org",
            "@type": data.purpose === 'Business' ? "Organization" : "Person",
            "name": data.name,
            "jobTitle": data.title,
            "description": data.bio,
            "email": data.email,
            "sameAs": [
                data.linkedin,
                data.github,
                data.instagram,
                data.twitter
            ].filter(Boolean)
        }
    };
};

export const generateRobotsTxt = () => `User-agent: *
Allow: /
Sitemap: /sitemap.xml`;

export const generateSitemapXml = (baseUrl: string) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
