import { Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout.jsx";
import AuthLayout from "../components/layouts/AuthLayout.jsx";
import UserLayout from "../components/layouts/UserLayout.jsx";
import PostLayout from "../components/layouts/post/PostLayout.jsx";
import { 
    PostPage, 
    PostsPage, 
    HomePage, 
    LoginPage, 
    Logout,
    OAuthCallback, 
    ProfilePage 
} from "../pages/index.jsx";

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
                <Route path="/logout" element={<Logout />} />
            </Route>
            <Route element={<PostLayout />}>
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:id" element={<PostPage />} />
            </Route>
        </Routes>
    )
}
