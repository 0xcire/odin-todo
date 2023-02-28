import * as utils from '../utils/utils';

export default class TodoController {
  constructor(state) {
    this.state = state;
  }

  handleTodoSubmit(e) {
    const data = new FormData(e.target);
    this.state.todo.saveData(data);
    const list = data.get('list');

    const todos = this.state.todo.getTodos(list);
    this.state.TodoView.renderTodos(todos, list);

    const count = this.state.todo.getTotalTodos(list);
    this.state.ListView.updateListCount(count, list);

    this.state.TodoView.hideForm();
    this.state.TodoView.resetTitleAndDate();
  }

  handleTodoEdit(e) {
    const parent = e.target.closest('.todo');
    const { id } = parent;
    const title = document.querySelector('.current-list');
    const list = title.textContent;
    const activeList = title.dataset.name;
    const inputs = document.querySelectorAll(`[data-name="${id}-input"]`);

    if (inputs[0].disabled) {
      this.state.TodoView.enableEdit(inputs);
    } else {
      this.state.TodoView.disableEdit(inputs);
      const values = this.state.todo.constructor.getUpdatedValues(inputs);
      this.state.todo.updateEdit(id, list, values);

      // if marked as completed
      if (values[2] === true) {
        this.state.todo.addToCompleted(activeList, id);
        const todos = this.state.todo.getTodos(activeList);
        this.state.TodoView.renderTodos(todos, list);

        const lists = this.state.list.getLists();
        const counts = this.state.list.getListCounts();
        this.state.ListView.updateListCount(counts, lists);
      }
    }
  }

  handleTodoDelete(e) {
    const todoEl = e.target.closest('.todo');
    const { id } = todoEl;
    const list = todoEl.dataset.name;

    this.state.todo.delete(id, list);

    const todos = this.state.todo.getTodos(list);
    this.state.TodoView.renderTodos(todos, list);
    this.state.ListView.updateListCount(
      this.state.todo.getTotalTodos(list),
      list
    );
  }

  handleTodoSelectChange(e) {
    const dataName = e.target.value;
    const name = utils.addASpace(dataName);

    this.state.TodoView.updateTodoListTitle(name);
    const todos = this.state.todo.getTodos(dataName);
    this.state.TodoView.renderTodos(todos, dataName);
  }

  handleTodosOnLoad() {
    const lastViewed = this.state.list.getLastViewed();
    const todos = this.state.todo.getTodos(lastViewed);

    this.state.TodoView.renderTodos(todos, lastViewed);
    this.state.TodoView.updateTodoListTitle(lastViewed);
  }

  init() {
    this.state.TodoView.bindTodoFormEvents();
    this.state.TodoView.bindTodoSubmit(this.handleTodoSubmit.bind(this));
    this.state.TodoView.bindTodoEdit(this.handleTodoEdit.bind(this));
    this.state.TodoView.bindTodoDelete(this.handleTodoDelete.bind(this));
    this.state.TodoView.bindTodoSelectChange(
      this.handleTodoSelectChange.bind(this)
    );
    this.state.TodoView.bindTodoOnLoad(this.handleTodosOnLoad.bind(this));
  }
}
