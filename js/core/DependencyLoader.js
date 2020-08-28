/**
 * 
 * Utility method to load multiple scripts dynamically and asynchronous. 
 * Found here: https://stackoverflow.com/questions/11803215/how-to-include-multiple-js-files-using-jquery-getscript-method
 * 
 * @param {*} arr 
 * @param {*} path 
 */
$.getMultiScripts = function(arr, path) {
    var _arr = $.map(arr, function(scr) {
        return $.getScript((path || "") + scr);
    });
    _arr.push($.Deferred(function(deferred) {
        $(deferred.resolve);
    }));
    return $.when.apply($, _arr);
}

/**
 * 
 */
function DependencyLoader() {

    /**
     * 
     */
    this.loadDependencies = function(callback) {
        if (!callback) return;
        let scripts = [];
        for (let i = 0; i < DependencyLoader.dependencyorder.length; i++) {
            let dependencyType = DependencyLoader.dependencyorder[i];
            let directory = DependencyLoader.baseDirectory + DependencyLoader.DependencyDirectories[dependencyType];
            let modules = DependencyLoader.DependencyModules[dependencyType];
            for (let j = 0; j < modules.length; j++) {
                let module = modules[j];
                let path = directory + module + ".js";
                scripts.push(path);
            }
        }
        $.getMultiScripts(scripts).done(() => {
            setTimeout(() => {
                callback();
            }, 500);
        });
    }

}

DependencyLoader.dependencyorder = ['core', 'lib', 'graphics', 'io', 'ui', 'entities', 'map'];

DependencyLoader.baseDirectory = "js/";
DependencyLoader.DependencyDirectories = {
    core: "core/",
    graphics: "graphics/",
    io: "io/",
    lib: "lib/",
    map: "map/",
    entities: "entities/",
    ui: 'ui/'
};

DependencyLoader.DependencyModules = {
    core: ["TransformationUtil"],
    graphics: ["MadRenderer", "TextureLoader"],
    io: ["MadInput", "MadUIInput"],
    lib: ["perlin"],
    entities: ["EntityManager", "BaseEntity", "Building", "Residence"],
    map: ["GameMap", "Tile", "TileDefinitions"],
    ui: ["UI"]
}

DependencyLoader.DisplayInSidebar = [
    "Residence"
]