$('#osclasgap_page_user').live('pageshow',function(){
	try {
		
		if (osclasgap_user.uid == 0) { 
			$.mobile.changePage("dashboard.html", "slideup");
			return false;
		}
		
		
		// user created date (Drupal's time value(s) must be multiplied by 1000 since JavaScript deals in milliseconds for the Unix Epoch????)
		$('#osclasgap_page_user_details').append($('<strong>Usuario</strong>: <spam>'+osclasgap_user.name+'</spam><br>'));
		$('#osclasgap_page_user_details').append($('<strong>Correo</strong>: <spam>'+osclasgap_user.mail+'</spam><br>'));
                $('#osclasgap_page_user_details').append($('<strong>Miembro desde</strong>: <spam>'+osclasgap_user.created+'</spam><br><br>'));
		
		
    }
	catch (error) {
		console.log("osclasgap_page_user - " + error);
		alert("osclasgap_page_user - " + error);
	}
});

$('#my_items').live("click",function(){
      get_last_items();
});

