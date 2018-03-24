zuix.controller(function (cp) {
    var menuOverlayShowing = false, menuButtonShowing = true;
    var menuButton, menuButtonClose, menuOverlay, itemsWrapper, menuItems;
    var scroller = null, currentOffset = 0;

    cp.create = function () {

        menuButton = cp.field('menu_button').hide()
            .on('click', toggleMenu);
        menuButtonClose = cp.field('menu_button_close').hide()
            .on('click', toggleMenu);
        menuOverlay = cp.field('menu_overlay').visibility('hidden')
            .on('click', toggleMenu);
        itemsWrapper = cp.field('items_wrapper');

        var items = zuix.$(cp.model().items).find('a');
        items.each(function (i,el) {
            var wrapperDiv = zuix.$(document.createElement('div'))
                .addClass('menu-item')
                .attr('data-ui-transition-delay', ((items.length()-i)/10)+'s')
                .append(el);
            itemsWrapper.append(wrapperDiv.get());
        });
        menuItems = itemsWrapper.find('div[class*="menu-item"]');

        // apply custom color to menu button
        if (cp.model()['button_color'] != null) {
            cp.view().find('.circle-button').css('background', cp.model()['button_color'].innerText);
        }
        if (cp.model()['icon_color'] != null) {
            cp.view().find('.circle-button').css('fill', cp.model()['icon_color'].innerText);
        }

        var scrollerName = cp.view().attr('data-ui-scroller');
        if (scrollerName != null) {
            scroller = zuix.field(scrollerName);
        } else {
            scroller = zuix.$(window);
        }
        if (scroller != null) {
            scroller.on('scroll', function (e) {
                var scrollTop = scroller.get() === window ? (document.documentElement.scrollTop || document.body.scrollTop) : scroller.get().scrollTop;
                if (menuButtonShowing && currentOffset < scrollTop && scrollTop > 1) {
                    hideButton();
                } else if (!menuButtonShowing && currentOffset > scrollTop) {
                    showButton();
                }
                currentOffset = scrollTop;
                if (menuOverlayShowing) {
                    toggleMenu();
                }
            });
        }

        zuix.using('component', 'https://genielabs.github.io/zuix/kit/extensions/animate_css', function(res, ctx){
            // show floating action button
            menuButton.animateCss('slideInUp').show();
        });

        cp.expose('showButton', showButton);
        cp.expose('hideButton', hideButton);

    };

    function hideButton() {
        menuButtonShowing = false;
        menuButton.animateCss('fadeOutDown', function () {
            this.hide();
        });
    }

    function showButton() {
        menuButtonShowing = true;
        menuButton.animateCss('fadeInUp').show();
    }

    function toggleMenu() {
        if (!menuOverlayShowing) {
            menuOverlayShowing = true;
            menuButton.animateCss('rubberBand', { duration: '0.3s' });
            menuButtonClose.animateCss('rotateIn', { duration: '0.3s' }, function () {
                menuButton.hide();
            }).show();
            menuOverlay.animateCss('fadeIn', { duration: '0.5s' }).visibility('');
            menuItems.each(function(p,el) {
                var transitionDelay = "0";
                if (this.attr('data-ui-transition-delay') != null) {
                    transitionDelay = this.attr('data-ui-transition-delay');
                }
                this.animateCss('bounceInRight', { duration: '0.5s', delay: transitionDelay });
            });
        } else if (menuOverlayShowing) {
            menuOverlayShowing = false;
            if (menuButtonShowing) {
                menuButtonClose.animateCss('rotateOut', { duration: '0.3s' }, function () {
                    this.hide();
                });
                menuButton.animateCss('fadeIn', { duration: '0.3s' });
            } else {
                menuButtonClose.animateCss('fadeOutDown', { duration: '0.3s' }, function () {
                    this.hide();
                });
            }
            menuOverlay.animateCss('fadeOut', { duration: '0.5s', delay: '0.2s' }, function () {
                this.visibility('hidden');
            });
            menuItems.each(function(p,el) {
                var transitionDelay = "0";
                if (this.attr('data-ui-transition-delay') != null) {
                    transitionDelay = this.attr('data-ui-transition-delay');
                }
                this.animateCss('fadeOutRight', { duration: '0.5s', delay: transitionDelay });
            });
            menuButton.show();
        }
    }
});