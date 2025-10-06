import { Routes, Route } from "react-router-dom";
import PostLayout from "../components/layouts/post/PostLayout.jsx";
import ProfileLayout from "../components/layouts/profile/ProfileLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { 
    PostPage, 
    PostsPage, 
    LoginPage, 
    OAuthCallback, 
    AccountPage,
    MyPromptsPage,
} from "../pages/index.jsx";

// ***************** Next version 
import MainLayout from "@/layouts/MainLayout.jsx";
import SidebarLayout from "@/layouts/SidebarLayout.jsx";
import BlankLayout from "@/layouts/BlankLayout.jsx";
import CategoryNav from "@/components/Prompts/CategoryNav.jsx";
import { IndexPage, PromptsPage, PromptPage } from "@/pages/index.jsx"
// ***************** End next version

export default function Routing() {
    return (
        <Routes>
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
            
            <Route element={<MainLayout />}>
                <Route path="/" element={<IndexPage />} />
            </Route>
            
            <Route element={<SidebarLayout nav={<CategoryNav />} />}>
                <Route path="/prompts" element={<PromptsPage />} />
                <Route path="/prompts/:categorySlug" element={<PromptsPage />} />
                <Route path="/prompts/:categorySlug/:slug" element={<PromptPage />} />
            </Route>

            <Route element={<BlankLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/oauth/callback" element={<OAuthCallback />} />
            </Route>

        </Routes>
    )
}
