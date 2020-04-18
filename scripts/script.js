let button = document.getElementById('send-button');
let messageInput = document.getElementById('message1');
let messagesList = document.getElementById('messages-list');
let sendForm = document.getElementById('send-form');

sendForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(sendForm);
    var now = new Date();
    let message = {
        'date': now.toLocaleString(),
        'username': formData.get('username'),
        'message': formData.get('message')
    }
    messageInput.value = '';
    addNewMessage(message);
    displayMessages();
});
function displayMessages() {
    let messages = getAllMessages();
    if (messages.length > 0) messagesList.innerHTML = '';
    else messagesList.innerHTML = 'В чате пока что сообщений нет :)';

    messages.forEach(el => {
        let messageElement = document.createElement('p');
        messageElement.innerText = `[${el.date}] ${el.username} : ${el.message}`;
        messagesList.appendChild(messageElement);
    });
}
function getAllMessages() {
    return JSON.parse(localStorage.getItem('messages')) || [];
}
function addNewMessage(message) {
    let messages = getAllMessages();
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

displayMessages();