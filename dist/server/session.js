import JWT from "../JWT";
export async function getSession() {
    let response = {
        status: false,
        data: {},
    };
    try {
        const token = await JWT();
        if (!token.isLoged())
            return response;
        let data = token.getAll();
        if (typeof data == "string")
            data = JSON.parse(data);
        response.status = true;
        response.data = data;
    }
    catch (e) {
        response.status = false;
    }
    return response;
}
export async function createSession(data) {
    const token = await JWT();
    token.setToken({ data: { status: true, ...data } });
}
export async function updateSession(data) {
    await createSession(data);
}
