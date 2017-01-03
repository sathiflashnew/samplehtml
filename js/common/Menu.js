var Menu = function(data) {
	//public
	this.modArr = [];
	this.visitedArr = [];
	//private
	xmlData = data;
	cMode = 0;
	this.pageCounter = 1;
	eventsObj = [];
	this.prevMod_mod = null;

	this.prevPage_page = "blank";
	this.prevPage_mod = "";
};

Menu.prototype.createMenu = function() {
	var structureTag = xmlData.getElementsByTagName("structure")[0];
	var tModules = structureTag.getElementsByTagName("module").length;
	for (var i = 0; i < tModules; i++) {
		this.createModule($("#Menudrp"), structureTag.getElementsByTagName("module")[i], i);
		cMode++;
	}
	this.dispatchCustomEvent("menuReady");

	//-- Debug Feature - Toggle title when menu icon in popup header is clicked
	$('#shell_menu_pop .shell_popup_header h2').click(function() {
		var isTitle = false;
		if ($('div[class^="shell_menu_mod_page_title_"]').attr('title') !== undefined) {
			isTitle = true;
		}
		/*$('div[class^="shell_menu_mod_page_title_"]').each(function(index) {
		 if (isTitle) {
		 $(this).removeAttr('title');
		 } else {
		 $(this).attr('title', $(this).attr('data-path'));
		 }
		 });*/
	});

};

Menu.prototype.createModule = function(htmlTag, xmlTag, index) {
	var id = "shell_mod_" + index;
	//var mCon = $(htmlTag).append("<div id = '" + id + "' class='shell_mod_container_style'></div>");

	//$("#"+id).append("<div id='"+id+"_title' data-mod='"+cMode+"' class='shell_menu_mod_title_nml_style'>"+xmlTag.getAttribute("title")+"</div>");
	// $("#" + id).append("<div id='" + id + "_title' data-mod='" + cMode + "' class='shell_menu_mod_title_nml_style'><div class='shell_menu_mod_indent_nml'>L" + (index + 1) + "</div><div class='shell_menu_mod_text_nml'>" + xmlTag.getAttribute("title") + "</div><div class='shell_menu_mod_icon'><img src='icons/plus.png' /></div></div>");
	// $("#" + id).append("<div id='" + id + "_title' data-mod='" + cMode + "' class='shell_menu_mod_title_nml_style'><div class='shell_menu_mod_indent_nml'></div><div class='shell_menu_mod_text_nml'>" + xmlTag.getAttribute("title") + "</div><div class='shell_menu_mod_icon'><img src='icons/plus.png' /></div></div>");
	//$("#" + id).append("<div id='" + id + "_title' data-mod='" + cMode + "' class='shell_menu_mod_title_nml_style'><div class='shell_menu_mod_indent_nml'></div><div class='shell_menu_mod_text_nml'>" + xmlTag.getAttribute("title") + "</div><div class='shell_menu_mod_icon'></div></div>");

	//$("#" + id).append("<div id='" + id + "_pages' class='shell_menu_page_container_style'></div>");
	//$("#" + id + "_pages").hide();

	// $("#" + id + "_title").on("click", function() {
	//
	// if ($(this).hasClass("shell_menu_mod_title_dsbl_style")) {
	// return;
	// }
	//
	// var id = $(this).data("mod");
	// controller.menuUpdateBy = "self";
	// controller.manageModClick(id);
	// });
	this.createPage($("#Menudrp"), xmlTag);
};

Menu.prototype.createPage = function(pContiner, xmlTag) {
	var tPages = xmlTag.getElementsByTagName("page").length;

	this.modArr[cMode] = [];

	var pTag = xmlTag.getElementsByTagName("page");
	var ptemp = pContiner.append("<ol id='list'>");
	var splitPages = Math.round(tPages / 2);
	var temp = 0;
	for (var i = 0; i < tPages; i++) {
		if (device.MobileDevice()) {
			var pageID = "shell_menu_mod_" + cMode + "_page_" + i;
			if (mobTitlesArr[i] != "") {
				$('#list').append("<li id='" + pageID + "' data-page='" + i + "' data-mod='" + cMode + "' class='icon-fullyCompleted'><a href='#'>" + mobTitlesArr[i] + "<span>" + this.menuPageNo((i + 1)) + "</span></a></li>");
			} else {
				$('#list').append("<li id='" + pageID + "' data-page='" + i + "' data-mod='" + cMode + "' class='icon-fullyCompleted'><a href='#'>" + titlesArr[i] + "<span>" + this.menuPageNo((i + 1)) + "</span></a></li>");

			}
		} else {
			if (i % 2 === 0) {
				if (i != 0) {
					var pageID = "shell_menu_mod_" + cMode + "_page_" + (i - temp);
					//alert(this.menuPageNo((i - temp + 1)));
					$('#list').append("<li id='" + pageID + "' data-page='" + (i - temp) + "' data-mod='" + cMode + "' class='icon-fullyCompleted'><a href='#'>" + titlesArr[(i - temp)] + "<span>" + this.menuPageNo((i - temp + 1)) + "</span></a></li>");
				} else {
					var pageID = "shell_menu_mod_" + cMode + "_page_" + i;
					$('#list').append("<li id='" + pageID + "' data-page='" + i + "' data-mod='" + cMode + "' class='icon-fullyCompleted'><a href='#'>" + titlesArr[i] + "<span>" + this.menuPageNo((i + 1)) + "</span></a></li>");
				}
				temp++;
			} else {
				splitPages--;
				var pageID = "shell_menu_mod_" + cMode + "_page_" + (splitPages + i);
				$('#list').append("<li id='" + pageID + "' data-page='" + (splitPages + i) + "' data-mod='" + cMode + "' class='icon-fullyCompleted'><a href='#'>" + titlesArr[(splitPages + i)] + "<span>" + this.menuPageNo((splitPages + i + 1)) + "</span></a></li>");

			}
		}
		this.modArr[cMode].push({
			"path" : pTag[i].getAttribute("path"),
			"audio" : pTag[i].getAttribute("audio"),
			"data" : pTag[i].getAttribute("data"),
			"styles" : pTag[i].getAttribute("styles"),
			"scripts" : pTag[i].getAttribute("scripts")
			// , "hasMobile" : pTag[i].getAttribute("hasMobilePage")
		});

		//-- Debug Feature - Add path as data so that it can be added as title
		$("#" + pageID).attr('data-path', pTag[i].getAttribute("path"));
		// $("#" + pageID).attr('title', pTag[i].getAttribute("path"));
		//--------------------------------------------------------------------//

		$("#" + pageID).on("click", function() {
			if ($(this).hasClass("shell_menu_mod_page_title_dsbl_style") || $(this).hasClass("Active")) {
				return;
			}
			controller.managePageClick($(this).data("page"), $(this).data("mod"));
		});
		this.pageCounter++;
	}

};
Menu.prototype.menuPageNo = function(pageNo) {
	if (pageNo <= 9) {
		return "0" + pageNo;
	} else {
		return pageNo;
	}
};
Menu.prototype.updateMenu = function(page, mod, visitedArr) {
	for (var i = 0; i < visitedArr.length; i++) {
		//====Module
		/*var node = $("#shell_mod_" + i + "_title");
		node.removeClass(node.attr("class"));
		node.find("span").eq(0).removeClass(node.find("span").eq(0).attr("class"));
		node.find("span").eq(1).removeClass(node.find("span").eq(1).attr("class"));
		// node.find("img").attr("src", "icons/plus.png");
		if (i == 0 || model.learningType == "non-linear" || visitedArr[i].join().indexOf('1') != -1) {

		node.addClass("shell_menu_mod_title_nml_style");
		node.find("span").eq(0).addClass("shell_menu_mod_indent_nml");
		node.find("span").eq(1).addClass("shell_menu_mod_text_nml");
		} else {
		node.addClass("shell_menu_mod_title_dsbl_style");
		node.find("span").eq(0).addClass("shell_menu_mod_indent_dsbl");
		node.find("span").eq(1).addClass("shell_menu_mod_text_dsbl");
		}*/
		//====================Page=======================
		for (var j = 0; j < this.modArr[i].length; j++) {
			var node_1 = $("#shell_menu_mod_" + i + "_page_" + j);
			node_1.removeClass(node_1.attr("class"));
			if ((visitedArr[i][j] == 1 || visitedArr[i][j] == '1')) {
				node_1.addClass("icon-partialcompleted");
			} else if ((visitedArr[i][j] == 2 || visitedArr[i][j] == '2')) {
				node_1.addClass("icon-fullyCompleted");
			} else if ((visitedArr[i][j] == 0 || visitedArr[i][j] == '0')) {
				node_1.addClass("icon-notcompleted");
			} else {
				//if previous page is completed enable this page
				if (visitedArr[i][j - 1] == 1 || visitedArr[i][j - 1] == '1') {
					node_1.addClass("icon-partialcompleted");
				} else {
					node_1.addClass("icon-partialcompleted");
				}
			}
		}
		// j loop finish
	}
	//on last page of current mod enable next module
	var node_0 = $("#shell_mod_" + (mod + 1) + "_title");
	if (visitedArr[mod].join().indexOf('0') == -1) {
		node_0.removeClass(node_0.attr("class"));
		node_0.addClass("icon-notcompleted");
	}
	//======================
	var pageClick = page;
	var modClick = mod;
	//remove the previous page click state and add normal state
	if (this.prevPage_page != null) {
		if (this.prevPage_page == pageClick && this.prevPage_mod == modClick) {
			//donothing
		} else {
			var prevNod = $("#shell_menu_mod_" + this.prevPage_mod + "_page_" + this.prevPage_page);

			prevNod.removeClass(prevNod.attr("class"));

		}
	}
	///==========
	//add click state to current page
	var currNod = $("#shell_menu_mod_" + modClick + "_page_" + pageClick);
	currNod.removeClass(currNod.attr("class"));
	currNod.addClass("Active");
	if ((visitedArr[mod][page] == 1 || visitedArr[mod][page] == '1')) {
		currNod.addClass("icon-partialcompleted");
	} else if ((visitedArr[mod][page] == 2 || visitedArr[mod][page] == '2')) {
		currNod.addClass("icon-fullyCompleted");
	} else if ((visitedArr[mod][page] == 0 || visitedArr[mod][page] == '0')) {
		currNod.addClass("icon-notcompleted");
	}

	//==============
	this.prevPage_page = page;
	this.prevPage_mod = mod;
	//this.manageModClick(mod);
};

Menu.prototype.manageModClick = function(modID) {

	var modNode = $("#shell_mod_" + modID + "_title");
	if (modNode.hasClass("shell_menu_mod_title_nml_style")) {

		modNode.removeClass("shell_menu_mod_title_nml_style");
		modNode.find("span").eq(0).removeClass("shell_menu_mod_indent_nml");
		modNode.find("span").eq(1).removeClass("shell_menu_mod_text_nml");
		modNode.addClass("shell_menu_mod_title_clk_style");
		modNode.find("span").eq(0).addClass("shell_menu_mod_indent_clk");
		modNode.find("span").eq(1).addClass("shell_menu_mod_text_clk");
		// modNode.find("img").attr("src", "icons/minus.png");

	} else {
		modNode.removeClass("shell_menu_mod_title_clk_style");
		modNode.find("span").eq(0).removeClass("shell_menu_mod_indent_clk");
		modNode.find("span").eq(1).removeClass("shell_menu_mod_text_clk");
		modNode.addClass("shell_menu_mod_title_nml_style");
		modNode.find("span").eq(0).addClass("shell_menu_mod_indent_nml");
		modNode.find("span").eq(1).addClass("shell_menu_mod_text_nml");
		// modNode.find("img").attr("src", "icons/plus.png");
	}
	//related menu pages show/hide
	if (this.prevMod_mod == null) {
		this.prevMod_mod = modID;
		$("#shell_mod_" + modID + "_pages").show();
	} else {
		if (modID != this.prevMod_mod) {
			$("#shell_mod_" + modID + "_pages").show();
			$("#shell_mod_" + this.prevMod_mod + "_pages").hide();
			$("#shell_mod_" + this.prevMod_mod + "_title").removeClass("shell_menu_mod_title_clk_style");
			$("#shell_mod_" + this.prevMod_mod + "_title").find("span").eq(0).removeClass("shell_menu_mod_indent_clk");
			$("#shell_mod_" + this.prevMod_mod + "_title").find("span").eq(1).removeClass("shell_menu_mod_text_clk");

			$("#shell_mod_" + this.prevMod_mod + "_title").addClass("shell_menu_mod_title_nml_style");
			$("#shell_mod_" + this.prevMod_mod + "_title").find("span").eq(0).addClass("shell_menu_mod_indent_nml");
			$("#shell_mod_" + this.prevMod_mod + "_title").find("span").eq(1).addClass("shell_menu_mod_text_nml");
			// $("#shell_mod_" + this.prevMod_mod + "_title").find("img").attr("src", "icons/plus.png");
		} else {
			if (controller.menuUpdateBy == "self") {
				$("#shell_mod_" + modID + "_pages").toggle();

			} else {
				$("#shell_mod_" + modID + "_pages").show();
			}
		}
		this.prevMod_mod = modID;
	}
	if (controller)/*To avoid error when its custom call for page load below line throw error*/
		controller.menuUpdateBy = "system";
};
/******************************************************************************************/

Menu.prototype.addCustomEvent = function(evet, callback) {
	eventsObj.push({
		"eventName" : evet,
		"funcCallBack" : callback
	});
};

Menu.prototype.dispatchCustomEvent = function(arg) {
	for (var i = 0; i < eventsObj.length; i++) {
		if (eventsObj[i].eventName == arg) {
			eventsObj[i].funcCallBack();
			break;
		}
	}
};
