function GameMap() {

    this.tiles = [];

    /**
     * 
     */
    this.initMap = function() {
        for (var x = 0; x < GameMap.WIDTH; x++) {
            var colBuffer = [];
            for (var y = 0; y < GameMap.HEIGHT; y++) {
                var tile = new Tile(x, y);
                tile.changeTileType(TileType.GRASS);
                colBuffer.push(tile);
            }
            this.tiles.push(colBuffer);
        }
    }

    /**
     * 
     */
    this.getTiles = function() {
        return this.tiles;
    }

    /* */
    this.initMap();

}

GameMap.WIDTH = 32;
GameMap.HEIGHT = 32;