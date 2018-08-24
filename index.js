const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const app = express()

const helmet = require('helmet')
app.use(helmet());

app.use(express.static('public'))


const server = http.Server(app);
server.listen(3000);

const io = socketIo(server);



io.on('connection', (socket)=>{
	console.log('message sent');
	console.log(socket);

	socket.on('chat',(data)=>{
		io.sockets.emit('chat', data);
		console.log(data.message);
	})
	
})