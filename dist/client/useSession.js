"use client";
import { useContext, createContext, useEffect, useState, useMemo } from "react";
class Session {
    status = false;
    sessionData = {};
    updateList = {};
    setSessionData(data) {
        this.sessionData = data;
        this.setstatus(true);
        return this;
    }
    getSession() {
        return this.sessionData;
    }
    setstatus(value) {
        this.status = value;
        this.update();
    }
    logout() {
        this.sessionData = {};
        this.setstatus(false);
    }
    /**
     * will update the dom for session related components
     */
    update() {
        for (const i of Object.values(this.updateList)) {
            i(Math.random());
        }
    }
    _addUpdate(caller) {
        this.updateList = { ...this.updateList, ...caller };
    }
}
export const session = createContext(new Session());
export default function useSession(RenderOnUpdate) {
    const [, setUpdate] = useState(Math.random());
    const id = useMemo(() => RandomString(10), []);
    const contextsession = useContext(session);
    useEffect(() => {
        if (RenderOnUpdate === true)
            contextsession._addUpdate({ [id]: setUpdate });
    }, [contextsession, id]);
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
