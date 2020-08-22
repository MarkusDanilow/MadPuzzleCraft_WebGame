function GameMap() {

    this.noiseMap = [];
    this.tiles = [];

    this.seed = 0.0824929392;

    /**
     * 
     */
    this.initMap = function() {

        // init noise map
        noise.seed(this.seed);
        for (var x = 0; x < GameMap.WIDTH; x++) {
            var colBuffer = [];
            for (var y = 0; y < GameMap.HEIGHT; y++) {
                let val = noise.simplex2(x / 32, y / 32);
                colBuffer.push(val);
            }
            this.noiseMap.push(colBuffer);
        }

        // load real tile map (based on noise)
        for (var x = 0; x < GameMap.WIDTH; x++) {
            let colBuffer = [];
            for (var y = 0; y < GameMap.HEIGHT; y++) {
                let tile = new Tile(x, y);
                tile.tileTypeFromNoiseValue(this.noiseMap[x][y]);
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

// amount of tiles on x and y axis
GameMap.WIDTH = 128;
GameMap.HEIGHT = 128;

// we do not want users with a wider screen to see more of the map than users with a small screen
// so we define a fixed view distance on both axis
// => ration between x and y is 16:9
GameMap.VIEW_DISTANCE_X = 32;
GameMap.VIEW_DISTANCE_Y = GameMap.VIEW_DISTANCE_X / 16 * 9;