$().ready(function() {
    if (!window.openDatabase) {
        alert('not supported cs-db!');
        return;
    };
    function render(data, append) {
        var append = typeof append === 'boolean' ? append : true;
        $(data).each(function(idx, item) {
            var html = '<li data-icon="arrow-r">'
                    + '<a target="external" href="news_detail.html?id='
                    + item.id + '"><strong>'
                    + item.title + '</strong></a></li>';
            if (append) {
                $(".news ul").append(html);
            } else {
                if ($('.news ul li').length > 0) {
                    $(html).insertBefore($(".news ul li:first"));
                } else {
                    $(".news ul").append(html);
                }
            }
        });
        $(".news ul").listview().listview('refresh');
    };
    function loadFromRSS() {
        var aync = eval(Jscex.compile("async", function () {
            try {
                var items = $await(News.readRSS());
                for(var i=0; i<items.length; i++) {
                    var item = items[i], news = new News(item);
                    var flag = $await(News.get(item.id));
                    if (!flag) {
                        $await(news.save());
                        render(item);
                    }
                }
            } catch(ex) {
                throw ex;
            }
        }));
        aync().start();
    };
    function loadFromLocal() { 
        var aync = eval(Jscex.compile("async", function () {
            try {
                var news = $await(News.findAll());
                render(news);
            } catch (ex) {
                console.error(ex);
            }
        }));
        aync().start();
    };
    $('#refreshBtn').bind('click', function() {
        loadFromRSS();
    });
    loadFromLocal();
});