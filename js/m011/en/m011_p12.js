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
	tll.add(animateIn($(".animEl_0")).play(),0);
	/*$($(".animEl_1 li")).each(function(index) {
		var temp= 1+index;
		tll.add(animateInLeft($(this), -20).play(), 3*temp);
	});
	$($(".animEl_3")).each(function(index) {
		
		tll.add(animateInLeft($(this), -60).play(), 6 + index);
	});*/
	tll.add(animateInLeft($(".animEl_1"),-20).play(), 7);
	tll.add(animateInLeft($(".animEl_2"), -20).play(), 10);
	tll.add(animateIn($("#dummySynch")).play(), 10.5);
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
