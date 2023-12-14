export declare function JWT(): Promise<{
    new (): {};
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
