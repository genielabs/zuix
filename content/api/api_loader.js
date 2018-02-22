zuix.controller(function (cp) {

    cp.create = function () {

        var apiName = cp.view().attr('data-ui-api');
        cp.view().html('Loading '+apiName+' API...');

        // download the jsDoc data file and HTML-format it.
        zuix.$.ajax({
            url: 'content/api/data/'+apiName+'.json?'+Date.now(),
            success: function(json) {
                cp.view().html('');
                var dox = JSON.parse(json);

                var html = '';
                var sectionHtml = {
                    'methods': {},
                    'properties': {},
                    'constructor': {},
                    'types': []
                };

                var apiDocs = {};
                apiDocs.name = apiName;
                apiDocs.constructor = null;
                apiDocs.parameters = []; // constructor parameters
                apiDocs.methods = [];
                apiDocs.properties = [];
                apiDocs.types = []; // custom object/types used in this object

                zuix.$.each(dox, function() {

                    var skipItem = (this.isPrivate || (this.ctx != null && (this.ctx.name !== apiName && this.ctx.cons !== apiName)) || this.tags == null || this.tags.length === 0);
                    if (skipItem)
                        return true;

                    if (this.isConstructor === true) {
                        apiDocs.constructor = addConstructor(this);
                        return true;
                    }

                    var apiMember = (!this.isPrivate && this.ctx != null && (this.ctx.cons === apiName));
                    if (apiMember) {
                        apiDocs.methods.push(addMember(this));
                        return true;
                    }

                    var itemType = this.tags[0].type;
                    switch (itemType) {
                        case 'param':
                            apiDocs.parameters.push(addType(this));
                            break;
                        case 'typedef':
                            var type = addType(this);
                            if (type.name === apiName)
                                apiDocs.properties = type.properties;
                            else
                                apiDocs.types.push(type);
                            break;
                    }


                    //sectionHtml[currentSection].description = this.description.full || this.description;


                    /*
                    "isPrivate": false,
                    "isConstructor": false,
                    "isClass": false,
                    "isEvent": false,
                    "ignore": false,
                    "line": 35,
                    "codeStart": 43
                    */


                    /*

                    zuix.$.each(this.tags, function () {

                        if (this.type === 'param')
                            params += this.name + ', ';
                        else if (this.type === 'typedef')
                            apiMember = isTypeDef = true;
                        else if (this.type === 'constructor')
                            apiMember = isConstructor = true;


                    });

                    //var isTypeDef = false;
                    //var isConstructor = false;
                    //var apiMember = (!this.isPrivate && this.ctx != null && (this.ctx.cons === apiName));


                    var params; params = '';
                    zuix.$.each(this.tags, function () {
                        if (this.type === 'param')
                            params += this.name + ', ';
                        else if (this.type === 'typedef')
                            apiMember = isTypeDef = true;
                        else if (this.type === 'constructor')
                            apiMember = isConstructor = true;parameter.name
                    });
                    var currentSection = isConstructor ? 'constructor' : 'methods';
                    if (apiMember) {

                        if (params.length > 0)
                            params = params.substring(0, params.length-2);
                        if (this.ctx != nulil)
                            sectionHtml[currentSection] += '<div class="title"><h5><i class="material-icons">expand_more</i><code>'+this.ctx.name+'('+params+')</code></h5></div>';
                        sectionHtml[currentSection] += '<div class="container"><div class="details'+(isTypeDef || isConstructor ? '' : ' collapsed')+'">';

                        var pl = { content: this.description.full };
                        cp.trigger('html:parse', pl, true);
                        sectionHtml[currentSection] += '<div class="description">'+pl.content+'</div>';

                        var currentType = '', example = '';
                        zuix.$.each(this.tags, function () {

                            var typeName = this.type.toLowerCase();
                            if (typeName.indexOf('return') >= 0)
                                typeName = "RETURNS";
                            else if (typeName.indexOf('param') >= 0)
                                typeName = "PARAMETERS";
                            else if (typeName.indexOf('property') >= 0) {
                                typeName = "PROPERTIES";
                                currentSection = 'properties';
                            } else if (typeName.indexOf("example") === 0) {
                                example += this.string;
                                return true;
                            } else return true;

                            if (currentType !== typeName) {
                                currentType = typeName;
                                sectionHtml[currentSection] += '<p><strong><small>' + typeName + '</small></strong></p> '
                            }

                            sectionHtml[currentSection] += '<div class="api-member-details">';

                            var types = '', t = this.types;
                            zuix.$.each(t, function (i) {
                                if (linkedApi.indexOf(this.toString()) >= 0)
                                    types += '<a href="#ZUIX_API--'+this+'">'+this.replace(/</g,"&lt;").replace(/>/g,"&gt;")+'</a>';
                                else
                                    types += this.toString().replace(/</g,"&lt;").replace(/>/g,"&gt;");
                                if (i < t.length-1)
                                    types +=' | ';
                            });

                            if (this.optional)
                                sectionHtml[currentSection] += ' <strong class="mdl-color-text--grey-500">optional</strong>';

                            sectionHtml[currentSection] += ' <em class="mdl-color-text--grey-700">{'+types+'}</em>';

                            //noinspection JSPotentiallyInvalidUsageOfThis
                            pl = { content: this.description };
                            if (this.name != null)
                                pl.content = '<code>'+ this.name.replace('[','').replace(']','') +'</code>: '+pl.content;
                            cp.trigger('html:parse', pl, true);
                            if (pl.content.indexOf('<p>') === -1)
                                pl.content = '<p>'+pl.content+'</p>';
                            sectionHtml[currentSection] += pl.content;

                            sectionHtml[currentSection] += '</div>';

                            if (isConstructor) {
                                isConstructor = false;
                                currentSection = 'methods';
                            }
                            pl = { content: example };
                            cp.trigger('html:parse', pl, true);
                            sectionHtml[currentSection] += '<div class="example">'+pl.content+'</div>';

                        });

                        if (example !== '') {
                            pl = { content: example };
                            cp.trigger('html:parse', pl, true);
                            sectionHtml[currentSection] += '<div class="example">'+pl.content+'</div>';
                        }

                        sectionHtml[currentSection] += '</div>';
                        sectionHtml[currentSection] += '</div><!-- details -->';

                    }

                    //if (!isTypeDef)
                    //    html += sectionHtml['methods'];


                    */

                    //console.log(sectionHtml);

                });

                console.log(apiDocs);


                zuix.load('content/api/api_template', {
                    data: apiDocs,
                    markdown: cp.options().markdown,
                    prism: cp.options().prism,
                    ready: function (ctx) {
                        cp.view().append(ctx.view());
                    }
                });

                /*
                cp.view()
                    .html(html)
                    .find('div.title')
                    .css('cursor', 'pointer')
                    .on('click', function () {
                        expandItem(this);
                    });
                cp.trigger('view:process', cp.view(), true);
                */

            },
            error: function() {
                cp.view().html('Error loading '+apiName+' API!');
            }
        });

    };

    function addConstructor(constructor) {
        var item = {};
        item.name = constructor.ctx.name;
        item.description = constructor.description.full || constructor.description;
        item.parameters = [];
        item.return = {};
        zuix.$.each(constructor.tags, function (i) {
            var param = getParam(this);
            if (this.type === 'param') {
                item.parameters.push(param);
            } else if (this.type === 'example') {
                item.example = this.string;
            } else if (this.type === 'return') {
                item.return = param;
            }
        });
        return item;
    }

    function addMember(member) {
        var item = {};
        item.name = member.ctx.name;
        item.description = member.description.full || member.description;
        item.parameters = [];
        item.return = [];
        item.example = '';
        zuix.$.each(member.tags, function () {
            var param = getParam(this);
            if (this.type === 'param') {
                item.parameters.push(param);
            } else if (this.type === 'example') {
                item.example = this.string;
            } else if (this.type === 'return') {
                item.return.push(param);
            }
        });
        return item;
    }

    function addType(typeDef) {
        var item = {};
        item.name = '';
        item.description = typeDef.description.full || typeDef.description;
        item.properties = [];
        item.example = '';
        zuix.$.each(typeDef.tags, function () {
            if (this.type === 'property') {
                var property = getParam(this);
                item.properties.push(property);
            } else if (this.type === 'example') {
                item.example = this.string;
            } else if (this.type === 'typedef') {
                item.name = this.string;
                if (item.name.indexOf('}') > 0)
                    item.name = item.name.substring(item.name.lastIndexOf('}')+1).trim();
            }
        });
        return item;
    }

    function getParam(parameter) {
        var param = {};
        param.name = parameter.name != null ? parameter.name.replace('[','').replace(']','') : null;
        param.description = parameter.description;
        param.types = parameter.types;
        param.optional = parameter.optional;
        return param;
    }

});