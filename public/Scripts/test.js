var config = {
    type: Phaser.AUTO,
    width: screen.width-10,
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
var red,purple,green,yellow,blue,brown;
var game = new Phaser.Game(config);
function preload()
{
    this.load.image('map','./assets/space.jpg');
    this.load.image('player1','./assets/player.png');
    this.load.image('missile','./assets/missile.png');
    this.load.image('player2','./assets/enemy.png');
    this.load.image('red','./assets/red.png');
    this.load.image('blue','./assets/blue.png');
    this.load.image('yellow','./assets/yellow.png');
    this.load.image('green','./assets/green.png');
    this.load.image('purple','./assets/purple.png');
    this.load.image('brown','./assets/brown.png');
}

function create() {
    //streching background
    
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'map');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
    //stones testing 
    red=this.physics.add.image(200,150,'red');
    red.scaleX=1.6
    red.scaleY=1.6
    red.setMaxVelocity(0)

    blue=this.physics.add.image(1025,600,'blue');
    blue.scaleX=1.6
    blue.scaleY=1.6 
    blue.setMaxVelocity(0)
    
    green=this.physics.add.image(1275,350,'green');
    green.scaleY=1.6
    green.scaleX=1.6
    green.setMaxVelocity(0)
    purple=this.physics.add.image(900,200,'purple');
    purple.scaleX=1.6
    purple.scaleY=1.6
    purple.setMaxVelocity(0)

    yellow=this.physics.add.image(300,600,'yellow');
    yellow.scaleY=1.6
    yellow.scaleX=1.6
    yellow.setMaxVelocity(0)
    
    brown=this.physics.add.image(600,350,'brown');
    brown.scaleX=1.6
    brown.scaleY=1.6
    brown.setMaxVelocity(0)
    
    
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
            
        },

        fire: function (x, y,z)
        {
            this.setPosition(x, y);
            this.setAngle(z);
            
            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
            this.y += this.speed * delta*Math.sin(this.angle*noOfRad);
            this.x+=this.speed*delta*Math.cos(this.angle*noOfRad);

            if ((this.y < -50||this.y>screen.height)||(this.x<-50||this.x>screen.width) )
            {
                this.setActive(false);
                this.setVisible(false);
            }
            

            
        }

    });
    missilesOfPlayer1 = this.physics.add.group({
        classType: Missile,
        maxSize: 10,
        runChildUpdate: true
    });
    // collision of player1 and stone
    this.physics.add.collider(player1,red);
    this.physics.add.collider(player1,green);
    this.physics.add.collider(player1,brown);
    this.physics.add.collider(player1,blue);
    this.physics.add.collider(player1,yellow);
    this.physics.add.collider(player1,purple);
    
    
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

            lastFired = time + 50;
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
    //player and stones not go anywhere than screen
    this.physics.world.wrap(player1, 0);

    // collision of bullet and stone
    this.physics.world.collide(red,missilesOfPlayer1,function(m,missile){
        missile.setVisible(false);
        missile.setActive(false);
    });
    this.physics.world.collide(green,missilesOfPlayer1,function(m,missile){
        missile.setVisible(false);
        missile.setActive(false);
    });
    this.physics.world.collide(brown,missilesOfPlayer1,function(m,missile){
        missile.setVisible(false);
        missile.setActive(false);
    });
    this.physics.world.collide(blue,missilesOfPlayer1,function(m,missile){
        missile.setVisible(false);
        missile.setActive(false);
    });
    this.physics.world.collide(yellow,missilesOfPlayer1,function(m,missile){
        missile.setVisible(false);
        missile.setActive(false);
    });
    this.physics.world.collide(purple,missilesOfPlayer1,function(m,missile){
        missile.setVisible(false);
        missile.setActive(false);
    });
    


    
    
    
    
    
}

