import { section, sortType } from "../components/filterTask.js";
import { liTask } from "../components/taks.js";
import { DOMHandler } from "../domhand.js";
import { taskFetcher } from "../services/tasks_fetcher.js";
import { STORE } from "../store.js";

export const mainPage = (() => {

  // function importTasks() {
  //   const tasks = STORE.getTasks();
  //   return tasks.map(task => liTask(task)).join("")
  // }

  function clickShow(e) {
    const div = document.querySelector(".task-list ul")
    let pendingCheck = e.target.id === 'pending'
    let importantCheck = e.target.id === 'important'

    let inputPendCheck = document.querySelector(".js-p input").checked
    let inputImpoCheck = document.querySelector(".js-i input").checked


    if(pendingCheck && inputPendCheck) {
      document.querySelector(".js-i input").checked = false
      div.innerHTML = section("pending",STORE.getSortMode())
      return;
    }

    if((inputPendCheck == false) && pendingCheck) {
      inputPendCheck = true
      div.innerHTML = section('',STORE.getSortMode())
      return;
    }
    
    if(inputImpoCheck && importantCheck) {
      document.querySelector(".js-p input").checked = false;
      div.innerHTML = section("important",STORE.getSortMode())
      return;
    }
    
    if((inputImpoCheck == false) && importantCheck) {
      inputPendCheck = false;
      div.innerHTML = section('',STORE.getSortMode())
      return;
    }
  }
  
  async function createTask(e) {
    e.preventDefault()
    const {title, due_date} = e.target
    const newTask = await taskFetcher.create(title.value, due_date.value)
    STORE.addNewTask(newTask)
    DOMHandler.render(mainPage)
  }

  async function clickToEdit(e) {
    const div = document.querySelector(".task-list ul")
    const objTarget = e.target
    const task = STORE.getTask(parseInt(objTarget.id))
    task[objTarget.className] = !task[objTarget.className]

    await taskFetcher.update(parseInt(objTarget.id), task)

    STORE.setImpBool(document.querySelector(".js-i input").checked)
    STORE.setPendBool(document.querySelector(".js-p input").checked)
    
    DOMHandler.render(mainPage)
  }

  return {
    render: () => {
      let tasklist = section('', STORE.getSortMode())
      if(document.querySelector(".js-i input") === null){
        tasklist = section('', STORE.getSortMode() )
      }else {
        if (STORE.getPendBool()) {
          tasklist = section('pending', STORE.getSortMode())
        }
        if (STORE.getImpBool()) {
          tasklist = section('important', STORE.getSortMode())
      }}
      return `<div class="container">
                <div class="options">
                  <div class="sort">
                    <p>Sort</p>
                    <select>
                      <option value="">Kind of sort …</option>
                      <option value="alpha">Alphabetical (a-z)</option>
                      <option value="date">Due date</option>
                      <option value="import">Importance</option>
                    </select>
                  </div>
                  <div class="show">
                    <p>Show</p>
                    <span class="js-filter">
                      <div class="input-show js-p">
                        <input id="pending" type="checkbox" ${STORE.getPendBool() ? "checked" : ""}/>
                        <label id="pending" >Only pending</label>
                      </div>
                    
                      <div class="input-show js-i">
                        <input id="important" type="checkbox" ${STORE.getImpBool() ? "checked" : ""}/>
                        <label id="important" >Only important</label>
                      </div>
                    </span>
                  </div>
                </div>

                <div class="task-list js-content">
                  <ul>
                    ${tasklist}
                  </ul>
                </div>

                <div class="dish-form">

                  <form class="form">

                    <div class="label-input">
                      <input class="input" type="text" name="title"placeholder="do the dishes..." />
                    </div>

                    <div class="label-input">
                      <input class="input" type="date" name="due_date"/>
                    </div>
              
                    <button type="submit">Add Task</button>

                  </form>
                </div>
              </div>`
    },

    toListeners: () => {
      const filtertask = document.querySelectorAll(".input-show input")
      filtertask.forEach(target => target.addEventListener("change", clickShow))

      const fomr = document.querySelector('.form')
      fomr.addEventListener('submit', createTask)

      const toEdit = document.querySelector('.task-list ul')
      toEdit.addEventListener('click', clickToEdit)

      const sort = document.querySelector('.sort select')
      sort.addEventListener('click', sortType)
    },
  };
})();