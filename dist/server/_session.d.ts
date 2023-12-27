interface __makeLogStructure {
    loginCallback: (data: any) => Promise<null | object | true>;
}
export declare function _makeLogStructure<T, Session>({ loginCallback, }: __makeLogStructure): {
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
};
export {};
