function disabledAll( form ) {
	//var form = $("#frmLogin")[0].elements;
	form.each(function(){
		for(i=0;i<=10;i++){
			if ( $(this)[0][i] ) {
				$("#" + $(this)[0][i]["id"]).attr("disabled", true);
			}
		}
	});
}

function enabledAll( form ) {
	form.each(function(){
		for(i=0;i<=10;i++){
			if ( $(this)[0][i] ) {
				$("#" + $(this)[0][i]["id"]).attr("disabled", false);
			}
		}
	});
}

