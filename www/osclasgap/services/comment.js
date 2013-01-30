// global variables used to hold the latest system resource call results
var osclasgap_services_comment_node_comments_result;

var osclasgap_services_comment_create  = {
	"resource_path":"index.php?page=ajax&action=runhook&hook=add_comment",
	"resource_type":"post",
	
	"resource_call":function(caller_options) {
		try {
			
			// Extract comment from caller options.
			comment = caller_options.data;
			
			// Validate incoming parameters.
			valid = true;
			if (!comment.id) {
				alert("No se ha especificado el anuncio");
				valid = false;
			}
			if (!comment.body) {
				alert("No ha especificado el comentariio");
				valid = false;
			}
			
			// If everything is valid, make the service resource call.
			if (valid) {				
                                
				// Make the call.
				options = {
					"resource_path":this.resource_path,
					"type":this.resource_type,
					"async":true,
					"data":comment,
					"id":comment.id,
					"error":caller_options.error,
					"success":caller_options.success
				};
							
				osclasgap_services.resource_call(options);
			}
		}
		catch (error) {
			console.log("osclasgap_services_comment_create");
			console.log(error);
		}
	}
};

var osclasgap_services_comment_retrieve = {
	
	"resource_path":function(options) {
		// TODO - Need cid validation here.
		return "comment/" + encodeURIComponent(options.cid) + ".json";
	},
	"resource_type":"get",
	
	/** 
	 * Retrieves a Drupal comment.
	 * 
	 * options.cid
	 * 		the comment id you want to load
	 */
	"resource_call":function(caller_options) {
		try {
			
			// Validate incoming parameters.
			valid = true;
			if (!caller_options.cid) {
				alert("osclasgap_services_comment_retrieve - no comment id provided");
				valid = false;
			}
			
			// If everything is valid, retrieve the comment.
			if (valid) {
				
				// Build the options for the service call.
				options = {
					"resource_path":this.resource_path({"cid":caller_options.cid}),
					"type":this.resource_type,
					"async":true,
					"error":function(jqXHR, textStatus, errorThrown) {
					},
					"success":function(data) {
						
					}
				};
				
				// Attach error/success hooks if provided.
				if (caller_options.error) {
					options.hook_error = caller_options.error;
				}
				if (caller_options.success) {
					options.hook_success = caller_options.success;
				}
				
				// Make the service call.
				osclasgap_services.resource_call(options);
			}
		}
		catch (error) {
			console.log("osclasgap_services_comment_retrieve");
			console.log(error);
		}
	},
	
	/**
	 * Removes a comment from local storage.
	 * 
	 * options.cid
	 * 		The comment id of the comment to remove.
	 */
	"local_storage_remove":function(options) {
		type = this.resource_type;
		resource_path = this.resource_path(options);
		key = osclasgap_services_default_local_storage_key(type,resource_path);
		window.localStorage.removeItem(key);
		console.log("Removed from local storage (" + key + ")");
	}
};

var osclasgap_services_comment_update = {
	
	"resource_path":function(options) {
		// TODO - Need cid validation here.
		return "index.php?page=ajax&action=runhook&hook=edit_comment&id=" + encodeURIComponent(options.cid);
	},
	"resource_type":"put",
	
	"resource_call":function(caller_options) {
		try {
			// Extract the comment from the caller options.
			
			// Build the options for the service call.
			options = {
				"resource_path":this.resource_path({"cid":comment.cid}),
				"type":this.resource_type,
				"data":caller_options.comment,
				"cid":comment.cid,
				"nid":comment.nid,
				"async":true,
				"error":function(jqXHR, textStatus, errorThrown) {
				},
				"success":function(data) {
					// Clear the comment edit cid.
					osclasgap_page_comment_edit_cid = null;
				}
			};
			
			// Attach error/success hooks if provided.
			if (caller_options.error) {
				options.hook_error = caller_options.error;
			}
			if (caller_options.success) {
				options.hook_success = caller_options.success;
			}
			
			// Make the service call.
			osclasgap_services.resource_call(options);
		}
		catch (error) {
			console.log("osclasgap_services_comment_update");
			console.log(error);
		}
	}
};

var osclasgap_services_comment_delete = {
	
	"resource_path":function(options) {
		// TODO - Need cid validation here.
		return "index.php?page=ajax&action=runhook&hook=del_comment&cid=" + encodeURIComponent(options.cid);
	},
	"resource_type":"delete",
	"resource_call":function(caller_options) {
		try {
                   
			// Build the options for the service call.
			options = {
				"resource_path":this.resource_path({"cid":caller_options.cid}),
				"type":this.resource_type,
				"cid":caller_options.cid,
				"async":true,
				"error":function(jqXHR, textStatus, errorThrown) {
				},
				"success":function(data) {
                                        // Clear the comment edit cid.
					osclasgap_page_comment_edit_cid = null;
				}
			};
			
			// Attach error/success hooks if provided.
			if (caller_options.error) {
				options.hook_error = caller_options.error;
			}
			if (caller_options.success) {
				options.hook_success = caller_options.success;
			}
			
			// Make the service call.
			osclasgap_services.resource_call(options);
		}
		catch (error) {
			console.log("osclasgap_services_comment_update");
			console.log(error);
		}
	}
};

var osclasgap_services_comment_node_comments = {
	"resource_path":function(options){
		return "index.php?page=ajax&action=runhook&hook=get_comments&id=" + encodeURIComponent(options.nid);
	},
	"resource_call":function(caller_options) {
		try {
			
			// Validate incoming parameters.
			valid = true;
			if (!caller_options) {
				//alert("osclasgap_services_comment_node_comments - no node id provided");
				valid = false;
			}
			
			// If everything is valid, make the service resource call.
			if (valid) {
				
				views_options = {
					"path":this.resource_path({"nid":caller_options.nid})
				};
				
				// Override error/success hooks if provided.
				// (this is a views datasource special case)
				if (caller_options.error) {
					views_options.error = caller_options.error;
				}
				if (caller_options.success) {
					views_options.success = caller_options.success;
				}
				
				osclasgap_views_datasource_retrieve.resource_call(views_options);
			}
		}
		catch (error) {
			console.log("osclasgap_services_comment_node_comments");
			console.log(error);
		}
	}
};

function osclasgap_services_comment_render (comment) {
	try {
		
		
		show_edit_link = false;
		
		if (osclasgap_user.uid == comment.fk_i_user_id || osclasgap_user.uid == 1) {	
                    show_edit_link = true;
                }
                
		// Build comment html.
		html = "<div id='comment-"+comment.pk_i_id+"'><div><strong>" + comment.s_title + "</strong></div>";
		html += "<div><p>" + comment.s_author_name + "</p></div>";
		html += "<div><p>" + comment.dt_pub_date + "</p></div>";
		html += "<div><p>" + comment.s_body + "</p></div>";
		
		if (show_edit_link) {
			html += "<div><a href='#' cid='" + comment.pk_i_id +  "' data-role='button' class='osclasgap_comment_del' data-icon='delete' class='ui-btn-left' data-theme='c' style='width:40%;'>Eliminar</a></div>";
                        
		}
		html += "<div><hr /></div></div>";
		return html;
	}
	catch (error) {
		console.log("osclasgap_services_comment_render");
		console.log(error);
	}
}

