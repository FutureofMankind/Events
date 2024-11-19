export default class MainTasksPlay {
  constructor() {
    this.container = null;
    this.btnPinnedListeners = [];
    this.submitListeners = [];
    this.valueListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }

  drawUI() {
    this.checkBinding();

    this.container.innerHTML = `
      <H2>
        MAIN Tasks
      </H2>
      <div class="main-tasks-container">
        <div class="main-tasks-container__header">MAIN Tasks</div>
        <form data-id="filter" class="form">
          <input data-id="filter-text" class="field" name="filter-text" autocomplete="off">
          <button data-id="filter-text-add" class="filter-btn-add"></button>
        </form>
        <div class="main-tasks-container__header">Pinned</div>
        <div data-id="pinned" class="pinned">
        
        </div>
        <div class="main-tasks-container__header">All Task</div>
        <div data-id="all-task" class="pinned">

        </div>
      </div>
    `;

    this.container.classList.add('task');

    this.filter = this.container.querySelector('[data-id=filter]');
    this.filterText = this.container.querySelector('[data-id=filter-text]');
    this.pinnedEl = this.container.querySelector('[data-id=pinned]');
    this.allTaskEl = this.container.querySelector('[data-id=all-task]');

    this.filter.addEventListener('submit', (event) => this.onSubmit(event));
    this.filterText.addEventListener('input', (event) => this.onValue(event));

    this.filterText.addEventListener('focus', (event) => this.onFocusClear(event));
  }

  htmlTask(taskName, btnContent, element) {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="task-element-name">${taskName}</div>
      <button data-id="pinned-add" class="btn-pinned">${btnContent}</button>
    `;
    div.classList.add('task-element');
    div.querySelector('.btn-pinned').addEventListener('click', (event) => this.onBtnPinned(event));

    this[element].appendChild(div);
  }

  addBtnPinnedListeners(callback) {
    this.btnPinnedListeners.push(callback);
  }

  addSubmitListeners(callback) {
    this.submitListeners.push(callback);
  }

  addValueListeners(callback) {
    this.valueListeners.push(callback);
  }

  onBtnPinned(event) {
    event.preventDefault();
    const btn = event.currentTarget;
    const { textContent } = btn.parentNode.querySelector('.task-element-name');
    this.btnPinnedListeners.forEach((o) => o.call(null, textContent));
  }

  onSubmit(event) {
    event.preventDefault();
    const input = event.currentTarget.querySelector('[data-id=filter-text]');
    this.submitListeners.forEach((o) => o.call(null, input.value));
    input.value = '';
  }

  onValue(event) {
    event.preventDefault();
    const { value } = event.currentTarget;
    this.valueListeners.forEach((o) => o.call(null, value));
  }

  onFocusClear() {
    this.message('');
    this.errorInputRemove();
  }

  clearTask() {
    this.pinnedEl.innerHTML = '';
    this.allTaskEl.innerHTML = '';
  }

  pinnedEmpty() {
    this.pinnedEl.innerHTML = `
      <div class="task-element-name">No pinned tasks</div>
    `;
  }

  allTaskEmpty(content = 'No tasks') {
    this.allTaskEl.innerHTML = `
      <div class="task-element-name"></div>
    `;
    this.allTaskEl.textContent = content;
  }

  message(text) {
    this.filterText.placeholder = text;
  }

  errorInputAdd() {
    this.filterText.classList.add('error-add');
  }

  errorInputRemove() {
    this.filterText.classList.remove('error-add');
  }

  clearHTML() {
    this.container.classList.remove('task');
    this.container.innerHTML = '';
  }
}
