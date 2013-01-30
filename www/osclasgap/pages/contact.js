var osclasgap_page_comment_cid; // other's set this cid so this page knows which comment to load

$('#osclasgap_page_comment').live('pageshow',function(){
	try {
	     $("#yourName").val(osclasgap_user.name);
	     $("#yourEmail").val(osclasgap_user.mail);		
	}
	catch (error) {
		console.log("osclasgap_page_node");
		console.log(error);
	}
});
$('#osclasgap_page_contact_add_submit').live('click',function(){
	try {
            
            
                function alertDismissed() {
		// do something
                }
                if (!$('#yourName').val()) {
                    navigator.notification.alert('Debe entrar su nombre', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
                if (!$('#yourEmail').val()) {
                     navigator.notification.alert('Debe entrar su correo', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
                if (!$('#subject').val()) {
                     navigator.notification.alert('Debe introducir un asunto', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
                if (!$('#message').val()) {
                     navigator.notification.alert('Debe introducir el texto del mensaje', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
		// load comment
		options = {
                        "item":{
                            "yourName":$("#yourName").val(),
                            "yourEmail":$("#yourEmail").val(),
                            "subject":$("#subject").val(),
                            "message":$("#message").val()
                        },
			"error":function(jqXHR, textStatus, errorThrown) {
				alert("osclasgap_page_comment - failed to load comment (" + osclasgap_page_comment_cid + ")");
			},
			"success":function(comment) {
				navigator.notification.alert('Se ha enviado su mensaje de contaco', // message
                                            alertDismissed, // callback
                                            'Confirmación', // title
                                            'OK' // buttonName
                            );
			}
		};
		osclasgap_services_contact_add.resource_call(options);
	}
	catch (error) {
		console.log("osclasgap_page_contact");
		console.log(error);
	}
});

    
    
