"use client";

import {
  useContext,
  useTransition,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getSession } from "../server/session";
import { logout } from "../server/actions";

class Session {
  public inited = false;
  public status: boolean = false;
  private sessionData = {};
  private updateList: { [key: string]: Function } = {};
  private logoutCaller: undefined | (() => void);

  setSessionData(data: { [key: string]: unknown }) {
    this.sessionData = data;
  }
  setLogout(caller: () => void) {
    if (this.logoutCaller) return;
    this.logoutCaller = caller;
  }
  addUpdate(caller: { [key: string]: Function }) {
    this.updateList = { ...this.updateList, ...caller };
  }
  public getSession() {
    return this.sessionData;
  }
  /**
   * will update the dom for session related components
   */
  public update() {
    console.log(this.updateList);
    for (const i of Object.values(this.updateList)) {
      i(Math.random());
    }
  }
  public logout() {
    if (this.logoutCaller) {
      this.logoutCaller();
      this.status = false;
      this.sessionData = {};
      this.update();
    }
  }
  //public login() {}
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
          const data = JSON.parse(sessionData) as {
            status: boolean;
            data: { [key: string]: unknown };
          };
          contextsession.setSessionData(data.data);
          contextsession.status = data.status;
        }
      }
    });
  }, [contextsession]);
  useEffect(
    () =>
      contextsession.setLogout(() => {
        setTransition(async () => {
          await logout();
        });
      }),
    [contextsession]
  );
  useEffect(() => caller, [caller, update]);
  useEffect(
    () => contextsession.addUpdate({ [id]: setUpdate }),
    [contextsession, id]
  );
  return contextsession;
}

function RandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
