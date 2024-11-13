import checkUrl from './checkUrl';
import verificationUrl from './verificationUrl';

export default class GalleryControl {
  constructor(galleryPlay) {
    this.galleryPlay = galleryPlay;
    this.imgs = [
      {
        name: 'Хакер',
        url: 'https://cdn.pixabay.com/photo/2020/08/08/02/56/hacker-5471975_960_720.png',
      },
      {
        name: 'Разработка',
        url: 'https://cdn.pixabay.com/photo/2021/08/05/12/36/software-development-6523979_960_720.jpg',
      },
      {
        name: 'Матрица',
        url: 'https://cdn.pixabay.com/photo/2018/02/11/09/37/matrix-full-3145364_960_720.jpg',
      },
    ];
  }

  init() {
    this.galleryPlay.addSubmitListeners(this.onSubmit.bind(this));
    this.galleryPlay.addBtnImgListeners(this.onBtnImg.bind(this));

    this.renderingTask();
  }

  async onSubmit(name, url) {
    if (name.length === 0) {
      this.galleryPlay.message('galleryName', 'Требуется заполнить Название');
      this.galleryPlay.errorInputAdd('galleryName');
    }

    if (url.length === 0) {
      this.galleryPlay.message('galleryUrl', 'Требуется заполнить ссылку');
      this.galleryPlay.errorInputAdd('galleryUrl');
    }

    const validUrl = await verificationUrl(url);
    const index = checkUrl(this.imgs, url);

    if (index !== -1) {
      this.galleryPlay.message('galleryUrl', 'Такая ссылка уже есть в галерее');
      this.galleryPlay.errorInputAdd('galleryUrl');
    }

    if (!validUrl && url.length !== 0) {
      this.galleryPlay.message('galleryUrl', 'Ссылка не является картинкой');
      this.galleryPlay.errorInputAdd('galleryUrl');
    }

    if (index === -1 && name.length > 0 && url.length > 0 && validUrl) {
      this.imgs.push({ name, url });
      this.galleryPlay.onFocusClear('galleryName');
      this.galleryPlay.onFocusClear('galleryUrl');

      this.renderingTask();
    }
  }

  onBtnImg(url) {
    const index = checkUrl(this.imgs, url);
    if (index !== -1) { this.imgs.splice(index, 1); }

    this.renderingTask();
  }

  renderingTask() {
    this.galleryPlay.clearImgs();

    const arr = this.imgs;
    for (let i = 0; i < arr.length; i += 1) {
      this.galleryPlay.htmlImg(arr[i].name, arr[i].url);
    }
  }
}
