import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from "../config/db.js";

export const PromptPlatform = db.define("PromptPlatform", {
    prompt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    platform_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'prompt_platforms',
    timestamps: false,
});
