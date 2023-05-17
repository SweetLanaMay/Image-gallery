import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

function saveCurrentTime() {
  player.getCurrentTime().then(time => {
    localStorage.setItem('videoplayer-current-time', time);
  });
}

function restorePlayback() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}

player.on('timeupdate', throttle(saveCurrentTime, 1000));

restorePlayback();
