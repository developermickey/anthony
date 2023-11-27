// JavaScript Document

$("document").ready(init);
var subMenu2Timer, subMenu3Timer = null;

function init()
{
	"use strict";
	if ($("#cookiesMessage").html() !== "") { $("#cookiesMessage input[type=button]").click(function () { acceptCookies($(this).parent()); }); }
	else { $("#cookiesMessage").remove(); }
	if ($("#browserMessage").html() !== "")
	{
		$("#browserMessage").dialog({
			buttons: [{text: "Ok", click: function() { $(this).dialog("destroy").remove(); } }],
			modal: true,
			title: "Version du navigateur",
			width: 400
		});
	}
	else { $("#browserMessage").remove(); }
	
	$("#menuItem2, #menuItem3").hover(function() { openSubmenu(this); }, function() {
		if (window.matchMedia("screen and (max-width: 480px)").matches) { return; }
		var el = this;
		if (el.id === "menuItem2") { subMenu2Timer = setTimeout(function() {closeSubmenu(el); }, 500); }
		if (el.id === "menuItem3") { subMenu3Timer = setTimeout(function() {closeSubmenu(el); }, 500); }
	});
	$("#langEN").click(function() {
		$("body").append("<div id=\"messagebox\"><p class=\"warning-msg\">English version is currently under development.</p></div>");
		$("#messagebox").dialog({
			buttons: [{"text": "Ok", click: function() { $(this).dialog("destroy").remove(); }}],
			modal: true,
			title: "Warning",
			width: 500
		});
	});
	$("video").bind("contextmenu", function() {return false;});
}

function acceptCookies(el)
{
	"use strict";
	$(el).hide("highlight", function() { acceptCookiesCallback(el); });
	$.cookie("cookies", "1", {expires: 30});
}

function acceptCookiesCallback(el)
{
	"use strict";
	$(el).remove();
}

function openSubmenu(el)
{
	"use strict";
	if (window.matchMedia("screen and (max-width: 480px)").matches) { return; }
	if (el.id === "menuItem2") { clearTimeout(subMenu2Timer); }
	if (el.id === "menuItem3") { clearTimeout(subMenu3Timer); }
	var items = $(el).find("li");
	$(el).children("ul").finish().css("height",items.length * 30).show("fade",200);
	$(items).each(function(i) { $(this).finish().animate({"opacity":1,"top":30*i},200,"swing"); });
}

function closeSubmenu(el)
{
	"use strict";
	var items = $(el).find("li");
	$(items).each(function() { $(this).finish().animate({"opacity":0,"top":0},200,"swing",function() { $(el).children("ul").hide("fade",200); }); });
}