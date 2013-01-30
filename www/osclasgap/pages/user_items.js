//total_items = 0;
//cant_items = 2;
$('#osclasgap_page_user_items').live('pageshow',function(){
        total_items = cant_items;
       get_last_user_items();
});

$('#more_user_items').live('click',function(){
      $('#more_user_items').hide();
      total_items += cant_items; 
      get_last_user_items();	
      
      $('html, body').animate({
		scrollTop : $("#osclasgap_page_content_user_items_list li:last-child").offset().top
	}, 2000);
      $('#more_user_items').show();
});

$('#up-user-button').live('click',function(){
      $('html, body').animate({
		scrollTop : $("#osclasgap_page_user_items").offset().top
	}, 2000);   
});
$('#down-user-button').live('click',function(){
      $('html, body').animate({
		scrollTop : $("#more_user_items").offset().top
	}, 2000);   
});

function get_last_user_items(){
    try {
		osclasgap_page_node_edit_nid = null; 
                
                
		// Build content retrieve resource call options.
		views_options = {
                        "path":"index.php?page=ajax&action=runhook&hook=last_user_items&cant_items="+total_items+"&id_user="+osclasgap_user.uid,
			"error":function(jqXHR, textStatus, errorThrown) {
				if (errorThrown) {
					alert(errorThrown);
				}
				else {
					alert(textStatus);
				}
				// Refresh the list.
				$("#osclasgap_page_content_user_items_list").listview("destroy").listview();
			},
			"success":function(content) {
                                // Clear the list.
                                $("#osclasgap_page_content_user_items_list").html("");
                            
				if ($(content.items).length > 0) {
					$.each(content.items,function(index,obj){
                                            
                                               image = osclasgap_settings.site_path+ '/oc-content/themes/'+osclasgap_settings.theme+'/images/no_photo.gif';
                                               if(obj.item.thumbnail != '')
                                                   image = obj.item.thumbnail; 
                                               
                                                     html = "<a href='node.html' id='" + obj.item.nid + "' style='min-height:38px !important;padding-bottom:5px !important;'><img src="+image
                                                            +" class='ui-li-thumb' style='height:60px;'>" 
                                                            + "<div>"+obj.item.title+"</div>" 
                                                            + "<div style='font-size:10px; word-wrap:break-word;'>"
                                                            + "<div>"
                                                            + obj.item.category 
                                                            + "</div>"
                                                            + "<div>"
                                                            + obj.item.city + (obj.item.region=='' ? "&nbsp;": "-") 
                                                            + obj.item.region + (obj.item.region=='' ? "&nbsp;": "-") 
                                                            + obj.item.country 
                                                            + "</div>"
                                                            + "</div>"
                                                            + "</a>";
                                                                       
						$("#osclasgap_page_content_user_items_list").append($("<li></li>",{"html":html}));
                                          
					});
				}
				else {
					html = "Disculpe, no hay anuncios publicados.";
					$("#osclasgap_page_content_user_items_list").append($("<li></li>",{"html":html}));
				}
				
                                
				// Refresh the list.
				$("#osclasgap_page_content_user_items_list").listview("destroy").listview();
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