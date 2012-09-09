define([
    "dojo/_base/declare",
    "example/Shape"
], function(declare, shape) {
    var squareModule = declare("example.Square", [shape], {
        side: 0,
        calculate: function() {
            this.area = this.side * this.side;
            return this.inherited(arguments);
        }
    });

    example.Square.URI = "/square";
    example.Square.list = example.Resource.list;
    example.Square.retrieve = example.Resource.retrieve;

    return squareModule;
});