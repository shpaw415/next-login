export declare function getSession<T>(): Promise<{
    status: true;
    data: T;
} | {
    status: false;
    data: {};
}>;
export declare function createSession(data: object): Promise<void>;
export declare function updateSession(data: object): Promise<void>;
