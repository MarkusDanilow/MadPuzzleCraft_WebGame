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
        for (let dependencyType in DependencyLoader.DependencyDirectories) {
            let directory = DependencyLoader.baseDirectory + DependencyLoader.DependencyDirectories[dependencyType];
            let modules = DependencyLoader.DependencyModules[dependencyType];
            for (let i = 0; i < modules.length; i++) {
                let module = modules[i];
                let path = directory + module + ".js";
                scripts.push(path);
            }
        }
        $.getMultiScripts(scripts).done(callback);
    }

}

DependencyLoader.baseDirectory = "js/";
DependencyLoader.DependencyDirectories = {
    core: "core/",
    graphics: "graphics/",
    io: "io/",
    lib: "lib/",
    map: "map/"
};

DependencyLoader.DependencyModules = {
    core: ["TransformationUtil"],
    graphics: ["MadRenderer", "TextureLoader"],
    io: ["MadInput"],
    lib: ["perlin"],
    map: ["GameMap", "Tile", "TileDefinitions"]
}