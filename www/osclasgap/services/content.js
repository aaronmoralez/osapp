/**
 * Makes a call to DrupalGap's Content Types List Resource.
 *
 * @return
 *  A JSON object containing a list of {node_types} table data.
 *
 */
function osclasgap_services_meta_fields_list (cat) {
	// If we have a copy of the content types list use it, otherwise make the
	// service call.
        resource_path = "index.php?page=ajax&action=runhook&hook=meta_fields_input&catId="+cat;
	osclasgap_content_types_list = osclasgap_services.resource_call({"resource_path":resource_path});
       
	return osclasgap_content_types_list;
}

