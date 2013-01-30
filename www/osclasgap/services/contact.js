// global variables used to hold the latest system resource call results

var osclasgap_services_contact_add  = {
    
	"resource_path":"index.php?page=ajax&action=runhook&hook=contact",
	"resource_type":"post",
	"resource_call":function (caller_options) {
		try {
			       
                              
			// Build service call data string.
			// Build options for service call.
			options = {
				"resource_path":this.resource_path,
				"type":this.resource_type,
				"data":caller_options.item,
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
			
			// Make the service call to the node create resource.
			osclasgap_services.resource_call(options);
		}
		catch (error) {
			console.log("osclasgap_services_node_create");
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
