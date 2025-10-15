// controllers/sitemapController.js
import { SitemapStream, streamToPromise } from "sitemap";
import { Prompt, Category } from "../models/index.js";

let cachedSitemap = null;
let lastGenerated = 0;

export const generateSitemap = async (req, res) => {
    try {
        const now = Date.now();
        if (cachedSitemap && now - lastGenerated < 10 * 60 * 1000) {
        res.setHeader("Content-Type", "application/xml");
        return res.status(200).send(cachedSitemap);
        }

        const sitemap = new SitemapStream({ hostname: "https://www.promptly.team" });

        sitemap.write({ url: "/", changefreq: "daily", priority: 1.0 });
        sitemap.write({ url: "/prompts", changefreq: "daily", priority: 0.9 });
        sitemap.write({ url: "/run-prompt", changefreq: "daily", priority: 0.8, lastmod: new Date().toISOString() });

        const categories = await Category.findAll({ where: { isActive: true } });
        for (const el of categories) {
            sitemap.write({
                url: `/prompts/${el.slug}`,
                changefreq: "weekly",
                priority: 0.8,
            });
        }

        const prompts = await Prompt.findAll({
            include: [{
                model: Category,
                where: { isActive: true },
                required: true,
            }],
        });

        for (const el of prompts) {
            sitemap.write({
                url: `/prompts/${el.Category.slug}/${el.slug}-${el.id}`,
                changefreq: "monthly",
                priority: 0.7,
            });
        }

        sitemap.end();
        const xml = await streamToPromise(sitemap);
        cachedSitemap = xml.toString();
        lastGenerated = now;

        res.setHeader("Content-Type", "application/xml");
        res.status(200).send(cachedSitemap);
    } catch (err) {
        console.error("Sitemap generation error:", err);
        res.status(500).json({ error: err.message });
    }
};
