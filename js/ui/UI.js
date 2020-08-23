class UI {
    constructor() {

    }

    listBuildingsInSidebar() {
        let sidebarBodyRow = $('#left-sidebar-body .row');
        for (let i = 0; i < DependencyLoader.DisplayInSidebar.length; i++) {
            let buildingTypeString = DependencyLoader.DisplayInSidebar[i];
            let buildingReference = eval(`new ${buildingTypeString}()`);
            let entry = HtmlGenerator.generateDiv(sidebarBodyRow, '', 'col-4', true, { text: buildingReference.name });
        }
    }

}