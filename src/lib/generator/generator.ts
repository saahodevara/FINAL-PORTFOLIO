import JSZip from 'jszip';
import { PortfolioData } from '../../../types';
import { generateSEOMetadata, generateRobotsTxt, generateSitemapXml } from '../presets/seo';

interface TemplateFile {
    path: string;
    content: string;
}

export const generatePortfolioBundle = async (data: PortfolioData, templateFiles: TemplateFile[]) => {
    const zip = new JSZip();
    const seo = generateSEOMetadata(data);

    // 1. Process Master Template Files
    templateFiles.forEach(file => {
        let content = file.content;

        // Simple String Injection
        content = content
            .replace(/{{NAME}}/g, data.name)
            .replace(/{{TITLE}}/g, data.title)
            .replace(/{{BIO}}/g, data.bio)
            .replace(/{{EMAIL}}/g, data.email)
            .replace(/{{GITHUB}}/g, data.github || '')
            .replace(/{{LINKEDIN}}/g, data.linkedin || '')
            .replace(/{{INSTAGRAM}}/g, data.instagram || '')
            .replace(/{{TWITTER}}/g, data.twitter || '')
            .replace(/{{SEO_TITLE}}/g, seo.title)
            .replace(/{{SEO_DESC}}/g, seo.description)
            .replace(/{{JSON_LD}}/g, JSON.stringify(seo.structuredData));

        // Experience Loop (Simple regex-based for demo)
        const expRegex = /{{#EXPERIENCES}}([\s\S]*?){{\/EXPERIENCES}}/;
        const expMatch = content.match(expRegex);
        if (expMatch) {
            const template = expMatch[1];
            const items = data.experiences.map(exp =>
                template
                    .replace(/{{EXP_ROLE}}/g, exp.role)
                    .replace(/{{EXP_COMPANY}}/g, exp.company)
                    .replace(/{{EXP_DURATION}}/g, exp.duration)
                    .replace(/{{EXP_DESC}}/g, exp.description)
            ).join('');
            content = content.replace(expRegex, items);
        }

        // Projects Loop
        const projRegex = /{{#PROJECTS}}([\s\S]*?){{\/PROJECTS}}/;
        const projMatch = content.match(projRegex);
        if (projMatch) {
            const template = projMatch[1];
            const items = data.projects.map(proj =>
                template
                    .replace(/{{PROJ_NAME}}/g, proj.name)
                    .replace(/{{PROJ_DESC}}/g, proj.description)
                    .replace(/{{PROJ_IMG}}/g, proj.imageUrl)
                    .replace(/{{PROJ_TAGS}}/g, proj.techStack.join(', '))
            ).join('');
            content = content.replace(projRegex, items);
        }

        zip.file(file.path, content);
    });

    // 2. Add Standard SEO Files
    zip.file('robots.txt', generateRobotsTxt());
    zip.file('sitemap.xml', generateSitemapXml('#')); // Domain placeholder

    // 3. Generate the ZIP blob
    const content = await zip.generateAsync({ type: 'blob' });
    return content;
};
