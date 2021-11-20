export const liTask = function(task) {
  const com = task.completed ? "checked" : ""
  const imp = task.important ? (com? "importantpb" : "important_p") : "important_b"

  return `<li>
            
            <input id = "${task.id}" class="completed" type="checkbox" ${com}/>
            <p class="${com? "colorp" : ""}">${task.title}</p>
            <img id = "${task.id}" class="important" src="./assets/icons/${imp}.svg" alt="importance" />
            
            ${task.due_date? `<br><div><span class="${com? "colord" : "date"}">${new Date(task.due_date).toDateString()}</span></div></br>` : ""}
          </li>`
}