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
