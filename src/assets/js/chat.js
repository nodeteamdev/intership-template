const socket = io();

const messages = document.querySelector('.chat-history ul');
const formArea = document.querySelector('.chat-message clearfix');
const inputArea = document.querySelector('textarea');
const typing = document.getElementById('typing');
const nameBlock = document.querySelector('.name');

const userName = prompt('Enter your name: ');
nameBlock.innerHTML = `${userName}`;

socket.on('chat message', (data) => {
  const item = document.createElement('li');

  const messageData = document.createElement('div');
  messageData.setAttribute('class', 'message-data');

  const dataName = document.createElement('span');
  dataName.setAttribute('class', 'message-data-name');
  const nameValue = document.createTextNode(`${data.name}`);

  // insert name to span
  dataName.appendChild(nameValue);
  // insert span elements to div
  messageData.appendChild(dataName);

  const dataTime = document.createElement('span');
  dataTime.setAttribute('class', 'message-data-time');
  const timeValue = document.createTextNode(`${new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`);
  // insert time to span
  dataTime.appendChild(timeValue);
  // insert span elements to div
  messageData.appendChild(dataTime);

  // messageData to item li
  item.appendChild(messageData);

  // create element for message
  const messageTag = document.createElement('div');
  messageTag.setAttribute('class', 'message my-message');
  const messageValue = document.createTextNode(`${data.message}`);
  // insert message to element
  messageTag.appendChild(messageValue);

  // insert messageTag to item li
  item.appendChild(messageTag);
  // insert item to chat-history
  messages.appendChild(item);
});

inputArea.addEventListener('change', (e) => {
  e.preventDefault();
  if (e.target.value) {
    socket.emit('chat message', {
      message: e.target.value, name: userName,
    });
    e.target.value = '';
  }
  window.scrollTo(0, document.body.scrollHeight);
});
