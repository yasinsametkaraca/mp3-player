class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getfullName() {
    return this.title + " - " + this.singer;
  }
}

const musicList = [
  new Music("Dağlar", "Haluk Levent", "1.jpeg", "1.mp3"),
  new Music("Elfida", "Haluk Levent", "2.jpeg", "2.mp3"),
  new Music("Yollarda Bulurum Seni", "Haluk Levent", "3.jpeg", "3.mp3"),
];
