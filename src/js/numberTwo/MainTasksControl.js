import searchTask from './searchTask';
import checkStatus from './checkStatus';
import checkTask from './checkTask';

export default class MainTasksControl {
  constructor(mainTasksPlay) {
    this.topTasksPlay = topTasksPlay;
    this.tasks = [
      { name: 'Сделать зарядку', pinned: false, show: true },
      { name: 'Приготовить завтрак', pinned: true, show: true },
      { name: 'Купить мороженное', pinned: false, show: true },
      { name: 'Сходить в парк', pinned: false, show: true },
      { name: 'Покататься на велике', pinned: false, show: true },
      { name: 'Сходить в кино', pinned: false, show: true },
      { name: 'Приготовить ужин', pinned: false, show: true },
    ];
  }

  init() {
    this.mainTasksPlay.addBtnPinnedListeners(this.onBtnPinned.bind(this));
    this.mainTasksPlay.addSubmitListeners(this.onSubmit.bind(this));
    this.mainTasksPlay.addValueListeners(this.onValue.bind(this));

    this.renderingTask();
  }

  onBtnPinned(taskName) {
    const index = checkTask(this.tasks, taskName);

    if (index !== -1) { this.tasks[index].pinned = !this.tasks[index].pinned; }

    this.renderingTask();
  }

  onSubmit(value) {
    const textValue = value.replace(/<[^>]*>/g, '');

    if (value.length === 0) {
      this.mainTasksPlay.message('Нельзя добавить пустую задачу');
      this.mainTasksPlay.errorInputAdd();
    }

    const index = checkTask(this.tasks, textValue);
    if (index !== -1) {
      this.mainTasksPlay.message('Нельзя добавить задачу повторно');
      this.mainTasksPlay.errorInputAdd();
    }

    if (index === -1 && value.length > 0) {
      this.tasks.push({ name: textValue, pinned: false, show: true });
      this.mainTasksPlay.onFocusClear();
    }

    this.tasks = searchTask(this.tasks, '');
    this.renderingTask();
  }

  onValue(value) {
    this.tasks = searchTask(this.tasks, value);
    this.renderingTask();
  }

  renderingTask() {
    this.mainTasksPlay.clearTask();
    for (let i = 0; i < this.tasks.length; i += 1) {
      const { name, pinned, show } = this.tasks[i];

      let btnContent = '';
      if (pinned) { btnContent = '\u{2714}'; }

      if (pinned) { this.mainTasksPlay.htmlTask(name, btnContent, 'pinnedEl'); }

      if (!pinned && show) { this.mainTasksPlay.htmlTask(name, btnContent, 'allTaskEl'); }

      this.renderEmpty();
    }
  }

  renderEmpty() {
    const pinnedEmpty = checkStatus(this.tasks, 'pinned', true);
    const allTaskEmpty = checkStatus(this.tasks, 'pinned', false);
    const showEmpty = checkStatus(this.tasks, 'show', true);

    if (!pinnedEmpty) { this.mainTasksPlay.pinnedEmpty(); }
    if (!allTaskEmpty) { this.mainTasksPlay.allTaskEmpty(); }
    if (!showEmpty) { this.mainTasksPlay.allTaskEmpty('No tasks found'); }
  }
}
