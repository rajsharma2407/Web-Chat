const socket = io('/');
const btn = document.querySelector('.btn');
const text = document.querySelector('#text');
const msgBox = document.querySelector('.msg-box');
const body = document.getElementById("body");
var names;
// window.open();
(function(){
    var name = [];
    const PREFIX = 'names';
     names = localStorage.getItem(PREFIX);
     console.log(names)
    if(names === null ){
         names = prompt('Enter Your Name');
        localStorage.setItem('names',names);
    }
})();
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

    if(userId !== myId || userId == 'newuser'){
        mainDiv.style.float = "left";
        mainDiv.style.background="royalblue"
        mainDiv.style.color="white";
    }
    else{
        mainDiv.style.float = "right";
        mainDiv.style.border="1px solid lightgray"
    }
    mainDiv.style.clear="both"
    mainDiv.style.padding="0 5px";
    mainDiv.style.borderRadius="5px";

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
    dateDiv.className="dateDiv small";
    mainDiv.className="mainDiv";
    //styles 
    nameSpan.style.padding="0 5px 0 0 "
    msgP.style.wordBreak="break-all"
    msgP.style.padding="3px"
    msgP.style.fontSize="1rem"
    msgP.style.margin="0"
    mainDiv.style.maxWidth="60%"
    mainDiv.style.minWidth="20%"
    mainDiv.style.margin="0.5rem 0"
    dateDiv.style.display="flex";
    dateDiv.style.justifyContent="space-between";
    msgBox.appendChild(mainDiv);
    msgBox.scrollTop = msgBox.scrollHeight;
    }
    