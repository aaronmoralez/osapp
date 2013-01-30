$('#osclasgap_page_configuration').live('pageshow',function(){
	try {
		// show the site url path
		$('#osclasgap_page_configuration fieldset p').html(osclasgap_settings.site_path);
	}
	catch (error) {
		console.log("osclasgap_page_configuration");
		console.log(error);
	}
});

$('#osclasgap_page_configuration_button_reset').live('click',function(){
	try {
		if (confirm("Are you sure you want to reset DrupalGap? All of your changes are safe online at " + osclasgap_settings.site_path.replace("http://","") + ".")) {
			window.localStorage.clear(); // clear all local storage
			$.mobile.changePage("welcome.html", "slideup");
		}
	}
	catch (error) {
		console.log("osclasgap_page_configuration_button_reset");
		console.log(error);
	}
	return false;
});
