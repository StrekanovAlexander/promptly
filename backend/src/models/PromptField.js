import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from "../config/db.js";

export const PromptField = db.define("PromptField", {
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('select','multiselect','checkbox','text','slider'),
        allowNull: false,
    },
    values: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    recommended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: 'prompt_fields',
    timestamps: false,
});
