"use server";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
export default async function JWT() {
    if (!process.env.JWT_SECRET)
        throw new Error("Please set < JWT_SECRET > as env variable");
    class JWT {
        cookie_name = "session_token";
        createToken(data) {
            return sign(data, process.env.JWT_SECRET);
        }
        exists() {
            return cookies().get(this.cookie_name) ? true : false;
        }
        setToken({ data }) {
            cookies().set({
                name: this.cookie_name,
                value: this.createToken(data),
                httpOnly: true,
                path: "/",
            });
        }
        deleteToken() {
            cookies().delete(this.cookie_name);
        }
        decode() {
            const cookie = cookies().get(this.cookie_name)?.value;
            if (!cookie)
                return {};
            const decoded = verify(cookie, process.env.JWT_SECRET);
            if (!decoded)
                return {};
            return decoded;
        }
        isLoged() {
            return cookies().get(this.cookie_name) ? true : false;
        }
        getAll() {
            const val = this.decode();
            return val ? val : {};
        }
        get(name) {
            const val = this.decode();
            const cookie = val ? val : {};
            return typeof cookie != "string" ? cookie[name] : {};
        }
    }
    return new JWT();
}
