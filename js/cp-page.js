// JavaScript Document

$("document").ready(cyndiProcessInit);
var emphasisTimer = null;

function cyndiProcessInit()
{
	"use strict";
	$("#defaultHeaderBG").animate({"left":0}, 500, "linear");
	emphasisTimer = setInterval(function() { cpAutoEmphasis(); }, 2000);
	cpAutoEmphasis();
	$(".right>#sectors>ul>li").click(function() { cpManualEmphasis(this); });
}

function cpAutoEmphasis()
{
	"use strict";
	console.log($(".right li:hover"));
	if ($(".right li:hover").length > 0) { return; }
	var activeItem = $(".right li.emphasis");
	if (activeItem.length === 0) { activeItem = $(".right>#sectors>ul>li:first-child"); }
	else { activeItem = $(".right li.emphasis + li"); }
	if (activeItem.length === 0) { activeItem = $(".right>#sectors>ul>li:first-child"); }
	var item = $(activeItem).data("item");
	$(".right>#sectors>ul>li, div.target-item").removeClass("emphasis");
	$(activeItem).addClass("emphasis");
	$("div[data-item="+item+"]").addClass("emphasis");
}

function cpManualEmphasis(el)
{
	"use strict";
	var item = $(el).data("item");
	$(".right>#sectors>ul>li, div.target-item").removeClass("emphasis");
	$(el).addClass("emphasis");
	$("div[data-item="+item+"]").addClass("emphasis");	
}