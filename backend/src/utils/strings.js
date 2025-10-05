export function createSlug(text) {
    const slug = text
        .toLowerCase()
        .replace(/[а-яё]/g, (char) => ({
            а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e",
            ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m",
            н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
            ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
            ь: "", ы: "y", ъ: "", э: "e", ю: "yu", я: "ya"
        }[char]))
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return `${slug}-${Date.now()}`;    
}
