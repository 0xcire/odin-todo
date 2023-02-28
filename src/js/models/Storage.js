class Storage {
  constructor() {
    this.last = 'Todos';
    this.todos = {
      Todos: [],
      Complete: [],
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
    this.last = data.last;
    this.todos = data.todos;
  }

  pushToLocalStorage() {
    Object.keys(this).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(this[key]));
    });
  }

  getDataFromLocal() {
    const last = localStorage.getItem('last');
    const todos = localStorage.getItem('todos');

    const data = {
      last: JSON.parse(last),
      todos: JSON.parse(todos),
    };

    if (this.constructor.localIsEmpty()) {
      this.todos = {
        Todos: [],
        Complete: [],
      };
    } else {
      this.setDataFromLocal(data);
    }
  }
}

const storage = new Storage();
export default storage;
