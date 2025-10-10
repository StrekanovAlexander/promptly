import { Routes, Route } from "react-router-dom";
import PostLayout from "../components/layouts/post/PostLayout.jsx";
import ProfileLayout from "../components/layouts/profile/ProfileLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { 
    PostPage, 
    PostsPage, 

    OAuthCallback, 
    AccountPage,
    MyPromptsPage,
} from "../pages/index.jsx";

// ***************** Next version 
import { IndexPage, LoginPage, PromptsPage, PromptPage  } from "@/pages/index.jsx"

import LayoutWithoutSidebar from "@/layouts/graphite/LayoutWithoutSidebar.jsx";
import LayoutWithSidebar from "@/layouts/graphite/LayoutWithSidebar.jsx";
import SidebarPrompts from "@/components/Prompts/SidebarPrompts.jsx";
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
            
            <Route element={<LayoutWithoutSidebar />}>
                <Route path="/" element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/oauth/callback" element={<OAuthCallback />} />
            </Route>

            <Route element={<LayoutWithSidebar nav={<SidebarPrompts />}  />}>
                <Route path="/prompts" element={<PromptsPage />} />
                <Route path="/prompts/:categorySlug" element={<PromptsPage />} />
                <Route path="/prompts/:categorySlug/:slug" element={<PromptPage />} />
            </Route>

        </Routes>
    )
}
