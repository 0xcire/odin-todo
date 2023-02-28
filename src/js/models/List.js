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

  getTodos(list = 'Todos') {
    return this.storage.todos[list];
  }

  clearTodos(list = 'Todos') {
    this.storage.todos[list] = [];
    this.storage.pushToLocalStorage();
  }

  getLists() {
    return Object.keys(this.storage.todos);
  }

  delete(list) {
    this.storage.removeList(list);
  }

  getListCounts() {
    const counts = Object.keys(this.storage.todos).map(
      (list) => this.storage.todos[list].length
    );
    return counts;
  }

  setLastViewedList(list = 'Todos') {
    this.storage.last = list;
    this.storage.pushToLocalStorage();
  }

  getLastViewed() {
    return this.storage.last;
  }
}
