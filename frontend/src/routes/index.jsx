import { Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout.jsx";
import AuthLayout from "../components/layouts/AuthLayout.jsx";
import UserLayout from "../components/layouts/UserLayout.jsx";
import BlogLayout from "../components/layouts/blog/BlogLayout.jsx";
import { BlogPage, HomePage, LoginPage, OAuthCallback, ProfilePage } from "../pages/index.jsx";

export default function Routing() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/oauth/callback" element={<OAuthCallback />} />
            </Route>
            <Route element={<UserLayout />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route element={<BlogLayout />}>
                <Route path="/blog" element={<BlogPage />} />
            </Route>
        </Routes>
    )
}
