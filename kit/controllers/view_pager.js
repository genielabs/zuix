// Basic image carousel
zuix.controller(function (cp) {
    var currentPage = -1, oldPage = 0;
    var slideTimeout = null, slideInterval = 3000;
    var LAYOUT_HORIZONTAL = 1, LAYOUT_VERTICAL = 2;
    var layoutType = LAYOUT_HORIZONTAL;
    var SLIDE_DIRECTION_FORWARD = 1, SLIDE_DIRECTION_BACKWARD = -1;
    var slideDirection = SLIDE_DIRECTION_FORWARD;
    /** @typedef {ZxQuery} */
    var pageList = null;

    cp.init = function() {
        cp.options().html = false;
        cp.options().css = false;
        if (cp.options().verticalLayout === true)
            layoutType = LAYOUT_VERTICAL;
        if (cp.options().slideInterval != null)
            slideInterval = cp.options().slideInterval;
    };

    cp.create = function () {
        cp.view().css({
            'position': 'relative',
            'overflow': 'hidden'
        });
        // gestures handling
        zuix.load('https://genielabs.github.io/zuix/kit/controllers/gesture_helper', {
            view: cp.view(),
            on: {
                'gesture:touch': function (e, tp) {
                    dragStart();
                },
                'gesture:pan': function (e, tp) {
                    stopAutoSlide();
                    if (layoutType === LAYOUT_HORIZONTAL)
                        dragShift(tp.shiftX, 0, '');
                    else
                        dragShift(0, tp.shiftY, '');
                },
                'gesture:release': function (e, tp) {
                    dragStop();
                    resetAutoSlide();
                },
                'gesture:tap': function (e, tp) {
                    //tp.cancel();
                },
                'gesture:swipe': function (e, tp) {
                    switch(tp.direction) {
                        case 'left':
                        case 'up':
                            slideDirection = SLIDE_DIRECTION_BACKWARD;
                            break;
                        case 'right':
                        case 'down':
                            slideDirection = SLIDE_DIRECTION_FORWARD;
                            break;
                    }
                    setPage(currentPage+slideDirection);
                }
            }
        });
        // setup elements
        pageList = cp.view().children();
        pageList.each(function (i, el) {
            this.css({
                'position': 'absolute',
                'left': 0,
                'top': 0,
                'right': 0,
                'bottom': 0
            });
        });
        var initElements = function() {
            var viewWidth = cp.view().get().clientWidth || cp.view().get().getBoundingClientRect().width;
            var viewHeight = cp.view().get().clientHeight || cp.view().get().getBoundingClientRect().height;
            if (viewWidth === 0 || viewHeight === 0) {
                setTimeout(initElements, 100);
                return;
            }
            pageList.each(function (i, el) {
                if (layoutType === LAYOUT_HORIZONTAL)
                    translate(this, i * viewWidth, 0);
                else
                    translate(this, 0, i * viewHeight);
            });
            // set starting page
            setPage(0);
            // start automatic slide
            if (pageList.length() > 1) {
                resetAutoSlide();
            }
        };
        cp.view().on('resize', function () {
            initElements();
        });
        initElements();
        cp.expose('page', function (number) {
            if (number == null)
                return currentPage;
            else setPage(number);
        }).expose('slide', function (activate) {
            if (activate === true)
                resetAutoSlide();
            else stopAutoSlide();
        }).expose('layout', function (mode) {
            if (mode === 'vertical')
                layoutType = LAYOUT_VERTICAL;
            else layoutType = LAYOUT_HORIZONTAL;
            initElements();
        });
    };

    function slideNext() {
        setPage(currentPage+slideDirection);
        resetAutoSlide();
    }

    function resetAutoSlide() {
        stopAutoSlide();
        if (cp.options().autoSlide != 'false')
            slideTimeout = setTimeout(slideNext, slideInterval);
    }

    function stopAutoSlide() {
        if (slideTimeout != null)
            clearTimeout(slideTimeout);
    }

    function setPage(n) {
        oldPage = currentPage;
        if (n < 0) {
            slideDirection = SLIDE_DIRECTION_FORWARD;
            n = 0;
        } else if (n >= pageList.length()) {
            slideDirection = SLIDE_DIRECTION_BACKWARD;
            n = pageList.length()-1;
        }
        currentPage = n;
        var el = pageList.eq(n);
        var data = getData(el);
        dragStart();
        dragShift(-data.transform.translate.x, -data.transform.translate.y, '0.5s ease');
        resetAutoSlide();
        if (currentPage !== oldPage)
            cp.trigger('page:change', currentPage);
    }

    function getData(el) {
        var data = el.get().data = el.get().data || {};
        var transform = data.transform = data.transform || {};
        transform.translate = transform.translate || { x: 0, y: 0 };
        return data;
    }

    function dragStart() {
        pageList.each(function (i,el) {
            var data = getData(this);
            data.dragStart = { x: data.transform.translate.x, y: data.transform.translate.y };
            if (i == currentPage)
                this.css('z-index', 1);
            else
                this.css('z-index', 0);
        });
    }

    function dragShift(x, y, transition) {
        pageList.each(function (i,el) {
            var data = getData(this);
            translate(this, data.dragStart.x+x, data.dragStart.y+y, transition);
        });
    }

    function dragStop() {
        setPage(currentPage);
    }

    function translate(el, x, y, transition) {
        var data = getData(el);
        data.transform.translate = { 'x': x, 'y': y };
        var translation = 'translate('+x+'px,'+y+'px)';
        el.css({
            '-webkit-transform': translation,
            '-ms-transform': translation,
            '-o-transform': translation,
            'transform': translation,
            '-webkit-transition': transition,
            '-moz-transition': transition,
            '-o-transition': transition,
            'transition': transition
        });
    }

});