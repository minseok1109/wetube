const headerImage = document.getElementById('header_avatar');
const dropdownContent = document.querySelector('.dropdown-content');

const dropMenu = () => {
  dropdownContent.classList.toggle('show');
};

const init = () => {
  headerImage.addEventListener('click', dropMenu);
};

if (headerImage) {
  init();
}
