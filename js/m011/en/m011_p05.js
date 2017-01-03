/*---------------Page Init Functions---------*/
var animations=3;
var imgCount=0;
$(function() {
	imageLoader.load($('.pageWrapper'), controller.loadStyles);
	
});
function preloadingDone() {
	pageLoad=true;
	initAnimStates();
}
function audioFinish() {
	controller.setPageVisited();
}
/*---------------Variable declartions---------*/
var tll;
$(document).ready(function() {
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
	tll.add(animateIn_show($(".animEl_1")).play(), 0);
	tll.add(animateOut_hide($(".animEl_1")).play(), 8);
	tll.add(animateIn_show($(".animEl_2")).play(), 8);
	
	tll.add(animateIn_show($(".animEl_7")).play(), 6.5);
	tll.add(animateOut_hide($(".animEl_7")).play(), 7);
	imgCount=0;
	tll.add(animateIn_show($(".sugar")).play(), 9);
	$($(".animEl_5 span")).each(function(index) {
			var temp = index + 1;
			if (temp == 1) {
				//tll.add(animateOut_hide($(this).prev()).play(), 9.5);
			} else {
				if (temp == 2) {
					tll.add(animateOut_hide($(this).prev()).play(), 12.7);
					//tll.add(m_animateInRight($(".animEl_6"), -100).play(), 11.9);
				} else if (temp == 3) {
					tll.add(animateOut_hide($(this).prev()).play(), 11.8);
					//tll.add(m_animateInRight($(".animEl_6"), -80).play(), 11.3);
				} else if (temp == 4) {
					tll.add(animateOut_hide($(this).prev()).play(), 10.9);
					//tll.add(m_animateInRight($(".animEl_6"), -60).play(), 10.7);
				} else if (temp == 5) {
					tll.add(animateOut_hide($(this).prev()).play(), 10.2);
					//tll.add(m_animateInRight2($(".animEl_6"), -20).play(), 10.1);
				} else if (temp == 6) {
					tll.add(animateOut_hide($(this).prev()).play(), 9.5);
					
					//tll.add(m_animateInRight1($(".animEl_6"), -20).play(), 9.5);
				} 
			}
		});
	
	tll.add(animateR($(".animEl_6"), 20).play(), 9.4);
	//tll.add(animateIn_show($(".animEl_7")).play(), 9.5);
	//tll.add(animateIn_show($(".animEl_7")).play(), 9.5);
	tll.add(animateIn_show($(".animEl_7")).play(), 10.2);
	tll.add(animateOut_hide($(".animEl_7")).play(), 11);
	tll.add(animateIn_show($(".animEl_7")).play(), 12);
	tll.add(animateOut_hide($(".animEl_7")).play(), 12.8);
	
	
	tll.add(animateOut_hide($(".animEl_2")).play(), 15.5);
	tll.add(animateIn_show($(".animEl_3")).play(), 15.5);
	tll.add(animateOut_hide($(".animEl_3")).play(), 30.5);
	tll.add(animateIn_show($(".animEl_4")).play(), 30.5);
	tll.add(animateIn($("#dummySynch")).play(), 39.5);
}


function animateR(el) {
	TweenLite.set(el, {
		clearProps : 'all'
	});
	var tl = new TimelineLite({
		paused : true
	}).to(el, 5, {
		left : 60,
	    
    attr:{src:'assets/image/m011/en/m011_p05_img02_2.png'}, roundProps:'attr',
    onUpdate: updateImg
	//onComplete: function() { $('#eat').attr('src', 'assets/image/m011/en/m011_p05_img02_2.png'); }
	},"+=0.05");
	return tl;
}
  
var numberArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,2,2,2,2,2,2,2,2,2,2,2,2];  
function updateImg() {

	if(imgCount>numberArray.length){
	imgCount=0;
	}
	
    var no = Number(imgCount%2)+1;
  console.log(numberArray[imgCount]);
  if(numberArray[imgCount]==1){
	  $('#eat').css("opacity",1)
	   $('#eat1').css("opacity",0)
  }else  if(numberArray[imgCount]==2){
	  $('#eat1').css("opacity",1)
	   $('#eat').css("opacity",0)
  }
	//$('#eat').attr('src','assets/image/m011/en/m011_p05_img02_'+numberArray[imgCount]+'.png');	
	imgCount++;
	
}


/*TweenMax.to($storyNumber, 1.2, {
    ease:Power4.easeInOut ,    
    attr:{no:10}, roundProps:'attr',
    onUpdate: updateImg,
    onComplete: function() { $storyNumber.attr('no', 0); }
});*/

function m_animateInRight1(el, callBack, param, pos) {
	//alert(":::herre:::");
	var tl = new TimelineLite({
		paused : true
	}).to(el, 0.5, {
		opacity : 1,
		display : 'block',
		right : '25px',
		onComplete : function() {
			if (callBack == '') {

			} else {
				if (param == undefined) {
				} else {
					if (param[0]) {
						//window[callBack](param);
					}
				}
			}
			tl.kill();
		}
	});
	return tl;
}
function m_animateInRight2(el, callBack, param, pos) {
	var tl = new TimelineLite({
		paused : true
	}).to(el, 0.5, {
		opacity : 1,
		display : 'block',
		right : '50px',
		onComplete : function() {
			if (callBack == '') {

			} else {
				if (param == undefined) {
				} else {
					if (param[0]) {
						//window[callBack](param);
					}
				}
			}
			tl.kill();
		}
	});
	return tl;
}


/*---------------------End---------------------*/
