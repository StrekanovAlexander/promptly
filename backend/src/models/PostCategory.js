import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from "../config/db.js";

export const PostCategory = db.define("PostCategory", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "post_categories",
    timestamps: false,
});
