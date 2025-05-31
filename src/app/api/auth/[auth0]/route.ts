import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0"

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/connectedPage"
  }),
  logout: handleLogout({
    returnTo: "/",
    logoutParams: {
      federated: true
    }
  }),
  signup: handleLogin({
    returnTo: "/connectedPage",
    authorizationParams: {
      screen_hint: "signup"
    }
  })
})

export const POST = handleAuth({
  login: handleLogin({
    returnTo: "/connectedPage"
  }),
  logout: handleLogout({
    returnTo: "/",
    logoutParams: {
      federated: true
    }
  })
})
