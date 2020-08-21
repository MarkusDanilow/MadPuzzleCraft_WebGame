function MadInput() {

    this.hoveredTileCoords = { x: -1, y: -1 };

    this.dragginMouseButton = 3;
    this.draggingEnabled = false;

    let scope = this;

    this.initBasicEvents = function() {

        application.getRenderer().canvasReference.on('contextmenu', function(e) {
            return false;
        })


        application.getRenderer().canvasReference.mousemove(function(e) {
            // include draggin mode in here as well!
            if (scope.draggingEnabled) {
                console.log(scope.draggingEnabled);
            } else {
                var tilePosition = TransformationUtil.toWorldCoordinates(e.pageX, e.pageY);
                scope.hoveredTileCoords = tilePosition;
            }
        });

        application.getRenderer().canvasReference.mousedown(function(e) {
            if (e.which == scope.dragginMouseButton)
                scope.draggingEnabled = true;
        });


        application.getRenderer().canvasReference.mouseup(function(e) {
            scope.draggingEnabled = false;
        });

        $(document).mouseout(function(e) {
            scope.hoveredTileCoords = { x: -1, y: -1 };
        });

        $(window).resize(function() {
            application.getRenderer().initCanvasSize();
        });

    }

    this.getHoveredTileCoords = function() {
        return this.hoveredTileCoords;
    }

    this.hoveredTileCoordsInRange = function() {
        let coords = this.getHoveredTileCoords();
        return coords.x > -1 && coords.x < GameMap.WIDTH &&
            coords.y > -1 && coords.y < GameMap.HEIGHT;
    }

}