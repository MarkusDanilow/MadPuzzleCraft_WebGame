function MadApplication() {

    this.renderer = null;
    this.map = null;
    this.input = null;

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
            scope.map = new GameMap();
            scope.renderer = new MadRenderer();
            scope.renderer.init();
            scope.input = new MadInput();
            scope.input.initBasicEvents();
            scope.renderer.createTerrain();
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
        return scope.input;
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