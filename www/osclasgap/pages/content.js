categories_list = '';
total_items = 0;
cant_items = 5;
$('#osclasgap_page_content').live('pageshow',function(){
        total_items = cant_items;
        pagebeforeshow +=1;
        get_last_items();
        
        service_select_categories("-content");
        service_select_countries("-content");
        
        $('#catId-content').val(catIdContent);
        $("#catId-content").selectmenu('refresh', true);
     
        $('#countryId-content').val(countryIdContent);
        $("#countryId-content").selectmenu('refresh', true);
	
});

// When a content list item is clicked...
$('#osclasgap_page_content_list a').live("click",function(){
	// Save a reference to the node id.
	osclasgap_page_node_nid = $(this).attr('id');
});

$('#catId-content').live("change",function(){
      catIdContent = $("#catId-content").val();
      get_last_items();
});

$('#countryId-content').live('change',function(){
      countryIdContent = $("#countryId-content").val();
      get_last_items();	
});

$('#all-items').live('click',function(){
      $('#catId-content').val(-1);
      $('#catId-content').selectmenu('refresh', true);
      catIdContent = -1;
      
      $('#countryId-content').val(-1);
      $('#countryId-content').selectmenu('refresh', true);
      catIdContent = -1;
      countryIdContent = -1;
      regionIdContent = -1;
      cityIdContent = -1;
      textContent = "";
      precioDesde = "";
      precioHasta = "";
      conImagenes = false;
      get_last_items();	
});

$('#more_items').live('click',function(){
      $('#more_items').hide();
      total_items += cant_items; 
      get_last_items();	
      
      $('html, body').animate({
		scrollTop : $("#osclasgap_page_content_list li:last-child").offset().top
	}, 2000);   
        
});
$('#up-button').live('click',function(){
      $('html, body').animate({
		scrollTop : $("#osclasgap_page_content").offset().top
	}, 2000);   
});
$('#down-button').live('click',function(){
      $('html, body').animate({
		scrollTop : $("#bar-button-option").offset().top
	}, 2000);   
});
$('#edit_search').live('click',function(){
     pagebeforeshow = 0; 
});

function get_last_items(){
    try {
		osclasgap_page_node_edit_nid = null; 
                
		               
		if (osclasgap_user.uid == 0){
			$('#osclasgap_page_content_button_add').hide();
			$('#osclasgap_page_content_button_add_footer').hide();
                }
		else{
			$('#osclasgap_page_content_button_add').show();
			$('#osclasgap_page_content_button_add_footer').show();
                }
               
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
                                            $('#more_items').hide();
                                        else
                                            $('#more_items').show();
				}
				else {
					html = "Disculpe, no hay anuncios publicados.";
					$("#osclasgap_page_content_list").append($("<li></li>",{"html":html}));
                                        $('#more_items').hide();
				}
				// Refresh the list.
				$("#osclasgap_page_content_list").listview("destroy").listview();
                          
                               // $("#filtro-values").html(catIdContent +"-"+ countryIdContent + "-"+ regionIdContent + "-"+ cityIdContent + "-"+ textContent);
                                
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