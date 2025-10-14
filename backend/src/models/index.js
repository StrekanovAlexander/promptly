import { Category } from "./Category.js";
import { Platform } from "./Platform.js";
import { PlatformVersion } from "./PlatformVersion.js";
import { Post } from "./Post.js";
import { PostCategory } from "./PostCategory.js";
import { Prompt } from "./Prompt.js";
import { PromptPlatform } from "./PromptPlatform.js";
import { User } from "./User.js";
import { UserPromptUsage } from "./UserPromptUsage.js";

User.hasMany(Prompt, { foreignKey: "userId", as: "prompts" });
Prompt.belongsTo(User, { foreignKey: "userId", as: "user" });

Category.hasMany(Prompt, { foreignKey: "categoryId", as: "prompts" });
Prompt.belongsTo(Category, { foreignKey: "categoryId"});

PostCategory.hasMany(Post, { foreignKey: "postCategoryId", as: "posts" });
Post.belongsTo(PostCategory, { foreignKey: "postCategoryId", as: "postCategory"});

Prompt.belongsToMany(Platform, {
    through: PromptPlatform,
    foreignKey: 'prompt_id',
    otherKey: 'platform_id',
    as: 'platforms',
});

Platform.belongsToMany(Prompt, {
    through: PromptPlatform,
    foreignKey: 'platform_id',
    otherKey: 'prompt_id',
    as: 'prompts',
});

User.belongsToMany(Prompt, {
    through: UserPromptUsage,
    foreignKey: "userId",
    otherKey: "promptId",
});

Prompt.belongsToMany(User, {
    through: UserPromptUsage,
    foreignKey: "promptId",
    otherKey: "userId",
});

export { 
    Category, 
    Platform, 
    PlatformVersion,
    Post, 
    PostCategory, 
    Prompt, 
    PromptPlatform, 
    User,
    UserPromptUsage 
}