## ENV variables

- JWT_SECRET=<random 32 char>

## -- Exemple --

### Credential Login

1. create ( server.ts & client.ts )

2. in server.ts

```TypeScript
	"use server";
	import { credentialsLogin } from "@shpaw415/next-login/server/actions"
	export async function handleLogin({
		username,
		password
	}: {
		username:string;
		password:string;
	}) {
		"use server";
		const loginFunction = await credentialsLogin<{
		username:string,
		password: string;
		}>({
			loginCallback: async (data) => {
				// data is {username, password}
				if(login === failed) return null;
				else if(login === success) {
					return {
						/* data to store in the token accessed in session */
					};
				}
			}
		})
		return  await  loginFunction({ username: username, password: password });
	}
```

3. in client.ts

```TypeScript
	import { handleLogin } from "server";

	// in a server action of your choice
	async function makeLogin() {
		const loginStatus = await handleLogin({
			username: "JohnDoe",
			password: "Pa33w0rd"
		});
		if(!loginStatus) //login did not work
		else // Login successful
	}
```
