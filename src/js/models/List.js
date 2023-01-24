import { storage } from "./Storage";

export default class List {
  constructor() {
    this.storage = storage;
  }

  addListToStorage(list) {
    this.storage.todos[list] = [];
    this.storage.pushToLocalStorage();
  }

  getLists() {
    return Object.keys(this.storage.todos);
  }

  delete(list) {
    document.querySelector(`#${list}`).remove();
    storage.removeList(list);
  }
  edit() {}
}
