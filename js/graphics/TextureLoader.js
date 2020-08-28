function TextureLoader() {

}

TextureLoader.TileMap = null;

TextureLoader.loadTileMap = function(callback) {
    if (!callback) return;
    TextureLoader.TileMap = new Image();
    TextureLoader.TileMap.src = 'graphics/tiles/tilemap.png';
    TextureLoader.TileMap.onload = callback;
}


/* -------------------------------------------- */

function TextureAtlas() {

}

TextureAtlas.TileSize = 64;
TextureAtlas.TileLocations = {
    grass: { x: 0, y: 0 },
    water: { x: 1, y: 0 },
    sand: { x: 2, y: 0 },
    coast_top: { x: 1, y: 1 },
    coast_bottom: { x: 1, y: 3 },
    coast_left: { x: 0, y: 2 },
    coast_right: { x: 2, y: 2 }
}