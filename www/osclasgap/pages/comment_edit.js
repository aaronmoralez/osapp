//var osclasgap_page_comment_edit_content_type;
var osclasgap_page_comment_edit_cid; // other's set this cid so this page knows which comment to load (if any)
$('#osclasgap_page_comment_edit').live('pageshow',function(){
		               	
});

$('#osclasgap_page_comment_edit_submit').live('click',function(){
	try {
		
		// Grab input.
		var subject = $('#osclasgap_page_comment_edit_subject').val();
	  	var body = $('#osclasgap_page_comment_edit_body').val();
	  	
                function alertDismissed() {
                        // do something
                }
	  	// Validate input.
	  	
	  	// Check this comment's node content type comment settings.
	  	if (!subject) {
	  		
                    navigator.notification.alert('No ha introducido el título', // message
                                    alertDismissed, // callback
                                    'Validación', // title
                                    'OK' // buttonName
                    );
	  		return false;
	  	}
	  	
	  	if (!body) {
	  		 navigator.notification.alert('No ha introducido el comentario', // message
                                    alertDismissed, // callback
                                    'Validación', // title
                                    'OK' // buttonName
                    );
	  		return false; 
	  	}
	  
                // Create the comment.
                options = {
                        "data":{
                                "id":osclasgap_page_node_nid,
                                "body":body,
                                "title":subject,
                                "authorName":osclasgap_user.name,
                                "authorEmail":osclasgap_user.mail,
                                "userId":osclasgap_user.uid
                        },
                        "error":function(jqXHR, textStatus, errorThrown) {
                                alert(errorThrown);
                        },
                        "success":function(comment_create_result) {
                            navigator.notification.alert('Se ha enviado el comentario', // message
                                            alertDismissed, // callback
                                            'Confirmación', // title
                                            'OK' // buttonName
                            );
                            $.mobile.changePage("node.html");
                        }
                };
                osclasgap_services_comment_create.resource_call(options);
		
	}
	catch (error) {
		console.log("osclasgap_page_comment_edit_submit");
		console.log(error);
	}
	
	return false;
});

// cancel button clicked...
$('#osclasgap_page_comment_edit_cancel').live('click',function(){
	try {
		// Go back to the node.
		$.mobile.changePage("node.html");
	}
	catch (error) {
		console.log("osclasgap_page_comment_edit_cancel");
		console.log(error);
	}
	return false;
});

$('#osclasgap_page_comment_edit_delete').live('click',function(){
	try {
		options = {
			"cid":osclasgap_page_comment_edit_cid,
			"error":function(jqXHR, textStatus, errorThrown) {
				alert("osclasgap_page_comment_edit_delete - failed to comment (" + osclasgap_page_comment_edit_cid + ")");
			},
			"success":function(comment) {
				if (confirm("Are you sure you want to delete \"" + comment.subject + "\"? This cannot be undone.")) {
					comment_delete_options = {
						"cid":comment.cid,
						"error":function(jqXHR, textStatus, errorThrown) {
							alert(result.errorThrown);
						},
						"success":function(data) {
							$.mobile.changePage("node.html");
						}
					};
					osclasgap_services_comment_delete.resource_call(comment_delete_options);
				}
			}
		};
		osclasgap_services_comment_retrieve.resource_call(options);
	}
	catch (error) {
		console.log("osclasgap_page_comment_edit_delete");
		console.log(error);
	}
	return false;
});