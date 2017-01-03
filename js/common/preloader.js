/**
 * @author Anil.Bakshi
 */
var Preloader = {
	init: function(bodyRef, callback){
		if(bodyRef.find("img").attr("src")==undefined)
		{
			callback()
			return;
			
		}
		bodyRef.jpreLoader({
			showPercentage: false,
			autoClose: true,
		}, function() {	
			callback()
		});
	}
}