// OnLoad
// Bring the elements out slowly
$(window).load(function() {
	isTablet();
	/* Play with the opacity style */
	/**
	$("#firstClass").css("opacity","0");
	$("#secondClass").css("opacity","0");
	$("#thirdClass").css("opacity","0");
	$("#firstClass").animate({opacity: "1"},300);
	$("#secondClass").animate({opacity: "1"},300);
	$("#thirdClass").animate({opacity: "1"},300);
	**/
	$("#content").animate({"opacity":"1"},300);
});

$(".imgback").mouseenter(function() {
	$("#back").css("color","#FFF000");
	$("#imgRetour").attr("src","../img/cloudDark.png");
});

$(".imgback").mouseleave(function() {
	$("#back").css("color","#FF0000");
	$("#imgRetour").attr("src","../img/cloud.png");
});

// Determine if the device is a tablet or not
var tablet = false;
function isTablet() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		 tablet = true;
	}
}

//==========================================================================================================================================================>
// Some prototype really usefull for moving the data inside the array -
//==========================================================================================================================================================>

/*  For shuffle the table and take only the number of element usefull for our game */
Array.prototype.shuffle = function(n) {
	if(n == 0) {
		n = this.length;		
	} else {
        var i = randomInt(0, n-1);
        var tmp = this[i];
        this[i] = this[n-1];
        this[n-1] = tmp;
        this.shuffle(n-1);		
	}
}

function randomInt(mini, maxi)
{
     var nb = mini + (maxi+1-mini)*Math.random();
     return Math.floor(nb);
}

Array.prototype.destructor = function(n) {
	for(var i=this.length;n<this.length;i--) {
		this.pop();
	}	
}


//==========================================================================================================================================================>
//The shitty game, nothing transcendent :(
//==========================================================================================================================================================>
// is the document ready ? If yes, let's go !
$(document).ready(function() {
	
	/* Retaining the informations about the elements */
	var animals = [];

	/* The number of elements possible */
	/* TODO Futur implementation possible : Changing the number of element as we wish */
	var collection = 5;
	
	/* The number of good answer, if (countGoodAnswer == collection) you win ! */
	var countGoodAnswer = 0;

	/* Are we dragging something ? */
	var drag = false;
	
	/* Where are we dragging the thing ? */
	var inside = 0;
	
	/* The category assiociated to the div */
	var category = null;
	
	/* The object that we are dragging */
	var tmp;	
	
	var positionX = 0;
	var positionY = 0;
	
	/* Strating the game */
	newGame();
	
	function reset() {
		/* Hidding the win msg and showing the table */
		$("#win").css("opacity","0");
		$("#win").html("BRAVO !");
		$("#data").show();
		
		/* Removing all the element well placed in the areas. Removing also the br */
		$(".elem").remove();
		$("#firstClass br").remove();
		$("#secondClass br").remove();
		$("#thirdClass br").remove();
		
		/* New Categories */
		parseXMLCategories();
		CATEGORIES.shuffle(CATEGORIES.length);
		CATEGORIES.destructor(3);
		//TODO Transformer les images du html
		$("#img1").attr("src","../img/"+CATEGORIES[0]+".png");
		$("#img2").attr("src","../img/"+CATEGORIES[1]+".png");
		$("#img3").attr("src","../img/"+CATEGORIES[2]+".png");
		
		/* Creating a new table */
		var cols = "";
		for(var i=0;i<collection;i++) {
			cols = cols+"<td></td>";
		}
		$("#data").html("<tr>"+cols+"</tr>");
		
		/* reset the table */
		animals = [];
	}
	
	/**
	 * Parse the xml document !
	 * Usefull for gathering the datas 
	 */
	function parseXML() {
		var xmlhttp,xmlDoc,x;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "../xml/animals.xml", false);
		xmlhttp.send();
		xmlDoc = xmlhttp.responseXML; 
		var count = xmlDoc.getElementsByTagName("animal");
		var name = xmlDoc.getElementsByTagName("name");
		var img = xmlDoc.getElementsByTagName("img");
		var category = xmlDoc.getElementsByTagName("category");
		var paw = xmlDoc.getElementsByTagName("paw");
		var home = xmlDoc.getElementsByTagName("home");
		for (var i=0;i<count.length;i++) {
			var tmp = [];
			tmp[0] = name[i].childNodes[0].nodeValue;
			tmp[1] = img[i].childNodes[0].nodeValue;
			tmp[2] = category[i].childNodes[0].nodeValue;
			tmp[3] = paw[i].childNodes[0].nodeValue;
			tmp[4] = home[i].childNodes[0].nodeValue;
			if($.inArray(tmp[REGEX], CATEGORIES) != -1) {
				animals[animals.length] = tmp;
			}
		}
	}	

	function deleteDouble() {
		for(var i=0;i<CATEGORIES.length;i++) {
			for(var j=0,z=0;j<animals.length;j++) {
				if(CATEGORIES[i]==animals[j][REGEX]) {
					z++;
					if(z>3) {
						animals.splice(j,1);
						j--;
					}
				}
			}
		}
	}
	
	/*
	 * Adding the new elements into the table
	 */
	function newElements() {
		for(var i=0;i<($("#data").find("tr:first td").length);i++) {
				$( "td:eq( "+i+" )" ).html(picture(animals[i]));
		}
	}	
	
	/* It's always better with style, bring them out with the opacity */
	function animation() {
		for(var i=0;i<($("#data").find("tr:first td").length);i++) {
			$("td:eq( "+i+" ) div").animate({opacity: "1"},500);
		}
	}
	
	
	/* Starting the game ! Let's play ! */
	function newGame() {
		reset();
		parseXML();
		animals.shuffle(animals.length);
		deleteDouble();
		animals.destructor(collection);
		newElements();
		animation();
		resize();
		
		countGoodAnswer = 0
		$( ".elem" ).draggable();
		
		
	    $(".elem").on("dragstart", function() {
	    	$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
	    	tmp = $(this).clone();
	    	drag = true;
			resize();
	    });
	    
	    var currentMousePos = { x: -1, y: -1 };
	    $(document).mousemove(function(event) {
	        currentMousePos.x = event.pageX;
	        currentMousePos.y = event.pageY;
	    });
	    
	    $(".elem").on("drag", function() {
	    	if(currentMousePos.x>=$('body').width()-80 || currentMousePos.x<=80 || currentMousePos.y<=80 || currentMousePos.y>=$('body').height()-80) {
		    	console.log(currentMousePos.x);	
		    	$(".elem").one(trigger("dragstop"));
		    	$(document).trigger("mousedown");
	    	}
	    });
	    
	    $(document).on('touchstart', function(e) {
	    	  positionX = e.originalEvent.touches[0].pageX;
	    	  positionY = e.originalEvent.touches[0].pageY;
	    });
	    
	    if(!tablet) {
		    $(".elem").on("dragstop", function() {
	    		var insidetmp = inside;
		    	if(category==$(this).attr("data-result")) {
		    		$(this).remove();
		    		$(insidetmp).css("background","#00FF00");
		    		$(insidetmp).animate({"zIndex":"200"},200,function() {
		    			$(insidetmp).css("background","#FFFFFF");
		    			$(insidetmp).css("zIndex","0");
		    		});
		    		$(inside).append("<br />");
		    		$(inside).append(tmp);
		    		$(inside).append("<br />");
		    		countGoodAnswer++;
		    		category = null;
		    		if(collection == countGoodAnswer) {
		    			win();	
		    		} else {
		    			var audio = new Audio('../sound/good.mp3');
		    			audio.play();
			    		$(insidetmp).animate({"zIndex":"200"},200,function() {
			    			$(insidetmp).css("background","#FFFFFF");
			    			$(insidetmp).css("zIndex","auto");
			    		});
		    		}
		    	} else {
		    		$(insidetmp).css("background","#FF0000");
		    		$(insidetmp).animate({"zIndex":"200"},200,function() {
		    			$(insidetmp).css("background","#FFFFFF");
		    			$(insidetmp).css("zIndex","0");
		    		});
		    		var audio = new Audio('../sound/bad.mp3');
		    		audio.play();
		    		category = null;
		    	    $(this).animate({
		    	        top: "0px",
		    	        left: "0px"
		    	    });
		    	}
		    	drag = false;
		  });	
	    }
	}
    
	/* Win-win */
	function win() {
		$("#win").css("opacity","1");
		$("#data").hide();
		drag = false;
		var audio = new Audio('../sound/clap.mp3');
		audio.play();
		/* Little timer, the nigga user has to see that he has won */
		setTimeout(function(){
			newGame();
		}, 2000);
	}
	
// ==========================================================================================================================================================>
// The invisible div, they are usefull for knowing where we are dragging the elements.
// ==========================================================================================================================================================>
	
		document.addEventListener('touchend', function(event) {
			var X = event.changedTouches[0].pageX - positionX;
			var Y = event.changedTouches[0].pageY - positionY;
		    var endTarget = document.elementFromPoint(
		            event.changedTouches[0].pageX,
		            event.changedTouches[0].pageY
		        );
		    	if(endTarget.id=="firstGhost") {
		    		inside="#firstClass";
		    		category = CATEGORIES[0];
		      	  	$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
		    	} else if(endTarget.id=="secondGhost") {
		    		inside="#secondClass";
		    		category = CATEGORIES[1];
		      	  	$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
		    	} else if(endTarget.id=="thirdGhost") {
		    		inside="#thirdClass";
		    		category = CATEGORIES[2];
		    		$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
		    	}
	    		insidetmp = inside;
	    		var $target = event.target;
	    		if(inside!=0) {   			
			    	if(category==event.target.getAttribute("data")) {
			    		$(event.target.parentElement).remove();
			    		$(insidetmp).css("background","#00FF00");
			    		$(insidetmp).animate({"zIndex":"200"},200,function() {
			    			$(insidetmp).css("background","#FFFFFF");
			    			$(insidetmp).css("zIndex","0");
			    		});
			    		$(inside).append("<br />");
			    		$(inside).append(tmp);
			    		$(inside).append("<br />");
			    		countGoodAnswer++;
			    		category = null;
			    		if(collection == countGoodAnswer) {
			    			win();	
			    		} else {
			    			var audio = new Audio('../sound/good.mp3');
			    			audio.play();
				    		$(insidetmp).animate({"zIndex":"200"},200,function() {
				    			$(insidetmp).css("background","#FFFFFF");
				    			$(insidetmp).css("zIndex","auto");
				    		});
			    		}
			    	} else {
			    		$(insidetmp).css("background","#FF0000");
			    		$(insidetmp).animate({"zIndex":"200"},200,function() {
			    			$(insidetmp).css("background","#FFFFFF");
			    			$(insidetmp).css("zIndex","0");
			    		});
			    		var audio = new Audio('../sound/bad.mp3');
			    		audio.play();
			    		category = null;
			    	    $(event.target.parentElement).animate({
			    	        top: "0px",
			    	        left: "0px"
			    	    },300);
			    	}
	    		} else {
		    	    $(event.target.parentElement).animate({
		    	        top: "0px",
		    	        left: "0px"
		    	    },300);   			
	    		}
				inside=0;
				category = null;
			});	
	
	    $("#firstGhost").mouseenter(function() {
	    	if(drag) {
	    		inside="#firstClass";
	    		category = CATEGORIES[0];
	      	  	$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
	    	}
	    });
	  
	    $("#secondGhost").mouseenter(function() {
	    	if(drag) {
	    		inside="#secondClass";
	    		category = CATEGORIES[1];
	      	  	$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
	    	}
	    });
	    
	    $("#thirdGhost").mouseenter(function() {
	    	if(drag) {
	    		inside="#thirdClass";
	    		category = CATEGORIES[2];
	    		$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
	    	}
	    });     
	    
	    $("#firstGhost,#secondGhost,#thirdGhost").mouseleave(function() {
			inside=0;
			category = null;
	    });	
	    
 // ==========================================================================================================================================================>
 // The return menu, if we wanna go back to the menu
 // ==========================================================================================================================================================>	
	$("#back").click(function() {
		$(location).attr('href',"../index.html");
	});


// ==========================================================================================================================================================>
// Responsible design, that's a win-win style and that's amazing :)
// All i gotta do is just resize that shit
// ==========================================================================================================================================================>		
	$( window ).resize(function() {
		resize();
	});
	
	$(window).bind('contextmenu', function(e){
	    return false;
	}); 
	
	function resize() {
		var heightDiv = $("#secondGhost").height();
		var heightImg = $(".img").height();
		if(heightDiv<heightImg) {
			$(".img").css("height","100%");
			$(".img").css("width","auto");
		} else {
			$(".img").css("height","auto");
			$(".img").css("width","100%");
		}
		
		if($(window).height()<720) {
			$(".elem").css("width","70px");
			$(".elem").css("height","70px");
		} else if($(window).width()<1050 || $(window).height()<850) {
			$(".elem").css("width","100px");
			$(".elem").css("height","100px");
		} else if($(window).height()<950) {
			$(".elem").css("width","120px");
			$(".elem").css("height","120px");	
		} else {
			$(".elem").css("width","150px");
			$(".elem").css("height","150px");			
		}
	}
});