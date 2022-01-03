const socket = io();
let count = 0;
let email;

const connectedList = document.getElementById('people-list').getElementsByClassName('list');
const messageContainer = document.querySelector('div.chat-history ul');
const typing = document.getElementById('typing');
const sendArea = document.querySelector('div.chat-message clearfix');
const textArea = sendArea.getElementById('message-to-send');

// Functions
function appendUser(username) {
  const connectedUser = document.createElement('li');
  connectedUser.innerHTML = username;
  connectedList.appendChild(connectedUser);
}

function appendMessage(message, sender) { // if sender is true, he is own who wrote the message
  const messageElement = document.createElement('li');
  const messageData = messageElement.appendChild(document.createElement('div').setAttribute('class', 'message-data'));
  const messageTime = messageData.appendChild(document.createElement('span').setAttribute('class', 'message-data-time'));
  messageTime.textContent = `${new Date().getHours()}:${new Date().getMinutes()}`;
  const messageOwner = messageData.appendChild(document.createElement('span').setAttribute('message-data-name'));
  if (sender === true) {
    messageOwner.textContent = `${sender.firstName} ${sender.lastName}`;
  }

  messageElement.appendChild(document.createElement('div').setAttribute('class', 'message my-message').textContent = `${message}`);
  messageContainer.appendChild(messageElement);
}

function antFlood() {
  count += 1;
  if (count > 0) {
    setTimeout(() => { count -= 1; }, 5000);
  }
}

// Receiving and sending information from the server

socket.on('users-list', (users) => {
  while (connectedList.firstChild) {
    connectedList.firstChild.remove();
  }
  users.forEach((user) => {
    appendUser(user);
  });
});

socket.on('new-user-message', (username) => {
  appendMessage(`<b>${username}</b> entered to the chat!`);
});

socket.on('disconnect-message', (username) => {
  appendMessage(`<b>${username}</b> disconnected from the chat.`);
});

socket.on('reload', () => {
  window.location.reload();
});

socket.on('user-typing', (user) => {
  typing.innerHTML = `<b>${user}</b> is typing...`;
  setTimeout(() => { typing.innerHTML = ''; }, 1000);
});

socket.on('chat-message', (data) => {
  appendMessage(`<b>${data.name}:</b> ${data.message}`);
});

// Event listeners
socket.addEventListener('open', (event) => { // Connect
  console.log('Message from server', event.data);
  socket.emit('new-user', event.data.email);
  const getName = document.getElementById('get-name');
  getName.remove();
  socket.emit('new-user', event.data.email);
  appendMessage(`<b>${event.data.email}</b> entered to the chat!`, true);
});

sendArea.addEventListener('input', (e) => { // Send message submit
  e.preventDefault();
  const message = textArea.value;
  if (message.length !== 0) {
    if (count < 3) {
      socket.emit('send-chat-message', message);
      textArea.value = '';
      textArea.focus();
      appendMessage(`<b>${user.firstName}:</b> ${message}`, true);
      antFlood();
    }
  }
});

textArea.addEventListener('onchange', () => { // When someone writes something is triggered
  socket.emit('user-typing', email);
});
