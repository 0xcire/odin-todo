import TodoView from "./js/views/todoView";
import Todo from "./js/models/Todo";

import ListView from "./js/views/listView";
import List from "./js/models/List";

import { storage } from "./js/models/Storage";

import { elements } from "./js/views/DOM";

//ideal:
//display warning that doing so will delete all related

document.addEventListener("DOMContentLoaded", () => {
  let greeting = "Today is ";
  const date = new Date();
  const today = date.toString().split(" ").slice(0, 4).join(" ");
  elements.currentDate.textContent = today;
  storage.getTodosFromLocalStorage(elements.todosWrapper);
});

const listController = () => {
  const lV = new ListView();
  const list = new List();

  //renders default list: 'all'
  lV.renderLists(elements.listsWrapper, list.getLists.bind(list));

  //show form
  lV.handleListFormToggle();

  elements.listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { listForm, listFormInput, listFormDiv, listsWrapper, listDropdown } =
      elements;

    const listName = lV.getListName(listFormInput);
    if (lV.noListName(listName)) return;

    list.addListToStorage(listName);

    lV.toggleListForm(listFormDiv);
    lV.renderLists(listsWrapper, list.getLists.bind(list));
    //update list count
    lV.updateListCount(storage);

    lV.createListSelection(listName, listDropdown);
    listForm.reset();
  });

  //handle list delete
  document.addEventListener("click", (e) => {
    const delIcon = e.target.closest(".list-del");
    if (delIcon && delIcon.parentElement.id === "All") return;
    if (delIcon) {
      const activeList = delIcon.parentElement.id;
      list.delete(activeList);
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    //render lists on page load
    lV.renderLists(elements.listsWrapper, list.getLists.bind(list));
    let lists = list.getLists();
    lists.forEach((list) => {
      //create dropdown option selections for existing lists
      lV.createListSelection(list, elements.listDropdown);
      //repopulate list length back onto card
      //have both todo and list controller dealing with todo list length display...not ideal
      const len = storage.todos[list].length;
      document.querySelector(`#${list} .how-many`).textContent = len;
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
      const list = parent.parentElement.previousElementSibling.textContent;
      todo.delete(id, list);

      //could also element.remove based off (nano)id
      //currently just re renders
      tV.renderTodos(elements.todosWrapper, todo.getTodos.bind(todo), list);

      tV.updateTodoListCount(todo.getTodoListLength.bind(todo), list);
    }
  });

  //change todo lists
  document.addEventListener("click", (e) => {
    if (e.target.closest(".list-name")) {
      const activeList = e.target.dataset.name;

      tV.updateTodoFormListSelection(activeList);
      tV.updateTodoListTitle(activeList);

      //render todos for active list
      tV.renderTodos(
        elements.todosWrapper,
        todo.getTodos.bind(todo),
        activeList
      );
    }
  });

  //render todos on page load
  //always defaults back to all list currently
  document.addEventListener("DOMContentLoaded", () => {
    tV.renderTodos(elements.todosWrapper, todo.getTodos.bind(todo), "All");
  });
};
todoController();
