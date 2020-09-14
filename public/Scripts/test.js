var config = {
    type: Phaser.AUTO,
    width: screen.width-80,
    height: screen.height-120,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var player1;
var player2;
var cursors;
var missilesOfPlayer1;
var fireInst;
var lastFired=0;
var noOfRad=3.1415926535801/180;

var game = new Phaser.Game(config);
function preload()
{
    this.load.image('map','./assets/space.jpg');
    this.load.image('player1','./assets/player.png');
    this.load.image('missile','./assets/missile.png');
    this.load.image('player2','./assets/enemy.png');
}

function create() {
    //streching background
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'map');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
    //player1

    player1 = this.physics.add.image(400, 300, 'player1').setDepth(1);
    player1.scaleY=.7 
    player1.scaleX=.8
    player1.setDamping(true);
    player1.setDrag(0.99);
    player1.setMaxVelocity(200);
    //enemy testing phase (player2)
    player2 = this.physics.add.image(800, 300, 'player2').setDepth(1);
    player2.scaleY=.4
    player2.scaleX=.7
    player2.setDamping(true);
    player2.setDrag(0.99);
    player2.setMaxVelocity(200);
    player2.angle=-180;
    

    //Missiles
    var Missile = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Missile (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'missile');

            this.speed = Phaser.Math.GetSpeed(400, 1);
            this.scaleX=0.5;
            this.scaleY=0.4;
            this.angle=0;
        },

        fire: function (x, y,z)
        {
            this.setPosition(x, y);
            this.angle=z;
            
            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
            this.y += this.speed * delta*Math.sin(this.angle*noOfRad);
            this.x+=this.speed*delta*Math.cos(this.angle*noOfRad);

            if ((this.y < -50||this.y>screen.height+50)||(this.x<-50||this.x>screen.width+50) )
            {
                this.setActive(false);
                this.setVisible(false);
            }

            
        }

    });
    missilesOfPlayer1 = this.add.group({
        classType: Missile,
        maxSize: 10,
        runChildUpdate: true
    });


    //  Game input for movments
    cursors = this.input.keyboard.createCursorKeys();
    fireInst = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    
    





}
function update(time)

{   //bullet controlling
    if (fireInst.isDown && time > lastFired)
    {
        var missile = missilesOfPlayer1.get();

        if (missile)
        {
            missile.fire(player1.x, player1.y,player1.angle);

            lastFired = time + 60;
        }
    }
    
    
    //player1 controling
    if (cursors.up.isDown)
    {

        this.physics.velocityFromRotation(player1.rotation, 200, player1.body.acceleration);
    
    }
    else
    {
        player1.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        player1.body.angularVelocity = -200;
    }
    else if (cursors.right.isDown)
    {
        player1.body.angularVelocity = 200;
    }
    else
    {
        player1.body.angularVelocity = 0;
    }
    //player not go anywhere than screen
    this.physics.world.wrap(player1, 0);
    
}