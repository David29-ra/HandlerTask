import { DOMHandler } from "../domhand.js";
import { mainPage } from "../pages/main.js";
import { STORE } from "../store.js";
import { liTask } from "./taks.js";


export const section = function(showOption, sortOption) {

  function importTasks() {
    const tasks = STORE.getTasks();
    return STORE.doSort(tasks, sortOption).map(liTask).join("")
  }

  function importImportant(){
    const tasks = STORE.getImportantTasks();
    return STORE.doSort(tasks, sortOption).map(liTask).join("")
  }

  function importPending(){
    const tasks = STORE.getPendingTasks();
    return STORE.doSort(tasks, sortOption).map(liTask).join("")
  }

  switch (showOption) {
    case "":
      return `${importTasks()}`;
    case "pending":
      return `${importPending()}`;
    case "important":
      return `${importImportant()}`;
  }
}

export const sortType = function(e) {
  STORE.setSortMode(e.target.value)
  STORE.setImpBool(document.querySelector(".js-i input").checked)
  STORE.setPendBool(document.querySelector(".js-p input").checked)
  DOMHandler.render(mainPage)
}