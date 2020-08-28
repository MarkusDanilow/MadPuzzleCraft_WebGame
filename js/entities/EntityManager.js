class EntityManager {

    constructor() {
        this.entities = [];
    }

    /**
     * 
     * @param {*} entity 
     */
    addEntity(entity) {
        this.entities.push(entity);
    }

    /**
     * 
     * @param {*} ctx 
     */
    renderAll(ctx) {
        this.entities.forEach(entity => {
            entity.render(ctx);
        });
    }

}