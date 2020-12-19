const socket = io('/');
const btn = document.querySelector('.btn');
const text = document.querySelector('#text');
const msgBox = document.querySelector('.msg-box');

socket.on('user',msg=>{

    let today = new Date();
    let date = today.toLocaleDateString("hi-IN");
    let newTime = today.toLocaleTimeString("hi-IN");
    
    addMessage(date, newTime, msg, 'newuser');
})

btn.onclick = function(){
    
    let msg = text.value;
    if(msg.trim()!=""){
    let today = new Date();
    let date = today.toLocaleDateString("hi-IN");
    let newTime = today.toLocaleTimeString("hi-IN");
    
   
    socket.emit('message',date, newTime, msg, myId);

    text.value = "";
    text.focus();
    }

}

text.addEventListener('keyup',function(e){

    if(e.keyCode == 13){
    let msg = text.value;
    if(msg.trim()!=""){
    let today = new Date();
    let date = today.toLocaleDateString("hi-IN");
    let newTime = today.toLocaleTimeString("hi-IN");
    
   
    socket.emit('message',date, newTime, msg, myId);

    text.value = "";
    text.focus();
    }
}
})

socket.on('newMessage',(date, time, msg,userId)=>{
    addMessage(date,time, msg, userId);

})
const addMessage = (date, time, msg, userId)=>{
    var dateDiv = document.createElement('div');
    var dateSpan = document.createElement('span');
    var timeSpan = document.createElement('span');
    var msgDiv = document.createElement('div');
    var msgP = document.createElement('p');
    var mainDiv = document.createElement('div');

    if(userId === myId || userId == 'newuser')
    mainDiv.style.float = "left";
    else
    mainDiv.style.float = "right";
    mainDiv.style.clear="both"
    dateSpan.innerText = date;
    timeSpan.innerText = time;
    msgP.innerText = msg;
    msgDiv.appendChild(msgP);
    dateDiv.appendChild(dateSpan);
    dateDiv.appendChild(timeSpan);
    mainDiv.appendChild(dateDiv);
    mainDiv.appendChild(msgDiv);

    // classes
    dateSpan.className="date";
    timeSpan.className="time";
    dateDiv.className="dateDiv";
    dateDiv.className="dateDiv";
    //styles 
    // dateDiv.style.margin="10px 0"
    // mainDiv.style.display="flex";
    // mainDiv.style.flexDirection="column";
    // mainDiv.style.margin="10px"
    // mainDiv.style.padding="15px"
    // mainDiv.style.maxWidth="60%"
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