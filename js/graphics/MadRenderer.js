function MadRenderer() {

    /**
     * 
     */
    this.canvasReference = null;
    this.renderingContext = null;

    this.canvasWidth = 600;
    this.canvasHeight = 400;

    // reference to this renderer instance
    let scope = this;

    /**
     * 
     */
    this.init = function() {
        scope.canvasReference = $('#game-rendering-canvas');
        scope.renderingContext = scope.canvasReference[0].getContext('2d');
        scope.initCanvasSize();
    }

    /**
     * 
     */
    this.initCanvasSize = function() {
        scope.canvasWidth = scope.canvasReference.width();
        scope.canvasHeight = scope.canvasReference.height();
        scope.canvasReference[0].width = scope.canvasWidth;
        scope.canvasReference[0].height = scope.canvasHeight;
        TransformationUtil.initViewRatioAndDistance();
    }

    /**
     * 
     */
    this.prepareRenderCycle = function(callback) {
        if (!callback) return;
        requestAnimationFrame(callback);
    }

    /**
     * 
     */
    this.updateControls = function() {

    }

    /**
     * 
     */
    this.render = function() {

        // clear
        scope.renderingContext.clearRect(0, 0, scope.canvasWidth, scope.canvasHeight);

        // render map
        application.getMap().render(scope.renderingContext);

        if (application.getInput().hoveredTileCoordsInRange()) {
            let coords = application.getInput().getHoveredTileCoords();
            let renderingPos = TransformationUtil.worldToScreenPosition({ x: coords.x * Tile.SIZE, y: coords.y * Tile.SIZE });
            scope.renderingContext.strokeStyle = "rgba(75,0,0,.3)";
            scope.renderingContext.lineWidth = 1;
            scope.renderingContext.beginPath();
            scope.renderingContext.rect(renderingPos.x, renderingPos.y, Tile.SIZE, Tile.SIZE);
            scope.renderingContext.stroke();
        }

        // render entities taht already exist in the world
        application.getEntityManager().renderAll(scope.renderingContext);

        // render placement preview
        application.getInput().renderPlacementEntity(scope.renderingContext);

    }

}