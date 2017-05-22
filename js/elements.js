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
        width: 100,
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
            originY: 'bottom'
        });
        
        
        t.chicken.selectable = false;
        c.add(t.chicken);
        t.chicken.moveTo(100)
    };

    this.wobble = function(angle) {
        t.chicken.animate('angle', angle,{
            duration: 1000,
            onChange: c.renderAll.bind(c),
            onComplete: function(){
                if(!t.stop){
                    
                    if (angle == 10){
                       
                        t.wobble(-10)
                    } else{
                        t.wobble(10)
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
        width: 100,
        height: 53
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
        top: 130,
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
            duration: 4000,
           // onChange: c.renderAll.bind(c),
            onComplete: function(){
            if(!t.stop){
                console.log(newPosition)
                if(newPosition == 30){
                    console.log(newPosition)
                    t.run(c.width-30);
                    t.rat.set('flipX', true);
                } else{
                    console.log(newPosition + " 3")
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

var Egg = function(c) {
	var t = this;
	this.egg = null;
    this.hasFallen = false

	this.size = {
		rX: 25,
		rY: 18
	}

	var random;

	do{
		random = Math.random() * 600 + 50;
	} while (random > 300 && random < 400)


	this.draw = function() {
		this.egg = new fabric.Ellipse({
	        left: 350,
	        top: 115,
	        originX: 'center',
	        originY: 'center',
	        rx: t.size.rX,
	        ry: t.size.rY,
	        fill: '#ffe6ad',
	        stroke:'#6b5b2a',
	        strokeWidth: 1,
	        selectable: false
		});

		c.add(t.egg);
		t.egg.moveTo(-100);
	}

	this.roll = function(rotation){

var newAngle = t.egg.getAngle() + rotation;
		//console.log(newAngle);

		t.egg.animate('angle', newAngle, {
			duration: 600,
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
		
		var distance = Math.abs(350 - random);

		horizontal(random);

		function horizontal(random){
			t.egg.animate('left', random, {
			duration: distance * 8,
			//onChange: c.renderAll.bind(c),
			onComplete : function(){
					fall();
				}
			});
		};
		function fall(){
			t.egg.animate('top', 450, {
			duration: 1000,
			//onChange: c.renderAll.bind(c),
			onComplete : function(){
				c.remove(t.egg);
                t.hasFallen = true;
                
			}
			});
		}	
	}
    
}


        
        