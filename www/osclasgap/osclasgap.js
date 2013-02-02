var osclasgap_settings;
var osclasgap_user;
var osclasgap_site_settings;
var osclasgap_user_roles_and_permissions;
var osclasgap_content_types_list;
var osclasgap_content_types_user_permissions;

$(document).ready(function() {
	
	// Clear all local storage, used for testing.
	window.localStorage.clear();
	
	osclasgap_settings_load();
	
	if (!osclasgap_settings.site_path) {
		// The app doesn't have a default site path, send user to welcome page.
		$.mobile.changePage("osclasgap/pages/welcome.html", { transition: "fade"});
	}
	else {
		
		// App has a default site path.
		
		// Make a call to the DrupalGap bundled system connect resource.
		// TODO - do something if the system connect fails.
		// TODO - if app is online, we should probably force a reload on this,
		// otherwise fall back to the local storage session.
		options = {
			"load_from_local_storage":"0",
			"error":function(jqXHR, textStatus, errorThrown){
                            $.mobile.changePage("osclasgap/pages/error_conex.html", { transition: "fade"});
//				if (errorThrown) {
//					alert(errorThrown);
//				}
//				else {
//					alert(textStatus);
//				}
			},
			"success":function(){
				// Go to the dashboard.
				$.mobile.changePage("osclasgap/pages/dashboard.html", { transition: "fade"});
			}
		};
                //$.mobile.changePage("osclasgap/pages/dashboard.html", { transition: "fade"});
		osclasgap_services_resource_system_connect.resource_call(options);
	}
	
});

function osclasgap_settings_load () {
	osclasgap_settings = window.localStorage.getItem("osclasgap_settings");
	if (!osclasgap_settings) { // no settings found in local storage, setup defaults...
		osclasgap_settings = {};
		osclasgap_settings.site_path = "http://ossdemo.tk"; // examples: http://my-osclas-site.com, http://10.0.2.2/my-localhost-osclas
		osclasgap_settings.base_path = "/?q=";
		osclasgap_settings.services_endpoint_default = "osclasgap";
		osclasgap_settings.demo = false;
		osclasgap_settings.locale = 'es_ES';
		osclasgap_settings.theme = 'realestate';
		osclasgap_settings_save(osclasgap_settings);
	}
	else {
		osclasgap_settings = JSON.parse(osclasgap_settings);
	}
	return osclasgap_settings;
}

function osclasgap_settings_save (settings) {
	window.localStorage.setItem("osclasgap_settings",JSON.stringify(settings));
	osclasgap_settings = settings;
	return osclasgap_settings;
}
