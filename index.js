import { DOMHandler } from "./scripts/domhand.js";
import { loginPage } from "./scripts/pages/login.js";
import { mainPage } from "./scripts/pages/main.js";
import { taskFetcher } from "./scripts/services/tasks_fetcher.js";
import { STORE } from "./scripts/store.js";

(async () => {
  if (sessionStorage.getItem("token")) {
    try {
      const tasks = await taskFetcher.list();
      STORE.setTasks(tasks);
      return DOMHandler.render(mainPage);
    } catch (e) {
      console.log(e);
      sessionStorage.removeItem("token");
    }
  }
  DOMHandler.render(loginPage);
})();
