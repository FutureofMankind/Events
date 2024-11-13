export default class GalleryPlay {
  constructor() {
    this.container = null;
    this.submitListeners = [];
    this.btnAddListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GalleryPlay not bind to DOM');
    }
  }

  drawUI() {
    this.checkBinding();

    this.container.innerHTML = `
      <H2>
        Галерея изображений с проверкой URL
      </H2>
      <div class="top-tasks-container">
        <form data-id="gallery" class="form wrapper">
          <div class="gallery-group-label">
            <input data-id="gallery-name" class="field field-galery" type="text" name="gallery-name">
            <label class="text-field__label">Название</label>
          </div>
          <div class="gallery-group-label">
            <input data-id="gallery-url" class="field field-galery" type="text" name="gallery-url">
            <label class="text-field__label">Ссылка на изображение</label>
            <div class="url-example">Пример ссылки: https://netology.ru/apple-touch-icon.png</div>
          </div>
          <button data-id="gallery-img-add" class="btn img-btn">Добавить</button>
        </form>
        <div class="top-tasks-container__header">Галерея фотографий</div>
        <div data-id="galery-container" class="container-galery-img">

        </div>
      </div>
    `;

    this.container.classList.add('task');

    this.gallery = this.container.querySelector('[data-id=gallery]');
    this.galleryName = this.container.querySelector('[data-id=gallery-name]');
    this.galleryUrl = this.container.querySelector('[data-id=gallery-url]');
    this.galleryExampleUrl = this.container.querySelector('.url-example');
    this.galeryContainer = this.container.querySelector('[data-id=galery-container]');

    this.gallery.addEventListener('submit', (event) => this.onSubmit(event));
    this.galleryExampleUrl.addEventListener('click', (event) => this.onExampleUrl(event));

    this.galleryName.addEventListener('focus', () => this.onFocusClear('galleryName'));
    this.galleryUrl.addEventListener('focus', () => this.onFocusClear('galleryUrl'));
  }

  htmlImg(name, url) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
      <img class="galery-img" src="${url}" alt="${name}">
      <figcaption>${name}</figcaption>
      <div>X</div>
    `;
    figure.classList.add('galery-figure');
    figure.querySelector('div').addEventListener('click', (event) => this.onBtnImg(event));

    this.galeryContainer.appendChild(figure);
  }

  addSubmitListeners(callback) {
    this.submitListeners.push(callback);
  }

  addBtnImgListeners(callback) {
    this.btnAddListeners.push(callback);
  }

  onSubmit(event) {
    event.preventDefault();
    const name = this.galleryName.value;
    const url = this.galleryUrl.value;
    this.submitListeners.forEach((o) => o.call(null, name, url));
    this.galleryName.value = '';
    this.galleryUrl.value = '';
  }

  onBtnImg(event) {
    event.preventDefault();
    const btn = event.currentTarget;
    const { src } = btn.parentNode.querySelector('img');
    this.btnAddListeners.forEach((o) => o.call(null, src));
  }

  onExampleUrl(event) {
    event.preventDefault();
    this.galleryUrl.value = 'https://netology.ru/apple-touch-icon.png';
  }

  onFocusClear(input) {
    this.message(input, '');
    this.errorInputRemove(input);
  }

  checkVariable(input) {
    if (this[input] === undefined) {
      throw new Error('the variable does not exist');
    }
  }

  message(input, text) {
    this.checkVariable(input);
    this[input].placeholder = text;
  }

  errorInputAdd(input) {
    this.checkVariable(input);
    this[input].classList.add('error-add');
  }

  errorInputRemove(input) {
    this.checkVariable(input);
    this[input].classList.remove('error-add');
  }

  clearImgs() {
    this.galeryContainer.innerHTML = '';
  }

  clearHTML() {
    this.container.classList.remove('task');
    this.container.innerHTML = '';
  }
}
