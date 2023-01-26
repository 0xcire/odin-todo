import { nanoid } from "../../../node_modules/nanoid/nanoid.js";

import { storage } from "./Storage.js";

import * as utils from "../utils/utils.js";

export default class Todo {
  constructor() {
    this.storage = storage;
  }

  delete(id, list) {
    const format = utils.addHyphen(list);
    const index = this.storage.todos[format].findIndex((i) => i.id === id);

    this.storage.todos[format].splice(index, 1);

    storage.pushToLocalStorage();
  }

  updateEdit(id, list, titleVal, dueVal, completed) {
    const format = utils.addHyphen(list);
    for (let i = 0; i < this.storage.todos[format].length; i++) {
      if (this.storage.todos[format][i].id === id) {
        this.storage.todos[format][i].title = titleVal;
        this.storage.todos[format][i].due = dueVal;
        this.storage.todos[format][i].completed = completed;
      }
    }
    storage.pushToLocalStorage();
  }

  getUpdatedValues(e, callback, parentEl) {
    callback(e);
    const id = parentEl.id;
    const list = parentEl.parentElement.previousElementSibling.textContent;
    const title = parentEl.children[0].children[0].value;
    const due = parentEl.children[0].children[1].value;
    const completed = parentEl.children[1].children[0].checked;

    this.updateEdit(id, list, title, due, completed);
  }

  saveData(FormData) {
    const list = FormData.get("list");

    let todo = {
      id: nanoid(),
      title: FormData.get("title"),
      due: FormData.get("due"),
      completed: false,
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
