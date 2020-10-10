import axios from 'axios';

const video = document.querySelector('video');

const registerView = () => {
  const videoId = window.location.href.split('/videos/')[1];
  axios.post(`/api/${videoId}/view`);
};

function init() {
  video.addEventListener('ended', registerView);
}

if (video) {
  init();
}
