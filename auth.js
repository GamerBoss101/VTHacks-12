import { createClient } from "@propelauth/javascript";

const authClient = createClient({
    authUrl: "https://auth.fooddecisive.co", // Replace with your actual auth URL
    enableBackgroundTokenRefresh: true // Optional
});

const authInfo = await authClient.getAuthenticationInfoOrNull();
if (authInfo) {
    console.log("User is logged in as", authInfo.user.email);
} else {
    console.log("User is not logged in");
}
