/**
 * Handles the login page show event.
 *
 */
$('#osclasgap_page_user_login').live('pageshow',function(){
  try {
	  	// if user is already logged in, send them to the dashboard
	if (osclasgap_user.uid != 0) {
          $.mobile.changePage("dashboard.html", "slideup");
          return;
        }
	    
        // if in demo mode, prepopulate login fields
        // TODO - this type of code should live in the future idea of
        // hook_page_user_login, since it is custom for a particular app
        if (osclasgap_settings.demo) {
            $('#osclasgap_user_login_name').val("demo");
            $('#osclasgap_user_login_pass').val("osclasgap2012");
        }
  }
  catch (error) {
	  console.log("osclasgap_page_user_login");
	  console.log(error);
  }
});

/**
 * Handles the submission of the user login form.
 *
 */
$('#osclasgap_user_login_submit').live('click',function() {
	
	try {
	  
          function alertDismissed() {
		// do something
                }
	  // grab name and validate it
	  var name = $('#osclasgap_user_login_name').val();
	  if (!name) { 
              navigator.notification.alert('Entre el usuario', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
              return false; }
	  
	  // grab pass and validate it
	  var pass = $('#osclasgap_user_login_pass').val();
	  if (!pass) { 
              navigator.notification.alert('Entre la contraseña', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
              return false; }
	  
	  // Make call to the bundled user login service resource.
	  options = {
		"name":name,
		"pass":pass
	  };
          
	 
	  osclasgap_services_osclasgap_user_login.resource_call(options);
          $('#osclasgap_user_login_name').val('');
          $('#osclasgap_user_login_pass').val('');
	}
	catch (error) {
	  console.log("osclasgap_user_login_submit - " + error);
	}
	
  return false; // stop the click from executing any further
  
});