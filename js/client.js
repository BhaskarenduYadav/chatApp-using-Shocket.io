const socket=io('http://localhost:8000');

// Get DOM elements in respective JS variables
const form = document.getElementById("send-container");
const messageInput=document.getElementById("messageInp");
const messageContainer=document.querySelector(".container");

// Audio will play on receiving message
// var audio=new Audio("ting.mp3");


// Function which will append event to the container
const append=(message,position)=>{
    const messageElement=document.createElement("div");
    messageElement.innerText=message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=="left"){
        //audio.play();
    }
};


// if the form get submitted , send  the server the message
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,"right");
    socket.emit("send",message);
    messageInput.value="";
});

// Ask new user for his name and let the other users know
const name = prompt("Enter your name");
socket.emit("new-user-joined",name);


// if a new user joins , receive his name from the server
socket.on("user-joined",name=>{
    append(`${name} joined the chat`,"right");
});

// if server sends the message ,receive it
socket.on("receive",data=>{
    append(`${data.name}:${data.message}`,"left");
});

//if a user leaves the chat,append the info to the container
socket.on("left",name=>{
    append(`${name} left the chat`,"right")
});