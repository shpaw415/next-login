export declare function credentialsLogin<T, Session>({ loginCallback, onerror, }: {
    loginCallback: (data: T) => Promise<null | Session>;
    onerror?: (data: T) => Promise<null | object>;
}): Promise<{
    login: (data: T) => Promise<true | object | null>;
    logout: () => Promise<void>;
    getSession: () => Promise<{
        status: true;
        data: Session;
    } | {
        status: false;
        data: {};
    }>;
    updateSession: (data: Session) => Promise<void>;
}>;
