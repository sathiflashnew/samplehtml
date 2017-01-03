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
	tll.add(animateIn($(".animEl_0")).play(),0.2);
	tll.add(animateOut($(".animEl_0")).play(),4);
	tll.add(animateIn($(".animEl_1")).play(),4.5);
	tll.add(animateOut($(".animEl_1")).play(),11.5);
	
	tll.add(animateIn($(".animEl_2")).play(),12);
	
	
	
	tll.add(animateIn($("#dummySynch")).play(), 28.5);
}

/*---------------------End---------------------*/
