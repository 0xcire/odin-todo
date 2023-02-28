import * as utils from '../utils/utils';

export default class TodoView {
  constructor() {
    this.formWrapper = document.querySelector('.todo-form');
    this.form = document.querySelector('.todo-form form');
    this.container = document.querySelector('.todos');
    this.title = document.querySelector('.current-list');
    this.addTodo = document.querySelector('.add-todo');
    this.todoClose = document.querySelector('.todo-form-cancel');

    this.sidebar = document.querySelector('#sidebar');
    this.listSelect = document.querySelector('#list-dropdown');
    this.currentList = document.querySelector('.current-list');
  }

  showForm() {
    this.formWrapper.style.display = 'block';
    this.form[0].focus();
  }

  hideForm() {
    this.formWrapper.style.display = 'none';
  }

  /* eslint-disable class-methods-use-this */
  enableEdit(elements) {
    const inputs = elements;
    /* eslint-disable no-param-reassign */
    inputs.forEach((input) => {
      input.disabled = false;
      input.style.color = 'var(--accent-color)';
    });
    /* eslint-enable no-param-reassign */
  }

  disableEdit(elements) {
    const inputs = elements;
    /* eslint-disable no-param-reassign */
    inputs.forEach((input) => {
      input.disabled = true;
      input.style.color = 'var(--tertiary-color)';
    });
    /* eslint-enable no-param-reassign */
  }
  /* eslint-enable class-methods-use-this */

  renderTodos(todoArray, list = 'Todos') {
    this.container.innerHTML = '';
    const todos = todoArray;

    for (let i = 0; i < todos.length; i += 1) {
      const todo = document.createElement('div');
      todo.classList.add('todo');
      todo.setAttribute('id', todos[i].id);
      todo.dataset.name = list;

      const text = document.createElement('div');
      text.classList.add('text');

      const completion = document.createElement('div');
      completion.classList.add('completion');

      const title = document.createElement('input');
      title.setAttribute('id', 'todo-title');
      title.dataset.name = `${todos[i].id}-input`;

      const due = document.createElement('input');
      due.setAttribute('id', 'todo-date');
      due.dataset.name = `${todos[i].id}-input`;

      const done = document.createElement('input');
      done.setAttribute('id', 'done');
      done.dataset.name = `${todos[i].id}-input`;

      const edit = document.createElement('i');
      edit.tabIndex = 0;
      edit.classList.add('edit', 'fa-solid', 'fa-pen-to-square');

      const del = document.createElement('button');
      del.classList.add('delete');
      const trash = document.createElement('i');
      trash.classList.add('fa-solid', 'fa-trash');

      // specify input types
      title.setAttribute('type', 'text');
      title.setAttribute('name', 'todo-title');
      title.setAttribute('value', todos[i].title);
      title.setAttribute('disabled', true);

      due.setAttribute('type', 'date');
      due.setAttribute('name', 'todo-date');
      due.value = todos[i].due;
      due.setAttribute('required', true);
      due.setAttribute('disabled', true);

      done.setAttribute('type', 'checkbox');
      done.setAttribute('name', 'done');
      done.setAttribute('disabled', true);
      done.checked = todos[i].completed;

      del.appendChild(trash);

      text.appendChild(title);
      text.appendChild(due);

      completion.appendChild(done);
      completion.appendChild(edit);
      completion.appendChild(del);

      todo.appendChild(text);
      todo.appendChild(completion);

      this.container.appendChild(todo);
    }
  }

  resetTitleAndDate() {
    for (let i = 0; i < this.form.length - 3; i += 1) {
      this.form[i].value = '';
    }
  }

  /* eslint-disable class-methods-use-this */
  updateTodoFormListSelection(list) {
    if (list === 'Complete') return;
    document.querySelector(`option[value='${list}']`).selected = true;
  }
  /* eslint-enable class-methods-use-this */

  updateTodoListTitle(list = 'Todos') {
    this.currentList.dataset.name = list;
    this.currentList.textContent = utils.addASpace(list);
  }

  bindTodoFormEvents() {
    this.addTodo.addEventListener('click', () => {
      if (this.formWrapper.nextElementSibling.style.display === 'block') return;
      this.showForm();
      if (window.innerWidth < 1080) {
        this.sidebar.style.transform = 'translate(-100%, 0)';
      }
    });
    this.todoClose.addEventListener('click', () => {
      this.hideForm();
      this.form.reset();
    });
  }

  bindTodoSubmit(callback) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      callback(e);
    });
  }

  /* eslint-disable class-methods-use-this */
  bindTodoEdit(callback) {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.edit')) {
        callback(e);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.closest('.edit')) {
        callback(e);
      }
    });
  }

  bindTodoDelete(callback) {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.delete')) {
        callback(e);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.matches('.delete')) {
        callback(e);
      }
    });
  }

  bindTodoSelectChange(callback) {
    this.listSelect.addEventListener('change', (e) => {
      callback(e);
    });
  }

  bindTodoOnLoad(callback) {
    callback();
  }
  /* eslint-enable class-methods-use-this */
}
