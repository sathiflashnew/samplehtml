/**
 * @author Manikandan. S
 */

/*
 @Progressive Loader
 */

var ProgressiveLoader = function() {

};
var eventManager = new EventManager();

ProgressiveLoader.timeInterval = null;

/* *Initializing Progressive Loader *** */
ProgressiveLoader.initializeLoader = function() {
	ProgressiveLoader.loaderCounter = 0;
	ProgressiveLoader.timeInterval = 0;
	ProgressiveLoader.totalAssetsCount = 0;
	ProgressiveLoader.loadedAssetCount = 0;
	ProgressiveLoader.timeInterval = setInterval(ProgressiveLoader.timeIntervalLoop, 50);
};
//Timer which runs based on the interval set
ProgressiveLoader.timeIntervalLoop = function() {
	var localPercentage = 1;
	var assetLoadedPercentage = 0;
	var assetLoadedPercentageLess = -1;
	var rndPercentage = 0;

	rndPercentage = 10 + Math.round(Math.random() * 10);
	//This is expiry counter to Auto close the interval if user forgets to terminate
	ProgressiveLoader.expiryCounter++;
	//

	localPercentage = ProgressiveLoader.loaderCounter;

	assetLoadedPercentage = Math.round(((ProgressiveLoader.loadedAssetCount / ProgressiveLoader.totalAssetsCount) * 100));

	//console.log(assetLoadedPercentage +" :: assetLoadedPercentage "+ProgressiveLoader.loadedAssetCount+" :: ProgressiveLoader.loadedAssetCount "+ProgressiveLoader.totalAssetsCount+" :: ProgressiveLoader.totalAssetsCount")
	//console.log('time update' + localPercentage);
	if (ProgressiveLoader.totalAssetsCount == 0) {
		if (Math.random() > .5) {
			localPercentage += Math.round(Math.random());
		}
		if (localPercentage < rndPercentage) {
			ProgressiveLoader.loaderCounter = localPercentage;
		}

	} else {
		//If counter is less than loaded assets counter(percentage)
		if (localPercentage <= assetLoadedPercentage) {
			localPercentage += 5;

		} else {
			if (ProgressiveLoader.loadedAssetCount == 0) {
				assetLoadedPercentageLess = ((100 / ProgressiveLoader.totalAssetsCount) - 10);
				if (localPercentage < assetLoadedPercentageLess) {
					localPercentage += Math.round(Math.random());
				}
			} else {
				//if(Math.random()>.9){
				localPercentage += Math.round(Math.random());
				//}
			}
		}
		//Stop percentage at 90 till last asset loads
		if (localPercentage < 90) {
			ProgressiveLoader.loaderCounter = localPercentage;
		}
		//This condition works after all assets are loaded and steps up the counter to 100
		if (ProgressiveLoader.loadedAssetCount >= ProgressiveLoader.totalAssetsCount) {
			if (localPercentage > 100) {
				localPercentage = 100;
			}
			ProgressiveLoader.loaderCounter = localPercentage;
			if (localPercentage > 100) {
				clearInterval(ProgressiveLoader.timeInterval);
			}
		}
	}
	//
	eventManager.dispatchCustomEvent(ProgressiveLoader, "loaderUpdated", "", "");
	//Some lengthy counter to switchoff the interval Automatically
	if (ProgressiveLoader.expiryCounter > 10000) {
		clearInterval(ProgressiveLoader.timeInterval);
	}
	//console.log(ProgressiveLoader.loaderCounter +"  assetLoadedPercentage")
};
//Sets the loaded asset count
ProgressiveLoader.setLoadedAssetCount = function(p_loadedAssetCount) {
	ProgressiveLoader.loadedAssetCount = p_loadedAssetCount;
	//console.log(ProgressiveLoader.totalAssetsCount +"  assetLoaded1Percentage "+p_loadedAssetCount)
};
//Sets the total asset count
ProgressiveLoader.setTotalAssetsCount = function(p_totalAssetsCount) {
	ProgressiveLoader.totalAssetsCount = p_totalAssetsCount;
	//console.log(ProgressiveLoader.loadedAssetCount +"  assetLoaded2Percentage "+p_totalAssetsCount)
};
//get Loader Percentage
ProgressiveLoader.getLoaderPercentage = function() {
	//console.log(ProgressiveLoader.loaderCounter)
	return ProgressiveLoader.loaderCounter;
};

/* *Terminating Progressive Loader *** */
ProgressiveLoader.terminateLoader = function() {
	clearInterval(ProgressiveLoader.timeInterval);
};
