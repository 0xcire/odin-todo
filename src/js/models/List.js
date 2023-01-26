import { storage } from "./Storage.js";

import * as utils from "../utils/utils.js";

export default class List {
  constructor() {
    this.storage = storage;
  }

  addListToStorage(list) {
    const formatList = utils.addHyphen(list);
    this.storage.todos[formatList] = [];
    this.storage.pushToLocalStorage();
  }

  getLists() {
    return Object.keys(this.storage.todos);
  }

  delete(list) {
    document.querySelector(`[data-name='${list}']`).remove();
    storage.removeList(list);
  }
  edit() {}
}
