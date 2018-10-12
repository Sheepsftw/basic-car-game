import { WORLD_SIZE } from './../../config'

const { width, height } = WORLD_SIZE

const worldCreator = game => {
	game.physics.startSystem(Phaser.Physics.P2JS)
	game.stage.disableVisibilityChange = true
	game.world.setBounds(0, 0, width, height)
	createMap(game)
}

const createMap = game => {
	let groundTiles = []
	for (let i = 0; i <= width / 64 + 1; i++) {
		for (let j = 0; j <= height / 64 + 1; j++) {
			const groundSprite = game.add.sprite(i * 64, j * 64, 'asphalt')
			groundTiles.push(groundSprite)
		}
	}
}

export default worldCreator