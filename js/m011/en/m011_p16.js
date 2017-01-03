//this user define variable is used to hide the image from the assessment question up to second que
var noScreenImgHide = 2;
//its custom event, this is used to trigger the question count in the loadQuestion method, which is send a "data" from the Knowledgecheck.js
jQuery('.assessmentContent img').bind('DISPATCHEVENT', initateFn);

function initateFn(event, data){
	//alert(data +"  event");
	var no = Number(data);
	if(no < noScreenImgHide){
		//jQuery('.assessmentContent img').hide();
		jQuery('.assessmentBox').removeClass('with_img');
	}else{
		jQuery('.assessmentContent img').unbind('DISPATCHEVENT', initateFn);
		//jQuery('.assessmentContent img').show();
		//jQuery('.assessmentBox').removeClass('with_img');
		jQuery('.assessmentBox').addClass('with_img');
	}
	
}

 