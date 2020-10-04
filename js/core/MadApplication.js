function MadApplication() {

    this.renderer = null;
    this.map = null;
    this.canvasInput = null;
    this.uiInput = null;
    this.ui = null;

    this.entityManager = null;
    this.entityPlacementHandler = null;

    let scope = this;

    /**
     * 
     */
    this.start = function() {
        let dependencyLoader = new DependencyLoader();
        dependencyLoader.loadDependencies(this.loadGameContent);
    }

    /**
     * 
     */
    this.loadGameContent = function() {
        TextureLoader.loadTileMap(function() {
            scope.renderer = new MadRenderer();
            scope.renderer.init();

            scope.canvasInput = new MadInput();
            scope.canvasInput.initBasicEvents();

            scope.uiInput = new MadUIInput();

            scope.ui = new UI();
            scope.ui.listBuildingsInSidebar();

            scope.map = new GameMap();

            scope.entityManager = new EntityManager();
            scope.entityPlacementHandler = new EntityPlacement();

            scope.gameLoop();
        });
    }

    /**
     * 
     */
    this.getMap = function() {
        return scope.map;
    }

    /**
     * 
     */
    this.getRenderer = function() {
        return scope.renderer;
    }

    /**
     * 
     */
    this.getInput = function() {
        return scope.canvasInput;
    }

    /**
     * 
     */
    this.getUIInput = function() {
        return scope.uiInput;
    }

    /**
     * 
     */
    this.getUI = function() {
        return scope.ui;
    }

    /**
     * 
     */
    this.getEntityManager = function() {
        return scope.entityManager;
    }

    /**
     * 
     */
    this.getEntityPlacementHandler = function() {
        return scope.entityPlacementHandler;
    }

    /**
     * 
     * @param {*} tempPlacementEntity 
     */
    this.addEntityFromTempPlacement = function(tempPlacementEntity) {
        if (!tempPlacementEntity) return;
        let className = tempPlacementEntity.name.replace(/ /g, '');
        let realEntity = eval(`new ${className}()`);
        realEntity.worldCoordinates = tempPlacementEntity.worldCoordinates;
        realEntity.worldPosition = tempPlacementEntity.worldPosition;
        scope.entityManager.addEntity(realEntity);
    }

    /**
     * 
     */
    this.gameLoop = function() {
        setTimeout(function() {
            scope.renderer.prepareRenderCycle(scope.gameLoop);
            scope.renderer.updateControls();
            // update game logic ...
            scope.renderer.render();
        }, 1000 / MadApplication.TargetFPS);
    }


}

MadApplication.TargetFPS = 30;

MadApplication.developerMode = true;