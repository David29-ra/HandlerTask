import { DOMHandler } from "../domhand.js";
import { userFetcher } from "../services/users_fetcher.js";
import { STORE } from "../store.js";
import { loginPage } from "./login.js";
import { mainPage } from "./main.js";

export const signUpPage = (() => {

  async function clickCreUser(e) {
    e.preventDefault();
    const { email, password } = e.target;
    console.log(email.value, password.value)
    try {
      const userCredential = await userFetcher.create(email.value, password.value);
      STORE.setUserData(userCredential);
      sessionStorage.setItem("token", userCredential.token);
      DOMHandler.render(mainPage);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  const clicklogin = function (e) {
    e.preventDefault();
    DOMHandler.render(loginPage);
  };
  
  return {
    render: () =>
    `<form class="login-form">
        <div class="form">
            
          <div class="label-input">
            <label>Email</label>
            <input type="email" class="input" name="email" placeholder="you@example.com" />
          </div>

          <div class="label-input">
            <label>Password</label>
            <input type="password" class="input" name="password" placeholder="******" />
          </div>

          <button type="submit">Create account</button>
          <a class="login" href="#login">Login</a>
        
        </div>
      </form>`,

    toListeners: () => {
      const form = document.querySelector(".login-form");
      form.addEventListener("submit", clickCreUser);

      const tolog = document.querySelector(".login");
      tolog.addEventListener("click", clicklogin);
    },
  };
})();