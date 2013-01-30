anounimous_new_item = false;
catIdContent = -1;
countryIdContent = -1;
regionIdContent = -1;
cityIdContent = -1;
textContent = "";
precioDesde = "";
precioHasta = "";
conImagenes = false;
pagebeforeshow = 0;
$('#osclasgap_page_dashboard').live('pagebeforeshow',function(){
	try {
		
               
                document.getElementById('logo').src = osclasgap_settings.site_path
                        + '/oc-content/themes/'+osclasgap_settings.theme+'/images/logo.jpg';
		// Display site name.
		site_name = osclasgap_site_settings.variable.site_name;
		
		get_premium();
                
		$('#osclasgap_page_dashboard_navbar_anonymous').hide();
                $('#osclasgap_page_dashboard_navbar_authenticated').hide();
                
                text_inicio = "Bienvenido a "+site_name+".<br>";
                text_inicio +=osclasgap_site_settings.variable.site_desc+".<br>";
                text_inicio += " En estos momentos contamos con <strong>"+osclasgap_site_settings.variable.site_total_items+"</strong> anuncios.";
                text_inicio += " Para estar al día en las últimas publicaciones entre a la sección:";                
		$("#osclasgap_home_content").html(text_inicio);
                
                text_contact = " Su opinión es muy importante para mejoras del sistema, por lo que agradecemos su sugerencia:";                
		$("#osclasgap_home_contact").html(text_contact);
                
		if (osclasgap_user.uid == 0) { // user is not logged in...
			$('#osclasgap_page_dashboard_navbar_anonymous').show();
			$('#osclasgap_page_dashboard_header_user h2').hide();
			
			// determine what to do with the user registration button based on the site settings
			switch (osclasgap_site_settings.variable.user_register) {
				case 0: // Administrators only
				case "0":
					$('#osclasgap_button_user_register').hide();
					break;
				case 1: // Visitors
				case "1":
					break;
				case 2: // Visitors, but administrator approval is required
				case "2":
					break;
			}
                }
                else { // user is logged in...
                        $('#osclasgap_page_dashboard_navbar_authenticated').show();
                        $('#osclasgap_page_dashboard_header_user h2').html("Hola, " + osclasgap_user.name);
                }
		
	}
	catch (error) {
		console.log("osclasgap_page_dashboard");
		console.log(error);
	}
});

$('#osclasgap_button_user_logout').live("click",function(){
    
	try {
		// Build the service call options.
		options = {
			"error":function (jqXHR, textStatus, errorThrown) {
				if (errorThrown) {
					alert(errorThrown);
				}
				else {
					alert(textStatus);
				}
			},
			"success":function(){
                                // TODO - changing to the dashboard here has strange behavior,
				// it would be best to go to the dashboard instead.
				$.mobile.changePage("user_login.html", "slideup");
				//$.mobile.changePage("dashboard.html",{reloadPage:true},{allowSamePageTranstion:true},{transition:'none'});
			}
		};
		// Make the service call.
		osclasgap_services_osclasgap_user_logout.resource_call(options);
	}
	catch (error) {
		console.log("osclasgap_button_user_logout - " + error);	
	}
	return false;
});

$('#osclasgap_button_anounimous_new_item').live("click",function(){
    anounimous_new_item = true;
});
$('#osclasgap_button_user_login').live("click",function(){
    anounimous_new_item = false;
});
$('#osclasgap_button_content').live("click",function(){
    catIdContent = -1;
    countryIdContent = -1;
    regionIdContent = -1;
    cityIdContent = -1;
    textContent = "";
    precioDesde = "";
    precioHasta = "";
    conImagenes = false;
    pagebeforeshow = 0;
});
$('#osclasgap_button_search').live("click",function(){
    pagebeforeshow = 0;
});

function get_premium(){
    try {
		
                views_options = {
                        "path":"index.php?page=ajax&action=runhook&hook=search&cant_items="+3+"&id_cat="+"-1"+
                               '&id_country='+"-1"+"&id_region="+"-1"+'&id_city='+"-1"+"&text="+""+
                               "&price_d="+""+'&price_h='+""+"&images="+"false"+"&premium=1",
			"error":function(jqXHR, textStatus, errorThrown) {
				if (errorThrown) {
					alert(errorThrown);
				}
				else {
					alert(textStatus);
				}
				// Refresh the list.
				$("#osclasgap_page_premium_list").listview("destroy").listview();
			},
			"success":function(content) {
                                $("#osclasgap_page_premium_list").html("");
                            
				if ($(content).length > 0) {
					$.each(content,function(index,obj){
                                            
                                               image = osclasgap_settings.site_path+ '/oc-content/themes/'+osclasgap_settings.theme+'/images/no_photo.gif';
                                               if(obj.id_resource != null)
                                                   image = osclasgap_settings.site_path + '/' + obj.path_resource + obj.id_resource + '_preview.' + obj.extension_resource; 
                                               
                                                html = "<a href='node.html' id='" + obj.pk_i_id + "' style='min-height:45px !important;padding-bottom:5px !important;'><img src="+image
                                                            +" class='ui-li-thumb' style='height:60px; with:30%'>" 
                                                            + "<div class='price-premiun'>"
                                                            + obj.i_price/1000000 +" "+ obj.currency 
                                                            + "</div>"                                                           
                                                            + "<div class='category-premiun'>"+obj.s_categoria+"</div>"
                                                            + "</a>";     
                                                        
						$("#osclasgap_page_premium_list").append($("<li></li>",{"html":html}));                                          
					});
                                        
                                        if($(content).length < 5)
                                            $('#more_items').hide();
                                        else
                                            $('#more_items').show();
				}
				// Refresh the list.
				$("#osclasgap_page_premium_list").listview("destroy").listview();
                          
                                
			}
		};
		// Make the service call to retrieve content.
		osclasgap_views_datasource_retrieve.resource_call(views_options);
                
                
	}
	catch (error) {
		console.log("osclasgap_page_content");
		console.log(error);
	}
}

$('#osclasgap_page_premium_list a').live("click",function(){
	// Save a reference to the node id.
	osclasgap_page_node_nid = $(this).attr('id');
});