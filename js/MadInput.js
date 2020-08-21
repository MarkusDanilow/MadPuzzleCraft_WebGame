function MadInput() {

    this.hoveredTileCoords = { x: -1, y: -1 };

    let scope = this;

    this.initBasicEvents = function() {
        let scope = this;
        application.getRenderer().canvasReference.mousemove(function(e) {
            var tilePosition = TransformationUtil.toWorldCoordinates(e.pageX, e.pageY);
            scope.hoveredTileCoords = tilePosition;
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