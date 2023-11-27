// JavaScript Document

$("document").ready(formHelpersInit);

function formHelpersInit()
{
	"use strict";
	$(".time-no-use").change(function() { toggleTimeField(this); });
	$(".datetime-no-use").change(function() { toggleDatetimeField(this); });
	$(".datetime-fullday").change(function() { toggleDatetimeFullday(this); });
	$(".current-image-behavior-radio").click(function() { curImgTargetToggle(this); });
	$(".current-image-behavior-radio:checked").click();
}

function toggleTimeField(el)
{
	"use strict";
	console.log($(el));
}

function toggleDatetimeFullday(el)
{
	"use strict";
	if ($(el).is(":checked"))
	{
		$(el).parent().children(".time-hour, .time-minutes").val("").prop("disabled", true);
	}
	else
	{
		var date = new Date();
		$(el).parent().children(".time-hour, .time-minutes").prop("disabled", false);
		$(el).parent().children(".time-hour").val(date.getHours());
		$(el).parent().children(".time-minutes").val(date.getMinutes());
	}
}

function toggleDatetimeField(el)
{
	"use strict";
	if ($(el).is(":checked"))
	{
		$(el).parent().find(".date-picker").val("").data("systemdate","").prop("disabled", true);
		$(el).parent().children(".time-hour, .time-minutes").val("").prop("disabled", true);
	}
	else
	{
		var date = new Date();
		var datePicker = $(el).parent().find(".date-picker");
		$(datePicker).prop("disabled", false);
		$(datePicker).val(("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear());
		$(datePicker).data("systemdate",("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + "-" + date.getFullYear());
		$(el).parent().children(".time-hour, .time-minutes").prop("disabled", false);
		$(el).parent().children(".time-hour").val(date.getHours());
		$(el).parent().children(".time-minutes").val(date.getMinutes());
	}
}

function curImgTargetToggle(el)
{
	"use strict";
	var target = $(el).parents(".field-holder").children(".target").val();
	if ($(el).data("val") !== "change") { $("#"+target+"_holder").hide(); }
	else { $("#"+target+"_holder").show(); }
}

function validateField(id, filter, flags)
{
/*
filter = ['number'|'positive'|'email'|'protocol_url'|'url'|'phone'|'postal'|'any'|'match']
flags = ['empty_allowed'|'size'|'match_val'|'email_exists'|'emailcheck_datas'=>array('url', 'data')|'helper_id'|'lang']
*/

	"use strict";
	var result = {},
	message = {},
	lang = false,
	rgex = "";
	result.message = '';
	result.result = false;
	if (flags === undefined) { flags = {}; }

	if (!flags.hasOwnProperty("lang"))
	{
		if (typeof getLang === "function") { lang = getLang(); }
		if (lang !== false) { flags.lang = lang; }
	}

	var val = $('#'+id).val();

	if (flags.hasOwnProperty("empty_allowed") && (flags.empty_allowed === true) && (val.length === 0))
	{
		$('#'+id).removeClass("fe-invalid-field fe-active-field");
		$('#'+flags.helper_id).html("").removeClass("invalid-field-notice");
		return;
	}

	switch(filter)
	{
		case 'positive':
		case 'above0':
		case 'number':			val = parseFloat(val);
								if (isNaN(val))
								{
									//val = 0;
									//$('#'+id).val(val);
								}
								rgex = /\d/;
								message.fr = "Ceci n'est pas un nombre";
								message.uk = "Not a number";
								message.es = "Este no es un nÃºmero";
								message.d = "Dies ist keine Zahl";
								break;
		case 'email':			rgex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+((\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)?)+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/;
								message.fr = "Format d'e-mail invalide";
								message.uk = "Invalid e-mail";
								message.es = "Formato del email invÃ¡lido";
								message.d = "UngÃ¼ltige E-Mail Format";
								break;
		case 'protocol_url':	rgex = /^http:\/\/[^ ]+$/;
								message.fr = "Format de protocol invalide";
								message.uk = "Invalid protocol";
								message.es = "Formato de protocolo InvÃ¡lido";
								message.d = "UngÃ¼ltig-Protokoll Format";
								break;
		case 'url':				rgex = /^((https?:\/\/)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:+?%=&;,]*)?)?)$/;
								message.fr = "Format d'url invalide";
								message.uk = "Invalid URL";
								message.es = "Formato URL invalido";
								message.d = "UngÃ¼ltige URL Format ";
								break;
		case 'phone':			rgex = /^\d{10}|(\d{2} ){4}\d{2}|(\d{2} ){2}\d{3} \d{3}$/;
								message.fr = "Format de numÃ©ro invalide";
								message.uk = "Invalid french phone number";
								message.es = "Formato de nÃºmero InvÃ¡lido";
								message.d = "UngÃ¼ltige Nummer Format";
								break;
		case 'postal':			rgex = /^\d{5}$/;
								message.fr = "Ceci n'est pas un code postal valide";
								message.uk = "Invalid french zip code";
								message.es = "Esto no es un CÃ³digo Postal";
								message.d = "Dies ist nicht ein Postleitzahl";
								break;
		case 'any':				rgex = /.+/;
								message.fr = "Ce champ doit Ãªtre renseignÃ©";
								message.uk = "This field has to be filled";
								message.es = "Este campo debe ser llenado";
								message.d = "Dieses Feld muss ausgefÃ¼llt werden";
								break;
		case 'match':			if (flags.hasOwnProperty("match_val")) { rgex = new RegExp(flags.match_val); }
								message.fr = "Le champ de correspond pas";
								message.uk = "Field mismatch";
								message.es = "El campo no coincide";
								message.d = "Das feld entspricht nicht";
								break;
		case 'date':			rgex = /^\d{2}[\/\-\s]\d{2}[\/\-\s]\d{4}$/;
								message.fr = "Ceci n'est pas une date valide";
								message.uk = "Invalid date";
								message.es = "Esto no es una fecha vÃ¡lida";
								message.d = "Dies ist kein gÃ¼ltiges Datum";
								break;
		default :				rgex = /.*/;
	}

	if ((flags.hasOwnProperty("empty_allowed") && !flags.empty_allowed && (val === "")))
	{
		$('#'+id).removeClass("fe-valid-field fe-active-field").addClass("fe-invalid-field");
		if (flags.hasOwnProperty("lang") && (flags.lang === "uk")) { result.message = "This field has to be filled"; }
		else 
		{
			if (flags.hasOwnProperty("lang") && (flags.lang === "es")) { result.message = "Este campo debe ser llenado"; }
			else
			{
				if (flags.hasOwnProperty("lang") && (flags.lang === "d")) { result.message = "Dieses Feld muss ausgefÃ¼llt werden"; }
				else
				{ result.message = "Ce champ doit Ãªtre rempli"; }
			}
		}

		result.result = false;
		if (flags.hasOwnProperty("helper_id"))
		{
			$("#"+flags.helper_id).html(result.message).removeClass("valid-field-notice").addClass("invalid-field-notice");
		}
		return result;
	}

	if ((filter === "positive") && (rgex.test(val)) && (val < 0))
	{
		if (flags.hasOwnProperty("lang") && (flags.lang === "uk")) { result.message = "The value has to be positive"; }
		else
		{
			if (flags.hasOwnProperty("lang") && (flags.lang === "es")) { result.message = "El valor debe ser positivo"; }
			else
			{
				if (flags.hasOwnProperty("lang") && (flags.lang === "d")) { result.message = "Der Wert muss positiv sein"; }
				else { result.message = "La valeur doit Ãªtre positive"; }
			}
		}
		result.result = false;
		$("#"+id).removeClass("fe-valid-field fe-active-field").addClass("fe-invalid-field");
		if (flags.hasOwnProperty("helper_id"))
		{
			$("#"+flags.helper_id).html(result.message).removeClass("valid-field-notice").addClass("invalid-field-notice");
		}
		return result;
	}

	if ((filter === "above0") && (rgex.test(val)) && (val < 1))
	{
		if (flags.hasOwnProperty("lang") && (flags.lang === "uk")) { result.message = "The value has to be greater than 0"; }
		else
		{
			if (flags.hasOwnProperty("lang") && (flags.lang === "es")) { result.message = "El valor debe ser mayor que 0"; }
			else
			{
				if (flags.hasOwnProperty("lang") && (flags.lang === "d")) { result.message = "Der Wert muss grÃ¶sser als 0 sein"; }
				else { result.message = "La valeur doit Ãªtre suppÃ©rieure Ã  0"; }
			}
		}
		result.result = false;
		$("#"+id).removeClass("fe-valid-field fe-active-field").addClass("fe-invalid-field");
		if (flags.hasOwnProperty("helper_id"))
		{
			$("#"+flags.helper_id).html(result.message).removeClass("valid-field-notice").addClass("invalid-field-notice");
		}
		return result;
	}

	if (flags.hasOwnProperty("size") && flags.hasOwnProperty("empty_allowed") && (!flags.empty_allowed) && (val.length < flags.size))
	{
		$("#"+id).removeClass("fe-valid-field fe-active-field").addClass("fe-invalid-field");
		if (flags.hasOwnProperty("lang") && (flags.lang === "uk")) { result.message = "Value is too short"; }
		else
		{
			if (flags.hasOwnProperty("lang") && (flags.lang === "es")) { result.message = "El valor de este campo debe ser mÃ¡s largo"; }
			else
			{
				if (flags.hasOwnProperty("lang") && (flags.lang === "d")) { result.message = "Der Wert dieses Feldes muss lÃ¤nger sein"; }
				else { result.message = "La valeur de ce champ doit Ãªtre plus longue"; }
			}
		}
		result.result = false;
		if (flags.hasOwnProperty("helper_id"))
		{
			$("#"+flags.helper_id).html(result.message).addClass("invalid-field-notice");
		}
		return result;
	}

	if (rgex.test(val))
	{
		$("#"+id).removeClass("fe-invalid-field fe-active-field").addClass("fe-valid-field");
		result.result = true;
		if (flags.hasOwnProperty("helper_id")) { $("#"+flags.helper_id).html('').removeClass("invalid-field-notice"); }
		if (filter === "url")
		{
			var regex2 = /^https:\/\//;
			var res = regex2.exec(val);
			if (res !== null)
			{
				$("#"+id).val($("#"+id).val().replace(res[0], ""));
				$("#"+id+"_protocol").addClass("url-valid").val(res[0]);
				
			}
			else
			{
				regex2 = /^http:\/\//;
				res = regex2.exec(val);
				if (res !== null)
				{
					$("#"+id).val($("#"+id).val().replace(res[0], ""));
					$("#"+id+"_protocol").addClass("url-valid").val(res[0]);
				}
				else
				{
					if ($("#"+id+"_protocol").val() === "") { $("#"+id+"_protocol").addClass("url-valid").val("http://"); }
				}
			}
		}
	}
	else
	{
		$("#"+id).removeClass("fe-valid-field fe-active-field").addClass("fe-invalid-field");
		if (flags.hasOwnProperty("lang") && (flags.lang === "uk")) { result.message = message.uk; }
		else { result.message = message.fr; }
		result.result = false;
		if (flags.hasOwnProperty("helper_id"))
		{
			$("#"+flags.helper_id).html(result.message).addClass("invalid-field-notice");
		}
		return result;
	}

	if (flags.hasOwnProperty("email_exists") && flags.hasOwnProperty("emailcheck_datas") && (flags.email_exists === true))
	{
		$.ajax({
			type: "POST",
			url: flags.emailcheck_datas.url,
			data: flags.emailcheck_datas.datas,
			dataType: "json",
			success: function (response) { 
				if (response.success) 
				{
					$("#"+id).removeClass("fe-valid-field fe-active-field").addClass("fe-invalid-field");
					if (flags.hasOwnProperty("lang") && (flags.lang === "uk")) { message = "This e-mail address is already in use"; }
					else { message = "Cet e-mail est dÃ©jÃ  utilisÃ©"; }
					if (flags.hasOwnProperty("helper_id"))
					{
						$("#"+flags.helper_id).html(message).addClass("invalid-field-notice");
					}
				}
				else
				{
					/*$('#'+id).removeClass('fe-invalid-field fe-active-field email-in-use');
					if (flags.hasOwnProperty('helper_id'))
						$('#'+flags['helper_id']).html('').removeClass('invalid-field-notice');*/
				}
			}
		});
	}
	return result;
}


function makeRequired(id, val)
{
	"use strict";
	if (val) { $("#"+id+"~.required-field-mark").show(); }
	else { $("#"+id+"~.required-field-mark").hide(); }
}

function clearFieldStatus(id)
{
	"use strict";
	$("#"+id).removeClass("fe-invalid-field");
	$("#"+id+"~.field-notice>span").html("").removeClass("invalid-field-notice");
}

function validEmailRFC2822(aEmail)
{
	"use strict";
    var rgxp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+((\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)?)+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/;
    return rgxp.test(aEmail);
}


/************* Fonctions d'auto completion relatives aux codes postaux *************/

function checkCityList(e, cityField, cityList, nextField)
{
	"use strict";
	var key = e.keyCode;
	if ((key === 13) || (key === 27) || (key === 38) || (key === 40)) { processNavActions(e, cityList, cityField, nextField); }
	else
	{
		var el = e.currentTarget;
		if (el.value.length === 5)
		{
			$.ajax({
				type: "POST",
				url: "form-helpers-requests.php",
				data: "action=postalcheck&postal="+el.value,
				success: function(response) {cityList.html(response); updateCityList(cityField, cityList, nextField); }
			});
		}
		else { cityField.val(""); }
	}
}

function checkLocationList(e, locationField, locationList, nextField)
{
	"use strict";
	var key = e.keyCode;
	if ((key === 13) || (key === 27) || (key === 38) || (key === 40)) { processNavActions(e, locationList, locationField, nextField); }
	else
	{
		var el = e.currentTarget;
		if (el.value.length > 2)
		{
			$.ajax({
				type: "POST",
				url: "form-helpers-requests.php",
				data: "action=locationcheck&location="+el.value,
				success: function(response) {locationList.html(response); updateCityList(locationField, locationList, nextField); }
			});
		}
		else { $(locationList).hide(); }
	}
}

/******************VARIABLES GLOBALES*******************/

var _ac_minsize = 1;			//Nombre de caractÃ¨re minimum avant de lancer une recherche d'autocomplÃ©tion
var _ac_selectedItem = -1;		//ElÃ©ment de rÃ©ponse actuellement sÃ©lectionnÃ© Ã  l'aide du clavier
var _ac_answerList = 0;			//Nombre d'Ã©lÃ©ments de rÃ©ponse


function processNavActions(e, acList, acField, nextField)
{
//Fonction de rÃ©action Ã  l'action des touches haut, bas et entrÃ©e
	"use strict";
	var key = e.keyCode;

	var oldSelectedItemIndex = _ac_selectedItem;
	if (key === 40)
	{
		_ac_selectedItem++;
		if ((_ac_selectedItem + 1) > _ac_answerList) { _ac_selectedItem = _ac_answerList - 1; }
	}
	
	if (key === 38)
	{
		_ac_selectedItem--;
		if (_ac_selectedItem  < 0) { _ac_selectedItem = 0; }
	}
	
	if (key === 27)
	{
		sb.hide('fast');
		return;
	}
	
	var suggestions = acList.children("div");
	var selectedItem = suggestions.eq(_ac_selectedItem);
	
	selectedItem.addClass("ac-selected-item");
	if ((oldSelectedItemIndex !== -1) && (oldSelectedItemIndex !== _ac_selectedItem))
	{
		var oldSelectedItem = suggestions.eq(oldSelectedItemIndex);
		oldSelectedItem.removeClass("ac-selected-item");
		oldSelectedItem.addClass("ac-item");
	}

	if ((key === 13) && (_ac_selectedItem > -1) && (_ac_selectedItem < _ac_answerList))
	{
		var val = $(selectedItem).html();
		acList.hide("fast");
		acField.val(val);
		_ac_selectedItem = -1;
		acField.focus().blur();
		if (nextField !== undefined) { $(nextField).focus(); }
	}
}

function updateCityList(cityField, cityList, nextField)
{
	"use strict";
	var answerList = cityList.children("div");
	_ac_answerList = answerList.length;
	
	if (cityList.html() === "")	{ cityList.hide(); }
	else
	{
		cityList.show();
		$('.city-list-item').click(function(event){cityFill(event, cityField, cityList, nextField); });	
	}
}

function cityFill(e, cityField, cityList, nextField)
{
	"use strict";
	var city = e.currentTarget.innerHTML;
	cityList.hide();
	cityList.html("");
	cityField.val(city).focus().blur();
	//cityField.removeClass();
	//$("#"+cityField.attr('id')+"info").html("");
	if (nextField !== undefined) { $(nextField).focus(); }
}