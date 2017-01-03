/**
 * @author Shigil.Gangadharan
 */

$(function() {
			
			function supports_html5_storage()
			{
			  try 
			  {
			    return 'localStorage' in window && window['localStorage'] !== null;
			  } 
			  catch (e) 
			  {
			    return false;
			  }
			}
			if(supports_html5_storage())
			$('#shell_n_popup_content').text(localStorage.getItem('notes'));
			
			$('#shell_n_popup_content').on('input paste',saveNoteData); 
			
			
			//$('#shell_n_popup_content').focus();
			
			function saveNoteData() 
			{
				var noteText = $('#shell_n_popup_content').val();
				localStorage.setItem('notes',noteText);

			}
			

			
			});
