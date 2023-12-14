"use server";
import { JWT } from "../JWT";
export async function credentialsLogin({ loginCallback, onerror, }) {
    return async (data) => {
        const user = await loginCallback(data);
        if (!user)
            return onerror ? await onerror(data) : undefined;
        (await JWT()).setToken({ data: data });
        return true;
    };
}
export async function logout() {
    (await JWT()).deleteToken();
    return;
}
