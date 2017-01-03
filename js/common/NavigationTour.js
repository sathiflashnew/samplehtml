$(document).ready(function() {
	$('#SkipButton').click(function() {
		$(".NavTour").css("display", "none");
		$('#splashContainer').css('display','block');
		audioPlayer.destroyNavAudio();
		ProgressiveLoader.terminateLoader();
	});
});
var navAudioDeskArr_en=[22.3,24.9,27.5,33.1,36.2,39.8,47,55,60,70,76,77,91,99,106.5];
var navAudioDeviceArr_en=[0.1,5,10,15,20,25,30,35,40,45,50,55,60,65,69,69.5];
var navAudioDeskArr_ar=[22.3,24.9,27.5,33.1,36.2,39.8,47,55,60,70,76,77,91,99,106.5];
var navAudioDeviceArr_ar=[0.1,5,10,15,20,25,30,35,40,45,50,55,60,65,69,69.5];
var tll;
function playNavAnimation()
{
	if (tll) {
		tll.totalProgress(1).kill();
		//$(".popups").css("display", "none");
	}
	tll = new TimelineLite({
		onUpdate : updateSlider,
		onComplete : animCompleted
	});     
	controller.ShellBtnDisableforNavTour();
  	$(".Shell_menu").css('display','block');
	if(device.iPhone()||device.iPad()){
	$(".audioButton").css("display","none");
	}else{
	$(".audioButton").css("display","block");
	}
	var navLang=model.langName.split("/");
	//console.log(this["navAudioDeskArr_"+navLang[0]][0]+":::"+navAudioDeskArr_en[14]+"::::navAudioDeskArr_en:::"+navAudioDeskArr_en.length+"::::"+navLang[0]);
	//console.log(navAudioDeviceArr_en[15]+"::::navAudioDeskArr_en:::"+navAudioDeviceArr_en.length);
	if (!device.iPhone() && !device.iPad() && !device.Android()) {
		//--- Desktop----
	   tll.add(animateIn($(".animNavEl_1")).play(), this["navAudioDeskArr_"+navLang[0]][0]);
	   tll.add(animateOut($(".animNavEl_1")).play(), this["navAudioDeskArr_"+navLang[0]][1]);
	   tll.add(animateIn($(".animNavEl_2")).play(), this["navAudioDeskArr_"+navLang[0]][1]);
	   tll.add(animateOut($(".animNavEl_2")).play(), this["navAudioDeskArr_"+navLang[0]][2]);
	   tll.add(animateIn($(".animNavEl_3")).play(), this["navAudioDeskArr_"+navLang[0]][2]);
	   tll.add(animateOut($(".animNavEl_3")).play(),this["navAudioDeskArr_"+navLang[0]][3]);
	   tll.add(animateIn($(".animNavEl_4")).play(), this["navAudioDeskArr_"+navLang[0]][3]);
	   tll.add(animateOut($(".animNavEl_4")).play(), this["navAudioDeskArr_"+navLang[0]][4]);
	   tll.add(animateIn($(".animNavEl_5")).play(), this["navAudioDeskArr_"+navLang[0]][4]);
	   tll.add(animateOut($(".animNavEl_5")).play(), this["navAudioDeskArr_"+navLang[0]][5]);
	   tll.add(animateIn($(".animNavEl_6")).play(), this["navAudioDeskArr_"+navLang[0]][5]);
	   tll.add(animateOut($(".animNavEl_6")).play(), this["navAudioDeskArr_"+navLang[0]][6]);
	   tll.add(animateIn($(".animNavEl_7")).play(), this["navAudioDeskArr_"+navLang[0]][6]);
	   tll.add(animateOut($(".animNavEl_7")).play(), this["navAudioDeskArr_"+navLang[0]][7]);
	   tll.add(animateIn($(".animNavEl_8")).play(), this["navAudioDeskArr_"+navLang[0]][7]);
	   tll.add(animateOut($(".animNavEl_8")).play(), this["navAudioDeskArr_"+navLang[0]][8]);
	   tll.add(animateIn($(".animNavEl_9")).play(), this["navAudioDeskArr_"+navLang[0]][8]);
	   tll.add(animateOut($(".animNavEl_9")).play(), this["navAudioDeskArr_"+navLang[0]][9]);
	   tll.add(animateIn($(".animNavEl_10")).play(), this["navAudioDeskArr_"+navLang[0]][9]);
	   tll.add(animateOut($(".animNavEl_10")).play(), this["navAudioDeskArr_"+navLang[0]][10]);
	   tll.add(animateIn($(".animNavEl_11")).play(), this["navAudioDeskArr_"+navLang[0]][11]);
	   tll.add(animateOut($(".animNavEl_11")).play(), this["navAudioDeskArr_"+navLang[0]][12]);
	   tll.add(animateIn($(".animNavEl_14")).play(), this["navAudioDeskArr_"+navLang[0]][11]);
	   tll.add(animateOut($(".animNavEl_14")).play(), this["navAudioDeskArr_"+navLang[0]][12]);
	   tll.add(animateIn($(".animNavEl_12")).play(), this["navAudioDeskArr_"+navLang[0]][12]);
	   tll.add(animateOut($(".animNavEl_12")).play(), this["navAudioDeskArr_"+navLang[0]][13]);
	   tll.add(animateIn($(".animNavEl_13")).play(), this["navAudioDeskArr_"+navLang[0]][13]);
	   tll.add(animateIn($("#dummySynch")).play(), this["navAudioDeskArr_"+navLang[0]][14]);
	}else{
		//--- Device----- 
	  tll.add(animateIn($(".animNavEl_1")).play(), this["navAudioDeviceArr_"+navLang[0]][0]);
	   tll.add(animateOut($(".animNavEl_1")).play(), this["navAudioDeviceArr_"+navLang[0]][1]);
	   tll.add(animateIn($(".animNavEl_2")).play(), this["navAudioDeviceArr_"+navLang[0]][1]);
	   tll.add(animateOut($(".animNavEl_2")).play(), this["navAudioDeviceArr_"+navLang[0]][2]);
	   tll.add(animateIn($(".animNavEl_3")).play(), this["navAudioDeviceArr_"+navLang[0]][2]);
	   tll.add(animateOut($(".animNavEl_3")).play(), this["navAudioDeviceArr_"+navLang[0]][3]);
	   tll.add(animateIn($(".animNavEl_4")).play(), this["navAudioDeviceArr_"+navLang[0]][3]);
	   tll.add(animateOut($(".animNavEl_4")).play(), this["navAudioDeviceArr_"+navLang[0]][4]);
	   tll.add(animateIn($(".animNavEl_5")).play(), this["navAudioDeviceArr_"+navLang[0]][4]);
	   tll.add(animateOut($(".animNavEl_5")).play(), this["navAudioDeviceArr_"+navLang[0]][5]);
	   tll.add(animateIn($(".animNavEl_6")).play(), this["navAudioDeviceArr_"+navLang[0]][5]);
	   tll.add(animateOut($(".animNavEl_6")).play(), this["navAudioDeviceArr_"+navLang[0]][6]);

	   tll.add(animateIn($(".animNavEl_9")).play(), this["navAudioDeviceArr_"+navLang[0]][6]);
	   tll.add(animateOut($(".animNavEl_9")).play(), this["navAudioDeviceArr_"+navLang[0]][7]);
	   tll.add(animateIn($(".animNavEl_10")).play(), this["navAudioDeviceArr_"+navLang[0]][7]);
	   tll.add(animateOut($(".animNavEl_10")).play(), this["navAudioDeviceArr_"+navLang[0]][8]);
	   tll.add(animateIn($(".animNavEl_11")).play(), this["navAudioDeviceArr_"+navLang[0]][8]);
	   tll.add(animateOut($(".animNavEl_11")).play(), this["navAudioDeviceArr_"+navLang[0]][10]);
	   
	   
	   tll.add(animateIn($(".animNavEl_14")).play(), this["navAudioDeviceArr_"+navLang[0]][8]);
	   tll.add(animateOut($(".animNavEl_14")).play(), this["navAudioDeviceArr_"+navLang[0]][9]);
	   
	   tll.add(animateIn($(".animNavEl_12")).play(), this["navAudioDeviceArr_"+navLang[0]][9]);
	   tll.add(animateOut($(".animNavEl_12")).play(), this["navAudioDeviceArr_"+navLang[0]][10]);
	   tll.add(animateIn($(".animNavEl_13")).play(), this["navAudioDeviceArr_"+navLang[0]][10]);
	   tll.add(animateOut($(".animNavEl_13")).play(), this["navAudioDeviceArr_"+navLang[0]][11]);
	   
	   tll.add(animateIn($(".animNavEl_7")).play(), this["navAudioDeviceArr_"+navLang[0]][11]);
	   tll.add(animateOut($(".animNavEl_7")).play(), this["navAudioDeviceArr_"+navLang[0]][12]);
	   tll.add(animateIn($(".animNavEl_8")).play(), this["navAudioDeviceArr_"+navLang[0]][13]);
	   tll.add(animateOut($(".animNavEl_8")).play(), this["navAudioDeviceArr_"+navLang[0]][14]);
	   tll.add(animateIn($("#dummySynch")).play(), this["navAudioDeviceArr_"+navLang[0]][15]);
	}
}