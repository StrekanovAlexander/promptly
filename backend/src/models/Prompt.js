import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from "../config/db.js";

export const Prompt = db.define("Prompt", {
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    license: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    placeholders: {
      type: DataTypes.JSON,
      allowNull: true,
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
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived', 'review'),
      allowNull: false,
      defaultValue: 'published',
    },
    visibility: {
      type: DataTypes.ENUM('public', 'unlisted', 'private'),
      allowNull: false,
      defaultValue: 'public',
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'middle', 'hard'),
      allowNull: false,
      defaultValue: 'easy',
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
