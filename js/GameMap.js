function GameMap() {

    this.noiseMap = [];
    this.tiles = [];

    /**
     * 
     */
    this.initMap = function() {

        // init noise map
        noise.seed(Math.random());
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

GameMap.WIDTH = 128;
GameMap.HEIGHT = 128;