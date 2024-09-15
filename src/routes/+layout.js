// import {createClient} from "@propelauth/javascript";
// const authClient = createClient({
//     authUrl: "https://auth.fooddecisive.co/",
//     enableBackgroundTokenRefresh: true,
// });

// export async function load() {

//     const authInfo = await authClient.getAuthenticationInfoOrNull();
//     console.log("authInfo", authInfo)
//     if (authInfo) {
//         console.log("User is logged in as", authInfo.user.email)
//     } else {
//         console.log("User is not logged in")
//     }

//     return {
//         authInfo: authInfo ? authInfo : null
//     };
// }