export default function JWT(): Promise<{
    cookie_name: string;
    createToken(data: object): string;
    exists(): boolean;
    setToken({ data }: {
        data: unknown;
    }): void;
    deleteToken(): void;
    decode(): string | import("jsonwebtoken").JwtPayload;
    isLoged(): boolean;
    getAll(): string | import("jsonwebtoken").JwtPayload;
    get(name: string): unknown;
}>;
