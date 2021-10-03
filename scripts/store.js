export const STORE = (function(){
  let userData = {}
  let tasks = []
  let pending = false
  let important = false
  let sortMode = ""

  function setSortMode(data) {
    sortMode = data
  }

  function getSortMode() {
    return sortMode
  }

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

  function getTask(taskId) {
    return [...tasks].find(task => task.id === taskId)
  }

  function doSort(arr, option) {

    function getSortAlphabetic(array) {
      return [...array].sort((a, b) => a.title.localeCompare(b.title))
    }
  
    function getSortDate(array) {
      return [...array].sort(function(a, b) {
          const first = new Date(a.due_date) - new Date()
          const second = new Date(b.due_date) - new Date()
          return first - second
      })
    }
  
    function getSortImportance(array) {
      return [...array].sort((a, b) => b.important - a.important)
    }

    switch (option) {
      case "alpha":
        return getSortAlphabetic(arr)
      case "date":
        return getSortDate(arr)
      case "import":
        return getSortImportance(arr)
      default:
        return arr
    }
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
    doSort,
    setImpBool,
    getImpBool,
    setPendBool,
    getPendBool,
    setSortMode,
    getSortMode
  }
})()