/**
 * @author Shigil.Gangadharan
 */

var assessmentShell = {
	xml : xmlParser.getXml("xml/questions.xml"),
	questionArray : [],
	optionArray : [],
	answerArray : [],
	userAnswer : [],
	titleArray : [],
	scoreArray : [],
	index : 0,
	numCheckSelected : 0,
	optDivs : null,
	optSelected : null,
	questionType : "",

	init : function() {
		assessmentShell.populateData(assessmentShell.xml);
		assessmentShell.submitState(false);
		$("#result_container").hide();
		$(".Question_Container").show();
		if (device.Android() || device.iOS()) {
			$("#page_inst").html("Select the correct answer and tap Submit.");
		}

		$("#submit").mouseover(function() {
			if (submitEnable) {
				$("#submit img").attr("src", "images/submit_over.png");
			}
		});

		$('#submit').on('click', assessmentShell.fnOnSubmit);

		$("#submit").mouseout(function() {
			if (submitEnable) {
				$("#submit img").attr("src", "images/submit_normal.png");
			}
		});
	},

	fnOnSubmit : function() {
		if (!submitEnable) {
			return;
		}
		if (assessmentShell.index >= assessmentShell.xml.getElementsByTagName("question").length - 1) {
			assessmentShell.checkScore();
			assessmentShell.createResult();
			return;
		}
		assessmentShell.submitState(false);
		assessmentShell.checkScore();
		assessmentShell.userAnswer = [];
		assessmentShell.optSelected = null;
		assessmentShell.numCheckSelected = 0;
		assessmentShell.index++;
		assessmentShell.populateUI();
	},

	createResult : function() {
		$(".Question_Container").hide();
		$("#result_container").show();
		$(".pgTitle").html("<h1> Result </h1>");

		var currentScore = 0;
		for (var i = 0; i < assessmentShell.scoreArray.length; i++) {
			if (assessmentShell.scoreArray[i] == 1) {
				currentScore++;
			}
		}

		var percentage = Math.round(currentScore / assessmentShell.scoreArray.length) * 100;
		var resultString = $("#resultString").text().split("%current%").join(currentScore).split("%total%").join(assessmentShell.scoreArray.length);
		$("#resultString").html(resultString);
		$("#failMessage").show();
		$("#passedMessage").show();

		if (percentage > 75) {
			$("#failMessage").hide();
		} else {
			$("#passedMessage").hide();
		}
	},

	checkScore : function() {
		if (assessmentShell.questionType == "mcss") {
			assessmentShell.manageScore(assessmentShell.answerArray[assessmentShell.index] == assessmentShell.optSelected);
		} else if (assessmentShell.questionType == "mcms") {
			var str = "";
			for (var i = 0; i < assessmentShell.userAnswer.length; i++) {
				if (assessmentShell.userAnswer[i] != 0) {
					str = str + assessmentShell.userAnswer[i];
				}
				if (i < assessmentShell.userAnswer.length - 1) {
					str = str + ",";
				}
			}
			assessmentShell.manageScore(assessmentShell.answerArray[assessmentShell.index] == str);
		}
	},

	manageScore : function(correct) {
		if (correct) {
			assessmentShell.scoreArray[assessmentShell.index] = 1;
		} else {
			assessmentShell.scoreArray[assessmentShell.index] = 0;
		}
	},

	populateData : function(data) {
		for (var i = 0; i < data.getElementsByTagName("question").length; i++) {
			var title = data.getElementsByTagName("question")[i].getAttribute('catogary');
			assessmentShell.titleArray.push(title);

			var str = "<p>" + data.getElementsByTagName("question")[i].getElementsByTagName("questionText")[0].childNodes[0].nodeValue + "</p>";
			assessmentShell.questionArray.push(str);

			var ans = data.getElementsByTagName("question")[i].getElementsByTagName("correctOption")[0].childNodes[0].nodeValue;
			assessmentShell.answerArray.push(ans);

			var optionlength = data.getElementsByTagName("question")[i].getElementsByTagName("options")[0].getElementsByTagName("option").length;
			var j;
			var options = new Array();

			for ( j = 0; j < optionlength; j++) {
				var opt = data.getElementsByTagName("question")[i].getElementsByTagName("options")[0].getElementsByTagName("option")[j].childNodes[0].nodeValue;
				options.push(opt);
			}
			assessmentShell.optionArray.push(options);
		}
		assessmentShell.populateUI();
	},

	populateUI : function() {
		var _curr = assessmentShell.index;
		var str = "<p>" + assessmentShell.questionArray[_curr] + "</p>";
		$("#assessmentQuestion").html(str);
		var title = "<h1>" + assessmentShell.titleArray[_curr] + "</h1>";
		$(".pgTitle").html(title);
		assessmentShell.optDivs = $("div.labelvalue");
		var optText;
		for (var i = 0; i < assessmentShell.optionArray[_curr].length; i++) {
			optText = assessmentShell.optionArray[_curr][i];
			$(assessmentShell.optDivs[i]).html(optText);
			$("#page_radio_" + (i + 1)).css("cursor", "pointer");
		}
		assessmentShell.checkQuestionType();
	},

	OnOptionClick : function(clicked) {
		if (assessmentShell.questionType == "mcss") {
			if (clicked == assessmentShell.optSelected) {
				return;
			}
			assessmentShell.userAnswer[clicked - 1] = clicked;
			assessmentShell.initRadio();
			$("#page_radio_" + clicked).attr("src", "images/L1_P12_Img2@2x.png");
			$("#page_radio_" + clicked).css("cursor", "default");
			assessmentShell.optSelected = Number(clicked);
			assessmentShell.submitState(true);
		} else if (assessmentShell.questionType == "mcms") {
			assessmentShell.validateCheckBoxSelection(clicked);
		}
	},

	validateCheckBoxSelection : function(clicked) {
		if ($("#page_radio_" + clicked).attr("src") == "images/checkNormal@2x.png") {
			$("#page_radio_" + clicked).attr("src", "images/checkSelected@2x.png");
			assessmentShell.userAnswer[clicked - 1] = clicked;
			assessmentShell.numCheckSelected++;
		} else if ($("#page_radio_" + clicked).attr("src") == "images/checkSelected@2x.png") {
			$("#page_radio_" + clicked).attr("src", "images/checkNormal@2x.png");
			assessmentShell.userAnswer[clicked - 1] = 0;
			assessmentShell.numCheckSelected--;
		}

		assessmentShell.submitState(assessmentShell.numCheckSelected != 0);

	},

	checkQuestionType : function() {
		if (assessmentShell.answerArray[assessmentShell.index].indexOf(",") == -1) {
			assessmentShell.questionType = "mcss";
			assessmentShell.initRadio();
		} else {
			assessmentShell.questionType = "mcms";
			assessmentShell.initCheck();
		}
	},

	initRadio : function() {
		for (var i = 1; i <= assessmentShell.optDivs.length; i++) {
			$("#page_radio_" + i).attr("src", "images/L1_P12_Img1@2x.png");
			$("#page_radio_" + i).css("cursor", "pointer");
		}

	},

	initCheck : function() {
		for (var i = 1; i <= assessmentShell.optDivs.length; i++) {
			$("#page_radio_" + i).attr("src", "images/checkNormal@2x.png");
		}

	},

	submitState : function(arg) {
		if (arg) {
			submitEnable = true;
			$("#submit").css("cursor", "pointer");
			$("#submit").removeAttr("disabled");
			$("#submit img").attr("src", "images/submit_normal.png");
		} else {
			submitEnable = false;
			$("#submit").css("cursor", "default");
			$("#submit").attr("disabled", "disabled");
			$("#submit img").attr("src", "images/submit_disabled.png");
		}
	}
};

