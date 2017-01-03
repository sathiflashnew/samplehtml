// ----------------- shell level global variables are declared here ---------------- //
var controller;
// var Bookmark_location = "notSet";
var loadingDone = false;
var orientationChange = null;
var clickedBookmarkYes = false;
var navigationTour = false;
var ie8Browser = false;
var BVersion;
var BName;
var os;
var introPage = null;
var clickableMenu = false;
var isHelpPlayed = false;
var initPgLoadCnt = 0;
var audioPlayer = new AudioPlayer();
var pg_snd;
var isControllerInitiated = false;
var langNm;
//-- isSCORM will be true for Local and Build SCORM verison. It will be false for Build Web version
var isSCORM = "@web@";
isSCORM = isSCORM != "false" ? true : false;
//
var isTranscript = false;
var isResources = false;
var isNavTour = true;
var isFunFacts = true;
//
$(document).ready(function() {
	//$('#splashContainer').css("display", "none")
	ie8Browser = false;
	if (!device.AndroidPhone() && !device.AndroidTablet()) {
		$("#transcript").draggable({
			containment : "#shell_pageLoader",
			cancel : "#transText"
		});
		$("#transcript").bind('dragstart', function(event) {
			if (!device.AndroidPhone() && !device.AndroidTablet() && !device.iPhone() && !device.iPad()) {
				//$('#transText').mCustomScrollbar("destroy");
				$('#transText').css('overflow-y', 'hidden');
			}
		}).bind('drag', function(event) {
			if (!device.AndroidPhone() && !device.AndroidTablet() && !device.iPhone() && !device.iPad()) {
				//$('#transText').mCustomScrollbar("destroy");
				//-- overflow-y specifically provided for IE, else it will throw error
				$('#transText').css('overflow-y', 'hidden');
			}
		}).bind('dragstop', function(event) {
			if (!device.AndroidPhone() && !device.AndroidTablet() && !device.iPhone() && !device.iPad()) {
				$('#transText').css('overflow', 'auto');
				//$('#transText').mCustomScrollbar();
				//$('#transText').getNiceScroll().resize();
			}
		});
	}
	//
	BVersion = BrowserDetect.version;
	BName = BrowserDetect.browser;
	if (device.iPhone() || device.iPad()) {
		$("#shell_mute").css('display', 'none');
		$("#audio_Icon").css('display', 'none');
		$("body").addClass("deviceiOS");
	}
	if (device.MobileDevice()) {
		$("#audio_Icon").css('display', 'none');
		$(".time").css('display', 'none');
	}
	if (device.AndroidPhone()) {
		$(".Audio").css('display', 'block');
	} else {
		$(".Audio").css('display', 'none');

	}
	$('.click_next_Continue').css('display', 'none');
	showNavTourLink();
	// if (device.Android()) {
	// $(".footer-holder").css("display", "block");
	// }
	if (BName == "Safari") {
		if (BVersion < 4) {
			alert("The minimum browser requirements for this course are IE9 or Mozilla Firefox 3.6 or Chrome 5 or Safari 4.");
		}
	} else if (BName == "Explorer") {
		if (BVersion < 9) {
			//window.location="browserChk.html";
			ie8Browser = true;
		}
	} else if (BName == "Firefox") {
		if (BVersion < 3.6) {
			//window.location="browserChk.html";
		}
	} else if (BName == "Chrome") {
		if (BVersion < 5) {
			//window.location="browserChk.html";
		}
	} else {
		//window.location="browserChk.html";
	}
	/*
	 // alert("[BrowserDetect]:   " + BrowserDetect.browser + " : " + BrowserDetect.version);
	 // if (!window.console) {
	 // console.log("[Shell][BrowserDetect]:   " + BrowserDetect.browser + " : " + BrowserDetect.version);
	 // }
	 */
	os = navigator.platform;
	var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';

	if (os == "iPad") {
		if (orientation == "portrait") {
			//alert("This course is best viewed in landscape mode.");
		}
	}
	$(window).bind('orientationchange', function(event) {
		var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
		if (os == "iPad") {
			if (orientation == "portrait") {
				//alert("This course is best viewed in landscape mode.");
			}
		}
	});

	// $('#preloaderSpinner').easyModal({
	// overlayOpacity : 0,
	// // overlayColor : "#333",
	// overlayClose : false,
	// closeOnEscape : false,
	// zIndexAuto : false
	// });

	//-- Resize
	$('.shell_main').addClass('splash');
	$('.shell_wrap, .shell_header').hide();
	//$("#initLaunchBtn").hide();
	$(window).resize(function() {
		$('#filler').height(($('#outer').height() - $('.shell_main').height()) / 2);
		if (controller) {
			controller.setPosition();
		}
		if (orientationChange) {
			orientationChange();
		}
		// console.log('[Shell] oW: ' + $('#outer').width() + ' oH: ' + $('#outer').height() + ' cW: ' + $('#container').width() + ' cH: ' + $('#container').height());
		//-- Debug - orientaiton change capture via JS
		// console.log('JS: ' + $(document).width() + ' : ' + $(document).height());
		// $('#debug-mq > span#sizeJS').show().html('(' + $(document).width() + '-' + $(document).height() + ')-JS');

	});

	//
	// console.log('JS: ' + $(document).width() + ' : ' + $(document).height());
	$(window).on("orientationchange", function(event) {
		// $('#debug-mq > span#sizeJS').show().html('(' + $(document).width() + '-' + $(document).height() + ')-JS');
	});

	// $(window).resize(function() {
	// controller.setPosition();
	// if (orientationChange) {
	// orientationChange();
	// }
	// });
	//alert(navigator.userAgent);
	if (!device.AndroidPhone() && !device.AndroidTablet() && !device.iPhone() && !device.iPad()) {
		$(".shell_main").css("max-width", "1024px");
		$(".shell_header").css("max-width", "1024px");
		if (navigator.userAgent.indexOf("Safari") != -1) {
			$(".shell_main").addClass("shell_main_safari");
		} else {
			$(".shell_main").addClass("shell_main_desktop");
		}
		$(".shell_audio_nav").addClass("shell_audio_nav_desktop");
	}

	//load Position
	$('#filler').height(($('#outer').height() - $('.shell_main').height()) / 2);
	//showPreloader();

	//$('.footer-holder').css('display', 'none');

	// window.addEventListener("orientationchange", function() {
	// if (orientationChange) {
	// orientationChange();
	// }
	// });

	// var tl = new TimelineLite().to($('#initLaunchBtn'), 1, {
	// opacity : 1
	// }, 3);

	//var tl = new TimelineLite().add(animateRotate($('#initLaunchBtn'), 360), 1);
	loadUIData();
	$('#initLaunchBtn').click(function() {
		//$(this).hide();
		navigationTour = false;
		$(".Shell_menu").css('display', 'none');
		loadMainData();
		//beginCourse();
		/*audioPlayer.loadAudioPath("media/audio/intro.mp3");
		// $(this).parent().remove();
		$(this).parent().load('pages/splash.html', function() {
		// console.log('[Shell] SPLASH LOADED');
		splash_anim1();
		$("#shell_launch_btn").on("click", beginCourse);
		});*/
		//$(this).remove();
	});

	$('.logo').click(function() {
		//beginCourseScrom();
		// console.log('logo');
		// $(this).add(animateLineVSpin($("#logo")).play(), 1);
	});

	window.addEventListener("offline", function(e) {
		alert("Please check your network connection. This course will not be accessible while you are offline.");
	}, false);

	window.addEventListener("online", function(e) {
		alert("Your network connection is restored!");
	}, false);

	//alert(isTranscript);

});

// -------------------- **************************************  -------------------- //
function showPreloader() {
	// console.log("147");
	$('body').jpreLoader({
		showPercentage : false,
		autoClose : true,
	}, function() {//callback function
		loadingDone = true;
		initCode();
	});
}

function initCode() {
	//console.log('[Shell] initCode');

	/*if (isSCORM) {

	 model.scormHandler.initSCO();
	 model.scormHandler.getBookmarkLocation();

	 } else {
	 $("#initLaunchBtn").show();
	 }*/
	$("#initLaunchBtn").show();
}

var langNameTmp = "";
function loadUIData() {
	this.configdata = xmlParser.getXml("config/config.xml");
	this.deployMode = this.configdata.getElementsByTagName("config")[0].getElementsByTagName("isDeploy")[0].getAttribute("val");
	if (this.deployMode == "@isDeploy@") {
		this.moduleName = this.configdata.getElementsByTagName("config")[0].getElementsByTagName("module")[0].getAttribute("val");
		this.langName = this.configdata.getElementsByTagName("config")[0].getElementsByTagName("lang")[0].getAttribute("val");
	} else {
		this.moduleName = this.configdata.getElementsByTagName("config")[0].getElementsByTagName("moduleDeploy")[0].getAttribute("val");
		this.langName = this.configdata.getElementsByTagName("config")[0].getElementsByTagName("langDeploy")[0].getAttribute("val");
	}
	this.menuData = xmlParser.getXml("config/" + this.moduleName + "course.xml");
	this.commondataUIPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("commonDataPath")[0].getAttribute("data") + this.langName;
	var path = this.commondataUIPath + "userInterface.json";
	$.getJSON(path, function() {
	}).done(function(json) {
		// console.log("loadUIData: " + this.langName);
		UITxtData = json.ExternalData[0];
		assignUITextData();
		//$('#splashContainer').css("display", "block")
	}).fail(function() {
	});
}

setLangShellImagePath = function() {
	langNameTmp = this.langName;
	if (this.langName == "en/") {
		//-- Use original path for en
		$(".IntroLogo img").attr('src', 'assets/image/common/papaJohns_launch.png');
		return;
	}
	$(".IntroLogo img").attr('src', 'assets/image/common/papaJohns_launch.png');
	$('img[class*="lang-"]').each(function(index) {
		langNm = langNameTmp.slice(0, -1);
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
function fnLoadNavigationTour() {
	//console.log(isControllerInitiated+":::::::::::");
	$(".Shell_menu").css('display', 'none');
	$("#splashContainer").css('display', 'none');
	//$(".loader").css('width', 0 + '%');
	if (!isControllerInitiated) {
		isControllerInitiated = true;
		controller = new Controller();
	}
	//controller.mainLoadData();
	callNavigationTourAudio();
	//ProgressiveLoader.initializeLoader();
}

function assignUITextData() {
	$.each(UITxtData, function(key, value) {
		$("." + key).html(value.text);
	});
	setLangShellImagePath();
};

function loadMainData() {
	$('#preloaderSpinner').show();
	if (!isControllerInitiated) {
		isControllerInitiated = true;
		controller = new Controller();
	}
	controller.mainLoadData();
	isTranscript = model.transcriptEnabled;
	isResources = model.resourcesEnabled;
	if (isResources == "false" || !isResources) {
		$(".resourcestat").css('display', 'none');
	} else {
		$(".resourcestat").css('display', 'table-cell');
	}

	if (isTranscript == "false" || !isTranscript) {
		if (!$("#audio_Icon").hasClass("deactive")) {
			$("#audio_Icon").addClass("deactive");
		}
	} else {
		if ($("#audio_Icon").hasClass("deactive")) {
			$("#audio_Icon").removeClass("deactive");
		}
	}
};
function beginCourse() {
	// console.log('[Shell] ' + model.langName);
	//$(".resume").css("display", "none");
	if (isSCORM) {
		model.scormHandler.initSCOjs();
		model.scormHandler.getBookmarkLocation();
		model.scormHandler.initSCO();
	} else {
		model.dispatchCustomEvent("updateView");
	}
	// $("#shell_launch_page").hide();
	// $('.shell_main').removeClass('splash');
	$('#splashContainer').remove();
	$('.shell_wrap, .shell_header').css('display', 'block').show();
	swipeHeaderFooter();
	$('.footer-holder').css('display', 'block');
}

function beginCourseScrom() {
	// console.log('[Shell] beginCourse');
	$(".resume").css("display", "none");
	model.currPage = 0;
	model.currMod = 0;
	model.dispatchCustomEvent("updateView");
	//callInitialAudio();

}

function showFromBookMark() {
	$(".resume").css("display", "none");
	//$("#initLaunchBtn").show();
	model.dispatchCustomEvent("updateView");
	//callInitialAudio();
	clickedBookmarkYes = true;
}

var clearTimeHeader;

//swipe
function swipeHeaderFooter() {
	if (device.AndroidPhone() || device.iPhone()) {
		clearTimeout(clearTimeHeader);
		var element = $('.shell_pageLoader');
		if ((element.offsetHeight < element.scrollHeight) || (element.offsetWidth < element.scrollWidth)) {
			// your element have overflow
			//element.style.background = "yellow";
			//$('.shell_pageLoader').css('height', '92%');
			$('.shell_header').css('display', 'block');
			$('.footer-holder').css('display', 'block');
		} else {
			//$('.shell_pageLoader').css('height', '100%');
			//$('.shell_header').css('display', 'none');
			//$('.footer-holder').css('display', 'none');
			setHeaderHide();
		}
		var scrollTop = $('.shell_pageLoader').scrollTop();
		$('.shell_pageLoader').scroll(function() {
			//	var orientation = Math.abs(window.orientation) == 90 ? 'landscape' : 'portrait';
			scrollTop = $('.shell_pageLoader').scrollTop();
			var scrollBottom = $('.shell_pageLoader').height() + scrollTop;
			var iScrollHeight = $(".shell_pageLoader").prop("scrollHeight");
			if (scrollBottom >= (iScrollHeight - 50 )) {
			}
			if (scrollBottom >= (iScrollHeight  )) {
				$(this).css('height', '90%');
				$('.footer-holder').css('display', 'block');
			} else if (scrollTop == 0) {
				// console.log('reaching top');
				setHeaderHide();
				$('.shell_header').css('display', 'block');
				$(this).css('height', '100%');
			} else {
				$('.shell_header').css('display', 'none');
				//$('.footer-holder').css('display', 'none');
			}
		});
	}
}

function setHeaderHide() {
	$('.shell_header').css('display', 'block');
	clearTimeHeader = setTimeout(function() {
		$('.shell_header').css('display', 'none');
	}, 5000);
}

function showBuffer(isShow) {
	if (isShow) {
		clickableMenu = false;
		// $('#preloaderSpinner').trigger('openModal');
		//$('#preloaderSpinner').show();
	} else {
		clickableMenu = true;
		// $('#preloaderSpinner').trigger('closeModal');
		//	$('#preloaderSpinner').hide();
	}
}

function loadMainTheme(stylePath, Lang) {
	var assestPreload = $.ajax(stylePath).done(function() {
		$('<link rel="stylesheet" type="text/css" href=' + stylePath + '>').appendTo("head");
		if (Lang == "ru/") {
			$('<link rel="stylesheet" type="text/css" href="css/common/shell-ru.css">').appendTo("head");
		} else if (Lang == "cn/") {
			//$('<link rel="stylesheet" type="text/css" href="css/common/shell-cn.css">').appendTo("head");
		}
		langNm = Lang.slice(0, -1);
		// console.log('[Controller]: loadMainTheme:langNm ' + langNm);
		$('body').removeClass('body-lang-en').addClass('body-lang-' + langNm);
		showPreloader();
		showNavTourLink();
	});
}

function showNavTourLink() {
	if (langNm != undefined) {
		isNavTour = langNm != "en" ? false : isNavTour;
		if (isNavTour) {
			$('.navLauchTxt').css('display', 'block');
		} else {
			$('.navLauchTxt').css('display', 'none');
		}
	}
}
