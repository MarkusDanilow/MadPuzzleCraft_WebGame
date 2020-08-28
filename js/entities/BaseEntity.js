class BaseEntity {
    constructor(x, y) {
        this.worldCoordinates = { x: x, y: y };
        this.worldPosition = { x: 0, y: 0 };
    }

    /**
     * This sets absolute pixel values for the world position
     * @param {*} worldX
     * @param {*} worldY
     */
    transformToWorld(worldX, worldY) {
        this.worldPosition = { x: worldX, y: worldY };
    };

    /**
     * This sets the tile position as an integer, describing the tile index (x,y) the entity is located on 
     * @param {*} tileX 
     * @param {*} tileY 
     */
    setTilePosition(tileX, tileY) {
        this.worldCoordinates = { x: tileX, y: tileY };
    }

    reCalculateSize() {
        this.size = Tile.SIZE;
    }

    /**
     * 
     */
    calculateRenderingPosition() {
        let worldPosition = { x: this.worldCoordinates.x * Tile.SIZE, y: this.worldCoordinates.y * Tile.SIZE };
        return TransformationUtil.worldToScreenPosition(worldPosition);
    }

}