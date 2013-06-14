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
		
		// Form Validator for client Install Form.
		var tdForm = $('#todoForm');
		tdForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
				storeData(this.key);
			}
		});
	});
	
	// Add Item Page pageinit function.
	$('#addItem').on('pageinit', function() {
	
		// Dropdown for radios.
	    $('#effect').css('display','none');
	        $('.Status').bind('click', function(e){
	        if ($('input[name=status]:checked').val() === 'Completed' ) {
	            $('#effect').slideDown('fast');
	        } else {
	            $('#effect').slideUp('fast');
	        }
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

	var tdEditKey = '';

	var storeData = function(){
		var tdId;
		if(!tdEditKey) {
			tdId = Math.floor(Math.random()*100000001);
		} else {
			tdId = tdEditKey;
		}
		
		var tdItem          = {};
			tdItem.subject  = ['Subject:', $('#subject').val()];
			tdItem.message 	= ['Message:', $('#todomess').val()];
			localStorage.setItem(tdId, JSON.stringify(tdItem));
			alert('To-Do Message has been sent!');
			console.log(tdId);
			window.location = '#todo';
			window.location.reload('#');
			return false;
	};
	
	var tdAutoFillData = function(){
		for(var m in tdjson){
			var tdId = Math.floor(Math.random()*100000001);
			localStorage.setItem(tdId, JSON.stringify(tdjson[m]));
		}
	};
	
		var tdDeleteItem = function(tdEditKey) {
		var tdAsk = confirm('Are you sure you read this message? Message will be deleted!');
		if(tdAsk){
			localStorage.removeItem(tdEditKey);
			alert('Message has been removed!');
			window.location = '#home';
			window.location.reload('#');
		}else{
			alert('Message was not Deleted!');
		}	
	};
	
	var tdEditItem = function(tdEditKey) {
		var tdItems = JSON.parse(localStorage.getItem(tdEditKey));
			$('#subject').val(tdItems.subject[1]);
			$('#todoMess').val(tdItems.todoMess[1]);
			$('#submitMessButton').prev('.ui-btn-inner').children('.ui-btn-text').html('Update Message');
			$('#submitMessButton').val('Update Message').data('key', tdEditKey);	
	};
	
	var tdShowData = function(key){
		if(localStorage.length === 0){
			tdAutoFillData();
			alert('No Messages have been entered yet.  Here is some sample data.');
		}
		$.mobile.changePage('#');
		
		for (var j=0, l=localStorage.length; j<l; j++) {
			var key = localStorage.key(j);
			var tdValue = localStorage.getItem(key);
			var tdObj = JSON.parse(tdValue);
			var tdMakeSubList = $('<div></div>');
			var tdCreateLi = $(
				'<p>' + tdObj.subject[0] + ' ' + tdObj.subject[1] + '</p>' +
				'<p>' + tdObj.todoMess[0] + ' ' + tdObj.todoMess[1] + '</p>'				
			);
			var tdEditClientButton = $("<button data-key='"+key+"'><a href='#todo' id='tdEditClientButton'> Edit Message</a></button>");
				tdEditClientButton.on('click', function(){
					tdEditKey = $(this).data('key');
					tdEditItem(tdEditKey);
				});
			var tdDeleteClientButton = $("<button data-key='"+key+"'><a href='#todoForm' id='delete"+key+"'> Message Seen</a></button>");
				tdDeleteClientButton.on('click', function(){
					tdEditKey = $(this).data('key');
					tdDeleteItem(tdEditKey);
				});
		tdMakeSubList.append(tdCreateLi).append(tdDeleteClientButton).append(tdEditClientButton).appendTo('#messList');
		}
	};
	
	$('#tdEditClientButton').click(function(){
		$('#tdDropdown').trigger('click');
	});
	
	var tdClearStorage = function(){
		if(localStorage.length === 0){
			alert('You have no Messages to Clear.');
		} else {
			var tdAsk = confirm('Are you sure you want to delete ALL Messages?  This action can NOT be undone!!!');
			if(tdAsk){
				localStorage.clear();
				alert('All Messages have been deleted.');
				window.location = '#home';
				window.location.reload('#');
				return false;
			}
		}
	};


	var editKey = '';

	var saveData = function(){
		var id;
		if(!editKey) {
			id = Math.floor(Math.random()*100000001);
		} else {
			id = editKey;
		}
		
		var item                = {};
			item.id             = ['Client ID:', id];
			item.group 			= ['Install:', $('#groups').val()];
			item.compName		= ['Company Name:', $('#compname').val()];
			item.contName		= ['Contact Name:', $('#contname').val()];
			item.contPhone		= ['Contact Phone #:', $('#contphone').val()];
			item.contEmail		= ['Contact Email:', $('#contemail').val()];
			item.status         = ['Job Status:', $('#clientInstallForm :radio:checked + label').text()];
			item.date           = ['Date Completed:', $('#date').val()];
			item.paymentStat    = ['Payment Status:', $('#clientInstallForm ol :radio:checked + label').text()];
			item.networkNotes	= ['Network and Login Info:', $('#networkNotes').val()];
			item.notes			= ['Notes:', $('#notes').val()];
			localStorage.setItem(id, JSON.stringify(item));
			alert('Client Information is Saved!');
			console.log(id);
			window.location = '#home';
			window.location.reload('#');
			return false;
	};
	
	var autoFillData = function(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	};
	
	var deleteItem = function(editKey) {
		var ask = confirm('Are you sure you want to delete this contact?');
		if(ask){
			localStorage.removeItem(editKey);
			alert('Client has been deleted!');
			window.location = '#home';
			window.location.reload('#');
		}else{
			alert('Client was not Deleted!');
		}	
	};
	
	var editItem = function(editKey) {
		var rad = ('#clientInstallForm :radio:checked + label');
		var items = JSON.parse(localStorage.getItem(editKey));
			$('#group').val(items.group[1]);
			$('#compName').val(items.compName[1]);
			$('#contName').val(items.contName[1]);
			$('#contPhone').val(items.contPhone[1]);
			$('#contEmail').val(items.contEmail[1]);
			$('#date').val(items.date[1]);
			$('#networkNotes').val(items.networkNotes[1]);
			$('#notes').val(items.notes[1]);
			$('#submitButton').prev('.ui-btn-inner').children('.ui-btn-text').html('Update Client');
			$('#submitButton').val('Update Client').data('key', editKey);	
	};
	
	var showData = function(key){
		if(localStorage.length === 0){
			autoFillData();
			alert('No Clients have been entered yet.  Here is some sample data.');
		}
		$.mobile.changePage('#clientList');
		
		for (var i=0, len=localStorage.length; i<len; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var clData = JSON.parse(value);
			var makeSubList = $('<div></div>');
			var createLi = $(
				'<ul>'+
					'<li>' + clData.id[0] + ' ' + clData.id[1] + '</li>' +
					'<li>' + clData.group[0] + ' ' + clData.group[1] + '</li>' +
					'<li>' + clData.compName[0] + ' ' + clData.compName[1] + '</li>' +
					'<li>' + clData.contName[0] + ' ' + clData.contName[1] + '</li>' +
					'<li>' + clData.contPhone[0] + ' ' + clData.contPhone[1] + '</li>' +
					'<li>' + clData.contEmail[0] + ' ' + clData.contEmail[1] + '</li>' +
					'<li>' + clData.status[0] + ' ' + clData.status[1] + '</li>' +
					'<li>' + clData.date[0] + ' ' + clData.date[1] + '</li>' +
					'<li>' + clData.paymentStat[0] + ' ' + clData.paymentStat[1] + '</li>' +
					'<li>' + clData.networkNotes[0] + ' ' + clData.networkNotes[1] + '</li>' +
					'<li>' + clData.notes[0] + ' ' + clData.notes[1] + '</li>' +
				'</ul>'				
			);
			console.log(clData);
			var editClientButton = $("<button data-key='"+key+"'><a href='#addItem' class='editBut'> Edit Client</a></button>");
				editClientButton.on('click', function(){
					editKey = $(this).data('key');
					editItem(editKey);
				});
			var deleteClientButton = $("<button data-key='"+key+"'><a href='#clientInstallForm' id='delete'"+key+"'> Delete Client</a></button>");
				deleteClientButton.on('click', function(){
					editKey = $(this).data('key');
					deleteItem(editKey);
				});
		makeSubList.append(createLi).append(editClientButton).append(deleteClientButton).appendTo('#clList');
		}
	};
	
	$('#pendBut').on('click', function () {
		$.mobile.changePage('#pendClientList',{});
		$('#pendClList').empty();
		$.ajax({
			url			:	'xhr/pending.php',
			type		:	'GET',
			dataType	:	'json',
			success		:	function(response) {
			alert('No Clients have been entered yet.  Here is some sample JSON data.');
				for(var i=0, j=response.pendClList.length; i<j; i++){
					var pend = response.pendClList[i];
					$(''+
						'<div class="pendCl">'+
							'<ul>'+
								'<li>' + 'Client ID: ' + pend.id + '</li>' +
								'<li>' + 'Install: ' + pend.group + '</li>' +
								'<li>' + 'Company Name: ' + pend.compName + '</li>' +
								'<li>' + 'Contact Name: ' + pend.contName + '</li>' +
								'<li>' + 'Contact Phone #: ' + pend.contPhone + '</li>' +
								'<li>' + 'Contact Email: ' + pend.contEmail + '</li>' + 
								'<li>' + 'Job Status: ' + pend.status + '</li>' + 
								'<li>' + 'Date Completed: ' + pend.date + '</li>' +
								'<li>' + 'Payment Status: ' + pend.paymentStat + '</li>' +
								'<li>' + 'Network and Login Info: ' + pend.networkNotes + '</li>' + 
								'<li>' + 'Notes: ' + pend.notes + '</li>' +
							'</ul>'+
						'</div>'
					).appendTo('#pendClList');
				};
			}
		});
	});
	
	$('#potBut').on('click', function () {
		$.mobile.changePage('#potClientList',{});
		$('#potClList').empty();
		$.ajax({
			url			:	'xhr/potential.php',
			type		:	'GET',
			dataType	:	'json',
			success		:	function(response) {
			alert('No Clients have been entered yet.  Here is some sample JSON data.');
				for(var i=0, j=response.potClList.length; i<j; i++){
					var pot = response.potClList[i];
					$(''+
						'<div class="potCl">'+
							'<ul>'+
								'<li>' + 'Client ID: ' + pot.id + '</li>' +
								'<li>' + 'Install: ' + pot.group + '</li>' +
								'<li>' + 'Company Name: ' + pot.compName + '</li>' +
								'<li>' + 'Contact Name: ' + pot.contName + '</li>' +
								'<li>' + 'Contact Phone #: ' + pot.contPhone + '</li>' +
								'<li>' + 'Contact Email: ' + pot.contEmail + '</li>' + 
								'<li>' + 'Job Status: ' + pot.status + '</li>' + 
								'<li>' + 'Date Completed: ' + pot.date + '</li>' +
								'<li>' + 'Payment Status: ' + pot.paymentStat + '</li>' +
								'<li>' + 'Network and Login Info: ' + pot.networkNotes + '</li>' + 
								'<li>' + 'Notes: ' + pot.notes + '</li>' +
							'</ul>'+
						'</div>'
					).appendTo('#potClList');
				};
			}
		});
	});
	
	$('#compBut').on('click', function () {
		$.mobile.changePage('#compClientList',{});
		$('#compClList').empty();
		$.ajax({
			url			:	'xhr/completed.xml',
			type		:	'GET',
			dataType	:	'xml',
			success		:	function(xml) {
			alert('No Clients have been entered yet.  Here is some sample XML data.');
			console.log(xml);
				$(xml).find('completed').each(function(){
				var completed = {};
					completed.id = $(this).find('id').text();
					completed.group = $(this).find('group').text();
					completed.compName = $(this).find('compName').text();
					completed.contName = $(this).find('contName').text();
					completed.contPhone = $(this).find('contPhone').text();
					completed.contEmail = $(this).find('contEmail').text();
					completed.status = $(this).find('status').text();
					completed.date = $(this).find('date').text();
					completed.paymentStat = $(this).find('paymentStat').text();
					completed.networkNotes = $(this).find('networkNotes').text();
					completed.notes = $(this).find('notes').text();
					$(''+
						'<div class="compCl">'+
							'<ul>'+
								'<li>' + 'Client ID: ' + completed.id + '</li>' +
								'<li>' + 'Install: ' + completed.group + '</li>' +
								'<li>' + 'Company Name: ' + completed.compName + '</li>' +
								'<li>' + 'Contact Name: ' + completed.contName + '</li>' +
								'<li>' + 'Contact Phone #: ' + completed.contPhone + '</li>' +
								'<li>' + 'Contact Email: ' + completed.contEmail + '</li>' + 
								'<li>' + 'Job Status: ' + completed.status + '</li>' + 
								'<li>' + 'Date Completed: ' + completed.date + '</li>' +
								'<li>' + 'Payment Status: ' + completed.paymentStat + '</li>' +
								'<li>' + 'Network and Login Info: ' + completed.networkNotes + '</li>' + 
								'<li>' + 'Notes: ' + completed.notes + '</li>' +
							'</ul>'+
						'</div>'
					).appendTo('#compClList');
				});
			}
		});
	});
	
	var clearStorage = function(){
		if(localStorage.length === 0){
			alert('You have no Clients to Clear.');
		} else {
			var ask = confirm('Are you sure you want to delete ALL Clients?  This action can NOT be undone!!!');
			if(ask){
				localStorage.clear();
				alert('All clients have been deleted.');
				window.location = '#home';
				window.location.reload('#');
				return false;
			}
		}
	};

	$('.clearStorage').on('click', clearStorage);
	$('#submitButton').on('click', saveData);
	$('.displayData').on('click', showData);
	
	$('.tdClearStorage').on('click', tdClearStorage);
	$('#submitMessButton').on('click', storeData);
	$('.tdDisplayData').on('click', tdShowData);

});






