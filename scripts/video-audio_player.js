function updateSeekBarBackground(seekBar, value, max) {
  const percent = max > 0 ? (value / max) * 100 : 0;
  seekBar.style.background = `linear-gradient(to right, #00336a 0%, #00336a ${percent}%, #c7c7c7 ${percent}%, #c7c7c7 100%)`;
}

document.addEventListener('DOMContentLoaded', function () {
  var videos = document.querySelectorAll('.video');
  var musicItems = document.querySelectorAll(".music-item");
  var currentVideo = null;
  var currentAudioPlayer = null;
  var currentPlayButton = null;

  const lastPlayedSrc = localStorage.getItem("last-audio");
  const wasPlaying = localStorage.getItem("audio-playing") === "true";

  videos.forEach(function (video) {
    video.addEventListener('loadeddata', function () {
      var videoKey = video.dataset.key;
      var savedTime = localStorage.getItem(videoKey);
      if (savedTime && !isNaN(savedTime)) {
        video.currentTime = parseFloat(savedTime);
      }
    });

    video.addEventListener('play', function (event) {
      currentVideo = event.target;
      videos.forEach(function (v) {
        if (v !== currentVideo) v.pause();
      });
      if (currentAudioPlayer && !currentAudioPlayer.paused) {
        currentAudioPlayer.pause();
        if (currentPlayButton) {
          currentPlayButton.innerHTML = "&#9658;";
          currentPlayButton.classList.remove("playing");
        }
      }
    });

    video.addEventListener('pause', function () {
      var videoKey = video.dataset.key;
      localStorage.setItem(videoKey, video.currentTime);
    });

    video.addEventListener('ended', function () {
      var videoKey = video.dataset.key;
      localStorage.removeItem(videoKey);
    });
  });

  musicItems.forEach(function (item, index) {
    var playButton = item.querySelector(".play-button");
    var audioSrc = playButton.dataset.src;
    var audioPlayer = new Audio(audioSrc);
    var seekBar = item.querySelector(".seek-bar");

    // 👇 Связка объектов
    item.audioPlayer = audioPlayer;
    item.playButton = playButton;

    audioPlayer.addEventListener("loadedmetadata", function () {
      seekBar.max = audioPlayer.duration || 0;

      var savedTime = localStorage.getItem(audioSrc);
      if (savedTime && !isNaN(savedTime)) {
        audioPlayer.currentTime = parseFloat(savedTime);
        seekBar.value = parseFloat(savedTime);
      } else {
        seekBar.value = 0;
      }
      updateSeekBarBackground(seekBar, seekBar.value, seekBar.max);

      // 🔁 Восстановить проигрывание после перезагрузки
      if (lastPlayedSrc === audioSrc && wasPlaying) {
        audioPlayer.play().then(() => {
          playButton.innerHTML = "&#10074;&#10074;";
          playButton.classList.add("playing");
          currentAudioPlayer = audioPlayer;
          currentPlayButton = playButton;
        }).catch(console.warn);
      }
    });

    audioPlayer.addEventListener("timeupdate", function () {
      seekBar.value = audioPlayer.currentTime;
      updateSeekBarBackground(seekBar, seekBar.value, seekBar.max);
      localStorage.setItem(audioSrc, audioPlayer.currentTime);
    });

    seekBar.addEventListener("input", function () {
      updateSeekBarBackground(seekBar, seekBar.value, seekBar.max);
    });

    seekBar.addEventListener("change", function () {
      audioPlayer.currentTime = parseFloat(seekBar.value);
      localStorage.setItem(audioSrc, seekBar.value);
    });

    playButton.addEventListener("click", function () {
      if (currentAudioPlayer && currentAudioPlayer !== audioPlayer) {
        currentAudioPlayer.pause();
        if (currentPlayButton) {
          currentPlayButton.innerHTML = "&#9658;";
          currentPlayButton.classList.remove("playing");
        }
      }

      currentAudioPlayer = audioPlayer;
      currentPlayButton = playButton;

      if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.innerHTML = "&#10074;&#10074;";
        playButton.classList.add("playing");

        localStorage.setItem("last-audio", audioSrc);
        localStorage.setItem("audio-playing", "true");

        if (currentVideo && !currentVideo.paused) {
          currentVideo.pause();
        }
      } else {
        audioPlayer.pause();
        localStorage.setItem(audioSrc, audioPlayer.currentTime);
        localStorage.setItem("audio-playing", "false");

        playButton.innerHTML = "&#9658;";
        playButton.classList.remove("playing");
      }
    });

    audioPlayer.addEventListener("ended", function () {
      playButton.innerHTML = "&#9658;";
      seekBar.value = 0;
      updateSeekBarBackground(seekBar, 0, seekBar.max);
      localStorage.removeItem(audioSrc);

      if (index < musicItems.length - 1) {
        var nextButton = musicItems[index + 1].querySelector(".play-button");
        if (nextButton) nextButton.click();
      }

      localStorage.removeItem("last-audio");
      localStorage.setItem("audio-playing", "false");
    });

    audioPlayer.addEventListener('play', function () {
      if (currentVideo && !currentVideo.paused) {
        currentVideo.pause();
      }
    });
  });

  musicItems.forEach(function (item) {
    var playButton = item.querySelector(".play-button");
    playButton.addEventListener("click", function () {
      if (currentVideo) {
        currentVideo.pause();
      }
    });
  });
});
