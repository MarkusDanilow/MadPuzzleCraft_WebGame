class Building extends BaseEntity {

    constructor(x, y, name) {
        super(x, y);
        this.name = name;
    }

    place(x, y) {
        this.coordinates = { x: x, y: y };
    }

    reCalculateSize() {
        this.size = Tile.SIZE;
    }

    render(ctx) {
        if (!ctx) return;
        this.reCalculateSize();
        let renderingPos = this.calculateRenderingPosition();
        ctx.fillStyle = 'red';
        ctx.fillRect(renderingPos.x, renderingPos.y, this.size, this.size);
    }

}