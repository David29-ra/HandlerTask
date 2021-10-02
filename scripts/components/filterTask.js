import { STORE } from "../store.js";
import { liTask } from "./taks.js";


export const section = function(option) {

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
      return `${importTasks()}`;
    case "pending":
      return `${importPending()}`;
    case "important":
      return `${importImportant()}`;
  }
}