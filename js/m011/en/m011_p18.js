/*---------------Page Init Functions---------*/
$(function() {
	imageLoader.load($('.pageWrapper'), controller.loadStyles);

});
function preloadingDone() {
	pageLoad = true;
	initAnimStates();
	controller.setPageVisited();
}

function audioFinish() {
	//controller.setPageVisited();
}

/*---------------Variable declartions---------*/
var tll;
var firstFlag = false;
$(document).ready(function() {
	

});
/*---------------------Functions---------------------*/
function playAnimation() {
	if (!firstFlag) {
		firstFlag = true;
		$(".page_exit").click(function() {
			exitBtn.trigger("click", controller.fnClick);
		});
	}
	if (tll) {
		tll.totalProgress(1).kill();
	}
	tll = new TimelineLite({
		onUpdate : updateSlider,
		onComplete : animCompleted
	});
    if (modCompleted) {
    	controller.assignTranscript(transcript[1]);
		$(".slide2").css("display", "none");
		$(".slide1").css("display", "block");
	} else {
		$(".slide1").css("display", "none");
		$(".slide2").css("display", "block");

	}
	tll.add(animateIn($(".animEl_2 p")).play(), 1);
	tll.add(animateIn($("#dummySynch")).play(), 7.5);
}

/*---------------------End---------------------*/
