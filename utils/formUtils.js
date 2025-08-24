export function cleanFormEntries(entries) {
    const forbiddenKeys = ["$ACTION_REF_", "$ACTION_KEY", "$ACTION_"];

    return Object.fromEntries(
        Object.entries(entries).filter(([key]) => {
            // remove any keys that start with those forbidden prefixes
            return !forbiddenKeys.some((prefix) => key.startsWith(prefix));
        })
    );
}

export function camelToNormal(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^./, (s) => s.toUpperCase())
        .trim();
}

export function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDateToYMD(isoDateString) {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months start at 0
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export function timeAgo(isoDateString) {
    const inputDate = new Date(isoDateString);
    const now = new Date();

    // Difference in seconds
    const diffInSeconds = Math.floor((now - inputDate) / 1000);

    if (diffInSeconds < 60) return "just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "a day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) return "a week ago";
    if (diffInWeeks < 5) return `${diffInWeeks} weeks ago`;

    // fallback -> show exact date using your function
    return formatDateToYMD(isoDateString);
}
