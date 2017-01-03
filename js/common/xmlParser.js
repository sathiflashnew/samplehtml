/**
 * @author Shigil.Gangadharan
 */

function xmlParser() {
	if (arguments.callee.instance) {
		return arguments.callee.instance;
	}
	this.eventsObj = [];
	arguments.callee.instance = this;
}

xmlParser.getInstance = function() {
	var singletonClass = new SingletonClass();
	return singletonClass;
};

xmlParser.getXml = function(_xmlPath) {
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", _xmlPath, false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;
	//this.dispatchCustomEvent("xmlLoaded")
	return xmlDoc;
};

/*
 xmlParser.addCustomEvent = function(event, callback) {
 this.eventsObj.push({
 "eventName" : event,
 "funcCallBack" : callback
 });
 };

 xmlParser.dispatchCustomEvent = function(arg) {
 for (var i = 0; i < eventsObj.length; i++) {
 if (eventsObj[i].eventName == arg) {
 eventsObj[i].funcCallBack();
 break;
 }
 }
 }; */
