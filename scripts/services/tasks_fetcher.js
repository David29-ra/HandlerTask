import { apiFetch } from "./api_fetch.js";

export const taskFetcher = (function () {

  const list = () => apiFetch("tasks",
                              {Authorization: `Token token=${sessionStorage.getItem("token")}`})

  const create = (title, due_date) => apiFetch("tasks",
                                               { "Content-Type": "application/json",
                                               Authorization: `Token token=${sessionStorage.getItem("token")}`},
                                               "POST",
                                               { title, due_date})
  
  const update = (taskId, task) => apiFetch(`tasks/${taskId}`,
                                                            { "Content-Type": "application/json",
                                                            Authorization: `Token token=${sessionStorage.getItem("token")}`},
                                                            "PATCH",
                                                             task)

  return { list, create, update};
})();
