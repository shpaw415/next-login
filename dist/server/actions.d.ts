export declare function credentialsLogin<T>({ loginCallback, onerror, }: {
    loginCallback: (data: T) => Promise<null | object>;
    onerror?: (data: T) => Promise<null | object>;
}): Promise<{
    login: (data: T) => Promise<true | object | null>;
    logout: () => Promise<void>;
    getSession: () => Promise<{
        status: boolean;
        data?: undefined;
    } | {
        data: T;
        status: boolean;
    }>;
}>;
