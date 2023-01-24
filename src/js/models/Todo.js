import { nanoid } from "nanoid";

import { storage } from "./Storage";

export default class Todo {
  constructor() {
    this.storage = storage;
  }

  delete(id, list) {
    const index = this.storage.todos[list].findIndex((i) => i.id === id);

    this.storage.todos[list].splice(index, 1);

    storage.pushToLocalStorage();
  }

  updateEdit(id, list, titleVal, dueVal) {
    for (let i = 0; i < this.storage.todos[list].length; i++) {
      if (this.storage.todos[list][i].id === id) {
        this.storage.todos[list][i].title = titleVal;
        this.storage.todos[list][i].due = dueVal;
        console.log(this.storage.todos);
      }
    }
    storage.pushToLocalStorage();
  }

  getUpdatedValues(e, callback, parentEl) {
    callback(e);
    console.log(parentEl);
    const id = parentEl.id;
    const list = parentEl.parentElement.previousElementSibling.textContent;
    const title = parentEl.children[0].children[0].value;
    const due = parentEl.children[0].children[1].value;

    this.updateEdit(id, list, title, due);
  }

  saveData(FormData) {
    const list = FormData.get("list");

    let todo = {
      id: nanoid(),
      title: FormData.get("title"),
      due: FormData.get("due"),
    };
    this.storage.todos[list].push(todo);
    this.storage.pushToLocalStorage();
    return todo;
  }

  getTodos(list) {
    return this.storage.todos[list];
  }

  getTodoListLength(list) {
    const len = this.storage.todos[list].length;
    return len;
  }
}
