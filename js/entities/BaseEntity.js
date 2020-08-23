class BaseEntity {
    constructor(x, y) {
        this.worldCoordinates = { x: x, y: y };
        this.worldPosition = { x: 0, y: 0 };
    }

    reCalculateSize() {

    }

    /**
     * 
     */
    calculateRenderingPosition() {
        let worldPosition = { x: this.worldCoordinates.x * Tile.SIZE, y: this.worldCoordinates.y * Tile.SIZE };
        return TransformationUtil.worldToScreenPosition(worldPosition);
    }

}