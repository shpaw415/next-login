export declare function credentialsLogin<T>({ loginCallback, onerror, }: {
    loginCallback: (data: T) => Promise<null | object>;
    onerror?: (data: T) => Promise<void | object>;
}): Promise<(data: T) => Promise<true | void | object>>;
export declare function logout(): Promise<void>;
