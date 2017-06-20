zuix.controller(function (cp) {
    var toolbar, toolOptions, fab, actions;
    var open = false; // initial state

    cp.init = function () {
        cp.options().html = false;
        cp.options().css = false;
    };

    cp.create = function () {

        cp.expose('showMenu', showMenu);
        cp.expose('hideMenu', hideMenu);
        cp.expose('open', function (doOpen) {
            if (doOpen != null)
                toolbarToggle(doOpen);
            else return open;
        });
        cp.expose('close', function () {
            toolOptions.get().blur();
        });

        // toolbar view
        toolbar = cp.view();
        toolOptions = toolbar.find('.options');
        toolOptions.on('blur keyup', function (e) {
            if (e.type === 'keyup') {
                this.get().blur();
                return;
            }
            setTimeout(function () {
                if (open) toolbarToggle();
            }, 100);
        }).attr('tabIndex', '-1');
        // fab button
        fab = toolbar.find('.menu');
        fab.on('click', function () {
            if (!open) toolbarToggle();
        });
        // actions buttons
        actions = toolbar.find('.options')
            .hide()
            .children();
        actions.each(function (index, item) {
            this.on('click', function () {
                cp.trigger('item:click', index);
            });
        });

    };

    cp.destroy = function () {

        actions.each(function (i, item) {
            this.off('click');
        });
        fab.off('click');
        toolOptions.off('blur');

    };

    // Private Members

    function showMenu(anim) {
        toolbar.show();
        fab.animateCss(typeof anim === 'string' ? anim : 'flipInY', { delay: '0.3s', duration: '0.3s' }, function () {
            toolbar.show();
        });
    }
    function hideMenu(anim) {
        if (open) toolbarToggle();
        fab.show().animateCss(typeof anim === 'string' ? anim : 'flipOutY', { duration: '0.3s' }, function () {
            toolbar.hide();
        });
    }

    function toolbarToggle(doOpen) {
        var duration = 0.5;
        open = typeof doOpen !== 'undefined' ? doOpen : !open;
        if (open)
            toolOptions.show().animateCss('bounceInUp', { duration: duration+'s' }, function () {
                this.get().focus();
                open = true;
            });
        else
            toolOptions.show().animateCss('bounceOutDown', { duration: duration+'s' }, function () {
                this.hide();
                open = false;
            });
        fab.animateCss('rubberBand', { duration: duration+'s' });
    }

});