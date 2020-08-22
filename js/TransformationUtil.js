function TransformationUtil() {

}

/**
 * 
 */
TransformationUtil.initViewRatioAndDistance = function() {
    let renderer = application.getRenderer();
    let rw = renderer.canvasWidth;
    let rh = renderer.canvasHeight;
    let idealSizeX = rw / GameMap.VIEW_DISTANCE_X;
    let idealSizeY = rh / GameMap.VIEW_DISTANCE_Y;
    Tile.SIZE = Math.floor((idealSizeX + idealSizeY) / 2);
    Tile.ORIGINAL_SIZE = Tile.SIZE;
}

/**
 * 
 */
TransformationUtil.RenderingOffset = {
    x: 0,
    y: 0
};

/**
 * 
 * @param {*} delta 
 */
TransformationUtil.modifyRenderingOffset = function(delta) {
    //  if (!delta || !delta.x || !delta.y) return;
    TransformationUtil.RenderingOffset.x += delta.x;
    TransformationUtil.RenderingOffset.y += delta.y;
    TransformationUtil.checkRenderingOffset();
}

TransformationUtil.checkRenderingOffset = function() {

    // bounding left and top 
    if (TransformationUtil.RenderingOffset.x >= 0) TransformationUtil.RenderingOffset.x = 0;
    if (TransformationUtil.RenderingOffset.y >= 0) TransformationUtil.RenderingOffset.y = 0;

    // bounding bottom and right 
    let renderer = application.getRenderer();
    if (TransformationUtil.RenderingOffset.x <= -(GameMap.WIDTH * Tile.SIZE - renderer.canvasWidth))
        TransformationUtil.RenderingOffset.x = -(GameMap.WIDTH * Tile.SIZE - renderer.canvasWidth);
    if (TransformationUtil.RenderingOffset.y <= -(GameMap.HEIGHT * Tile.SIZE - renderer.canvasHeight + renderer.canvasReference.offset().top))
        TransformationUtil.RenderingOffset.y = -(GameMap.HEIGHT * Tile.SIZE - renderer.canvasHeight + renderer.canvasReference.offset().top);
}

/**
 * 
 */
TransformationUtil.zoomLevel = 0;

/**
 * 
 * @param {*} zoomDelta 
 */
TransformationUtil.applyZoomChange = function(zoomDelta, mousePos) {
    // TransformationUtil.zoomLevel += Math.floor(zoomDelta / 100);
    if (zoomDelta < 0) TransformationUtil.zoomLevel--;
    else if (zoomDelta > 0) TransformationUtil.zoomLevel++;
    if (TransformationUtil.zoomLevel < 0) TransformationUtil.zoomLevel = 0;
    else if (TransformationUtil.zoomLevel > 3) TransformationUtil.zoomLevel = 3;
    let scalingFactor = (Math.pow(2, TransformationUtil.zoomLevel));
    Tile.SIZE = Tile.ORIGINAL_SIZE * scalingFactor;

    // transform so that we always zoom in on the mouse position
    console.log(mousePos);

    // make sure that we do not go outside the bounds of the map!
    TransformationUtil.checkRenderingOffset();
}

/**
 * 
 * @param {*} screenX 
 * @param {*} screenY 
 */
TransformationUtil.toWorldCoordinates = function(screenX, screenY) {
    let canvas = application.getRenderer().canvasReference;
    screenY -= canvas.offset().top;

    // apply global rendering offset 
    screenX -= TransformationUtil.RenderingOffset.x;
    screenY -= TransformationUtil.RenderingOffset.y;

    screenX = Math.floor(screenX / Tile.SIZE);
    screenY = Math.floor(screenY / Tile.SIZE);
    return { x: screenX, y: screenY };
}

/**
 * 
 * @param {*} worldPosition 
 */
TransformationUtil.worldToScreenPosition = function(worldPosition) {
    // if (!worldPosition || !worldPosition.x || !worldPosition.y) return { x: 0, y: 0 };
    var screenPosition = { x: worldPosition.x, y: worldPosition.y };
    screenPosition.x += TransformationUtil.RenderingOffset.x;
    screenPosition.y += TransformationUtil.RenderingOffset.y;
    return screenPosition;
}

/**
 * 
 * @param {*} worldPosition 
 */
TransformationUtil.isInViewport = function(worldPosition) {
    //  if (!worldPosition || !worldPosition.x || !worldPosition.y) return false;
    let renderer = application.getRenderer();
    var screenPosition = TransformationUtil.worldToScreenPosition(worldPosition);
    return screenPosition.x >= -Tile.SIZE && screenPosition.x <= (renderer.canvasWidth + Tile.SIZE) &&
        screenPosition.y >= -Tile.SIZE && screenPosition.y <= (renderer.canvasHeight + Tile.SIZE);
}