$(window).load(function() {
    $("#load").animate({"opacity":"0"},50);
	$("#content").animate({"opacity":"1"},300);
});

// is the document ready ?
$(document).ready(function() {
    // Définir la liste d'images
    images = new Array();
    images[0]="img/0.png";
    images[1]="img/2.png";
    images[2]="img/4.png";
    images[3]="img/aigle.png";
    images[4]="img/basket.png";
    images[5]="img/canard.png";
    images[6]="img/cat.png";
    images[7]="img/cave.png";
    images[8]="img/chauveSouris.png";
    images[9]="img/cloud.png";
    images[10]="img/cloudDark.png";
    images[11]="img/dauphin.png";
    images[12]="img/dog.png";
    images[13]="img/elephant.png";
    images[14]="img/farm.png";
    images[15]="img/hole.png";
    images[16]="img/home.png";
    images[17]="img/horse.png";
    images[18]="img/hyene.png";
    images[19]="img/icefloe.png";
    images[20]="img/lion.png";
    images[21]="img/mole.png";
    images[22]="img/mouette.png";
    images[23]="img/mulet.png";    
    images[24]="img/nest.png";   
    images[25]="img/orque.png";
    images[26]="img/otarie.png";
    images[27]="img/ours.png";
    images[28]="img/ours2.png";
    images[29]="img/oursPolaire.png";
    images[30]="img/panthere.png";
    images[31]="img/panthereNeige.png";
    images[32]="img/pen.png";
    images[33]="img/penguin.png";
    images[34]="img/pigeon.png";
    images[35]="img/pony.png";
    images[36]="img/puppy.png";
    images[37]="img/requin.png";
    images[38]="img/savanna.png";
    images[39]="img/snake.png";
    images[40]="img/water.png";
    images[41]="img/wild.png";

    
    var cal = $("#barFull").width()/41;
    var gAllImages = [];
    // Démarrer le préchargement
    for(var i=0; i<images.length; i++)
    {
         imageObj = new Image();
         imageObj.src=images[i];
         if(i!=images.length-1) {
             imageObj.onload = checkForAllImagesLoaded;
         }
    }
    function checkForAllImagesLoaded()
    {
    	$("#bar").css("width",cal+$("#bar").width()+"px");
    }
    
	// Design when the mouse enter
	$(".level").mouseenter(function() {
		$(this).css('transform', 'scale(1.02)');
		$(this).css('box-shadow', '0px 0px 0px 2px #ffff00');
	});
	
	//Design when the mouse leave
	$(".level").mouseleave(function() {
		$(this).css('transform', 'scale(1)');
		$(this).css('box-shadow', '0px 0px 0px 2px transparent');
	});
	
	$("#niveau1").mouseenter(function(){
		$(this).attr("src","img/menudoghover.png");
	});
	
	$("#niveau1").mouseleave(function(){
		$(this).attr("src","img/menudog.png");
	});
	
	$("#niveau2").mouseenter(function(){
		$(this).attr("src","img/menulionhover.png");
	});
	
	$("#niveau2").mouseleave(function(){
		$(this).attr("src","img/menulion.png");
	});
	
	$("#niveau3").mouseenter(function(){
		$(this).attr("src","img/menufishhover.png");
	});
	
	$("#niveau3").mouseleave(function(){
		$(this).attr("src","img/menufish.png");
	});
	
	//Redirection directly in the link
	$("#niveau1").click(function() {
		$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
		$(location).attr('href',"./src/niveau1.html");
	});
	
	$("#niveau2").click(function() {
		$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
		$(location).attr('href',"./src/niveau2.html");
	});
	
	$("#niveau3").click(function() {
		$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
		$(location).attr('href',"./src/niveau3.html");
	});
	
	$(window).bind('contextmenu', function(e){
	    return false;
	}); 
});
