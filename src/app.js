import TodoView from "./js/views/todoView.js";
import Todo from "./js/models/Todo.js";

import ListView from "./js/views/listView.js";
import List from "./js/models/List.js";

import { storage } from "./js/models/Storage.js";

import { elements } from "./js/views/DOM.js";

import * as utils from "./js/utils/utils.js";

//ideal:
//display warning that doing so will delete all related

//troubles:
//listening for data change || both list and todo updating list length ?
//listController and todoController not abstract enough?

document.addEventListener("DOMContentLoaded", () => {
  let greeting = "Today is ";
  const date = new Date();
  //use INTL
  const today = date.toString().split(" ").slice(0, 4).join(" ");
  elements.currentDate.textContent = today;
  storage.getTodosFromLocalStorage(elements.todosWrapper);
});

const listController = () => {
  const lV = new ListView();
  const list = new List();

  //show form
  lV.handleListFormToggle();

  //handle new list form submission
  elements.listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { listForm, listFormInput, listFormDiv, listsWrapper, listDropdown } =
      elements;

    const listName = lV.getListName(listFormInput);

    if (lV.noListName(listName)) return;

    list.addListToStorage(listName);

    lV.toggleListForm(listFormDiv);

    lV.renderLists(listsWrapper, list.getLists.bind(list), storage);

    lV.createListSelection(listName, listDropdown);
    listForm.reset();
  });

  //handle list delete
  document.addEventListener("click", (e) => {
    const delIcon = e.target.closest(".list-del");
    if (delIcon && delIcon.parentElement.dataset.name === "All") return;
    if (delIcon) {
      const parent = delIcon.parentElement;
      const activeList = utils.getDataName(parent);
      list.delete(activeList);
    }
  });

  // renders existing lists on page load
  document.addEventListener("DOMContentLoaded", () => {
    lV.renderLists(elements.listsWrapper, list.getLists.bind(list), storage);
    const lists = list.getLists();
    lists.forEach((list) => {
      lV.createListSelection(list, elements.listDropdown);
    });
  });
};
listController();

//todoController
const todoController = () => {
  const tV = new TodoView();
  const todo = new Todo();

  const { todoForm, todoFormDiv, todosWrapper } = elements;

  //show todo form
  tV.handleTodoFormToggle();

  //handleFormSubmit
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(todoForm);
    if (data.get("title") === "") return;

    const newTodo = todo.saveData(data);
    const list = data.get("list");

    //hide todo form
    tV.toggleTodoForm(todoFormDiv);
    tV.renderTodos(todosWrapper, todo.getTodos.bind(todo), list);

    //listview.updateListCount after observing data change on storage.todos..?
    tV.updateTodoListCount(todo.getTodoListLength.bind(todo), list);

    tV.resetTitleAndDate(todoForm);
  });

  //handleEditTodo
  document.addEventListener("click", (e) => {
    if (e.target.closest(".edit")) {
      const parent = e.target.closest(".todo");
      const title = parent.children[0].children[0];

      title.disabled
        ? tV.toggleEdit(e)
        : todo.getUpdatedValues(e, tV.toggleEdit, parent);
    }
  });

  // handleDeleteTodo
  document.addEventListener("click", (e) => {
    if (e.target.closest(".delete")) {
      const parent = e.target.closest(".todo");
      const id = parent.id;
      const list = parent.parentElement.previousElementSibling.dataset.name;
      todo.delete(id, list);

      tV.renderTodos(elements.todosWrapper, todo.getTodos.bind(todo), list);

      tV.updateTodoListCount(todo.getTodoListLength.bind(todo), list);
    }
  });

  //change todo lists
  document.addEventListener("click", (e) => {
    if (e.target.closest(".list-name")) {
      const activeList = e.target.textContent;
      const format = utils.addHyphen(activeList);

      tV.updateTodoFormListSelection(activeList);
      tV.updateTodoListTitle(activeList);

      //render todos for active list
      tV.renderTodos(elements.todosWrapper, todo.getTodos.bind(todo), format);
    }
  });

  //switches todo lists in todo form so you see where your todo goes
  document.addEventListener("click", (e) => {
    if (e.target.closest("option")) {
      const name = e.target.closest("option").value;
      const format = utils.addHyphen(name);

      tV.updateTodoListTitle(name);
      tV.renderTodos(elements.todosWrapper, todo.getTodos.bind(todo), format);
    }
  });

  //render todos on page load
  //always defaults back to all list currently
  document.addEventListener("DOMContentLoaded", () => {
    tV.renderTodos(elements.todosWrapper, todo.getTodos.bind(todo), "All");
    tV.updateTodoListTitle("All");
  });
};
todoController();
