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

document.addEventListener(
  'focusin',
  () => {
    console.log('focused: ', document.activeElement);
  },
  true
);

// rerender function | getTodos | renderTodos | updateListCount |

const listController = () => {
  const { listFormInput, listsWrapper, listDropdown } = elements;

  const handleListSubmit = (e) => {
    state.list.addListToStorage(listFormInput.value);

    const counts = state.list.getListCounts();
    lV.renderLists(listsWrapper, state.list.getLists(), counts);

    lV.createListOption(listFormInput.value, listDropdown);
    lV.hideForm(e.target.parentElement);

    e.target.reset();
  };

  const handleShowListDeleteOptions = (e) => {
    lV.toggleListDeleteForm(e.target.parentElement.lastChild);

    // []?
    const delIcon = e.target.closest('.list-del');
    const listBtns = [delIcon.previousSibling.children[0], delIcon];
    const optionBtns = delIcon.nextSibling.children[1].children;
    lV.disableTabbing(listBtns);
    lV.enableTabbing(optionBtns);
  };

  // [] clean up names || activeList and currentList ex
  // [] repeating disable and enableTabbing
  const handleListDeleteOptions = (e) => {
    let listElement;
    let activeList;
    const optionBtns = [];
    const listBtns = [];

    // delete | clear
    if (e.target.matches('.fa-check')) {
      listElement = e.target.closest('.list');
      activeList = listElement.dataset.name;

      // just clearing out list
      if (activeList === 'All' || activeList === 'Complete') {
        // [] refactor
        state.list.clearTodos(activeList);
        tV.renderTodos(elements.todosWrapper, []);

        lV.updateListCount(state.todo.getTotalTodos(activeList), activeList);
        lV.toggleListDeleteForm(e.target.parentElement.parentElement);

        optionBtns.push(e.target, e.target.nextSibling);
        const currentList = e.target.closest('.list');
        listBtns.push(
          currentList.children[0].children[0],
          currentList.children[1]
        );
        lV.enableTabbing(listBtns);
        lV.disableTabbing(optionBtns);
        return;
      }
      // delete all together
      lV.toggleListDeleteForm(e.target.parentElement.parentElement);
      state.list.delete(activeList);
      lV.removeListOption(activeList);
      optionBtns.push(e.target, e.target.nextSibling);
      const currentList = e.target.closest('.list');
      listBtns.push(
        currentList.children[0].children[0],
        currentList.children[1]
      );
      lV.enableTabbing(listBtns);
      lV.disableTabbing(optionBtns);
    }

    // exit out of submenu
    if (e.target.matches('.fa-xmark')) {
      lV.toggleListDeleteForm(e.target.parentElement.parentElement);
      optionBtns.push(e.target, e.target.previousSibling);
      const currentList = e.target.closest('.list');
      listBtns.push(
        currentList.children[0].children[0],
        currentList.children[1]
      );
      lV.enableTabbing(listBtns);
      lV.disableTabbing(optionBtns);
    }
  };

  const handleListRender = () => {
    const lists = state.list.getLists();
    const counts = state.list.getListCounts();
    lV.renderLists(listsWrapper, lists, counts);
    // []
    lists.forEach((list) => {
      lV.createListOption(list, listDropdown);
    });
  };

  const handleListSwitch = (e) => {
    const activeList = e.target.textContent;
    const dataListName = utils.addHyphen(activeList);

    tV.updateTodoFormListSelection(dataListName);
    tV.updateTodoListTitle(dataListName);

    const todos = state.todo.getTodos(dataListName);
    tV.renderTodos(elements.todosWrapper, todos, dataListName);

    if (window.innerWidth < 1080) {
      lV.hideMobileSidebar();
    }
  }; // app?

  lV.bindListFormEvents();
  lV.bindMobileViewEvents();
  // []
  lV.bindListSubmit(handleListSubmit);
  lV.bindShowListDeleteOptions(handleShowListDeleteOptions);
  lV.bindListDeleteOptions(handleListDeleteOptions);
  lV.bindListRender(handleListRender);
  lV.bindListSwitch(handleListSwitch);
};
listController();

const todoController = () => {
  const { todoForm, todosWrapper } = elements;
  // []?
  tV.attachTodoFormEvents();

  const handleTodoSubmit = (e) => {
    const data = new FormData(todoForm);
    state.todo.saveData(data);
    const list = data.get('list');

    tV.hideForm(e.target.parentElement);
    const todos = state.todo.getTodos(list);
    tV.renderTodos(todosWrapper, todos, list);

    const count = state.todo.getTotalTodos(list);
    lV.updateListCount(count, list);
    tV.resetTitleAndDate(todoForm);
  };
  // query selector for all these el.children.parent.grandkids..?
  const handleTodoEdit = (e) => {
    const parent = e.target.closest('.todo');
    const { id } = parent;
    const list = document.querySelector('.current-list').textContent;
    const titleAndDue = parent.children[0].children;
    const checked = parent.children[1].children[0];
    // []?
    const inputs = [].slice.call(titleAndDue);
    inputs.push(checked);

    if (titleAndDue[0].disabled) {
      tV.enableEdit(inputs);
    } else {
      tV.disableEdit(inputs);
      const values = state.todo.constructor.getUpdatedValues(inputs);
      state.todo.updateEdit(id, list, values);
      // [] refactor: pushing to completed
      // [] need to keep list and index meta data to re add if unchecking completed
      // [] also all list should be a compilation of all lists
      // instead of being its own list
      // or just rename to default or something
      if (values[2] === true) {
        state.todo.addToCompleted(utils.addHyphen(list), id);
        const todos = state.todo.getTodos(list);
        tV.renderTodos(elements.todosWrapper, todos, list);
        lV.updateListCount(state.todo.getTotalTodos(list), list);
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
    const name = e.target.value;
    const format = utils.addASpace(name);

    tV.updateTodoListTitle(format);
    const todos = state.todo.getTodos(name);
    tV.renderTodos(elements.todosWrapper, todos, name);
  }; // app?

  const handleTodoRender = () => {
    // [] save last list in state?
    const todos = state.todo.getTodos();
    tV.renderTodos(elements.todosWrapper, todos);
    tV.updateTodoListTitle();
  };

  tV.bindTodoSubmit(handleTodoSubmit);
  tV.bindTodoEdit(handleTodoEdit);
  tV.bindTodoDelete(handleTodoDelete);
  tV.bindTodoSelectChange(handleTodoSelectChange);
  tV.bindTodoRender(handleTodoRender);
};
todoController();
