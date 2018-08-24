zuix.controller(function(cp) {
    cp.create = function() {
        cp.view('.backdrop').css('background-image', 'url("https://picsum.photos/352/288/?random&ts='+(new Date().getTime())+'")');
    };
});
