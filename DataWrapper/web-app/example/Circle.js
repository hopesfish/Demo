define([
    "dojo/_base/declare",
    "example/Shape"
], function(declare, shape) {
    var crcleModule = declare("example.Circle", [shape], {
        radius: 0,
        calculate: function() {
            this.area = this.radius * this.radius * 3.14;
            return this.inherited(arguments);
        }
    });

    example.Circle.URI = "/circle";
    example.Circle.list = example.Resource.list;
    example.Circle.retrieve = example.Resource.retrieve;

    return crcleModule;
});