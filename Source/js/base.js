// is the document ready ?
$(document).ready(function() {
	
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
	$("#Nv1").click(function() {
		$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
		$(location).attr('href',"./src/niveau1.html");
	});
	
	$("#Nv2").click(function() {
		$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
		$(location).attr('href',"./src/niveau2.html");
	});
	
	$("#Nv3").click(function() {
		$(this).css("cursor", 'url("../img/cursor.png"),url("../img/cursor2.png"),auto');
		$(location).attr('href',"./src/niveau3.html");
	});
	
	$(window).bind('contextmenu', function(e){
	    return false;
	}); 
});
