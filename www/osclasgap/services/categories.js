/**
 * Makes a call to DrupalGap's Content Types List Resource.
 *
 * @return
 *  A JSON object containing a list of {node_types} table data.
 *
 */


function osclasgap_services_categories_list () {
	// If we have a copy of the content types list use it, otherwise make the
	// service call.
        
        resource_path = "index.php?page=ajax&action=runhook&hook=categories";
        osclasgap_categories_list = osclasgap_services.resource_call({"resource_path":resource_path});
        
	return osclasgap_categories_list;
}
function service_select_categories(sufix){
    if(pagebeforeshow == 1){
        categories_list = osclasgap_services_categories_list();    
        categories_options = "";
        $.each(categories_list,function(index,value){
                if (value.fk_c_locale_code == osclasgap_settings.locale) {
                    categories_options += '<option value="'+value.pk_i_id+'">'+value.s_name+'</option>';

                }
        });
    
        $("#catId"+sufix).append($(categories_options));
        $('#catId'+sufix).selectmenu('refresh', true);
    }
}

function osclasgap_services_countries_list () {
	
        resource_path = "index.php?page=ajax&action=runhook&hook=countries";
	osclasgap_countries_list = osclasgap_services.resource_call({"resource_path":resource_path});
       
	return osclasgap_countries_list;
}

function service_select_countries(sufix){
    if(pagebeforeshow == 1){
        countries_list = osclasgap_services_countries_list();    
        countries_options = '';
        $.each(countries_list,function(index,value){
                    countries_options += '<option value="'+value.pk_c_code+'">'+value.s_name+'</option>';
        });    
        $("#countryId"+sufix).append($(countries_options));
        $('#countryId'+sufix).selectmenu('refresh', true);
    }
}
function osclasgap_services_currencies_list () {
	
        resource_path = "index.php?page=ajax&action=runhook&hook=currencies";
	osclasgap_currencies_list = osclasgap_services.resource_call({"resource_path":resource_path});
       
	return osclasgap_currencies_list;
}

function service_select_currencies(sufix){
    if(pagebeforeshow == 1){
        currencies_list = osclasgap_services_currencies_list();    
        currencies_options = '';
        $.each(currencies_list,function(index,value){
                    currencies_options += '<option value="'+value.pk_c_code+'">'+value.s_name+'</option>';
        });    
        $("#currency"+sufix).append($(currencies_options));
        $('#currency'+sufix).selectmenu('refresh', true);
    }
}

function osclasgap_services_regions_list (sufix) {
	
        resource_path = "index.php?page=ajax&action=runhook&hook=regions&idCountry="+$("#countryId"+sufix).val();
	osclasgap_regions_list = osclasgap_services.resource_call({"resource_path":resource_path});
       
	return osclasgap_regions_list;
}

function service_select_regions(sufix){
    
    regions_list = osclasgap_services_regions_list(sufix);    
    regions_options = '<option value="-1">Seleccione</option>';
    $.each(regions_list,function(index,value){
                regions_options += '<option value="'+value.pk_i_id+'">'+value.s_name+'</option>';
    });
        
    $("#regionId"+sufix).html($(regions_options));
    $('#regionId'+sufix).selectmenu('refresh', true);
}
function osclasgap_services_cities_list (sufix) {
       resource_path = "index.php?page=ajax&action=runhook&hook=cities&idRegion="+$("#regionId"+sufix).val();
	osclasgap_cities_list = osclasgap_services.resource_call({"resource_path":resource_path});
       
	return osclasgap_cities_list;
}

function service_select_cities(sufix){
    
    cities_list = osclasgap_services_cities_list(sufix);    
    cities_options = '<option value="-1">Seleccione</option>';
    $.each(cities_list,function(index,value){
                cities_options += '<option value="'+value.pk_i_id+'">'+value.s_name+'</option>';
    });
    $("#cityId"+sufix).html($(cities_options));
    $('#cityId'+sufix).selectmenu('refresh', true);
}

