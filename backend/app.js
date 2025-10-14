import express from "express";
import cors from "cors";

import { db } from "./src/config/db.js";
import { 
    authRoutes, 
    categoryRoutes, 
    platformRoutes, 
    postRoutes,
    postCategoryRoutes, 
    promptRoutes, 
    promptRunnerRoutes, 
    sitemapRoutes,
    userRoutes 
} from "./src/routes/index.js";

(async () => {
    try {
        await db.authenticate();
        console.log('✅ DB connected');
        // await import("./src/models/Prompt.js"); await db.sync({ alter: true }); console.log("✅ DB synced");
    } catch (err) {
        console.error('❌ DB connection failed:', err);
    }
})();


const app = express();

app.use(cors({
    origin: [
        "https://promptly.team",
        "https://www.promptly.team",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get('/', (req, res) => res.send('Server is running...'));
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/platforms", platformRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/post-categories", postCategoryRoutes);
app.use("/api/prompts", promptRoutes);
// app.use("/api/prompt-runner", promptRunnerRoutes);
app.use("/api/sitemap.xml", sitemapRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
