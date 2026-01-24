const audio = document.querySelector('audio');
const seekBar = document.querySelector('.seek-bar');
const seekBarFill = document.querySelector('.seekbar-fill');

seekBar.addEventListener('input', () => {
  updateSeekBarBackground(seekBarFill, seekBar.value, seekBar.max);
  audio.currentTime = seekBar.value; // синхронизация с аудио
});

// обновление во время воспроизведения
audio.addEventListener('timeupdate', () => {
  seekBar.value = audio.currentTime;
  updateSeekBarBackground(seekBarFill, audio.currentTime, audio.duration);
});

function updateSeekBarBackground(seekBarFill, value, max) {
  const percent = max > 0 ? (value / max) * 100 : 0;
  seekBarFill.style.width = `${percent}%`;
}

document.addEventListener('DOMContentLoaded', function() {
  var videos = document.querySelectorAll('.video');
  var musicItems = document.querySelectorAll(".music-item");
  var currentVideo = null;
  var currentAudioPlayer = null;
  var currentPlayButton = null;

  videos.forEach(function(video) {
    video.addEventListener('loadeddata', function() {
      var videoKey = video.dataset.key;
      var savedTime = localStorage.getItem(videoKey);
      if (savedTime && !isNaN(savedTime)) {
        video.currentTime = parseFloat(savedTime);
      }
    });

    video.addEventListener('play', function(event) {
      currentVideo = event.target;
      videos.forEach(function(v) {
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

    video.addEventListener('pause', function() {
      var videoKey = video.dataset.key;
      localStorage.setItem(videoKey, video.currentTime);
    });

    video.addEventListener('ended', function() {
      var videoKey = video.dataset.key;
      localStorage.removeItem(videoKey);
    });
  });

  musicItems.forEach(function(item, index) {
    var playButton = item.querySelector(".play-button");
    var audioSrc = playButton.dataset.src;
    var audioPlayer = new Audio(audioSrc);
    var seekBar = item.querySelector(".seek-bar");

    audioPlayer.addEventListener("loadedmetadata", function() {
      seekBar.max = audioPlayer.duration || 0;

      var savedTime = localStorage.getItem(audioSrc);
      if (savedTime && !isNaN(savedTime)) {
        audioPlayer.currentTime = parseFloat(savedTime);
        seekBar.value = parseFloat(savedTime);
      } else {
        seekBar.value = 0;
      }
      updateSeekBarBackground(seekBar, seekBar.value, seekBar.max);
    });

    audioPlayer.addEventListener("timeupdate", function() {
      seekBar.value = audioPlayer.currentTime;
      updateSeekBarBackground(seekBar, seekBar.value, seekBar.max);
    });

    seekBar.addEventListener("input", function() {
      updateSeekBarBackground(seekBar, seekBar.value, seekBar.max);
    });

    seekBar.addEventListener("change", function() {
      audioPlayer.currentTime = parseFloat(seekBar.value);
      localStorage.setItem(audioSrc, seekBar.value);
    });

    playButton.addEventListener("click", function() {
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

        if (currentVideo && !currentVideo.paused) {
          currentVideo.pause();
        }
      } else {
        audioPlayer.pause();
        localStorage.setItem(audioSrc, audioPlayer.currentTime);
        playButton.innerHTML = "&#9658;";
        playButton.classList.remove("playing");
      }
    });

    audioPlayer.addEventListener("ended", function() {
      playButton.innerHTML = "&#9658;";
      seekBar.value = 0;
      updateSeekBarBackground(seekBar, 0, seekBar.max);
      localStorage.removeItem(audioSrc);

      if (index < musicItems.length - 1) {
        var nextButton = musicItems[index + 1].querySelector(".play-button");
        if (nextButton) nextButton.click();
      }
    });

    audioPlayer.addEventListener('play', function() {
      if (currentVideo && !currentVideo.paused) {
        currentVideo.pause();
      }
    });
  });

  musicItems.forEach(function(item) {
    var playButton = item.querySelector(".play-button");
    playButton.addEventListener("click", function() {
      if (currentVideo) {
        currentVideo.pause();
      }
    });
  });
});





