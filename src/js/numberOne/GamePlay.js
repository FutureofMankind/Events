export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.cells = [];
    this.newGameListeners = [];
    this.cellClickListeners = [];
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
        Игра с гоблинами
      </H2>
      <div class="goblin-img"></div>
      <div class="points">
        <div data-id="hit" class="point">Попаданий: <span>0</span></div>
        <div data-id="misses" class="point">Пропущено: <span>0</span></div>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
        <div data-id="gameOver" class="gameOver">Поражение! Вы пропустили слишком много гномов.</div>
      </div>
      <div class="controls">
        <button data-id="action-restart" class="btn">Новая игра</button>
      </div>
    `;

    this.container.classList.add('task');

    this.container.addEventListener('contextmenu', (event) => event.preventDefault());

    this.hitEl = this.container.querySelector('[data-id=hit] span');
    this.missesEl = this.container.querySelector('[data-id=misses] span');
    this.gameOver = this.container.querySelector('[data-id=gameOver]');

    this.newGameEl = this.container.querySelector('[data-id=action-restart]');
    this.newGameEl.addEventListener('mousedown', (event) => this.onNewGameClick(event));

    this.boardEl = this.container.querySelector('[data-id=board]');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      cellEl.addEventListener('mousedown', (event) => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  addNewGameListener(callback) {
    this.newGameListeners.push(callback);
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onNewGameClick(event) {
    event.preventDefault();
    this.newGameListeners.forEach((o) => o.call(null));
  }

  onCellClick(event) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }

  cellActiveAdd(index) {
    const cell = this.cells[index];
    if (!cell) { return; }
    cell.classList.add('active');
  }

  cellActiveRemove(index) {
    const cell = this.cells[index];
    if (!cell) { return; }
    cell.classList.remove('active');
  }

  changeHit(points) {
    this.hitEl.textContent = points;
  }

  changeMisses(points) {
    this.missesEl.textContent = points;
  }

  endGame() {
    this.gameOver.style.display = 'flex';
  }

  startGame() {
    this.gameOver.style.display = 'none';
  }

  clearHTML() {
    this.container.classList.remove('task');
    this.container.innerHTML = '';
  }
}
