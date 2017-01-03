$(function() {
	imageLoader.load($('.pageWrapper'), controller.loadStyles);
});
function preloadingDone() {
	pageLoad = true;
	initAnimStates();
}

function audioFinish() {

	scrubberBool = true;
	$(".page_overlay").css("display", "none");
}

var tll;
var accords = 3;
var accord_id;
var scrubberBool = false;
var accord_idno;
var accord_active = false;
var clickfn = false;
var prev_accord=0;
var popupAudios = ["m011_p10.mp3", "m011_p10_1.mp3", "m011_p10_2.mp3", "m011_p10_3.mp3"];

var tabVisitedArr = [0, 0, 0];
var interactiveCount = [1, 1, 1];
$(document).ready(function() {

	//repBool=true;
	$(".page_overlay").css("display", "block");
	$(".content").hide();
	$(".header").click(function() {

		if (scrubberBool) {

			accord_id = this.id;
			curr_accord = accord_id.split("_")[1];
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");

			} else {
				$(this).addClass("active");
			}
			$("#accord_" + curr_accord + " span").addClass("Clicked");
			$("#accord_content_" + curr_accord).slideToggle();
			//console.log(curr_accord + "::::::::::::::::::" + prev_accord);
			if (curr_accord != prev_accord) {
				$("#accord_content_" + prev_accord).slideUp();
				$("#accord_" + prev_accord).removeClass("active");
				//console.log(curr_accord + ":::::" + prev_accord);
				interActivityPage = true;
				showAudioLoading = true;
				audioPlayer.loadAudioPath(model.audioPath + popupAudios[curr_accord]);
				controller.assignTranscript(transcript[curr_accord]);
				prev_accord = curr_accord;
				tabVisitedArr[curr_accord - 1] = 1;
				if (String(tabVisitedArr) == String(interactiveCount)) {
					controller.setPageVisited();
				}
			} else {
				prev_accord = 0;
				controller.assignTranscript(transcript[0]);
				audioPlayer.audioReset();
			}

		}

	});

	$(".header").on("mouseover", function() {
		Fn_CallBack();
	});

});

function playAnimation(type) {

	if (!interActivityPage) {
        scrubberBool=false;
		$(".content").hide();
		$(".header").removeClass("active");
	} else {
	}
	if (tll) {
		tll.totalProgress(1).kill();
	}
	tll = new TimelineLite({
		onUpdate : updateSlider,
		onComplete : animCompleted
	});
	if (type != "interActivity") {
		scrubberBool = false;
		tll.add(animateIn_show($(".animE1_0")).play(), 0.5);
		tll.add(animateIn($(".animE1_1")).play(), 6);
		tll.add(animateInLeft($(".animE1_2"), -20).play(), 6.5);
		tll.add(animateInLeft($(".animE1_3"), -20).play(), 11.5);
		
		tll.add(animateOut_hide($(".animE1_0")).play(), 26.4);
		tll.add(animateIn_show($(".animE1_4")).play(), 26.8);
		tll.add(animateIn_show($(".animE1_5")).play(), 26.5);
		
		tll.add(animateIn($("#dummySynch")).play(), 29.5);
	} else {
		

	}
}

function Fn_CallBack() {
	if (scrubberBool) {
		$(".header").css("cursor", "pointer");
	} else {
		$(".header").css("cursor", "default");
	}
}

