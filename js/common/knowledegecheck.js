var score = 0;
var corrAns;
var userSelection;
var totQuestCount = 0;
var currentQuest = 0;
var quesType = new Array();
var quesArr = new Array();
var optionArr = new Array();
var noOptionArr = new Array();
var corrAnsArr = new Array();
var corrFeedback = new Array();
var IncorrFeedback = new Array();
var FirstIncorrFeedback = new Array();
var LastIncorrFeedback = new Array();
var noOfTries = 2;
var countTries = 0;
var currDivisio = 0;
var userAns = new Array();
var tryAgainTxt = "";
var SolnTxt = "";
var tll;
var firstTime = true;
var corrCnt = 0;
var userAnsCnt = 0;
var correctAns;
var scrubberBool = false;
var NoOfOptions;
var animIntervals = 0;
$(function() {
	imageLoader.load($('.pageWrapper'), controller.loadStyles);
});
function preloadingDone() {
	pageLoad = true;
	initAnimStates();
	$("#close").css("cursor", "pointer");
}

function assignExternalData() {
	totQuestCount = 0;
	if (currentExtDataPath != "") {
		$.each(ExternalData, function(key, value) {
			if (key == "tryAgainText") {
				tryAgainTxt = value.text;
			} else if (key == "solutionText") {
				SolnTxt = value.text;
			} else if (key == "submitTxt") {
				submitTxt = value.text;
			} else if (key == "transcript") {
				transcript = value.text;
			} else if (key == "animations_page") {
				animIntervals = value.text;
				animIntervals = animIntervals.split(",");
			} else if (key != "questionsData") {
				$("." + key).html(value.text);
			} else {
				$.each(ExternalData.questionsData, function(key, qusData) {
					quesType[totQuestCount] = qusData.qusType;
					quesArr[totQuestCount] = qusData.question;
					optionArr[totQuestCount] = qusData.Options;
					corrAnsArr[totQuestCount] = qusData.correctAnswer;
					corrFeedback[totQuestCount] = qusData.correctFeedback;
					IncorrFeedback[totQuestCount] = qusData.InCorrectFeedback;
					FirstIncorrFeedback[totQuestCount] = qusData.FirstInCorrectFeedback;
					LastIncorrFeedback[totQuestCount] = qusData.LastInCorrectFeedback;
					totQuestCount++;
				});
			}

		});
	}
	loadQuestion();
	controller.assignTranscript(transcript[0]);
	audioPlayer.StartAnimation();

};

function fnReset() {
	score = 0;
	userSelection;
	currentQuest = 0;
	noOfTries = 2;
	countTries = 0;
	currDivisio = 0;
	corrCnt = 0;
	userAnsCnt = 0;
	correctAns;
	userAns = new Array();
	$(".fb_overlay").hide();
	$(".Next_Button").css("cursor", "default");
	$(".Next_Button").addClass("submitBtnDeactive");
	$(".Next_Button").unbind();
	$(".Next_Button").html(submitTxt);
	firstTime = true;
	loadQuestion();
}

function playAnimation() {
	//alert($(".fb_overlay").css("display"));
	if ($(".fb_overlay").css("display") == "block") {
		//when replay, reset the next, back disable to enable for the feedback popup
		controller.nextBackEnable();
	}
	if (!firstTime) {
		fnReset();
	}

	if (tll) {
		tll.totalProgress(1).kill();
	}
	tll = new TimelineLite({
		onUpdate : updateSlider,
		onComplete : animCompleted
	});
	$(".animsint").each(function(index) {
		tll.add(animateIn($(this)).play(), animIntervals[index]);
	});
	tll.add(animateIn($(".animEl_00")).play(), 2.0);
	tll.add(animateIn($("#dummySynch")).play(), animIntervals[animIntervals.length - 1]);

}

function audioFinish() {
	$('.content_blocker').hide();
	firstTime = false;
	scrubberBool = true;
	//alert(scrubberBool)
	KCCheck(NoOfOptions);
}

var exists = [], randomNumber;
$(document).ready(function() {
	$(".Next_Button").css("cursor", "default");
	$(".Next_Button").addClass("submitBtnDeactive");
	$("#conBtn").css("display", "none");
	$("#conBtn").click(function() {
		currentQuest++;
		loadQuestion();
	});

});

function loadQuestion() {
	//alert(currentQuest+" :: currentQuest"+":"+totQuestCount);

	//this custom event handler is used to trigger the value, bind and unbind the callback event in the current page kc js
	jQuery('.assessmentContent img').triggerHandler("DISPATCHEVENT", currentQuest);

	countTries = 0;
	$("#conBtn").css("display", "none");
	$(".Next_Button").css("display", "block");
	$(".Next_Button").addClass("submitBtnDeactive");
	$(".feedback_content").css("display", "none");
	$('.Next_Button').unbind();
	$(".Next_Button").html(submitTxt);
	var quesTxt = quesArr[currentQuest];
	NoOfOptions = Number(optionArr[currentQuest].length);
	if (NoOfOptions == 2) {
		noOfTries = 1;
	} else {
		noOfTries = 2;
	}
	noOptionArr[currentQuest] = NoOfOptions;
	corrAns = corrAnsArr[currentQuest];
	var questionStr = '';
	if (totQuestCount == 1) {
		questionStr = '<div class="assessmentTitle assessmentTitle_left"><div class="common_table"><div class="common_table_Cell"><span class="question"></span></div></div></div>';
	} else {
		if ($(".pageWrapper").hasClass("RTL")) {
			questionStr = '<div class="question_wrapper"><div class="common_table"><div class="common_table_Cell"><div class="question_num">' + totQuestCount + '/' + (currentQuest + 1) + '</div></div></div></div><div class="assessmentTitle "><div class="common_table"><div class="common_table_Cell"><span class="question"></span></div></div></div>';
		} else {
			questionStr = '<div class="question_wrapper"><div class="common_table"><div class="common_table_Cell"><div class="question_num">' + (currentQuest + 1) + '/' + totQuestCount + '</div></div></div></div><div class="assessmentTitle "><div class="common_table"><div class="common_table_Cell"><span class="question"></span></div></div></div>';
		}
		
		
	}

	var optionStr = '';
	if (quesType[currentQuest] == "MCSS") {
		for (var i = 1; i <= NoOfOptions; i++) {
			optionStr += '<div class="RadioTag" id="Radio_' + i + '"><small class="rightWrong"></small><span class="MCQRadio" id="option_' + i + '"></span><div class="opt">' + optionArr[currentQuest][i - 1] + '</div><div class="clearFix"></div></div>';
		}
	} else {
		for (var i = 1; i <= NoOfOptions; i++) {

			optionStr += '<div class="RadioTag" id="Radio_' + i + '"><small class="rightWrong"></small><span class="MCQCheck" id="option_' + i + '"></span><div class="opt">' + optionArr[currentQuest][i - 1] + '</div><div class="clearFix"></div></div>';
			userAns[i] = 0;
		}
	}
	/*if (totQuestCount == 1) {

	 $('.question_num').hide();
	 } else {
	 $('.question_num').show();
	 $('.question_num').html((currentQuest + 1)+"/"+ totQuestCount);
	 $('.question').html(quesTxt);
	 //$('.question').html("<ol type='1' start='" + (currentQuest + 1) + "'><li>" + quesTxt + "</li><ol>");
	 }*/
	 //console.log('::; Height'+$('.assessment_disp01')[0].scrollHeight);
	$('.ASmntHeader').html(questionStr);
	$('.options').html(optionStr);
	$('.question').html(quesTxt);
	$('.question_icon').html(currentQuest);
	if (!firstTime) {
		KCCheck(NoOfOptions);
	}

}

function KCCheck(noOfOpt) {

	$(".RadioTag").css("cursor", "pointer");
	$(".RadioTag").unbind();
	$(".RadioTag").bind("click", function() {
		no = $(this).attr("id").split("_")[1];
		if (quesType[currentQuest] == "MCSS") {
			for (var i = 1; i <= noOfOpt; i++) {
				$("#option_" + i).removeClass("MCQRadioSelect").addClass("MCQRadio");
			}
			userSelection = no;
			$("#option_" + no).removeClass("MCQRadio").addClass("MCQRadioSelect");
			$(".Next_Button").css("display", "block");
			if ($(".Next_Button").css("cursor") == "default") {
				nextEnable();
			}
		} else {
			if (userAns[no] == no) {
				userAns[no] = 0;
				$("#option_" + no).removeClass("MCQCheckSelect ").addClass("MCQCheck");
			} else if (userAns[no] == 0) {
				$("#option_" + no).removeClass("MCQCheck").addClass("MCQCheckSelect ");
				userAns[no] = no;

			}
			fnCheckAns();
		}

	});

}

function fnCheckAns() {
	var cntUnhecked = 0;
	for (var j = 0; j < userAns.length; j++) {
		if (userAns[j] == 0) {
			cntUnhecked++;
		}
	}
	if (cntUnhecked == (userAns.length - 1)) {
		nextDisable();
		$(".Next_Button").addClass("submitBtnDeactive");
	} else {
		if ($(".Next_Button").css("cursor") == "default") {
			nextEnable();
			$(".Next_Button").css("display", "block");
		}
		$(".Next_Button").removeClass("submitBtnDeactive");
	}
}

function nextEnable() {
	$('.Next_Button').css("cursor", "pointer");
	$(".Next_Button").removeClass("submitBtnDeactive");
	$('.Next_Button').bind("click", fnSubmitClick);
}
function fnSetScrollHeight(){	
	if (device.MobileDevice()) {
		if($(window).width()<=360)
		{	
			$('.fb_overlay').css('min-height','300px');
		}else{
			$('.fb_overlay').css('min-height',$('.assessment_disp01')[0].scrollHeight);
		}
	}
}
$(window).resize(function() {
	fnSetScrollHeight();
});
function fnSubmitClick() {
	fnSetScrollHeight()
	countTries++;
	validation();
}

function nextDisable() {
	$('.Next_Button').css("cursor", "default");
	$('.Next_Button').unbind("click", fnSubmitClick);
}

function radioBtnDisable() {
	$(".RadioTag").css("cursor", "default");
	$(".RadioTag").unbind();
}

function radioBtnEnable(noOfOpt) {

	no = $(this).attr("id").split("_")[1];
	$(".Next_Button").removeClass("submitBtnDeactive");
	for (var i = 1; i <= noOfOpt; i++) {
		$("#option_" + i).removeClass("MCQRadioSelect").addClass("MCQRadio");
	}

	userSelection = no;

	$("#option_" + no).removeClass("MCQRadio").addClass("MCQRadioSelect");
	$("#Radio_" + no).css("cursor", "default");
	$("#option_" + no).css("cursor", "default");

	$(".Next_Button").css("display", "block");
	if ($(".Next_Button").css("cursor") == "default") {
		nextEnable();
	}

}

function validation() {
	$(".RadioTag").unbind("click");
	$(".RadioTag").css("cursor", "default");
	$(".imgRadioSelect").css("cursor", "default");
	controller.nextBackDisable();
	hideallfb();
	if (quesType[currentQuest] == "MCSS") {
		userAns[currentQuest] = userSelection;
		if (userSelection == corrAns) {
			score++;
			nextDisable();
			fnShowTickMark(true);
			$("#Radio_" + userSelection).find(".rightWrong").addClass("icon-right");
			for (var k = 1; k <= noOptionArr[currentQuest]; k++) {
				$("#option_" + k).css("cursor", "default");
			}
			$("#fb_c").show();
			$("#fb_c").html(corrFeedback[currentQuest]);
			if ((currentQuest + 1) != totQuestCount) {
				$("#conBtn").css("display", "block");
				$(".Next_Button").css("display", "none");
			} else {
				controller.setPageVisited();
				$(".Next_Button").addClass("submitBtnDeactive");
				$(".Next_Button").unbind();
			}
			$(".Next_Button").addClass("submitBtnDeactive");
		} else {
			$(".Next_Button").addClass("submitBtnDeactive");
			fnDisableOption();
			//fnShowTickMark(true);
			if (noOfTries == countTries) {
				//$("#Radio_" + userSelection).find(".rightWrong").removeClass("icon-right").addClass("icon-wrong");
				$("#fb_sw").show();
				$("#fb_sw").html(LastIncorrFeedback[currentQuest]);

			} else {
				//$("#Radio_" + userSelection).find(".rightWrong").removeClass("icon-right").addClass("icon-wrong");
				$("#fb_fw").show();
				$("#fb_fw").html(FirstIncorrFeedback[currentQuest]);
			}
		}
	} else {
		fnDisableOption();
		corrCnt = 0;
		userAnsCnt = 0;
		correctAns = corrAns.split(",");
		//fnShowTickMark(true);
		for (var i = 1; i < userAns.length; i++) {
			if (userAns[i] != 0) {
				//$("#Radio_" + userAns[i]).find(".rightWrong").removeClass("icon-right").addClass("icon-wrong");
				userAnsCnt++;
			}
			for (var j = 0; j < correctAns.length; j++) {
				if (userAns[i] == correctAns[j]) {
					$("#Radio_" + userAns[i]).find(".rightWrong").removeClass("icon-wrong").addClass("icon-right");
					corrCnt++;
				}
			}
		}
		if (corrCnt == correctAns.length && correctAns.length == userAnsCnt) {
			fnShowTickMark(true);
			score++;
			nextDisable();
			$("#fb_c").show();
			$("#fb_c").html(corrFeedback[currentQuest]);
			if ((currentQuest + 1) != totQuestCount) {
				$("#conBtn").css("display", "block");
				$(".Next_Button").css("display", "none");
			} else {
				$(".Next_Button").addClass("submitBtnDeactive");
				$(".Next_Button").unbind();
				controller.setPageVisited();
			}
			for (var k = 1; k <= noOptionArr[currentQuest]; k++) {
				$("#option_" + k).css("cursor", "default");
			}

		} else {
			$(".Next_Button").addClass("submitBtnDeactive");
			if (noOfTries == countTries) {
				$("#fb_sw").show();
				$("#fb_sw").html(LastIncorrFeedback[currentQuest]);
				for (var k = 1; k <= noOptionArr[currentQuest]; k++) {
					$("#option_" + k).css("cursor", "default");
				}
			} else {
				$("#fb_fw").show();
				if (corrCnt != 0 && userAnsCnt >= corrCnt) {
					$("#fb_fw").html(IncorrFeedback[currentQuest]);
				} else {
					$("#fb_fw").html(FirstIncorrFeedback[currentQuest]);
				}
			}

		}
	}
	$(".fb_overlay").css("display", "block");
}


$("#close").click(function() {
	$(".fb_overlay").hide();
	controller.nextBackEnable();
	if (quesType[currentQuest] == "MCSS") {
		if (userSelection == corrAns) {
		} else {
			$(".Next_Button").removeClass("submitBtnDeactive").addClass("submitBtn");
			if (noOfTries == countTries) {
				if (NoOfOptions == 2) {
					//noOfTries = 1;
					fnSolutionClick();
				} else {
					$(".Next_Button").html(SolnTxt);
					$('.Next_Button').unbind("click", fnSubmitClick);
					$('.Next_Button').bind("click", fnSolutionClick);
					//noOfTries = 2;
				}

			} else {
				/*$('.Next_Button').html(tryAgainTxt);
				 $('.Next_Button').unbind("click", fnSubmitClick);
				 $('.Next_Button').bind("click", fnTryagainClick);*/
				fnTryagainClick();
			}
		}
	} else {
		if (corrCnt == correctAns.length && correctAns.length == userAnsCnt) {
		} else {
			$(".Next_Button").removeClass("submitBtnDeactive").addClass("submitBtn");
			if (noOfTries == countTries) {
				$(".Next_Button").html(SolnTxt);
				$('.Next_Button').unbind("click", fnSubmitClick);
				$('.Next_Button').bind("click", fnSolutionClick);
			} else {
				/*$('.Next_Button').html(tryAgainTxt);
				 $('.Next_Button').unbind("click", fnSubmitClick);
				 $('.Next_Button').bind("click", fnTryagainClick);*/
				fnTryagainClick();
			}
		}
	}
});
function hideallfb() {
	$("#fb_fw").hide();
	$("#fb_sw").hide();
	$("#fb_c").hide();
	$("#fb_pw").hide();
}

function fnDisableOption() {
	for (var k = 1; k <= noOptionArr[currentQuest]; k++) {
		$("#option_" + k).css("cursor", "default");
	}
}

function fnTryagainClick() {
	//fnShowTickMark(false);
	$('.Next_Button').text(submitTxt);
	$(".feedback_content").css("display", "none");
	for (var k = 1; k <= noOptionArr[currentQuest]; k++) {
		if (quesType[currentQuest] == "MCSS") {
			$("#option_" + k).removeClass("MCQRadioSelect").addClass("MCQRadio");

		} else {
			$("#option_" + k).removeClass("MCQCheckSelect").addClass("MCQCheck");
			userAns[k] = 0;
		}
		$("#option_" + k).css("cursor", "pointer");
		/*if ($("#Radio_" + k).find(".rightWrong").hasClass("icon-right")) {
		 $("#Radio_" + k).find(".rightWrong").removeClass("icon-right");
		 } else if ($("#Radio_" + k).find(".rightWrong").hasClass("icon-wrong")) {
		 $("#Radio_" + k).find(".rightWrong").removeClass("icon-wrong");
		 }*/
	}
	KCCheck(noOptionArr[currentQuest]);
	$('.Next_Button').unbind("click");
	$(".Next_Button").addClass("submitBtnDeactive");
	nextDisable();

}

function fnSolutionClick() {
	fnShowTickMark(true);
	if (quesType[currentQuest] == "MCSS") {
		$("#option_" + corrAns).addClass("MCQRadioSelect");
		$("#Radio_" + corrAns).find(".rightWrong").addClass("icon-right");
		$("#Radio_" + userSelection).find(".rightWrong").removeClass("icon-wrong");
		$("#option_" + userSelection).removeClass("MCQRadioSelect").addClass("MCQRadio");
	} else {
		var correctAns = corrAns.split(",");
		for (var i = 1; i < userAns.length; i++) {
			if (userAns[i] != 0) {
				//if ($("#Radio_" + userAns[i]).find(".rightWrong").hasClass("icon-wrong")) {
				//$("#Radio_" + userAns[i]).find(".rightWrong").addClass("icon-wrong");
				$("#option_" + userAns[i]).removeClass("MCQCheckSelect").addClass("MCQCheck");
				//}
			}
		}
		for (var j = 0; j < correctAns.length; j++) {
			$("#option_" + correctAns[j]).removeClass("MCQCheck").addClass("MCQCheckSelect");
			$("#Radio_" + correctAns[j]).find(".rightWrong").removeClass("icon-wrong").addClass("icon-right");
		}
	}
	$(".Next_Button").addClass("submitBtnDeactive");
	if ((currentQuest + 1) != totQuestCount) {
		$("#conBtn").css("display", "block");
		$(".Next_Button").css("display", "none");
	} else {
		$(".Next_Button").addClass("submitBtnDeactive");
		$(".Next_Button").unbind();
		controller.setPageVisited();
	}
	nextDisable();
}

function fnShowTickMark(aFlg) {
	for (var k = 1; k <= noOptionArr[currentQuest]; k++) {
		if (aFlg) {
			$("#Radio_" + k).find(".rightWrong").css("display", "block");
		} else {
			$("#Radio_" + k).find(".rightWrong").css("display", "none");
		}
	}

}//[0].scrollHeight