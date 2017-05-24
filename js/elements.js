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






var Chicken = function(c, left, top, element){
    var t = this
    this.chicken = null;
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
    t.chicken = null;
    
    this.draw = function() {
        t.chicken = new fabric.Image(t.element, {
            width: t.size.width,
            height: t.size.height,
            left: t.position.left,
            top: t.position.top,
            originX: 'center',
            originY: 'top'
        });
        
        
        t.chicken.selectable = false;
        c.add(t.chicken);
        t.chicken.moveTo(100)
    };

    this.wobble = function(angle) {
        t.chicken.animate('angle', angle,{
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
    
    
var Basket = function(c, element){
    var t = this
    this.basket = null;
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
        t.basket = new fabric.Image(t.element, {
            width: t.size.width,
            height: t.size.height,
            left: t.position.left,
            top: t.position.top,
            originX: 'center',
            originY: 'bottom',
            selectable: false
        });
        
        c.add(t.basket);
    };
}



//RAT

var Rat = function(c, element){
    var t = this
    this.rat = null;
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
        t.rat = new fabric.Image(t.element, {
            width: t.size.width,
            height: t.size.height,
            left: t.position.left,
            top: t.position.top,
            originX: 'center',
            originY: 'bottom',
            selectable: false
        });
        
        c.add(t.rat);
    };


    this.run = function(newPosition){
       t.rat.animate('left', newPosition, {
            duration: 2000,
           // onChange: c.renderAll.bind(c),
            onComplete: function(){
            if(!t.stop){
                //console.log(newPosition)
                if(newPosition == 30){
                  //  console.log(newPosition)
                    t.run(c.width-30);
                    t.rat.set('flipX', true);
                } else{
                   // console.log(newPosition + " 3")
                    t.run(30);
                    t.rat.set('flipX', false);
                }
            }
            },
                 easing: fabric.util.ease['easeInOutQuad']
                     });
};

}




	do{
		random = Math.random() * 600 + 50;
	} while (random > 300 && random < 400)

var Container = function(c, element) {
	var t = this;
	this.container = null;
    this.hasFallen = false
    this.element = element;

	var random;

	do{
		random = Math.random() * 600 + 50;
	} while (random > 300 && random < 400)


	this.draw = function() {
		  this.container = new fabric.Image(t.element, {
            width: 20,
            height: 30,
            left: 350,
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
		
		var distance = Math.abs(450 - random);

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
			t.container.animate('top', 750, {
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
    
    this.size = {
        width: 11,
        height: 50
    }
    
    this.position = {
        left: left,
        top: 640
    }

    /* this.position = {
        left: c.layerX,
        top: c.height-40 
    }*/
    this.draw = function(){
        
       // console.log(xPositionCursor + " +2")
        
        
        this.rocket = new fabric.Image(t.element,{
            width: t.size.width,
            height: t.size.height,
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
    


        
        