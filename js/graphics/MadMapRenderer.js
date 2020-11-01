class MadMapRenderer extends MadBaseRenderer {

    /**
     * 
     */
    updateControls() {

    }

    /**
     * 
     */
    render() {

        // clear
        this.renderingContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // render map
        application.getMap().render(this.renderingContext);

        if (application.getInput().hoveredTileCoordsInRange()) {
            let coords = application.getInput().getHoveredTileCoords();
            let renderingPos = TransformationUtil.worldToScreenPosition({ x: coords.x * Tile.SIZE, y: coords.y * Tile.SIZE });
            this.renderingContext.strokeStyle = "rgba(75,0,0,.3)";
            this.renderingContext.lineWidth = 1;
            this.renderingContext.beginPath();
            this.renderingContext.rect(renderingPos.x, renderingPos.y, Tile.SIZE, Tile.SIZE);
            this.renderingContext.stroke();
        }

        // render entities taht already exist in the world
        application.getEntityManager().renderAll(this.renderingContext);

        // render placement preview
        application.getInput().renderPlacementEntity(this.renderingContext);

    }

}