import { elements } from "./DOM.js";

export default class TodoView {
  constructor(todos) {
    this.todos = todos;
  }

  toggleTodoForm(el) {
    if (!el.offsetParent) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }

  toggleEdit(e) {
    const htmlCollection = e.target.closest(".todo").children[0].children;
    const inputs = [].slice.call(htmlCollection);

    inputs.forEach((input) => {
      input.disabled ? (input.disabled = false) : (input.disabled = true);
    });
  }

  //for a specified list, get and loop through that array to render todos
  renderTodos(el, callback, list) {
    el.innerHTML = "";
    //loop through list
    const array = callback(list);
    for (let i = 0; i < array.length; i++) {
      // create structure
      const todo = document.createElement("div");
      todo.classList.add("todo");
      todo.setAttribute("id", array[i].id);

      const text = document.createElement("div");
      text.classList.add("text");

      const completion = document.createElement("div");
      completion.classList.add("completion");

      const title = document.createElement("input");
      title.setAttribute("id", "todo-title");

      const due = document.createElement("input");
      due.setAttribute("id", "todo-date");

      const done = document.createElement("input");
      done.setAttribute("id", "done");

      const edit = document.createElement("i");
      edit.classList.add("edit", "fa-solid", "fa-pen-to-square");

      const del = document.createElement("button");
      del.classList.add("delete");
      const trash = document.createElement("i");
      trash.classList.add("fa-solid", "fa-trash");

      //specify input types
      title.setAttribute("type", "text");
      title.setAttribute("name", "todo-title");
      title.setAttribute("value", array[i].title);
      title.setAttribute("disabled", true);

      due.setAttribute("type", "date");
      due.setAttribute("name", "todo-date");
      due.value = array[i].due;
      due.setAttribute("required", true);
      due.setAttribute("disabled", true);

      done.setAttribute("type", "checkbox");
      done.setAttribute("name", "done");

      del.appendChild(trash);

      text.appendChild(title);
      text.appendChild(due);

      completion.appendChild(done);
      completion.appendChild(edit);
      completion.appendChild(del);

      todo.appendChild(text);
      todo.appendChild(completion);

      el.appendChild(todo);
    }
  }

  resetTitleAndDate(el) {
    el[0].value = "";
    el[1].value = "";
  }

  //this is ideally part of list/listView via proxy?
  updateTodoListCount(callback, list) {
    document.querySelector(`#${list} .how-many`).textContent = callback(list);
  }

  updateTodoFormListSelection(list) {
    document.querySelector(`option[value=${list}]`).selected = true;
  }

  updateTodoListTitle(list) {
    elements.currentList.textContent = list;
  }

  handleTodoFormToggle(el) {
    elements.addTodo.addEventListener("click", () => {
      if (elements.listFormDiv.style.display === "block") return;
      this.toggleTodoForm(elements.todoFormDiv);
    });
  }

  handleTodoEdit(callback) {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".edit")) {
        this.toggleEdit(e);
      }
    });
  }
}

{
  /* <div class="todo">
      <div class="text">
        <input
          type="text"
          name="todo-title"
          id="todo-title"
          value="Do the dishes"
          disabled
        />
        <input
          type="date"
          name="todo-date"
          id="todo-date"
          value="2023-01-18"
          required
          disabled
        />
      </div>
      <div class="completion">
        <input type="checkbox" name="donid="done" />
        <p class="edit">...</p>
        <button class="delete">x</button>
      </div>
    </div> */
}
