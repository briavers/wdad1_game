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
    
    var elementChicken = document.getElementById('imgChicken');
    var elementRat = document.getElementById('imgRat')
    
    var chicken = new Chicken(canvas, 350, 160, elementChicken);

    
    
   
    var elementBasket = document.getElementById('imgBasket');
    
    var someBasket = new Basket(canvas, elementBasket);
    someBasket.draw();
    canvas.on('mouse:move', moveBasket);
    function moveBasket(options) {
        var xPositionCursor = options.e.layerX;
        someBasket.basket.left = xPositionCursor;
    }

    var rat = new Rat(canvas, elementRat);

    var eggs = []
    

    
    
//functionality to check on eggs & rat

function monitorGame(){
    //cheack the eggs in basket
    checkEggs();
    checkRat();
}

    
    
    
    
    var elScore = document.getElementById('scoreValue');
    var elHScore = document.getElementById('hScoreValue')
    var score = 0;
    elScore.textContent=score
    
  
    var highscore = localStorage.getItem("highscore");
    if(highscore !== null){
    if (score > highscore) {
        localStorage.setItem("highscore", score);      
    }
}
else{
    localStorage.setItem("highscore", score);
}
    elHScore.textContent = highscore
    
    
    
    
    
    
    
function checkEggs(){
    //console.log(eggs)
    for(var i = 0; i<eggs.length; i++){
        var egg = eggs[i];
        
        var x = egg.egg.left;
        var y = egg.egg.top;
        
        
        if (egg.hasFallen){
            //romove from erray
            eggs.splice(i, 1)
        }
        if (y > 400 && egg.hasFallen ==false){
            var basketPosition = someBasket.basket.left;
            var basketPadding = 50;
            
            if((basketPosition - basketPadding)< x && x< (basketPosition + basketPadding)){
                egg.hasFallen = true;
                score++;
                elScore.textContent=score;
                
            }
        }
    }
    
}
    
    
    
    
    function checkRat(){
    for(var i = 0; i < eggs.length; i++){
        var egg = eggs[i];
        
        var x = egg.egg.left;
        var y = egg.egg.top;
       // console.log(y)
        
        if (y==115){
            var ratPosition = rat.rat.left;
            var ratPadding = 75;
           // console.log('test y==100')
            
            
            if((ratPosition - ratPadding) < x && x < (ratPosition + ratPadding)){
                egg.hasFallen = true;
                canvas.remove(egg.egg);
              //  console.log('rat position true')
            };
            
        };
                
            };
        };
  
    
    var btnStart = document.getElementById('btnStart');
    var btnPause = document.getElementById('btnPause');
    var btnStop = document.getElementById('btnStop');
    
    var gameStatus = 'stop';
    var createEggInterval;
    var monitorGameInterval;
    
   var createEggs = function(){
		var eggy = new Egg(canvas, 320, 100);
		eggy.draw();
		eggy.fall();
        eggs.push(eggy)
	
    
    

var radomLeft = randomXPosition();
if (radomLeft > 250) eggy.roll(180);
    else eggy.roll(-180);
    
    }
    
    btnStart.addEventListener('click', function(){
        gameStatus = 'start';
        chicken.stop = false;
        rat.stop = false;
        chicken.draw();
        chicken.wobble(10);
        rat.draw();
        rat.run(30);
        monitorGameInterval = setInterval(monitorGame, 50);
        
        
        createEggInterval = setInterval(createEggs, 3000);
        
        
        
        btnStart.disabled = true;
       
        btnStop.disabled = false;
    });
    
    
    
    

    
    
    
    
    
    
    btnStop.addEventListener('click', function(){
         gameStatus = 'stop';
         chicken.stop = true;
        rat.stop = true;
        canvas.remove(chicken.chicken)
        canvas.remove(rat.rat)
        for(var i = 0; i< eggs.length; i++){
            var currentEgg = eggs[i];
            canvas.remove(currentEgg.egg);
        }
        
         var elScore = document.getElementById('scoreValue');
        score = 0
        elScore.textContent=0;
               
        
        //intervallen stop zetten
        clearInterval(createEggInterval);
        clearInterval(monitorGameInterval);
        
        
        
        btnStart.disabled = false;
      
        btnStop.disabled = true;
    });
    
    
//Helpers
    function randomXPosition(){
      var min = 50;
        var max = canvas.width - 50;
        return Math.floor(Math.random()*max-min+1)+min;
    }
 }
    


