import { cookies } from "next/headers"

export const getUser = async () => {
    const user = (await cookies()).get("user")?.value;
    if (!user) return null;

    try {
        return JSON.parse(user)
    } catch (error) {
        return null
    }
}