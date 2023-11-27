// JavaScript Document

var diaporamaHandle = null;
var diapoTimerDelay = 5000;

$("document").ready(homeInit);

function homeInit()
{
	"use strict";

	$("#diaporamaButtons div").click(function(event) {
		clearInterval(diaporamaHandle);
		diaporamaHandle = setInterval(function() { homePageDiapo(); }, diapoTimerDelay);
		homePageMutate(event.currentTarget);
	});
	$("#thumbs > div").click(function() {
		window.location.href = $(this).data("tm")+".html";
	});
	homePageMutate($("#thumbs div:first-child"));
	diaporamaHandle = setInterval(function() { homePageDiapo(); }, diapoTimerDelay);
}

function homePageDiapo()
{
	"use strict";
	if ($("#thumbs > div.active + div").length === 1) { homePageMutate($("#thumbs > div.active + div")); }
	else { homePageMutate($("#thumbs div:first-child")); }
}

function homePageMutate(el)
{
	"use strict";
	var tm = $(el).data("tm");

	$("#"+tm+"HeaderBG").css("z-index",2);
	$("#"+tm+"HeaderBG").animate({"left":0}, 500, "linear", function() { 
		$(".header-bg").css("z-index",1);
		$(".header-bg:not(#"+tm+"HeaderBG)").css("left",-1920);
	});

	$("#diaporamaContent div:not(#"+tm+"Diapo)").css("opacity",0);
	$("#"+tm+"Diapo").css("opacity",1);
	
	$(".diaporama-text:not(#"+tm+"DiaporamaText)").css("opacity",0);
	$("#"+tm+"DiaporamaText").css("opacity",1);

	$("#diaporamaButtons > div").removeClass("active");
	$("#"+tm+"Button").addClass("active");

	$("#thumbs>div").removeClass("active");
	$("#"+tm+"ThumbFrame").addClass("active");

	$("#diaporamaTimerFrame").removeClass().addClass(tm);
	$("#diaporamaTimerFrame .progress-bar").stop(true, true).css("left","-100%").animate({"left":0},diapoTimerDelay,"linear");
	
}