class Building extends BaseEntity {

    constructor(x, y, name) {
        super(x, y);
        this.name = name;
    }

    render(ctx) {
        if (!ctx) return;
        this.reCalculateSize();
        let renderingPos = this.calculateRenderingPosition();
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(renderingPos.x, renderingPos.y, this.size, this.size);
    }

}