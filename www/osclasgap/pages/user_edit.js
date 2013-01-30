$('#osclasgap_page_user_edit').live('pageshow',function(){
	try {
		// TODO - Once the user retrieve service resource is implemented,
		// we will probably want to use it here instead of relying on
		// osclasgap_user which is populated by system connect.
		$('#osclasgap_user_edit_name').val(osclasgap_user.name);
		$('#osclasgap_user_edit_mail').val(osclasgap_user.mail);
    }
	catch (error) {
		console.log("osclasgap_page_user_edit - " + error);
		alert("osclasgap_page_user_edit - " + error);
	}
});

/**
 * Handles the submission of the user edit form.
 *
 */
$('#osclasgap_user_edit_submit').live('click',function() {
	
	try {
		
		// stop demo user from editing account
		if (osclasgap_settings.demo && osclasgap_user.name == "demo") {
			alert("Sorry, the demo account can't be changed.");
			return false;
                }
		
		// grab form input...
		
		name = $('#osclasgap_user_edit_name').val();
		current_pass = $('#osclasgap_user_edit_current_pass').val();
		mail = $('#osclasgap_user_edit_mail').val();
		pass1 = $('#osclasgap_user_edit_pass1').val();
		pass2 = $('#osclasgap_user_edit_pass2').val();
		
                function alertDismissed() {
		// do something
                }
		// validate user name
		if (!name) {
			navigator.notification.alert('Entre el usuario', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
			return false;
		}
		
		// validate e-mail
		if (!mail) {
			navigator.notification.alert('Entre el correo', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
			return false;
		}
		// if user changed e-mail address, make sure password was provided
		if (osclasgap_user.mail != mail && !current_pass) {
			if (!current_pass) {
				navigator.notification.alert('Entre su contraseña actual para cambiar el correo', // message
                                    alertDismissed, // callback
                                    'Validación', // title
                                    'OK' // buttonName
                                );
				return false;
			}
		}
		
		// if user is changing passwords, make sure the new passwords match 
		// and their current password was provided
		if (pass1 && pass2) {
			if (pass1 != pass2) {
				navigator.notification.alert('Las contraseñas no coinciden', // message
                                    alertDismissed, // callback
                                    'Validación', // title
                                    'OK' // buttonName
                                );
				return false;
			}
			else if (!current_pass) {
				navigator.notification.alert('Entre la contraseña actual para cambiar la contraseña', // message
                                    alertDismissed, // callback
                                    'Validación', // title
                                    'OK' // buttonName
                                );
				return false;
			}
		}
		
		// Build a temp user object to send to the update service resource.
		var temp_user = osclasgap_user;
		temp_user.name = name;
		temp_user.mail = mail;
		temp_user.current_pass = current_pass;
		temp_user.pass1 = pass1;
		temp_user.pass2 = pass2;
		
		// Build the service resource call options.
		options = {
			"user":temp_user,
			"error":function (jqXHR, textStatus, errorThrown) {
				if (errorThrown) {
					alert(errorThrown);
				}
				else {
					alert(textStatus);
				}
			},
			"success":function (data) {
                               if(data == -1)
                                  alert("La contraseña actual es incorrecta");
                               else
                                   if(data == -2)
                                      alert("El correo está en uso por otro usuario");  
                               else
				  $.mobile.changePage("user.html", "slideup");
			}
		};
		
		// Make the service resource call.
		osclasgap_services_user_update.resource_call(options);
		
	}
	catch (error) {
	  console.log("osclasgap_user_edit_submit");
	  console.log(error);
	}
	
  return false; // stop the click from executing any further
  
});