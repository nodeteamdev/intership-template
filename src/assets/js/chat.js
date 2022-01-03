const socket = io();

const messages = document.querySelector('.chat-history ul');
const formArea = document.querySelector('.chat-message clearfix');
const inputArea = document.querySelector('textarea');
const typing = document.getElementById('typing');
const nameBlock = document.querySelector('.name');

const userName = prompt('Enter your name: ');
nameBlock.innerHTML = `${userName}`;

inputArea.addEventListener('change', (event) => {
  event.preventDefault();
  console.log(event.target.value);
  if (event.target.value) {
    socket.emit('chat message', {
      message: event.target.value, name: userName,
    });
    event.target.value = '';
  }
});

socket.on('chat message', (data) => {
  const item = document.createElement('li');
  const messageData = item.appendChild(document.createElement('div').setAttribute('class', 'message-data'));
  const msgDataName = messageData.appendChild(document.createElement('span').setAttribute('class', 'message-data-name'));
  msgDataName.textContent = `${data.name}`;

  const msgDataTime = messageData.appendChild(document.createElement('span').setAttribute('class', 'message-data-time'));
  msgDataTime.textContent = `${new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`;

  const messageBody = item.appendChild(document.createElement('div').setAttribute('class', 'message my-message'));
  messageBody.textContent = `${data.message}`;
  messages.appendChild(item);
});
