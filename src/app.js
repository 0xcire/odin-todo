import * as tV from './js/views/todoView';
import Todo from './js/models/Todo';

import * as lV from './js/views/listView';
import List from './js/models/List';

import storage from './js/models/Storage';

import elements from './js/views/DOM';

import * as utils from './js/utils/utils';

const state = {
  list: new List(),
  todo: new Todo(),
};

document.addEventListener('DOMContentLoaded', () => {
  const date = new Date();
  const localFormat = new Intl.DateTimeFormat('en-US').format(date);
  elements.currentDate.textContent = localFormat;
  storage.getTodosFromLocal(elements.todosWrapper);
});

const listController = () => {
  const { listFormInput, listsWrapper, listDropdown } = elements;
  lV.attachListFormEvents();
  lV.attachMobileViewEvents();

  // handle new list form submission
  elements.listForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = listFormInput.value;
    state.list.addListToStorage(name);

    lV.hideForm(e.target.parentElement);
    const lists = state.list.getLists();
    lV.renderLists(listsWrapper, lists, storage);

    lV.createListOption(name, listDropdown);
    e.target.reset();
  });

  // handle list delete
  document.addEventListener('click', (e) => {
    const delIcon = e.target.closest('.list-del');
    if (delIcon) {
      const listElement = delIcon.parentElement;
      const activeList = utils.elDataName(listElement);
      if (activeList === 'All') return;

      state.list.delete(activeList);
      lV.removeListOption(activeList);

      // list is deleted so show default view; All list with its todos
      const todos = state.todo.getTodos();
      tV.renderTodos(elements.todosWrapper, todos);
      tV.updateTodoListTitle();
    }
  });

  // renders existing lists on page load
  document.addEventListener('DOMContentLoaded', () => {
    const lists = state.list.getLists();
    lV.renderLists(listsWrapper, lists, storage);

    lists.forEach((list) => {
      lV.createListOption(list, listDropdown);
    });
  });
};
listController();

// todoController
const todoController = () => {
  const { todoForm, todosWrapper } = elements;

  tV.attachTodoFormEvents();

  // handleFormSubmit
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(todoForm);
    state.todo.saveData(data);
    const list = data.get('list');

    tV.hideForm(e.target.parentElement);
    const todos = state.todo.getTodos(list);
    tV.renderTodos(todosWrapper, todos, list);

    const count = state.todo.getTotalTodos(list);
    lV.updateListCount(count, list);

    tV.resetTitleAndDate(todoForm);
  });

  // handleEditTodo
  document.addEventListener('click', (e) => {
    if (e.target.closest('.edit')) {
      const parent = e.target.closest('.todo');
      const { id } = parent;
      const list = document.querySelector('.current-list').textContent;
      const titleAndDue = parent.children[0].children;
      const checked = parent.children[1].children[0];
      const inputs = [].slice.call(titleAndDue);
      inputs.push(checked);

      if (titleAndDue[0].disabled) {
        tV.enableEdit(inputs);
      } else {
        tV.disableEdit(inputs);
        const values = state.todo.constructor.getUpdatedValues(inputs);
        state.todo.updateEdit(id, list, values);
      }
    }
  });

  // handleDeleteTodo
  document.addEventListener('click', (e) => {
    if (e.target.closest('.delete')) {
      const todoEl = e.target.closest('.todo');
      const { id } = todoEl;
      const list = utils.elDataName(todoEl);
      state.todo.delete(id, list);

      const todos = state.todo.getTodos(list);
      tV.renderTodos(elements.todosWrapper, todos, list);

      const count = state.todo.getTotalTodos(list);
      lV.updateListCount(count, list);
    }
  });

  // change todo lists
  document.addEventListener('click', (e) => {
    if (e.target.closest('.list-name')) {
      const activeList = e.target.textContent;
      const format = utils.addHyphen(activeList);

      tV.updateTodoFormListSelection(activeList);
      tV.updateTodoListTitle(activeList);

      const todos = state.todo.getTodos(format);
      tV.renderTodos(elements.todosWrapper, todos, format);

      if (window.innerWidth < 1080) {
        lV.hideMobileSidebar();
      }
    }
  });

  // switches todo lists in todo form so you see where your todo goes
  document.addEventListener('click', (e) => {
    if (e.target.closest('option')) {
      const name = e.target.closest('option').value;
      const format = utils.addASpace(name);

      tV.updateTodoListTitle(format);
      const todos = state.todo.getTodos(name);
      tV.renderTodos(elements.todosWrapper, todos, name);
    }
  });

  // render todos on page load
  // always defaults back to all list currently
  document.addEventListener('DOMContentLoaded', () => {
    const todos = state.todo.getTodos();
    tV.renderTodos(elements.todosWrapper, todos);
    tV.updateTodoListTitle();
  });
};
todoController();
