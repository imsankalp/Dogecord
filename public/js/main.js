const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');


//Get username and room from user
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

//Join chat room
socket.emit('joinRoom', {username, room})



//Message from server
socket.on('message', message =>{
    
    outputMessage(message);

    //scroll down every time we get a msg
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Getting msg text
    const msg = e.target.elements.msg.value;

    //Emit message to the server
    socket.emit('chatMessage', msg); 

    //clear the input in text box
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//OUTPUT msg to DOM
function outputMessage(message){
    
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class = "meta">${message.username}<span>${message.time}</span></p>
    <p class = "text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}