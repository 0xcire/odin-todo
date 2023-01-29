import elements from './DOM';
import * as utils from '../utils/utils';

export const showForm = (el) => {
  const todoForm = el;
  todoForm.style.display = 'block';
};

export const hideForm = (el) => {
  const todoForm = el;
  todoForm.style.display = 'none';
};

export const enableEdit = (elementArray) => {
  const inputs = elementArray;
  /* eslint-disable no-param-reassign */
  inputs.forEach((input) => {
    input.disabled = false;
    input.style.color = 'var(--accent-color)';
  });
  /* eslint-enable no-param-reassign */
};

export const disableEdit = (elementArray) => {
  const inputs = elementArray;
  /* eslint-disable no-param-reassign */
  inputs.forEach((input) => {
    input.disabled = true;
    input.style.color = 'var(--tertiary-color)';
  });
  /* eslint-enable no-param-reassign */
};

export const renderTodos = (el, todoArray, list = 'All') => {
  const container = el;
  container.innerHTML = '';
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

    const due = document.createElement('input');
    due.setAttribute('id', 'todo-date');

    const done = document.createElement('input');
    done.setAttribute('id', 'done');

    const edit = document.createElement('i');
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

    el.appendChild(todo);
  }
};

export const resetTitleAndDate = (el) => {
  const title = el[0];
  const date = el[1];
  title.value = '';
  date.value = '';
};

export const updateTodoFormListSelection = (list) => {
  const format = utils.addHyphen(list);
  document.querySelector(`option[value='${format}']`).selected = true;
};

export const updateTodoListTitle = (list = 'All') => {
  elements.currentList.dataset.name = utils.addHyphen(list);
  elements.currentList.textContent = list;
};

export const attachTodoFormEvents = () => {
  const { addTodo, todoClose, todoForm, todoFormDiv, listFormDiv } = elements;
  addTodo.addEventListener('click', () => {
    if (listFormDiv.style.display === 'block') return;
    showForm(todoFormDiv);
    if (window.innerWidth < 1080) {
      elements.sidebar.style.transform = 'translate(-100%, 0)';
    }
  });
  todoClose.addEventListener('click', () => {
    hideForm(todoFormDiv);
    todoForm.reset();
  });
};
