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
        TransformationUtil.applyZoomChange(0);
    }

    /**
     * 
     */
    this.createTerrain = function() {

    }

    /**
     * 
     */
    this.prepareRenderCycle = function(callback) {
        if (!callback) return;
        requestAnimationFrame(callback);
    }

    this.updateControls = function() {

    }

    /**
     * 
     */
    this.render = function() {

        // clear
        scope.renderingContext.clearRect(0, 0, scope.canvasWidth, scope.canvasHeight);

        var tiles = application.getMap().getTiles();
        var noiseMap = application.getMap().noiseMap;

        for (let x = 0; x < tiles.length; x++) {
            for (let y = 0; y < tiles[x].length; y++) {
                let type = tiles[x][y].type;

                let origWorldPos = { x: x * Tile.SIZE, y: y * Tile.SIZE };
                if (TransformationUtil.isInViewport(origWorldPos)) {
                    let renderingPos = TransformationUtil.worldToScreenPosition(origWorldPos);
                    scope.renderingContext.drawImage(TextureLoader.TileMap,
                        TextureAtlas.TileSize * TextureAtlas.TileLocations[type].x, TextureAtlas.TileSize * TextureAtlas.TileLocations[type].y,
                        TextureAtlas.TileSize, TextureAtlas.TileSize,
                        renderingPos.x, renderingPos.y, Tile.SIZE, Tile.SIZE);
                    /*
                    let color = (noiseMap[x][y] + 1) * 128;
                    scope.renderingContext.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
                    scope.renderingContext.fillRect(renderingPos.x, renderingPos.y, Tile.SIZE, Tile.SIZE)
                    */

                }
            }
        }

        if (application.getInput().hoveredTileCoordsInRange()) {
            let coords = application.getInput().getHoveredTileCoords();
            let renderingPos = TransformationUtil.worldToScreenPosition({ x: coords.x * Tile.SIZE, y: coords.y * Tile.SIZE });
            scope.renderingContext.strokeStyle = "rgba(75,0,0,.3)";
            scope.renderingContext.lineWidth = 1;
            scope.renderingContext.beginPath();
            scope.renderingContext.rect(renderingPos.x, renderingPos.y, Tile.SIZE, Tile.SIZE);
            scope.renderingContext.stroke();
        }
    }

}