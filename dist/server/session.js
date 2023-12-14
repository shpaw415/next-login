import JWT from "../JWT";
export async function getSession() {
    try {
        const token = await JWT();
        if (!token.isLoged())
            return { status: false };
        let data = token.getAll();
        if (typeof data == "string")
            data = JSON.parse(data);
        return { data: data, status: true };
    }
    catch (e) {
        return { status: false };
    }
}
export async function createSession(data) {
    const token = await JWT();
    token.setToken({ data: { status: true, ...data } });
}
