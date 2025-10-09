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
import SidebarLayout from "@/layouts/SidebarLayout.jsx";
import BlankLayout from "@/layouts/BlankLayout.jsx";
import PromptsNav from "@/components/Prompts/PromptsNav.jsx";
import { IndexPage, PromptsPage, PromptPage } from "@/pages/index.jsx"

import LayoutWithoutSidebar from "@/layouts/graphite/LayoutWithoutSidebar.jsx";
import LayoutWithSidebar from "@/layouts/graphite/LayoutWithSidebar.jsx";
import SidebarPrompts from "@/components/Prompts/SidebarPrompts.jsx";
import { SketchIndex, SketchPrompts } from "@/pages/index.jsx";
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
            
            <Route element={<SidebarLayout nav={<PromptsNav />} />}>
                {/* <Route path="/prompts/:categorySlug" element={<PromptsPage />} /> */}
                <Route path="/prompts/:categorySlug/:slug" element={<PromptPage />} />
            </Route>

            <Route element={<BlankLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/oauth/callback" element={<OAuthCallback />} />
            </Route>

            <Route element={<LayoutWithoutSidebar />}>
                <Route path="/" element={<IndexPage />} />
                <Route path="/sketch/index" element={<SketchIndex />} />
            </Route>

            <Route element={<LayoutWithSidebar nav={<SidebarPrompts />}  />}>
                <Route path="/prompts" element={<PromptsPage />} />
                <Route path="/prompts/:categorySlug" element={<PromptsPage />} />
            </Route>

            <Route path="/sketch/prompts" element={<SketchPrompts />} />

        </Routes>
    )
}
