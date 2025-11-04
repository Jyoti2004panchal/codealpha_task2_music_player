const songs = [
  {
    title: "Dreams",
    artist: "Alex",
    src: "https://www.bensound.com/bensound-music/bensound-dreams.mp3"
  },
  {
    title: "Energy",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-energy.mp3"
  },
  {
    title: "Slowmotion",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3"
  }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playlist = document.getElementById("playlist");

const progressContainer = document.querySelector(".progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");

const volumeSlider = document.getElementById("volume");

let index = 0;

// Load song into player
function loadSong(i) {
  audio.src = songs[i].src;
  title.textContent = songs[i].title;
  artist.textContent = songs[i].artist;
  highlightPlaylist();
}
loadSong(index);

// Play / Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

// Next / Prev
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play();
}
function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play();
}

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = progressPercent + "%";

  updateTime();
});

// Seek Music
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// Display Time
function updateTime() {
  let current = Math.floor(audio.currentTime);
  let total = Math.floor(audio.duration);

  currentTimeEl.innerText = formatTime(current);
  totalTimeEl.innerText = total ? formatTime(total) : "0:00";
}

function formatTime(sec) {
  let min = Math.floor(sec / 60);
  let seconds = sec % 60;
  if (seconds < 10) seconds = "0" + seconds;
  return `${min}:${seconds}`;
}

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Playlist creation
songs.forEach((song, i) => {
  let li = document.createElement("li");
  li.innerHTML = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    index = i;
    loadSong(index);
    audio.play();
  });
  playlist.appendChild(li);
});

// Highlight Active Song
function highlightPlaylist() {
  document.querySelectorAll(".playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

// Bonus: Autoplay next song when finished
audio.addEventListener("ended", nextSong);
