export declare function getSession<T>(): Promise<{
    status: boolean;
    data?: undefined;
} | {
    data: T;
    status: boolean;
}>;
export declare function createSession(data: object): Promise<void>;
