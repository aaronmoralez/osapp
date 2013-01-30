/**
 * Handles the register page show event.
 *
 */
$('#osclasgap_page_user_register').live('pageshow',function(){
  try {
        if (osclasgap_user.uid != 0) {
          $.mobile.changePage("dashboard.html", "slideup");
        }
  }
  catch (error) {
	  console.log("osclasgap_page_user_register - " + error);
  }
});

/**
 * Handles the submission of the user registration form.
 *
 */
$('#osclasgap_user_register_submit').live('click',function() {
	
	try {
	  
          function alertDismissed() {
		// do something
                }
	  // Grab name and validate it.
	  var name = $('#name').val();
	  if (!name) { 
              navigator.notification.alert('Entre el usuario', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
              return false; }
	  
	  // Grab mail and validate it.
	  var mail = $('#mail').val();
	  if (!mail) { 
              navigator.notification.alert('Entre el correo', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
              return false; }
	  
	  // Grab passwords, compare and validate. 
	  var pass = $('#s_password').val();
	  if (!pass) { 
              navigator.notification.alert('Entre la contraseña', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
              return false; }
	  var pass2 = $('#s_password2').val();
	  if (!pass2) {
              navigator.notification.alert('Confirme su contraseña', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
              return false; }
	  if (pass != pass2) { 
              navigator.notification.alert('Las contraseñas no coinciden', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
              return false; }
	  
	  // Build service call options.
	  //user_registration = osclasgap_services_user_register(name,mail,pass);
          options = {
		"name":name,
		"mail":mail,
		"pass":pass,
		"pass2":pass2,
		
		"error":function(jqXHR, textStatus, errorThrown) {
                    	if (errorThrown) {
				alert(errorThrown);
			}
			else {
				alert(textStatus);
			}
	  	},
	  	
		"success":function(data){
                    switch(data.result){
                       case 1: 
                       case 4: sms = "Usuario ha sido creado y el correo de activación ha sido enviado";  
                           break;
                       case 5: sms = "Correo no válido";  
                           break;
                       case 3: sms = "Correo en uso";  
                           break;
                       
                           break;
                       default:sms = "Error";
                           break;
                    }
                    navigator.notification.alert(sms, // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    $.mobile.changePage("dashboard.html", "slideup");
	  	}
	  };
	  
	  // Make the service call.
	  //osclasgap_services_user_register.resource_call(options);
	  osclasgap_services_osclasgap_user_register.resource_call(options);
	}
	catch (error) {
	  console.log("osclasgap_user_register_submit - " + error);	  
	}

});