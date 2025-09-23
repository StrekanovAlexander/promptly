import { FiltersProvider } from "./context/FiltersContext.jsx";
import Layout from "./components/layouts/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";

export default function App() {
    return (
        <FiltersProvider>
            <Layout>
                <HomePage />       
            </Layout>
        </FiltersProvider>
    );
}
