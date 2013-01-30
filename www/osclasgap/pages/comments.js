var osclasgap_page_comments_nid; 

$('#osclasgap_page_comments').live('pageshow',function(){
	try {
		
		// Clear the list.
		$("#anuncio-comments-header").html(osclasgap_page_node_title);
		$("#osclasgap_page_comments_list").html("");
		
		// Clear any previous comment edit id.
		osclasgap_page_comment_edit_cid = null;
		
		// Load node.
		nid = osclasgap_page_comments_nid;
		
                comment_options = {
                    "nid":nid,
                    "error":function(jqXHR, textStatus, errorThrown) {
                    },
                    "success":function(results) {
                          
                            // If there are any comments, add each to the container, otherwise show an empty message.
                            $.each(results,function(index,obj){

                                    // Build comment html.
                                    html = osclasgap_services_comment_render(obj);
 
                                    // Add comment html to comment container.
                                    $("#osclasgap_page_comments_list").append(html);
                                    $(".osclasgap_comment_del").each(function(){
                                        $(this).button();
                                    });                                     
                            });
                            if (osclasgap_user.uid != "0") {	
                                    $('#osclasgap_page_comments_button_comment_add').show();
                            }
                    }
            }
            osclasgap_services_comment_node_comments.resource_call(comment_options);
                
	}
	catch (error) {
		console.log("osclasgap_page_comments");
		console.log(error);
	}
});

// When a comment list item is clicked...
$('.osclasgap_comment_del').live("click",function(){
	
        try {
		
                	options = {
                                "cid":$(this).attr('cid'),
				"error":function(jqXHR, textStatus, errorThrown) {
					alert(errorThrown);
				},
				"success":function(comment_del_result) {
                                        $("#comment-"+comment_del_result).hide();
				}
			};
			osclasgap_services_comment_delete.resource_call(options);
		
	}
	catch (error) {
		console.log("osclasgap_page_comment_edit_submit");
		console.log(error);
	}
	
	return false;
});