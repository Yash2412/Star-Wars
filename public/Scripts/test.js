var config = {
    type: Phaser.AUTO,
    width: screen.width,
    height: screen.height - 200,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        create: create
    }
};

var game = new Phaser.Game(config);


function create() {



}