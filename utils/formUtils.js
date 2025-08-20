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
    return str.replace(/([a-z])([A-Z][a-z])/g, "$1 $2").replace(/([a-z])([A-Z]+$)/g, "$1 $2").replace(/^./, (s) => s.toUpperCase()).trim();
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
