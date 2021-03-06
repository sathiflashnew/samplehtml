/*---------------Page Init Functions---------*/
$(function() {
	imageLoader.load($('.pageWrapper'), controller.loadStyles);
	
});
function preloadingDone() {
	pageLoad=true;
	initAnimStates();
	//controller.setPageVisited();
}
function audioFinish() {
	controller.setPageVisited();
}
/*---------------Variable declartions---------*/
var tll;
$(document).ready(function() {
	$(".clickText").css("display", "none");

	$("#popup_btn").click(function() {
		$(".clickText").css("display", "block");

	});
	$(".close").click(function() {
		$(".clickText").css("display", "none");

	});

});
/*---------------------Functions---------------------*/
function playAnimation() {
	if (tll) {
		tll.totalProgress(1).kill();
	}
	tll = new TimelineLite({
		onUpdate : updateSlider,
		onComplete : animCompleted
	});
	tll.add(animateIn($(".animEl_0")).play(),0.6);
	tll.add(animateInLeft($(".animEl_1"), -20).play(), 3);
	tll.add(animateInLeft($(".animEl_2"), -20).play(), 5);
	tll.add(animateInLeft($(".animEl_3"), -20).play(), 5.6);
	tll.add(animateInLeft($(".animEl_4"), -20).play(), 6.5);
	tll.add(animateInLeft($(".animEl_5"), -20).play(), 7.2);	
	tll.add(animateInLeft($(".animEl_6"), -20).play(), 8);
	tll.add(animateInLeft($(".animEl_7"), -20).play(), 8.4);
	tll.add(animateInLeft($(".animEl_8"), -20).play(), 9.6);
	tll.add(animateInLeft($(".animEl_9"), -20).play(), 13);
	tll.add(animateInLeft($(".animEl_10"), -20).play(), 17.3);
	tll.add(animateInLeft($(".animEl_11"), -20).play(), 17.6);
	tll.add(animateInLeft($(".animEl_12"), -20).play(), 18.7);
	tll.add(animateInLeft($(".animEl_13"), -20).play(), 19.5);
	tll.add(animateInLeft($(".animEl_14"), -20).play(), 20.4);
	
	tll.add(animateIn($("#dummySynch")).play(), 25.5);
}

function animateIn(el) {
	TweenLite.set(el, {
		clearProps : 'opacity'
	});
	var tl = new TimelineLite({
		paused : true
	}, {
		class : "+=listbg"
	}).from(el, 1, {
		autoAlpha : 0
	});
	return tl;
}
function animateInLeft(el, pos) {
	TweenLite.set(el, {
		clearProps : 'opacity'
	});
	var tl = new TimelineLite({
		paused : true
	}, {
		class : "+=listbg"
	}).from(el, .2, {
		autoAlpha : 0,
		left : pos + "px"
	});
	return tl;
}
function animateOut(el) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, 1, {
		opacity : 0
	});
	return tl;
}
function leftPos(elem) {
	var curleft = 0;
	if (elem.offsetParent) {
		do {
			curleft += elem.offsetLeft;
		} while (elem = elem.offsetParent);
	}
	return curleft;
}
/*---------------------End---------------------*/
