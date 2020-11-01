function MadInput() {

    this.hoveredTileCoords = { x: -1, y: -1 };

    this.dragginMouseButton = 3;
    this.draggingEnabled = false;

    this.lastDragingPosition = { x: 0, y: 0 };
    this.newDraggingPosition = { x: 0, y: 0 };

    this.tempPlacementEntity = null;

    let scope = this;

    /**
     * 
     */
    this.initBasicEvents = function() {

        let canvas = application.getRenderer().canvasReference;

        if (MadApplication.developerMode) {
            canvas.on('contextmenu', function(e) {
                return false;
            });
        } else {
            $('body').on('contextmenu', function(e) {
                return false;
            });
        }

        canvas.mousemove(function(e) {
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
            if (scope.isPlacementEnabled()) {
                scope.tempPlacementEntity.setTilePosition(tilePosition.x, tilePosition.y);
            }
        });

        canvas.mousedown(function(e) {
            if (e.which == scope.dragginMouseButton) {
                scope.draggingEnabled = true;
                scope.newDraggingPosition = { x: e.pageX, y: e.pageY };
            }
        });

        canvas.mouseup(function(e) {
            scope.draggingEnabled = false;
        });

        $(document).mouseout(function(e) {
            scope.hoveredTileCoords = { x: -1, y: -1 };
        });

        canvas.click(function(e) {
            if (scope.isPlacementEnabled()) {
                application.addEntityFromTempPlacement(scope.tempPlacementEntity);
            }
        });

        $(window).resize(function() {
            application.getRenderer().initCanvasSize();
        });

        // key up events
        $(window).keyup(function(e) {
            if (e.which == 27) {
                if (scope.isPlacementEnabled()) {
                    application.getEntityPlacementHandler().resetUiPlacementElement();
                }
            }
        });

    }

    /**
     * 
     */
    this.getHoveredTileCoords = function() {
        return this.hoveredTileCoords;
    }

    /**
     * 
     */
    this.hoveredTileCoordsInRange = function() {
        let coords = this.getHoveredTileCoords();
        return coords.x > -1 && coords.x < GameMap.WIDTH &&
            coords.y > -1 && coords.y < GameMap.HEIGHT;
    }

    /**
     * 
     * @param {*} entity 
     */
    this.definePlacementEntity = function(entity) {
        scope.tempPlacementEntity = entity;
    }

    /**
     * 
     * @param {*} ctx 
     */
    this.renderPlacementEntity = function(ctx) {
        if (scope.isPlacementEnabled()) {
            scope.tempPlacementEntity.render(ctx);
        }
    }

    /**
     * 
     */
    this.isPlacementEnabled = function() {
        if (this.tempPlacementEntity) return true;
        return false;
    }

}