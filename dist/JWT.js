"use server";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
export async function JWT() {
    class JWT {
        static cookie_name = "session_token";
        static createToken(data) {
            if (!process.env.JWT_SECRET)
                throw new Error("Please set < JWT_SECRET > as env variable");
            return sign(data, process.env.JWT_SECRET);
        }
        static exists() {
            return cookies().get(this.cookie_name) ? true : false;
        }
        static setToken({ data }) {
            cookies().set({
                name: this.cookie_name,
                value: this.createToken(data),
                httpOnly: true,
                path: "/",
            });
        }
        static deleteToken() {
            cookies().delete(this.cookie_name);
        }
        static decode() {
            const cookie = cookies().get(this.cookie_name)?.value;
            if (!cookie)
                return {};
            const decoded = verify(cookie, process.env.JWT_SECRET);
            if (!decoded)
                return {};
            return decoded;
        }
        static isLoged() {
            return cookies().get(this.cookie_name) ? true : false;
        }
        static getAll() {
            const val = this.decode();
            return val ? val : {};
        }
        static get(name) {
            const val = this.decode();
            const cookie = val ? val : {};
            return typeof cookie != "string" ? cookie[name] : {};
        }
    }
    return JWT;
}
