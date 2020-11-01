/**
 * 
 */
function DependencyLoader() {

    /**
     * 
     * @param {*} arr 
     * @param {*} callback 
     */
    this.loadMultipleScripts = function(arr, callback) {
        HtmlGenerator.generateComment($('head'), "the following scripts have been added automatically by the dependency loader", true);
        for (let k in arr) {
            HtmlGenerator.generateScript($('head'), '', '', true, { src: arr[k] + '?v=' + (Math.random().toString().substr(2)) });
        }
        if (callback) callback();
    }

    /**
     * 
     */
    this.loadDependencies = function(callback) {
        if (!callback) return;
        let scripts = [];
        for (let i = 0; i < DependencyLoader.DependencyOrder.length; i++) {
            let dependencyType = DependencyLoader.DependencyOrder[i];
            let directory = DependencyLoader.BaseDirectory + DependencyLoader.DependencyDirectories[dependencyType];
            let modules = DependencyLoader.DependencyModules[dependencyType];
            for (let j = 0; j < modules.length; j++) {
                let module = modules[j];
                let path = directory + module + ".js";
                scripts.push(path);
            }
        }
        this.loadMultipleScripts(scripts, () => {
            setTimeout(() => {
                callback();
            }, 1000);
        });
    }

}

DependencyLoader.DependencyOrder = ['core', 'lib', 'graphics', 'io', 'ui', 'entities', 'buildingEntities', 'map'];

DependencyLoader.BaseDirectory = "js/";
DependencyLoader.DependencyDirectories = {
    core: "core/",
    graphics: "graphics/",
    io: "io/",
    lib: "lib/",
    map: "map/",
    entities: "entities/",
    buildingEntities: "entities/buildings/",
    ui: 'ui/'
};

DependencyLoader.DependencyModules = {
    core: ["TransformationUtil"],
    graphics: ["MadBaseRenderer", "MadMapRenderer", "MadBoardRenderer", "TextureLoader"],
    io: ["EntityPlacement", "MadInput", "MadUIInput"],
    lib: ["perlin", "MadUtility"],
    entities: ["EntityManager", "BaseEntity"],
    buildingEntities: ["Building", "Residence", "BlackSmith", "CommunityCenter"],
    map: ["GameMap", "Tile", "TileDefinitions"],
    ui: ["UI"]
}

DependencyLoader.DisplayInSidebar = [
    "Residence", "BlackSmith", "CommunityCenter"
]