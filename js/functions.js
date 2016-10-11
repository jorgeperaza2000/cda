//var server = "http://www.ximplex.com.ve/agenciaServer/";
var server = "https://www.ximplex.com.ve/agenciaServer/";
$(document).ready(function(){	
	$('#formulario').submit(function() { 
			
		var $this = $(".show-page-loading-msg"),
	        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
	        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
	        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
	        textonly = !!$this.jqmData( "textonly" );
	        html = $this.jqmData( "html" ) || "";
	    	$.mobile.loading( "show", {
	            text: msgText,
	            textVisible: textVisible,
	            theme: theme,
	            textonly: textonly,
	            html: html
	    });
		// recolecta los valores que inserto el usuario
		var identificador = $("#txtIdentificador").val()
		
	  	archivoValidacion = server + "login.php?jsoncallback=?"
		$.getJSON( archivoValidacion, { txtIdentificador:identificador})
		.done(function(respuestaServer) {
			
			//alert(respuestaServer.mensaje + "\nGenerado en: " + respuestaServer.hora + "\n" +respuestaServer.generador)
			$.mobile.loading( "hide" );
			if(respuestaServer.validacion == "ok"){
			  	window.localStorage.setItem("usuario", respuestaServer.usuario);
			 	/// si la validacion es correcta, muestra la pantalla "home"
				$.mobile.changePage("principal.html", {reloadPage: true});
			  	
			}else{
			  
			  /// ejecutar una conducta cuando la validacion falla
			}
	  
		}).error(function(){
			$.mobile.loading( "hide" );
		})
		return false;
	});

	
});

$(document).on("pagebeforeshow","#index",function(e){

	window.localStorage.setItem("usuario", "");

});


$(document).on("pagebeforeshow","#principal",function(e){
	if ( validaSession() ) {
		e.preventDefault();
		e.stopPropagation();
		$.mobile.changePage("index.html");
		return;
	}

	var value = window.localStorage.getItem("usuario");
    //var value = "PP";
    //alert(value);
    //console.log(value);
    $("#txtName").html(value);
    var textoSaldo;
    archivo = server + "getSaldo.php?jsoncallback=?"
	$.getJSON( archivo)
	.done(function(respuestaServer) {
		$("#txtSaldo").html('');
		$("#txtDeuda").html('');
		
		if ( respuestaServer.validacion == "ok" ) {
			$.each(respuestaServer.data, function(k, v) {
				if ( parseInt(v.saldo) > 0 ) {
					textoSaldo = "Usted debe a la banca: ";
				} else if ( parseInt(v.saldo) == 0 ) {
					textoSaldo = "Su cuenta esta en: ";
				} else {
					textoSaldo = "La banca le debe: ";
				}
				$("#txtSaldo").html(textoSaldo + v.saldo + " Bs");
				$("#txtDeuda").html("Por cobrar: " + v.deuda + " Bs");

			});
		}
  
	}).error(function(){
		
	});
});

$(document).on("pagebeforeshow","#clientes",function(e){
	if ( validaSession() ) {
		e.preventDefault();
		e.stopPropagation();
		$.mobile.changePage("index.html");
		return;
	}
	
    archivo = server + "getClientes.php?jsoncallback=?"
	$.getJSON( archivo)
	.done(function(respuestaServer) {
		$("#listadoClientes").html('');
		
		if ( respuestaServer.validacion == "ok" ) {
			$.each(respuestaServer.data, function(k, v) {
				$("#listadoClientes").append('<a href="detclientes.html" class="ui-btn ui-icon-grid ui-btn-icon-left">' + v.nombre + ' (' + v.saldo + ')</a>');
			});
		}
  
	}).error(function(){
		
	});

	$("#lnkAddCliente").click(function(){
		$.mobile.changePage("addClientes.html", {transition : "slide"});
	});
	
});

$(document).on("pagebeforeshow","#detClientes",function(e){
	if ( validaSession() ) {
		e.preventDefault();
		e.stopPropagation();
		$.mobile.changePage("index.html");
		return;
	}
    $("#nombreCliente").html("Carmen: 800,00 Bs");
	archivo = server + "getDeudas.php?idCliente=1&jsoncallback=?"
	$.getJSON( archivo)
	.done(function(respuestaServer) {
		if ( respuestaServer.validacion == "ok" ) {
			$("#listadoDeudas tbody").empty();
			$.each(respuestaServer.data, function(k, v) {
				$("#listadoDeudas tbody").append('<tr><td>' + v.fecha + '</td><td>' + v.monto + '</td></tr>');
			});
		}
  
	}).error(function(){
		
	});

	$("#lnkAddCliente").click(function(){
		$.mobile.changePage("addClientes.html", {transition : "slide"});
	});
});

$(document).on("pagebeforeshow","#programas",function(e){
	if ( validaSession() ) {
		e.preventDefault();
		e.stopPropagation();
		$.mobile.changePage("index.html");
		return;
	}
    archivo = server + "getProgramas.php?jsoncallback=?"
	$.getJSON( archivo)
	.done(function(respuestaServer) {
		$("#listadoProgramas").html('');
		
		if ( respuestaServer.validacion == "ok" ) {
			$.each(respuestaServer.data, function(k, v) {
				$("#listadoProgramas").append('<a href="programas.html?id=' + v.id + '" class="ui-btn ui-icon-grid ui-btn-icon-left">' + v.nombre + ' (' + v.porcentaje + '%)</a>')
			});
		}
  
	}).error(function(){
		
	});

	$("#lnkAddPrograma").click(function(){
		$.mobile.changePage("addProgramas.html", {transition : "slide"});
	});
});

$(document).on("pagebeforeshow","#addCliente",function(e){
	if ( validaSession() ) {
		e.preventDefault();
		e.stopPropagation();
		$.mobile.changePage("index.html");
		return;
	}
	$('#btnAddCliente').click(function() { 
		
		// recolecta los valores que inserto el usuario
		var nombreCliente = $("#txtNombreCliente").val();
		
		archivo = server + "setClientes.php?jsoncallback=?"
		$.getJSON( archivo, { txtNombreCliente:nombreCliente})
		.done(function(respuestaServer) {
			
			if ( respuestaServer.validacion == "ok" ) {
				$("#txtNombreCliente").val('');
				$.mobile.changePage("clientes.html", {transition : "slide"});	
			}
	  
		}).error(function(){
			
		});
		
	});

});

$(document).on("pagebeforeshow","#addAbono",function(e){
	if ( validaSession() ) {
		e.preventDefault();
		e.stopPropagation();
		$.mobile.changePage("index.html");
		return;
	}
	$('#btnAddAbono').click(function() { 
		
		// recolecta los valores que inserto el usuario
		var fecha = $("#mode2").val();
		var abono = $("#txtAbono").val();
		
		archivo = server + "setAbonos.php?jsoncallback=?"
		$.getJSON( archivo, { txtFecha:fecha, txtAbono:abono})
		.done(function(respuestaServer) {
			
			if ( respuestaServer.validacion == "ok" ) {
				$("#mode2").val('');
				$("#txtAbono").val('');
				$.mobile.changePage("abonos.html", {transition : "slide"});	
			}
	  
		}).error(function(){
			
		});
		
	});

});

$(document).on("pagebeforeshow","#addPrograma",function(e){
	if ( validaSession() ) {
		e.preventDefault();
		e.stopPropagation();
		$.mobile.changePage("index.html");
		return;
	}
	$('#btnAddPrograma').click(function() { 
		// recolecta los valores que inserto el usuario
		var nombrePrograma = $("#txtNombrePrograma").val();
		var porcentajePrograma = $("#txtPorcentajePrograma").val();
		archivo = server + "setProgramas.php?jsoncallback=?"
		$.getJSON( archivo, { txtNombrePrograma: nombrePrograma, txtPorcentajePrograma: porcentajePrograma })
		.done(function(respuestaServer) {
			if ( respuestaServer.validacion == "ok" ) {
				$("#txtNombrePrograma").val('');
				$("#txtPorcentajePrograma").val('');
				$.mobile.changePage("programas.html", {transition : "slide"});	
			}
	  
		}).error(function(){
			
		});
		
	});


});


$(document).on("pagebeforeshow","#ventaDiaria",function(e){
	if ( validaSession() ) {
		e.preventDefault();
		e.stopPropagation();
		$.mobile.changePage("index.html");
		return;
	}
	archivo = server + "getProgramas.php?jsoncallback=?"
	$.getJSON( archivo)
	.done(function(respuestaServer) {
		$("#listadoProgramas").html('');
		
		if ( respuestaServer.validacion == "ok" ) {
			$.each(respuestaServer.data, function(k, v) {
				$("#listadoProgramas").append('<h3>' + v.nombre + ' (' + v.porcentaje + '%)</h3><label> Venta </label><input type="number" class="permiteBorrar" id="txtVenta_' + v.id + '" name="txtVenta_' + v.id + '" ><label> Premios </label><input type="number" class="permiteBorrar" min="0" id="txtPremios_' + v.id + '" name="txtPremios_' + v.id + '" >');
				$("#ventaDiaria").trigger('create');
			});
			$("#mode2").change();
		}
  
	}).error(function(){
		
	});

	$("#mode2").bind("change", function() {
		var fecha = $("#mode2").val();
		archivo = server + "getVentaDiaria.php?jsoncallback=?"
		$.getJSON( archivo, { txtFecha: fecha})
		.done(function(respuestaServer) {

			var venta, premios, porcentaje_actual, banca, comision;

			var idPrograma;
			var ventaTotal = 0;
			var premiosTotal = 0;
			var bancaTotal = 0;
			var comisionTotal = 0;
			if ( respuestaServer.validacion == "ok" ) {
				$.each(respuestaServer.data, function(key, data) {
					$.each(data, function(k, v) {
						idPrograma = key;
						if ( k == "venta" ) {
							venta = v;
						}
						if ( k == "premios" ) {
							premios = v;
						}
						if ( k == "porcentaje_actual" ) {
							porcentaje_actual = v;
						}
						if ( k == "banca" ) {
							banca = v;
						}
						if ( k == "comision" ) {
							comision = v;
						}
					});

					$("#txtVenta_" + idPrograma).val(parseInt(venta));
					$("#txtPremios_" + idPrograma).val(parseInt(premios));

					ventaTotal = ventaTotal + parseInt(venta);
					premiosTotal = premiosTotal + parseInt(premios);
					bancaTotal = bancaTotal + parseInt(banca);
					comisionTotal = comisionTotal + parseInt(comision);
				});

				$("#totalVenta").html("Total Ventas: " + ventaTotal);
				$("#totalPremios").html("Total Premios: " + premiosTotal);
				$("#totalComision").html("Total Comision: " + comisionTotal);
				$("#totalBanca").html("Total Banca: " + bancaTotal);

			} else if ( respuestaServer.validacion == "nodata" ) {
				$(".permiteBorrar").val("");
				$(".permiteBorrarHtml").html("");
			}
	  
		}).error(function(){
			
		});
	});

	$('#btnAddVentaDiaria').click(function(e) { 
		// recolecta los valores que inserto el usuario
		var $inputs = $(':input');
	    var values = {};
	    $inputs.each(function() {
	        values[this.name] = $(this).val();
	    });
		archivo = server + "setVentaDiaria.php?jsoncallback=?"
		$.getJSON( archivo, { values: values })
		.done(function(respuestaServer) {
			if ( respuestaServer.validacion == "ok" ) {
				$.mobile.changePage("principal.html", {transition : "slide"});	
			}
	  
		}).error(function(){
			
		});
		
	});

});

$(document).on("pagebeforeshow","#abonos",function(e){
	if ( validaSession() ) {
		e.preventDefault();
		e.stopPropagation();
		$.mobile.changePage("index.html");
		return;
	}
    archivo = server + "getAbonos.php?jsoncallback=?"
	$.getJSON( archivo)
	.done(function(respuestaServer) {
		if ( respuestaServer.validacion == "ok" ) {
			$("#listadoAbonos tbody").empty();
			$.each(respuestaServer.data, function(k, v) {
				//$("#listadoAbonos").append('<a href="abonos.html?id=' + v.id + '" class="ui-btn ui-icon-grid ui-btn-icon-left">' + v.nombre + ' (' + v.saldo + ')</a>')
				$("#listadoAbonos tbody").append('<tr><td>' + v.fecha + '</td><td>' + v.tipo + '</td><td>' + v.abono + '</td></tr>');
			});
		}
  
	}).error(function(){
		
	});

	$("#lnkAddAbono").click(function(){
		$.mobile.changePage("addAbonos.html", {transition : "slide"});
	});
});

function validaSession(){
	
	if ( window.localStorage.getItem("usuario") == "" ) {
		return true;
	} else {
		return false;
	}

}