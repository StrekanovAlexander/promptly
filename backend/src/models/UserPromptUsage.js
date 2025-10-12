import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from "../config/db.js";

export const UserPromptUsage = db.define("UserPromptUsage", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    promptId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    usedAt: {
      type: DataTypes.DATE,
      defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
    },
}, {
    tableName: 'user_prompt_usages',
    timestamps: false,
});