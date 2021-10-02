import { DOMHandler } from "../domhand.js";
import { sessionFetcher } from "../services/sessions_fetcher.js";
import { taskFetcher } from "../services/tasks_fetcher.js";
import { STORE } from "../store.js";
import { mainPage } from "./main.js";
import { signUpPage } from "./signup.js";

export const loginPage = (() => {

  async function clickLogs(e) {
    e.preventDefault();
    const { email, password } = e.target;
    try {
      const userCredential = await sessionFetcher.login(
        email.value,
        password.value
      );
      console.log(email.value, password.value)
      STORE.setUserData(userCredential);
      sessionStorage.setItem("token", userCredential.token);
      const tasks = await taskFetcher.list();
      STORE.setTasks(tasks);
      DOMHandler.render(mainPage);
      console.log(userCredential.token)
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  const clickSingup = function(e) {
    e.preventDefault();
    DOMHandler.render(signUpPage);
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

          <button type="submit">Login</button>
          <a class = "signup" href="#signup">Create account</a>
        
        </div>
      </form>`,

    toListeners: () => {
      const form = document.querySelector(".login-form");
      form.addEventListener("submit", clickLogs);

      const acreate = document.querySelector(".signup");
      acreate.addEventListener("click", clickSingup);
    },
  };
})();