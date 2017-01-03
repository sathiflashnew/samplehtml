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
	tll.add(animateInLeft($(".animEl_1"), -20).play(), 3);
	tll.add(animateInLeft($(".animEl_2"), -20).play(), 5.5);
	tll.add(animateInLeft($(".animEl_3"), -20).play(), 8.2);
	tll.add(animateInLeft($(".animEl_4"), -20).play(), 12.3);
	tll.add(animateIn($("#dummySynch")).play(), 15.5);
}

/*---------------------End---------------------*/
