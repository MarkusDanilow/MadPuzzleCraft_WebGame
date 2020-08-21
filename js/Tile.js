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
     * @param {*} worldX 
     * @param {*} worldY 
     */
    this.transformToWorld = function(worldX, worldY) {
        this.worldCoordinates = { x: worldX, y: worldY };
    }

}

Tile.SIZE = 64;
Tile.MATERIALS = {};

Tile.loadMaterials = function() {
    for (var prop in TileColors) {
        if (Object.prototype.hasOwnProperty.call(TileColors, prop)) {
            /*
            var material = new THREE.MeshBasicMaterial({ color: TileColors[prop] });
            Tile.MATERIALS[TileType[prop]] = material;
            */
        }
    }
};