/// <reference types="react" />
declare class Session {
    status: boolean;
    private sessionData;
    private updateList;
    setSessionData(data: {
        [key: string]: unknown;
    }): this;
    getSession(): {};
    setstatus(value: boolean): void;
    logout(): void;
    /**
     * will update the dom for session related components
     */
    update(): void;
    _addUpdate(caller: {
        [key: string]: Function;
    }): void;
}
export declare const session: import("react").Context<Session>;
export default function useSession(RenderOnUpdate: boolean): Session;
export {};
