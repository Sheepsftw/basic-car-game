import createPlayer from './createPlayer'
import { isDown } from '../utils'

export default function (x, y, game, socket) {
	const player = {
		socket,
		sprite: createPlayer(x, y, game),
		playerName: null,
		speed: 0,
		speedText: null,
		drive (game) {
			const KEYS = {
				W: Phaser.Keyboard.W,
				A: Phaser.Keyboard.A, 
				S: Phaser.Keyboard.S,
				D: Phaser.Keyboard.D
			}
			
			if (this.speed !== 0) {
				this.emitPlayerData()
			}
			
			if (isDown(game, KEYS.W) && this.speed <= 400) {
				this.speed += 10
			} else {
				if(this.speed >= 10) {
					this.speed -= 10
				}
			}
			
			if (isDown(game, KEYS.S) && this.speed >= -200) {
				this.speed -= 5
			} else {
				if (this.speed <= -5) {
					this.speed +=5
				}
			}
			
			if (isDown(game, KEYS.A)) {
				this.sprite.angularVelocity = -5 * (this.speed / 1000)
			} else if (isDown(game, KEYS.D) {
				this.sprite.angularVelocity = 5 * (this.speed / 1000)
			} else {
				this.sprite.body.angularVelocity = 0
			}
			
			this.sprite.velocity.x = this.speed * Math.cos((this.sprite.body.angle - 360) * 0.01745)
			this.sprite.velocity.y = this.speed * Math.sin((this.sprite.body.angle - 360) * 0.01745)
			
			game.world.bringToTop(this.sprite)
			
			this.updatePlayerName()
		},
		emitPlayerData () {
			socket.emit('move-player', {
				x: this.sprite.body.x,
				y: this.sprite.body.y,
				angle: this.sprite.body.rotation,
				playerName: {
					name: this.playerName.text,
					x: this.playerName.x,
					y: this.playerName.y
				},
				speed: {
					value: this.speed,
					x: this.speedText.x,
					y: this.speedText.y
				}
			})
		},
		updatePlayerStatusText () {
			
		}
	}
	return player
}