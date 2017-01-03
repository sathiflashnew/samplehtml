/**
 * @author Shiyazudeen
 */
var audio;
var self;
var dummyAudioInterval;
var positionInterval;
var seeking = false;
var playerVar;
var MEPlayer;
var isMutedBeforeDestroy = false;
var firstTime = false;
var pauseTime;
var audioInitiallyPause = false;
var isAudio = true;
var audioCallBack;
var audioLoaded = false;
var audioLoadFirstTime = true;
var showAudioLoading = true;
var notMuted = false;
//-- Initial audio reset for interactivity pages
var initialAudioReset = false;
var intActivityAudioReset = false;
var allAssestsLoaded = false;
var scrubberBool = false;
$(document).ready(function() {
	$("#triggerBtn").click(function(e) {
		$("#deviceLaunch").hide();
		//preloadingDone();
		callInitialAudio();
		//$('.footer-holder .play').trigger('click');
		//$("#preloaderSpinner").show();
		$("#preloaderSpinner").css("display", "block");
	});
	$('.footer-holder .play').click(function(e) {
		if ($(this).hasClass("disabled") || $(this).hasClass("deactive")) {
			return;
		}
		//console.log('[AP] replay: ' + $(this).hasClass('replay') + ' playing: ' + $(this).hasClass('playing') + ' interActivityPage: ' + interActivityPage);
		// console.log('playState:' + pg_snd.playState + '  paused: ' + pg_snd.paused);
		// iPadDebug('[AP] click has replay: ' + $(this).hasClass('replay') + ' TULL ' + pg_snd.getDuration() + ' : ' + pg_snd.getPosition());
		if ($(this).hasClass('replay')) {
			//console.log('[click] has replay');

			$(this).removeClass('replay');
			$(this).addClass('playing');

			MEPlayer.play();
			//playAnimation("main");

			if (tll) {
				tll.restart();
			}

			if (!interActivityPage) {
				//scrubberBool = false;
				playAnimation('main');
			} else {
				playAnimation('interActivity');
			}
			return;
		} else {
			// console.log('11111111111');
			if ($(this).hasClass('playing')) {
				// console.log('2222222222222');
				$(this).removeClass('playing');
				// pg_snd.pause();
				MEPlayer.pause();
				$('.footer-holder .play').removeClass('playing');
				playCJSAnimFrom('pause');
				if (tll) {
					tll.pause();
				}
				clearInterval(positionInterval);
			} else {
				// console.log('33333333333');
				$(this).addClass('playing');
				// pg_snd.resume();
				MEPlayer.play();
				playCJSAnimFrom('resume');
				// trackTime();
				if (tll) {
					tll.resume();
				}
			}
		}
	});

	$('.footer-holder .scrubber').on('mouseup mouseout', function(e) {
		seeking = false;
	});
	$('.footer-holder .scrubber').on('mousedown', function(e) {
		seeking = true;
	});

	$('.footer-holder .scrubber').on('click mousemove', function(e) {
		 //console.log('TOK: ' + e.type + ' seeking: ' + seeking);
		if (e.type == 'mousemove' && !seeking || $(this).hasClass("deactive")) {
			// console.log('mousemove: ' + seeking);
			return;
		}

		var relativeLeft = e.clientX - leftPos(this);
		var percPos = (relativeLeft / this.offsetWidth);
		percPos = percPos <= 0 ? 0 : percPos;
		if (!$('.footer-holder .play').hasClass('playing')) {
			MEPlayer.play();
			$('.footer-holder .play').addClass('playing');
			if ($('.footer-holder .play').hasClass('replay')) {
				$('.footer-holder .play').removeClass('replay');
			}
			// trackTime();
		}else{
			// console.log("::::");
			MEPlayer.play();
			$('.footer-holder .play').addClass('playing');
			if ($('.footer-holder .play').hasClass('replay')) {
				$('.footer-holder .play').removeClass('replay');
			}
		}
		if (isAudio) {
			var currTime = 0;
			if($(".pageWrapper").hasClass("RTL"))
			{
				var tmpPercPos=-(percPos-1);
				currTime = tmpPercPos * getDuration();
				playCJSAnimFrom(tmpPercPos);
			}else{
				currTime = percPos * getDuration();	
				playCJSAnimFrom(percPos);
			}
			MEPlayer.setCurrentTime(currTime);
		}
	
		if (tll) {
			if($(".pageWrapper").hasClass("RTL"))
			{
				tll.progress(tmpPercPos);
			}
			else
			{
				tll.progress(percPos);
			}
			//console.log(tmpPercPos+"::::"+percPos)
			tll.resume();
			//-- This dispatch event is used to initilize and reset
			$('.footer-holder .scrubber').trigger("RESET_SLIDER");
		}
	});
	//-- Debug

});

var AudioPlayer = function() {
	// console.log('[AP] AudioPlayer');
	audioCallBack = null;
	self = this;
};

AudioPlayer.prototype.loadAudioPath = function(_path, callBack) {
	//console.log('[AP] loadAudioPath: _path: ' + _path + '  interActivityPage: ' + interActivityPage);
	// iPadDebug('[AP] loadAudioPath: _path: ' + _path + '  interActivityPage: ' + interActivityPage);
	// console.log('[AP] load muted: ' + isMutedBeforeDestroy);
	//-- Function to be called at the end of audio

	audioCallBack = callBack;
	self.destroyAudio();
	audioLoaded = false;
	audioLoadFirstTime = true;
	initialAudioReset = false;

	_path = _path.split('.')[0];
	var _path_mp3 = String(_path + '.mp3');
	var _path_ogg = String(_path + '.ogg');

	//-- mediaelement player stuff ------------------------------------------------//
	//-- Instantiate jPlayer
	$("#jquery_jplayer").html("");
	var audio = document.createElement("audio");
	audio.src = _path_mp3;
	$("#jquery_jplayer").append(audio);

	playerVar = $(audio).mediaelementplayer({
		//mode: 'shim',
		pauseOtherPlayers : false,
		alwaysShowControls : false,
		enableKeyboard : false,
		enablePluginDebug : false,
		loop : false,
		success : function(player, node) {
			MEPlayer = player;
			MEPlayer.play();
			if (notMuted) {
				MEPlayer.setMuted(true);
			} else {
				MEPlayer.setMuted(false);
			}
			if (device.Android() || device.iOS()) {
				if (interActivityPage) {
					//MEPlayer.play();
				} else {
					if (device.iOSVersion() >= 8) {
					} else {
						MEPlayer.stop();
					}
				}
			}
			MEPlayer.addEventListener('canplay', function() {
				audioLoaded = true;
				// console.log(interActivityPage+":::" + audioLoadFirstTime+":::"+allAssestsLoaded);
				if (!interActivityPage && audioLoadFirstTime && !allAssestsLoaded) {

					//MEPlayer.pause();
					if (device.Android()) {
						MEPlayer.setCurrentTime(0);
					} else {

						MEPlayer.stop();
					}
					if ($("#preloaderSpinner_int").css("display") == "block") {
						$("#preloaderSpinner_int").css("display", "none");
					}
					//MEPlayer.setCurrentTime(MEPlayer.duration);
					loadedAssestsCnt++;
					//alert('audio Loaded');
					// console.log("[AP] audio Load Success" + loadedAssestsCnt);
					ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
				} else if (!interActivityPage && audioLoadFirstTime && intActivityAudioReset) {
					MEPlayer.stop();
					var dur = MEPlayer.duration;
					$('.time .played').html(getTime(dur * 1000, true));
					$('.time .duration').html(getTime(dur * 1000, true));

					$("#preloaderSpinner_int").css("display", "none");

				} else {
					if (interActivityPage && audioLoadFirstTime) {
						// console.log("[AP] canplay Success" + interActivityPage);
						if (device.IEVersion() != 9) {
							MEPlayer.play();
						}
						//MEPlayer.play();
						allAssestsLoaded = true;
					}
					if (audioLoadFirstTime) {
						$('.footer-holder .play').removeClass('replay').addClass('playing');
						// $('.footer-holder .progress, .footer-holder .loaded').css('width', '100%');
						$('.footer-holder .progress').css('width', '100%');
					}

				}
				// Player is ready
				// MEPlayer.play();
			}, false);
			MEPlayer.addEventListener('progress', function(e) {
				//
			}, false);
			MEPlayer.addEventListener('timeupdate', function(e) {
				if (navigationTour) {
					//allAssestsLoaded=true;
					if (isAudio) {
						if(MEPlayer!=null){
							var ct = MEPlayer.currentTime;
							var dur = MEPlayer.duration;
							updateDisplayTime(ct * 1000, dur * 1000);
						}
					}
				} else {
					if (isAudio) {
						var ct = MEPlayer.currentTime;
						var dur = MEPlayer.duration;
						updateDisplayTime(ct * 1000, dur * 1000);
					}
				}
			}, false);
			MEPlayer.addEventListener('playing', function(e) {
				if (audioInitiallyPause == true) {
					$('.footer-holder .progress').css('width', '100%');
					audioInitiallyPause = false;
				} else {
					//alert($('.footer-holder .play').hasClass('replay') + "::" + $('.footer-holder .play').hasClass('playing'))
					if ($('.footer-holder .play').hasClass('replay')) {
						$('.footer-holder .play').removeClass('replay');
						$('.footer-holder .play').addClass('playing');
					}
				}
			}, false);
			MEPlayer.addEventListener('ended', function(e) {

				$('.footer-holder .play').removeClass('playing').addClass('replay');
				$('.footer-holder .progress').css('width', '100%');
				self.audioEnd();
			}, false);
			MEPlayer.addEventListener('pause', function(e) {

				// console.log('[AP] pause listener ' + e.currentTime);
				// console.log('[AP] pause listener paused: ' + e.paused);
				// console.log('[AP] pause listener ended : ' + e.ended);
				if (e.ended && e.currentTime == 0) {
					$('.footer-holder .play').removeClass('playing').addClass('replay');
					$('.footer-holder .progress').css('width', '100%');
				}
				;
			}, false);

		}
	});

	//-----------------------------------------------------------------//

	//-- Show preloader for audio
	/*
	 if (interActivityPage) {
	 if ($("#preloaderSpinner").hasClass("ShellOverlay") && !$("#preloaderSpinner").hasClass("Int_Preloader")) {
	 $("#preloaderSpinner").addClass("Int_Preloader");
	 //controller.popupAudioPreload();
	 }
	 } else {
	 if ($("#preloaderSpinner").hasClass("Int_Preloader")) {
	 $("#preloaderSpinner").removeClass("Int_Preloader");
	 }

	 }*/

	if (showAudioLoading) {
		if (interActivityPage) {
			controller.gadgetsBtnDisable();
			//console.log("audio lgadgetsBtnDisable:if::");
			intActivityAudioReset = false;
			//$("#preloaderSpinner_int").show();
			$("#preloaderSpinner_int").css("display", "block");
		} else if (intActivityAudioReset) {
			$("#preloaderSpinner_int").css("display", "block");
		} else {
			if ($("#preloaderSpinner").css("display") == "none") {
				$("#preloaderSpinner").css("display", "block");
			}

			//$("#preloaderSpinner").show();
		}
	}

};
AudioPlayer.prototype.StartAnimation = function() {
	if (!isAudio) {
		self.destroyAudio();
		controller.hideAudioControls();
		controller.hidePreloader();
		controller.gadgetsBtnEnable();
		playAnimInit();
		playAnimation("main");
		//interActivityPage = false;
		$('.footer-holder .play').addClass('playing');
		return;
	}
	//alert(":::::1::"+MEPlayer.pa);
	MEPlayer.play();
	//alert(":::::2::");
	allAssestsLoaded = true;
	controller.hideAudioControls();

	$('.footer-holder .play').removeClass('playing').addClass('replay');
	// $('.footer-holder .progress, .footer-holder .loaded').css('width', '100%');
	$('.footer-holder .progress').css('width', '100%');
};

AudioPlayer.prototype.StartNavAnimation = function() {
	if (!isAudio) {
		self.destroyAudio();
		//controller.hideAudioControls();
		controller.hidePreloader();
		return;
	}
	allAssestsLoaded = true;
	//alert(":::::1::"+MEPlayer.pa);
	MEPlayer.play();
	$('.footer-holder .play').removeClass('playing').addClass('replay');
	//controller.hideAudioControls();
};

var isCJSAnimLoaded = false;
var isSoundLoaded = false;

function cjsAnimLoadedHandler(isCJS) {
	if (isCJS) {
		isCJSAnimLoaded = true;
	}
	// console.log('[AP] isCJSAnimLoaded: ' + isCJSAnimLoaded + ' :&& isSoundLoaded: ' + isSoundLoaded);
	if (isCJSAnimLoaded && isSoundLoaded) {
	}
}

AudioPlayer.prototype.pauseAudio = function() {
	// console.log('[AP] pauseAudio');
	if (isAudio) {
		MEPlayer.pause();
	}
	playCJSAnimFrom('pause');
	if (tll) {
		tll.pause();
	}
};

AudioPlayer.prototype.toggleMuteAudio = function() {
	// var muted = !pg_snd.getMute();
	notMuted = MEPlayer.muted;
	//console.log('[AP] toggleMuteAudio notMuted: ' + notMuted);
	if (notMuted) {
		//$('.icon-volume-mute').removeClass('icon-volume-mute').addClass('icon-volume');
		$(".audioTxt2").css("display", "inline");
		$(".audioTxt1").css("display", "none");
		MEPlayer.setMuted(false);
		notMuted = MEPlayer.muted;
	} else {
		//$('.icon-volume').removeClass('icon-volume').addClass('icon-volume-mute');
		$(".audioTxt1").css("display", "inline");
		$(".audioTxt2").css("display", "none");
		MEPlayer.setMuted(true);
		notMuted = MEPlayer.muted;
	}
	// console.log('[AP] muted: ' + my_jPlayer.data("jPlayer").options.muted);
	// pg_snd.setMute(muted);
};

AudioPlayer.prototype.resumeAudio = function() {
	// console.log('[AP] resumeAudio');
	if (isAudio) {
		MEPlayer.play();
	}
	playCJSAnimFrom('resume');
	if (tll) {
		tll.resume();
	}
};
AudioPlayer.prototype.audioEnd = function() {
	// console.log('[AP] audioEnd');
	/*if (audioCallBack) {
	 audioCallBack();
	 }*/
	if ( typeof audioFinish != 'undefined' && $.isFunction(audioFinish)) {
		audioFinish();
	}

};
AudioPlayer.prototype.destroyNavAudio = function() {
	// console.log('[AP] destroyAudio');

	if (MEPlayer) {
		//MEPlayer.stop();
		MEPlayer.pause();
		allAssestsLoaded = false;
		//isMutedBeforeDestroy = MEPlayer.setMuted(true);
		window.MEPlayer = null;
		/*
		 window.MediaElement = null;
		 window.MediaElementPlayer = null;*/
	}

};

AudioPlayer.prototype.destroyAudio = function() {
	// console.log('[AP] destroyAudio');
	$('.footer-holder .play').removeClass('replay').removeClass('playing');
	$('.footer-holder .progress').css('width', '0px');
	$('.time .played, .time .duration').html('00:00');

	if (MEPlayer) {
		//MEPlayer.stop();
		MEPlayer.pause();
		//isMutedBeforeDestroy = MEPlayer.setMuted(true);
		window.MEPlayer = null;
		/*
		 window.MediaElement = null;
		 window.MediaElementPlayer = null;*/
	}

	if (!interActivityPage) {
		//$('.pgcontent').hide();
	}

	//-- Patch debug info onto title for iPad
	if ($('.page_title > p').hasClass('debug')) {
		// $('.page_title > p').text("CLEAR");
	}
};
AudioPlayer.prototype.audioReset = function() {
	/*interActivityPage = false;
	 audioInitiallyPause = true;
	 intActivityAudioReset = true;
	 showAudioLoading = true;
	 MEPlayer.stop();
	 audioPlayer.loadAudioPath(model.audioPath + popupAudios[0]);
	 controller.assignTranscript(transcript[0]);
	 initialAudioReset = true;*/

	interActivityPage = false;
	intActivityAudioReset = true;
	showAudioLoading = true;
	audioPlayer.loadAudioPath(model.audioPath + popupAudios[0]);
	controller.assignTranscript(transcript[0]);
	if (device.iOSVersion() >= 8) {
	} else {
		MEPlayer.stop();
	}
	audioInitiallyPause = true;
	initialAudioReset = true;

};

function updateDisplayTime(tt, dd) {
	// console.log("updateDisplayTime:::" + tt + "::::::::" + dd);
	if (tt > 0) {
		if (!firstTime) {
			firstTime = true;
			if (device.iPhone() || device.iPad()) {
				playAnimInit();
			}
		}
		$('.footer-holder .progress').css({
			width : (100 * tt / dd) + '%'
		});
		// console.log("[AS]  Popup audio Load Success" + $('.footer-holder .progress') + "::" + allAssestsLoaded);
		if (audioLoadFirstTime && allAssestsLoaded) {
			//alert(audioLoadFirstTime);
			// console.log('[AP] updateDisplayTime: ' + audioLoadFirstTime);
			audioLoadFirstTime = false;
			if (!intActivityAudioReset) {
				if(!navigationTour){
					playAnimInit();
				}
				if (model.currMod == (model.modArr.length - 1) && model.currPage == (model.modArr[model.currMod].length - 1)) {
				} else {
					//-- Preload Images and Audio for next page. Don't preload next page assets for the last page.
					backgroundLoader.loadNextPageAsssets();
				}
			} else {
				playAnimation("main");
			}
			if (interActivityPage) {
				//$("#preloaderSpinner_int").hide();
				//console.log("updateDisplayTime ::");
				controller.gadgetsBtnEnable();
				//controller.nextBackDisable();
				$("#preloaderSpinner_int").css("display", "none");
				//controller.gadgetsBtnEnable();
				//loadedAssestsCnt++;
				// console.log("[AS]  Popup audio Load Success" + loadedAssestsCnt);
				//ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
			} else {
				//$("#preloaderSpinner").hide();
				$("#preloaderSpinner").css("display", "none");
				if (!intActivityAudioReset) {

					controller.gadgetsBtnEnable();
				}
				if ($('.footer-holder .play').hasClass('replay')) {
					$('.footer-holder .play').removeClass('replay');
					$('.footer-holder .play').addClass('playing');
				}
			}
		}
		$('.time .played').html(getTime(tt, true));
		$('.time .duration').html(getTime(dd, true));
		if (device.AndroidPhone()) {
			if (getTime(tt, true) == getTime(dd, true)) {
				$('.footer-holder .play').removeClass('playing').addClass('replay');
				$('.footer-holder .progress').css('width', '100%');
				self.audioEnd();
			}
		}
	} else {
		if (device.Firefox()) {
			audioLoaded = true;
		}

		//-- Only for Interactivity pages - audio reset
		if (initialAudioReset) {
			initialAudioReset = false;
			$('.footer-holder .play').removeClass('playing').addClass('replay');
			$('.footer-holder .progress').css('width', '100%');
		}
	}
}

this.getDuration = function() {
	if (MEPlayer) {
		return MEPlayer.duration;
	} else {
		return 0;
	}
};

this.getTime = function(nMSec, bAsString) {
	// convert milliseconds to mm:ss, return as object literal or string
	var nSec = Math.floor(nMSec / 1000), min = Math.floor(nSec / 60), sec = nSec - (min * 60);
	//console.log(nMSec + ' :: ' + nSec);
	// if (min === 0 && sec === 0) return null; // return 0:00 as null
	return ( bAsString ? ((min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)) : {
		'min' : min,
		'sec' : sec
	});
};

this.leftPos = function(elem) {
	var curleft = 0;
	if (elem.offsetParent) {
		do {
			curleft += elem.offsetLeft;
		} while (elem = elem.offsetParent);
	}
	return curleft;
};

function iPadDebug(msg) {
	if ($('.page_title > p').hasClass('debug')) {
		$('.page_title > p').append('<br>' + msg);
	} else {
		$('.page_title').append('<p class="debug" style="color: #FF0000; text-align: left; text-shadow: 1px 1px 2px #000000; max-height: 470px; overflow-y: auto; position: absolute; top: 100px; width: 50%; z-index: 2000">Debug:<br>' + msg + '</p>');
	}
}