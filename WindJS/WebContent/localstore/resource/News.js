var News = function() {
    if (arguments[0]) {
        for (var p in arguments[0]) {
            this[p] = arguments[0][p];
        }
    }
};
News.db = window.openDatabase("News", "1.0", "Dess", 300000);
News.table = 'news';
News.dbError = function() { alert('transaction error!'); }
News.initTable = function() {
    News.db.transaction(function(tx) {
        var sql = 'CREATE TABLE IF NOT EXISTS ' + News.table + ' (id unique, title, link, content)';
        tx.executeSql(sql);
    }, News.dbError);
};
News.initTable();
News.prototype.save = function(news) {
    var Task = Jscex.Async.Task,
        sql = "INSERT INTO " + 
                News.table + 
                " (id, title, link, content) " +
                " VALUES (" +
                    '"' + this.id + '",' +
                    '"' + this.title + '",' +
                    '"' + this.link + '",' +
                    '"' + this.content + '"' +
                ")";
    return Task.create(function (t) {
        News.db.transaction(function(tx) {
            tx.executeSql(sql);
            t.complete("success", true);
        }, function(err) {
            t.complete("failure", err);
        });
    });
};
News.prototype.remove = function() {
    var Task = Jscex.Async.Task,
        sql = "DELETE FROM " + 
                News.table + 
                " WHERE id = '" + this.id + "'";
    return Task.create(function (t) {
        News.db.transaction(function(tx) {
            tx.executeSql(sql);
            t.complete("success", true);
        }, function(err) {
            t.complete("failure", err);
        });
    });
};
News.saveBatch = function(news) {
    $(news).each(function(idx, item) {
        News.findById(item.id, function(tx, results) {
            if (results.rows.length === 0) {
                News.save(item);
            }
        }, function(err) {
            console.info('failed to find by id' + item.id); console.info(err);
        });
    });
};
News.get = function(id) {
    var Task = Jscex.Async.Task,
        sql = "select * from " + News.table + " where id = '" + id + "'";
    return Task.create(function (t) {
        News.db.transaction(function(tx) {
            tx.executeSql(sql, [], function(tx, data) {
                var len = data.rows.length;
                if (len === 1) {
                    t.complete("success", data.rows.item(0));
                } else if (len > 1) {
                    t.complete("failure", new Error('more than one items were selected'));
                } else {
                    t.complete("success", null);
                }
            }, function(err) {
                t.complete("failure", err);
            });
        }, function(err) {
            t.complete("failure", err);
        });
    });
};

News.findAll = function() {
    var Task = Jscex.Async.Task,
        sql = "select * from " + News.table + " order by id desc";
    return Task.create(function (t) {
        News.db.transaction(function(tx) {
            tx.executeSql(sql, [], function(tx, data) {
                var items = [], len = data.rows.length;
                for (var i=0; i < len; i++) {
                    items.push(data.rows.item(i));
                }
                t.complete("success", items);
            }, function(err) {
                t.complete("failure", err);
            });
        }, function(err) {
            t.complete("failure", err);
        });
    });
};
News.parseXML2JSON = function (data) {
    var results = [];
    function parseItem2Acticle(item) {
        var obj = {
            title : $(item).find('title').text(),
            link : $(item).find('link').text(),
            content : $(item).find('description').text()
        };
        obj.id = obj.link;
        return obj;
    };
    $(data).find("item").each(function(idx, item) {
        results.push(parseItem2Acticle(item));
    });
    return results;
};
News.readRSS = function() {
    var Task = Jscex.Async.Task;
    return Task.create(function (t) {
        $.ajax({
            url : "http://bdworld2012.sinaapp.com/?feed=rss2",
            //url : './feed.xml',
            dataType : "xml",
            cache: false,
            crossDomain : true,
            success : function(data) {
                var items = News.parseXML2JSON(data);
                t.complete("success", items);
            }
        });
    });
};