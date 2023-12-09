"use server";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function JWT() {
  class JWT {
    static cookie_name = "session_token";

    static createToken(data: object) {
      return sign(data, process.env.JWT_SECRET as string);
    }
    public static exists() {
      return cookies().get(this.cookie_name) ? true : false;
    }
    public static setToken({ data }: { data: unknown }) {
      cookies().set({
        name: this.cookie_name,
        value: this.createToken(data as object),
        httpOnly: true,
        path: "/",
      });
    }
    public static deleteToken() {
      cookies().delete(this.cookie_name);
    }
    static decode() {
      const cookie = cookies().get(this.cookie_name)?.value;
      if (!cookie) return {};
      const decoded = verify(cookie, process.env.JWT_SECRET as string);
      if (!decoded) return {};
      return decoded;
    }
    static isLoged() {
      return cookies().get(this.cookie_name) ? true : false;
    }
    static getAll() {
      const val = this.decode();
      return val ? val : {};
    }
    public static get(name: string) {
      const val = this.decode();
      const cookie = val ? val : {};
      return typeof cookie != "string" ? (cookie[name] as unknown) : {};
    }
  }
  return JWT;
}
