function GameMap() {

    this.noiseMap = [];
    this.tiles = [];

    this.seed = 0.0824929392;

    /**
     * 
     */
    this.initMap = function() {

        // load real tile map (based on noise)
        noise.seed(this.seed);

        for (var x = 0; x < GameMap.WIDTH; x++) {
            let colBuffer = [];
            var noiseColBuffer = [];
            for (var y = 0; y < GameMap.HEIGHT; y++) {

                let noiseValue = noise.simplex2(x / 32, y / 32);
                noiseColBuffer.push(noiseValue);

                let tile = new Tile(x, y);
                tile.tileTypeFromNoiseValue(noiseValue);
                colBuffer.push(tile);
            }
            this.tiles.push(colBuffer);
            this.noiseMap.push(colBuffer);
        }

        this.processTileTransitions();

    }

    /**
     * 
     * We use indices to identify the neighbours of the current tile generically
     * The indices are as follows:
     * 
     * 0 1 2
     * 7 c 3
     * 6 5 4
     * 
     * Where "c" stands for "current tile"
     */
    this.processTileTransitions = function() {
        for (var x = 0; x < GameMap.WIDTH; x++) {
            for (var y = 0; y < GameMap.HEIGHT; y++) {
                let currentTile = this.tiles[x][y];
                let neighbours = {};
                // check left
                if (x > 0) {
                    neighbours[7] = this.tiles[x - 1][y];
                }
                // check right
                if (x < GameMap.WIDTH - 1) {
                    neighbours[3] = this.tiles[x + 1][y];
                }
                // check top
                if (y > 0) {
                    neighbours[1] = this.tiles[x][y - 1];
                }

                if (y < GameMap.HEIGHT - 1) {
                    neighbours[5] = this.tiles[x][y + 1];
                }

                this.processTileNeighbours(currentTile, neighbours);

            }
        }
    }

    /**
     * 
     * @param {*} currentTile 
     * @param {*} neightbours 
     */
    this.processTileNeighbours = function(currentTile, neighbours) {
        if (currentTile.hasType(TileType.WATER)) {
            for (let i = 0; i < 8; i++) {
                if (neighbours[i] && neighbours[i].hasType(TileType.GRASS)) {
                    neighbours[i].changeTileType(TileType.SAND);
                }
            }
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

// amount of tiles on x and y axis
GameMap.WIDTH = 128;
GameMap.HEIGHT = 128;

// we do not want users with a wider screen to see more of the map than users with a small screen
// so we define a fixed view distance on both axis
// => ration between x and y is 16:9
GameMap.VIEW_DISTANCE_X = 32;
GameMap.VIEW_DISTANCE_Y = GameMap.VIEW_DISTANCE_X / 16 * 9;