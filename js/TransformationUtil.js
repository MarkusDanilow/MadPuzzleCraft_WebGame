function TransformationUtil() {

}

/**
 * 
 * @param {*} screenX 
 * @param {*} screenY 
 */
TransformationUtil.toWorldCoordinates = function(screenX, screenY) {
    let canvas = application.getRenderer().canvasReference;
    screenY -= canvas.offset().top;
    screenX = Math.floor(screenX / Tile.SIZE);
    screenY = Math.floor(screenY / Tile.SIZE);
    return { x: screenX, y: screenY };
}