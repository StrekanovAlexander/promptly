import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from "../config/db.js";

export const Post = db.define("Post", {
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: db.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: db.literal("CURRENT_TIMESTAMP"),
    },
}, {
    tableName: "posts",
    timestamps: false
  }
);
