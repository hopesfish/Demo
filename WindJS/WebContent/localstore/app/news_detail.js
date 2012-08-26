$().ready(function() {
    if (!window.openDatabase) {
        alert('not supported cs-db!');
        return;
    };
    function render(data) {
        var html = '<div">' +
                   '<h3>' + data.title + '</h3>' +
                   '<content>' + data.content + '</content>' +
                   '</div>';
        $(".news").append(html);
    };
    function loadFromLocal() { 
        var aync = eval(Jscex.compile("async", function () {
            try {
                var id = window.location.href.split('?')[1];
                id = id.split('=')[1];
                var news = $await(News.get(id));
                render(news);
            } catch (ex) {
                console.error(ex);
            }
        }));
        aync().start();
    };
    loadFromLocal();
});