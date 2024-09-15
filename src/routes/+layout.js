import {createClient} from "@propelauth/javascript";
const authClient = createClient({
    authUrl: "https://auth.fooddecisive.co/",
    enableBackgroundTokenRefresh: true,
});

export async function load() {

    const authInfo = await authClient.getAuthenticationInfoOrNull();
    console.log("authInfo", authInfo)
    return {
        authInfo: authInfo ? authInfo : null
    };
}