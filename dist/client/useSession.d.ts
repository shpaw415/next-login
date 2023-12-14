/// <reference types="react" />
declare class Session {
    status: boolean;
    private sessionData;
    private updateList;
    private logoutCaller;
    setSessionData(data: {
        [key: string]: unknown;
    }): void;
    setLogout(caller: () => void): void;
    addUpdate(caller: {
        [key: string]: Function;
    }): void;
    getSession(): {};
    setstatus(value: boolean): void;
    /**
     * will update the dom for session related components
     */
    update(): void;
    logout(): void;
}
export declare const session: import("react").Context<Session>;
export default function useSession(): Session;
export {};
