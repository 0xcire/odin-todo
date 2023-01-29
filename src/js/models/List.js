import storage from './Storage';

import * as utils from '../utils/utils';

export default class List {
  constructor() {
    this.storage = storage;
  }

  addListToStorage(list) {
    const formatList = utils.addHyphen(list);
    this.storage.todos[formatList] = [];
    this.storage.pushToLocalStorage();
  }

  getTodos(list) {
    return this.storage.todos[list];
  }

  getLists() {
    return Object.keys(this.storage.todos);
  }

  delete(list) {
    document.querySelector(`[data-name='${list}']`).remove();
    this.storage.removeList(list);
  }
}
