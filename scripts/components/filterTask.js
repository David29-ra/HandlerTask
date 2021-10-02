import { DOMHandler } from "../domhand.js";
import { mainPage } from "../pages/main.js";
import { STORE } from "../store.js";
import { liTask } from "./taks.js";


export const section = function(option, option2) {

  function importTasks() {
    const tasks = STORE.getTasks();
    return tasks.map(task => liTask(task)).join("")
  }

  function importImportant(){
    const tasks = STORE.getImportantTasks();
    return tasks.map((task) => liTask(task)).join("")
  }

  function importPending(){
    const tasks = STORE.getPendingTasks();
    return tasks.map((task) => liTask(task)).join("")
  }

  switch (option) {
    case "":
      return `${importTasks()}/${option2}`;
    case "pending":
      return `${importPending()}/${option2}`;
    case "important":
      return `${importImportant()}/${option2}`;
  }
}

export const sortType = function(e) {
  console.log(STORE.getSortMode())
  STORE.setSortMode(e.target.value)
  DOMHandler.render(mainPage)
  console.log(STORE.getSortMode())
}