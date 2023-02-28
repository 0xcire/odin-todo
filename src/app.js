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
  storage.getDataFromLocal();
});

const listController = () => {
  const { listFormInput, listFormDiv } = elements;

  const handleListSubmit = (e) => {
    state.list.addListToStorage(listFormInput.value);

    lV.updateListView(state.list.getLists(), state.list.getListCounts());
    lV.hideForm(listFormDiv);
    e.target.reset();
  };

  const handleRevealListOptions = (e) => {
    const list = e.target.parentElement.dataset.name;
    const xMark = document.querySelectorAll(`[data-name=${list}-opt]`)[1];

    lV.toggleListDeleteForm(e.target.nextSibling);
    setTimeout(() => xMark.focus(), 0);
    lV.toggleTabbingElements(list, true);
  };

  // clear or full delete list
  const handleListDelete = (e) => {
    const listElement = e.target.closest('.list');
    const activeList = listElement.dataset.name;

    if (activeList === 'Todos' || activeList === 'Complete') {
      state.list.clearTodos(activeList);
      tV.renderTodos(elements.todosWrapper, [], activeList);

      lV.updateListCount(0, activeList);
      lV.toggleListDeleteForm(e.target.closest('.list-delete-form'));
      lV.toggleTabbingElements(activeList, false);

      return;
    }

    state.list.delete(activeList);
    lV.updateListView(state.list.getLists(), state.list.getListCounts());
    tV.renderTodos(elements.todosWrapper, state.todo.getTodos());
    tV.updateTodoListTitle();
  };

  const handleCloseListOptions = (e) => {
    const activeList = e.target.closest('.list').dataset.name;
    lV.toggleListDeleteForm(e.target.closest('.list-delete-form'));
    lV.toggleTabbingElements(activeList, false);
  };

  const handleListOnLoad = () => {
    const lists = state.list.getLists();
    const counts = state.list.getListCounts();
    lV.updateListView(lists, counts);
  };

  const handleListSwitch = (e) => {
    const dataListName = e.target.closest('.list').dataset.name;

    state.list.setLastViewedList(dataListName);

    tV.updateTodoFormListSelection(dataListName);
    tV.updateTodoListTitle(dataListName);

    const todos = state.todo.getTodos(dataListName);
    tV.renderTodos(elements.todosWrapper, todos, dataListName);

    if (window.innerWidth < 1080) {
      lV.hideMobileSidebar();
    }
  };

  lV.bindListFormEvents();
  lV.bindMobileViewEvents();

  lV.bindListSubmit(handleListSubmit);
  lV.bindRevealListOptions(handleRevealListOptions);
  lV.bindListDelete(handleListDelete);
  lV.bindCloseListOptions(handleCloseListOptions);
  lV.bindListOnLoad(handleListOnLoad);
  lV.bindListSwitch(handleListSwitch);
};
listController();

const todoController = () => {
  const { todoForm, todosWrapper } = elements;

  const handleTodoSubmit = (e) => {
    const data = new FormData(todoForm);
    state.todo.saveData(data);
    const list = data.get('list');

    const todos = state.todo.getTodos(list);
    tV.renderTodos(todosWrapper, todos, list);

    const count = state.todo.getTotalTodos(list);
    lV.updateListCount(count, list);

    tV.hideForm(e.target.parentElement);
    tV.resetTitleAndDate(todoForm);
  };

  const handleTodoEdit = (e) => {
    const parent = e.target.closest('.todo');
    const { id } = parent;
    const title = document.querySelector('.current-list');
    const list = title.textContent;
    const dataList = title.dataset.name;
    const inputs = document.querySelectorAll(`[data-name="${id}-input"]`);

    if (inputs[0].disabled) {
      tV.enableEdit(inputs);
    } else {
      tV.disableEdit(inputs);
      const values = state.todo.constructor.getUpdatedValues(inputs);
      state.todo.updateEdit(id, list, values);

      // values[2] is checkbox
      if (values[2] === true) {
        state.todo.addToCompleted(dataList, id);
        const todos = state.todo.getTodos(dataList);
        tV.renderTodos(elements.todosWrapper, todos, list);
        // [] another example of rerender lists instead of this
        lV.updateListCount(state.todo.getTotalTodos(dataList), dataList);
        lV.updateListCount(state.todo.getTotalTodos('Complete'), 'Complete');
      }
    }
  };

  const handleTodoDelete = (e) => {
    const todoEl = e.target.closest('.todo');
    const { id } = todoEl;
    const list = todoEl.dataset.name;

    state.todo.delete(id, list);

    const todos = state.todo.getTodos(list);
    tV.renderTodos(elements.todosWrapper, todos, list);

    const count = state.todo.getTotalTodos(list);
    lV.updateListCount(count, list);
  };

  const handleTodoSelectChange = (e) => {
    const dataName = e.target.value;
    const name = utils.addASpace(dataName);

    tV.updateTodoListTitle(name);
    const todos = state.todo.getTodos(dataName);
    tV.renderTodos(elements.todosWrapper, todos, dataName);
  };

  const handleTodosOnLoad = () => {
    const lastViewed = state.list.storage.last;
    const todos = state.todo.getTodos(lastViewed);
    tV.renderTodos(elements.todosWrapper, todos, lastViewed);
    tV.updateTodoListTitle(lastViewed);
  };

  tV.bindTodoFormEvents();
  tV.bindTodoSubmit(handleTodoSubmit);
  tV.bindTodoEdit(handleTodoEdit);
  tV.bindTodoDelete(handleTodoDelete);
  tV.bindTodoSelectChange(handleTodoSelectChange);
  tV.bindTodoOnLoad(handleTodosOnLoad);
};
todoController();
