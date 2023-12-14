interface __makeLogStructure {
    loginCallback: (data: any) => Promise<null | object | true>;
}
export declare function _makeLogStructure<T>({ loginCallback }: __makeLogStructure): {
    login: (data: T) => Promise<true | object | null>;
    logout: () => Promise<void>;
    getSession: () => Promise<{
        status: boolean;
        data?: undefined;
    } | {
        data: T;
        status: boolean;
    }>;
};
export {};
