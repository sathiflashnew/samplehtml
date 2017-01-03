var Model = function() {
	this.currPage = 0;
	this.currMod = 0;
	this.modArr = [25];
	//13, 6, 2
	this.visitedArr = [25];
	this.events_Obj = [];
	this.scormHandler = new SCORMHandler();
	//-- learningType: possible values: linear, non-linear;
	this.learningType = "non-linear";
	//this.learningType = "linear";
	this.firstTimeVisited = false;
	this.compleTeArr = [25];
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
	this.pagePath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("pagePath")[0].getAttribute("data") + this.moduleName;
	this.audioPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("audioPath")[0].getAttribute("data") + this.moduleName + this.langName;
	this.commonaudioPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("commonaudioPath")[0].getAttribute("data") + this.langName;

	try {
		this.imagePath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("imagePath")[0].getAttribute("data");
	} catch(err) {
		this.imagePath = "";
	}

	this.videoPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("videoPath")[0].getAttribute("data") + this.moduleName + this.langName;
	this.dataPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("dataPath")[0].getAttribute("data") + this.moduleName + this.langName;
	this.scriptPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("scriptPath")[0].getAttribute("data") + this.moduleName + this.langName;
	this.CSSPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("cssPath")[0].getAttribute("data") + this.moduleName + this.langName;
	this.commondataPath = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("commonDataPath")[0].getAttribute("data") + this.langName;
	this.mainData = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("maindata")[0].getAttribute("data");
	try {
		this.transcriptEnabled = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("transcriptEnable")[0].getAttribute("data");
	} catch(err) {
		this.transcriptEnabled = false;
	}
	/*if(this.langName!="en/")
	{
	this.transcriptEnabled = false;
	}*/
	try {
		this.resourcesEnabled = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("resourcesEnable")[0].getAttribute("data");
	} catch(err) {
		this.resourcesEnabled = false;
	}
	try {
		this.mainTheme = this.menuData.getElementsByTagName("config")[0].getElementsByTagName("mainTheme")[0].getAttribute("data");
	} catch(err) {
		this.mainTheme = "css/common/theme/themRed.css";
	}
	// console.log('[Model]: cdp: ' + this.commondataPath + "  cap:" + this.commonaudioPath);
	loadMainTheme(this.mainTheme, this.langName);
};

Model.prototype.init = function() {
	//Bookmark_location="9||0||2,2,2,2,2,2,2,2,2,1"
	if (Bookmark_location != "" && Bookmark_location != undefined && Bookmark_location != "undefined" && Bookmark_location != "null" && Bookmark_location != null && Bookmark_location != "notSet") {
		var arr = Bookmark_location.split("||");

		this.currPage = Number(arr[0]);
		this.currMod = Number(arr[1]);
		this.visitedArr[0] = arr[2].split(',');
		this.compleTeArr[0] = arr[2].split(',');
		if (this.currPage == 0) {
			this.dispatchCustomEvent("updateView");
		} else {
			$(".resume").css("display", "block");
			//$(".NavTour").css("display", "none");
			$("#preloaderSpinner").css("display", "none");
			$(".yes_btn").on("click", showFromBookMark);
			$(".no_btn").on("click", beginCourseScrom);
		}
		//alert("arr:::"+arr+"currPage::"+this.currPage+"currMod"+this.currMod);

		//this.dispatchCustomEvent("updateView");
	} else {
		this.dispatchCustomEvent("updateView");
	}
};

Model.prototype.supports_html5_storage = function() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
};

Model.prototype.nextPage = function(_control) {

	//console.log('[Model] this.currPage: ' + this.currPage);
	// console.log('[Model] (this.visitedArr[this.currMod]: ' + (this.visitedArr[0][this.currMod]));

	if (this.currMod == (this.modArr.length - 1) && this.currPage == (this.modArr[this.currMod].length - 1)) {
		//-- Last page disable
		return;
	}

	//	if ((this.visitedArr[this.currMod][this.currPage] < this.currPage+1 || this.visitedArr[this.currMod][this.currPage] == 0) && model.learningType != "non-linear") {
	if (this.visitedArr[this.currMod][this.currPage] == 0 && model.learningType != "non-linear") {
		return;
	}

	if (this.currPage == this.modArr[this.currMod].length - 1) {
		this.currPage = 0;
		this.currMod++;
	} else {
		this.currPage++;
	}
	// console.log('this.currPage ' + this.currPage);
	this.dispatchCustomEvent("updateView");

	//-- Can be implemented if any clean up required for page level objects
	// destroyObjects();

};

Model.prototype.prevPage = function(_control) {
	// if (this.currPage == 0 && model.currMod == 0 || this.currPage == 1)
	if (this.currPage == 0 && model.currMod == 0) {
		return;
	}
	if (this.currPage == 0) {
		this.currMod--;
		this.currPage = this.modArr[this.currMod].length - 1;
	} else {
		this.currPage--;
	}
	this.dispatchCustomEvent("updateView");
};
/*******************************/
Model.prototype.setModule = function(page, mod) {
	//if()
};

Model.prototype.setPageVisited = function(page, mod) {
	/*if(this.visitedArr[this.currMod] < (this.currPage+1))
	 {
	 this.visitedArr[this.currMod]++;
	 this.firstTimeVisited = true;
	 }
	 else
	 {
	 this.firstTimeVisited = false;
	 }*/
	if (this.visitedArr[this.currMod][this.currPage] == 0 || this.visitedArr[this.currMod][this.currPage] == '0' || this.visitedArr[this.currMod][this.currPage] == 1 || this.visitedArr[this.currMod][this.currPage] == '1') {
		this.visitedArr[this.currMod][this.currPage] = 2;
		this.firstTimeVisited = true;
	} else {
		this.firstTimeVisited = false;
	}
};
Model.prototype.setPagePartiallyVisited = function(page, mod) {
	if (this.visitedArr[this.currMod][this.currPage] == 0 || this.visitedArr[this.currMod][this.currPage] == '0') {
		this.visitedArr[this.currMod][this.currPage] = 1;
		this.firstTimeVisited = true;
	} else {
		this.firstTimeVisited = false;
	}
};
Model.prototype.setCurrPage = function(page, mod) {

	this.currPage = page;
	this.currMod = mod;
	this.dispatchCustomEvent("updateView");
};

Model.prototype.addCustomEvent = function(evet, callback) {
	this.events_Obj.push({
		"eventName" : evet,
		"funcCallBack" : callback
	});
};

Model.prototype.dispatchCustomEvent = function(arg) {
	for (var i = 0; i < this.events_Obj.length; i++) {
		if (this.events_Obj[i].eventName == arg) {
			this.events_Obj[i].funcCallBack();
			break;
		}
	}
};

