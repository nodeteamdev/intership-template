const socket = io();
const chatHistory = document.getElementById('chat-history');
const messages = document.getElementById('messages');
const peopleList = document.getElementById('people-list');
const button = document.getElementById('button');
const textarea = document.getElementById('message-to-send');
const typingDiv = document.getElementById('typing');
const messageNum = document.getElementById('num-messages');
const currentTime = +new Date().toLocaleTimeString();

const newMessage = (data) => `<li class="clearfix">
                    <div class="message-data ${data.fullName !== variables.userName ? '' : 'align-right'}">
                        ${data.fullName !== variables.userName ? `
                        <span class="message-data-name">${data.name}</span>
                        <span class="message-data-time">${data.time}, Today</span> &nbsp; &nbsp;` : `
                        <span class="message-data-time">${data.time}, Today</span> &nbsp; &nbsp;
                        <span class="message-data-name">${data.name}</span>`}
                    </div>
                    <div class="message ${data.name !== variables.userName ? 'my-message' : 'other-message float-right'}">
                        ${data.message}
                    </div>
                </li>`;
const bar = (user, time) => `<li class="clearfix">
                <img src="${user.socketId !== null ? '/images/user_online.png' : '/images/user_offline.png'}" alt="avatar" />
                <div class="about">
                    ${user.socketId !== null ? `
                    <div class="name">${user.fullName}</div> <div class="offline-time"> Online </div>` : `
                    <div class="name">${user.fullName}</div> <div class="offline-time"> Last seen ${time}</div>`}
                </div>
            </li>`;

const num = (count) => `<div class="chat-num-messages" id="num-messages">already ${count} messages</div>`;

socket.emit('new::user', variables.id);

button.addEventListener('click', (event) => {
    event.preventDefault();

    const msg = textarea.value;

    textarea.value = '';

    socket.emit('send::mess', { message: msg, time: currentTime });
});
textarea.addEventListener('keydown', (event) => {
    if (event.code) {
        socket.emit('user::typing', { name: variables.userName });
    }
});
socket.on('add::mess', (data) => {
    messageNum.innerHTML = num(data.count);
    messages.innerHTML += newMessage(data);
    chatHistory.scrollTop = chatHistory.scrollHeight;
});
socket.on('bot::mess', (data) => {
    messages.innerHTML += newMessage(data);
    chatHistory.scrollTop = chatHistory.scrollHeight;
});

socket.on('message::history', (data) => {
    messageNum.innerHTML = num(data.count);
    data.messages.forEach((message) => {
        messages.innerHTML += newMessage(message);
    });
    chatHistory.scrollTop = chatHistory.scrollHeight;
});

socket.on('add::user', (data) => {
    peopleList.innerHTML = '';
    data.users.forEach((user) => {
        const now = data.time;
        const offline = user.offlineTime;
        const difference = now - offline;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const secRes = Math.round(difference / second);
        const minRes = Math.round(difference / minute);
        const hRes = Math.round(difference / hour);
        const dRes = Math.round(difference / day);

        let time;

        if (secRes >= 1 && secRes <= 59) {
            time = `${secRes} seconds ago...`;
        }
        if (minRes >= 1 && minRes <= 59) {
            time = `${minRes} minutes ago...`;
        }
        if (hRes >= 1 && hRes <= 24) {
            time = `${hRes} hours ago...`;
        }
        if (dRes >= 1) {
            time = `${dRes} days ago...`;
        }
        peopleList.innerHTML += bar(user, time);
    });
});

socket.on('user::typing', (data) => {
    typingDiv.textContent = `${data.fullName} is typing...`;
    setTimeout(() => { typingDiv.textContent = ''; }, 3000);
});
