export function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (isNaN(date)) return "—";
    return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(date);
}
