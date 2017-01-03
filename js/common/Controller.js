var createActivity = false;
var pageLoad = false;
var StartPage = true;
var ExternalData;
var currentExtDataPath;
var ExternalDataLoad = false;
var PreAssests = "";
var interActivityPage = false;
var transcript = [];
var titlesArr = [];
var mobTitlesArr = [];
var canvas = false;
var totalScripts;
var preMenu = "";
preMenuID = "";
var loadedAssestsCnt = 0;
var assestCnt = 0;
var modCompleted = false;
var nxtBakDisable = false;
var moduleTitle = false;
var pageTitle = false;
var modTitleTimer;
var pageTitleTimer;
var pageTitleTxt;
var moduleTitleTxt;
var titleDuration = 1000;
var FFData;
var FFDataArr = [];
var FFRandomArr = [];
var videoBack = false;
var FFDataCnt = 0;
var FFVideo;
var resourceTitlesArr = [];
var resourceIconArr = [];
var resourceDataArr = [];
var pageLoadingAnim = false;
var UITxtData;
var audTiming = [];
var txtLen = 29;
var txtTotalLength = 68;
var directionSide = "left";
// var langCodesArr = ['lang-en', 'lang-uk', 'lang-cn', 'lang-es', 'lang-ko', 'lang-ru', 'lang-ar', 'lang-tw', 'lang-hi', 'lang-tl', 'lang-ms', 'lang-fr', 'lang-pt'];

var Controller = function() {
	this.buttonState = {
		"next" : true,
		"back" : true,
		"menu" : true,
		"glossary" : true,
		"resources" : true,
		"exit" : true
	};

	/*****buttons****/
	nextBtn = this.assignControls($("#shell_next"));
	backBtn = this.assignControls($("#shell_back"));
	gadgetsBtn = this.assignControls($("#gadgetsButn"));
	modTitleBtn = this.assignHOver($("#modTitle"));
	pageTitleBtn = this.assignHOver($("#shell_mod_title_bar"));
	//-- Fun Fact updates
	if (isFunFacts) {
		funFactsBtn = this.assignControls($("#funFactBtn"));
		funFactMBtn = this.assignControls($("#FFMBtn"));
		BackBtn = this.assignControls($("#FFBackBtn"));
	}
	//-- END: Fun Fact updates
	replay_btn = this.assignControls($("#replay_btn"));
	glossaryBtn = this.assignControls($("#glossarybtn"));
	Resourcebtn = this.assignControls($("#Resourcesbtn"));
	helpBtn = this.assignControls($("#helpbtn"));
	noteBtn = this.assignControls($("#shell_note"));
	muteBtn = this.assignControls($("#shell_mute"));
	audioBtn = this.assignControls($("#audio_Icon"));
	transcriptBtn = this.assignControls($("#shell_transcript"));
	glossaryBtn_phone = this.assignControls($("#shell_glossary_phone"));
	resourcesBtn_phone = this.assignControls($("#Resourcesbtn_phone"));
	helpBtn_phone = this.assignControls($("#helpbtn_phone"));
	noteBtn_phone = this.assignControls($("#shell_note_phone"));
	transcript_phone = this.assignControls($("#shell_transcript_phone"));
	menuBtn = this.assignControls($("#menubtn"));
	menuBtn_pop = this.assignControls($("#shell_hot_menu_pop"));
	exitBtn = this.assignControls($("#shell_exit"));
	mobExitBtn = this.assignControls($("#Mob_shell_exit"));
	yesBtn = this.assignControls($("#shell_yes_btn"));
	noBtn = this.assignControls($("#shell_no_btn"));
	/*****buttons popup****/
	glossaryPop = this.assignControls($("#shell_g_ppopup"));
	resourcesPop = this.assignControls($("#shell_r_ppopup"));
	helpPop = this.assignControls($("#shell_h_ppopup"));
	notePop = this.assignControls($("#shell_n_ppopup"));
	popup_disable_bg = this.assignControls($("#shell_popup_bg"));
	menupop = this.assignControls($("#shell_menu_pop"));
	exitPop = this.assignControls($("#shell_e_ppopup"));
	/*****popup close button****/
	popG_Close = this.assignControls($("#shell_g_close"));
	popR_Close = this.assignControls($("#shell_r_close"));
	popH_Close = this.assignControls($("#shell_h_close"));
	popN_Close = this.assignControls($("#shell_n_close"));
	popE_Close = this.assignControls($("#shell_e_close"));
	popM_Close = this.assignControls($("#shell_m_close"));
	pageContiner = $("#shell_pageLoader");
	menuCourseTitle = $("#shell_mod_title_bar");
	$('#shell_n_popup_content').on('input paste focus', this.saveNoteData);
	audioControls = $("#shell_audio_pd");
	videoObject = null;
	VideoControls = null;
	defaultVideo = null;
	videoPauseState = false;
	videoObject_JQ = null;
	isDisableTranscript = false;
	this.menuUpdateBy = "system";
	//used when menu needs to updated, when user press next back and menu is open;
	if (!device.Android() && !device.iPhone() && !device.iPad()) {
		$(".shell_exit").show();
		$(".shell_exit_icon").show();
	} else {
		$(".shell_exit").hide();
		$(".shell_exit_icon").hide();
	}
	//===============
	model = new Model();
	model.addCustomEvent("updateView", this.updateViewNow);
	menu = new Menu(model.menuData);
	menu.addCustomEvent("menuReady", this.updateModel);
	// model.init();
	this.getLocalStorage();
	if(model.langName=="ru/")
	{
		txtTotalLength = 47;

	}
	if (isFunFacts) {
		$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
		if (!device.Android()) {
			if (device.iPad()) {
				FFVideo = document.getElementById("bgvid_ipad");
				FFVideo.addEventListener('loadedmetadata', naturalSize, false);
			} else {
				FFVideo = document.getElementById("bgvid");
			}
		} else {
			$(".FunFactWaprvideo").html("");
		}
	} else {
		$("#funFactBtn").removeClass("funfactenabled").addClass("funfactdisabled");
	}
};
Controller.prototype.setLangImagePath = function() {
	if (model.langName == "en/") {
		//-- Use original path for en
		return;
	}
	$('.pageWrapper img[class*="lang-"]').each(function(index) {
		var langNm = model.langName.slice(0, -1);
		// console.log('[Controller]setLangImagePath: hasClass >>>>> lang-' + langNm + ' ??? ' + $(this).hasClass('lang-' + langNm));
		if (!$(this).hasClass('lang-' + langNm)) {
			//-- The required lang-xx Class is not found in the image
			return;
		}
		// console.log('[Controller]setLangImagePath: orig : ' + $(this).attr('src'));
		if ($(this).attr('src').indexOf('_' + langNm + '.') != -1) {
			//-- Already replaced
			return;
		}
		var tmpath = $(this).attr('src').split('.');
		if (tmpath[1] != undefined) {
			//-- Suffix lang code to image name
			$(this).attr('src', tmpath[0] + '_' + langNm + '.' + tmpath[1]);
			// console.log('[Controller]setLangImagePath: lang : ' + $(this).attr('src'));
		}
	});
};
Controller.prototype.assignControls = function(_btn) {
	// console.log('[Controller] assignControls _btn: ' + _btn.attr('id'));
	
	_btn.on("click", this.fnClick);
	return _btn;
};
Controller.prototype.assignHOver = function(_btn) {
	if (device.iPhone() || device.Android() || device.iPad()) {
		_btn.on("touchstart", this.fnMouseOver);
	} else {
		_btn.on("mouseover", this.fnMouseOver);
		_btn.on("mouseout", this.fnMouseOut);
	}
	return _btn;
};
Controller.prototype.saveNoteData = function() {
	var noteText = $('#shell_n_popup_content').val();
	if (noteText.indexOf("Type your notes here.") != -1) {
		$('#shell_n_popup_content').html("");
		noteText = "";
	}
	localStorage.setItem('notes', noteText);
};
Controller.prototype.getLocalStorage = function() {
	if (model.supports_html5_storage()) {
		if (localStorage.getItem('notes') == null || localStorage.getItem('notes') == "") {
			return;
		}

		$('#shell_n_popup_content').text(localStorage.getItem('notes'));
	}
};
Controller.prototype.setVideoObject = function(_vidObj, _vidObj_JQ) {
	videoObject = _vidObj;
	videoObject_JQ = _vidObj_JQ;
};
Controller.prototype.hideAudio = function() {
	if (device.Android()) {
		$("#audioAndroid").hide();
	} else {
		if (device.iPhone()) {
			$("#shell_audio_pd").hide();
		} else if (device.Firefox()) {
			$(".shell_audio_controls").css("z-index", -999);
		} else {
			$(".shell_audio_controls").hide();
		}
	}
};
Controller.prototype.updateViewNow = function() {
	// console.log('[Controller] updateViewNow');
	//console.log(":::modCompleted::::"+modCompleted);
	backgroundLoader.loadMute();
	//$("#preloaderSpinner").show();
	audioPlayer.destroyAudio();
	$(".NavTour").css("display", "none");
	$("#preloaderSpinner").css("display", "block");
	nxtBakDisable = false;
	controller.gadgetsBtnDisable();
	pageLoad = false;
	pageLoadingAnim = false;
	interActivityPage = false;
	intActivityAudioReset = false;
	showAudioLoading = true;
	if (createActivity) {
		clearCanvas();
	}
	if (model.currPage != 0) {
		$('.click_next_Continue').hide();
	}
	controller.setPageVisitedInitial();
	if (canvas) {
		for (var i = 1; i <= 5; i++) {
			canvas = false;
			//canvObjArry[i].clearRect(0, 0, 1000, 700);
			$("#myCanvas" + i).remove();
		}
	}

	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
	//scrubberBool=true;
	markerArr = new Array;
	if (device.Android()) {
		$("#audioAndroid").show();
	} else {
		if (device.iPhone()) {
			$("#shell_audio_pd").show();
		} else if (device.Firefox()) {
			$(".shell_audio_controls").css("z-index", 1);
		} else {
			$(".shell_audio_controls").show();
		}
	}
	transcriptBtn.css("opacity", "1");
	transcriptBtn.removeClass(transcriptBtn.attr("class"));
	isDisableTranscript = false;
	showBuffer(true);

	videoObject = null;
	orientationChange = undefined;
	//function defined in pages if page needed orientationChange event
	//====================Course title in menu==================
	//______________________________for em dash isssue__________________________
	//var tempText = model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("title");
	var tempText = titlesArr[model.currPage];
	if (device.MobileDevice()) {
		if (mobTitlesArr[model.currPage] != "") {
			var tempText = mobTitlesArr[model.currPage];
		}
	}
	var titleText = tempText.replace("@emdash", "<span class='emdash'>&mdash;</span>");
	titleText = titleText.replace("@endash", "<span class='endash'>&ndash;</span>");
	//menuCourseTitle.text(model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("title"));
	$(".CourseTitle-TT").css("display", "none");
	$(".PageTitle-TT").css("display", "none");
	$(".PageTitle-TT").html(titleText.trim());
	pageTitleTxt = titleText;
	var totalTextLen = Number($(".course_title").text().length) + Number(titleText.length);
	//console.log(totalTextLen+"::titleText.length::"+titleText.length);
	if (device.MobileDevice()) {
		if (window.orientation == 0) {
			if (titleText.length > 35) {
				pageTitle = true;
				var titleTextLen = titleText.split(" ");
				titleText = addtitle(titleTextLen);
			} else {
				pageTitle = false;
			}
		}
	} else {
		if (totalTextLen > txtTotalLength) {
			pageTitle = true;
			var titleTextLen = titleText.split(" ");
			titleText = addtitle(titleTextLen);
		} else {
			pageTitle = false;
		}
	}

	menuCourseTitle.html(titleText.trim());
	//function defined in pages if page needed orientationChange event
	//====================Course title in menu==================
	//menuCourseTitle.text(model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("title"));
	//$("#shell_mod_title_bar").text(model.menuData.getElementsByTagName("structure")[0].getElementsByTagName("module")[model.currMod].getAttribute("title"));
	//====================Page Load=============================
	pageContiner.find("div").remove();
	pageContiner.html("");
	$('.footer-holder .scrubber').unbind("RESET_SLIDER");
	pageContiner.load(model.pagePath + model.modArr[model.currMod][model.currPage].path, function() {
		swipeHeaderFooter();
		if (model.langName == "ar/") {
			$(".pageWrapper").addClass("RTL");
			directionSide = "right";
		}
	});
	// }
	//=============================================================
	menu.updateMenu(model.currPage, model.currMod, model.visitedArr);
	//====================Enable disable next back button=========
	if ((model.currPage == 0) && model.currMod == 0) {
		backBtn.addClass('disabled');
	} else {
		backBtn.removeClass('disabled');
	}
	/**Next button***/
	// console.log('[Controller] updateViewNow: model.currMod: ' + model.currMod);
	// console.log('[Controller] updateViewNow: model.modArr.length - 1: ' + (model.modArr.length - 1));
	if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
		nextBtn.addClass('disabled');
		// } else if ((model.visitedArr[model.currMod] < model.currPage + 1) || (model.visitedArr[model.currMod] == 0 && model.currPage == 0)) {
	} else if (model.visitedArr[model.currMod][model.currPage] == 0 && model.learningType != "non-linear") {
		nextBtn.addClass('disabled');
	} else {
		nextBtn.removeClass('disabled');
		// console.log('[Controller] updateViewNow ================ C enabled');
	}
	//============Displaying current page of total page====
	var tempTotalPage = 0;
	var tempCurrPage = 0;
	for (var i = 0; i < model.modArr.length; i++) {
		if (model.currMod == i) {
			tempCurrPage = tempTotalPage + model.currPage + 1;
		}
		tempTotalPage += model.modArr[i].length;
	}
	//-- If first page needs to be removed from count
	// tempCurrPage--;
	// tempTotalPage--;
	// tempCurrPage > 9 ? $("#shell_menu").text(tempCurrPage + "/" + tempTotalPage) : $("#shell_menu").text("0" + tempCurrPage + "/" + tempTotalPage);
	tempCurrPage = tempCurrPage > 9 ? tempCurrPage : ('0' + tempCurrPage);
	tempTotalPage = tempTotalPage > 9 ? tempTotalPage : ('0' + tempTotalPage);
	// $("#shell_menu").text("Page " + tempCurrPage + "/" + tempTotalPage);
	if ($("body").hasClass("RTL")) {
		$(".page-no").text((tempTotalPage) + "/" + (tempCurrPage));
	} else {
		$(".page-no").text((tempCurrPage) + "/" + (tempTotalPage));
	}
	//=====================================================
	var tempTotalPage = 0;
	var tempCourseFinish = 0;
	// for (var i = 0; i < model.modArr.length; i++) {
	// tempTotalPage += model.modArr[i].length;
	// tempCourseFinish += model.visitedArr[i];
	// }
	for (var i = 0; i < model.visitedArr.length; i++) {
		tempTotalPage += model.visitedArr[i].length;
		for (var j = 0; j < model.visitedArr[i].length; j++) {
			if (model.visitedArr[i][j] == 2 || model.visitedArr[i][j] == '2') {
				tempCourseFinish++;
			}
		}
	}
	var tempPercentage = Math.round((tempCourseFinish / tempTotalPage) * 100);
	// console.log(":tempPercentage::" +tempPercentage);
	// console.log(model.visitedArr+":::"+tempCourseFinish+"::ModPercentage:::"+tempPercentage+":::");
	if(tempPercentage==100){
		modCompleted = true;
		//callInitialAudio(); 
	}
	$("#shell_progressBar_lineTwo").css("width", tempPercentage + "%");
	$("#shell_progressBar_text").text(tempPercentage + "% course completed");
	//======================================================
	//Bookmark_location = model.currPage + "||" + model.currMod + "||" + model.visitedArr;
	if (isSCORM) {
		// console.log("[Controller] bookmark: " + Bookmark_location);
		//model.scormHandler.getValue();
	}
	if (device.iPad()) {
		$(window).on("orientationchange", function(event) {
			$(".transcript").css("top", "300px");
			$(".transcript").css("left", "50px");
		});
	}
	if (device.MobileDevice()) {
		
		$(window).on("orientationchange", function(event) {
			
			var titleText = pageTitleTxt;
			var moduleTitleText = moduleTitleTxt;
			if (window.orientation == 0) {
				if (titleText.length > 35) {
					pageTitle = true;
					var titleTextLen = titleText.split(" ");
					titleText = addtitle(titleTextLen);
				} else {
					pageTitle = false;
				}
				//console.log(moduleTitleText.length+"::titleTe23xt.length::"+titleText.length);
				if (model.langName == "ru/") {
					txtLen = 21;
				} else {
					txtLen = 29;
				}
				if (moduleTitleText.length > txtLen) {
					moduleTitle = true;
					var moduleTitleTxtLen = moduleTitleText.split(" ");
					moduleTitleText = addtitle(moduleTitleTxtLen);
				} else {
					moduleTitle = false;
				}

			} else {
				if (titleText.length > txtTotalLength) {
					pageTitle = true;
					var titleTextLen = titleText.split(" ");
					titleText = addtitle(titleTextLen);
				} else {
					pageTitle = false;
					moduleTitle = false;
					$(".PageTitle-TT").css("display", "none");
					$(".CourseTitle-TT").css("display", "none");
				}
				if (model.langName == "ru/") {
					txtLen = 45;
					if (moduleTitleText.length > txtLen) {
						moduleTitle = true;
						var moduleTitleTxtLen = moduleTitleText.split(" ");
						moduleTitleText = addtitle(moduleTitleTxtLen);
					} else {
						moduleTitle = false;
					}
				}
			}
			menuCourseTitle.html(titleText.trim());
			$(".course_title").html(moduleTitleText.trim());
		});
	}

	if (StartPage) {
		//StartPage = false;
		if (!device.iPhone() && !device.iPad() && !device.Android()) {
			callInitialAudio();
		} else {
			$("#deviceLaunch").show();
			controller.calculateAssests();

		}
	}

	//audioLoadPath("media/audio/mute_long.mp3");
};
function modCompletion() {
	var tempCourseFinish = 0;
	var tempTotalPage = 0;
	for (var i = 0; i < model.visitedArr.length; i++) {
		tempTotalPage += model.visitedArr[i].length;
		for (var j = 0; j < (model.visitedArr[i].length); j++) {
			if (model.visitedArr[i][j] == 2 || model.visitedArr[i][j] == '2') {
				tempCourseFinish++;
			}
		}
	}
	var ModPercentage = Math.round((tempCourseFinish / (tempTotalPage)) * 100);
	//console.log(model.visitedArr+":::"+tempCourseFinish+"::ModPercentage:::"+ModPercentage);
	if (ModPercentage == 100) {
		modCompleted = true;
	}
	if (isSCORM) {
		model.scormHandler.getValue();
	}
}

function countWords(str) {
	str = str.replace(/(^\s*)|(\s*$)/gi, "");
	str = str.replace(/[ ]{2,}/gi, " ");
	str = str.replace(/\n /, "\n");
	return str.split(' ').length;
}

function addtitle(str) {
	var tempStr = "";
	var finalStr = "";
	var emptyStr = " ";
	if (moduleTitle) {
		var limitedLen = 25;
		var titleTextLen = 0;
	}
	if (pageTitle) {
		if (!device.MobileDevice()) {
			var limitedLen = txtTotalLength;
			var titleTextLen = Number($(".course_title").text().length);
		} else {
			var limitedLen = 25;
			var titleTextLen = 0;
		}
	}

	for (var i = 0; i < str.length; i++) {
		tempStr += emptyStr + str[i];
		var tempStrLength = titleTextLen + tempStr.length;
		if (tempStrLength < limitedLen) {
			finalStr = tempStr;
		}

	}
	if (finalStr != tempStr) {
		finalStr = finalStr + " ...";
	}
	return finalStr;
}

Controller.prototype.assignTranscript = function(myPage) {
	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
	$('#transText').html(myPage);
	$("#transText").scrollTop(0);
	$('#transText').mCustomScrollbar();
	$('#transText').mCustomScrollbar("update");

};
//function for close transcript popup
//Controller.prototype.hidetranscript= function() {
function hidetranscript() {
	toggleTranscript();
}

Controller.prototype.hidetranscriptPage = function() {
	$("#transcript").css("display", "none");
	transOpened = false;
	$('.transcript_btn').removeClass('GadgetDisable');
	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
};

Controller.prototype.TranscriptDisableFn = function() {
	//function assignTranscript(myPage) {
	//$(".transcript_btn").css("opacity","0.5")
	muteBtn.css("opacity", "0.7");
	muteBtn.removeClass(transcriptBtn.attr("class"));
	muteBtn.addClass("GadgetDisable");
	transcriptBtn.css("opacity", "0.7");
	transcriptBtn.removeClass(transcriptBtn.attr("class"));
	transcriptBtn.addClass("GadgetDisable");
	$("#transcript").css("display", "none");
	isDisableTranscript = true;
	if ($("#transText").hasClass("mCustomScrollbar")) {
		$('#transText').mCustomScrollbar("destroy");
	}
};

function toggleTranscript() {
	// console.log("[Controller] isDisableTranscript: " + isDisableTranscript);
	$('.transcript_btn').addClass('transcript_btn_disable');
	if (isDisableTranscript) {
		return;
	}
	if ($("#transcript").css("display") == "block") {
		$("#shell_transcript span").css('transform', 'rotate(0deg)');
		$('#transText').mCustomScrollbar("destroy");
		$("#transcript").css("display", "none");
	} else {
		if ($(".pageWrapper").hasClass("RTL")) {
			$("#shell_transcript span").css('transform', 'rotate(-90deg)');
		} else {
			$("#shell_transcript span").css('transform', 'rotate(90deg)');
		}
		$("#transText").scrollTop(0);
		$('#transText').mCustomScrollbar();
		$('#transText').mCustomScrollbar("update");
		$("#transcript").css("display", "block");
	}

}

function hideResource() {
	document.getElementById("transcript").style.visibility = "visible";
}

//==========Aligns the page in vertically middle of parent div, does not work for phone devices
Controller.prototype.setPosition = function() {
	// if (!device.iPhone() && !device.AndroidPhone()) {
	// var topMargin = ((parseInt($(".shell_rightCon").css("height")) - parseInt(pageContiner.css("height"))) / 2) - 20;
	// pageContiner.css("margin-top", topMargin + "px");
	// }
};
Controller.prototype.audioFinish = function() {
	//do nothing
};
Controller.prototype.manageModClick = function(id) {
	menu.manageModClick(id);
};
//Controller.prototype.NexDisable= function() {
function NexDisable() {
	//alert(model.compleTeArr[model.currPage]);
	// nextBtn.removeClass(nextBtn.attr("class"));
	// nextBtn.addClass("shell_next_icon_dsbl");
	nextBtn.addClass('disabled');
	model.NextDisable = true;
}

Controller.prototype.NexDisableAssment = function() {
	//alert(model.compleTeArr[model.currPage]);
	// nextBtn.removeClass(nextBtn.attr("class"));
	// nextBtn.addClass("shell_next_icon_dsbl");
	nextBtn.addClass('disabled');
	model.NextDisable = true;
};
Controller.prototype.setPageVisited = function(isDontAnimate) {
	if (isDontAnimate == null || isDontAnimate == undefined) {
		isDontAnimate = false;
		model.setPageVisited();
	} else {
		isDontAnimate = true;
	}
	// console.log('[Controller] setPageVisited ================');
	// console.log('[Controller] setPageVisited: model.currMod: ' + model.currMod);
	// console.log('[Controller] setPageVisited: model.modArr.length - 1: ' + (model.modArr.length - 1));
	// console.log('[Controller] setPageVisited: model.currPage: ' + model.currPage);
	// console.log('[Controller] setPageVisited: model.modArr[model.currMod].length - 1: ' + (model.modArr[model.currMod].length - 1));
	// console.log('[Controller] setPageVisited: model.visitedArr[model.currMod]: ' + (model.visitedArr[model.currMod]));
	// console.log('[Controller] setPageVisited ================');
	//
	if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
		// console.log('[Controller] setPageVisited ================ A disabled');
		nextBtn.addClass('disabled');
	} else if (model.visitedArr[model.currMod][model.currPage] == 0 && model.learningType != "non-linear") {
		// console.log('[Controller] setPageVisited ================ B disabled');
		nextBtn.addClass('disabled');
		if (!isDontAnimate) {
			animateIText();
		}
	} else {
		// console.log('[Controller] setPageVisited ================ C enabled');
		nextBtn.removeClass('disabled').addClass('blink');
		if (!isDontAnimate) {
			animateIText();
		}
		model.compleTeArr[model.currPage] = 1;
		if (isSCORM) {
			//model.scormHandler.getValue();
		}
	}
	menu.updateMenu(model.currPage, model.currMod, model.visitedArr);
	//================
	var tempTotalPage = 0;
	var tempCourseFinish = 0;
	// for (var i = 0; i < model.modArr.length; i++) {
	// tempTotalPage += model.modArr[i].length;
	// tempCourseFinish += model.visitedArr[i];
	// }
	for (var i = 0; i < model.visitedArr.length; i++) {
		tempTotalPage += model.visitedArr[i].length;
		for (var j = 0; j < model.visitedArr[i].length; j++) {
			if (model.visitedArr[i][j] == 2 || model.visitedArr[i][j] == '2') {
				tempCourseFinish++;
			}
		}
	}
	var tempPercentage = Math.round((tempCourseFinish / tempTotalPage) * 100);
	$("#shell_progressBar_lineTwo").css("width", tempPercentage + "%");
	$("#shell_progressBar_text").text(tempPercentage + "% course completed");
	if (tempPercentage == 100) {
		if (isSCORM) {
			model.scormHandler.setComplete();
		}
	}
	modCompletion();
};
Controller.prototype.setPageVisitedInitial = function() {

	model.setPagePartiallyVisited();
	if (isSCORM) {
		model.scormHandler.getValue();
	}
	menu.updateMenu(model.currPage, model.currMod, model.visitedArr);
	//setPageVisited(true);
};
Controller.prototype.updateModel = function() {
	model.modArr = menu.modArr;
	for (var i = 0; i < model.modArr.length; i++) {
		//model.visitedArr[i] = 0;
		model.visitedArr[i] = new Array();
		for (var j = 0; j < model.modArr[i].length; j++) {
			model.visitedArr[i][j] = 0;
		}
	}
};
Controller.prototype.calculateAssests = function() {
	allAssestsLoaded = false;
	$(".loader").css('width', 0 + '%');
	ProgressiveLoader.terminateLoader();
	ProgressiveLoader.initializeLoader();
	assestCnt = 0;
	loadedAssestsCnt = 0;
	var currentAudio = model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("audio");
	var currentExtDataPath = model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("data");
	var totalScripts = (model.modArr[model.currMod][model.currPage].scripts).split(",");
	var totalStyles = (model.modArr[model.currMod][model.currPage].styles).split(",");
	if (currentAudio != "") {
		assestCnt++;
	}
	if (currentExtDataPath != "") {
		assestCnt++;
	}
	if (totalScripts != "") {
		assestCnt += totalScripts.length;
	}
	if (totalStyles != "") {
		assestCnt += totalStyles.length;
	}

	/*for Image loading*/
	assestCnt++;
	// console.log("[Controller]  calculateAssests assestCnt::" + assestCnt);
	eventManager.addControlEventListener(ProgressiveLoader, "loaderUpdated", controller.processComplete);
	//ProgressiveLoader.setLoadedAssetCount(imageLoader.counter);
	ProgressiveLoader.setTotalAssetsCount(assestCnt);
};
Controller.prototype.processComplete = function() {
	$(".loader").css('width', ProgressiveLoader.getLoaderPercentage() + '%');
	// console.log('[Controller] processComplete: ' + ProgressiveLoader.getLoaderPercentage());
	if (ProgressiveLoader.getLoaderPercentage() == 100) {
		ProgressiveLoader.terminateLoader();
		pageLoadingAnim = true;
		if (isFunFacts) {
			$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
		}
		audioPlayer.StartAnimation();
		eventManager.removeControlEventListener(ProgressiveLoader, "loaderUpdated", controller.processComplete);
	} else {
	}
};
Controller.prototype.popupAudioPreload = function() {
	$(".loader").css('width', 0 + '%');
	ProgressiveLoader.terminateLoader();
	ProgressiveLoader.initializeLoader();
	assestCnt = 0;
	loadedAssestsCnt = 0;
	/*for Image loading*/
	assestCnt++;
	if (isFunFacts) {
		$("#funFactBtn").removeClass("funfactenabled").addClass("funfactdisabled");
	}
	eventManager.addControlEventListener(ProgressiveLoader, "loaderUpdated", controller.popupAudioComplete);
	//ProgressiveLoader.setLoadedAssetCount(imageLoader.counter);
	ProgressiveLoader.setTotalAssetsCount(assestCnt);
};
Controller.prototype.popupAudioComplete = function() {
	$(".loader").css('width', ProgressiveLoader.getLoaderPercentage() + '%');
	if (ProgressiveLoader.getLoaderPercentage() == 100) {
		//alert("processComplete");
		ProgressiveLoader.terminateLoader();
		if (isFunFacts) {
			$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
		}
		//audioPlayer.StartAnimation();
		eventManager.removeControlEventListener(ProgressiveLoader, "loaderUpdated", controller.popupAudioComplete);
	}
};
Controller.prototype.loadAudio = function(src) {
};

Controller.prototype.NavigatioTourComplete = function() {
	$(".loader").css('width', ProgressiveLoader.getLoaderPercentage() + '%');

	if (ProgressiveLoader.getLoaderPercentage() == 100) {
		navigationTour = true;
		ProgressiveLoader.terminateLoader();
		$(".NavTour").css("display", "block");
		$("#preloaderSpinner").css("display", "none");
		audioPlayer.StartNavAnimation();
		playNavAnimation();
		eventManager.removeControlEventListener(ProgressiveLoader, "loaderUpdated", controller.NavigatioTourComplete);
	}

};
Controller.prototype.loadAudio = function(src) {
};
var currentNavAudio = "";
function callNavigationTourAudio() {

	//--  Audio change with respect to device or desktop
	if (!device.iPhone() && !device.iPad() && !device.Android()) {
		//--------"Desktiop Audio"--------------
		currentNavAudio = "assets/audio/common/" + model.langName + "navTour.mp3";
	} else {
		//--------"Device Audio"--------------
		currentNavAudio = "assets/audio/common/" + model.langName + "navTour_mob.mp3";
	}
	//--  Audio change with respect to device or desktop
	audioPlayer.loadAudioPath(currentNavAudio);
	$(".loader").css('width', 0 + '%');
	$(".progress").css('width', 0 + '%');
	$("#preloaderSpinner").css("display", "block");
	ProgressiveLoader.terminateLoader();
	ProgressiveLoader.initializeLoader();
	assestCnt = 0;
	loadedAssestsCnt = 0;
	assestCnt++;
	//console.log("Enter"+assestCnt)
	eventManager.addControlEventListener(ProgressiveLoader, "loaderUpdated", controller.NavigatioTourComplete);
	ProgressiveLoader.setTotalAssetsCount(assestCnt);
	/*} else {
	 //var currentAudio = currentAudios[0]
	 }*/
}

function callInitialAudio() {
	// console.log('[Controller] callInitialAudio: ');
	if (!device.iPhone() && !device.iPad() && !device.Android()) {
		controller.calculateAssests();
		if (StartPage) {
			StartPage = false;
		}
	} else {
		if (!StartPage) {
			controller.calculateAssests();
		} else if (StartPage) {
			StartPage = false;
		}
	}
	if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
		var currentAudios = model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("audio").split(",");
		//-- Conclusion page audio
		if (model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("data-audioTime")) {
			audTiming = model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("data-audioTime").split(",");
			if (modCompleted) {
				var currentAudio = currentAudios[0];
			} else {
				if (currentAudios[1] != undefined) {
					var currentAudio = currentAudios[1];
				} else {
					var currentAudio = currentAudios[0];
				}
			}
		} else {
			var currentAudio = model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("audio");
		}
	} else {
		var currentAudio = model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("audio");
	}
	controller.loadExternalData();
	if (currentAudio != "") {
		isAudio = true;
		if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
			if (model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("data-audioTime")) {
				audioPlayer.loadAudioPath(model.commonaudioPath + currentAudio);
			} else {
				audioPlayer.loadAudioPath(model.audioPath + currentAudio);
			}
		} else {
			audioPlayer.loadAudioPath(model.audioPath + currentAudio);
		}
		//-- Debug: Delete this after rolling out changes to all files and uncomment above lines --//
		//audioPlayer.loadAudioPath(model.audioPath + currentAudio);
		//-----------------------------------------------------------------------------------------//
		//audioLoadPath();
	} else {
		isAudio = false;
		//audioPlayer.loadAudioPath(model.audioPath + "m01_l01_p02.mp3");
		//audioPlayer.loadAudioPath("");
		//audioLoadPath();
	}

}

function audioLoadPath() {
	// console.log('[Controller] audioLoadPath: ' + pageLoad + "::::" + ExternalDataLoad + "::::" + audioLoaded + ":::" + currentExtDataPath);
	if (pageLoad && ExternalDataLoad && audioLoaded) {
		//audioPlayer.StartAnimation();
		if ( typeof assignExternalData != 'undefined' && $.isFunction(assignExternalData)) {
			assignExternalData();
			pageLoadingAnim = true;
			if (isFunFacts) {
				$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
			}
		} else {
			controller.assignExternalData();
		}
	} else {
		setTimeout('audioLoadPath()', 1000);
	}

};
Controller.prototype.loadExternalData = function() {
	if (isFunFacts) {
		$("#funFactBtn").removeClass("funfactenabled").addClass("funfactdisabled");
	}
	ExternalDataLoad = false;
	currentExtDataPath = model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("data");
	if (currentExtDataPath == "") {
		ExternalDataLoad = true;
	} else {
		//-- Conclusion page data
		var path = "";
		if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
			if (model.menuData.getElementsByTagName("page")[model.currPage].getAttribute("data-audioTime")) {
				path = model.commondataPath + currentExtDataPath;
			} else {
				path = model.dataPath + currentExtDataPath;
			}
		} else {
			path = model.dataPath + currentExtDataPath;
		}
		//-- Debug: Delete this after rolling out changes to all files --//
		//path = model.dataPath + currentExtDataPath;
		//---------------------------------------------------------------//
		$.getJSON(path, function() {
		}).done(function(json) {
			ExternalData = json.ExternalData[0];
			ExternalDataLoad = true;
		}).fail(function() {
			console.log("[Controller] loadExternalData error");
		}).always(function() {
			// console.log("[Controller] loadExternalData complete");
		});
	}
};
Controller.prototype.mainLoadData = function() {
	var path = model.dataPath + model.mainData;
	$.getJSON(path, function() {
	}).done(function(json) {
		mainData = json.ExternalData[0];
		controller.funFactData();
		//-- Fun Fact updates
		if (isFunFacts) {
			if (!device.Android()) {
				FFVideoControl();
			}
		}
		//-- END: Fun Fact updates
		//menu.createMenu();
		//beginCourse();
	}).fail(function() {
		 console.log("[Controller] loadMainData error");
	});

};
Controller.prototype.funFactData = function() {
	var path = model.commondataPath + "funFact.json";
	$.getJSON(path, function() {
	}).done(function(json) {
		FFData = json.ExternalData[0];
		controller.assignFFData();
		controller.assignMainData();
		menu.createMenu();
		controller.createResourcesList();
		beginCourse();
	}).fail(function() {
		 console.log("[Controller] loadFunFactData error");
	});

};
Controller.prototype.assignFFData = function() {
	var rNo = 0;
	$.each(FFData, function(key, value) {
		FFDataArr.push(value.text);
		FFRandomArr.push(rNo);
		rNo++;
		//console.log(key + "::::" + value.text);
	});
	FFRandomArr = FFShuffle(FFRandomArr);
	//console.log("::::" + FFRandomArr);
};

Controller.prototype.assignMainData = function() {
	$.each(mainData, function(key, value) {
		if (key == "MenuData") {
			$.each(mainData.MenuData[0], function(key, value) {
				titlesArr.push(value.text);
				mobTitlesArr.push(value.mob_Text);
			});

		} else if (key == "ResourcesData") {
			$.each(mainData.ResourcesData[0], function(key, value) {
				resourceTitlesArr.push(value.title);
				resourceIconArr.push(value.icon);
				resourceDataArr.push(value.documentPath);
			});
		} else if (key == "course_title") {
			moduleTitleTxt = value.text;
			if (device.MobileDevice()) {
				var moduleTitleText = moduleTitleTxt;
				$(".CourseTitle-TT").html(moduleTitleTxt);
				if (window.orientation == 0) {
					if (model.langName == "ru/") {
						txtLen = 21;
					} else {
						txtLen = 29;
					}
					if (moduleTitleText.length > txtLen) {
						moduleTitle = true;
						var moduleTitleTxtLen = moduleTitleText.split(" ");
						moduleTitleText = addtitle(moduleTitleTxtLen);
					} else {
						moduleTitle = false;
					}
				}else{
					if (model.langName == "ru/") {
						txtLen = 45;
						if (moduleTitleText.length > txtLen) {
							moduleTitle = true;
							var moduleTitleTxtLen = moduleTitleText.split(" ");
							moduleTitleText = addtitle(moduleTitleTxtLen);
						} else {
							moduleTitle = false;
						}
					} 
				}
				$("." + key).html(moduleTitleText.trim());
				/*
				 if (value.mob_Text != "") {
				 $("." + key).html(value.mob_Text);
				 } else {
				 $("." + key).html(value.text);
				 }*/
			} else {
				if (model.langName == "ru/") {
					var moduleTitleText = moduleTitleTxt;
					$(".CourseTitle-TT").html(moduleTitleTxt);
					txtLen = 45;
					if (moduleTitleText.length > txtLen) {
						moduleTitle = true;
						var moduleTitleTxtLen = moduleTitleText.split(" ");
						moduleTitleText = addtitle(moduleTitleTxtLen);
					} else {
						moduleTitle = false;
					}
					$("." + key).html(moduleTitleText.trim());
				}else{
					$("." + key).html(value.text);
				}
			}
		} else {
			$("." + key).html(value.text);
		}
	});

};
function FFShuffle(array) {
	var tmp, current, top = array.length;
	if (top)
		while (--top) {
			current = Math.floor(Math.random() * (top + 1));
			tmp = array[current];
			array[current] = array[top];
			array[top] = tmp;
		}
	return array;
}

Controller.prototype.assignExternalData = function() {
	if (currentExtDataPath != "") {
		$.each(ExternalData, function(key, value) {
			if (key == "transcript") {
				transcript = value.text;
			} else {
				$("." + key).html(value.text);
			}

		});
	}
	loadedAssestsCnt++;
	//alert('data Loaded');
	// console.log("[Controller]  data Load Success" + loadedAssestsCnt);
	ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
	controller.assignTranscript(transcript[0]);
};
Controller.prototype.managePageClick = function(p, m) {
	audioPlayer.destroyAudio();
	gadgetsBtn.trigger("click", this.fnClick);
	model.setCurrPage(p, m);
	//console.log(model.currPage + "::" + (model.modArr[model.currMod].length));
	if (model.currPage == (model.modArr[model.currMod].length - 1)) {
		controller.setPageVisited();
	}
	callInitialAudio();
	// menuBtn.trigger("click", this.fnClick);
};
Controller.prototype.audioPause = function() {
	audioPlayer.pauseAudio();
	if (videoObject != null) {
		if (device.iPhone()) {
			videoObject_JQ.hide();
		} else {
			videoPauseState = videoObject.paused;
			videoObject.pause();
			videoObject.controls = false;
		}
	}
};
Controller.prototype.audioResume = function() {
	audioPlayer.resumeAudio();
	if (videoObject != null) {
		if (device.iPhone()) {
			videoObject_JQ.show();
		} else {
			videoObject.controls = true;
			if (!videoPauseState) {
				videoObject.play();
			}
		}
	}
};
Controller.prototype.menuBtnsControlEnable = function() {

	if (!nxtBakDisable) {
		var shellButtons = [$("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#transcript")];
	} else {
		var shellButtons = [$(".play"), $(".scrubber"), $("#transcript")];
	}

	for (var i = 0; i < shellButtons.length; i++) {
		if (shellButtons[i].hasClass("deactive")) {
			shellButtons[i].removeClass("deactive");
		}
	}
	if (!nxtBakDisable) {
		controller.nextBackEnable();
	}
	//if (!device.MobileDevice() && !device.Android()) {
	if (!device.MobileDevice()) {
		if ($("#transcript").hasClass("deactive")) {
			//$("#transcript").draggable('disable');
			$("#transcript").draggable({
				disabled : true
			});

		}
	};
};
Controller.prototype.menuBtnsControlDisable = function() {

	if (!nxtBakDisable) {
		var shellButtons = [$("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#transcript")];
	} else {
		var shellButtons = [$(".play"), $(".scrubber"), $("#transcript")];
	}

	for (var i = 0; i < shellButtons.length; i++) {
		shellButtons[i].addClass("deactive");
	}
	//if (!device.MobileDevice() && !device.Android()) {
	if (!device.MobileDevice()) {

		//$("#transcript").draggable('enable');
		if (!device.AndroidPhone() && !device.AndroidTablet()) {
			$("#transcript").draggable({
				disabled : false
			});
		}
	}
};
Controller.prototype.ShellBtnDisableforNavTour = function() {
	var shellButtons = [$("#shell_next"), $("#shell_back"), $("#transcript"), $(".audioButton")];
	for (var i = 0; i < shellButtons.length; i++) {
		shellButtons[i].addClass("deactive");
	}
	//$(".scrubber"),
	//$(".Papa_indicator").addClass("funfactdisabled");
	$(".lines-button").css("cursor", "default");
	$(".Course_Exit").css("cursor", "default");
	//$(".scrubber").css("cursor","default");
	$(".Shell_menu_nav li a").css("cursor", "default");
	$(".Shell_menu_nav li a").css("color", "#6b514b");

};
Controller.prototype.audioMuteToggle = function() {
	audioPlayer.toggleMuteAudio();
};
Controller.prototype.gadgetsBtnDisable = function() {
	if (!$("#gadgetsButn").hasClass("disabled")) {
		$("#gadgetsButn").addClass("disabled");
		$("#gadgetsButn").css("cursor", "default");
	}
	if (!$("#shell_exit").hasClass("disabled")) {
		$("#shell_exit").addClass("disabled");
		$("#shell_exit").css("cursor", "default");
	}
	controller.menuBtnsControlDisable();
};
Controller.prototype.gadgetsBtnEnable = function() {
	if ($("#gadgetsButn").hasClass("disabled")) {
		$("#gadgetsButn").removeClass("disabled");
		$("#gadgetsButn").css("cursor", "pointer");
	}
	if ($("#shell_exit").hasClass("disabled")) {
		$("#shell_exit").removeClass("disabled");
		$("#shell_exit").css("cursor", "pointer");
	}
	controller.menuBtnsControlEnable();
};
Controller.prototype.hidePreloader = function() {
	this.setPosition();
	// pagePreloader.hide();
	showBuffer(false);
};
Controller.prototype.hideAudioControls = function() {
	if (isAudio) {
		//$('.f3').css('display', 'block');
		$(".scrubber").css('display', 'block');
		$(".played").css('display', 'inline');
		$(".duration").css('display', 'inline');
		$(".time_seperator").css('display', 'inline');
		$("#divider").css('display', 'inline');

		if ($('.footer-holder .play').hasClass("disabled")) {
			$('.footer-holder .play').removeClass("disabled");
		}
		if ($(".time").hasClass("noneScrub_event")) {
			$(".time").removeClass("noneScrub_event");
		}
		//$('.footer-holder .play').css('display', 'block');
	} else {
		//$('.f3').css('display', 'none');
		controller.TranscriptDisableFn();
		$(".scrubber").css('display', 'none');
		$(".played").css('display', 'none');
		$(".duration").css('display', 'none');
		$(".time_seperator").css('display', 'none');
		$("#divider").css('display', 'none');
		if (!$('.footer-holder .play').hasClass("disabled")) {
			$('.footer-holder .play').addClass("disabled");
		}
		if (!$(".time").hasClass("noneScrub_event")) {
			$(".time").addClass("noneScrub_event");
		}

		//$('.footer-holder .play').css('display', 'none');
	}
};
Controller.prototype.removePreAssests = function(filename, filetype) {
	if (PreAssests == "") {
		return;
	}
	var filetype = "css";
	var filename = PreAssests;
	var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
	var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
	var allsuspects = document.getElementsByTagName(targetelement);
	for (var i = allsuspects.length; i >= 0; i--) {
		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
			allsuspects[i].parentNode.removeChild(allsuspects[i]);
	}
	//this.removePreAssestsJS();
};
Controller.prototype.removePreAssestsJS = function(filename, filetype) {
	if (PreAssests == "") {
		return;
	}
	var filetype = "js";
	var filename = PreAssests.split(".")[0] + "." + filetype;
	var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
	var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
	var allsuspects = document.getElementsByTagName(targetelement);
	for (var i = allsuspects.length; i >= 0; i--) {
		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
			allsuspects[i].parentNode.removeChild(allsuspects[i]);
	}
};
Controller.prototype.loadAssests = function() {
	//-- Triggered from HTML pg script
	controller.setLangImagePath();
	if (audioLoaded) {
		var loadfiles = 0;
		totalScripts = (model.modArr[model.currMod][model.currPage].scripts).split(",");
		// console.log("[Controller] loadAssests complete" + totalScripts);
		if (totalScripts.length == 1) {
			if (searchPath(totalScripts[0]) == -1) {
				var scriptPath = model.scriptPath + totalScripts[0].trim();
			} else {
				var scriptPath = totalScripts[0].trim();
			}
			// console.log("[Controller] loadAssests scriptPath" + scriptPath);
			$.getScript("" + scriptPath).done(function(script, textStatus) {
				loadfiles++;
				loadedAssestsCnt++;
				//alert('script Loaded' + scriptPath);
				ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
				// console.log("[Controller]  script Load Success" + loadedAssestsCnt);
			});

		} else {
			controller.loadAdditionalAssests();
		}
		audioLoadPath();
	} else {
		setTimeout('controller.loadAssests()', 1000);
	}

};
Controller.prototype.loadAdditionalAssests = function() {
	var scriptPath = "";
	var loadfiles = 0;
	var totalScripts = (model.modArr[model.currMod][model.currPage].scripts).split(",");
	for (var i = 0; i < totalScripts.length; i++) {
		if (searchPath(totalScripts[i]) == -1) {
			//var scriptPath = model.scriptPath + totalScripts[i].trim();
		} else {
			scriptPath = totalScripts[i].trim();
		}
		if (scriptPath != "") {
			$.getScript("" + scriptPath).done(function(script, textStatus) {
				loadfiles++;
				if (loadfiles == (totalScripts.length - 1)) {
					controller.loadMainAssests();
				}
				loadedAssestsCnt++;
				// console.log("[Controller]  css Load Success" + loadedAssestsCnt);
				ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
			});
		}
	}

};
Controller.prototype.loadMainAssests = function() {
	var scriptPath = "";
	var totalScripts = (model.modArr[model.currMod][model.currPage].scripts).split(",");
	if (searchPath(totalScripts[totalScripts.length - 1]) == -1) {
		scriptPath = model.scriptPath + totalScripts[totalScripts.length - 1].trim();
	}
	if (scriptPath != "") {
		$.getScript("" + scriptPath).done(function(script, textStatus) {
			//console.log(textStatus + ":::::::::" + script);
		});
	}
};

Controller.prototype.loadStyles = function() {
	var totalPreAssests = PreAssests.split(".css");
	for (var i = 0; i < totalPreAssests.length; i++) {
		if (totalPreAssests[i] != "") {
			PreAssests = totalPreAssests[i] + ".css";
			controller.removePreAssests();
		}
	}
	PreAssests = "";
	styleLoading(0);
};

function styleLoading(loadCnt) {
	var totalStyles = (model.modArr[model.currMod][model.currPage].styles).split(",");
	var loadfiles = loadCnt;
	var stylePath = "";
	if (searchPath(totalStyles[loadfiles]) == -1) {
		stylePath = model.CSSPath + totalStyles[loadfiles].trim();
	} else {
		stylePath = totalStyles[loadfiles].trim();
	}
	stylePath += '?style=' + Math.random();
	var assestPreload = $.ajax(stylePath).done(function() {
		$('<link rel="stylesheet" type="text/css" href=' + stylePath + '>').appendTo("head");
		loadfiles++;
		if (loadfiles == (totalStyles.length)) {
			loadedAssestsCnt++;
			// console.log("[Controller] css Load Success" + loadedAssestsCnt);
			ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
			setTimeout('preloadingDone()', 50);
		} else {
			//console.log(loadfiles + ":else:" + totalStyles.length);
			loadedAssestsCnt++;
			//alert('css Loaded' + stylePath);
			// console.log("[Controller] css Load Success" + loadedAssestsCnt);
			ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
			styleLoading(loadfiles);
		}
	});
	PreAssests += totalStyles[loadfiles].trim();
}

function searchPath(path) {
	var str = "/";
	var index = path.search(str);
	return index;
}

Controller.prototype.fnMouseOver = function(e) {
	e.stopPropagation();
	//console.log('[Controller fnMouseOver] @ ' + e.currentTarget.id);
	switch(e.currentTarget.id) {
	case "shell_mod_title_bar":
		if (!pageTitle) {
			return;
		}
		if (pageTitleTimer) {
			clearTimeout(pageTitleTimer);
		}
		$(".CourseTitle-TT").fadeOut();
		$(".PageTitle-TT").fadeIn();
		if (device.iPhone() || device.Android() || device.iPad()) {
			pageTitleTimer = setTimeout(function() {
				$(".PageTitle-TT").fadeOut();
			}, titleDuration);
		}
		break;
	case "modTitle":
		if (!moduleTitle) {
			return;
		}
		if (modTitleTimer) {
			clearTimeout(modTitleTimer);
		}
		$(".PageTitle-TT").fadeOut();
		$(".CourseTitle-TT").fadeIn();
		if (device.iPhone() || device.Android() || device.iPad()) {
			modTitleTimer = setTimeout(function() {
				$(".CourseTitle-TT").fadeOut();
			}, titleDuration);
		}
		break;
	default:
	}
};

Controller.prototype.fnMouseOut = function(e) {
	e.stopPropagation();
	//console.log('[Controller fnMouseOut] @ ' + e.currentTarget.id);
	switch(e.currentTarget.id) {
	case "shell_mod_title_bar":
		if (!pageTitle) {
			return;
		}
		pageTitleTimer = setTimeout(function() {
			$(".PageTitle-TT").fadeOut();
		}, titleDuration);
		break;
	case "modTitle":
		if (!moduleTitle) {
			return;
		}
		modTitleTimer = setTimeout(function() {
			$(".CourseTitle-TT").fadeOut();
		}, titleDuration);
		break;
	default:
	}
};

Controller.prototype.fnClick = function(e) {
	e.stopPropagation();
	if ($(this).hasClass("GadgetDisable")) {
		return;
	}
	if ($(this).hasClass("disabled") || $(this).hasClass("deactive")) {
		return;
	}
	if ($(this).hasClass("funfactdisabled")) {
		return;
	}
	// console.log('[Controller] @ ' + e.currentTarget.id);
	switch(e.currentTarget.id) {
	case "shell_next":
		model.nextPage();
		//console.log(model.currPage + "::" + model.modArr[model.currMod].length);
		if (model.currPage == (model.modArr[model.currMod].length - 1)) {
			controller.setPageVisited();
		}
		callInitialAudio();
		break;
	case "shell_back":
		model.prevPage();
		callInitialAudio();
		break;
	//case "shell_menu":
	case "gadgetsButn":
		if (isTranscript == "false" || !isTranscript) {
			if (!$("#shell_transcript").hasClass("deactive")) {
				$("#shell_transcript").addClass("deactive");
			}
		}
		//controller.menuBtnsControlToggle();
		if (!device.MobileDevice()) {
			controller.gadgetsBtnDisable();
			if (preMenu == "" || preMenuID == "") {
				//$("#Shell_menu").slideToggle();
				$("#Shell_menu").slideToggle("fast", function() {
					fnLoadMenu();
				});
			} else {
				if (preMenuID.hasClass("active")) {

				} else {
					$("#Shell_menu").slideToggle("slow", function() {
						//iPadDebug1("::HereA::");
						controller.gadgetsBtnEnable();
					});
				}
			}

		} else {

			$('#Shell_menu').toggle('slide', {
				direction : directionSide
			}, 500);

		}
		if ($("#gadgetsButn").hasClass("close")) {
			$("#gadgetsButn").removeClass("close");
			resetMenu();
			if ($('.footer-holder .play').hasClass("playing")) {
				//iPadDebug1("::HereA::");
				controller.audioResume();
			}
			if (device.MobileDevice()) {
				if (pageLoadingAnim) {
					controller.menuBtnsControlEnable();
				}
				$(".menuovrlay").css("display", "none");
			} else {

				$(".menuovrlay").css("display", "none");
			}
			if (device.iPhone()) {
				fnVideoControlsEnable();
			}
		} else {
			//$("#Shell_menu").slideToggle();
			$('#Shell_menu').css("display", "block");
			if ($('.footer-holder .play').hasClass("playing")) {
				controller.audioPause();
			}
			if (device.MobileDevice()) {
				controller.menuBtnsControlDisable();
				$(".menuovrlay").css("display", "block");
			} else {
				$(".menuovrlay").css("display", "block");
			}
			$("#gadgetsButn").addClass("close");
			if (device.iPhone()) {
				fnVideoControlsDisable();
			}
		}

		break;

	case "glossarybtn":
		menuControl(glossaryBtn, $("#glossarybtn"));
		if (!device.MobileDevice()) {
			//$("#glossaryDrp").slideToggle();
			$("#glossaryDrp").slideToggle("slow", function() {
				if (preMenu == "" || preMenuID == "") {
					$("#Shell_menu").slideToggle("slow", function() {
						//iPadDebug1("::Here4::");
						controller.gadgetsBtnEnable();
					});
				}
			});
		} else {
			$("#glossaryDrp").toggle('slide', {
				direction : directionSide
			}, 500);
		}
		if (!$("#glossarybtn").hasClass("active")) {
			$("#glossarybtn").addClass("active");
			if ($(".pageWrapper").hasClass("RTL")) {
				$("#glossarybtn span").css('transform', 'rotate(-90deg)');
			} else {
				$("#glossarybtn span").css('transform', 'rotate(90deg)');
			}
			$("#alphbet_wraper").scrollTop(0);
			$('#alphbet_wraper').mCustomScrollbar();
			$(".glossList").scrollTop(0);
			$('.glossList').mCustomScrollbar();

		} else {
			$("#glossarybtn").removeClass("active");
			$("#glossarybtn span").css('transform', 'rotate(0deg)');
			if ($("#alphbet_wraper").hasClass("mCustomScrollbar")) {
				$('#alphbet_wraper').mCustomScrollbar("destroy");
			}
			if ($(".glossList").hasClass("mCustomScrollbar")) {
				$('.glossList').mCustomScrollbar("destroy");
			}

		}
		break;
	case "Resourcesbtn":
		menuControl(Resourcebtn, $("#Resourcesbtn"));
		if (!device.MobileDevice()) {
			//$("#RsourcesDrp").slideToggle();
			$("#RsourcesDrp").slideToggle("slow", function() {
				if (preMenu == "" || preMenuID == "") {
					$("#Shell_menu").slideToggle("slow", function() {
						//iPadDebug1("::Here5::");
						controller.gadgetsBtnEnable();
					});
				}
			});
		} else {
			$("#RsourcesDrp").toggle('slide', {
				direction : directionSide
			}, 500);
		}
		if (!$("#Resourcesbtn").hasClass("active")) {
			$("#Resourcesbtn").addClass("active");
			if ($(".pageWrapper").hasClass("RTL")) {
				$("#Resourcesbtn span").css('transform', 'rotate(-90deg)');
			} else {
				$("#Resourcesbtn span").css('transform', 'rotate(90deg)');
			}

		} else {
			$("#Resourcesbtn").removeClass("active");
			$("#Resourcesbtn span").css('transform', 'rotate(0deg)');
		}

		break;
	case "helpbtn":
		menuControl(helpBtn, $("#helpbtn"));
		if (!device.MobileDevice()) {
			//$("#helpDrp").slideToggle();
			$("#helpDrp").slideToggle("slow", function() {
				if (preMenu == "" || preMenuID == "") {
					$("#Shell_menu").slideToggle("slow", function() {
						//iPadDebug1("::Here6::");
						controller.gadgetsBtnEnable();
					});
				}
			});
		} else {
			$("#helpDrp").toggle('slide', {
				direction : directionSide
			}, 500);
		}
		if (!$("#helpbtn").hasClass("active")) {
			$("#helpbtn").addClass("active");
			if ($(".pageWrapper").hasClass("RTL")) {
				$("#helpbtn span").css('transform', 'rotate(-90deg)');
			} else {
				$("#helpbtn span").css('transform', 'rotate(90deg)');
			}
			$("#helpDrp").mCustomScrollbar();
			$("#helpDrp").mCustomScrollbar("update");
		} else {
			$("#helpbtn").removeClass("active");
			$("#helpbtn span").css('transform', 'rotate(0deg)');
			if ($("#helpDrp").hasClass("mCustomScrollbar")) {
				$('#helpDrp').mCustomScrollbar("destroy");
			}
		}
		break;
	case "shell_mute":
		//alert("::here::" + $("#shell_mute").hasClass("active"));
		controller.audioMuteToggle();
		if (!$("#shell_mute").hasClass("active")) {
			$("#shell_mute").addClass("active");
			if ($("#audio_Icon").hasClass("icon-soundOn")) {
				$("#audio_Icon").removeClass("icon-soundOn").addClass("icon-soundOff");
			}
			$("#audio_Icon").addClass("icon-soundOff");
			if ($(".pageWrapper").hasClass("RTL")) {
				$("#shell_mute span").css('transform', 'rotate(-90deg)');
			} else {
				$("#shell_mute span").css('transform', 'rotate(90deg)');
			}

		} else {
			$("#shell_mute").removeClass("active");
			if ($("#audio_Icon").hasClass("icon-soundOff")) {
				$("#audio_Icon").removeClass("icon-soundOff").addClass("icon-soundOn");
			}
			$("#shell_mute span").css('transform', 'rotate(0deg)');
		}
		gadgetsBtn.trigger("click", this.fnClick);

		break;
	case "audio_Icon":
		controller.audioMuteToggle();
		//alert($("#shell_mute").hasClass("active"));
		if (!$("#shell_mute").hasClass("active")) {
			$("#shell_mute").addClass("active");
			if ($("#audio_Icon").hasClass("icon-soundOn")) {
				$("#audio_Icon").removeClass("icon-soundOn").addClass("icon-soundOff");
			}
			$("#audio_Icon").addClass("icon-soundOff");
			if ($(".pageWrapper").hasClass("RTL")) {
				$("#shell_mute span").css('transform', 'rotate(-90deg)');
			} else {
				$("#shell_mute span").css('transform', 'rotate(90deg)');
			}
		} else {
			$("#shell_mute").removeClass("active");
			if ($("#audio_Icon").hasClass("icon-soundOff")) {
				$("#audio_Icon").removeClass("icon-soundOff").addClass("icon-soundOn");
			}
			$("#shell_mute span").css('transform', 'rotate(0deg)');
		}
		//gadgetsBtn.trigger("click", this.fnClick);

		break;
	case "shell_transcript":
		gadgetsBtn.trigger("click", this.fnClick);
		toggleTranscript();
		break;

	case "shell_glossary_phone":
		glossaryBtn.trigger("click", this.fnClick);
		break;
	case "Resourcesbtn_phone":
		resourcesBtn.trigger("click", this.fnClick);
		break;
	case "helpbtn_phone":
		helpBtn.trigger("click", this.fnClick);
		break;
	case "shell_note_phone":
		noteBtn.trigger("click", this.fnClick);
		break;
	case "shell_transcript_phone":
		transcriptBtn.trigger("click", this.fnClick);
		break;
	case "shell_exit":
		if (!modCompleted) {
			$(".exitInsTxt").html(UITxtData.exitInsTxt.alt_text);
			$(".yesTxt").html(UITxtData.yesTxt.alt_text);
			$(".noTxt").html(UITxtData.noTxt.alt_text);
		} else {
			$(".exitInsTxt").html(UITxtData.exitInsTxt.text);
			$(".yesTxt").html(UITxtData.yesTxt.text);
			$(".noTxt").html(UITxtData.noTxt.text);
		}
		exitPop.show();
		popup_disable_bg.show();

		controller.audioPause();
		break;
	case "Mob_shell_exit":
		if (!modCompleted) {
			$(".exitInsTxt").html(UITxtData.exitInsTxt.alt_text);
			$(".yesTxt").html(UITxtData.yesTxt.alt_text);
			$(".noTxt").html(UITxtData.noTxt.alt_text);
		} else {
			$(".exitInsTxt").html(UITxtData.exitInsTxt.text);
			$(".yesTxt").html(UITxtData.yesTxt.text);
			$(".noTxt").html(UITxtData.noTxt.text);
		}
		exitPop.show();
		popup_disable_bg.show();
		controller.audioPause();
		break;
	case "shell_yes_btn":
		finish();
		window.top.close();
		// 	window.location.reload();
		popup_disable_bg.show();
		break;
	case "shell_no_btn":
		exitPop.hide();
		popup_disable_bg.hide();
		if ($('.footer-holder .play').hasClass("playing") && $("#Shell_menu").css("display") == "none") {
			controller.audioResume();
		}
		break;
	case "shell_g_close":
		glossaryPop.hide();
		popup_disable_bg.hide();
		$("#shell_GlossaryAlphabets").scrollTop(0);
		if ($("#transText").hasClass("mCustomScrollbar")) {
			$('#shell_GlossaryAlphabets').mCustomScrollbar("destroy");
		}
		if ($(".gadeget_item").css("left") == "0px") {
		} else if ($('.navigator .play').hasClass('playing')) {// || pg_snd.position == null) {
			controller.audioResume();
		}
		controller.gadgetsBtnEnable();
		break;
	case "shell_r_close":
		resourcesPop.hide();
		popup_disable_bg.hide();
		if ($(".gadeget_item").css("left") == "0px") {
		} else if ($('.navigator .play').hasClass('playing')) {// || pg_snd.position == null) {
			controller.audioResume();
		}
		controller.gadgetsBtnEnable();
		break;
	case "shell_h_close":
		helpPop.hide();
		popup_disable_bg.hide();
		if ($('.navigator .play').hasClass('playing')) {// || pg_snd.position == null) {
			controller.audioResume();
		}
		break;
	case "shell_n_close":
		notePop.hide();
		popup_disable_bg.hide();
		controller.audioResume();
		break;
	case "shell_e_close":
		exitPop.hide();
		popup_disable_bg.hide();
		controller.audioResume();
		break;
	case "shell_m_close":
		// gadgetsBtn.trigger("click", this.fnClick);
		hotBtn.trigger("click", this.fnClick);
		if ($(".gadeget_item").css("left") == "0px") {
		} else if ($('.navigator .play').hasClass('playing')) {
			controller.audioResume();
		}
		controller.gadgetsBtnEnable();
		break;
	case "contnuBtn":
		$(".NV_tour_overlay").css("display", "none");
		controller.audioResume();
		break;
	case "funFactBtn":
		if (isFunFacts) {
			$("#funFactBtn").removeClass("funfactenabled").addClass("funfactdisabled");
		}
		controller.gadgetsBtnDisable();
		videoBack = false;
		if ($('.footer-holder .play').hasClass("playing")) {
			audioPlayer.pauseAudio();
		}
		if (device.Android()) {
			$(".FunFactcontntWapr").css("display", "block");
		} else {
			$(".FunFactcontntWapr").css("display", "none");
		}
		$(".FunFactWapr").css("display", "block");
		$(".FunFactQuoteInner p").html(FFDataArr[FFRandomArr[FFDataCnt]]);
		$(".FunFactQuoteInner").mCustomScrollbar();
		$(".FunFactQuoteInner").mCustomScrollbar("update");
		FFDataCnt++;
		if (FFDataCnt == FFRandomArr.length) {
			FFDataCnt = 0;
		}

		//-- Fun Fact
		if (isFunFacts) {
			if (!device.Android()) {
				//ffVidListener();
				/*if (device.iPad()) {
				 FFVideo = document.getElementById("bgvid_ipad");
				 FFVideo.addEventListener('loadedmetadata', naturalSize, false);
				 } else {
				 FFVideo = document.getElementById("bgvid");
				 }*/
			}
		}
		//-- END: Fun Fact updates
		if (!device.Android()) {
			FFVideo.play();
			if (device.iPad()) {
				FFIpadEvent = setInterval(updateFFCT, 500);
			} else {
				FFVideo.currentTime = 0.1;
			}
		}
		break;
	case "FFBackBtn":
		if (device.MobileDevice() || device.Android()) {
			$(".FunFactWapr").css("display", "none");
			$(".FunFactcontntWapr").css("display", "none");
			if ($("#gadgetsButn").hasClass("close")) {

			} else {
				if ($('.footer-holder .play').hasClass("playing")) {
					controller.audioResume();
				}
			}
			if (isFunFacts) {
				$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
			}
		} else {
			videoBack = true;
			FFVideo.currentTime = 8.7;
			FFVideo.play();
		}
		controller.gadgetsBtnEnable();
		break;
	case "FFMBtn":
		gadgetsBtn.trigger("click", this.fnClick);
		controller.gadgetsBtnDisable();
		if ($('.footer-holder .play').hasClass("playing")) {
			audioPlayer.pauseAudio();
		}
		$(".FunFactcontntWapr").css("display", "none");
		$(".FunFactWapr").css("display", "block");
		$(".FunFactcontntWapr").css("display", "block");
		$(".FunFactQuoteInner p").html(FFDataArr[FFRandomArr[FFDataCnt]]);
		$(".FunFactQuoteInner").mCustomScrollbar();
		$(".FunFactQuoteInner").mCustomScrollbar("update");
		FFDataCnt++;
		if (FFDataCnt == FFRandomArr.length) {
			FFDataCnt = 0;
		}
		if (isFunFacts) {
			$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
		}
		break;
	case "menubtn":
		if (!device.MobileDevice()) {
			$("#Menudrp").slideToggle("slow", function() {
				if (preMenu == "" || preMenuID == "") {
					$("#Shell_menu").slideToggle("slow", function() {
						//iPadDebug1(pageLoad+"::Here2::"+showAudioLoading);
						if (pageLoadingAnim) {
							controller.gadgetsBtnEnable();
						}
						/*if(pageLoad)
						 {
						 controller.gadgetsBtnEnable();

						 }*/
					});
					//iPadDebug1("::Here2::");

				} else {
					//iPadDebug1("::Here1::")
				}
			});
		} else {
			$("#Menudrp").toggle('slide', {
				direction : directionSide
			}, 500);
		}
		menuControl(menuBtn, $("#menubtn"));
		if (!$("#menubtn").hasClass("active")) {
			$("#menubtn").addClass("active");
			if ($(".pageWrapper").hasClass("RTL")) {
				$("#menubtn span").css('transform', 'rotate(-90deg)');
			} else {
				$("#menubtn span").css('transform', 'rotate(90deg)');
			}
			$("#shell_mod_0_pages").scrollTop(0);
			$(".ShellMenuWrapper").mCustomScrollbar();
			$(".ShellMenuWrapper").mCustomScrollbar("update");

		} else {
			if ($(".ShellMenuWrapper").hasClass("mCustomScrollbar")) {
				$(".ShellMenuWrapper").mCustomScrollbar("destroy");
			}
			$("#menubtn").removeClass("active");
			$("#menubtn span").css('transform', 'rotate(0deg)');

		}

		break;
	default:
	//code to be executed if n is different from case 1 and 2
	}
};

var FFIpadEvent = 0;
var watchBuffer = 0;

function fnLoadMenu() {
	$("#Menudrp").slideToggle("slow", function() {
		if (preMenu == "" || preMenuID == "") {
			$("#Shell_menu").slideToggle();
		}
		controller.gadgetsBtnEnable();
	});
	menuControl(menuBtn, $("#menubtn"));
	if (!$("#menubtn").hasClass("active")) {
		$("#menubtn").addClass("active");
		if ($(".pageWrapper").hasClass("RTL")) {
			$("#menubtn span").css('transform', 'rotate(-90deg)');
		} else {
			$("#menubtn span").css('transform', 'rotate(90deg)');
		}
		$("#shell_mod_0_pages").scrollTop(0);
		$(".ShellMenuWrapper").mCustomScrollbar();
		$(".ShellMenuWrapper").mCustomScrollbar("update");

	} else {
		if ($(".ShellMenuWrapper").hasClass("mCustomScrollbar")) {
			$(".ShellMenuWrapper").mCustomScrollbar("destroy");
		}
		$("#menubtn").removeClass("active");
		$("#menubtn span").css('transform', 'rotate(0deg)');

	}
}

function updateFFCT() {
	//iPadDebug('[FF]' + FFVideo.readyState);
	if (FFVideo.readyState == 4) {
		ffVidLoop(false);
	}
}

function FFVideoControl() {
	watchBuffer = setInterval(updateProgressBar, 500);
	FFVideo.ontimeupdate = function() {
		ffVidLoop(true);
	};
}

function ffVidLoop(isDesktop) {
	var videoDuration = FFVideo.duration;
	var buffered = FFVideo.buffered.end(0);
	//FFVideo.currentTime = 0.1;
	var percent = 100 * buffered / videoDuration;
	if (FFVideo.currentTime > 8.1 && !videoBack) {
		//-- Anim Loop
		FFVideo.currentTime = 2;
		if (isDesktop) {
			FFVideo.play();
		}
	} else if (FFVideo.currentTime > 0.85 && !videoBack) {
		//-- Show Text
		$(".FunFactcontntWapr").css("display", "block");
	} else if (FFVideo.currentTime >= 8.2) {
		//-- Hide Text
		$(".FunFactcontntWapr").css("display", "none");
	}
	// console.log(FFVideo.currentTime + " :: " + FFVideo.duration);
	if (FFVideo.currentTime >= FFVideo.duration) {
		$(".FunFactcontntWapr").css("display", "none");
		$(".FunFactWapr").css("display", "none");
		if (!isDesktop) {
			clearInterval(FFIpadEvent);
		}
		//controller.gadgetsBtnEnable();
		if (isFunFacts) {
			$("#funFactBtn").removeClass("funfactdisabled").addClass("funfactenabled");
		}
		$(".FunFactWapr").css("display", "none");
		if ($(".FunFactQuoteInner").hasClass("mCustomScrollbar")) {
			$(".FunFactQuoteInner").mCustomScrollbar("destroy");
		}
		if ($("#gadgetsButn").hasClass("close")) {

		} else {
			if ($('.footer-holder .play').hasClass("playing")) {
				controller.audioResume();
			}
		}
	}
}

var updateProgressBar = function() {
	var videoDuration = FFVideo.duration;
	//alert("updateProgressBar::" + videoDuration+"::"+FFVideo.readyState);
	if (FFVideo.readyState) {
		var buffered = FFVideo.buffered.end(0);
		var percent = 100 * buffered / videoDuration;
		//console.log(buffered + "::videoDuration::" + videoDuration);
		//-- If finished buffering buffering quit calling it
		if (buffered >= videoDuration) {
			//alert("videoLoaded");
			clearInterval(watchBuffer);
		}
	}
};

function menuControl(currEventID, currID) {
	if (preMenu == currEventID || preMenu == "") {
		//return;
	} else {
		if (preMenuID.hasClass("active")) {
			preMenu.trigger("click", this.fnClick);
		}
	}
	preMenu = currEventID;
	preMenuID = currID;
}

function resetMenu() {
	if (preMenu == "" || preMenuID == "") {
		return;
	} else {
		if (preMenuID.hasClass("active")) {
			preMenu.trigger("click", this.fnClick);
		}
	}
	preMenu = "";
	preMenuID = "";
}

Controller.prototype.menuBtnsControlToggle = function() {
	if (!nxtBakDisable) {
		var shellButtons = [$("#shell_next"), $("#shell_back"), $(".play"), $(".scrubber"), $("#transcript")];
	} else {
		var shellButtons = [$(".play"), $(".scrubber"), $("#transcript")];
	}
	for (var i = 0; i < shellButtons.length; i++) {
		if (shellButtons[i].hasClass("deactive")) {
			shellButtons[i].removeClass("deactive");
		} else {
			shellButtons[i].addClass("deactive");
		}
	}
	if (!device.MobileDevice()) {
		if ($("#transcript").hasClass("deactive")) {
			$("#transcript").draggable({
				disabled : true
			});

		} else {
			if (!device.AndroidPhone() && !device.AndroidTablet()) {
				$("#transcript").draggable({
					disabled : false
				});
			}
		}
	};
};

Controller.prototype.nextBackDisable = function() {
	nxtBakDisable = true;
	var shellButtons = [$("#shell_next"), $("#shell_back")];
	for (var i = 0; i < shellButtons.length; i++) {
		if (!shellButtons[i].hasClass("deactive")) {
			shellButtons[i].addClass("deactive");
		}
	}

};
Controller.prototype.nextBackEnable = function() {
	nxtBakDisable = false;
	var shellButtons = [$("#shell_next"), $("#shell_back")];
	for (var i = 0; i < shellButtons.length; i++) {
		if (shellButtons[i].hasClass("deactive")) {
			shellButtons[i].removeClass("deactive");
		}
	}
};
function hideIText(el) {
	TweenLite.set(el, {
		clearProps : 'all'
	});
	el.hide();
}

function animateIText() {
	if (!device.Android() && !device.iPhone() && !device.iPad()) {
		$("#clickText").html("Click");
	} else {
		$("#clickText").html("Tap");
	}
}

function naturalSize() {
	var myContent = document.getElementById('iVideoWrap');
	myVideo.height = FFVideo.videoHeight;
	myVideo.width = FFVideo.videoWidth;
	//if the video is bigger than the container it'll fit
	ratio = FFVideo.videoWidth / FFVideo.videoHeight;
	if (parseInt(myContent.offsetWidth, 10) < FFVideo.videoWidth) {
		FFVideo.height = FFVideo.videoHeight * parseInt(myContent.offsetWidth, 10) / FFVideo.videoWidth;
		FFVideo.width = parseInt(myContent.offsetWidth, 10);
	}
}

// register listener function on metadata load
function ffVidListener() {
	var ffVid = document.getElementById('bgvid_ipad');
	ffVid.addEventListener('loadedmetadata', naturalSize, false);
}

function fnVideoControlsDisable() {

	if ($('.videoContainer video source').attr('src')) {
		$('.videoContainer').css('display', 'none');
	}
}

function fnVideoControlsEnable() {
	$('.videoContainer').css('display', 'block');
}

Controller.prototype.createResourcesList = function() {
	if (isResources == "true" || isResources == true) {
		$('#RsourcesDrp ul').html("");
		for (var i = 0; i < resourceTitlesArr.length; i++) {
			$("#RsourcesDrp ul").append('<li class="' + resourceIconArr[i] + '"><a href="' + resourceDataArr[i] + '" target="_blank">' + resourceTitlesArr[i] + '</a></li>');
			//tempArr[i]="";
		}
	}
};
function iPadDebug1(msg) {
	if ($('.pageTitle > p').hasClass('debug')) {
		$('.pageTitle > p').append('<br>' + msg);
	} else {
		$('.pageTitle').append('<p class="debug" style="color: #FF0000; text-align: left; text-shadow: 1px 1px 2px #000000; max-height: 470px; overflow-y: auto; position: absolute; top: 0px; width: 50%; z-index: 2000">Debug:<br>' + msg + '</p>');
	}
}
