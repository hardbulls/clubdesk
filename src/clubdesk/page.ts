import './page.css';

import { topFunction } from "./page/top-function";

interface CustomWindow extends Window {
    topFunction?: () => void;
}

export function clubdesk() {
    window.addEventListener('scroll', function() {
        const body = document.body;

        if (window.scrollY > 100) {
            body.classList.add('cd-scroll');
        } else {
            body.classList.remove('cd-scroll');
        }
    });

    const openMenu = function() {
        const body = jQuery("body");
        if (body.hasClass("cd-megamenu-open")) {
            return;
        }

        const megaMenu = jQuery(".cd-megamenu");
        const megaMenuButton = jQuery(".cd-megamenu-button");
        const megaMenuContainer = document.querySelector(".cd-megamenu-container") as HTMLDivElement;

        body.addClass("cd-megamenu-open");
        megaMenuButton.addClass("cd-megamenu-button-open");
        megaMenu.slideToggle(700, function() {
            /* Bei zu geringerer Höhe scrolling enablen durch setzen der Höhe */
            const windowHeight = window.innerHeight;

            const navigationHeight = megaMenuContainer.getBoundingClientRect().top;
            const height = windowHeight - navigationHeight;

            if (height < megaMenuContainer.offsetHeight) {
                megaMenuContainer.style.height = height + "px";
            }
        });
    };

    const closeMenu = function() {
        const body = jQuery("body");

        if (!body.hasClass("cd-megamenu-open")) {
            return;
        }

        const megaMenu = jQuery(".cd-megamenu");
        const megaMenuButton = jQuery(".cd-megamenu-button");
        const megaMenuContainer = jQuery(".cd-megamenu-container");

        megaMenu.slideToggle(700, function() {
            body.removeClass("cd-megamenu-open");
            megaMenuButton.removeClass("cd-megamenu-button-open");
            megaMenuContainer.height("auto");
        });
    };

    const toggleMenu = function( event ) {
        event.stopPropagation();

        if (jQuery("body").hasClass("cd-megamenu-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    jQuery(".cd-megamenu-button").click(toggleMenu);
    jQuery(document).click(closeMenu);


}
(window as CustomWindow).topFunction = topFunction;

clubdesk();
