var imageLoader = new Object();

imageLoader.counter = 0;
imageLoader.imgArr = [];
imageLoader.callbackFn = undefined;

imageLoader.randVal = 0;

imageLoader.load = function(obj, callbackFn) {
	this.callbackFn = callbackFn;
	this.imgArr = [];
	this.counter = 0;
	for (var i = 0; i < obj.find("img").length; i++) {
		this.imgArr.push(obj.find("img").attr("src"));
		// console.log('[imgLoader] ' + this.imgArr[i]);
	}
	this.startLoading();
};

/*
 imageLoader.downloadImages = function(currentObj, callbackFn) {
 //$('.percentage .innerWidth').css({width:'2%'});
 ProgressiveLoader.terminateLoader();
 ProgressiveLoader.initializeLoader();

 //dummy number between 40 t0 70
 imageLoader.randVal = Math.floor(Math.random() * 30) + 40;

 //$('.loading').html('0%');
 //ProgressiveLoader.getLoaderPercentage()

 this.callback = callback;
 this.imgArr = [];
 this.counter = 0;
 for (var i = 0; i < obj.find("img").length; i++) {
 this.imgArr.push(obj.find("img").attr("src"));
 // console.log('[imgLoader] ' + this.imgArr[i]);
 }
 this.startLoading();

 };*/

imageLoader.startLoading = function() {
	if (this.imgArr[this.counter] != undefined) {
		var imgObjs = new Image();
		imgObjs.src = this.imgArr[this.counter];
		imgObjs.onload = this.onFileLoad;
		imgObjs.onerror = this.onFileLoadFail;
		} else {

		
		imageLoader.callbackFn();
		loadedAssestsCnt++;
		ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
	}

	//eventManager.addControlEventListener(ProgressiveLoader, "loaderUpdated", imageLoader.processComplete);
};

imageLoader.onFileLoad = function() {
	//console.log('[imgLoader] counter: ' + imageLoader.counter);
	imageLoader.counter++;
	if (imageLoader.counter == imageLoader.imgArr.length) {
		//ProgressiveLoader.terminateLoader();
		//alert('image Loaded');
		loadedAssestsCnt++;
		ProgressiveLoader.setLoadedAssetCount(loadedAssestsCnt);
		//console.log("[Controller]  Image Load Success" + loadedAssestsCnt);
		imageLoader.callbackFn();

	} else {

		imageLoader.startLoading();
	}
};

imageLoader.onFileLoadFail = function() {
	//ProgressiveLoader.setLoadedAssetCount(imageLoader.counter);
	//ProgressiveLoader.setTotalAssetsCount(imageLoader.imgArr.length);
	//console.log('[imgLoader] onFileLoadFail: ' + imageLoader.imgArr[imageLoader.counter] + " : File Missing");
	if (imageLoader.counter == imageLoader.imgArr.length) {
		// ProgressiveLoader.terminateLoader();
		imageLoader.callbackFn();
	} else {
		imageLoader.counter++;
		imageLoader.startLoading();
	}
};

imageLoader.onPreloadComplete = function() {
	//eventManager.removeControlEventListener(ProgressiveLoader, "loaderUpdated", imageLoader.processCompleteDummy);
	// alert('done '+ProgressiveLoader.getLoaderPercentage());
	//eventManager.addControlEventListener(ProgressiveLoader, "loaderUpdated", imageLoader.processComplete);
};

imageLoader.processComplete = function(p_obj) {
	// $('.loading').html(ProgressiveLoader.getLoaderPercentage() + '%');
	// $('.percentage .innerWidth').css('width',   ProgressiveLoader.getLoaderPercentage() + '%');

	/*
	if (ProgressiveLoader.getLoaderPercentage() == 100) {

	ProgressiveLoader.terminateLoader();

	if (!device.iPhone() && !device.iPad() && !device.Android()) {
	preloadingDone();

	} else {
	currAudioIndex = 0;
	$("#deviceLaunch").fadeIn(function() {
	controller.hidePreloader();
	$('.loading').html('0%');
	});
	}*/

	//console.log(ProgressiveLoader.getLoaderPercentage());
	//eventManager.removeControlEventListener(ProgressiveLoader, "loaderUpdated", imageLoader.processComplete);

	//}
};

