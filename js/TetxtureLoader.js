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
    grass: { x: 0, y: 0 }
}