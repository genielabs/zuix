/**
 * ZUIX - scrollHelper Component
 *
 * @version 1.0.0 (2017-06-07)
 * @author Gene
 *
 */

zuix.controller(function (cp) {

    cp.init = function () {
        cp.options().html = false;
        cp.options().css = false;
    };

    cp.create = function () {
        cp.view().on('scroll', scrollCheck);
    };

    var scrollInfo = {
        lastTop: 0,
        timestamp: 0,
        timeout: null
    };

    function scrollCheck(e) {

        var now = new Date().getTime();
        // Footer reveal logic
        if (scrollInfo.timeout != null)
            clearTimeout(scrollInfo.timeout);
        var endScroll = e.target.firstChild.offsetHeight-e.target.offsetHeight-e.target.scrollTop;
        if ((endScroll <= 0 || e.target.scrollTop === 0)) {
            scrollInfo.timeout = setTimeout(function () {
                cp.trigger('scrollHelper', e.target.scrollTop === 0 ? 'hitTop' : 'hitBottom');
            }, 100);
        }
        // Footer hide logic
        else if (now - scrollInfo.timestamp > 200) {
            scrollInfo.timestamp = now;
            var dy = Math.abs(e.target.scrollTop - scrollInfo.lastTop);
            if (dy > 20) {
                cp.trigger('scrollHelper', 'moving');
                scrollInfo.lastTop = e.target.scrollTop;
            }
        }

    }

});