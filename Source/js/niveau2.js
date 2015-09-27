/* Constant */
var CATEGORIES = [];
var REGEX=3;

function parseXMLCategories() {
	var xmlhttp,xmlDoc,x;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "../xml/animals.xml", false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML; 
	var count = xmlDoc.getElementsByTagName("animal");
	var category = xmlDoc.getElementsByTagName("paw");
	for (var i=0;i<count.length;i++) {
		var tmp = $.inArray(category[i].childNodes[0].nodeValue, CATEGORIES);
		if(tmp == -1) {
			CATEGORIES[CATEGORIES.length] = category[i].childNodes[0].nodeValue;
		}
	}
}

/*
 * Creating the new element and returning it.
 */
function picture(animal) {
	var object = $('<div></div>');
	object.append('<img src="'+animal[1]+'" alt="image" width="100%"/>');
	object.addClass("elem");
	object.attr("data-result",animal[3]);
	object.css("opacity","0");
	return object;
}	