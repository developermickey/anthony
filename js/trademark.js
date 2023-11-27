// JavaScript Document

$("document").ready(trademarkInit);
var emphasisTimer = null;

function trademarkInit()
{
	"use strict";
	var tm = $("#trademark").val();
	$("#"+tm+"HeaderBG").css("z-index",2);
	$("#"+tm+"HeaderBG").animate({"left":0}, 800, "linear");

	$(".img-map-area, .selectable, li:has(.selectable)").hover(function() { dynamicItemHover($(this)); }, function() { dynamicItemLeave($(this)); });
	$("li.selectable").click(function() { dynamicItemClick($(this)); event.stopImmediatePropagation(); });
	//$("#BrabenderMap .img-map-area, .img-thumb-overlay").click(function() { brabenderItemShow($(this)); event.stopImmediatePropagation(); });
	//$(".img-thumb-overlay").click(function() { brabenderItemShow()});
	$("#close-img").click(function() { brabenderHideItems(this); });
	emphasisTimer = setInterval(function() { trademarkAutoEmphasis(); }, 5000);
	trademarkAutoEmphasis();
	$("#trademarkThumbs>div>a").mouseenter(function() { tmThumbShow(this); });
	$("#trademarkThumbs>div").mouseleave(function() { tmThumbHide(this); });
	$("#trademarkThumbs .thumb").click(function() { tmThumbClick(this); });
}

function dynamicItemHover(el)
{
	"use strict";
	//On ignore la fonction si une visualisation est dÃ©clenchÃ©e
	if ($(".trademark-list li.lock").length > 0) { return; }
	
	//Suspension du dÃ©filement automatique
	clearInterval(emphasisTimer);
	emphasisTimer = null;
	
	//Suppression des classes de survol
	$(".trademark-list li, .target-item").removeClass("hovered");

	//RÃ©cupÃ©ration des attributs d'Ã©lÃ©ments liÃ©s de niveaux 1 et 2
	var target1 = $(el).data("target1");
	var target2 = $(el).data("target2");

	//Application des classes de survols aux Ã©lÃ©ments concernÃ©s
	$("[data-trigger="+target1+"], [data-trigger="+target2+"]").addClass("hovered");
}

function dynamicItemLeave(el)
{
	"use strict";

	//On ignore la fonction si une visualisation est dÃ©clenchÃ©e
	if ($(".trademark-list li.lock").length > 0) { return; }

	//Reprise du dÃ©filement automatique
	if (emphasisTimer === null)
	{
		emphasisTimer = setInterval(function() { trademarkAutoEmphasis(); }, 5000);
	}
}

function dynamicItemClick(el)
{
	"use strict";
	//Si l'Ã©lÃ©ment a des infos d'agrandissement d'image, on interrompt la fonction
	if ($(el).hasClass("enlarge-picture-link")) { return; }

	//RÃ©cupÃ©ration des attributs d'Ã©lÃ©ments liÃ©s de niveaux 1 et 2
	var target1 = $(el).data("target1");
	var target2 = $(el).data("target2");
	console.log(target1, target2);
	
	//DÃ©clenchement de l'Ã©vÃ©nement de clique sur les cibles
	if (target2 !== undefined)
	{
		$("[data-trigger="+target2+"]:not(li)").click();	
	}
	else
	{
		$("[data-trigger="+target1+"]:not(li)").click();
	}
}

function brabenderItemShow(el)
{
	"use strict";
	var target = $(el).data("target2");

	if (target === undefined)
	{
		target = $(el).data("target1");
		if (target === undefined)
		{
			target = $(el).parents("li").data("target1");
		}
	}
	//else { target = $(el).parents("li").data("target1"); }

	$("li.selectable[data-trigger="+target+"]").addClass("lock");
	$("#imgOverlay").addClass("darkened");
	$("#imgOverlay img").hide();
	$("#imgOverlay").show("fade");
	$("#"+target).show();
}

function brabenderHideItems(el)
{
	"use strict";
	var itemName = $(el).parent().children("img:visible").prop("id");
	$(".trademark-list li").removeClass("lock");
	$("#imgOverlay").removeClass("darkened").hide("fade");
	$("#imgOverlay img").hide("fade");
	$("[data-target="+itemName+"]").addClass("hovered");
}

function trademarkAutoEmphasis()
{
	"use strict";

	//Si un affichage en surimpression est actif, on ignore la fonction
	if ($(".lock").length > 0) { return; }

	//RÃ©cupÃ©ration de l'Ã©lÃ©ment mis en Ã©vidence
	var activeItem = $(".trademark-list li.selectable.hovered");
	//RÃ©cupÃ©ration des Ã©lÃ©ments cliquables
	var activableItems = $(".trademark-list li.selectable");

	//Si aucun Ã©lÃ©ment n'est actuellement en Ã©vidence
	if (activeItem.length === 0)
	{
		if (activableItems !== 0) {	activeItem = $(activableItems)[0]; }	//S'il existe des Ã©lÃ©ments cliquables, sÃ©lection du premier
		else { activeItem = null; return; }									//Aucun Ã©lÃ©mÃ©net cliquable
	}
	else	//ElÃ©ment(s) en Ã©vidence trouvÃ©
	{
		//Recherche de l'Ã©lÃ©ment cliquable suivant l'Ã©lÃ©ment en Ã©vidence
		var i = 0;
		var count = 0;
		while((count < $(activeItem).length) && (i < $(activableItems).length))
		{
			if ($(activableItems[i]).hasClass("selectable hovered")) { count++; }
			i++;
		}
		if (i === $(activableItems).length) { i = 0; }
		
		activeItem = $(activableItems[i]);	//Affectation du prochain Ã©lÃ©ment Ã  mettre en Ã©vidence
	}

	//RÃ©cupÃ©ration des Ã©lÃ©ments cibles Ã  mettre en Ã©vidence
	var target1 = $(activeItem).data("target1");
	var target2 = $(activeItem).data("target2");

	//Suppression des classes de survol
	$(".trademark-list li, .target-item").removeClass("hovered");

	//Application des classes de survols aux Ã©lÃ©ments concernÃ©s
	$("[data-trigger="+target1+"], [data-trigger="+target2+"]").addClass("hovered");
}

function fixImgOverlaySize()
{
	"use strict";
	var overlayW = $("#imgOverlay").width();
	var overlayH = $("#imgOverlay").height();
	$("#imgOverlay img").each(function() {
		$(this).show();
		if ($(this).outerHeight() > overlayH) { $(this).outerHeight(overlayH-20); }
		else {
			if ($(this).outerWidth() > overlayW) { $(this).outerWidth(overlayW-20); }
		}
		$(this).hide();
	});
	$("#imgOverlay").hide();
}

function tmThumbShow(el)
{
	"use strict";
	var thumb = $(el).parent();
	if ($(thumb).hasClass("shown")) { return; }
	$(thumb).addClass("shown");
	$(thumb).children(".thumb").css("display","block").animate({bottom: "100%", opacity: 1}, 200);
}

function tmThumbHide(el)
{
	"use strict";
	var thumb = $(el);
	if ($(thumb).hasClass("shown"))
	{
		$(thumb).removeClass("shown");
		$(thumb).children(".thumb").stop(true, true);
		$(thumb).children(".thumb").animate({bottom: "-100%", opacity: 0},200,function() { $(this).css("display","none"); });
	}
}

function tmThumbClick(el)
{
	"use strict";
	var thumb = $(el).parent();
	if ($(thumb).hasClass("shown"))
	{
		window.location.href = $(thumb).children("a").prop("href");
	}
}