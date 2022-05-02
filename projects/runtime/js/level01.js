var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 110},
                { "type": "sawblade", "x": 800, "y": groundY },
                { "type": "sawblade", "x": 1200, "y": groundY - 20},
                { "type": "sawblade", "x": 2200, "y": groundY - 20},
                { "type": "bolt", "x": 1400, "y": groundY - 100},
                { "type": "bolt", "x": 1600, "y": groundY - 20},
                { "type": "spider", "x": 1800, "y": groundY - 10},
                { "type": "spider", "x": 1900, "y": groundY - 10},
                { "type": "spider", "x": 2000, "y": groundY - 10},
                { "type": "orc", "x": 300, "y": groundY - 50},
                { "type": "orc", "x": 500, "y": groundY - 50},
                { "type": "orc", "x": 700, "y": groundY - 50},
                { "type": "orc", "x": 1500, "y": groundY - 50},
                { "type": "stormtrooper", "x": 900, "y": groundY - 60},
                { "type": "stormtrooper", "x": 1100, "y": groundY - 60},
                { "type": "stormtrooper", "x": 1300, "y": groundY - 60},
                { "type": "apple", "x": 1000, "y": groundY - 130},
                { "type": "apple", "x": 1400, "y": groundY - 130},
                { "type": "coin", "x": 500, "y": groundY - 130},
                { "type": "coin", "x": 750, "y": groundY},
                { "type": "coin", "x": 1200, "y": groundY - 130}
            ]
        };
        
        for(var i = 0; i < levelData.gameItems.length; i++){
            var obj = levelData.gameItems[i];
            var x = obj.x;
            var y = obj.y;
            if(obj.type === "sawblade"){
                createSawBlade(x, y);
            }
            if(obj.type === "bolt"){
                createLightningBolt(x, y);
            }
            if(obj.type === "spider"){
                createSpider(x, y);
            }
            if(obj.type === "orc"){
                createOrc(x, y);
            }
            if(obj.type === "stormtrooper"){
                createStormTrooper(x, y);
            }
            if(obj.type === "apple"){
                createApple(x, y);
            }
            if(obj.type === "coin"){
                createCoin(x, y);
            }
        }
    
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y){
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);    
        var obstacleImage = draw.bitmap('img/sawblade.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        sawBladeHitZone.addChild(obstacleImage);
    }
    
    function createLightningBolt(x, y){
        var hitZoneSize = 15;
        var damageFromObstacle = 15;
        var boltHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        boltHitZone.x = x;
        boltHitZone.y = y;
        game.addGameItem(boltHitZone);    
        var bolt = draw.bitmap('img/bolt.png');
        bolt.scaleX = 1/10;
        bolt.scaleY = 1/10;
        bolt.x = -15;
        bolt.y = -15;
        boltHitZone.addChild(bolt);
    }

    function createSpider(x, y){
        var hitZoneSize = 6;
        var damageFromObstacle = 10;
        var spiderHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        spiderHitZone.x = x;
        spiderHitZone.y = y;
        game.addGameItem(spiderHitZone);    
        var spider = draw.bitmap('img/bwspider.png');
        spider.scaleX = 1/50;
        spider.scaleY = 1/50;
        spider.x = -20;
        spider.y = -5;
        spiderHitZone.addChild(spider);
    }

    function createOrc(x, y) {
        // all code from TODO 11 and 12
        var enemy = game.createGameItem('enemy',25);
        var orc = draw.bitmap('img/orc.png');//draw.rect(50,50,'red');
        enemy.x = x;
        enemy.y = y;
        orc.scaleX = 0.1;
        orc.scaleY = 0.14;
        orc.x = -25;
        orc.y = -25;
        enemy.addChild(orc);
        game.addGameItem(enemy);
        enemy.velocityX = -1;
        enemy.rotationalVelocity = -10;
    
        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
            enemy.fadeOut();
        };
    
        enemy.onProjectileCollision = function() {
            console.log('Halle has hit the enemy');
            game.increaseScore(100);
            enemy.fadeOut();
            //projectile.fadeOut();
        };
    };

    function createStormTrooper(x, y) {
        // all code from TODO 11 and 12
        var enemy = game.createGameItem('enemy',25);
        var stormTrooper = draw.bitmap('img/stormtrooper.png');//draw.rect(50,50,'red');
        enemy.x = x;
        enemy.y = y;
        stormTrooper.scaleX = 0.1;
        stormTrooper.scaleY = 0.1;
        stormTrooper.x = -25;
        stormTrooper.y = -25;
        enemy.addChild(stormTrooper);
        game.addGameItem(enemy);
        enemy.velocityX = -1;
        //enemy.rotationalVelocity = -10;
    
        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-20);
            enemy.fadeOut();
        };
    
        enemy.onProjectileCollision = function() {
            console.log('Halle has hit the enemy');
            game.increaseScore(200);
            enemy.shrink();
            //projectile.fadeOut();
        };
    };

    function createApple(x, y) {
        // all code from TODO 11 and 12
        var reward = game.createGameItem('reward',25);
        var apple = draw.bitmap('img/apple.png');//draw.rect(50,50,'red');
        reward.x = x;
        reward.y = y;
        apple.scaleX = 0.025;
        apple.scaleY = 0.025;
        apple.x = -25;
        apple.y = -25;
        reward.addChild(apple);
        game.addGameItem(reward);
        reward.velocityX = -1;
        //reward.rotationalVelocity = -10;
    
        reward.onPlayerCollision = function() {
            console.log('The reward has hit Halle');
            game.changeIntegrity(10);
            reward.fadeOut();
        };
    
        
    };

    function createCoin(x, y) {
        // all code from TODO 11 and 12
        var reward = game.createGameItem('reward',25);
        var coin = draw.bitmap('img/coin.png');//draw.rect(50,50,'red');
        reward.x = x;
        reward.y = y;
        coin.scaleX = 0.08;
        coin.scaleY = 0.08;
        coin.x = -33;
        coin.y = -25;
        reward.addChild(coin);
        game.addGameItem(reward);
        reward.velocityX = -1;
        //reward.rotationalVelocity = -10;
    
        reward.onPlayerCollision = function() {
            console.log('The reward has hit Halle');
            game.increaseScore(50);
            reward.fadeOut();
        };
    
        
    };

    
    

        // DO NOT EDIT CODE BELOW HERE
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
