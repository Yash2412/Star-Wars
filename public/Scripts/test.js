var config = {
    type: Phaser.AUTO,
    width: screen.width - 10,
    height: screen.height - 120,
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
var lastFired = 0;
var noOfRad = 3.1415926535801 / 180;
var red,blue,yellow,green,purple,brown;

var game = new Phaser.Game(config);
function preload() {
    this.load.image('map', './assets/space.jpg');
    this.load.image('player1', './assets/player.png');
    this.load.image('missile', './assets/missile.png');
    this.load.image('player2', './assets/enemy.png');
    this.load.image('red', './assets/red.png');
    this.load.image('blue', './assets/blue.png');
    this.load.image('yellow', './assets/yellow.png');
    this.load.image('green', './assets/green.png');
    this.load.image('purple', './assets/purple.png');
    this.load.image('brown', './assets/brown.png');
}

/*
function create() {
    //streching background
    socket.emit('set-p1')
    socket.on('set-p1', () => {
        // player1 = this.physics.add.image(400, 300, 'player1').setDepth(1);
    })
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'map');
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
    //stones testing 
    red = this.physics.add.image(200, 150, 'red');
    red.scaleX = 1.6
    red.scaleY = 1.6
    red.setMaxVelocity(0)

    blue = this.physics.add.image(1025, 600, 'blue');
    blue.scaleX = 1.6
    blue.scaleY = 1.6
    blue.setMaxVelocity(0)

    green = this.physics.add.image(1275, 350, 'green');
    green.scaleY = 1.6
    green.scaleX = 1.6
    green.setMaxVelocity(0)
    purple = this.physics.add.image(900, 200, 'purple');
    purple.scaleX = 1.6
    purple.scaleY = 1.6
    purple.setMaxVelocity(0)

    yellow = this.physics.add.image(300, 600, 'yellow');
    yellow.scaleY = 1.6
    yellow.scaleX = 1.6
    yellow.setMaxVelocity(0)

    brown = this.physics.add.image(600, 350, 'brown');
    brown.scaleX = 1.6
    brown.scaleY = 1.6
    brown.setMaxVelocity(0)

    player1 = this.physics.add.image(400, 300, 'player1').setDepth(1);
    player1.scaleY = .7
    player1.scaleX = .8
    player1.setDamping(true);
    player1.setDrag(0.99);
    player1.setMaxVelocity(200);
    //player1
    
    

    //enemy testing phase (player2)
    player2 = this.physics.add.image(800, 300, 'player2').setDepth(1);
    player2.scaleY = .4
    player2.scaleX = .7
    player2.setDamping(true);
    player2.setDrag(0.99);
    player2.setMaxVelocity(200);
    player2.angle = -180;


    //Missiles
    var Missile = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

            function Missile(scene) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'missile');

                this.speed = Phaser.Math.GetSpeed(400, 1);
                this.scaleX = 0.5;
                this.scaleY = 0.4;

            },

        fire: function (x, y, z) {
            this.setPosition(x, y);
            this.setAngle(z);

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta) {
            this.y += this.speed * delta * Math.sin(this.angle * noOfRad);
            this.x += this.speed * delta * Math.cos(this.angle * noOfRad);

            if ((this.y < -50 || this.y > screen.height) || (this.x < -50 || this.x > screen.width)) {
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
    this.physics.add.collider(player1, red);
    this.physics.add.collider(player1, green);
    this.physics.add.collider(player1, brown);
    this.physics.add.collider(player1, blue);
    this.physics.add.collider(player1, yellow);
    this.physics.add.collider(player1, purple);


    //  Game input for movments
    cursors = this.input.keyboard.createCursorKeys();
    fireInst = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);








}


function update(time) {   //bullet controlling
    if (fireInst.isDown && time > lastFired) {
        var missile = missilesOfPlayer1.get();

        if (missile) {
            missile.fire(player1.x, player1.y, player1.angle);

            lastFired = time + 50;
        }
    }

    socket.on('move-p1', (p1) => {
        this.physics.velocityFromRotation(player1.rotation, 200, player1.body.acceleration);
    })
    socket.on('rotate-left-p1', (p1) => {
        player1.body.angularVelocity = -200;
    })
    socket.on('rotate-right-p1', (p1) => {
        player1.body.angularVelocity = 200;
    })
    socket.on('move-p2', (p2) => {
        this.physics.velocityFromRotation(player2.rotation, 200, player2.body.acceleration);
    })
    socket.on('rotate-left-p2', (p2) => {
        player2.body.angularVelocity = -200;
    })
    socket.on('rotate-right-p2', (p2) => {
        player2.body.angularVelocity = 200;
    })


    //player1 controling
    var player = 1;
    socket.on('get-player',(p)=>{
        console.log(p)
        player = p
    })

    if(player == 1){
        if (cursors.up.isDown) {
            socket.emit('move-p1', player1)
            // this.physics.arcade.velocityFromAngle(player1.angle, 300, player1.body.velocity);
            // this.physics.velocityFromRotation(player1.rotation, 200, player1.body.acceleration);
    
        }
        else {
            player1.body.acceleration.set(0);
        }
    
        if (cursors.left.isDown) {
            socket.emit('rotate-left-p1', player1)
        }
        else if (cursors.right.isDown) {
            socket.emit('rotate-right-p1', player1)
        }
        else {
            player1.body.angularVelocity = 0;
        }
    }
    else{
        if (cursors.up.isDown) {
            socket.emit('move-p2', player2)
            // this.physics.arcade.velocityFromAngle(player1.angle, 300, player1.body.velocity);
            // this.physics.velocityFromRotation(player1.rotation, 200, player1.body.acceleration);
    
        }
        else {
            player2.body.acceleration.set(0);
        }
    
        if (cursors.left.isDown) {
            socket.emit('rotate-left-p2', player2)
        }
        else if (cursors.right.isDown) {
            socket.emit('rotate-right-p2', player2)
        }
        else {
            player2.body.angularVelocity = 0;
        }
    }

    
    //player and stones not go anywhere than screen
    this.physics.world.wrap(player1, 0);

    // collision of bullet and stone
    this.physics.world.collide(red, missilesOfPlayer1, function (m, missile) {
        missile.setVisible(false);
        missile.setActive(false);
    });
    this.physics.world.collide(green, missilesOfPlayer1, function (m, missile) {
        missile.setVisible(false);
        missile.setActive(false);
    });
    this.physics.world.collide(brown, missilesOfPlayer1, function (m, missile) {
        missile.setVisible(false);
        missile.setActive(false);
    });
    this.physics.world.collide(blue, missilesOfPlayer1, function (m, missile) {
        missile.setVisible(false);
        missile.setActive(false);
    });
    this.physics.world.collide(yellow, missilesOfPlayer1, function (m, missile) {
        missile.setVisible(false);
        missile.setActive(false);
    });
    this.physics.world.collide(purple, missilesOfPlayer1, function (m, missile) {
        missile.setVisible(false);
        missile.setActive(false);
    });








}
*/



function addPlayer(self, playerInfo) {
    self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'player1').setDepth(1);
    self.ship.scaleY = .9
    self.ship.scaleX = .9
    self.ship.setDamping(true);
    self.ship.setDrag(0.99);
    self.ship.setMaxVelocity(200);
}

function addOtherPlayers(self, playerInfo) {
    const otherPlayer = self.physics.add.image(playerInfo.x, playerInfo.y, 'player2').setDepth(1);
    otherPlayer.scaleY = .7
    otherPlayer.scaleX = .8
    otherPlayer.setDamping(true);
    otherPlayer.setDrag(0.99);
    otherPlayer.setMaxVelocity(200);
    
    otherPlayer.playerId = playerInfo.playerId;
    self.otherPlayers.add(otherPlayer);
}


function create() {
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'map').setAlpha(0.3);
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);
    // placeStones(this);

    red = this.physics.add.image(200, 150, 'red').setAlpha(0.7);
    red.scaleX = 1.6
    red.scaleY = 1.6
    red.setMaxVelocity(0)

    blue = this.physics.add.image(1025, 600, 'blue').setAlpha(0.7);
    blue.scaleX = 1.6
    blue.scaleY = 1.6
    blue.setMaxVelocity(0)

    green = this.physics.add.image(1275, 350, 'green').setAlpha(0.7);
    green.scaleY = 1.6
    green.scaleX = 1.6
    green.setMaxVelocity(0)
    purple = this.physics.add.image(900, 200, 'purple').setAlpha(0.7);
    purple.scaleX = 1.6
    purple.scaleY = 1.6
    purple.setMaxVelocity(0)

    yellow = this.physics.add.image(300, 600, 'yellow').setAlpha(0.7);
    yellow.scaleY = 1.6
    yellow.scaleX = 1.6
    yellow.setMaxVelocity(0)

    brown = this.physics.add.image(600, 350, 'brown').setAlpha(0.7);
    brown.scaleX = 1.6
    brown.scaleY = 1.6
    brown.setMaxVelocity(0)

    var self = this;
    this.socket = io();
    this.otherPlayers = this.physics.add.group();
    this.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {
            if (players[id].playerId === self.socket.id) {
                addPlayer(self, players[id]);
            } else {
                addOtherPlayers(self, players[id]);
            }
        });
    });
    this.socket.on('newPlayer', function (playerInfo) {
        addOtherPlayers(self, playerInfo);
    });
    this.socket.on('disconnect', function (playerId) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
            if (playerId === otherPlayer.playerId) {
                otherPlayer.destroy();
            }
        });
    });


    this.socket.on('playerMoved', function (playerInfo) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
            if (playerInfo.playerId === otherPlayer.playerId) {
                otherPlayer.setRotation(playerInfo.rotation);
                otherPlayer.setPosition(playerInfo.x, playerInfo.y);
            }
        });
    });



    var Missile = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

            function Missile(scene) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'missile');

                this.speed = Phaser.Math.GetSpeed(400, 1);
                this.scaleX = 0.5;
                this.scaleY = 0.4;

            },

        fire: function (x, y, z) {
            this.setPosition(x, y);
            this.setAngle(z);

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta) {
            this.y += this.speed * delta * Math.sin(this.angle * noOfRad);
            this.x += this.speed * delta * Math.cos(this.angle * noOfRad);

            if ((this.y < -50 || this.y > screen.height) || (this.x < -50 || this.x > screen.width)) {
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



    this.socket.on('missile-fired', function (playerInfo) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
            if (playerInfo.playerId === otherPlayer.playerId) {
                missilesOfPlayer1.get().fire(otherPlayer.x, otherPlayer.y, otherPlayer.angle)
            }
        });
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireInst = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update(time) {
    if (this.ship) {
        // emit player movement
        if (this.cursors.left.isDown) {
            this.ship.body.angularVelocity = -200;
        } else if (this.cursors.right.isDown) {
            this.ship.body.angularVelocity = 200;
        } else {
            this.ship.setAngularVelocity(0);
        }

        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
        } else {
            this.ship.setAcceleration(0);
        }

        this.physics.world.wrap(this.ship, 5);

        var x = this.ship.x;
        var y = this.ship.y;
        var r = this.ship.rotation;
        if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
            this.socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y, rotation: this.ship.rotation });
        }

        // save old position data
        this.ship.oldPosition = {
            x: this.ship.x,
            y: this.ship.y,
            rotation: this.ship.rotation
        };


        this.physics.add.collider(this.ship, red);
        this.physics.add.collider(this.ship, green);
        this.physics.add.collider(this.ship, brown);
        this.physics.add.collider(this.ship, blue);
        this.physics.add.collider(this.ship, yellow);
        this.physics.add.collider(this.ship, purple);

        //Fire Missile
        if (this.fireInst.isDown && time > lastFired) {

            this.socket.emit('fire-missile', {
                x: this.ship.x,
                y: this.ship.y,
                angle: this.ship.angle
            })


            var missile = missilesOfPlayer1.get();

            if (missile) {
                missile.fire(this.ship.x, this.ship.y, this.ship.angle);

                lastFired = time + 50;
            }
        }

        // collision of bullet and stone
        this.physics.world.collide(red, missilesOfPlayer1, function (m, missile) {
            missile.setVisible(false);
            missile.setActive(false);
        });
        this.physics.world.collide(green, missilesOfPlayer1, function (m, missile) {
            missile.setVisible(false);
            missile.setActive(false);
        });
        this.physics.world.collide(brown, missilesOfPlayer1, function (m, missile) {
            missile.setVisible(false);
            missile.setActive(false);
        });
        this.physics.world.collide(blue, missilesOfPlayer1, function (m, missile) {
            missile.setVisible(false);
            missile.setActive(false);
        });
        this.physics.world.collide(yellow, missilesOfPlayer1, function (m, missile) {
            missile.setVisible(false);
            missile.setActive(false);
        });
        this.physics.world.collide(purple, missilesOfPlayer1, function (m, missile) {
            missile.setVisible(false);
            missile.setActive(false);
        });



    }

}