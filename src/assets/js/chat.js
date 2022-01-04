/**
 * Elements and imports
 */

const socket = io();
const messages = document.querySelector('.chat-history ul');
const formArea = document.querySelector('.chat-message clearfix');
const inputArea = document.querySelector('textarea');
const connectedList = document.getElementById('list');
const typing = document.getElementById('typing');
const nameBlock = document.querySelector('.name');

const userFields = {
  firstName: '{{ firstName }}',
  lastName: '{{ lastName }}',
  email: '{{ email }}',
  picture: '{{ picture }}',
  id: '{{ id }}',
};
nameBlock.innerTextNode = userFields;

/**
 * Functions
 */

const appendUser = (userData) => {
  const connectedUser = document.createElement('li');
  connectedUser.setAttribute('class', 'clearfix');

  const imgData = document.createElement('img');
  imgData.setAttribute('src', 'http://localhost:3000/src/assets/cyber-security-icon.jpg');

  connectedUser.appendChild(imgData);

  const nameData = document.createElement('div');
  nameData.setAttribute('class', 'about');

  const tagNameValue = document.createElement('div');
  tagNameValue.setAttribute('class', 'name');

  nameData.appendChild(tagNameValue);
  connectedUser.appendChild(nameData);

  connectedList.appendChild(connectedUser);
};

const appendMessage = (message, sender) => { // if sender is true, he is own who wrote the message
  const item = document.createElement('li');

  const messageData = document.createElement('div');
  messageData.setAttribute('class', 'message-data');

  const dataName = document.createElement('span');
  dataName.setAttribute('class', 'message-data-name');
  const nameValue = document.createTextNode(`${sender}`);

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
  const messageValue = document.createTextNode(`${message}`);
  // insert message to element
  messageTag.appendChild(messageValue);

  // insert messageTag to item li
  item.appendChild(messageTag);
  // insert item to chat-history
  messages.appendChild(item);
};

/**
 * Receiving and sending information from the server
 */
socket.on('users-list', (users) => {
  while (connectedList.firstChild) {
    connectedList.firstChild.remove();
  }
  users.forEach((user) => {
    appendUser(user);
  });
});

socket.on('chat-message', (data) => {
  appendMessage(data.message, data.name);
});

/**
 * Event listeners
 */

inputArea.addEventListener('change', (e) => {
  e.preventDefault();
  if (e.target.value) {
    socket.emit('chat-message', {
      message: e.target.value, name: userName,
    });
    e.target.value = '';
  }
  window.scrollTo(0, document.body.scrollHeight);
});
