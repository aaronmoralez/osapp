var osclasgap_page_node;
var osclasgap_page_node_nid;
var osclasgap_page_node_title;
var url_image_show;
$('#osclasgap_page_node').live('pageshow',function(){
	try {
		
		// Clear any previous node edit id reference.
		osclasgap_page_node_edit_nid = null;
		
		// Clear any previous node comment nid reference.
		osclasgap_page_comment_edit_nid = null;
		
		// Build service call options to load the node.
		options = {
			"nid":osclasgap_page_node_nid,
			"error":function(jqXHR, textStatus, errorThrown) {
				alert(osclasgap_page_node.errorThrown);
				alert("osclasgap_page_node - failed to load node (" + osclasgap_page_node_nid + ")");
			},
			"success":osclasgap_page_node_success
		};
		
		// Load node via services call.
		osclasgap_services_node_retrieve.resource_call(options);
	}
	catch (error) {
		console.log("osclasgap_page_node");
		console.log(error);
	}
});

$('#osclasgap_page_node_button_edit').live("click",function(){
	// Set the node edit nid.
	osclasgap_page_node_edit_nid = osclasgap_page_node_nid;
        pagebeforeshow = 0;
        edit_load = false;
});

$('#osclasgap_page_node_button_comments').live("click",function(){
	// Set the comment nid.
	osclasgap_page_comments_nid = osclasgap_page_node_nid;
});


$('#osclasgap_page_node_button_del').live("click",function(){
	// Set the comment nid.
	try {
		// Build service call options to load the node.
		options = {
			"nid":osclasgap_page_node_nid,
			"error":function(jqXHR, textStatus, errorThrown) {
				alert(osclasgap_page_node.errorThrown);
				alert("osclasgap_page_node - failed to load node (" + osclasgap_page_node_nid + ")");
			},
			"success":function(node) {
		  			$.mobile.changePage("content.html");
		  		}
		};
		
		// Load node via services call.
		osclasgap_services_node_delete.resource_call(options);
	}
	catch (error) {
		console.log("osclasgap_page_node");
		console.log(error);
	}
        
});

function osclasgap_page_node_success(osclasgap_page_node) {
	// Fill in placeholders.
	
	// Node title.
	osclasgap_page_node_title = osclasgap_page_node.locale[osclasgap_settings.locale].s_title;
	// Node body.
	var body;
        body = osclasgap_page_node_title +'<br>';
        body += osclasgap_page_node.locale[osclasgap_settings.locale].s_description + '<br><br>';
        body +='Precio:&nbsp;'+ parseInt(osclasgap_page_node.i_price)/1000000 +'&nbsp;'+osclasgap_page_node.fk_c_currency_code +'<br><br>';
        body +='<strong>Ubicación</strong>&nbsp;<br>';
        body +='País:&nbsp;'+ osclasgap_page_node.s_country+'<br>';
        body +='Región:&nbsp;'+ osclasgap_page_node.s_region+'<br>';
        body +='Ciudad:&nbsp;'+ osclasgap_page_node.s_city+'<br>';
        body +='Area de la ciudad:&nbsp;'+ osclasgap_page_node.s_city_area+'<br>';
        body +='Dirección:&nbsp;'+ osclasgap_page_node.s_address+'<br><br>';
        
        body +='<strong>Datos específicos</strong>&nbsp;<br>';
        
        var meta="";
        $.each(osclasgap_page_node.meta,function(index,obj){
                  if(obj.s_name != 'undefined' && obj.s_value != 'undefined' && obj.s_value != ''){ 
                      if(obj.e_type == 'CHECKBOX'){
                        valor = (obj.s_value == 'on'? 'Si':'No');  
                        meta += obj.s_name + ':&nbsp;'+ valor + '<br>';
                      }
                    else
                        meta += obj.s_name + ':&nbsp;'+ obj.s_value + '<br>';
                  }
        });       
        body += meta+'<br>';
        
        
        var resources="";
        $.each(osclasgap_page_node.resources,function(index,obj){
                    resources += '<a href="image_show.html" data-rel="dialog" data-transition="flip" class="image-link">'
                        + '<img src="'
			+ osclasgap_settings.site_path
			+ '/oc-content/uploads/'+obj.pk_i_id+'_preview.'+obj.s_extension
			+ '" style="width: 100px;height: 70px";/></a>&nbsp;';
        });       
        body += resources;
        body += '<br>';
       
      
	$('#osclasgap_page_node .content').html(body);	
	
	if (osclasgap_user.uid == "0" || (osclasgap_user.uid != "1" && osclasgap_user.uid != osclasgap_page_node.fk_i_user_id)) {	
		$('#actions-owners-node').hide();
	}
	else {
            	$('#actions-owners-node').show();
                $('#osclasgap_page_node_comments').show();
	}
        
	if (osclasgap_user.uid != "0" && osclasgap_user.uid != "1" && osclasgap_user.uid != osclasgap_page_node.fk_i_user_id) {	
		$('#osclasgap_page_node_comments').show();
	}
			
	// If there are any comments, show the comment count on the view comments button.
	// Otherwise, hide the view comments button
        
	
        count = parseInt(osclasgap_page_node.comments);
        if (count > 0) {
                text = "Ver " + count + " Comentarios";
                if (count == 1) {text = "Ver " + count + " Comentario"}
                $('#osclasgap_page_node_button_comments span').html(text);
        }
        else {
                $('#osclasgap_page_node_button_comments').hide();
        }
	
}

$('#back-node').live('click',function(){
     pagebeforeshow = 0;  
});

$('.image-link img').live('click',function(){
     url_image_show = $(this).attr('src') 
});

$('#image-dialog').live('pageshow',function(){
	document.getElementById('content-image-dialog').src = url_image_show;
});


