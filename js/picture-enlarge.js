// JavaScript Document

var images = null;
$(document).ready(pictureEnlargeInit);

function pictureEnlargeInit()
{
	"use strict";

	$(".enlarge-picture-link").unbind("click");
	$(".enlarge-picture-link").click(function(event) { event.preventDefault(); enlarge(this); } );
}

function enlarge(el)
{
	"use strict";
	$('body').prepend("<div id='bg-overlay'><div id='enlarged-picture-outer-frame'><div id='enlarged-picture-frame'><div id='enlarged-picture-close-button'></div><div id='enlarged-picture-inner-frame'><img id='enlarged-picture' src='css/img/enlarged-picture-ajax-loader.gif' /></div></div></div></div>");
	$('#bg-overlay').css('line-height', $('#bg-overlay').css('height'));
	
	var image = new Image();
	image.src =	$(el).data("imgsrc");
	$(image).on("load", function() { resizeEnlargedPicture(image.src, image.height, image.width); });
	$('#enlarged-picture-close-button').click(function() { $('#enlarged-picture-outer-frame').hide('fade', {}, 300, function() { $('#bg-overlay').remove(); }); });
}

function resizeEnlargedPicture(imageSrc, imageH, imageW)
{
	"use strict";
	var windowH = $(window).innerHeight();
	var windowW = $(window).innerWidth();

	$("#enlarged-picture").prop('src', imageSrc);
	
	if ((imageW / imageH) >= (windowW / windowH))
	{
		$("#enlarged-picture").css('height', 'auto');
		$("#enlarged-picture").css('width', 'auto');
		$("#enlarged-picture").css('max-height', 'none');
		$("#enlarged-picture").css('max-width',windowW - 100);
	}
	else
	{
		$("#enlarged-picture").css('width', 'auto');
		$("#enlarged-picture").css('height', 'auto');
		$("#enlarged-picture").css('max-width', 'none');
		$("#enlarged-picture").css('max-height',windowH - 100);
	}
}