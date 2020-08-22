function Tile(x, y) {

    // 
    this.type = TileType.GRASS;

    this.position = { x: x, y: y };
    this.worldCoordinates = { x: 0, y: 0 };

    /**
     * 
     * @param {*} type 
     */
    this.changeTileType = function(type = TileType.GRASS) {
        this.type = type;
    }

    /**
     * 
     * @param {*} value 
     */
    this.tileTypeFromNoiseValue = function(value) {
        if (value < -1) value = -1;
        if (value > 1) value = 1;

        if (value <= 0)
            this.type = TileType.WATER;
        else
            this.type = TileType.GRASS;

    }

    /**
     * 
     * @param {*} worldX 
     * @param {*} worldY 
     */
    this.transformToWorld = function(worldX, worldY) {
        this.worldCoordinates = { x: worldX, y: worldY };
    }

}

Tile.ORIGINAL_SIZE = 32;
Tile.SIZE = Tile.ORIGINAL_SIZE;