function MadInput() {

    this.hoveredTileCoords = { x: -1, y: -1 };

    this.dragginMouseButton = 3;
    this.draggingEnabled = false;

    this.lastDragingPosition = { x: 0, y: 0 };
    this.newDraggingPosition = { x: 0, y: 0 };

    let scope = this;

    this.initBasicEvents = function() {

        // disable context menu on canvas
        application.getRenderer().canvasReference.on('contextmenu', function(e) {
            return false;
        });

        // mouse move for highlighting current tile and dragging feature
        application.getRenderer().canvasReference.mousemove(function(e) {
            // include draggin mode in here as well!
            let mousePos = { x: e.pageX, y: e.pageY };
            if (scope.draggingEnabled) {
                scope.lastDragingPosition = scope.newDraggingPosition;
                scope.newDraggingPosition = mousePos;
                let delta = {
                    x: scope.newDraggingPosition.x - scope.lastDragingPosition.x,
                    y: scope.newDraggingPosition.y - scope.lastDragingPosition.y
                };
                TransformationUtil.modifyRenderingOffset(delta);
            }
            var tilePosition = TransformationUtil.toWorldCoordinates(mousePos.x, mousePos.y);
            scope.hoveredTileCoords = tilePosition;
        });

        // detect when a mouse button has been pressed
        application.getRenderer().canvasReference.mousedown(function(e) {
            if (e.which == scope.dragginMouseButton) {
                scope.draggingEnabled = true;
                scope.newDraggingPosition = { x: e.pageX, y: e.pageY };
            }
        });

        // detect when a mouse button has been released 
        application.getRenderer().canvasReference.mouseup(function(e) {
            scope.draggingEnabled = false;
        });

        // detect mouse wheel events for zooming in and out 
        application.getRenderer().canvasReference.on("wheel", function(e) {
            let delta = e.originalEvent.wheelDelta;
            let mousePos = { x: e.pageX, y: e.pageY };
            TransformationUtil.applyZoomChange(delta, mousePos);
        });

        // when the mouse leaves the game window
        $(document).mouseout(function(e) {
            scope.hoveredTileCoords = { x: -1, y: -1 };
        });

        // resize game when window is being resized
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