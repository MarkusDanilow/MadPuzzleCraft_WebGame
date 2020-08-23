class Tile extends BaseEntity {
    constructor(x, y) {

        // super constructor (entity)
        super(x, y);

        // 
        this.type = TileType.GRASS;

        /**
         *
         * @param {*} type
         */
        this.changeTileType = function(type = TileType.GRASS) {
            this.type = type;
        };

        /**
         *
         * @param {*} type
         */
        this.hasType = function(type) {
            return this.type == type;
        };

        /**
         *
         * @param {*} value
         */
        this.tileTypeFromNoiseValue = function(value) {
            if (value < -1)
                value = -1;
            if (value > 1)
                value = 1;

            if (value <= 0)
                this.type = TileType.WATER;
            else
                this.type = TileType.GRASS;

        };

        /**
         *
         * @param {*} worldX
         * @param {*} worldY
         */
        this.transformToWorld = function(worldX, worldY) {
            this.worldPosition = { x: worldX, y: worldY };
        };

    }
}

Tile.SIZE = 64;