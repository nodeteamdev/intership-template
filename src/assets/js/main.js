const socket = io();

const username = prompt('Welcome! Please enter your name:');

socket.emit('new-connection', { username });

socket.on('welcome-message', (data) => {
  console.log('received welcome-message >>', data);
});
