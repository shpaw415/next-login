"use server";

import JWT from "../JWT";

type credsType = {
  onerror: () => unknown;
};

async function credentialsLogin<T>({
  loginCallback,
  onerror,
}: {
  loginCallback: (data: T) => Promise<null | object>;
  onerror?: (data: T) => Promise<void | object>;
}) {
  return async (data: T) => {
    const user = await loginCallback(data);
    if (!user) return onerror ? await onerror(data) : undefined;
    (await JWT()).setToken({ data });
    return true;
  };
}

export async function logout() {
  "use server";
  (await JWT()).deleteToken();
  return;
}
