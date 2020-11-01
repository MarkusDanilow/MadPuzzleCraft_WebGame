class MadBaseRenderer {

    /**
     * 
     */
    constructor() {}

    /**
     * 
     */
    init() {
        this.canvasReference = $('#game-rendering-canvas');
        this.renderingContext = this.canvasReference[0].getContext('2d');
        this.initCanvasSize();
    }

    /**
     * 
     */
    prepareRenderCycle(callback) {
        if (!callback) return;
        requestAnimationFrame(callback);
    }

    /**
     * 
     */
    initCanvasSize() {
        this.canvasWidth = this.canvasReference.width();
        this.canvasHeight = this.canvasReference.height();
        this.canvasReference[0].width = this.canvasWidth;
        this.canvasReference[0].height = this.canvasHeight;
        TransformationUtil.initViewRatioAndDistance();
    }

}