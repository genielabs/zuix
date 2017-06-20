/**
 * ZUIX - AnimateCSS extension for {ZxQuery} objects
 *
 * @version 1.0.1 (2017-06-16)
 * @author Gene
 *
 */

zuix.controller(function (cp) {

    cp.init = function () {

        cp.options().html = false;
        cp.options().css = false;

        // Load library from CDN if not already included in the document
        if (!zuix.$.classExists('.animated .bounce')) {
            zuix.using('style', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
        }

    };

    /**
     * Extension function ZUIX+AnimateCSS
     *
     * @param {string} animationName
     * @param {object} [param1] optional animation options or animation-end callback
     * @param {function} [param2] optional animation-end callback when param1 is the animation options object
     * @return {zuix.$.ZxQuery}
     */
    zuix.$.ZxQuery.prototype.animateCss = function(animationName, param1, param2) {
        var callback, options;

        if (typeof param2 === 'function') {
            options = param1;
            callback = param2;
        } else {
            if (typeof param1 === 'function')
                callback = param1;
            else options = param1;
        }

        var prefixes = ['-webkit', '-moz', '-o', '-ms'];
        for (var key in options)
            for (var p in prefixes)
                this.css(prefixes[p] + '-animation-' + key, options[key]);
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        var _t = this;

        if (typeof animationName !== 'function') {
            // stops any previously running animation
            if (this.hasClass('animated')) {
                this.css('transition', ''); // TODO: <-- is this really needed?
                this.trigger('animationend');
            }
            // TODO: should run all the following code for each element in the ZxQuery selection
            this.addClass('animated ' + animationName);
        } else callback = animationName;

        this.one(animationEnd, function () {
            this.removeClass('animated ' + animationName);
            for(var key in options)
                for (var p in prefixes)
                    _t.css(prefixes[p] + '-animation-' + key, '');
            if (typeof callback === 'function')
                callback.call(_t, animationName);
        });

        return this;
    };

});
