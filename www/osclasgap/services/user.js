// Define global variables to hold the latest resource call result json.
var osclasgap_services_user_access_result;
var osclasgap_services_user_roles_and_permissions_result;

// TODO - We need a user retrieve service resource implementation here.


var osclasgap_services_user_login = {
	
	"resource_path":"user/login.json",
	"resource_type":"post",
	
	/**
	 * Makes a call to Drupal's User Login Service Resource. 
	 *
	 * @param options.name
	 *   A string containing the osclas user name.
	 * @param options.pass
	 *   A string containing the osclas user password.
	 */
	"resource_call":function (caller_options) {
		try {
			if (!caller_options.name || !caller_options.pass) { return false; }
			
			// Build service call data string.
			data = 'username=' + encodeURIComponent(caller_options.name);
			data += '&password=' + encodeURIComponent(caller_options.pass);
			
			// Build service call options.
			options = {
				"resource_path":this.resource_path,
				"data":data,
				"async":true,
				"success":this.success,
				"error":this.error
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
			console.log("osclasgap_services_user_login");
			console.log(error);
		}
	},
	
	"error":function (jqXHR, textStatus, errorThrown) {
		if (errorThrown) {
			alert(errorThrown);
		}
		else {
			alert(textStatus);
		}
	},
	
	"success":function (data) {
	}
};

var osclasgap_services_user_logout = {
	
	"resource_path":"user/logout.json",
	"resource_type":"post",
	
	/**
	 * Makes a synchronous call to Drupal's User Logout Service Resource. 
	 *   
	 * @return
	 *   TRUE if the logout was successful, false otherwise.
	 */
	"resource_call":function (caller_options) {
		try {
			
			// Build the service call options.
			//, "save_to_local_storage":"0"
			options = {
				"resource_path":this.resource_path,
				"async":true,
				"success":this.success,
				"error":this.error
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
			console.log("osclasgap_services_user_logout - " + error);
			alert("osclasgap_services_user_logout - " + error);	
		}
	},
	
	"error":function (jqXHR, textStatus, errorThrown) {
		if (errorThrown) {
			alert(errorThrown);
		}
		else {
			alert(textStatus);
		}
	},
	
	"success":function (data) {
	}
	
};

var osclasgap_services_user_update = {
		
	"resource_path":function(options) {
		// TODO - Need uid validation here.
		return "index.php?page=ajax&action=runhook&hook=edit_user";
	},
	"resource_type":"post",
	
	/**
	 * Makes a synchronous call to Drupal's User Logout Service Resource. 
	 *   
	 * @return
	 *   TRUE if the logout was successful, false otherwise.
	 */
	"resource_call":function (caller_options) {
		try {
		
			osclasgap_services_user_update_result = null; // clear previous call
			
			if (!caller_options.user) {
				// TODO - do a better job validating incoming user...
				console.log("osclasgap_services_user_update - user empty");
				return false;
			}
			
		        var user = caller_options.user;
			data = "";
			data = 's_name=' + encodeURIComponent(user.name);
			data += '&s_email=' + encodeURIComponent(user.mail);
			data += '&s_password=' + encodeURIComponent(user.pass1);
			data += '&s_password2=' + encodeURIComponent(user.pass2);
			data += '&uid=' + encodeURIComponent(osclasgap_user.uid);
                        
			if (user.current_pass)
				data += "&current_pass=" + encodeURIComponent(user.current_pass);
			
			options = {
				"resource_path":this.resource_path(caller_options.user),
				"data":data,
				"type":this.resource_type,
				"async":true,
				"error":this.error,
				"success":this.success
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
			console.log("osclasgap_services_user_update");
			console.log(error);
		}
	},
	
	"error":function (jqXHR, textStatus, errorThrown) {
		if (errorThrown) {
			alert(errorThrown);
		}
		else {
			alert(textStatus);
		}
	},
	
	"success":function (data) {
	}
};



var osclasgap_services_user_register = {
	"resource_path":"user/register.json",
	"resource_type":"post",
	"resource_call":function(caller_options) {
		try {
		
			// validate input
			if (!caller_options.name) {
				alert("osclasgap_services_user_register - name empty");
				return false;
			}
			if (!caller_options.mail) {
				alert("osclasgap_services_user_register - mail empty");
				return false;
			}
			if (!caller_options.pass) {
				alert("osclasgap_services_user_register - pass empty");
				return false;
			}
			
			// Build the options for the service call.
			data = 'name=' + encodeURIComponent(caller_options.name);
			data += '&mail=' + encodeURIComponent(caller_options.mail);
			data += '&pass=' + encodeURIComponent(caller_options.pass);
			//, "save_to_local_storage":"0"
			options = {
				"resource_path":this.resource_path,
				"data":data,
				"async":true,
				"success":this.success,
				"error":this.error
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
			console.log("osclasgap_services_user_register");
			console.log(error);	
		}
	},
	
	"error":function (jqXHR, textStatus, errorThrown) {
		if (errorThrown) {
			alert(errorThrown);
		}
		else {
			alert(textStatus);
		}
	},
	
	"success":function (data) {
	}
};

function osclasgap_services_user_access(options) {
	try {
		// Clear the previous call.
		osclasgap_services_user_access_result = false;
		
		// Validate the input.
		if (!options.permission) {
			alert("osclasgap_services_user_access - no permission provided");
			return false;
		}
		
		// If we have the user's roles and permissions already stored from
		// a call to osclasgap system connect, iterate over the collection
		// to see if the user has access to the permission.
		if (osclasgap_user_roles_and_permissions) {
			$.each(osclasgap_user_roles_and_permissions,function(index,object){
				if (object.permission == options.permission) {
					osclasgap_services_user_access_result = true;
					return;
				}
			});
		}
		else {
			// We did not have the user's roles and permissions stored, make
			// a call to the osclasgap user access resource to see if the user
			// has the requested permission.
			if (valid) {
				resource_path = "osclasgap_user/access.json";
				data = 'permission=' + encodeURIComponent(options.permission);
				osclasgap_services_user_access_result = osclasgap_services.resource_call({"resource_path":resource_path,"data":data});
			}
		}
	}
	catch (error) {
		console.log("osclasgap_services_user_access");
		console.log(error);	
	}
	return osclasgap_services_user_access_result;
}

function osclasgap_services_user_roles_and_permissions(uid) {
	try {
		
		// Clear the previous call.
		osclasgap_services_user_roles_and_permissions_result = null;
		
		// Validate the user id.
		valid = true;
		if (!uid) {
			valid = false;
			alert("osclasgap_services_user_roles_and_permissions - no user id provided");
		}
		
		if (valid) {
			// Make the service call.
			resource_path = "osclasgap_user/roles_and_permissions.json";
			data = 'uid=' + encodeURIComponent(uid);
			options = {"resource_path":resource_path,"data":data};
			osclasgap_services_user_roles_and_permissions_result = osclasgap_services.resource_call(options);
		}
	}
	catch (error) {
		console.log("osclasgap_services_user_roles_and_permissions");
		console.log(error);	
	}
	return osclasgap_services_user_roles_and_permissions_result;
}