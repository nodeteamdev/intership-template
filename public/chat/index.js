const peopleList = document.getElementById('people-list');
const messagesList = document.getElementById('chatHistory');
const sendButton = document.getElementById('sendButton');
const messageToSend = document.getElementById('message-to-send');
const inputNotification = document.getElementById('typing');

const user = {
    _id: '62ece4fcf235253589e4315a',
    fullName: 'Serhey Yay',

};
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmVjZTRmY2YyMzUyNTM1ODllNDMxNWEiLCJpYXQiOjE2NTk3MjQ5MzksImV4cCI6MTY1OTcyODUzOX0.NXcHknOBhAcWXAaGX8I6Qpp5pF_dHsZBubGWZ80Fimk';
const socket = io('/', {
    auth: {
        token,
    },
});

socket.on('connect', () => {
    getMessages();
    getChatUsers();
});

socket.on('new-message', ({ data }) => {
    appendNewMessage(data.message, data.user);
});

socket.on('typing', (data) => {
    // console.log('user :>> ', data); // user that type text
    inputNotification.innerHTML = `<p class="typing-text"><em> ${data} typing message</em></p>`;
    setTimeout(() => {
        inputNotification.innerHTML = '';
    }, 2000);
});

socket.on('new-online', (userNew) => {
    if (userNew._id === user._id) return;

    const item = document.getElementById(userNew._id);

    if (item) {
        const img = item.querySelector('IMG');
        img.classList.remove('offline');
        img.classList.add('online');
        const lastOnline = item.querySelector('.last-online');
        lastOnline.remove();
        return;
    }
    appendNewUser(userNew);
});

socket.on('new-offline', (oldUser) => {
    if (oldUser._id === user._id) return;

    const item = document.getElementById(oldUser._id);

    if (item) {
        const img = item.querySelector('IMG');
        img.classList.remove('online');
        img.classList.add('offline');
        const lastOnline = document.createElement('div');
        lastOnline.classList.add('last-online');
        lastOnline.append(`Last online: ${new Date(oldUser.onlineAt).toLocaleString()}`);
        item.append(lastOnline);
    }
});

sendButton.addEventListener('click', (event) => {
    if (messageToSend.value.trim().length !== 0) {
        createMessage(messageToSend.value.trim());// createMessage(messageToSend.value)
        messageToSend.value = '';
    }
});

messageToSend.addEventListener('input', (event) => { // ивент ввода.
    socket.emit('typing', user.fullName);
});

function createMessage(message) { // функция создания сообщения
    socket.emit('post-message', { message, user }, ({ data }) => {
    });
}

function getChatUsers() { // функция получить пользователей чата
    socket.emit('get-chat-users', { skip: 0, limit: 10 }, ({ data }) => {
        const { allUsers } = data;
        allUsers.forEach((oneUser) => appendNewUser(oneUser));
    });
}

function getMessages() { // функция получать сообщения
    socket.emit('get-messages', { skip: 0, limit: 10 }, ({ data }) => {
        data.lastMessages.forEach((message) => {
            if (message.userId === user._id) {
                return appendNewMessage(message, {
                    _id: message.userId, fullName: message.fullName,
                });
            }
            appendMessage(message, { _id: message.userId, fullName: message.fullName });
        });
    });
}

function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div.firstChild;
}

const listUsersItemTemp = (sender) => `<li class="clearfix" id="${sender._id}"">
                <img src="https://i.pravatar.cc/55" alt="avatar" width="55" height="55" class="avatar ${sender.isOnline ? 'online' : 'offline'}"  />
                <div class="about">
                    <div class="name">${sender.fullName}</div>
                    ${!sender.isOnline && ` <div class="last-online">Last online: ${new Date(sender.onlineAt).toLocaleString()}</div>`}  
                </div>
            </li>`;

function appendNewUser(user) {
    peopleList.appendChild(createElementFromHTML(listUsersItemTemp(user)));
}

const listOfOtherMessageItemTemp = (message, sender) => `<li id="${message._id}">
                    <div class="message-data">
                        <span class="message-data-name" id="${sender._id}">${sender.fullName}</span>
                        <span class="message-data-time">${new Date(message.createdAt).toLocaleString()}</span>
                    </div>
                    <div class="message my-message">
                        ${message.body}
                    </div>
                </li>`;

const listMessageItemTemp = (message, sender) => `<li class="clearfix" id="${message._id}"">
                    <div class="message-data align-right">
                        <span class="message-data-time">${new Date(message.createdAt).toLocaleString()}</span> &nbsp; &nbsp;
                        <span class="message-data-name" id="${sender._id}">${sender._id === user._id ? 'Me' : sender.fullName}</span>

                    </div>
                    <div class="message other-message float-right">
                        ${message.body}
                    </div>
                </li>`;

function appendNewMessage(message, sender) {
    messagesList.appendChild(createElementFromHTML(listMessageItemTemp(message, sender)));
}

function appendMessage(message, sender) {
    messagesList.appendChild(createElementFromHTML(listOfOtherMessageItemTemp(message, sender)));
}
