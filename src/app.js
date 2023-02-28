import Todo from './js/models/Todo';
import List from './js/models/List';

import TodoView from './js/views/todoView';
import ListView from './js/views/listView';

import TodoController from './js/controllers/todoController';
import ListController from './js/controllers/listController';

import storage from './js/models/Storage';

const state = {
  list: new List(),
  todo: new Todo(),
  ListView: new ListView(),
  TodoView: new TodoView(),
};

document.addEventListener('DOMContentLoaded', () => {
  storage.getDataFromLocal();

  const todoController = new TodoController(state);
  const listController = new ListController(state);
  todoController.init();
  listController.init();
});
