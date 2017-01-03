var SCORMHandler = function() {
};

SCORMHandler.prototype.getValue = function() {
	Bookmark_location = model.currPage + "||" + model.currMod + "||" + model.visitedArr;
	fnSaveBookmark(Bookmark_location);
	return true;
};

SCORMHandler.prototype.setComplete = function() {
	set_val('cmi.core.lesson_status', "completed");
	fnSetCompletion();
};

SCORMHandler.prototype.getBookmarkLocation = function() {
	if (Bookmark_location != "" && Bookmark_location != undefined && Bookmark_location != "undefined" && Bookmark_location != "null" && Bookmark_location != null && Bookmark_location != "notSet") {
		//$("#initLaunchBtn").show();
		//$(".resume").css("display", "block");
		
	} else {
		if (Bookmark_location != "notSet" && loadingDone != false) {
			$("#initLaunchBtn").show();
		}
		//$(".resume").css("display", "none");
	}
	
	return true;
};

SCORMHandler.prototype.initSCO = function() {
	if (isSCORM) {
		model.init();

	} else {
		model.dispatchCustomEvent("updateView");
	}
};

SCORMHandler.prototype.initSCOjs = function() {
	initSco();
};
