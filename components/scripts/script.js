$(function() {
	var topoffset = 43;

	var isTouch = 'ontouchstart' in document.documentElement;

	var wheight = $(window).height(); //get height of the window

	$('.fullheight').css('height', wheight);

	$(window).resize(function() {
		var wheight = $(window).height(); //get height of the window
		$('.fullheight').css('height', wheight);
	});

	//smooth scrolling
	$('a[href*=#]:not([href=#])').click(
		function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
		    $('html,body').animate({
		      scrollTop: target.offset().top-topoffset
		    }, 1000);
		    return false;
		  } //target.length
		} //location hostname
	}); //on click

	//highlight navigation
	$(window).scroll(function() {
		var windowpos = $(window).scrollTop() + topoffset + 1;
		$('nav li a').removeClass('active');

		if (windowpos > $('#hotelinfo').offset().top) {
			$('nav li a').removeClass('active');
			$('a[href$="#hotelinfo"]').addClass('active');
		}

		if (windowpos > $('#rooms').offset().top) {
			$('nav li a').removeClass('active');
			$('a[href$="#rooms"]').addClass('active');
		}

		if (windowpos > $('#dining').offset().top) {
			$('nav li a').removeClass('active');
			$('a[href$="#dining"]').addClass('active');
		}

		if (windowpos > $('#events').offset().top) {
			$('nav li a').removeClass('active');
			$('a[href$="#events"]').addClass('active');
		}

		if (windowpos > $('#attractions').offset().top) {
			$('nav li a').removeClass('active');
			$('a[href$="#attractions"]').addClass('active');
		}
	});

	//set up ScrollMagic
	var controller = new ScrollMagic({
		globalSceneOptions: {
			triggerHook: "onLeave"
		}
	});

	//pin the navigation
	var pin = new ScrollScene({
		triggerElement: '#nav',
	}).setPin('#nav').addTo(controller);

	if(!isTouch) {
		//room animations
		var roomOrigin = {
			bottom: -700,
			opacity: 0,
			scale: 0
		}

		var roomDest = {
			repeat: 1,
			yoyo: true,
			bottom: 0,
			opacity: 1,
			scale: 1,
			ease: Back.easeOut
		}

		var roomtween = TweenMax.staggerFromTo(
			"#westminster .content",
			1, roomOrigin, roomDest);

		var pin = new ScrollScene({
			triggerElement: '#westminster',
			offset: -topoffset,
			duration: 500
		}).setPin('#westminster')
			.setTween(roomtween)
			.addTo(controller);

		//attractions animation
		var attractionstween = TweenMax.staggerFromTo('#attractions article', 1, { opacity: 0, scale: 0 }, {delay: 1, opacity: 1, scale: 1, ease: Back.easeOut});

		var scene = new ScrollScene({
			triggerElement: '#attractions',
			offset: -topoffset
		}).setTween(attractionstween)
			.addTo(controller);
	} //if NOT touch device

}); //on load