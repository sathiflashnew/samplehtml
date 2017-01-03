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
	tll.add(animateIn($(".animEl_0")).play());
	$($(".animEl_1 li")).each(function(index) {
		
		tll.add(animateInLeft($(this), -20).play(), 2 + index);
	});
	$($(".animEl_3")).each(function(index) {
		alert("::::");
		tll.add(animateInLeft($(this), -60).play(), 6 + index);
	});
	tll.add(animateIn($(".animEl_2 p")).play(), 1);
	tll.add(animateIn($("#dummySynch")).play(), 9.5);
}

/*---------------------End---------------------*/
