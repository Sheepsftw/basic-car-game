'use strict'
const http = require('http')
const app = require('./config')
const Server = http.Server(app)
const PORT = process.env.PORT || 8000
const io = require('socket.io')(Server)

Server.listen(PORT, () => console.log('Game server running on: ', PORT))

const players = {}

io.on('connection', socket => {
	socket.on('new-player', state => {
		console.log('New player joined with state: ', state)
		players[socket.id] = state
		io.emit('update-players', players)
	})
	
	socket.on('disconnect', state => {
		delete players[socket.id]
		io.emit('update-players', players)
	})
	
	socket.on('move-player', data => {
		const { x, y, angle, playerName, speed } = data
		
		if (players[socket.id] === undefined) {
			return
		}
		
		players[socket.id].x = x
		players[socket.id].y = y
		players[socket.id].angle = angle
		players[socket.id].playerName = {
			name: playerName.name,
			x: playerName.x,
			y: playerName.y
		}
		players[socket.id].speed = {
			value: speed.value,
			x: speed.x,
			y: speed.y
		}
		
		io.emit('update-players', players)
	})
}