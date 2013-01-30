total_items = 0;
cant_items = 5;
$('#osclasgap_page_search').live('pagebeforeshow',function(){
	try {
		total_items = cant_items;
                pagebeforeshow += 1;
                service_select_categories("-search");
                service_select_countries("-search");
                
                if (osclasgap_user.uid == 0){
			$('#osclasgap_page_content_button_add').hide();
			$('#osclasgap_page_content_button_add_footer').hide();
                }
		else{
			$('#osclasgap_page_content_button_add').show();
			$('#osclasgap_page_content_button_add_footer').show();
                }
                
	}
	catch (error) {
		console.log("osclasgap_page_dashboard");
		console.log(error);
	}
});
$('#countryId-search').live("change",function(){
	try {
                $("#regionId-search").val('-1').change();             
                $("#cityId-search").val('-1').change();             
                service_select_regions("-search");
	}
	catch (error) {
		console.log("osclasgap_page_content");
		console.log(error);
	}
});
$('#regionId-search').live("change",function(){
	try {
                $("#cityId-search").val('-1').change();             
		service_select_cities("-search");
	}
	catch (error) {
		console.log("osclasgap_page_content");
		console.log(error);
	}
});
$('#osclasgap_page_search_submit').live('click',function(){
	
        catIdContent = $('#catId-search').val();
        countryIdContent = $('#countryId-search').val();
        regionIdContent = $('#regionId-search').val();
        cityIdContent = $('#cityId-search').val();
        textContent = $('#text-search').val();
        precioDesde = $('#precio-desde').val();
        precioHasta = $('#precio-hasta').val();       
        conImagenes = ($('#images').attr('checked') == undefined ? false : true);
        get_search_items();
               
});


function get_search_items(){
    try {
		osclasgap_page_node_edit_nid = null; 
                
                views_options = {
                        "path":"index.php?page=ajax&action=runhook&hook=search&cant_items="+total_items+"&id_cat="+catIdContent+
                               '&id_country='+countryIdContent+'&id_region='+regionIdContent+'&id_city='+cityIdContent+'&text='+textContent+
                               '&price_d='+precioDesde+'&price_h='+precioHasta+'&images='+conImagenes,
			"error":function(jqXHR, textStatus, errorThrown) {
				if (errorThrown) {
					alert(errorThrown);
				}
				else {
					alert(textStatus);
				}
				// Refresh the list.
				$("#osclasgap_page_content_list").listview("destroy").listview();
			},
			"success":function(content) {
                                $("#osclasgap_page_content_list").html("");
                            
				if ($(content).length > 0) {
					$.each(content,function(index,obj){
                                            
                                               image = osclasgap_settings.site_path+ '/oc-content/themes/'+osclasgap_settings.theme+'/images/no_photo.gif';
                                               if(obj.id_resource != null)
                                                   image = osclasgap_settings.site_path + '/' + obj.path_resource + obj.id_resource + '_preview.' + obj.extension_resource; 
                                               
                                                html = "<a href='node.html' id='" + obj.pk_i_id + "' style='min-height:38px !important;padding-bottom:5px !important;'><img src="+image
                                                            +" class='ui-li-thumb' style='height:60px;'>" 
                                                            + "<div>"+obj.s_title+"</div>" 
                                                            + "<div style='font-size:10px; word-wrap:break-word;'>"
                                                            + "<div class='price-content'>"
                                                            + obj.i_price/1000000 +" "+ obj.currency
                                                            + "</div>"
                                                            + "<div>"
                                                            + obj.s_categoria 
                                                            + "</div>"
                                                            + "<div>"
                                                            + obj.s_city + (obj.s_city=='' ? "&nbsp;": "-") 
                                                            + obj.s_region + (obj.s_region=='' ? "&nbsp;": "-") 
                                                            + obj.s_country 
                                                            + "</div>"
                                                            + "</div>"
                                                            + "</a>";
                                                                                                        
						$("#osclasgap_page_content_list").append($("<li></li>",{"html":html}));
                                          
					});
                                        
                                        if($(content).length % 5 != 0)
                                            $('#more_items_search').hide();
                                        else
                                            $('#more_items_search').show();
				}
				else {
					html = "Disculpe, no hay anuncios publicados.";
					$("#osclasgap_page_content_list").append($("<li></li>",{"html":html}));
                                        $('#more_items').hide();
				}
				// Refresh the list.
				$("#osclasgap_page_content_list").listview("destroy").listview();
                          
                               $('html, body').animate({
                                        scrollTop : $("#osclasgap_page_content_list").offset().top
                                }, 2000);
                                
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

$('#more_items_search').live('click',function(){
      $('#more_items_search').hide();
      total_items += cant_items; 
      get_search_items();	
      
      $('html, body').animate({
		scrollTop : $("#osclasgap_page_content_list li:last-child").offset().top
	}, 2000);   
        
});
$('#up-button-search').live('click',function(){
      $('html, body').animate({
		scrollTop : $("#osclasgap_page_search").offset().top
	}, 2000);   
});
$('#down-button-search').live('click',function(){
      $('html, body').animate({
		scrollTop : $("#bar-button-search").offset().top
	}, 2000);   
});
$('.add_item').live('click',function(){
     pagebeforeshow = 0;  
});
