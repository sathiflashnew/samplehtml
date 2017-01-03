/*---------------Page Init Functions---------*/
var animations=3;
$(function() {
	imageLoader.load($('.pageWrapper'), controller.loadStyles);
	
});
function preloadingDone() {
	pageLoad=true;
	initAnimStates();
	//controller.setPageVisited();
}
function audioFinish() {
	controller.setPageVisited();
}
/*---------------Variable declartions---------*/
var tll;
$(document).ready(function() {
	
	/*for (var i=0;i<animations;i++){
		if(i==0)
		{
			$(".animEl_"+i).css("display","block");
		}
		else
		{
			$(".animEl_"+i).css("display","none");					
		}
	}	
	 setTimeout(function(){
	 $(".animEl_0").css("display","none");
     $(".animEl_1").css("display","block");
	 },5000);				
    
     setTimeout(function(){
	 $(".animEl_1").css("display","none");
	 $(".animEl_2").css("display","block");
	 },25000);*/
	 
	

	$(".clickText").css("display", "none");

	$("#popup_btn").click(function() {
		$(".clickText").css("display", "block");

	});
	$(".close").click(function() {
		$(".clickText").css("display", "none");

	});
	//playAnimation();
});
/*---------------------Functions---------------------*/
function playAnimation() {
	if (tll) {
		tll.totalProgress(1).kill();
	}
	tll = new TimelineLite({
		onUpdate : updateSlider,
		onComplete : animCompleted
	});	

	tll.add(animateIn_show($(".animEl_0")).play(), 0.0);
	tll.add(animateIn($(".animEl_1")).play(), 0.5);
	
	tll.add(animateOut_hide($(".animEl_0")).play(), 12.0);
	tll.add(animateIn_show($(".animEl_2")).play(), 12.5);
	tll.add(animateIn($(".animEl_3")).play(), 12.5);
	
	tll.add(animateIn($("#dummySynch")).play(), 23.5);
}

function animateIn(el) {
	//el.css('display','block');
	TweenLite.set(el, {
		clearProps : 'opacity'
	});
	var tl = new TimelineLite({
		paused : true
	}, {
		class : "+=listbg"
	}).from(el, 1, {
		autoAlpha : 0
	});
	return tl;
}
function animateInLeft(el, pos) {
	TweenLite.set(el, {
		clearProps : 'opacity'
	});
	var tl = new TimelineLite({
		paused : true
	}, {
		class : "+=listbg"
	}).from(el, .2, {
		autoAlpha : 0,
		left : pos + "px"
	});
	return tl;
}
function animateOut(el) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, 1, {
		opacity : 0,
		display:"none"
	});
	return tl;
}
function leftPos(elem) {
	var curleft = 0;
	if (elem.offsetParent) {
		do {
			curleft += elem.offsetLeft;
		} while (elem = elem.offsetParent);
	}
	return curleft;
}
/*---------------------End---------------------*/
