/*---------------Page Init Functions---------*/
$(function() {
	imageLoader.load($('.pageWrapper'), controller.loadStyles);

});
function preloadingDone() {
	pageLoad = true;
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
	tll.add(animateIn_show($(".animEl_0")).play(), 0.1);
	tll.add(animateOut_hide($(".animEl_0")).play(), 5);
	tll.add(animateIn_show($(".animEl_1")).play(), 5);
	tll.add(animateInLeft($(".animEl_3"),-20).play(), 11);
	tll.add(animateInLeft($(".animEl_4"),-20).play(), 11.7);
	tll.add(animateInLeft($(".animEl_5"),-20).play(), 12.5);
	tll.add(animateInLeft($(".animEl_6"),-20).play(), 13);
	tll.add(animateInLeft($(".animEl_7"),-20).play(), 16);
	tll.add(animateInLeft($(".animEl_8"),-20).play(), 16.5);

	tll.add(animateChangeColor($(".animEl_7"),"#f00").play(), 17.5);
	tll.add(animateChangeColor($(".animEl_8"),"#f00").play(), 17.5);
	tll.add(animateOut_hide($(".animEl_1")).play(), 22);
	tll.add(animateIn_show($(".animEl_2")).play(), 22.5);
	tll.add(animateIn($("#dummySynch")).play(), 26.5);
}


/*---------------------End---------------------*/
