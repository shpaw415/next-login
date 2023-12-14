import { getSession } from ".";
import JWT from "../JWT";
async function logout() {
    (await JWT()).deleteToken();
    return;
}
export function _makeLogStructure({ loginCallback }) {
    return {
        login: (data) => loginCallback(data),
        logout: async () => await logout(),
        getSession: async () => await getSession(),
    };
}
