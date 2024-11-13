
import MainTasksControl from '../MainTasksControl';
import MainTasksPlay from '../MainTasksPlay';

jest.mock('../MainTasksPlay');
beforeEach(() => { jest.resetAllMocks(); });

const mainTasksPlay = new MainTasksPlay();
mainTasksPlay.addBtnPinnedListeners.mockReturnValue(console.log('вызван .mainTasksPlay.addBtnPinnedListeners'));
mainTasksPlay.addSubmitListeners.mockReturnValue(console.log('вызван .mainTasksPlay.addSubmitListeners'));
mainTasksPlay.addValueListeners.mockReturnValue(console.log('вызван .mainTasksPlay.addValueListeners'));
mainTasksPlay.message.mockReturnValue(console.log('вызван .mainTasksPlay.message'));
mainTasksPlay.errorInputAdd.mockReturnValue(console.log('вызван .mainTasksPlay.errorInputAdd'));
mainTasksPlay.onFocusClear.mockReturnValue(console.log('вызван .mainTasksPlay.onFocusClear'));
mainTasksPlay.clearTask.mockReturnValue(console.log('вызван .mainTasksPlay.clearTask'));

test('MainTasksControl', () => {
  const mainTasksControl = new MainTasksControl('test');
  const expected = {
    mainTasksPlay: 'test',
    tasks: [
      { name: 'Сделать зарядку', pinned: false, show: true },
      { name: 'Приготовить завтрак', pinned: true, show: true },
      { name: 'Купить мороженное', pinned: false, show: true },
      { name: 'Сходить в парк', pinned: false, show: true },
      { name: 'Покататься на велике', pinned: false, show: true },
      { name: 'Сходить в кино', pinned: false, show: true },
      { name: 'Приготовить ужин', pinned: false, show: true },
    ],
  };

  const resived = {
    mainTasksPlay: mainTasksControl.mainTasksPlay,
    tasks: mainTasksControl.tasks,
  };

  expect(resived).toEqual(expected);
});

test('MainTasksControl renderingTask()', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = undefined;

  const resived = mainTasksControl.renderingTask();

  expect(resived).toEqual(expected);
});

test('MainTasksControl init()', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = undefined;

  const resived = mainTasksControl.init();

  expect(resived).toEqual(expected);
});

test('MainTasksControl onBtnPinned()', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = true;

  mainTasksControl.tasks[5].pinned = false;
  mainTasksControl.onBtnPinned('Сходить в кино');

  const resived = mainTasksControl.tasks[5].pinned;

  expect(resived).toEqual(expected);
});

test('MainTasksControl onBtnPinned() false', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = undefined;

  const resived = mainTasksControl.onBtnPinned('false');

  expect(resived).toEqual(expected);
});

test('MainTasksControl onValue()', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = undefined;

  const resived = mainTasksControl.onValue('Сходить в кино');

  expect(resived).toEqual(expected);
});

test('MainTasksControl onSubmit() value.length === 0', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = undefined;

  const resived = mainTasksControl.onSubmit('');

  expect(resived).toEqual(expected);
});

test('MainTasksControl onSubmit() dabl task', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = undefined;

  const resived = mainTasksControl.onSubmit('Сделать зарядку');

  expect(resived).toEqual(expected);
});

test('MainTasksControl onSubmit() true', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = [
    { name: 'Сделать зарядку', pinned: false, show: true },
    { name: 'Пойти в гости', pinned: false, show: true },
  ];

  mainTasksControl.tasks = [
    { name: 'Сделать зарядку', pinned: false, show: true },
  ];
  mainTasksControl.onSubmit('Пойти в гости');

  const resived = mainTasksControl.tasks;

  expect(resived).toEqual(expected);
});

test('MainTasksControl onSubmit() true RegExp', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = [
    { name: 'Сделать зарядку', pinned: false, show: true },
    { name: 'Пойти в гости', pinned: false, show: true },
  ];

  mainTasksControl.tasks = [
    { name: 'Сделать зарядку', pinned: false, show: true },
  ];
  mainTasksControl.onSubmit('<div class="test">Пойти в гости</div>');

  const resived = mainTasksControl.tasks;

  expect(resived).toEqual(expected);
});

test('MainTasksControl renderEmpty() pinned true', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = undefined;

  mainTasksControl.tasks = [
    { name: 'Сделать зарядку', pinned: true, show: true },
    { name: 'Пойти в гости', pinned: true, show: true },
  ];

  const resived = mainTasksControl.renderEmpty();

  expect(resived).toEqual(expected);
});

test('MainTasksControl renderEmpty() pinned false', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = undefined;

  mainTasksControl.tasks = [
    { name: 'Сделать зарядку', pinned: false, show: true },
    { name: 'Пойти в гости', pinned: false, show: true },
  ];

  const resived = mainTasksControl.renderEmpty();

  expect(resived).toEqual(expected);
});

test('MainTasksControl renderEmpty() show false', () => {
  const mainTasksControl = new MainTasksControl(mainTasksPlay);
  const expected = undefined;

  mainTasksControl.tasks = [
    { name: 'Сделать зарядку', pinned: true, show: false },
    { name: 'Пойти в гости', pinned: false, show: false },
  ];

  const resived = mainTasksControl.renderEmpty();

  expect(resived).toEqual(expected);
});
