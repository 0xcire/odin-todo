import { nanoid } from 'nanoid';

import storage from './Storage';

import * as utils from '../utils/utils';

export default class Todo {
  constructor() {
    this.storage = storage;
  }

  delete(id, list) {
    const dataName = utils.addHyphen(list);
    const index = this.storage.todos[dataName].findIndex((i) => i.id === id);

    this.storage.todos[dataName].splice(index, 1);

    storage.pushToLocalStorage();
  }

  updateEdit(id, list, values) {
    const formatList = utils.addHyphen(list);
    const [title, due, completed] = values;
    for (let i = 0; i < this.storage.todos[formatList].length; i += 1) {
      if (this.storage.todos[formatList][i].id === id) {
        this.storage.todos[formatList][i].title = title;
        this.storage.todos[formatList][i].due = due;
        this.storage.todos[formatList][i].completed = completed;
      }
    }
    storage.pushToLocalStorage();
  }

  static getUpdatedValues(inputs) {
    const values = [...inputs].map((input) => {
      if (input.type === 'checkbox') {
        return input.checked;
      }
      return input.value;
    });
    return values;
  }

  saveData(FormData) {
    const list = FormData.get('list');

    const todo = {
      id: nanoid(),
      title: FormData.get('title'),
      due: FormData.get('due'),
      completed: false,
    };
    this.storage.todos[list].push(todo);
    this.storage.pushToLocalStorage();
    return todo;
  }

  getTodos(list = 'Todos') {
    return this.storage.todos[list];
  }

  getTotalTodos(list) {
    return this.storage.todos[list].length;
  }

  addToCompleted(list, id) {
    const index = this.storage.todos[list].findIndex((todo) => todo.id === id);
    const completed = this.storage.todos[list].splice(index, 1);
    this.storage.todos.Complete.push(completed[0]);
    this.storage.pushToLocalStorage();
  }
}
