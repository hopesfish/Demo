var db = openDatabase('example', '1.0', 'Employee', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS EMPLOYEE (id unique, name, age, onboard )');
    tx.executeSql('DELETE FROM EMPLOYEE');
});

var Employee = function() {
    var data = arguments[0] || {};
    $.extend(this, data);
};

Employee.all = function(opt) {
    var opt = opt || {local: true}, deferred = new Deferred();
    if (opt.local === true) {
        throw new Error('not implemented!');
    } else {
        $.ajax({
            url: "/async/api/employee",
            dataType: "json"
        }).then(function(items) {
            var employees = [];
            $(items).each(function(idx, item) {
                employees.push(new Employee(item)) 
            });
            deferred.call(employees);
        }, function(err) {
            deferred.fail(err);
        });
    }
    return deferred;
};

Employee.get = function(id, opt) {
    var opt = opt || {local: true}, deferred = new Deferred();
    if (opt.local === true) {
        throw new Error('not implemented!');
    } else {
        $.ajax({
            url: "/async/api/employee/" + id,
            dataType: "json"
        }).then(function(employee) {
            deferred.call(new Employee(employee));
        }, function(err) {
            deferred.fail(err);
        });
    }
    return deferred;
};

Employee.prototype.create = function(opt) {
    var opt = opt || {local: true}, deferred = new Deferred();
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
        db.transaction(function (tx) {
            tx.executeSql(sql, [], function(tx, data) {
                deferred.call({});
            }, function(err) {
                deferred.fail(err);
            });
        });
    } else {
        throw new Error('not implemented!');
    }
    return deferred;
};
