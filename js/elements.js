/***************************************************
* @author Brian Verschoore
* @created 27/04/2017
* @modified 04 /05/2016
* @copyright Copyright © 2016-2017 Artevelde University College Ghent
* @function catch and trow something
* @TODO A LOT
****************************************************/
var Plank = function(c, top, fill){
    
    this.left = 20;
    this.top = top;
    this.width = c.width -40;
    this.height = 7; 
    this.fill = fill;
    this.draw= function(){
        var rectangle = new fabric.Rect({
            left: this.left,
            top: this.top,
            fill: this.fill,
            width: this.width,
            height: this.height
        });
        rectangle.selectable = false;
        c.add(rectangle);
    }
}






var Carrier = function(c, left, top, element){
    var t = this
    this.carrier = null;
    this.element = element;
    this.stop = false;
    
    this.size = {
        width: 90,
        height: 155
    }
    this.position = {
        left: left,
        top: top
    }
    t.carrier = null;
    
    this.draw = function() {
        t.carrier = new fabric.Image(t.element, {
            width: t.size.width,
            height: t.size.height,
            left: t.position.left,
            top: t.position.top,
            originX: 'center',
            originY: 'top'
        });
        
        
        t.carrier.selectable = false;
        c.add(t.carrier);
        t.carrier.moveTo(100)
    };

    this.wobble = function(angle) {
        t.carrier.animate('angle', angle,{
            duration: 3000,
            onChange: c.renderAll.bind(c),
            onComplete: function(){
                if(!t.stop){
                    
                    if (angle == 5){
                       
                        t.wobble(-5)
                    } else{
                        t.wobble(5)
                    }
                }
            },
            easing: fabric.util.ease['easeInOutQuad']
        });
    }
}
    
    
var Player = function(c, element){
    var t = this
    this.player = null;
    this.element = element;
    this.size = {
        width: 200,
        height: 100
    }
    this.position = {
        left: c.width/2,
        top: c.height-30
    }
    
    this.draw = function() {
        t.player = new fabric.Image(t.element, {
            width: t.size.width,
            height: t.size.height,
            left: t.position.left,
            top: t.position.top,
            originX: 'center',
            originY: 'bottom',
            selectable: false
        });
        
        c.add(t.player);
    };
}

//RAT

var Pirate = function(c, element){
    var t = this
    this.pirate = null;
    this.element = element;
    this.stop = false;
    this.size = {
        width: 120,
        height: 77
    }
    this.position = {
        top: 260,
        left: 650
    }
    
    this.draw = function() {
        t.pirate = new fabric.Image(t.element, {
            width: t.size.width,
            height: t.size.height,
            left: t.position.left,
            top: t.position.top,
            originX: 'center',
            originY: 'bottom',
            selectable: false
        });
        
        c.add(t.pirate);
    };


    this.run = function(newPosition, pirateSpeed){
       t.pirate.animate('left', newPosition, {
           duration: pirateSpeed,
           // onChange: c.renderAll.bind(c),
            onComplete: function(){
            if(!t.stop){
                //console.log(newPosition)
                if(newPosition == 30){
                  // console.log(newPosition)
                    t.run(c.width-30, pirateSpeed);
                    t.pirate.set('flipX', true);
                } else{
                   // console.log(newPosition + " 3")
                    t.run(30, pirateSpeed);
                    t.pirate.set('flipX', false);
                }
            }
            },
                 easing: fabric.util.ease['easeInOutQuad']
                     });
};

}



var Container = function(c, element) {
	var t = this;
	this.container = null;
    this.hasFallen = false
    this.element = element;

	var random;


	do{
		random = Math.random() * 1200 + 50;
	} while (random > 600 && random < 800)
        
	this.draw = function() {
		  this.container = new fabric.Image(t.element, {
            width: 20,
            height: 30,
            left: 600,
            top: 50,
            originX: 'center',
            originY: 'center',
            selectable: false,
           
            
        });
            
		c.add(t.container);
		t.container.moveTo(100);
	}

	this.roll = function(rotation){

var newAngle = t.container.getAngle() + rotation;
		//console.log(newAngle);

		t.container.animate('angle', newAngle, {
			duration: 400,
 			//onChange: c.renderAll.bind(c),
 			onComplete: function(){
 				if(!t.fallen){
 					t.roll(rotation);
 				}
 			},
 	 		easing: fabric.util.ease['easeInOutQuad']
		});
    }
        
        
	this.fall = function(){
		
		var distance = Math.abs(1200 - random);

		horizontal(random);

		function horizontal(random){
			t.container.animate('left', random, {
			duration: 1000,
			//onChange: c.renderAll.bind(c),
			
			});
            t.container.animate('top', 200, {
			duration: 1000,
			//onChange: c.renderAll.bind(c),
			onComplete : function(){
					fall();
                    //console.log("it should fal now")
				}
			});
		};
		function fall(){
			t.container.animate('top', 850, {
			duration: 2000,
			//onChange: c.renderAll.bind(c),
			onComplete : function(){
				//c.remove(t.container);
                t.hasFallen = true;
              //  console.log("it should be fallen now")
               // canvas.remove(container.container);
			}
			});
		}	
	}
    
}


var Tnt = function(c, element) {
	var t = this;
	this.tnt = null;
    this.hasFallen = false
    this.element = element;

	var random;


	
	do{
		random = Math.random() * 1200 + 50;
	} while (random > 600 && random < 800)
        
	this.draw = function() {
		  this.tnt = new fabric.Image(t.element, {
            width: 20,
            height: 30,
            left: 600,
            top: 50,
            originX: 'center',
            originY: 'center',
            selectable: false,
           
            
        });
            
		c.add(t.tnt);
		t.tnt.moveTo(100);
	}

	this.roll = function(rotation){

var newAngle = t.tnt.getAngle() + rotation;
		//console.log(newAngle);

		t.tnt.animate('angle', newAngle, {
			duration: 350,
 			//onChange: c.renderAll.bind(c),
 			onComplete: function(){
 				if(!t.fallen){
 					t.roll(rotation);
 				}
 			},
 	 		easing: fabric.util.ease['easeInOutQuad']
		});
    }
        
        
	this.fall = function(){
		
		var distance = Math.abs(1200 - random);

		horizontal(random);

		function horizontal(random){
			t.tnt.animate('left', random, {
			duration: 1000,
			//onChange: c.renderAll.bind(c),
			
			});
            t.tnt.animate('top', 200, {
			duration: 1000,
			//onChange: c.renderAll.bind(c),
			onComplete : function(){
					fall();
                    //console.log("it should fal now")
				}
			});
		};
		function fall(){
			t.tnt.animate('top', 850, {
			duration: 2000,
			//onChange: c.renderAll.bind(c),
			onComplete : function(){
				//c.remove(t.container);
                t.hasFallen = true;
              //  console.log("it should be fallen now")
               // canvas.remove(container.container);
			}
			});
		}	
	}
    
}




var Rocket = function(c, left, element){
    
    var t = this
    this.rocket = null;
    this.element = element;
    this.hasHit = false;
    
    this.size = {
        width: 11,
        height: 50
    }
    
    this.position = {
        left: left,
        top: 840
    }

    /* this.position = {
        left: c.layerX,
        top: c.height-40 
    }*/
    this.draw = function(){
        
       // console.log(xPositionCursor + " +2")
        
        
        this.rocket = new fabric.Image(t.element,{
            width: 11,
            height: 50,
            left: t.position.left,
            top: t.position.top,
            originX: 'center',
            originY: 'bottom',
            selectable: false
        });
        
        c.add(t.rocket);
    };
  
    this.shoot = function(){
        t.rocket.animate('top', -20,{
            duration: 750,
            onComlete : function(){
            c.remove(t.rocket);
            
        } 
        });
    } 
    
    
    }


var BadRocket = function(c, left, element){
    var t = this
    this.badRocket = null;
    this.element = element;
    this.hasKilled = false;
      this.size = {
        width: 6,
        height: 25
    }
     this.position = {
        left: left,
        top: 260
    }
    
    this.draw = function(){
        this.badRocket = new fabric.Image(t.element,{
            width: 8,
            height: 40,
            left: t.position.left,
            top: 260,
            originX: 'center',
            originY: 'bottom',
            selectable: false
        });
        
        c.add(t.badRocket);
    };
      this.badShoot = function(enemyRocketsSpeed){
        t.badRocket.animate('top', 950,{
            duration: enemyRocketsSpeed,
            onComlete : function(){
            c.remove(t.badRocket);
            
        } 
        });
    } 
}
    


        
        