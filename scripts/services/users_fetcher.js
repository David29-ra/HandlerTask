import { apiFetch } from "./api_fetch.js";

export const userFetcher = (function () {

  const create = (email, password) => apiFetch("signup",
                                               { "Content-Type": "application/json" },
                                               "POST",
                                               { email, password })

  return { create }
})();
