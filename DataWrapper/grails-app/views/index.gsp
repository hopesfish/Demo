<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Example</title>
<script>
    dojoConfig= {
        async: true,
        packages: [{
            name: "example",
            location: "<%=request.getContextPath()%>/example"
        }],
        contextPath: "<%=request.getContextPath()%>"
    };
</script>
<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dojo/dojo.js"></script>
<script>
require(["example/Shape", "example/Circle", "example/Square"],
        function(shapeMod, circleMod, squareMod) {
    for(var i=0; i<5; i++) {
        var circleInstance = 
            new example.Circle({name: 'circle' + i, radius: 10 * Math.random()});
        circleInstance.create(true);
        console.info('created ' + circleInstance.get('name'));
        var squareInstance = 
            new example.Square({name: 'square' + i, side: 10 * Math.random()});
        squareInstance.create().then(function(squareInst) {
            console.info('created ' + squareInst.get('name'));
        });
    }
    example.Shape.list().then(function(shapeInsts) {
        dojo.forEach(shapeInsts, function(shapeInst) {
            if (shapeInst.get('class') === 'example.Circle') {
                var circleInst = example.Circle.retrieve(shapeInst.get('id'), true),
                    area = circleInst.calculate()
                if (area < 50) {
                    circleInst.delete(true);
                    console.info('deleted ' + circleInst.get('name'));
                } else if (area > 150) {
                    circleInst.set('radius', circleInst.get('radius') - 1);
                    circleInst.update(true);
                    console.info('updated ' + circleInst.get('name'));
                }
            } else if (shapeInst.get('class') === 'example.Square') {
                example.Square.retrieve(shapeInst.get('id')).then(function(squareInst) {
                    var area = squareInst.calculate()
                    if (area < 10) {
                        squareInst.delete().then(function() {
                            console.info('deleted ' + squareInst.get('name'));
                        });
                    } else if (area > 50) {
                        squareInst.set('side', squareInst.get('side') - 1);
                        squareInst.update().then(function() {
                            console.info('updated ' + squareInst.get('name'));
                        });
                    }
                });
            }
        });
    }, function(error) {
        throw error;
    });
});
</script>
</head>
<body>
</body>
</html>