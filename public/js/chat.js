// make connection
var socket = io.connect('http://192.168.0.104:3000');

// Get saved data from sessionStorage
var storedUsername = sessionStorage.getItem('username');


let btn = document.getElementById('btn');
let messages = document.getElementById('messages');
let username = document.getElementById('username');
let message = document.getElementById('myMessage');

if(storedUsername){
	username.value = storedUsername;	
}
message.addEventListener('keyup', (e)=>{
	
	readyButton()	
	if(e.keyCode == 13){
		e.preventDefault();
		btn.click();
	}
})

btn.addEventListener('click', (e)=>{
	var errors = []
	var theMessage = message.value;
	theMessage.trim()
	theMessage = theMessage.replace(/(\r\n\t|\n|\r\t)/gm,"");
	/*username.parentElement.classList.remove('error')
	message.parentElement.classList.remove('error')*/
	if (username.value ==="" || username.value == undefined) {
		errors.push({"element": username, "error": "no username added"})
	}
	if (theMessage ===""  || theMessage == undefined /*|| theMessage == "-°-"*/) {
		errors.push({"element": message, "error": "no message in textaria"})
		//error
	}
	//theMessage = theMessage.replace(/-°-*/,"<br>")
	if(errors.length == 0){
		socket.emit('chat', {
			message: theMessage,
			handle: username.value
		});
		// Save data to sessionStorage
		sessionStorage.setItem('username', username.value);


		message.value = "";
		readyButton()
		message.focus();
	}else{
		/*for (var i = 0; i < errors.length; i++) {
			var parent = errors[i].element.parentElement;
			parent.classList.add('error');
			parent.innerHTML += errors[i].error; 
		}*/
		console.log(errors);
	}
});


//lsiten on socket events

socket.on('chat', (data)=>{
	if(data.handle == username.value){
		var classes = "me"; 
	}
	messages.innerHTML += '<div class="message '+classes+'"><p class="handle">' + data.handle +'</p><p class="text">' + data.message + '</p></div>';
	messages.scrollTo({"top": 1000000000000, "left": 0, "behavior": "smooth" })
})

function readyButton() {
	if((message.value == "" || message.value == undefined) || (username.value =="" || username.value == undefined)){
		btn.classList.remove("ready");
	}else{
		btn.classList.add("ready");
	}
}