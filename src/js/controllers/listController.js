export default class ListController {
  constructor(state) {
    this.state = state;
  }

  handleListSubmit(e) {
    this.state.list.addListToStorage(e.target[0].value);

    const lists = this.state.list.getLists();
    const counts = this.state.list.getListCounts();

    this.state.ListView.update(lists, counts);
    this.state.ListView.hideForm();
    e.target.reset();
  }

  handleRevealListOptions(e) {
    const list = e.target.parentElement.dataset.name;
    const xMark = document.querySelectorAll(`[data-name=${list}-opt]`)[1];

    this.state.ListView.toggleListDeleteForm(e.target.nextSibling);
    setTimeout(() => xMark.focus(), 0);
    this.state.ListView.toggleTabbing(list, true);
  }

  handleListDelete(e) {
    const listEl = e.target.closest('.list');
    const activeList = listEl.dataset.name;

    // clearing list
    if (activeList === 'Todos' || activeList === 'Complete') {
      this.state.list.clearTodos(activeList);
      this.state.TodoView.renderTodos([], activeList);
      this.state.ListView.updateListCount(0, activeList);
      this.state.ListView.toggleListDeleteForm(
        e.target.closest('.list-delete-form')
      );
      this.state.ListView.toggleTabbing(activeList, false);
      return;
    }

    // deleting list, rendering default view
    this.state.list.delete(activeList);
    this.state.list.setLastViewedList();
    this.state.ListView.update(
      this.state.list.getLists(),
      this.state.list.getListCounts()
    );
    this.state.TodoView.renderTodos(this.state.todo.getTodos());
    this.state.TodoView.updateTodoListTitle();
  }

  handleCloseListOptions(e) {
    const activeList = e.target.closest('.list').dataset.name;
    this.state.ListView.toggleListDeleteForm(
      e.target.closest('.list-delete-form')
    );
    this.state.ListView.toggleTabbing(activeList, false);
  }

  handleListSwitch(e) {
    const activeList = e.target.closest('.list').dataset.name;
    this.state.list.setLastViewedList(activeList);
    this.state.TodoView.updateTodoFormListSelection(activeList);
    this.state.TodoView.updateTodoListTitle(activeList);

    const todos = this.state.todo.getTodos(activeList);
    this.state.TodoView.renderTodos(todos, activeList);

    if (window.innerWidth < 1080) {
      this.state.ListView.hideMobileSidebar();
    }
  }

  handleListsOnLoad() {
    const lists = this.state.list.getLists();
    const counts = this.state.list.getListCounts();
    this.state.ListView.update(lists, counts);
  }

  init() {
    this.state.ListView.bindListFormEvents();
    this.state.ListView.bindMobileViewEvents();

    this.state.ListView.bindListSubmit(this.handleListSubmit.bind(this));
    this.state.ListView.bindRevealListOptions(
      this.handleRevealListOptions.bind(this)
    );
    this.state.ListView.bindListDelete(this.handleListDelete.bind(this));
    this.state.ListView.bindCloseListOptions(
      this.handleCloseListOptions.bind(this)
    );
    this.state.ListView.bindListSwitch(this.handleListSwitch.bind(this));
    this.state.ListView.bindListOnLoad(this.handleListsOnLoad.bind(this));
  }
}
