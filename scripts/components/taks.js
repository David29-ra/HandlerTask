export const liTask = function(task) {
  const imp = task.important ? "important_p" : "important_b"
  const com = task.completed ? "checked" : ""

  return `<li>
            <input id = "${task.id}" class="completed" type="checkbox" ${com}/>
            <p>${task.title}</p>
            <img id = "${task.id}" class="important" src="./assets/icons/${imp}.svg" alt="importance" />
          </li>`
}