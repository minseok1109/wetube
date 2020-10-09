import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const CommentNumber = document.getElementById('jsCommentNumber');

const increaseNumber = () => {
  CommentNumber.innerHTML = parseInt(CommentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: { comment },
  });
  if (response.status === 200) {
    addComment(comment);
  }
  if (response.user.id === null || undefined) {
    alert('댓글을 달려면 로그인하세요');
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = '';
};

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
  init();
}
