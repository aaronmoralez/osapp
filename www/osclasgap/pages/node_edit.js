var osclasgap_page_node_edit_nid;
var imagenes_cont = 1;
var files_selected = [];
country_default = true;
$('#osclasgap_page_node_edit').live('pageshow',function(){
	try {
		pagebeforeshow += 1;
                service_select_categories("");
                service_select_countries("");
                service_select_currencies("");
               
                if (!osclasgap_page_node_edit_nid) { // new node...
              
                $('#osclasgap_page_node_edit h1').html("Crear anuncio");
                $('#osclasgap_page_node_edit_delete').hide();

                document.getElementById('imgAdd1').src = osclasgap_settings.site_path
                        + '/oc-content/themes/'+osclasgap_settings.theme+'/images/no_photo.gif';
                files_selected = [];    
                        
		}else { // existing node...
			
			// Build the options to retrieve the node.
                        if(edit_load == false){
			options = {
				"nid":osclasgap_page_node_edit_nid,
				"error":function(jqXHR, textStatus, errorThrown) {
					alert("osclasgap_page_node_edit - failed to load node (" + osclasgap_page_node_edit_nid + ")");
				},
				"success":function(item) {
					// Grab the node's content type.
                                        $('#datos-especificos').show();
					meta_fields_list = osclasgap_services_meta_fields_list(item.fk_i_category_id);
                                        $("#meta_fields_content").append(meta_fields_list.jqXHR.responseText);
                                        $('select').selectmenu();
                                        
                                        
					// Fill in page place holders.
					$('#osclasgap_page_node_edit h1').html("Editar Anuncio");
					$('#title').val(item.locale[osclasgap_settings.locale].s_title);
					$('#description').val(item.locale[osclasgap_settings.locale].s_description);
					$('#price').val(parseInt(item.i_price)/1000000);
					$('#catId').val(item.fk_i_category_id);
                                        $("#catId").selectmenu('refresh', true);
					$('#currency').val(item.fk_c_currency_code);
                                        $("#currency").selectmenu('refresh', true);
                                        
//                                         if ($(item.resources).length > 0) {
//                                                $.each(item.resources,function(index,obj){
//                                                                                                        
//                                                });
//                                        }
                                        
                                        if ($(item.meta).length > 0) {
                                                $.each(item.meta,function(index,obj){
                                                         $("#meta-"+obj.pk_i_id).val(obj.s_value);
                                                         if(obj.e_type == 'DROPDOWN')
                                                           $("#meta-"+obj.pk_i_id).selectmenu('refresh', true);
                                                         
                                                         if(obj.e_type == 'RADIO'){                                                             
                                                           $("#meta-"+obj.pk_i_id+"-"+obj.s_value).attr('checked','checked');
                                                         }
                                                         if(obj.e_type == 'CHECKBOX'){
                                                            if(obj.s_value == 'on')
                                                                $("#meta-"+obj.pk_i_id).attr('checked','checked');                                                            
                                                         }                                                        
                                                });
                                        }

					$('#countryId').val(item.fk_c_country_code);
                                        $("#countryId").selectmenu('refresh', true);
                                        service_select_regions('');
					$('#regionId').val(item.fk_i_region_id);
                                        $("#regionId").selectmenu('refresh', true);
                                        service_select_cities('');
					$('#cityId').val(item.fk_i_city_id);
					$("#cityId").selectmenu('refresh', true);
                                        $('#cityArea').val(item.s_city_area);
                                        $('#address').val(item.s_address);
                                        
                                        $("input[type='radio']").checkboxradio();
                                        $("input[type='checkbox']").checkboxradio();
                                        
                                        edit_load = true;
				}
			}
			// Retrieve the node.
			osclasgap_services_node_retrieve.resource_call(options);
                    }
		}
           
	}
	catch (error) {
		console.log("osclasgap_page_node_edit");
		console.log(error);
	}
});

$('#catId').live('change',function(){
    $('#datos-especificos').show();
    meta_fields_list = osclasgap_services_meta_fields_list($("#catId").val());
    $("#meta_fields_content").html("");
    $("#meta_fields_content").append(meta_fields_list.jqXHR.responseText);
    $('select').selectmenu();
    $("input[type='radio']").checkboxradio();
    $("input[type='checkbox']").checkboxradio();
});

$('#osclasgap_page_node_edit_submit').live('click',function(){
	try {
		values = "";
                $("#osclasgap_page_content_add_list div").each(function(){
                   values += $(this).find(':input:first').attr('id') +':'+ $(this).find(':input:first').val()+'%,';
                })
                $("#datos-ubicacion-content div").each(function(){
                   values += $(this).find(':input:first').attr('id') +':'+ $(this).find(':input:first').val()+'%,';
                })
                var meta = new Array();
                $("#meta_fields_content div").each(function(){
                    //alert($(this).find(':input:first').attr('req'));
                    id = $(this).find(':input:first').attr('id').split("meta");
                    if(id.length > 1){
                        id = id[1];
                        id = id.replace("-", "");
                        check = id.split('-');
                        if($(this).find(':input:first').attr('type') == 'radio' && $(this).find(':input:first').attr('checked')=='checked' && check.length > 1){
                            meta[parseInt(check[0])]= check[1];
                        }
                        else
                        if($(this).find(':input:first').attr('type') == 'checkbox'){
                            val_check = ($(this).find(':input:first').attr('checked') == 'checked' ? 'on' : 'off');
                            meta[parseInt(id)]= val_check;
                        }
                        else
                        if($(this).find(':input:first').attr('type') != 'radio' && $(this).find(':input:first').attr('type') != 'checkbox'){                          
                            meta[parseInt(id)]= $(this).find(':input:first').val();
                        }                        
                    }
                })
                
                function alertDismissed() {
		// do something
                }
                
                if (!$('#title').val()) {
                    navigator.notification.alert('Debe entrar el título', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
	  	if (!$('#description').val()) {
                     navigator.notification.alert('Debe entrar la descripción', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
	  	if ($('#catId').val()=="-1") {
                    navigator.notification.alert('Debe seleccionar una categoría', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
	  	if (!$('#price').val()) {
                    navigator.notification.alert('Debe especificar un precio', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
                if ($('#countryId').val()=="-1") {
                    navigator.notification.alert('Debe seleccionar un país', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
	  	if ($('#regionId').val()=="-1") {
                    navigator.notification.alert('Debe seleccionar una región', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
	  	if ($('#cityId').val()=="-1") {
                    navigator.notification.alert('Debe seleccionar una ciudad', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );
                    return false;}
                
                var intRegex = /^\d+$/;
                var floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;

                if (!intRegex.test($('#price').val()) || !floatRegex.test($('#price').val())) {
                        navigator.notification.alert('El valor del precio debe ser un número', // message
				alertDismissed, // callback
				'Validación', // title
				'OK' // buttonName
                        );

                    return false;                        
                }
                
                $.each(countries_list,function(index,value){
                         if(value.pk_c_code == $("#countryId").val()){
                            countryName = value.s_name;
                         }
                });
                
                $.each(regions_list,function(index,value){
                        if(value.pk_i_id == $("#regionId").val()){
                            regionName = value.s_name;
                        }
                }); 
                
                $.each(cities_list,function(index,value){
                         if(value.pk_i_id == $("#cityId").val()){
                            cityName = value.s_name;
                         }
                }); 
                
                values += 'userId:'+osclasgap_user.uid;                 
                values += '%,contactName:'+osclasgap_user.name; 
                values += '%,contactEmail:'+osclasgap_user.mail;
                values += '%,countryName:'+countryName; 
                values += '%,regionName:'+regionName; 
                values += '%,cityName:'+cityName; 
                values += '%,photos:'+encodeURIComponent(JSON.stringify(files_selected));
		  
              if (!osclasgap_page_node_edit_nid) { // new nodes...
	  		options = {
	  			"item":{
	  				"data":values,
	  				"meta": meta                                        
	  			},
	  			"error":function(jqXHR, textStatus, errorThrown) {
	  				alert("osclasgap_page_node_edit_submit - Failed to create , review the debug console log for more information.");
		  		},
		  		"success":function(node) {
		  			// Created node successfully, view the node.
                                       
				  	$.mobile.changePage("content.html");
		  		}
	  		};
		  	osclasgap_services_node_create.resource_call(options);
	  	}
	  	else { // existing nodes...
		  	
                        node_update_options = {
                                "item":{
                                        "data":values,
                                        "meta": meta,
                                        "nid":osclasgap_page_node_edit_nid
                                },
                                "error":function(jqXHR, textStatus, errorThrown) {
                                        alert(result.errorThrown);
                                },
                                "success":function(data) {
                                        // Node was updated properly.
                                        $.mobile.changePage("content.html");
                                }
                        };
                        osclasgap_services_node_update.resource_call(node_update_options);
	  	}
	}
	catch (error) {
		console.log("osclasgap_page_node_edit_submit");
		console.log(error);
	}
	return false;
});

// cancel button clicked...
$('#osclasgap_page_node_edit_cancel').live('click',function(){
	try {
		// if it's a new node, send back to content add, otherwise send back to node
		if (!osclasgap_page_node_edit_nid)
			$.mobile.changePage("content_add.html");
		else
			$.mobile.changePage("node.html");
	}
	catch (error) {
		console.log("osclasgap_page_node_edit_cancel");
		console.log(error);
	}
	return false;
});

$('#datos-generales').live('click',function(){
        $('.select_tab').removeClass('select_tab');
        $(this).addClass('select_tab');
	$("#osclasgap_page_content_add_list").show();
	$("#meta_fields_content").hide();
	$("#datos-ubicacion-content").hide();
});

$('#datos-especificos').live('click',function(){
        $('.select_tab').removeClass('select_tab');
        $(this).addClass('select_tab');
	$("#osclasgap_page_content_add_list").hide();
	$("#meta_fields_content").show();
	$("#datos-ubicacion-content").hide();
});

$('#datos-ubicacion').live('click',function(){
        $('.select_tab').removeClass('select_tab');
        $(this).addClass('select_tab');
	$("#osclasgap_page_content_add_list").hide();
	$("#meta_fields_content").hide();
	$("#datos-ubicacion-content").show();
});


$('#countryId').live("change",function(){
	try {
                $("#regionId").val('-1').change();             
                $("#cityId").val('-1').change();             
                service_select_regions('');
	}
	catch (error) {
		console.log("osclasgap_page_content");
		console.log(error);
	}
});
$('#regionId').live("change",function(){
	try {
                $("#cityId").val('-1').change();             
		service_select_cities('');
	}
	catch (error) {
		console.log("osclasgap_page_content");
		console.log(error);
	}
});

$('.btnEliminarImagenSelect').live('click', function() {

            var count = $(this).attr('id').split("Eliminar")[1];

            var div = this.parentNode;
            var div = div.parentNode;            
            div.parentNode.removeChild(div);
            imagenes_cont--;

            for (var index = 0; index < files_selected.length; index++) {
                    if (files_selected[index].id == count) {
                            files_selected.remove(index);
                            break;
                    }
            };
    });

$('.image_add_select').live('click', function() {
    
    adicionar_selector_imagen();

});

$('.image_select').live('click', function() {
    
			var obj = this;
			navigator.camera.getPicture(onSuccess, onFail, {
						quality : 50,
						destinationType : Camera.DestinationType.DATA_URL,
						sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM
					});

			function onSuccess(imageData) {
				seleccionar_imagen_from_camera(obj, imageData);
			}

			function onFail(message) {
				// alert('Failed because: ' + message);
			}

		});

$('.btnEliminarImagen').live('click', function() {
    delete_image($(this).attr('id'));
});
                
function seleccionar_imagen_from_camera(a, imageData) {
	var count = $(a).attr('id').split("Add")[1];
        
	var image = document.getElementById('imgAdd' + count);

	image.src = "data:image/jpeg;base64," + imageData;

	var img = {
		"id" : count,
		"data" : imageData
	};
	files_selected.push(img);
}

function adicionar_selector_imagen() {

	imagenes_cont++;
	var div = '<div class="imagenes_select">'
			+ '<img src="'
			+ osclasgap_settings.site_path
			+ '/oc-content/themes/'+osclasgap_settings.theme+'/images/no_photo.gif" id="imgAdd'
			+ imagenes_cont
			+ '"style="width: 100px;height: 70px"; />'
			+ '<input type="button" id="btnAdd'
			+ imagenes_cont
			+ '" data-mini="true" class="image_select" data-inline="true" data-icon="plus" value="Seleccionar" data-theme="b" />'
			+ '<input type="button" id="lnkEliminar' + imagenes_cont
			+ '" class="btnEliminarImagenSelect" data-mini="true" data-inline="true" data-icon="delete" value="Eliminar" data-theme="b"/>' + '</div>';

	$("#imagenes_selectors_set").append(div);
	$("#btnAdd" + imagenes_cont).button();
	$("#lnkEliminar" + imagenes_cont).button();

}

function delete_image(id) {
	for (var index = 0; index < anuncio_obj.NImagenAnuncio.length; index++) {
		// $.each(anuncio_obj.NImagenAnuncio,function(index,value){
		if (anuncio_obj.NImagenAnuncio[index].id == id) {
			anuncio_obj.NImagenAnuncio.remove(index);
			break;
		}
	}

	show_images();

	views_options_c = {
		"endpoint" : "mclasificados",
		"path" : "images/delete",
		"data" : "id_imagen=" + id
		
		// "success" : image_delete_success,
		// "error" : image_delete_error
	};

	anuncios_retrieve.resource_call(views_options_c);
}

function show_images() {
	var images_html = '';

	if (anuncio_obj.NImagenAnuncio[0]) {
		images_html = '<div>Im&aacute;genes:</div><br />';
		$.each(anuncio_obj.NImagenAnuncio, function(index, value) {
			images_html += '<div style="float:left;margin-left:2em;margin-bottom:1em;text-align:center;">'
					+ '<img src="'
					+ osclasgap_settings.site_path
					+ "/sites/default/files/images/thumbs/"
					+ value.nombre
					+ '" />'
					+ '<a id="'
					+ value.id
					+ '" class="btnEliminarImagen" href="#" style="display:block;overflow:hidden;">Eliminar</a></div>';
		});
	}

	$('#osclasgap_page_anuncios_edit_form .imagenes').html(images_html);

	$('#osclasgap_page_anuncios_edit_form .imagenes')
			.append("<div style='clear: both;overflow: hidden;'></div>");
}


$('#up-edit-button').live('click',function(){
      $('html, body').animate({
		scrollTop : $("#osclasgap_page_node_edit").offset().top
	}, 2000);   
});
$('#down-edit-button').live('click',function(){
      $('html, body').animate({
		scrollTop : $("#option_node_edit").offset().top
	}, 2000);   
});
