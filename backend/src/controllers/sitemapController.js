import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SitemapStream, streamToPromise } from "sitemap";
import { Prompt, Category } from "../models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateSitemap = async (req, res) => {
    try {
        const sitemap = new SitemapStream({ hostname: "https://www.promptly.team" });
        sitemap.write({ url: "/", changefreq: "daily", priority: 1.0 });
        sitemap.write({ url: "/prompts", changefreq: "daily", priority: 0.9 });
    
        const categories = await Category.findAll();
    
        categories.forEach((el) => {
            sitemap.write({
                url: `/prompts/${el.slug}`,
                changefreq: "weekly",
                priority: 0.8,
            });
        });
    
        const prompts = await Prompt.findAll({ include: [{ model: Category }] });
        prompts.forEach((el) => {
            sitemap.write({
                url: `/prompts/${el.Category.slug}/${el.slug}-${el.id}`,
                changefreq: "monthly",
                priority: 0.7,
            });
        });
    
        sitemap.end();
    
        const xml = await streamToPromise(sitemap);
        const outputPath = path.join(__dirname, "../../public/sitemap.xml");
        fs.writeFileSync(outputPath, xml.toString());
        
        res.status(200).json({ message: "Sitemap was generated..." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
