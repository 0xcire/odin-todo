import { elements } from "./DOM.js";

import * as utils from "../utils/utils.js";

export default class ListView {
  constructor(lists) {
    this.lists = lists;
  }

  toggleListForm(el) {
    if (!el.offsetParent) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }

  renderLists(el, callback, storage) {
    const listArray = callback();
    el.innerHTML = "";

    for (let i = 0; i < listArray.length; i++) {
      let name = listArray[i];
      let displayName = utils.addASpace(name);

      const list = document.createElement("div");
      list.dataset.name = name;
      list.classList.add("list");

      const listName = document.createElement("p");
      listName.classList.add("list-name");

      const listTodoCount = document.createElement("p");
      listTodoCount.classList.add("how-many");
      listTodoCount.textContent = storage.todos[listArray[i]].length;

      const del = document.createElement("i");
      del.classList.add("list-del", "fa-solid", "fa-trash");

      listName.textContent = displayName;

      list.appendChild(listName);
      list.appendChild(listTodoCount);
      list.appendChild(del);

      el.appendChild(list);
    }
  }

  noListName(str) {
    return str === "" ? true : false;
  }

  getListName() {
    return elements.listFormInput.value;
  }

  updateListCount(storage) {
    document.querySelectorAll(".list").forEach((list) => {
      const displayCount = list.children[1];
      displayCount.textContent = storage.todos[list.dataset.name].length;
    });
  }

  createListSelection(name, el) {
    const selection = document.createElement("option");
    const formatName = utils.addHyphen(name);
    selection.setAttribute("value", formatName);
    selection.textContent = name;

    el.appendChild(selection);
  }

  handleListFormToggle(el) {
    elements.addList.addEventListener("click", () => {
      if (elements.todoFormDiv.style.display === "block") return;
      this.toggleListForm(elements.listFormDiv);
    });
  }
}
