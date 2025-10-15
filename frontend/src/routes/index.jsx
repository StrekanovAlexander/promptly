import { Routes, Route } from "react-router-dom";
import PostLayout from "../components/layouts/post/PostLayout.jsx";
import { 
    PostPage, 
    PostsPage, 
    OAuthCallback, 
} from "../pages/index.jsx";

// ***************** Next version 
// import PagesProvider from "@/context/PagesContext.jsx";
import PlatformVersionsProvider from "@/context/PlatformVersionsContext.jsx"
import LayoutWithoutSidebar from "@/layouts/graphite/LayoutWithoutSidebar.jsx";
import LayoutWithSidebar from "@/layouts/graphite/LayoutWithSidebar.jsx";
import SidebarPrompts from "@/components/Prompts/SidebarPrompts.jsx";
import SidebarGenerator from "@/components/PromptGenerator/SidebarGenerator.jsx";
import SidebarRunPrompt from "@/components/RunPrompt/SidebarRunPrompt.jsx";

import { 
    IndexPage, 
    LoginPage, 
    PromptsPage, 
    PromptPage,
    PromptGeneratorPage,
    RunPromptPage  
} from "@/pages/index.jsx"


// ***************** End next version

export default function Routing() {
    return (
        <Routes>
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

            <Route element={<LayoutWithSidebar nav={<SidebarGenerator />}  />}>
                <Route path="/prompt-generator" element={<PromptGeneratorPage />} />
                <Route path="/prompt-generator/:categorySlug" element={<PromptGeneratorPage />} />
            </Route>

            <Route
                element={
                    <PlatformVersionsProvider>
                        <LayoutWithSidebar nav={<SidebarRunPrompt />} />
                    </PlatformVersionsProvider>
                }
            >
                <Route path="/run-prompt" element={<RunPromptPage />} />
            </Route>

        </Routes>
    )
}
