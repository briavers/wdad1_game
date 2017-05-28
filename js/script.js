/***************************************************
* @author Brian Verschoore
* @created 27/04/2017
* @modified 04 /05/2016
* @copyright Copyright © 2016-2017 Artevelde University College Ghent
* @function catch and trow something
* @TODO A LOT
****************************************************/
window.onload = function(){

    //declare a canvas with the fabric library
    var canvas = this.__canvas = new fabric.Canvas('playground');
    
    var plank = new Plank(canvas, 130, '#FFFF00');
    plank.draw();
    
    var elementCarrier = document.getElementById('imgCarrier');
    var elementPirate = document.getElementById('imgPirate')
    
    var carrier = new Carrier(canvas, 600, -20, elementCarrier);

    
   var canShoot
    var elementPlayer = document.getElementById('imgPlayer');
    
    
    
    
    
    
    var somePlayer = new Player(canvas, elementPlayer);
    somePlayer.draw();
    canvas.on('mouse:move', movePlayer);
    function movePlayer(options) {
        var xPositionCursor = options.e.layerX;
        somePlayer.player.left = xPositionCursor;
        return xPositionCursor
    }
    
     
    
    
    var elementRocket = document.getElementById('imgRocket')
    var someRocket = new Rocket(canvas, elementRocket);
    
    var pirate = new Pirate(canvas, elementPirate);
    
    var tnts = []
    var containers = []
    var liveRockets = []
    var liveBadRockets = []
    
    
    
    
     //starting of att easy amounts
    
    if (pirateSpeed == 0){
        console.info('piratespeed was 0')
        pirateSpeed = 2000;
        rocketWait = 1;
        enemyRocketsSpeed = 1200;
        containerAmountSpeed = 2000;
        enemyArmyAmounth = 0;
        badRocketSalvo = 3500;}
    
    
             //settings change ingame 
    var fldSelect = document.getElementById('level')
    fldSelect.addEventListener('change', changeDificulty)
       function changeDificulty(){
    // get selected index 
    var difficultySelectIndex = document.getElementById("level").selectedIndex;
    var jSonPath = document.getElementsByTagName("option")[difficultySelectIndex].value; 
    
    // get the json file
    fetchJSONFile(jSonPath, function(data){
        // json file is loaded

        // get the settings object
       var settings = data.settingsJSon;
        
       // 2 possible settings; speed & rocketwait
       pirateSpeed = settings.enemySpeed;
       rocketWait = settings.rocketWait;
        containerAmountSpeed += settings.containerAmounth;
       enemyRocketsSpeed = settings.enemyRocketSpeed;
        enemyArmyAmounth = settings.enemyArmy;
        badRocketSalvo = settings.enemyRocketSalvo;
        return pirateSpeed
        return rocketWait
        return enemyRocketsSpeed
        return enemyArmyAmounth
        return badRocketSalvo
    
       
    });
       } 
    /*
    var actualLevel
    
    
    function level() {
    var levelId = document.getElementById("styles").selectedIndex;
    var actualLevel = document.getElementsByTagName("option")[levelId].value; 
    return actualLevel;
}
  
    
    */
    
    var pirateSpeed = 0;
    var rocketWait = 0;
    var enemyRocketsSpeed = 0;
    var containerAmountSpeed = 0;
    var enemyArmyAmounth = 0;
    var badRocketSalvo = 0;
   

    



    
    
    
    
    
    
    
    
//functionality to check on eggs & pirate

function monitorGame(){
    //cheack the eggs in player
    checkContainer();
    checkTnt();
    checkPirate();
    checkPirateHit();
    checkCarrierHit();
    checkPlayerHit();
    dead();
}

    
    
    
    
    var elScore = document.getElementById('scoreValue');
    var elHScore = document.getElementById('hScoreValue');
    var score = 0;
    elScore.textContent=score
    
    
    var elLives = document.getElementById('livesValue');
    var lives = 3;
    elLives.textContent = lives
    
    
  
    
    
    var highscore = localStorage.getItem('highscore');
    

    elHScore.textContent = highscore
    
    
    
    
    
    
    
function checkContainer(){
  
    for(var i = 0; i<containers.length; i++){
        var container = containers[i];
        
        var x = container.container.left;
        var y = container.container.top;
        
        
        if (container.hasFallen){
            //romove from erray
            containers.splice(i, 1)
            canvas.remove(container.container);
            
        }
        if (y > 750 && container.hasFallen ==false){
            var playerPosition = somePlayer.player.left;
            var playerPadding = 50;
            
            if((playerPosition - playerPadding)< x && x< (playerPosition + playerPadding)){
                container.hasFallen = true;
                score++;
                elScore.textContent=score;
                canvas.remove(container.container);
                
            }
        }
    }
    
}
    function checkTnt(){
        console.info("Check TNT function")
        for(var i = 0; i<tnts.length; i++){
            var tnt = tnts[i];

            var x = tnt.tnt.left;
            var y = tnt.tnt.top;


            if (tnt.hasFallen){
                console.info("tnt has fallen")
                //romove from erray
                tnts.splice(i, 1)
                canvas.remove(tnt.tnt);

            }
            if (y > 750 && tnt.hasFallen ==false){
                console.info("tnt check if tnt is catched")
                var playerPosition = somePlayer.player.left;
                var playerPadding = 50;

                if((playerPosition - playerPadding)< x && x< (playerPosition + playerPadding)){
                    tnt.hasFallen = true;
                    lives--;
                    elLives.textContent=lives;
                    canvas.remove(tnt.tnt);

                }
            }
        }

    } 
    
    
    
    function checkPirate(){
    for(var i = 0; i < containers.length; i++){
        var container = containers[i];
       
        var x = container.container.left;
        var y = container.container.top;
       
        
        if (y>200 && y<250){
            var piratePosition = pirate.pirate.left;
            var piratePadding = 55;
          
            
            
            if((piratePosition - piratePadding) < x && x < (piratePosition + piratePadding)){
                container.hasFallen = true;
                canvas.remove(container.container);
                
             
            };
            
        };
            };
        };
    
    
    
    function checkPirateHit(){
         for(var i = 0; i<liveRockets.length; i++){
        var rocket = liveRockets[i];
        var x = rocket.rocket.left;
        var y = rocket.rocket.top;
         
         
             
        if (y>200 && y<250){
            var piratePosition = pirate.pirate.left;
            var piratePadding = 80;
            
            if((piratePosition - piratePadding) < x && x < (piratePosition + piratePadding)){
                pirate.hasHit = true;
                canvas.remove(pirate.pirate);
               // elementPirate.style.webkitAnimationPlayState="paused";
                
                
                liveRockets.splice(i, 1)
                
                setTimeout(function(){ 
                    pirate.draw(); 
                    do{badRocketsRandom = Math.random() * 3500 + 10;
            } while (badRocketsRandom > badRocketSalvo && badRocketsRandom < (badRocketSalvo + 1000) )
                
               // console.log(badRocketsRandom)
                
                setTimeout(function(){ canShoot = true;  }, (5000 + rocketWait));
                clearInterval(createBadRocketsInterval);
                
                }, 1500);
            }
        }
        if (y<0){
            
            liveRockets.splice(i, 1)
            
            setTimeout(function(){ canShoot = true;  }, rocketWait);
            
        }
    }
    }
    
    
    function checkCarrierHit(){
        for(var i = 0; i<liveRockets.length; i++){
        var rocket = liveRockets[i];
        var x = rocket.rocket.left;
        var y = rocket.rocket.top;
        
        if (y<25 && y>1){
            var carierPosition = carrier.carrier.left;
            var carierPadding = 95;
            if((carierPosition - carierPadding) < x && x < (carierPosition + carierPadding)){
                var btnStart = document.getElementById('btnStart');
                var btnStop = document.getElementById('btnStop');
                gameStatus = 'stop';
                carrier.stop = true;
                pirate.stop = true;
                if (score > highscore) {localStorage.setItem('highscore', score);      
                }else{localStorage.setItem("highscore", score);
                }
                canvas.remove(carrier.carrier)
                canvas.remove(pirate.pirate)
           
                
                var elScore = document.getElementById('scoreValue');
                score = 0
                elScore.textContent=0;
                lives = 3
                elLives.textContent=3
                var highscore = localStorage.getItem('highscore');
                elHScore.textContent = highscore

                //intervallen stop zetten
                clearInterval(createContainerInterval);
                clearInterval(createTntInterval);
                clearInterval(createBadRocketsInterval);
                clearInterval(monitorGameInterval);

                btnStart.disabled = false;
                btnStop.disabled = true;
                setTimeout(function(){ swal("carrier destroyed", "look where you fire", "error");;  }, 50);
            }
        }
    }
    }
    
   
    function dead(){
         var livesCheck = parseInt(lives)
         
    if(livesCheck==0){
        
                var btnStart = document.getElementById('btnStart');
                var btnStop = document.getElementById('btnStop');
                gameStatus = 'stop';
                carrier.stop = true;
                pirate.stop = true;
                
                if (score > highscore) {localStorage.setItem('highscore', score);      
                }else{localStorage.setItem("highscore", score);
                }
                canvas.remove(carrier.carrier)
                canvas.remove(pirate.pirate)
                   
               
        
                var elScore = document.getElementById('scoreValue');
                score = 0
                elScore.textContent=0;
                lives = 3
               elLives.textContent=3
               var highscore = localStorage.getItem('highscore');
                elHScore.textContent = highscore

                //intervallen stop zetten
                clearInterval(createContainerInterval);
                clearInterval(createTntInterval);
                clearInterval(createBadRocketsInterval);
                clearInterval(monitorGameInterval);
                

                btnStart.disabled = false;
                btnStop.disabled = true;
                setTimeout(function(){ swal("you died", "whats out for the enemy rockets", "error");;  }, 50);
        
    
            
        
    }
    }
    
    function checkPlayerHit(){
        for(var i = 0; i<liveBadRockets.length; i++){
        var badRocket = liveBadRockets[i];
        var x = badRocket.badRocket.left;
        var y = badRocket.badRocket.top;
        if (y < 850 && y>800){
            var playerPosition = somePlayer.player.left;
            var playerPadding = 120;
                if((playerPosition - playerPadding) < x && x < (playerPosition + playerPadding)){
                lives--;
                elLives.textContent=lives; }
                canvas.remove(badRocket.badRocket)
          
        }
        if (y>900){
            canvas.remove(badRocket.badRocket)
        }
            
        }
            
    }
          
        
        
        
    
    var btnStart = document.getElementById('btnStart');
    var btnStop = document.getElementById('btnStop');
    var btnHelp = document.getElementById('btnHelp');
    var gameStatus = 'start';
    var createContainerInterval;
    var monitorGameInterval;
    var createBadRocketsInterval;
    var canShoot = true
    
       var createContainers = function(){
            var elementContainer = document.getElementById('imgContainer')
            var someContainer = new Container(canvas, elementContainer);
            someContainer.draw();
        	someContainer.fall();
            containers.push(someContainer)
         
            var radomLeft = randomXPosition();
            if (radomLeft > 600) someContainer.roll(180);
            else someContainer.roll(-180);
       }
       
       var createTnt = function(){
            var elementTnt = document.getElementById('imgTnt')
            var someTnt = new Tnt(canvas, elementTnt);
            someTnt.draw();
        	someTnt.fall();
            tnts.push(someTnt)
         
            var radomLeft = randomXPosition();
            if (radomLeft > 600) someTnt.roll(180);
            else someTnt.roll(-180);
       }
       
       var createBadRockets = function(){
           var piratePosition = pirate.pirate.left;
            var elementBadRocket = document.getElementById('imgBadRocket')
            var someBadRocket = new BadRocket(canvas, piratePosition, elementBadRocket)
            someBadRocket.draw();
            someBadRocket.badShoot(enemyRocketsSpeed);
           liveBadRockets.push(someBadRocket)

       }
    
       
       
    btnStart.addEventListener('click', function(){
             
    if (pirateSpeed == 0){
        console.info('piratespeed was 0')
        pirateSpeed = 2000;
        rocketWait = 1;
        enemyRocketsSpeed = 1200;
        containerAmountSpeed = 2000;
        enemyArmyAmounth = 0;
        badRocketSalvo = 3500;}
        
        gameStatus = 'start';
        carrier.stop = false;
        pirate.stop = false;
        
        carrier.draw();
        carrier.wobble(10);
        pirate.draw();
        
        
        pirate.run(30, pirateSpeed);
         console.log(pirateSpeed)
      

        //level();
         //console.log(actualLevel)
       // canShoot = true;
        
        monitorGameInterval = setInterval(monitorGame, 50);
        
        createContainerInterval = setInterval(createContainers, containerAmountSpeed);
        createTntInterval = setInterval(createTnt, (containerAmountSpeed+ 8253));
        
            do{badRocketsRandom = Math.random() * 3500 + 1500;
            } while (badRocketsRandom > badRocketSalvo && badRocketsRandom < (badRocketSalvo + 1000) )
                
        
        createBadRocketsInterval = setInterval(createBadRockets, badRocketsRandom)
        
        
        //shoot function 
        canvas.on('mouse:down', shootRocket);
        function shootRocket(options) {
            if(canShoot){
                var xPositionCursor = options.e.layerX;
        
                var someRocket = new Rocket(canvas, xPositionCursor, elementRocket);
                someRocket.draw()
                someRocket.shoot()  
                liveRockets.push(someRocket)
                canShoot = false;
            }else{
        
            }
        }
        btnStart.disabled = true;
        btnStop.disabled = false;
        btnHelp.disabled = true;
        
        
        
   
    });
    
    
    

   


    
    
    
    
    

            btnStop.addEventListener('click', function(){
                 gameStatus = 'stop';
                 carrier.stop = true;
                pirate.stop = true;
                canvas.remove(carrier.carrier)
                canvas.remove(pirate.pirate)


               // canvas.remove(currentContainer.container)
                
                if (score > highscore) {localStorage.setItem('highscore', score);      
                }else{localStorage.setItem("highscore", score);
                }

                
                /*canvas.remove(container.someContainer)
                canvas.remove(currentContainer.container)
                for(var i = 0; i< containers.length; i++){
                    var currentContainer = containers[i];
                    canvas.remove(currentContainer.container);
                }
*/
                 var elScore = document.getElementById('scoreValue');
                score = 0
                elScore.textContent=score;
                
                lives = 3
                elLives.textContent=lives
                
                var highscore = localStorage.getItem('highscore');
                elHScore.textContent = highscore
                //intervallen stop zetten
                clearInterval(createContainerInterval);
                clearInterval(createTntInterval);
                clearInterval(monitorGameInterval);
                clearInterval(createBadRocketsInterval);
        

            

                btnStart.disabled = false;
                btnHelp.disabled = false;
                btnStop.disabled = true;
            });
    
    
    btnHelp.addEventListener('click', function(){
        
        
        swal({
  title: "Basic info!",
  text: "move by moving the mouse, click to shoot the rockets. evade enemy rockets and don't shoot the carier. <br> try to collect as manny containers as possible, there are 3 levels, easy medium and hard; <br> Easy makes you live easy, slow enemy slow enemy rockets many containers  <br> Medium gives a regualar gameplay with normal speed <br> Hard adds to enemy rocket speed, and adds another enemy ship luckily that one can not shoot  <br> <em> hint: there is a cooldown between rockets you can fire, choose wisely<em>",
  html: true
});
        /*
        swal("basic info", "move by moving the mouse, click to shoot the rockets. evade enemy rockets and don't shoot the carier. <br> try to collect as manny containers as possible, there are 3 levels, easy medium and hard; <br> Easy makes you live easy, slow enemy slow enemy rockets many containers  <br> Medium gives a regualar gameplay with normal speed <br> Hard adds to enemy rocket speed, and adds another enemy ship luckily that one can not shoot  <br> hint: there is a cooldown between rockets you can fire, choose wisely")
       */ 
        
        btnStart.disabled = false;
        btnHelp.disabled = false;
        btnStop.disabled = true; 
    });
    
//Helpers
    function randomXPosition(){
      var min = 50;
        var max = canvas.width - 50;
        return Math.floor(Math.random()*max-min+1)+min;
    }
    
    
    
    function fetchJSONFile(path, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var data = JSON.parse(httpRequest.responseText);

                    if (callback) callback(data);
                }
            }
        };
        httpRequest.open('GET', path);
        httpRequest.send(); 
    }
    
    
    
 }



