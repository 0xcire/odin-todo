class Storage {
  constructor() {
    this.todos = {
      All: [],
    };
  }

  removeList(list) {
    delete this.todos[list];
    this.pushToLocalStorage();
  }

  static localIsEmpty() {
    if (localStorage.getItem('todos') === null) {
      return true;
    }
    return false;
  }

  static clearLocalStorage() {
    return localStorage.clear();
  }

  setDataFromLocal(data) {
    this.todos = JSON.parse(data);
  }

  pushToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodosFromLocal(el) {
    const todoContainer = el;
    const data = localStorage.getItem('todos');

    if (this.constructor.localIsEmpty()) {
      todoContainer.innerHTML = '';
    } else {
      this.setDataFromLocal(data);
    }
  }
}

const storage = new Storage();
export default storage;
