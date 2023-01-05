const music = new Audio("Faded(PaglaSongs).mp3");
const songs = [
  {
    id: "1",
    songName: ` Faded <br>
    <div class="subtitle">Alan Walker</div>`,
    poster: "img/1.jpg",
  },
  {
    id: "2",
    songName: ` On My Way <br>
        <div class="subtitle">Alan Walker</div>`,
    poster: "img/2.jpg",
  },
  {
    id: "3",
    songName: `Moonlight <br>
    <div class="subtitle">Harnoor</div>`,
    poster: "img/3.jpg",
  },
  {
    id: "4",
    songName: `Jeena Jeena
    <div class="subtitle">Atif Aslam</div>`,
    poster: "img/4.jpg",
  },
  {
    id: "5",
    songName: `Ishq Wala Love
    <div class="subtitle">Vishal-Shekhar</div>`,
    poster: "img/5.jpg",
  },
  {
    id: "6",
    songName: `Tu Har Lamha
    <div class="subtitle">Arijit Singh</div>`,
    poster: "img/6.jpg",
  },
  {
    id: "7",
    songName: `Meherbaan
    <div class="subtitle">Ash King</div>`,
    poster: "img/7.jpg",
  },
  {
    id: "8",
    songName: `Baarishein <br>
    <div class="subtitle">Anuv Jain</div>`,
    poster: "img/8.jpg",
  },
  {
    id: "9",
    songName: ` Senorita <br >
    <div class="subtitle">Camila Cabello</div>`,
    poster: "img/9.jpg",
  },
  {
    id: "10",
    songName: `Maan Meri Jaan <br>
    <div class="subtitle">King</div>`,
    poster: "img/10.jpg",
  },
  {
    id: "11",
    songName: `Mere Bina <br>
    <div class="subtitle">Pritam</div>`,
    poster: "img/11.jpg",
  },
  {
    id: "12",
    songName: `Fursat <br>
    <div class="subtitle">Arjun Kanungo</div>`,
    poster: "img/12.jpg",
  },
  {
    id: "13",
    songName: `Darasal <br>
    <div class="subtitle">Atif Aslam</div>`,
    poster: "img/13.jpg",
  },
  {
    id: "14",
    songName: `Jeene Laga Hoon <br>
    <div class="subtitle">Atif Aslam</div>`,
    poster: "img/14.jpg",
  },
  {
    id: "15",
    songName: `Dil Diyan Gallan <br>
    <div class="subtitle">Atif Aslam</div>`,
    poster: "img/15.jpg",
  },
];
Array.from(document.getElementsByClassName("song-items")).forEach(
  (element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].poster;
    element.getElementsByTagName("h5")[0].innerHTML = songs[i].songName;
  }
);

let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementsByClassName("wave")[0];

masterPlay.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
  } else {
    music.pause();
    masterPlay.classList.add("bi-play-fill");
    masterPlay.classList.remove("bi-pause-fill");
    wave.classList.remove("active2");
  }
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("playListPlay")).forEach(
    (element) => {
      element.classList.add("bi-play-circle-fill");
      element.classList.remove("bi-pause-circle-fill");
    }
  );
};

const makeAllbackgrounds = () => {
  Array.from(document.getElementsByClassName("song-items")).forEach(
    (element) => {
      element.style.background = "rgb(105,105,170,0)";
    }
  );
};

let index = 0;
let poster_master_play = document.getElementById("poster_master_play");
let title = document.getElementById("title");

Array.from(document.getElementsByClassName("playListPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      index = e.target.id;
      makeAllPlays();
      e.target.classList.remove("bi-play-circle-fill");
      e.target.classList.add("bi-pause-circle-fill");
      music.src = `audio/${index}.mp3.mp3`;
      poster_master_play.src = `img/${index}.jpg`;
      music.play();
      let song_title = songs.filter((ele) => {
        return ele.id == index;
      });
      song_title.forEach((ele) => {
        let { songName } = ele;
        title.innerHTML = songName;
      });
      masterPlay.classList.remove("bi-play-fill");
      masterPlay.classList.add("bi-pause-fill");
      wave.classList.add("active2");
      music.addEventListener("ended", () => {
        masterPlay.classList.add("bi-play-fill");
        masterPlay.classList.remove("bi-pause-fill");
        wave.classList.remove("active2");
      });
      makeAllbackgrounds();
      Array.from(document.getElementsByClassName("song-items"))[
        `${index - 1}`
      ].style.background = "rgb(105,105,170,.1)";
    });
  }
);

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", () => {
  let music_curr = music.currentTime;
  let music_dur = music.duration;

  let min = Math.floor(music_dur / 60);
  let sec = Math.floor(music_dur % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  currentEnd.innerHTML = `${min}:${sec}`;

  let min1 = Math.floor(music_curr / 60);
  let sec1 = Math.floor(music_curr % 60);
  if (sec1 < 10) {
    sec1 = `0${sec1}`;
  }
  currentStart.innerHTML = `${min1}:${sec1}`;

  let progressbar = parseInt((music.currentTime / music.duration) * 100);
  seek.value = progressbar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});

seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});

music.addEventListener("ended", () => {
  masterPlay.classList.add("bi-play-fill");
  masterPlay.classList.remove("bi-pause-fill");
  wave.classList.remove("active2");
});

// volume
let volicon = document.getElementById("vol-icon");
let vol = document.getElementById("vol");
let voldot = document.getElementById("vol-dot");
let volbar = document.getElementsByClassName("vol-bar")[0];

vol.addEventListener("change", () => {
  if (vol.value == 0) {
    volicon.classList.remove("bi-volume-down-fill");
    volicon.classList.add("bi-volume-mute-fill");
    volicon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 0) {
    volicon.classList.add("bi-volume-down-fill");
    volicon.classList.remove("bi-volume-mute-fill");
    volicon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 50) {
    volicon.classList.remove("bi-volume-down-fill");
    volicon.classList.remove("bi-volume-mute-fill");
    volicon.classList.add("bi-volume-up-fill");
  }
  let vol_a = vol.value;
  volbar.style.width = `${vol_a}%`;
  voldot.style.left = `${vol_a}%`;
  music.volume = vol_a / 100;
});

// back button
let back = document.getElementById("back");
let next = document.getElementById("next");
back.addEventListener("click", () => {
  index -= 1;
  if (index < 1) {
    index = Array.from(document.getElementsByClassName("song-items")).length;
  }
  music.src = `audio/${index}.mp3.mp3`;
  poster_master_play.src = `img/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });
  song_title.forEach((ele) => {
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllPlays();
  document.getElementById(`${index}`).classList.remove("bi-play-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-fill");
  makeAllbackgrounds();
  Array.from(document.getElementsByClassName("song-items"))[
    `${index - 1}`
  ].style.background = "rgb(105,105,170,.1)";
});

// next button
next.addEventListener("click", () => {
  index -= 0;
  index += 1;
  if (
    index > Array.from(document.getElementsByClassName("song-items")).length
  ) {
    index = 1;
  }
  music.src = `audio/${index}.mp3.mp3`;
  poster_master_play.src = `img/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });
  song_title.forEach((ele) => {
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllPlays();
  document.getElementById(`${index}`).classList.remove("bi-play-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-fill");
  makeAllbackgrounds();
  Array.from(document.getElementsByClassName("song-items"))[
    `${index - 1}`
  ].style.background = "rgb(105,105,170,.1)";
});

// left and right scroll
let left_scroll = document.getElementById("left-scroll");
let right_scroll = document.getElementById("right-scroll");
let pop_song = document.getElementsByClassName("pop-song")[0];
left_scroll.addEventListener("click", () => {
  pop_song.scrollLeft -= 330;
});
right_scroll.addEventListener("click", () => {
  pop_song.scrollLeft += 330;
});

let left_scrolls = document.getElementById("left_scrolls");
let right_scrolls = document.getElementById("right_scrolls");
let item = document.getElementsByClassName("item")[0];
left_scrolls.addEventListener("click", () => {
  item.scrollLeft -= 330;
});
right_scrolls.addEventListener("click", () => {
  item.scrollLeft += 330;
});
