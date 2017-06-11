/**
 * ZUIX - ListView Component
 *
 * @version 1.0.3 (2017-06-11)
 * @author Gene
 *
 */

zuix.controller(function (cp) {

    // Set the list items' creation method either to be
    // using HTML elements with data-ui-load attribute (htmlMode = true)
    // or by using zuix.createComponent(..) (htmlMode = false)
    var htmlMode = true;

    // Set list type: [ 'full', 'paged', 'incremental' ] (default: 'full')
    var MODE_FULL = 'full', MODE_PAGED = 'paged', MODE_INCREMENTAL = 'incremental';
    var listMode = MODE_FULL;

    // How many items per page to show/add (for 'paged' and 'incremental' modes) (default: 30)
    var itemsPerPage = 30;

    // Structure used to store component state info
    var statusInfo = {
        page: {
            current: 0,
            count: 0
        },
        items: {
            loaded: 0,
            count: 0
        }
    };

    // Objects data persistence
    var listItems = [];
    var itemOptions;

    cp.init = function () {
        cp.options().html = false;
        cp.options().css = false;
    };

    // TODO: describe the model and options used by this component
    cp.create = function () {
        // exposed methods through this component context
        cp.expose('config', configure);
        cp.expose('page', setPage);
        cp.expose('status', triggerStatus);
        cp.expose('more', function () {
            statusInfo.page.current++;
            cp.update();
        });
        cp.expose('clear', clear);
        // init
        clear();
    };

    cp.destroy = function () {
        clear();
    };

    cp.update = function() {

        var modelList = cp.model().itemList;
        if (modelList == null) return;

        statusInfo.page.count = pageCount();
        statusInfo.items.count = modelList.length;

        var startItem = statusInfo.page.current*itemsPerPage;
        var i = 0;
        if (listMode === MODE_PAGED && startItem > 0)
            i = startItem;

        for ( ; i < modelList.length; i++) {

            var dataItem = cp.model().getItem(i, modelList[i]);
            var id = dataItem.itemId;

            if ((listMode === MODE_FULL) ||
                (listMode === MODE_PAGED && i >= startItem && i < startItem+itemsPerPage) ||
                (listMode === MODE_INCREMENTAL && i < startItem+itemsPerPage)) {
                if (typeof listItems[id] === 'undefined') {
                    var container;
                    if (htmlMode) {
                        // This is the 'htmlMode' approach for creating the
                        // list_view components. This methods is way faster than
                        // `zuix.createComponent` since it just creates a `div` container.
                        // Using this approach we have to wait for the 'component:ready'
                        // event before obtaining a reference to the component context.
                        container = document.createElement('div');
                        // Set the component to load for this item
                        container.setAttribute('data-ui-load', dataItem.componentId);
                        container.setAttribute('data-ui-options', setItemOptions(i, dataItem.options));
                    } else {
                        // This other method is a bit slower since the `createComponent`
                        // method involves other extra checks.
                        // The main advantage is that we can obtain a reference to the
                        // component context before it is created. For very long lists,
                        // always prefer using the `htmlMode` approach.
                        container = zuix.createComponent(dataItem.componentId, dataItem.options).container();
                    }
                    // use a responsive CSS class if provided
                    if (dataItem.options.className != null) {
                        // this class should set the min-height property
                        container.classList.add(dataItem.options.className);
                    } else {
                        // set a temporary height for the container (for lazy load to work properly)
                        container.style['min-height'] = dataItem.options.height || '48px';
                    }
                    // register a callback to know when the component is actually loaded
                    var listener = function (itemIndex, el) {
                        var l = function () {
                            el.removeEventListener('component:ready', l);
                            // trigger status update event
                            statusInfo.items.loaded++;
                            triggerStatus();
                            // if all components have been loaded, then trigger 'complete' event
                            if (itemIndex === modelList.length - 1)
                                cp.trigger('complete');
                        };
                        container.addEventListener('component:ready', l);
                    }(i, container);
                    // keep track of already allocated items
                    listItems[id] = container;
                    // add item container to the list-view, the component will be lazy-loaded later as needed
                    cp.view().insert(i-startItem, listItems[id]);
                } else if (!dataItem.options.static) {
                    // update existing item model's data
                    // TODO: should check if the data in the model has changed before calling this
                    // TODO: should also call the `model` method in the `zuix.context` callback
                    zuix.context(listItems[id]).model(dataItem.options.model);
                }
            }

            if (typeof listItems[id] !== 'undefined') {
                if ((listMode === MODE_PAGED && i < statusInfo.page.current * itemsPerPage) || (listMode !== MODE_FULL && i > ((statusInfo.page.current + 1) * itemsPerPage - 1))) {
                    listItems[id].style['display'] = 'none';
                } else {
                    listItems[id].style['display'] = '';
                }
            }

            if ((listMode === MODE_PAGED || listMode === MODE_INCREMENTAL) && i > startItem+itemsPerPage)
                break;

        }

        // trigger status update event
        triggerStatus();

        // `componentize` is required to process lazy-loaded items
        zuix.componentize(cp.view());

    };

    function setPage(number) {
        if (!isNaN(number) && number >= 0 && number < pageCount()) {
            if (listMode == MODE_PAGED)
                clearPage(statusInfo.page.current);
            statusInfo.page.current = parseInt(number);
            cp.update();
        }
        return statusInfo.page.current;
    }

    function clearPage(number) {
        var modelList = cp.model().itemList;
        if (modelList == null) return;
        var startItem = number*itemsPerPage;
        for(var i = startItem; i < listItems.length && i < startItem+itemsPerPage; i++) {
            var dataItem = cp.model().getItem(i, modelList[i]);
            var id = dataItem.itemId;
            if (typeof listItems[id] !== 'undefined')
                listItems[id].style['display'] = 'none';
        }
    }

    function triggerStatus() {
        cp.trigger('status', statusInfo);
    }

    function pageCount() {
        return Math.ceil(cp.model().itemList.length / itemsPerPage);
    }

    function setItemOptions(i, options){
        itemOptions['opt_'+i] = options;
        return 'list_view_opts.'+cp.context.contextId.replace(/-/g, '_')+'.opt_'+i;
    }

    function configure(options) {
        if (options.itemsPerPage != null)
            itemsPerPage = options.itemsPerPage;
        if (options.listMode != null)
            listMode = options.listMode;
        if (options.htmlMode != null)
            htmlMode = options.htmlMode;
    }

    function clear() {
        // TODO: find a better solution for storing data globally (eg. add method zuix.store(....) - localStorage)
        // globally store list view item options
        window.list_view_opts = window.list_view_opts || {};
        itemOptions = window.list_view_opts[cp.context.contextId.replace(/-/g, '_')] = {};
        // dispose components
        for (var i = 0; i < listItems.length; i++) {
            zuix.unload(listItems[i]);
        }
        listItems.length = 0;
        statusInfo.page.current = 0;
        statusInfo.page.count = 0;
        statusInfo.items.loaded = 0;
        statusInfo.items.count = 0;
        // clear the view
        cp.view().html('');
    }
});
