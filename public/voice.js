const socket = io('/')
const mainVideoGrid = document.querySelector('.main-video-grid');
const userVideoGrid = document.querySelector('.user-video-grid');
const myVideo = document.createElement('video');
myVideo.className="myVideo";
myVideo.classList.className="myVideos"
myVideo.muted = true;

var peers={};
var peer = new Peer();
var peerId;

peer.on('open',id=>{
	peerId = id;
	socket.emit('join-room',1000,id);
})

  let myVideoStream;
  navigator.mediaDevices
	.getUserMedia({
	  video: false,
	  audio: true,
	})
	.then((stream) => {
	  myVideoStream = stream;
	  addVideoStream(myVideo, stream);
  
		peer.on('call',call=>{
			call.answer(stream);
			const video = document.createElement('video');
			call.on('stream',userVideo=>{
				addVideoStream(video, userVideo);
			})
			
			call.on('close',()=>{
				video.remove();
			})
		})
		
	  socket.on("user-connected", (userId) => {
		connectToNewUser(userId, stream);
	  });
	  	
	  socket.on("user-disconnected", (userId) => {
		if(peers[userId]) peers[userId].close()
	  });
	});
  
  const connectToNewUser = (userId, stream) => {
	  console.log(userId)
	 const call = peer.call(userId, stream);
	  const video = document.createElement('video');
	  call.on('stream',userVideo=>{
		  addVideoStream(video, userVideo);
	  })
	  call.on('close',()=>{
		video.remove();
	})
	peers[userId] = call;
	  }
  
  const addVideoStream = (video, stream) => {
	// console.log(video,stream)
	video.srcObject = stream;
	video.addEventListener("loadedmetadata", () => {
	  video.play();
	});
	if(video.classList.contains('myVideo'))
		userVideoGrid.appendChild(video)
	else{
	video.className="userVideo";
	mainVideoGrid.append(video);
	}
  };

const close = document.querySelector('.close');
close.onclick = function(){
	socket.emit('dis-connect');
}