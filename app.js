const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .music-title");
const singer = document.querySelector("#music-details .music-singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

const musicplayer = new Mp3Player(musicList);

window.addEventListener("load", () => {
  let music = musicplayer.getMusic();
  displayMusic(music);
  displayMusicList(musicplayer.musicList);
  ismusicplayingNow();
});

function displayMusic(music) {
  title.innerText = music.getfullName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("musicplaying");
  isMusicPlay ? pauseMusic() : playMusic();
});

next.addEventListener("click", () => {
  nextMusic();
});

prev.addEventListener("click", () => {
  previousMusic();
});

const nextMusic = () => {
  musicplayer.next();
  let music = musicplayer.getMusic();
  displayMusic(music);
  playMusic();
  ismusicplayingNow();
};

const previousMusic = () => {
  musicplayer.previous();
  let music = musicplayer.getMusic();
  displayMusic(music);
  playMusic();
  ismusicplayingNow();
};

const pauseMusic = () => {
  container.classList.remove("musicplaying");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
};

const playMusic = () => {
  container.classList.add("musicplaying");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
};

const calculateTime = (totalSecond) => {
  const minute = Math.floor(totalSecond / 60);
  const second = Math.floor(totalSecond % 60);
  const updatedSecond = second < 10 ? `0${second}` : `${second}`;
  const result = `${minute}:${updatedSecond}`;
  return result;
};

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

let sesDurumu = "voiced";

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    sesDurumu = "voiceless";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    sesDurumu = "voiced";
    volume.classList = "fa-solid fa-volume-high";
  }
});

volume.addEventListener("click", () => {
  if (sesDurumu === "voiced") {
    audio.muted = true;
    sesDurumu = "voiceless";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    sesDurumu = "voiced";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex  align-items-center justify-content-between ">
                <span>${list[i].getfullName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `;

    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  musicplayer.index = li.getAttribute("li-index");
  displayMusic(musicplayer.getMusic());
  playMusic();
  ismusicplayingNow();
};

const ismusicplayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("musicplaying")) {
      li.classList.remove("musicplaying");
    }

    if (li.getAttribute("li-index") == musicplayer.index) {
      li.classList.add("musicplaying");
    }
  }
};

audio.addEventListener("ended", () => {
  nextMusic();
});
