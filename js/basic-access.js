// JavaScript Document

$(document).ready(ba_init);

function ba_init()
{
	"use strict";
	$("#a").click(admin_query);
}

function formEventInputFieldsInit()
{
	"use strict";
	$("input[type=text],input[type=password],textarea").focus(function(event){$(event.currentTarget).addClass("ba-active-field");});
	$("input[type=text],input[type=password],textarea").blur(function(event){$(event.currentTarget).removeClass("ba-active-field");});
	$("input[type=text]:focus,input[type=password]:focus,textarea:focus").addClass("ba-active-field");
}

function admin_query()
{
	"use strict";
	$.ajax({
			type: "POST",
			url: "basic-access-requests.php",
			data: "action=query",
			dataType: "json",
			success: function(response) {
				$("body").prepend(response.form);
				var action = $("#action").val();
				var callback = null, buttons = null;
				switch(action)
				{
					case "login" 	:	buttons = {"Ok": login, "Annuler":  function() { $( this ).dialog( "destroy" ).remove(); }};
										$("#password").focus().keydown(function(event){ $(this).removeClass("fe-invalid-field"); if (event.which === 13) { login();} });
										break;
					case "create"	:	buttons = {"Ok": create, "Annuler":  function() { $( this ).dialog( "destroy" ).remove(); }};
										break;
					case "manage"	:	buttons = {"Ok": function() { $( this ).dialog( "destroy" ).remove(); }};
										$("#ba_updPasswd").click(updatePasswordForm);
										$("#ba_logout").click(logout);
				}
				$("#messagebox").dialog({
					buttons: buttons,
					closeOnEscape: true,
					closeText: "fermer",
					modal: true,
					title: response.title,
					width: 450
				});
			}
		});
}

function login()
{
	"use strict";
	var password = $("#password").val();
	$.ajax({
		type: "POST",
		url: "basic-access-requests.php",
		data: "action=login&password="+password,
		success: function(response) {loginCallback(response);}
	});
}

function loginCallback(response)
{
	"use strict";
	if (response !== "1") { $("#password").addClass("ba-invalid-field"); }
	else
	{
		$("#password").addClass("fe-valid-field");
		window.location.reload();
	}
}

function create()
{
	"use strict";
	var password1 = $("#password").val();
	var password2 = $("#password_confirm").val();

	if (password1 === password2)
	{
		$("#messagebox").dialog("destroy").remove();
		$.ajax({
			type: "POST",
			url: "basic-access-requests.php",
			data: "action=create&password="+password1,
			success: function(response) {
				var message = "";
				if (response === "0") { message = "Le mot de passe n'a pas pu Ãªtre changÃ©."; }
				if (response === "1") { message = "Le mot de passe a Ã©tÃ© mis Ã  jour."; }
				var html = "<div id=\"messagebox\">"+message+"</div>";
				$("body").prepend(html);
				$("#messagebox").dialog({
					buttons : {"Ok": function() { $( this ).dialog( "destroy" ).remove(); }},
					closeOnEscape: true,
					closeText: "fermer",
					modal: true,
					title: "Mise Ã  jour du mot de passe",
					width: 450
				});
			}
		});
	}
	else
	{
		$("#password-confirm").addClass("ba-invalid-field");	
	}
}

function updatePasswordForm()
{
	"use strict";
	$("#messagebox").dialog( "destroy" ).remove();

	$.ajax({
			type: "POST",
			url: "basic-access-requests.php",
			data: "action=updpasswdform",
			success: function(response) {
				$("body").prepend(response);
					$("#messagebox").dialog({
					buttons: {	"Ok": 		updatePassword,
								"Annuler":  function() { $( this ).dialog( "destroy" ).remove(); }},
					closeOnEscape: true,
					closeText: "fermer",
					modal: true,
					title: "Mise Ã  jour du mot de passe",
					width: 450
				});
				$("#new_password_confirm").keydown(function(event){ $(this).removeClass("fe-invalid-field"); if (event.which === 13) { updatePassword(); }});
				$("#current_password").keyup(passwordCheck).focus();
				$("#new_password_confirm").keyup(confirmCheck);
				formEventInputFieldsInit();
			}
	});
	
}

function passwordCheck()
{
	"use strict";
	$.ajax({
		type: "POST",
		url: "basic-access-requests.php",
		data: "action=check&password="+$("#current_password").val(),
		success: function(response) {
			if (response === "1") { $("#passwordMark").removeClass().addClass("validMark"); }
			else { $("#passwordMark").removeClass().addClass("invalidMark"); }
		}
	});
}

function confirmCheck()
{
	"use strict";
	if ( $("#new_password").val() === $("#new_password_confirm").val() ) { $("#confirmMark").removeClass().addClass("validMark"); }
	else { $("#confirmMark").removeClass().addClass("invalidMark"); }
}

function updatePassword()
{
	"use strict";
	var currentPasswordIsValid = $("#passwordMark").hasClass("validMark");
	var currentPassword = $("#current_password").val();
	var newPassword = $("#new_password").val();
	var newPasswordIsConfirmed = (newPassword === $("#new_password_confirm").val());
	var ready = (currentPasswordIsValid && newPasswordIsConfirmed);

	if (ready)
	{
		$("#messagebox").dialog( "destroy" ).remove();
		$.ajax({
			type: "POST",
			url: "basic-access-requests.php",
			data: "action=updpasswd&currentpassword="+currentPassword+"&newpassword="+newPassword,
			dataType: "json",
			success: function (response) {
				var dialogClass = "";
				if (response.error === 1) { dialogClass = "dialog_error"; }
				$("body").prepend(response.message);
				$("#messagebox").dialog({
					dialogClass: dialogClass,
					buttons: {	"Ok": 		function() { $( this ).dialog( "destroy" ).remove(); }},
					closeOnEscape: true,
					closeText: "fermer",
					modal: true,
					title: "Mise Ã  jour du mot de passe",
					width: 450
				});
			}
		});
	}
}

function logout()
{
	"use strict";
	$.ajax({
		type: "POST",
		url: "basic-access-requests.php",
		data: "action=logout",
		success: function() {window.location.reload();}
	});
}