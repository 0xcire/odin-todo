import storage from './Storage';

import * as utils from '../utils/utils';

export default class List {
  constructor() {
    this.storage = storage;
  }

  addListToStorage(list) {
    const dataName = utils.addHyphen(list);
    this.storage.todos[dataName] = [];
    this.storage.pushToLocalStorage();
  }

  getTodos(list = 'All') {
    return this.storage.todos[list];
  }

  clearTodos(list = 'All') {
    this.storage.todos[list] = [];
    this.storage.pushToLocalStorage();
  }

  getLists() {
    return Object.keys(this.storage.todos);
  }

  delete(list) {
    document.querySelector(`[data-name='${list}']`).remove();
    this.storage.removeList(list);
  }
}
