## ENV variables

- JWT_SECRET=<random 32 char>

## -- Exemple --

### Credential Login

1. create ( server.ts & client.ts )

2. in server.ts

```TypeScript
"use server";
import { credentialsLogin } from "@shpaw415/next-login";

async function logOpts() {
  return await credentialsLogin<{
    username: string;
    password: string;
  }>({
    loginCallback: async (data) => {
      return { username: data.username };
    },
  });
}

export const Login = async (data: { username: string; password: string }) =>
  (await logOpts()).login(data);

export const Logout = async () => (await logOpts()).logout();

export const getSession = async () => (await logOpts()).getSession();


```

3. in client.ts

```TypeScript
import { handleLogin, getSessionData, Logout } from "./server";
import { useSession } from "@shpaw415/next-login";

export default ReactElement() {
	const session = useSession(false);
	const serverAction_makeLogin = async () => {
		const logopts
		const loginStatus = await LogOpts({
			username: "JohnDoe",
			password: "Pa33w0rd"
		});
		if(!loginStatus) { /*login did not work...*/ }
		else {
			/*Login Success*/
			session.setSessionData(await getSessionData());
		}
	};
	const serverAction_logout = async () => {
		await Logout();
		session.logout();
	}
}
```

## Feature Docs

### useSession

- Every React-Components using: useSession(true)
  will be reRendered with the call of method ( session.setStatus(), session.setSessionData() or session.logout() )
