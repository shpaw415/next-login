"use server";

import JWT from "../JWT";

export async function getSession() {
  "use server";
  try {
    const token = await JWT();
    if (!token.isLoged()) return JSON.stringify({ status: false });
    let data = token.getAll();
    if (typeof data == "string") data = { data: data };
    return JSON.stringify({ ...data, status: true });
  } catch (e) {
    return JSON.stringify({ status: false });
  }
}

export async function createSession(data: object) {
  const token = await JWT();
  token.setToken({ data: { status: true, ...data } });
}
