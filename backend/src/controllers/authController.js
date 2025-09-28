import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

dotenv.config();

export async function githubCallback(req, res) {
    const code = req.query.code;
    if (!code) return res.status(400).send("No code provided");

    try {
        const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            })
        });

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;
        if (!accessToken) {
            return res.status(400).json({ error: "No access token", details: tokenData });
        }

        const userRes = await fetch("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const ghUser = await userRes.json();

        const emailRes = await fetch("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const emails = await emailRes.json();
        const primaryEmail = emails.find(e => e.primary)?.email;

        let user = await User.findOne({
            where: { provider: "github", providerId: ghUser.id.toString() }
        });

        if (!user) {
            user = await User.create({
                provider: "github",
                providerId: ghUser.id.toString(),
                email: primaryEmail,
                name: ghUser.name || ghUser.login,
                avatarUrl: ghUser.avatar_url
            });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        // res.json({ token, user: { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl } });
        const redirectUrl = `${process.env.FRONTEND_URL}/oauth/callback?username=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&token=${token}`;
        res.redirect(redirectUrl);
    
    } catch (err) {
        console.error(err);
        res.status(500).send("Auth error");
    }
}
