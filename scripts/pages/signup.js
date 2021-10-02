import { DOMHandler } from "../domhand.js";
import { sessionFetcher } from "../services/sessions_fetcher.js";
import { loginPage } from "./login.js";

export const signUpPage = (() => {

  async function clickCreUser(e) {
    e.preventDefault();
    const { email, password } = e.target;
    try {
      const userCredential = await sessionFetcher.login(
        email.value,
        password.value
      );
      // STORE.setUserData(userData);
      sessionStorage.setItem("token", userCredential.token);
      // const boards = await BoardFetcher.index();
      // STORE.setBoards(boards);
      // DOMHandler.render(Board);
      console.log(userCredential.token)
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