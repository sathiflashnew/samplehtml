var backgroundLoader = new Object();
backgroundLoader.isDesktop = false;
/** For image loading **/
backgroundLoader.imageArr = [];
backgroundLoader.totalImageCount = 0;
backgroundLoader.loadedImageCount = 0;
objImage = new Image();
/** For audio loading **/
backgroundLoader.audioArr = [];
backgroundLoader.nextPageAudio = "";

/** Detect if running on tablet or desktop **/
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))) {
	backgroundLoader.isDesktop = false;
} else {
	backgroundLoader.isDesktop = true;
}

/** Function that initiates loading of next page assets **/
backgroundLoader.loadNextPageAsssets = function() {
	// backgroundLoader.imageArr = String(model.menuData.getElementsByTagName("page")[model.currPage + 1].getAttribute("preloadImages")).split(",");

	backgroundLoader.imageArr = String(model.menuData.getElementsByTagName("page")[model.currPage + 1].getAttribute("data-en")).split(",");
	for (var a in backgroundLoader.imageArr) {
		backgroundLoader.imageArr[a] = String(backgroundLoader.imageArr[a]).trim();
		if (backgroundLoader.imageArr[a].indexOf('common/') == -1) {
			backgroundLoader.imageArr[a] = model.moduleName + 'en/' + backgroundLoader.imageArr[a];
		}
		// console.log(model.moduleName + ' : ' + model.langName + ' : ' + a + ' : ' + backgroundLoader.imageArr[a]);
	}

	backgroundLoader.appendLangImages(model.langName);

	backgroundLoader.totalImageCount = backgroundLoader.imageArr.length;
	backgroundLoader.loadedImageCount = 0;
	if (backgroundLoader.totalImageCount > 0 && backgroundLoader.imageArr[0].length > 2) {
		//-- If there are images to be loaded
		backgroundLoader.loadImageInBg();
	} else {
		//-- If there are no images to be loaded, go for audio loading directly
		backgroundLoader.loadNextPageAudio();
	}
};
/** Function to load image **/
backgroundLoader.loadImageInBg = function() {
	var imgConfPath = backgroundLoader.imageArr[backgroundLoader.loadedImageCount];
	var imgConfENPath = "";
	if (imgConfPath.indexOf('lang/') != -1) {
		var plainImgPath = imgConfPath.split('lang/')[1];
		imgConfPath = model.moduleName + model.langName + plainImgPath;
		imgConfENPath = model.moduleName + "en/" + plainImgPath;
		// console.log("[aP]:BLAH ==== " + imgConfPath);
		backgroundLoader.imageArr[backgroundLoader.loadedImageCount] = imgConfPath;
		// console.log("[aP]:blEh ==== " + imgConfENPath);
		// backgroundLoader.imageArr.push(imgConfENPath);
		backgroundLoader.totalImageCount = backgroundLoader.imageArr.length;
	}
	if (imgConfPath.indexOf('null') != -1) {
		//-- If there is no image to be pre-loaded
		if (backgroundLoader.isDesktop) {
			//-- Only for desktop/laptops do background loading of audio
			backgroundLoader.loadNextPageAudio();
		} else {
			//-- No background loading of audio since the target device is a tablet/mobile
			//alert("no bg audio loading since tablet/mobile");
		}
		return;
	}
	objImage.src = model.imagePath + imgConfPath;
	// console.log("[assetPreloader]:Loading :: " + objImage.src);

	objImage.onload = function() {
		// console.log("[assetPreloader]:Loaded==:: " + objImage.src);
		backgroundLoader.imageLoadPost();
	};
	objImage.onerror = function() {
		// console.log("[assetPreloader]:Error   :: " + objImage.src);
		backgroundLoader.imageLoadPost();
	};
};
/** This function is called when an image gets loaded **/
backgroundLoader.imageLoadPost = function() {
	backgroundLoader.loadedImageCount++;
	// console.log(backgroundLoader.loadedImageCount + " == " + backgroundLoader.totalImageCount + " : " + backgroundLoader.imageArr.length);
	if (backgroundLoader.loadedImageCount == backgroundLoader.totalImageCount) {
		//-- All images loaded
		// console.log("[assetPreloader]:All images loaded.");
		if (backgroundLoader.isDesktop) {
			//-- Only for desktop/laptops do background loading of audio
			backgroundLoader.loadNextPageAudio();
		} else {
			//-- No background loading of audio since the target device is a tablet/mobile
			//alert("no bg audio loading since tablet/mobile");
		}
	} else {
		//-- Not all images loaded
		// console.log("[assetPreloader]:Not all images loaded. Loading next image.");
		backgroundLoader.loadImageInBg();
	}
};
/** Function to load next page audio **/
backgroundLoader.loadNextPageAudio = function() {
	// console.log("[assetPreloader]:Loading audio now.");
	backgroundLoader.audioArr = String(model.menuData.getElementsByTagName("page")[model.currPage + 1].getAttribute("audio")).split(",");
	if (backgroundLoader.audioArr.length > 0 && backgroundLoader.audioArr[0].length > 2) {
		//-- Next page has audio. Load it.
		if (model.currPage == (model.modArr[model.currMod].length - 2)) {
			//-- Setting preload for last page audio, one page before that
			if (model.menuData.getElementsByTagName("page")[model.currPage + 1].getAttribute("data-audioTime")) {
				backgroundLoader.nextPageAudio = model.commonaudioPath + backgroundLoader.audioArr[0];
			} else {
				backgroundLoader.nextPageAudio = model.audioPath + backgroundLoader.audioArr[0];
			}
		} else {
			backgroundLoader.nextPageAudio = model.audioPath + backgroundLoader.audioArr[0];
		}
		// console.log("[assetPreloader]:Loading....   :: " + backgroundLoader.nextPageAudio);
		if ($('#bg_audio').attr('id') == undefined) {
			$("#bgAudioHolder").append('<audio id="bg_audio" controls><source id="mp3_src" src="assets/audio/common/en/mute.mp3" type="audio/mp3">Your browser does not support the audio element.</audio>');
		}
		var audioElement = $('#bg_audio');
		audioElement.attr("src", backgroundLoader.nextPageAudio);
		$("#tracer").html(backgroundLoader.nextPageAudio);
		audioElement.load();

		audioElement.volume = 0.0;

		setTimeout(function() {
			$('#bg_audio')[0].play();
			$('#bg_audio')[0].muted = true;
		}, 2000);

	} else {
		//-- Next page does not have audio.
		// console.log("[assetPreloader]:No audio to load.");
		//backgroundLoader.loadMute();
	}
};
/** Function to load mute.mp3 **/
/** This is implemented to give priority to the page user wants to view. In this case bg loading is stopped by loading mute.mp3  in audio control **/
backgroundLoader.loadMute = function() {
	if (backgroundLoader.isDesktop) {
		//-- Only for desktop/laptops
		var audioElement = $('#bg_audio');
		audioElement.attr("src", model.commonaudioPath + "mute.mp3");
		$("#tracer").html("mute.mp3");
		audioElement.load();
	}
};

backgroundLoader.appendLangImages = function(par_lang) {
	par_lang = par_lang.slice(0, -1);
	// console.log('appendLangImages ::::' + par_lang);
	if (par_lang == 'en') {
		return;
	}
	var langArr = String(model.menuData.getElementsByTagName("page")[model.currPage + 1].getAttribute("data-" + par_lang)).split(",");
	if (langArr != "null") {
		for (var a in langArr) {
			langArr[a] = String(langArr[a]).trim();
			if (langArr[a] != "") {
				backgroundLoader.imageArr.push(model.moduleName + 'en/' + langArr[a]);
				// console.log(model.moduleName + ' : ' + model.langName + ' : ' + a + ' : ' + langArr[a]);
			}
		}
	}
};
