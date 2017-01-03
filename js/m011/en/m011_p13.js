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
	tll.add(animateIn($(".animEl_0")).play(),0.0);
	tll.add(animateIn($(".animEl_1")).play(),14);
	tll.add(animateIn($(".animEl_2")).play(),20.2);
	tll.add(animateIn($(".animEl_3")).play(),30.5);
	tll.add(animateIn($("#dummySynch")).play(), 34.5);
}


/*---------------------End---------------------*/
