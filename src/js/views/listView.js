import { elements } from "./DOM.js";

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

  renderLists(el, callback) {
    const listArray = callback();
    el.innerHTML = "";

    for (let i = 0; i < listArray.length; i++) {
      const name = listArray[i];

      const list = document.createElement("div");
      list.setAttribute("id", name);
      list.classList.add("list");

      const listName = document.createElement("p");
      listName.dataset.name = name;
      listName.classList.add("list-name");

      const listTodoCount = document.createElement("p");
      listTodoCount.classList.add("how-many");

      const del = document.createElement("i");
      del.classList.add("list-del", "fa-solid", "fa-trash");

      listName.textContent = name;

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
      displayCount.textContent = storage.todos[list.id].length;
    });
  }

  createListSelection(name, el) {
    const selection = document.createElement("option");
    selection.setAttribute("value", name);
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
