class MadBoardRenderer extends MadBaseRenderer {

    render() {

        let ctx = this.renderingContext;

        // clear
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        ctx.strokeStyle = "rgba(100, 100, 100, 0.7)";
        ctx.lineWidth = 1;

        for (let row = 0; row < 10; row++) {
            ctx.beginPath();
            ctx.moveTo(0, row * Tile.SIZE);
            ctx.lineTo(9 * Tile.SIZE, row * Tile.SIZE);
            ctx.stroke();
        }
        for (let col = 0; col < 10; col++) {
            ctx.beginPath();
            ctx.moveTo(col * Tile.SIZE, 0);
            ctx.lineTo(col * Tile.SIZE, 9 * Tile.SIZE);
            ctx.stroke();
        }

    }

}