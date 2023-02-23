import elements from './DOM';
import * as utils from '../utils/utils';

export const hideForm = (el) => {
  const listForm = el;
  listForm.style.display = 'none';
};

export const showForm = (el) => {
  const listForm = el;
  listForm.style.display = 'block';
};

export const renderLists = (el, array, storage) => {
  const listArray = array;
  const todoContainer = el;
  todoContainer.innerHTML = '';

  for (let i = 0; i < listArray.length; i += 1) {
    const name = listArray[i];
    const listLength = storage.todos[listArray[i]].length;
    const displayName = utils.addASpace(name);

    const list = document.createElement('div');
    list.dataset.name = name;
    list.classList.add('list');

    const description = document.createElement('div');
    description.classList.add('description');

    // const

    const listName = document.createElement('p');
    listName.classList.add('list-name');

    const listTodoCount = document.createElement('p');
    listTodoCount.classList.add('how-many');
    listTodoCount.textContent = listLength;

    const del = document.createElement('i');
    del.classList.add('list-del', 'fa-solid', 'fa-trash');

    listName.textContent = displayName;

    description.appendChild(listName);
    description.appendChild(listTodoCount);

    list.appendChild(description);
    list.appendChild(del);

    el.appendChild(list);

    const deleteForm = document.createElement('div');
    deleteForm.classList.add('list-delete-form');

    const p = document.createElement('p');
    p.textContent =
      list.dataset.name === 'All' || list.dataset.name === 'Complete'
        ? 'clear?'
        : 'delete?';

    const options = document.createElement('div');
    options.classList.add('options');
    const yes = document.createElement('i');
    yes.classList.add('fa-solid', 'fa-check', 'options-btn');
    // yes.setAttribute('role', 'button');
    const no = document.createElement('i');
    no.classList.add('fa-solid', 'fa-xmark', 'options-btn');
    // no.setAttribute('role', 'button');
    options.appendChild(yes);
    options.appendChild(no);

    // deleteForm.append(p, options);
    deleteForm.appendChild(p);
    deleteForm.appendChild(options);

    list.appendChild(deleteForm);
  }
};

export const updateListCount = (count, list) => {
  document.querySelector(`[data-name="${list}"] .how-many`).textContent = count;
};

export const createListOption = (name, el) => {
  if (name === 'Complete') return;
  const selection = document.createElement('option');
  const dataName = utils.addHyphen(name);
  selection.setAttribute('value', dataName);
  selection.textContent = name;

  el.appendChild(selection);
};

export const removeListOption = (value) => {
  document.querySelector(`option[value=${value}]`).remove();
};

export const showMobileSidebar = () => {
  elements.sidebar.style.transform = 'translate(0,0)';
};

export const hideMobileSidebar = () => {
  elements.sidebar.style.transform = 'translate(-100%, 0)';
};

export const toggleListDeleteForm = (element) => {
  element.classList.toggle('show');
};

export const attachMobileViewEvents = () => {
  elements.showNav.addEventListener('click', () => {
    showMobileSidebar();
  });
  elements.hideNav.addEventListener('click', () => {
    hideMobileSidebar();
  });
};

export const attachListFormEvents = () => {
  const { addList, listClose, listForm, listFormDiv, todoFormDiv } = elements;
  addList.addEventListener('click', () => {
    if (todoFormDiv.style.display === 'block') return;
    showForm(listFormDiv);
  });
  listClose.addEventListener('click', () => {
    hideForm(listFormDiv);
    listForm.reset();
  });
};
