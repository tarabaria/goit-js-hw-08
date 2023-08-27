import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const localStorageKey = 'videoplayer-current-time';

// Функція для збереження часу відтворення
const saveCurrentTime = throttle(() => {
  player.getCurrentTime().then(currentTime => {
    localStorage.setItem(localStorageKey, currentTime);
  });
}, 1000); // Оновлення не частіше, ніж раз на секунду

// Відстежування події timeupdate
player.on('timeupdate', saveCurrentTime);

// Отримання збереженого часу відтворення при завантаженні сторінки
const savedTime = localStorage.getItem(localStorageKey);

if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime));
}
