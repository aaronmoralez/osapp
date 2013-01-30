$('#osclasgap_page_welcome').live('pageshow',function(){
  try {
  }
  catch (error) {
	  console.log("osclasgap_page_welcome");
	  console.log(error);
  }
});

$('#osclasgap_page_welcome_button_demo').live('click',function(){
	try {
	  	// Update settings with new site url path.
	  	settings = osclasgap_settings_load();
	  	settings.site_path = "http://www.osclasgap.org";
	  	//settings.site_path = "http://10.0.2.2/osclas-7.12";
	  	//settings.site_path = "http://dev.osclasgap.com";
	  	osclasgap_settings.demo = true;
	  	osclasgap_settings_save(settings);
	  	
	  	// Perform system connect to see if DrupalGap is setup properly on Drupal site.
	  	options = {
	  		"error":function (jqXHR, textStatus, errorThrown) {
	  			// clear the site path and re-save the settings to start over
		  		settings.site_path = "";
			  	osclasgap_settings_save(settings);
			  	alert(errorThrown);
  			},
	  		"success":function (data) {
	  			alert("Connected to DrupalGap.org, the demo is ready, enjoy!");
	  			
	  			// Make a call to the DrupalGap bundled system connect resource.
		  		options = {
		  			"load_from_local_storage":"0",
		  			"error":function (jqXHR, textStatus, errorThrown) {
			  			if (errorThrown) {
					  		alert(errorThrown);
					  	}
					  	else {
					  		alert(textStatus);
					  	}
		  			},
		  			"success":function () {
		  				// Go to the dashboard.
		  				$.mobile.changePage("dashboard.html", "slideup");
		  			}
		  		};
		  		osclasgap_services_resource_system_connect.resource_call(options);
	  		}
	  	};
	  	osclasgap_services_system_connect.resource_call(options);
	}
	catch (error) {
		console.log("osclasgap_page_welcome_button_demo");
		console.log(error);
	}
	return false;
});
