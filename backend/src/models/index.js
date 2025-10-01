import { Category } from "./Category.js";
import { Post } from "./Post.js";
import { PostCategory } from "./PostCategory.js";
import { Prompt } from "./Prompt.js";
import { User } from "./User.js";

User.hasMany(Prompt, { foreignKey: "userId", as: "prompts" });
Prompt.belongsTo(User, { foreignKey: "userId", as: "user" });

Category.hasMany(Prompt, { foreignKey: "categoryId", as: "prompts" });
Prompt.belongsTo(Category, { foreignKey: "categoryId"});

PostCategory.hasMany(Post, { foreignKey: "postCategoryId", as: "posts" });
Post.belongsTo(PostCategory, { foreignKey: "postCategoryId", as: "postCategory"});

export { Category, Post, PostCategory, Prompt, User }