import { db } from "../config/db.js";
import { seedPromptsToDB } from "./promptSeeder.js";

(async () => {
  try {
    await db.authenticate();
    await import("../models/Prompt.js");
    await db.sync({ alter: true });
    console.log("✅ DB connected and synced");
    // Seed data
    await seedPromptsToDB();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
