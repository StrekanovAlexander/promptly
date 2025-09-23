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
},  {
    tableName: "users",
    timestamps: false,
});
