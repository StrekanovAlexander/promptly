const API_URL = import.meta.env.VITE_API_URL;

// Prompts
export async function getPrompts() {
    const res = await fetch(`${API_URL}/prompts`);
    if (!res.ok) throw new Error("Failed to fetch prompts");
    return res.json();
}

export async function createPrompt(data) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/prompts`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create prompt");
    return res.json();
}
// Categories
export async function getCategories() {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}
// User data
export async function getUserData(id) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    if (!res.ok) throw new Error("Failed to fetch user data");
    return res.json();
}
