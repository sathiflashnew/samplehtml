/**
 * @author Shigil.Gangadharan
 */
var model1;
model1 = new Model();
var firstActive = true;
var Glossary = {
	data : xmlParser.getXml(model1.commondataPath + "glossary.xml"),
	deviceType : "",

	myConfig : {
		useCaching : true,
		language : "en"
	},

	// a very basic method
	createGlossary : function() {
		Glossary.deviceType = device.iPhone() || device.AndroidPhone() ? "mobile" : "noMobile";
		var numAlphabets = Glossary.data.getElementsByTagName("alphabet").length;
		for (var i = 0; i < numAlphabets; i++) {
			var currAlp = Glossary.data.getElementsByTagName("alphabet")[i].getAttribute("letter");
			if (Glossary.data.getElementsByTagName("alphabet")[i].getElementsByTagName("word").length == 0) {
				$("#alphbet_wraper").append("<li class='disabled' id  ='" + "shell_alph_" + i + "'>" + currAlp + "</li>");
			} else {
				$("#alphbet_wraper").append("<li class='active' id  ='" + "shell_alph_" + i + "'>" + currAlp + "</li>");
				if (firstActive) {
					firstActive = false;
					$('#alphbet_wraper').on('click', '.active', Glossary.generateWords);
					$('#shell_alph_' + i).trigger("click", Glossary.generateWords);
					$('#shell_alph_' + i).addClass("shell_g_letterSelected");
				}
			}
		}
	},

	generateWords : function() {
		var currNode = parseInt(this.id.split("shell_alph_")[1]);
		var numWords = Glossary.data.getElementsByTagName("alphabet")[currNode].getElementsByTagName("word").length;
		$('#GlossaryDescription').html("");
		//setting the div to top when alphabet clicked
		if (Glossary.deviceType != "mobile") {
			//$('#shell_g_popup_content').scrollTop(0);
		}

		for (var i = 0; i < numWords; i++) {
			var currWord = Glossary.data.getElementsByTagName("alphabet")[currNode].getElementsByTagName("word")[i].childNodes[0].nodeValue;
			if (currWord.length > 20 && Glossary.deviceType != "mobile") {
				//var charArray=currWord.split("");
				currWord = currWord.slice(0, 20) + "...";
			}

			//$("#shell_GlossaryWords").append("<div class='shell_g_name' id  ='" + "shell_word_" + currNode + "_" + i + "'>" + currWord + "</div>");
			$("#shell_GlossaryAlphabets div").removeClass("shell_g_letterSelected");
			if (Glossary.deviceType == "mobile") {
				var description = Glossary.data.getElementsByTagName("alphabet")[currNode].getElementsByTagName("description")[0].childNodes[0].nodeValue;
				$("#shell_GlossaryWords").append("<div class='shell_d_name'>" + description + "</div>");
			}
			var description = Glossary.data.getElementsByTagName("alphabet")[currNode].getElementsByTagName("description")[i].childNodes[0].nodeValue;
			var currentWord = Glossary.data.getElementsByTagName("alphabet")[currNode].getElementsByTagName("word")[i].childNodes[0].nodeValue;

			//$('#GlossaryDescription').html("<h3>" + currentWord + "</h3>" + "<p>" + description + "</p>");
			$('#GlossaryDescription').append("<li><h3>" + currentWord + "</h3><p>" + description + "</p></li>");
		}

		$(this).addClass("shell_g_letterSelected");

		if (Glossary.deviceType == "mobile") {
			$("#shell_GlossaryWords").accordion({
				heightStyle : "content"
			});
			return;
		}
		//$("#shell_GlossaryWords :first").addClass("shell_g_wordSelected");
		//$('#shell_GlossaryWords').on('click', 'div', Glossary.generateDescription);

	},

	generateDescription : function() {
		var currAlpNode = parseInt(this.id.split("_")[2]);
		var currWordNode = parseInt(this.id.split("_")[3]);

		var description = Glossary.data.getElementsByTagName("alphabet")[currAlpNode].getElementsByTagName("description")[currWordNode].childNodes[0].nodeValue;
		var currentWord = Glossary.data.getElementsByTagName("alphabet")[currAlpNode].getElementsByTagName("word")[currWordNode].childNodes[0].nodeValue;

		$('#GlossaryDescription').html("<b>" + currentWord + "</b>" + "<br/>" + description);

		$("#shell_GlossaryWords div").removeClass("shell_g_wordSelected");
		$(this).addClass("shell_g_wordSelected");
	}
};

$(function() {
	Glossary.createGlossary();
});

