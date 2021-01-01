const dropdown = document.querySelector('.dropDown');
const dropdownContent = document.querySelector('.dropdown-content');

const dropMenu = () => {
  dropdownContent.classList.toggle('show');
};

const init = () => {
  dropdown.addEventListener('click', dropMenu);
};

if (dropdown) {
  console.log(dropdown);
  init();
}
