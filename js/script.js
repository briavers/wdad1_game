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
    
    var chicken = new Chicken(canvas, 600, -20, elementChicken);

    
   
    var elementBasket = document.getElementById('imgBasket');
    
    
    
    var someBasket = new Basket(canvas, elementBasket);
    someBasket.draw();
    canvas.on('mouse:move', moveBasket);
    function moveBasket(options) {
        var xPositionCursor = options.e.layerX;
        someBasket.basket.left = xPositionCursor;
        return xPositionCursor
    }
    
    
   
    
    
    var elementRocket = document.getElementById('imgRocket')
    var someRocket = new Rocket(canvas, elementRocket);
    
   
    
    

   
    
    
    
    
    
    var rat = new Rat(canvas, elementRat);

    var containers = []
    
//functionality to check on eggs & rat

function monitorGame(){
    //cheack the eggs in basket
    checkContainer();
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
    
    
    
    
    
    
    
function checkContainer(){
    //console.log(eggs)
    for(var i = 0; i<containers.length; i++){
        var container = containers[i];
        
        var x = container.container.left;
        var y = container.container.top;
        
        
        if (container.hasFallen){
            //romove from erray
            containers.splice(i, 1)
            canvas.remove(container.container);
            console.log("it should be removed now")
        }
        if (y > 750 && container.hasFallen ==false){
            var basketPosition = someBasket.basket.left;
            var basketPadding = 50;
            
            if((basketPosition - basketPadding)< x && x< (basketPosition + basketPadding)){
                container.hasFallen = true;
                score++;
                elScore.textContent=score;
                canvas.remove(container.container);
                
            }
        }
    }
    
}
    
    
    
    
    function checkRat(){
    for(var i = 0; i < containers.length; i++){
        var container = containers[i];
        
        var x = container.container.left;
        var y = container.container.top;
       // console.log(y)
        
        if (y>200 && y<250){
            var ratPosition = rat.rat.left;
            var ratPadding = 55;
           // console.log('test y==100')
            
            
            if((ratPosition - ratPadding) < x && x < (ratPosition + ratPadding)){
                container.hasFallen = true;
                canvas.remove(container.container);
                
              //  console.log('rat position true')
            };
            
        };
                
            };
        };
  
    
    var btnStart = document.getElementById('btnStart');
    var btnPause = document.getElementById('btnPause');
    var btnStop = document.getElementById('btnStop');
    
    var gameStatus = 'start';
    var createContainerInterval;
    var monitorGameInterval;
    
    
       var createContainers = function(){
       var elementContainer = document.getElementById('imgContainer')
		var someContainer = new Container(canvas, elementContainer);
		someContainer.draw();
           
           
		someContainer.fall();
            
    containers.push(someContainer)
	console.log(containers)

    
    

var radomLeft = randomXPosition();
if (radomLeft > 600) someContainer.roll(180);
    else someContainer.roll(-180);
    
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
        
        
        createContainerInterval = setInterval(createContainers, 3000);
        
        
        
            
        canvas.on('mouse:down', shootRocket);
        function shootRocket(options) {
        var xPositionCursor = options.e.layerX;
        //console.log(xPositionCursor)
        var someRocket = new Rocket(canvas, xPositionCursor, elementRocket);
        someRocket.draw()
        someRocket.shoot()  
    }
    
        
        
        
        
        
        btnStart.disabled = true;
       
        btnStop.disabled = false;
    });
    
    
    
    

    
    
    
    
    

            btnStop.addEventListener('click', function(){
                 gameStatus = 'stop';
                 chicken.stop = true;
                rat.stop = true;
                canvas.remove(chicken.chicken)
                canvas.remove(rat.rat)
               // canvas.remove(currentContainer.container)
                
                
                /*canvas.remove(container.someContainer)
                canvas.remove(currentContainer.container)
                for(var i = 0; i< containers.length; i++){
                    var currentContainer = containers[i];
                    canvas.remove(currentContainer.container);
                }
*/
                 var elScore = document.getElementById('scoreValue');
                score = 0
                elScore.textContent=0;
                console.log("stop test 1")

                //intervallen stop zetten
                clearInterval(createContainerInterval);
                clearInterval(monitorGameInterval);

console.log("stop test 2")

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



