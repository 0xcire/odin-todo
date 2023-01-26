class Storage {
  constructor(arr) {
    this.todos = {
      All: [],
    };
  }

  removeList(list) {
    delete this.todos[list];
    this.pushToLocalStorage();
  }

  localIsEmpty() {
    if (localStorage.getItem("todos") === null) {
      return true;
    } else {
      return false;
    }
  }

  clearLocalStorage() {
    return localStorage.clear();
  }

  setDataFromLocal(data) {
    this.todos = JSON.parse(data);
  }

  pushToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  getTodosFromLocalStorage(el) {
    const data = localStorage.getItem("todos");

    this.localIsEmpty() ? (el.innerHTML = "") : this.setDataFromLocal(data);
  }
}

export const storage = new Storage();
