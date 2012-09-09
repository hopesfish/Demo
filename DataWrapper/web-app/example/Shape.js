define([
    "dojo/_base/declare",
    "example/Resource"
], function(declare, resource) {
    var shapeModule = declare("example.Shape", [resource], {
        area: 0,
        calculate: function() {
            console.info('area of ' + this.get('name') + ' is '+ this.area);
            return this.area;
        }
    });

    example.Shape.URI = "/shape";
    example.Shape.list = example.Resource.list;
    example.Shape.retrieve = example.Resource.retrieve;

    return shapeModule;
});