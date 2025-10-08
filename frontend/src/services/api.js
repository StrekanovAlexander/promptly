const API_URL = import.meta.env.VITE_API_URL;

// Prompts
export async function getPrompts() {
    const res = await fetch(`${API_URL}/prompts`);
    if (!res.ok) throw new Error("Failed to fetch prompts");
    return res.json();
}

export async function getPrompt(id) {
    const res = await fetch(`${API_URL}/prompts/${id}`);
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

export async function updatePrompt(data) {
    const token = localStorage.getItem("token");
    const { id, ...restData } = data;
    const res = await fetch(`${API_URL}/prompts/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(restData),
    });
    if (!res.ok) throw new Error("Failed to create prompt");
    return res.json();
}
// Prompts By User
export async function getPromptsByUser(id, token) {
    const res = await fetch(`${API_URL}/prompts/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) throw new Error("Failed to fetch user prompts");
    return res.json();
}
// Categories
export async function getCategories() {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}
// Platforms
export async function getPlatforms() {
    const res = await fetch(`${API_URL}/platforms`);
    if (!res.ok) throw new Error("Failed to fetch platforms");
    return res.json();
}
// Categories
export async function getPostCategories() {
    const res = await fetch(`${API_URL}/post-categories`);
    if (!res.ok) throw new Error("Failed to fetch post categories");
    return res.json();
}
// Posts
export async function getPosts() {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}

export async function getPost(id) {
    const res = await fetch(`${API_URL}/posts/${id}`);
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
}
// User data
// export async function getUserData(id) {
//     const res = await fetch(`${API_URL}/users/${id}`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
//     
//     if (!res.ok) throw new Error("Failed to fetch user data");
//     return res.json();
// }
