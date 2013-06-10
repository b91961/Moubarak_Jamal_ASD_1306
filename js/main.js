// Jamal Moubarak
// ASD 1306

$(document).ready(function(){
	
	$('#home').on('pageinit', function() {

	});

	$('#info').on('pageinit', function() {

	});

	$('#todo').on('pageinit', function() {
	
		

	});

	$('#addItem').on('pageinit', function() {
	
		$(document).ready(function(){
		    $("#effect").css("display","none");
		        $(".Pending").bind('click', function(){
		        if ($('input[name=status]:checked').val() == "Completed" ) {
		            $("#effect").slideDown("fast");
		        } else {
		            $("#effect").slideUp("fast");
		        }
		     });
		});
	});
	
	
});