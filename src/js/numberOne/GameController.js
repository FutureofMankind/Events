import randomСondition from './randomСondition';

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.gameStarted = false;
    this.turn = true;
  }

  init() {
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onNewGameClick() {
    this.gamePlay.startGame();
    this.gamePlay.cellActiveRemove(this.lastCell);
    this.lastCell = false;
    this.hits = 0;
    this.goblinPassed = 0;
    this.gameStarted = true;

    this.gamePlay.changeHit(this.hits);
    this.gamePlay.changeMisses(this.goblinPassed);

    this.interval();
  }

  onCellClick(index) {
    if (!this.gameStarted || !this.turn) { return; }
    if (this.lastCell === index) {
      this.hits += 1;
      this.goblinPassed -= 1;
      this.gamePlay.changeHit(this.hits);
      this.gamePlay.cellActiveRemove(this.lastCell);
    }
    this.turn = false;
  }

  goblinAppeared() {
    this.gameOver();

    this.gamePlay.changeMisses(this.goblinPassed);
    this.goblinPassed += 1;

    this.gamePlay.cellActiveRemove(this.lastCell);
    this.lastCell = randomСondition(this.lastCell, this.gamePlay.boardSize);
    this.gamePlay.cellActiveAdd(this.lastCell);

    this.turn = true;
  }

  interval() {
    clearInterval(this.timerID);
    this.timerID = setInterval(this.goblinAppeared.bind(this), 1000);
  }

  gameOver() {
    if (this.goblinPassed >= 5 && this.gameStarted) {
      this.gamePlay.endGame();
      this.gameStarted = false;
      clearInterval(this.timerID);
    }
  }
}
