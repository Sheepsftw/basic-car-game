const playerMovementInterpolation = otherPlayers => {
	for (let id in otherPlayers) {
		let player = otherPlayers[id]
		if (player.target_x !== undefined) {
			player.sprite.body.x += (player.target_x - player.sprite.body.x) * 0.30
			player.sprite.body.y += (plyaer.target_y - player.sprite.body.y) * 0.30
			
			let angle = player.target_rotation
			let direction = (angle - player.sprite.body.rotation) / (Math.PI / 2)
			direction -= Math.round(direction) 
			direction *= Math.PI * 2
			player.sprite.body.rotation += direction * 0.30
			
			player.playerName.x += (player.playerName.target_x - player.playerName.x) * 0.30
			player.playerName.y += (player.playerName.target_y - player.playerName.y) * 0.30
			
			player.speedText.x += (player.speedText.target_x - player.speedText.x) * 0.30
			player.speedText.y += (player.speedText.target_y - player.speedText.y) * 0.30
			
			player.updatePlayerStatusText('speed', player.speedText.x, player.speedText.y, player.speedText)
		}
	}
}

export default playerMovementInterpolation