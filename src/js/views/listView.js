import * as utils from '../utils/utils';

export default class ListView {
  constructor() {
    this.date = document.querySelector('.current-date');
    this.formWrapper = document.querySelector('.list-form');
    this.form = document.querySelector('.list-form form');
    this.container = document.querySelector('#lists');
    this.addList = document.querySelector('.add-project');
    this.formClose = document.querySelector('.list-form-cancel');
    this.listDropdown = document.querySelector('#list-dropdown');
    this.sidebar = document.querySelector('#sidebar');
    this.showNav = document.querySelector('.show-nav');
    this.hideNav = document.querySelector('.hide-nav');
  }

  setHeading() {
    const date = new Date();
    const localFormat = new Intl.DateTimeFormat('en-US').format(date);
    this.date.textContent = localFormat;
  }

  hideForm() {
    this.formWrapper.style.display = 'none';
  }

  showForm() {
    this.formWrapper.style.display = 'block';
    this.form.children[1].focus();
  }

  renderLists(listArr, countsArr) {
    const lists = listArr;
    const counts = countsArr;
    this.container.innerHTML = '';

    for (let i = 0; i < lists.length; i += 1) {
      const name = lists[i];
      const displayName = utils.addASpace(name);

      const list = document.createElement('div');
      list.dataset.name = name;
      list.classList.add('list');

      const description = document.createElement('div');
      description.classList.add('description');

      const listName = document.createElement('p');
      listName.tabIndex = 0;
      listName.classList.add('list-name');
      listName.dataset.name = `${name}-btn`;
      listName.textContent = displayName;

      const listCount = document.createElement('p');
      listCount.classList.add('how-many');
      listCount.textContent = counts[i];

      const del = document.createElement('i');
      del.tabIndex = 0;
      del.classList.add('list-del', 'fa-solid', 'fa-trash');
      del.dataset.name = `${name}-btn`;

      description.appendChild(listName);
      description.appendChild(listCount);

      list.appendChild(description);
      list.appendChild(del);

      const deleteForm = document.createElement('div');
      deleteForm.classList.add('list-delete-form');

      const p = document.createElement('p');
      p.textContent =
        list.dataset.name === 'Todos' || list.dataset.name === 'Complete'
          ? 'clear?'
          : 'delete?';

      const options = document.createElement('div');
      options.classList.add('options');

      const yes = document.createElement('i');
      yes.classList.add('fa-solid', 'fa-check', 'options-btn');
      yes.dataset.name = `${name}-opt`;

      const no = document.createElement('i');
      no.classList.add('fa-solid', 'fa-xmark', 'options-btn');
      no.dataset.name = `${name}-opt`;

      options.appendChild(yes);
      options.appendChild(no);

      deleteForm.appendChild(p);
      deleteForm.appendChild(options);

      list.appendChild(deleteForm);

      this.container.appendChild(list);
    }
  }

  /* eslint-disable class-methods-use-this */
  updateListCount(count, list) {
    if (Array.isArray(list) && Array.isArray(count)) {
      list.forEach((name, i) => {
        document.querySelector(`[data-name="${name}"] .how-many`).textContent =
          count[i];
      });
      return;
    }
    document.querySelector(`[data-name="${list}"] .how-many`).textContent =
      count;
  }
  /* eslint-enable class-methods-use-this */

  createListOption(name) {
    if (name === 'Complete') return;
    const selection = document.createElement('option');
    selection.setAttribute('value', name);
    selection.textContent = utils.addASpace(name);

    this.listDropdown.appendChild(selection);
  }

  renderListOptions(lists) {
    this.listDropdown.innerHTML = '';
    lists.forEach((list) => {
      this.createListOption(list);
    });
  }

  showMobileSidebar() {
    this.sidebar.style.transform = 'translate(0,0)';
    this.sidebar.style.overflow = 'hidden';
  }

  hideMobileSidebar() {
    this.sidebar.style.transform = 'translate(-100%, 0)';
  }

  /* eslint-disable class-methods-use-this */
  toggleListDeleteForm(wrapper) {
    wrapper.classList.toggle('show');
  }

  toggleTabbing(list, revealingHiddden) {
    const listBtns = document.querySelectorAll(`[data-name="${list}-btn"]`);
    const optBtns = document.querySelectorAll(`[data-name="${list}-opt"]`);

    if (revealingHiddden) {
      utils.disableTabbing(listBtns);
      utils.enableTabbing(optBtns);
      return;
    }
    utils.disableTabbing(optBtns);
    utils.enableTabbing(listBtns);
  }
  /* eslint-enable class-methods-use-this */

  update(lists, counts) {
    this.renderLists(lists, counts);
    this.renderListOptions(lists);
  }

  bindMobileViewEvents() {
    this.showNav.addEventListener('click', () => {
      this.showMobileSidebar();
    });
    this.hideNav.addEventListener('click', () => {
      this.hideMobileSidebar();
    });
  }

  bindListFormEvents() {
    this.addList.addEventListener('click', () => {
      if (this.formWrapper.previousElementSibling.style.display === 'block')
        return;
      this.showForm(this.formWrapper, this.form);
    });
    this.formClose.addEventListener('click', () => {
      this.hideForm(this.formWrapper);
      this.form.reset();
    });
  }

  bindListSubmit(callback) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      callback(e);
    });
  }

  /* eslint-disable class-methods-use-this */
  bindRevealListOptions(callback) {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.list-del')) {
        callback(e);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.closest('.list-del')) {
        callback(e);
      }
    });
  }

  bindListDelete(callback) {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.fa-check')) {
        callback(e);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.matches('.fa-check')) {
        callback(e);
      }
    });
  }

  bindCloseListOptions(callback) {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.fa-xmark')) {
        callback(e);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.matches('.fa-xmark')) {
        callback(e);
      }
    });
  }

  bindListSwitch(callback) {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.list-name')) {
        callback(e);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.matches('.list-name')) {
        callback(e);
      }
    });
  }

  bindListOnLoad(callback) {
    this.setHeading();
    callback();
  }
  /* eslint-enable class-methods-use-this */
}
