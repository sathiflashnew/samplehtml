( function($) {
		$.fn.blueMobileMenu = function(options) {
			var settings = $.extend({
				color : "#556b2f",
				backgroundColor : "#cc0000"
			}, options);

			var id = this.attr("id");
			var mobile = true;

			$("a[href$=" + id + "]").addClass("blueMobileMenuIcon").on("click", function() {
				$("#" + id).slideToggle();
			});

			/*$("#blue-mobile-menu").addClass("blueMobileMenuIcon").on("click", function() {
			 this.slideToggle();
			 });*/

			this.addClass("blueMobileMenu");

			/*this.find("li").attr("class", "firstLevel");
			 this.find("li ul li").attr("class", "secondLevel");
			 this.find("li ul li ul li").attr("class", "thirdLevel");
			 this.find("li ul li ul li ul li").attr("class", "fourthLevel");*/

			this.find("li").has("ul").addClass("closed").prepend("<img class='icon' src='imgs/icon_arrow_right.png'/>");

			if (mobile === true) {
				this.on("click", ".icon", function(e) {
					$(this).parent().find("ul").first().slideToggle();
					if ($(this).parent().hasClass("closed")) {
						$(this).attr("src", "imgs/icon_arrow_down.png");
						$(this).parent().removeClass("closed").addClass("open");
					} else {
						$(this).attr("src", "imgs/icon_arrow_right.png");
						$(this).parent().removeClass("open").addClass("closed");
					}
					e.stopPropagation();
				});
				CheckToggleMenu();
			}
			return this;
		};

		var SmallSize = true;

		$(window).resize(function() {
			CheckToggleMenu();
		});

		function CheckToggleMenu() {
			var windowWidth = $(window).width();
			if (windowWidth > 700) {
				//console.log("windowWidth>>>>"+windowWidth)
				//ul id="blue-mobile-menu" class="blueMobileMenu" style="display: none;"
				$(".blueMobileMenu").css("display", "block");
				$("#blue-mobile-menu").css("display", "block");
				SmallSize = true;
				//$(this).parent().find("ul").first().slideToggle();
			} else {
				//console.log("windowWidth__________>"+windowWidth)
				if (SmallSize == true) {
					SmallSize = false;
					$(".blueMobileMenu").css("display", "none");
					$("#blue-mobile-menu").css("display", "none");
				}
			}
		}

	}(jQuery));
