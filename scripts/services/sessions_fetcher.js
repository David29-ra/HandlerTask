import { apiFetch } from "./api_fetch.js";

export const sessionFetcher = (function() {
  const login = (email, password) => apiFetch("login",
                                              { "Content-Type": "application/json" },
                                              "POST",
                                              { email, password})

  const logout = () => apiFetch("logout",
                                { Authorization: `Token token=${sessionStorage.getItem("token")}` },
                                "DELETE")

  return {login, logout}
})()
