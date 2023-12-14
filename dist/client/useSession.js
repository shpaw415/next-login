"use client";
import { useContext, useTransition, createContext, useEffect, useState, useCallback, } from "react";
import { getSession } from "../server/session";
import { logout } from "../server/actions";
class Session {
    status = false;
    sessionData = {};
    updateList = {};
    logoutCaller;
    setSessionData(data) {
        this.sessionData = data;
    }
    setLogout(caller) {
        if (this.logoutCaller)
            return;
        this.logoutCaller = caller;
    }
    addUpdate(caller) {
        this.updateList = { ...this.updateList, ...caller };
    }
    getSession() {
        return this.sessionData;
    }
    setstatus(value) {
        this.status = value;
    }
    /**
     * will update the dom for session related components
     */
    update() {
        for (const i of Object.values(this.updateList)) {
            i(Math.random());
        }
    }
    logout() {
        if (this.logoutCaller) {
            this.logoutCaller();
            this.status = false;
            this.sessionData = {};
            this.update();
        }
    }
}
export const session = createContext(new Session());
export default function useSession() {
    const [transition, setTransition] = useTransition();
    const [update, setUpdate] = useState(Math.random());
    const [id, setid] = useState(RandomString(10));
    const contextsession = useContext(session);
    const caller = useCallback(() => {
        setTransition(async () => {
            if (!contextsession.status) {
                const sessionData = await getSession();
                if (sessionData != null) {
                    const data = JSON.parse(sessionData);
                    contextsession.setSessionData(data.data);
                    contextsession.setstatus(data.status);
                }
            }
        });
    }, [contextsession]);
    useEffect(() => contextsession.setLogout(() => {
        setTransition(async () => {
            await logout();
        });
    }), [contextsession]);
    useEffect(() => caller(), [caller, update]);
    useEffect(() => contextsession.addUpdate({ [id]: setUpdate }), [contextsession, id]);
    return contextsession;
}
function RandomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
