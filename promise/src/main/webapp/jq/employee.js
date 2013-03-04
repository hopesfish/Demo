var db = openDatabase('example', '1.0', 'Employee', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('DROP TABLE EMPLOYEE');
    tx.executeSql('CREATE TABLE EMPLOYEE (id unique, name, age, onboard )');
    tx.executeSql('DELETE FROM EMPLOYEE');
});

var Employee = function() {
    var data = arguments[0] || {};
    $.extend(this, data);
};
Employee.all = function(opt) {
    var opt = opt || {local: true}, dfd = $.Deferred();
    if (opt.local === true) {
        throw new Error('not implemented!');
    } else {
        $.ajax({
            url: "/promise/api/employee",
            dataType: "json"
        }).then(function(items) {
            var employees = [];
            $(items).each(function(idx, item) {
                employees.push(new Employee(item)) 
            });
            dfd.resolve(employees);
        }, function(err) {
            dfd.reject(err);
        });
    }
    return dfd;
};

Employee.get = function(id, opt) {
    var opt = opt || {local: true}, dfd = $.Deferred();
    if (opt.local === true) {
        throw new Error('not implemented!');
    } else {
        $.ajax({
            url: "/promise/api/employee/" + id,
            dataType: "json"
        }).then(function(employee) {
            dfd.resolve(new Employee(employee));
        }, function(err) {
            dfd.reject(err);
        });
    }
    return dfd;
};

Employee.prototype.create = function(opt) {
    var opt = opt || {local: true}, dfd = $.Deferred();
    if (opt.local === true) {
        this.onboard = this.onboard || '';
        var sql = "INSERT INTO EMPLOYEE" + 
        " (id, name, age, onboard) " +
        " VALUES (" +
            '"' + this.id + '",' +
            '"' + this.name + '",' +
            '"' + this.age + '",' +
            '"' + this.onboard  + '"' +
        ")";
        console.info(sql);
        db.transaction(function (tx) {
            tx.executeSql(sql, [], function(tx, data) {
                console.info('done');
                dfd.resolve();
            }, function(err) {
                dfd.reject(err);
            });
        });
    } else {
        throw new Error('not implemented!');
    }
};
