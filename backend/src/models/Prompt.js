import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from "../config/db.js";

export const Prompt = db.define("Prompt", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    translations: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    isFavorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    usageCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    lastUsedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    version: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
    },
}, {
    tableName: "prompts",
    timestamps: false
});
