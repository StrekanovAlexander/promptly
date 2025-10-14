import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from "../config/db.js";

export const PlatformVersion = db.define("PlatformVersion", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: "platform_versions",
    timestamps: false,
});