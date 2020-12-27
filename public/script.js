const socket = io('/');
const btn = document.querySelector('.btn');
const text = document.querySelector('#text');
const msgBox = document.querySelector('.msg-box');
var names = prompt('Enter Your Name');
socket.emit('newuser',names);
(function(){
    
    let today = new Date();
    let date = today.toLocaleDateString("hi-IN");
    var span = document.createElement('div');
    span.innerHTML = date;
    span.style.textAlign="center"
    // span.style.padding="10px 20px";
    // span.style.borderRadius = "6px";
    msgBox.appendChild(span);
})();

socket.on('user',(msg, name)=>{

    let today = new Date();
    let newTime = today.toLocaleTimeString("hi-IN");
    
    addMessage(newTime, msg, 'newuser', name);
})

btn.onclick = function(){
    
    let msg = text.value;
    if(msg.trim()!=""){
    let today = new Date();
    let newTime = today.toLocaleTimeString("hi-IN");
    
   
    socket.emit('message',newTime, msg, myId, names);

    text.value = "";
    text.focus();
    }

}

text.addEventListener('keyup',function(e){

    if(e.keyCode == 13){
    let msg = text.value;
    if(msg.trim()!=""){
    let today = new Date();
    let newTime = today.toLocaleTimeString("hi-IN");
    
   
    socket.emit('message',newTime, msg, myId, names);

    text.value = "";
    text.focus();
    }
}
})

socket.on('newMessage',( time, msg,userId, names)=>{
    addMessage(time, msg, userId, names);

})
const addMessage = (time, msg, userId,names)=>{
    if(names == '' )
        names = 'Guest';
    var dateDiv = document.createElement('div');
    var timeSpan = document.createElement('span');
    var msgDiv = document.createElement('div');
    var msgP = document.createElement('p');
    var mainDiv = document.createElement('div');
    var nameSpan= document.createElement('span');

    if(userId !== myId || userId == 'newuser')
    mainDiv.style.float = "left";
    else
    mainDiv.style.float = "right";
    mainDiv.style.clear="both"

    nameSpan.innerText = names;
    timeSpan.innerText = time;
    msgP.innerText = msg;
    msgDiv.appendChild(msgP);
    dateDiv.appendChild(nameSpan);
    dateDiv.appendChild(timeSpan);
    mainDiv.appendChild(dateDiv);
    mainDiv.appendChild(msgDiv);

    // classes
    timeSpan.className="time";
    dateDiv.className="dateDiv";
    mainDiv.className="mainDiv";
    //styles 
    nameSpan.style.padding="0 5px 0 0 "
    msgP.style.wordBreak="break-all"
    msgP.style.padding="3px"
    msgP.style.fontSize="1rem"
    mainDiv.style.maxWidth="60%"
    mainDiv.style.minWidth="20%"
    dateDiv.display="flex";
    dateDiv.justifyContent="space-between";
    // dateDiv.style.margin="10px 0"
    // mainDiv.style.display="flex";
    // mainDiv.style.flexDirection="column";
    // mainDiv.style.margin="10px"
    // mainDiv.style.padding="15px"
    // mainDiv.style.background="white";
    // mainDiv.style.borderRadius="18px";
    // dateDiv.style.display="flex";
    // dateDiv.style.justifyContent="space-between";


    msgBox.appendChild(mainDiv);
    msgBox.scrollTop = msgBox.scrollHeight;
}
const addNav = document.querySelector('.add');
const Nav = document.querySelector('.nav');

addNav.onclick = function(){    
    Nav.classList.toggle('visible');

}