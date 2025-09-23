import { Category } from "./Category.js";
import { Prompt } from "./Prompt.js";
import { User } from "./User.js";

User.hasMany(Prompt, { foreignKey: "userId", as: "prompts" });
Prompt.belongsTo(User, { foreignKey: "userId", as: "user" });

export { Category, Prompt, User }