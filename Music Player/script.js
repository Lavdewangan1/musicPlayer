const audioPlayer = document.getElementById("audio-player");
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const volumeSlider = document.getElementById("volume-slider");
const progressBar = document.getElementById("progress-bar");
// const progressTime = document.getElementById("progress-time");
// const durationTime = document.getElementById("duration-time");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const albumName = document.getElementById("album-name");
const songListUl = document.getElementById("song-list-ul");
const playlistListUl = document.getElementById("playlist-list-ul");
const newPlaylistInput = document.getElementById("new-playlist-input");
const createPlaylistButton = document.getElementById("create-playlist-button");

const songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    album: "Album 1",
    src: "./songs/song1.mp3",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    album: "Album 1",
    src: "./songs/song2.mp3",
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    album: "Album 1",
    src: "./songs/song3.mp3",
  },
  {
    title: "Song 4",
    artist: "Artist 4",
    album: "Album 1",
    src: "./songs/song4.mp3",
  },
  {
    title: "Song 5",
    artist: "Artist 5",
    album: "Album 1",
    src: "./songs/song5.mp3",
  },
  {
    title: "Song 6",
    artist: "Artist 6",
    album: "Album 1",
    src: "./songs/song6.mp3",
  },
];

songs.forEach((song, index) => {
  const songListItem = document.createElement("li");
  songListItem.textContent = `${song.title} - ${song.artist}`;
  songListItem.dataset.songIndex = index;
  songListUl.appendChild(songListItem);
});

songListUl.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const songIndex = event.target.dataset.songIndex;
    currentSongIndex = songIndex;
    loadSong();
    audioPlayer.play();
  }
});

let currentSongIndex = 0;

const playlists = [];
let currentPlaylistIndex = 0;
createPlaylistButton.addEventListener("click", () => {
  const playlistName = newPlaylistInput.value.trim();
  if (playlistName) {
    const newPlaylist = {
      name: playlistName,
      songs: [],
    };
    playlists.push(newPlaylist);
    generatePlaylistList();
    newPlaylistInput.value = "";
  }
});

function generatePlaylistList() {
  playlistListUl.innerHTML = "";
  playlists.forEach((playlist, index) => {
    const playlistListItem = document.createElement("li");
    playlistListItem.textContent = playlist.name;
    playlistListItem.dataset.playlistIndex = index;
    playlistListUl.appendChild(playlistListItem);
  });
}

playlistListUl.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const playlistIndex = event.target.dataset.playlistIndex;
    currentPlaylistIndex = playlistIndex;
    loadPlaylist();
  }
});

function loadPlaylist() {
  const currentPlaylist = playlists[currentPlaylistIndex];
  songListUl.innerHTML = "";
  currentPlaylist.songs.forEach((song, index) => {
    const songListItem = document.createElement("li");
    songListItem.textContent = `${song.title} - ${song.artist}`;
    songListItem.dataset.songIndex = index;
    songListUl.appendChild(songListItem);
  });
  currentSongIndex = 0;
  loadSong();
}

// Play/pause functionality
playPauseButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.textContent = "Pause";
  } else {
    audioPlayer.pause();
    playPauseButton.textContent = "Play";
  }
});

// Previous song functionality
prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong();
  audioPlayer.play();
});

// Next song functionality
nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong();
  audioPlayer.play();
});

// // Volume control functionality
// volumeSlider.addEventListener("input", () => {
//   audioPlayer.volume = volumeSlider.value;
// });

// // Progress bar functionality
// audioPlayer.addEventListener("timeupdate", () => {
//   const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
//   progressBar.value = progress;
//   progressTime.textContent = formatTime(audioPlayer.currentTime);
// });

// Set duration time
audioPlayer.addEventListener("loadedmetadata", () => {
  durationTime.textContent = formatTime(audioPlayer.duration);
});

// // Handle progress bar click
// progressBar.addEventListener("click", (event) => {
//   const clickX = event.offsetX;
//   const progress = (clickX / progressBar.offsetWidth) * 100;
//   audioPlayer.currentTime = (progress / 100) * audioPlayer.duration;
// });

// Helper function to format time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

// Load the initial song
function loadSong() {
  const currentSong = songs[currentSongIndex];
  audioPlayer.src = currentSong.src;
  songTitle.textContent = currentSong.title;
  artistName.textContent = currentSong.artist;
  albumName.textContent = currentSong.album;
}

// Load the first song initially
loadSong();
