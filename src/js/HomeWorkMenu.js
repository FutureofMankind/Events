import GamePlay from './numberOne/GamePlay';
import GameController from './numberOne/GameController';
import MainTasksPlay from './numberTwo/MainTasksPlay';
import MainTasksControl from './numberTwo/MainTasksControl';
import GalleryPlay from './numberThree/GalleryPlay';
import GalleryControl from './numberThree/GalleryControl';

export default class HomeWorkMenu {
  constructor() {
    this.container = null;
    this.numberOneInited = false;
    this.numberTwoInited = false;
    this.numberThreeInited = false;
  }

  static checkContainer(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
  }

  bindToDOM(container) {
    HomeWorkMenu.checkContainer(container);
    this.container = container;
  }

  bindNumberOneToDOM(container) {
    HomeWorkMenu.checkContainer(container);
    this.containerNumberOne = container;
  }

  bindNumberTwoToDOM(container) {
    HomeWorkMenu.checkContainer(container);
    this.containerNumberTwo = container;
  }

  bindNumberThreeToDOM(container) {
    HomeWorkMenu.checkContainer(container);
    this.containerNumberThree = container;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }

  drawUI() {
    this.checkBinding();
    this.container.innerHTML = `
      <div class="controls">
        <button data-id="numberOne" class="btn">Задача № 1</button>
        <button data-id="numberTwo" class="btn">Задача № 2</button>
        <button data-id="numberThree" class="btn">Задача № 3</button>
      </div>
    `;

    this.numberOne = this.container.querySelector('[data-id=numberOne]');
    this.numberTwo = this.container.querySelector('[data-id=numberTwo]');
    this.numberThree = this.container.querySelector('[data-id=numberThree]');

    this.numberOne.addEventListener('click', (event) => this.onNumberOneClick(event));
    this.numberTwo.addEventListener('click', (event) => this.onNumberTwoClick(event));
    this.numberThree.addEventListener('click', (event) => this.onNumberThreeClick(event));
  }

  onNumberOneClick(event) {
    event.preventDefault();

    this.numberRemover();

    if (!this.numberOneInited) { this.numberOneInit(); }

    this.numberOneInited = !this.numberOneInited;
    this.numberTwoInited = false;
    this.numberThreeInited = false;
  }

  onNumberTwoClick(event) {
    event.preventDefault();

    this.numberRemover();

    if (!this.numberTwoInited) { this.numberTwoInit(); }

    this.numberOneInited = false;
    this.numberTwoInited = !this.numberTwoInited;
    this.numberThreeInited = false;
  }

  onNumberThreeClick(event) {
    event.preventDefault();

    this.numberRemover();

    if (!this.numberThreeInited) { this.numberThreeInit(); }

    this.numberOneInited = false;
    this.numberTwoInited = false;
    this.numberThreeInited = !this.numberThreeInited;
  }

  numberRemover() {
    if (this.numberOneInited) { this.numberOneRemove(); }
    if (this.numberTwoInited) { this.numberTwoRemove(); }
    if (this.numberThreeInited) { this.numberThreeRemove(); }
  }

  numberOneInit() {
    this.gamePlay = new GamePlay();
    this.gamePlay.bindToDOM(this.containerNumberOne);
    this.gamePlay.drawUI();

    this.gameController = new GameController(this.gamePlay);
    this.gameController.init();
  }

  numberTwoInit() {
    this.mainTasksPlay = new MainTasksPlay();
    this.mainTasksPlay.bindToDOM(this.containerNumberTwo);
    this.mainTasksPlay.drawUI();

    this.mainTasksControl = new MainTasksControl(this.mainTasksPlay);
    this.mainTasksControl.init();
  }

  numberThreeInit() {
    this.galleryPlay = new GalleryPlay();
    this.galleryPlay.bindToDOM(this.containerNumberThree);
    this.galleryPlay.drawUI();

    this.galleryControl = new GalleryControl(this.galleryPlay);
    this.galleryControl.init();
  }

  numberOneRemove() {
    this.gameController.gamePlay.clearHTML();
    this.gamePlay = '';
    this.gameController = '';
  }

  numberTwoRemove() {
    this.numberTasksControl.mainTasksPlay.clearHTML();
    this.numberTasksPlay = '';
    this.numberTasksControl = '';
  }

  taskThreeRemove() {
    this.galleryControl.galleryPlay.clearHTML();
    this.galleryPlay = '';
    this.galleryControl = '';
  }
}
