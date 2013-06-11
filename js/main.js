// Jamal Moubarak
// ASD 1306

//DOM Ready function.
$(document).ready(function(){
	
	// Home Page pageinit function.
	$('#home').on('pageinit', function() {

	});
	
	// Info Page pageinit function.
	$('#info').on('pageinit', function() {

	});
	
	// To-Do Page pageinit function.
	$('#todo').on('pageinit', function() {

	});
	
	// Add Item Page pageinit function.
	$('#addItem').on('pageinit', function() {
	
		// Dropdown for radios.
		$(document).ready(function(){
		    $("#effect").css("display","none");
		        $(".Pending").bind('click', function(e){
		        if ($('input[name=status]:checked').val() === "Completed" ) {
		            $("#effect").slideDown("fast");
		        } else {
		            $("#effect").slideUp("fast");
		        }
		     });
		});
	
		// Form Validator for client Install Form.
		var ciForm = $('#clientInstallForm');
		ciForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
				saveData(this.key);
			}
		});
	});
	
	// View All Client Page pageinit function.
	$('#clientList').on('pageinit', function() {

	});
	
		// View Pending Client Page pageinit function.
	$('#pendClientList').on('pageinit', function() {

	});
	
		// View Potential Client Page pageinit function.
	$('#potClientList').on('pageinit', function() {

	});
	
		// View Completed Client Page pageinit function.
	$('#compClientList').on('pageinit', function() {

	});


// All functions go below here.

	var editKey = "";

	var saveData = function(){
		if(!editKey) {
			var id = Math.floor(Math.random()*100000001);
		} else {
			var id = editKey;
		}
		
		var item                = {};
			item.id             = ["Client ID:", id];
			item.group 			= ["Install:", $("#groups").val()];
			item.compname		= ["Company Name:", $("#compname").val()];
			item.contname		= ["Contact Name:", $("#contname").val()];
			item.contphone		= ["Contact Phone #:", $("#contphone").val()];
			item.contemail		= ["Contact Email:", $("#contemail").val()];
			item.status         = ["Job Status:", $("#clientInstallForm :radio:checked + label").text()];
			item.date           = ["Date Completed:", $("#date").val()];
			item.paymentStat    = ["Payment Status:", $("#clientInstallForm ol :radio:checked + label").text()];
			item.networkNotes	= ["Network and Login Info:", $("#networkNotes").val()];
			item.notes			= ["Notes:", $("#notes").val()];
			localStorage.setItem(id, JSON.stringify(item));
			alert("Client Information is Saved!");
			console.log(id);
			window.location.reload("#");
			return false;
	};
	
	var showData = function(key){
		if(localStorage.length === 0){
			autoFillData();
			alert("No Clients have been entered yet.  Here is some sample data.");
		}
		$.mobile.changePage("#clientList");
		
		for (var i=0, len=localStorage.length; i<len; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = $('<ul></ul>');
			var createLi = $(
				"<li>" + obj.id[0] + " " + obj.id[1] + "</li>" +
				"<li>" + obj.group[0] + " " + obj.group[1] + "</li>" +
				"<li>" + obj.compname[0] + " " + obj.compname[1] + "</li>" +
				"<li>" + obj.contname[0] + " " + obj.contname[1] + "</li>" +
				"<li>" + obj.contphone[0] + " " + obj.contphone[1] + "</li>" +
				"<li>" + obj.contemail[0] + " " + obj.contemail[1] + "</li>" +
				"<li>" + obj.status[0] + " " + obj.status[1] + "</li>" +
				"<li>" + obj.date[0] + " " + obj.date[1] + "</li>" +
				"<li>" + obj.paymentStat[0] + " " + obj.paymentStat[1] + "</li>" +
				"<li>" + obj.networkNotes[0] + " " + obj.networkNotes[1] + "</li>" +
				"<li>" + obj.notes[0] + " " + obj.notes[1] + "</li>"				
			);
			var editClientButton = $("<button data-key='"+key+"'><a href='#clientInstallForm'> Edit Client</a></button>");
				editClientButton.on('click', function(){
					editKey = $(this).data('key');
					editItem(editKey);
				});
			var deleteClientButton = $("<button data-key='"+key+"'><a href='#clientInstallForm' id='delete"+key+"'> Delete Client</a></button>");
				deleteClientButton.on('click', function(){
					editKey = $(this).data('key');
					deleteItem(editKey);
				});
		makeSubList.append(createLi).append(editClientButton).append("<br>").append(deleteClientButton).appendTo("#edDelBut");
		}
	};

	var deleteItem = function(editKey) {
		var ask = confirm("Are you sure you want to delete this contact?");
		if(ask){
			localStorage.removeItem(editKey);
			alert("Client has been deleted!");
			window.location = "#clientInstallForm";
			window.location.reload("#");
		}else{
			alert("Client was not Deleted!");
		}	
	};
	
	var editItem = function(editKey) {
		var item = JSON.parse(localStorage.getItem(editKey));
		$("#group").val(item.group[1]);
		$("#compname").val(item.compname[1]);
		$("#contname").val(item.contname[1]);
		$("#contphone").val(item.contphone[1]);
		$("#contemail").val(item.contemail[1]);
		$("#date").val(item.date[1]);
		$("#networkNotes").val(item.networkNotes[1]);
		$("#notes").val(item.notes[1]);
		$('#submitButton').prev('.ui-btn-inner').children('.ui-btn-text').html('Update Client');
		$("#submitButton").val('Update Client').data('key', editKey);	
	};
	
	var autoFillData = function(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	};
	
	var clearStorage = function(){
		if(localStorage.length === 0){
			alert("You have no Clients to Clear.");
		} else {
			localStorage.clear();
			alert("All clients have been deleted.");
			window.location.reload("#addItem");
			return false;
		}
	};

	$('#clearStorage').on('click', clearStorage);
	$('#submitButton').on('click', saveData);
	$('#displayData').on('click', showData);

});






