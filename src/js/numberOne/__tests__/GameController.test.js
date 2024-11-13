import GamePlay from '../GamePlay';
import GameController from '../GameController';

jest.mock('../GamePlay');
beforeEach(() => { jest.resetAllMocks(); });

const gamePlay = new GamePlay();
gamePlay.startGame.mockReturnValue(console.log('метод .gamePlay.startGame был вызван'));
gamePlay.cellActiveRemove.mockReturnValue(console.log('метод .gamePlay.cellActiveRemove был вызван'));
gamePlay.changeHit.mockReturnValue(console.log('метод .gamePlay.changeHit был вызван'));
gamePlay.changeMisses.mockReturnValue(console.log('метод .gamePlay.changeMisses был вызван'));
gamePlay.endGame.mockReturnValue(console.log('метод .gamePlay.endGame был вызван'));
gamePlay.cellActiveRemove.mockReturnValue(console.log('метод .gamePlay.cellActiveRemove был вызван'));
gamePlay.cellActiveAdd.mockReturnValue(console.log('метод .gamePlay.cellActiveAdd был вызван'));

test('test gameController.onNewGameClick()', () => {
  const expected = {
    turn: true,
    lastCell: false,
    hits: 0,
    goblinPassed: 0,
    gameStarted: true,
  };
  const gameController = new GameController(gamePlay);

  gameController.interval = jest.fn(() => console.log('метод .interval из onNewGameClick()'));
  gameController.onNewGameClick();

  const received = {
    turn: gameController.turn,
    lastCell: gameController.lastCell,
    hits: gameController.hits,
    goblinPassed: gameController.goblinPassed,
    gameStarted: gameController.gameStarted,
  };

  expect(received).toEqual(expected);
});

test.each([
  [1, true, true],
  [1, false, false],
  [6, true, false],
  [6, false, false],
])(
  ('test gameController.gameOver()'),
  (goblinPassed, gameStarted, expected) => {
    const gameController = new GameController(gamePlay);
    gameController.goblinPassed = goblinPassed;
    gameController.gameStarted = gameStarted;

    gameController.gameOver();

    const received = gameController.gameStarted;

    expect(received).toEqual(expected);
  },
);

test('test gameController.goblinAppeared()', () => {
  const expected = true;

  const gameController = new GameController(gamePlay);

  gameController.gameOver = jest.fn(() => console.log('метод .gameOver из goblinAppeared()'));
  gameController.goblinAppeared();

  const received = gameController.turn;

  expect(received).toEqual(expected);
});

test('test gameController.onCellClick() gameStarted = false', () => {
  const expected = undefined;
  const gameController = new GameController(gamePlay);
  gameController.gameStarted = false;

  const received = gameController.onCellClick(1);

  expect(received).toEqual(expected);
});

test('test gameController.onCellClick() lastCell === index', () => {
  const expected = {
    turn: false,
    hits: 6,
    goblinPassed: 2,
  };
  const gameController = new GameController(gamePlay);
  gameController.gameStarted = true;
  gameController.lastCell = 1;
  gameController.turn = true;
  gameController.hits = 5;
  gameController.goblinPassed = 3;

  gameController.onCellClick(1);

  const received = {
    turn: gameController.turn,
    hits: gameController.hits,
    goblinPassed: gameController.goblinPassed,
  };

  expect(received).toEqual(expected);
});

test('test gameController.init()', () => {
  const expected = undefined;

  const gameController = new GameController(gamePlay);
  const received = gameController.init();

  expect(received).toEqual(expected);
});

test('test gameController.interval()', () => {
  const expected = undefined;

  global.setInterval = jest.fn();

  const gameController = new GameController(gamePlay);
  const received = gameController.interval();

  expect(received).toEqual(expected);
});
