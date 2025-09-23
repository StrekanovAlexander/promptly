import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from "../config/db.js";

export const Category = db.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    tableName: "categories",
    timestamps: false,
});
