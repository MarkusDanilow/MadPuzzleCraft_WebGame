function TransformationUtil() {

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
    if (!delta || !delta.x || !delta.y) return;
    TransformationUtil.RenderingOffset.x += delta.x;
    TransformationUtil.RenderingOffset.y += delta.y;
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
    screenX += TransformationUtil.RenderingOffset.x;
    screenY += TransformationUtil.RenderingOffset.y;

    screenX = Math.floor(screenX / Tile.SIZE);
    screenY = Math.floor(screenY / Tile.SIZE);
    return { x: screenX, y: screenY };
}

/**
 * 
 * @param {*} worldPosition 
 */
TransformationUtil.worldToScreenPosition = function(worldPosition) {
    if (!worldPosition || !worldPosition.x || !worldPosition.y) return { x: 0, y: 0 };
    worldPosition.x += TransformationUtil.RenderingOffset.x;
    worldPosition.y += TransformationUtil.RenderingOffset.y;
    return worldPosition;
}

/**
 * 
 * @param {*} worldPosition 
 */
TransformationUtil.isInViewport = function(worldPosition) {
    if (!worldPosition || !worldPosition.x || !worldPosition.y) return false;
    let renderer = application.getRenderer();
    worldPosition = TransformationUtil.worldToScreenPosition(worldPosition);
    return worldPosition.x >= -Tile.SIZE && worldPosition.x <= renderer.canvasWidth + Tile.SIZE &&
        worldPosition.y >= -Tile.SIZE && worldPosition.y <= renderer.canvasHeight + Tile.SIZE;
}