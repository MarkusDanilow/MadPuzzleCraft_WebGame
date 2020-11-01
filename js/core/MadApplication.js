function MadApplication() {

    this.mapRenderer = null;
    this.boardRenderer = null;
    this.map = null;
    this.canvasInput = null;
    this.uiInput = null;
    this.ui = null;

    this.entityManager = null;
    this.entityPlacementHandler = null;

    this.renderMap = true;

    let scope = this;

    /**
     * 
     */
    this.start = function(doneCallback) {
        let dependencyLoader = new DependencyLoader();
        dependencyLoader.loadDependencies(() => {
            scope.loadGameContent(() => {
                if (doneCallback) doneCallback();
                scope.ui.hideLoadingScreen();
            });
        });
    }

    /**
     * 
     */
    this.loadGameContent = function(doneCallback) {
        TextureLoader.loadTileMap(function() {
            scope.mapRenderer = new MadMapRenderer();
            scope.mapRenderer.init();
            scope.boardRenderer = new MadBoardRenderer();
            scope.boardRenderer.init();

            scope.canvasInput = new MadInput();
            scope.canvasInput.initBasicEvents();

            scope.uiInput = new MadUIInput();

            scope.ui = new UI();
            scope.ui.listBuildingsInSidebar();

            scope.map = new GameMap();

            scope.entityManager = new EntityManager();
            scope.entityPlacementHandler = new EntityPlacement();

            scope.gameLoop();

            if (doneCallback) doneCallback();
        });
    }

    /**
     * 
     */
    this.switchToMap = function() {
        scope.ui.switchToMap();
        scope.renderMap = true;
    }

    /**
     * 
     */
    this.switchToBoard = function() {
        scope.ui.switchToBoard();
        scope.renderMap = false;
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
    this.getMapRenderer = function() {
        return scope.mapRenderer;
    }

    /**
     * 
     */
    this.getBoardRenderer = function() {
        return scope.boardRenderer;
    }

    /**
     * 
     */
    this.getRenderer = function() {
        return scope.renderMap ? scope.getMapRenderer() : scope.getBoardRenderer();
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
            scope.mapRenderer.prepareRenderCycle(scope.gameLoop);
            scope.mapRenderer.updateControls();
            // update game logic ...
            if (scope.renderMap) scope.mapRenderer.render();
            else scope.boardRenderer.render();
        }, 1000 / MadApplication.TargetFPS);
    }


}

MadApplication.TargetFPS = 30;

MadApplication.developerMode = true;