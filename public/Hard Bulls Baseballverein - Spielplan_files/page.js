$(window).scroll(function() {
    var body = $("body");
    if ($(this).scrollTop() > 100) {
        body.addClass("cd-scroll");
    } else {
        body.removeClass("cd-scroll");
    }
});

var openMenu = function() {
    var body = $("body");
    if (body.hasClass("cd-megamenu-open")) {
        return;
    }

    var megaMenu = $(".cd-megamenu");
    var megaMenuButton = $(".cd-megamenu-button");
    var megaMenuContainer = $(".cd-megamenu-container");

    body.addClass("cd-megamenu-open");
    megaMenuButton.addClass("cd-megamenu-button-open");
    megaMenu.slideToggle(700, function() {
        /* Bei zu geringerer Höhe scrolling enablen durch setzen der Höhe */
        var windowHeight = $(window).innerHeight();
        var navigationHeight = megaMenuContainer.position().top;
        var height = windowHeight - navigationHeight;

        if (height < megaMenuContainer.height()) {
            megaMenuContainer.height(height);
        }
    });
};

var closeMenu = function() {
    var body = $("body");
    if (!body.hasClass("cd-megamenu-open")) {
        return;
    }

    var megaMenu = $(".cd-megamenu");
    var megaMenuButton = $(".cd-megamenu-button");
    var megaMenuContainer = $(".cd-megamenu-container");

    megaMenu.slideToggle(700, function() {
        body.removeClass("cd-megamenu-open");
        megaMenuButton.removeClass("cd-megamenu-button-open");
        megaMenuContainer.height("auto");
    });
};

var toggleMenu = function( event ) {
    event.stopPropagation();

    if ($("body").hasClass("cd-megamenu-open")) {
        closeMenu();
    } else {
        openMenu();
    }
};

$(".cd-megamenu-button").click(toggleMenu);
$(document).click(closeMenu);
function topFunction() {
    $('html, body').animate({scrollTop: 0}, 1200);
}
