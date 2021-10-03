import { section, sortType } from "../components/filterTask.js";
import { DOMHandler } from "../domhand.js";
import { taskFetcher } from "../services/tasks_fetcher.js";
import { STORE } from "../store.js";
import { loginPage } from "./login.js";

export const mainPage = (() => {
  
  function clickShow(e) {
    const div = document.querySelector(".task-list ul")
    let pendingCheck = e.target.id === 'pending'
    let importantCheck = e.target.id === 'important'

    let inputPendCheck = document.querySelector(".js-p input").checked
    let inputImpoCheck = document.querySelector(".js-i input").checked

    if(pendingCheck && inputPendCheck) {
      document.querySelector(".js-i input").checked = false
      div.innerHTML = section("pending",STORE.getSortMode())
    }

    if((inputPendCheck == false) && pendingCheck) {
      inputPendCheck = true
      div.innerHTML = section('',STORE.getSortMode())
    }
    
    if(inputImpoCheck && importantCheck) {
      document.querySelector(".js-p input").checked = false;
      div.innerHTML = section("important",STORE.getSortMode())
    }
    
    if((inputImpoCheck == false) && importantCheck) {
      inputPendCheck = false;
      div.innerHTML = section('',STORE.getSortMode())
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

  function toLogout() {
    DOMHandler.render(loginPage)
    sessionStorage.removeItem("token")
    const toLog =  document.querySelector('.add-img')
    toLog.setAttribute("class", "header")
    toLog.innerHTML = `<img src="./assets/img/{doable}.svg" />`
  }

  return {
    render: () => {
      const toLog =  document.querySelector('.header')
      if(toLog !== null) {
        toLog.setAttribute("class", "add-img")
        toLog.innerHTML = `<img src="./assets/img/{doable}.svg" />
                        <img id="out" src="./assets/icons/not.svg" />`}
      
      let tasklist = section('', STORE.getSortMode())
      if(document.querySelector(".js-i input") === null) tasklist = section('', STORE.getSortMode() )
      else {
        if (STORE.getPendBool()) tasklist = section('pending', STORE.getSortMode())
        if (STORE.getImpBool()) tasklist = section('important', STORE.getSortMode())
      }
      return `<div class="container">
                <div class="options">
                  <div class="sort">
                    <p>Sort</p>
                    <select>
                      <option value="" ${STORE.getSortMode() == "" ? "selected" : ""}>Kind of sort …</option>
                      <option value="alpha" ${STORE.getSortMode() == "alpha" ? "selected" : ""} >Alphabetical (a-z)</option>
                      <option value="date" ${STORE.getSortMode() == "date" ? "selected" : ""}>Due date</option>
                      <option value="import" ${STORE.getSortMode() == "import" ? "selected" : ""}>Importance</option>
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

      const logOut = document.querySelector('.add-img #out')
      logOut.addEventListener('click', toLogout )
    },
  };
})();