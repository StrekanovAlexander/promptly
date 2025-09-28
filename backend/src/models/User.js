import pkg from 'sequelize';
const { DataTypes } = pkg;
import { db } from "../config/db.js";

export const User = db.define("User", {
    provider: {
        type: DataTypes.ENUM('google','github','facebook'),
        allowNull: false,
    },
    providerId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "provider_id"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    avatarUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "avatar_url"
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_active"
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
         field: "updated_at",
        defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
    },
},  {
    tableName: "users",
    timestamps: false,
});
