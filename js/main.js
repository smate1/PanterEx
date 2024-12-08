document.addEventListener('DOMContentLoaded', () => {
  // Функція для ініціалізації випадаючого списку
  const initializeDropdown = (select) => {
    const selectHeader = select.querySelector('.select__header');
    const selectCurrent = select.querySelector('.select__current');
    const selectList = select.querySelector('.select__list');
    let selectItems = select.querySelectorAll('.select__item');

    if (selectItems.length > 0) {
      const firstItem = selectItems[0];
      selectCurrent.textContent = firstItem.textContent;
      selectCurrent.dataset.value = firstItem.dataset.value || firstItem.textContent;
      firstItem.remove();
      selectItems = select.querySelectorAll('.select__item');
    }

    const handleItemClick = (item) => {
      const selectedLang = item.dataset.value || item.textContent.toLowerCase();
      const previousText = selectCurrent.textContent;

      selectCurrent.textContent = item.textContent;
      selectCurrent.dataset.value = selectedLang;

      // Оновлення класів для мови
      document.documentElement.classList.remove('lang-ru', 'lang-en');
      if (['тайланд', 'китай'].includes(selectedLang)) {
        document.documentElement.classList.add('lang-ru');
      } else {
        document.documentElement.classList.add('lang-en');
      }

      // Додавання попереднього вибору
      if (previousText) {
        const newItem = document.createElement('div');
        newItem.classList.add('select__item', 'language-specific');
        newItem.textContent = previousText;
        newItem.dataset.value = previousText;
        newItem.addEventListener('click', () => handleItemClick(newItem));
        selectList.appendChild(newItem);
      }

      item.remove();
      select.classList.remove('is-active');
    };

    selectItems.forEach((item) => {
      item.addEventListener('click', () => handleItemClick(item));
    });

    selectHeader.addEventListener('click', (event) => {
      event.stopPropagation();
      const isActive = select.classList.contains('is-active');

      document.querySelectorAll('.select').forEach((otherSelect) => {
        otherSelect.classList.remove('is-active');
      });

      select.classList.toggle('is-active', !isActive);
    });
  };

  // Ініціалізація всіх випадаючих списків
  const selects = document.querySelectorAll('.select');
  selects.forEach((select) => initializeDropdown(select));

  // Закриття списків при кліку поза ними
  document.addEventListener('click', () => {
    document.querySelectorAll('.select').forEach((select) => {
      select.classList.remove('is-active');
    });
  });

  // Робота з відео
  const videoData = {
    alina: './images/alina.mp4',
    ekaterina: './images/ekaterina.mp4',
    denis: './images/denis.mp4',
    natalia: './images/natalia.mp4',
  };

  const modal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoSource = document.getElementById('videoSource');
  const closeModal = document.getElementById('closeModal');
  const playPause = document.getElementById('playPause');
  const progressBar = document.getElementById('progressBar');
  const currentTime = document.getElementById('currentTime');
  const duration = document.getElementById('duration');
  const muteToggle = document.getElementById('muteToggle');
  const fullScreen = document.getElementById('fullScreen');

  document.querySelectorAll('.reviews__item-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const videoId = button.id;
      if (videoData[videoId]) {
        videoSource.src = videoData[videoId];
        videoPlayer.style.display = 'block';
        videoPlayer.load();
        modal.style.display = 'flex';
      }
    });
  });

  closeModal?.addEventListener('click', () => {
    modal.style.display = 'none';
    videoPlayer.pause();
  });

  modal?.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      videoPlayer.pause();
    }
  });

  playPause?.addEventListener('click', () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playPause.textContent = '||';
    } else {
      videoPlayer.pause();
      playPause.textContent = '▶';
    }
  });

  videoPlayer?.addEventListener('timeupdate', () => {
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.value = progress || 0;
    currentTime.textContent = formatTime(videoPlayer.currentTime);
    duration.textContent = formatTime(videoPlayer.duration);
  });

  progressBar?.addEventListener('input', () => {
    const time = (progressBar.value / 100) * videoPlayer.duration;
    videoPlayer.currentTime = time;
  });

  muteToggle?.addEventListener('click', () => {
    videoPlayer.muted = !videoPlayer.muted;
    muteToggle.textContent = videoPlayer.muted ? '🔇' : '🔊';
  });

  fullScreen?.addEventListener('click', () => {
    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
      videoPlayer.webkitRequestFullscreen();
    }
  });

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Анімація числа
  function getBaseNumber() {
    const lastUpdate = localStorage.getItem('lastUpdate');
    const savedNumber = parseInt(localStorage.getItem('number') || '7850', 10);

    const today = new Date().toISOString().split('T')[0];
    if (lastUpdate !== today) {
      const daysPassed =
        Math.floor((new Date() - new Date(lastUpdate || today)) / (1000 * 60 * 60 * 24)) || 1;
      const updatedNumber = savedNumber + daysPassed * 15;

      localStorage.setItem('lastUpdate', today);
      localStorage.setItem('number', updatedNumber);

      return updatedNumber;
    }

    return savedNumber;
  }

  function animateNumber(targetNumber, duration) {
    const startTime = performance.now();
    const startNumber = 0;

    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * progress);

      document.getElementById('number').textContent = currentNumber;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        document.getElementById('number').textContent = targetNumber;
      }
    }

    requestAnimationFrame(updateNumber);
  }
});
