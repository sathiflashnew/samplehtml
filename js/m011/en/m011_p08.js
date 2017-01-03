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
	if (device.AndroidPhone() || device.iPhone()) {
		tll.add(animateIn($(".animEl_0")).play());
		$($(".animEl_1 li")).each(function(index) {
			var temp = index + 1;
			if (temp == 1) {
				tll.add(animateIn_show($(this)).play(), 0);
			} else {
				if (temp == 2) {
					tll.add(animateOut_hide($(this).prev()).play(), 7);
					tll.add(animateIn_show($(this)).play(), 7.5);
				} else if (temp == 3) {
					tll.add(animateOut_hide($(this).prev()).play(), 8);
					tll.add(animateIn_show($(this)).play(), 8);
				} else if (temp == 4) {
					tll.add(animateOut_hide($(this).prev()).play(), 9.5);
					tll.add(animateIn_show($(this)).play(), 9.5);
				} 
			}
		});
		tll.add(animateIn($("#dummySynch")).play(), 10.5);
	} else {
		tll.add(animateIn($(".animEl_0")).play());
		$($(".animEl_1 li")).each(function(index) {
			var temp = index + 1;
			if (temp == 1) {
				tll.add(animateInLeft($(this), -20).play(), 0);
			} else {
				if (temp == 2) {
					tll.add(animateInLeft($(this), -20).play(), 7.5);
				} else if (temp == 3) {
					tll.add(animateInLeft($(this), -20).play(), 8.5);
				} else if (temp == 4) {
					tll.add(animateInLeft($(this), -20).play(), 9.5);
				} 
			}
		});
		$($(".animEl_3")).each(function(index) {

			tll.add(animateInLeft($(this), -60).play(), 6 + index);
		});
		tll.add(animateIn($(".animEl_2 p")).play(), 1);
		tll.add(animateIn($("#dummySynch")).play(), 10.5);
	}

}

