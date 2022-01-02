const socket = io();

const messages = document.getElementsByClassName('chat-history')[0];
const form = document.getElementsByClassName('chat-message');
const textarea = document.getElementById('message-to-send')[0];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (textarea.value) {
    socket.emit('chat message', textarea.value);
    textarea.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// <li class="clearfix">
// <div class="message-data align-right">
//     <span class="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
//     <span class="message-data-name">Olia</span>
// </div>
// <div class="message other-message float-right">
//     Hi Vincent, how are you? How is the project coming along?
// </div>
// </li>
