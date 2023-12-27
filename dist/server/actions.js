import JWT from "../JWT";
import { _makeLogStructure } from "./_session";
export async function credentialsLogin({ loginCallback, onerror, }) {
    return _makeLogStructure({
        loginCallback: async (data) => {
            const user = await loginCallback(data);
            if (!user)
                return onerror ? await onerror(data) : null;
            (await JWT()).setToken({ data: user });
            return true;
        },
    });
}
