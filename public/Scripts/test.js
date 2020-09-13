var config = {
    type: Phaser.AUTO,
    width: screen.width-100,
    height: screen.height-120,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
function preload()
{
    this.load.image('background','./assets/space.jpg');
}

function create() {
    this.add.image(0,0,'background');
}
function update()
{
    
}