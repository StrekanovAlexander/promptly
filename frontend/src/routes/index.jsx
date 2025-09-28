import { Routes, Route } from "react-router-dom";
import Layout from "../components/layouts/Layout.jsx";
import AuthLayout from "../components/layouts/auth/AuthLayout.jsx";
import PostLayout from "../components/layouts/post/PostLayout.jsx";
import ProfileLayout from "../components/layouts/profile/ProfileLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { 
    PostPage, 
    PostsPage, 
    HomePage, 
    LoginPage, 
    OAuthCallback, 
    AccountPage,
    MyPromptsPage 
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
            <Route element={<ProtectedRoute />}>
                <Route element={<ProfileLayout />}>
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/my-prompts" element={<MyPromptsPage />} />
                </Route>
            </Route>
            <Route element={<PostLayout />}>
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:id" element={<PostPage />} />
            </Route>
        </Routes>
    )
}
