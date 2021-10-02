export const STORE = (function(){
  let userData = {}
  let tasks = []
  let pending = false
  let important = false

  function setPendBool(data) {
    pending = data
  }

  function getPendBool() {
    return pending
  }

  function setImpBool(data) {
    important = data
  }

  function getImpBool() {
    return important
  }

  function setUserData(data) {
    userData = data
  }

  function getUserData() {
    return {...userData}
  }

  function setUserData(data) {
    userData = data
  }

  function getUserData() {
    return {...userData}
  }

  function setTasks(apiTasks) {
    tasks = apiTasks;
  }

  function getTasks() {
    return [...tasks]
  }

  function getImportantTasks() {
    return [...tasks].filter( task => task.important === true)
  }

  function getPendingTasks() {
    return [...tasks].filter( task => task.completed === false)
  }

  function addNewTask(newtask) {
    tasks = [...tasks, newtask]
  }

  function getSortAlphabetic() {
    console.log('sort alpha')
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title))
  }

  function getSortDate() {
    console.log('sort date')
    return [...tasks].sort(function(a, b) {
        const first = new Date(a.due_date) - new Date()
        const second = new Date(b.due_date) - new Date()
        return first - second
    })
  }

  function getSortImportance() {
    console.log('importance')
    return [...tasks].sort((a, b) => b.important - a.important)
  }

  function getTask(taskId) {
    return [...tasks].find(task => task.id === taskId)
  }

  return {
    setUserData,
    getUserData,
    setTasks,
    getTasks,
    addNewTask,
    getImportantTasks,
    getTask,
    getPendingTasks,
    getSortAlphabetic,
    getSortDate,
    getSortImportance,
    setImpBool,
    getImpBool,
    setPendBool,
    getPendBool
  }
})()