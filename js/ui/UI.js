class UI {
    constructor() {

    }

    /**
     * 
     */
    switchToMap() {
        $('#left-sidebar').show();
    }

    /**
     * 
     */
    switchToBoard() {
        $('#left-sidebar').hide();
    }

    /**
     * 
     */
    hideLoadingScreen() {
        $('#loading-scren').fadeOut(UI.FADING_TIME);
    }

    /**
     * 
     */
    listBuildingsInSidebar() {
        let sidebarBodyRow = $('#left-sidebar-body .row');
        for (let i = 0; i < DependencyLoader.DisplayInSidebar.length; i++) {
            let buildingTypeString = DependencyLoader.DisplayInSidebar[i];
            let buildingReference = eval(`new ${buildingTypeString}()`);
            let col = HtmlGenerator.generateDiv(sidebarBodyRow, '', 'col-4', true);
            let entry = HtmlGenerator.generateDiv(col, '', ' ui-placement-element card h-100', true);
            let label = HtmlGenerator.generateSpan(entry, '', 'text-center', true, { text: buildingReference.name });
            entry.attr('placement-type', 'building');
            entry.attr('building-type', buildingTypeString);
        }
    }

    /**
     * 
     * @param {*} sidebarToggler 
     */
    showSidebarContent(sidebarToggler) {
        let sidebar = sidebarToggler.closest('.sidebar');
        let sidebarBody = sidebar.find('.sidebar-body');
        let icon = sidebarToggler.find('i');

        let maxWidth = application.getRenderer().canvasWidth;
        if (maxWidth < 800) maxWidth = 800;
        else maxWidth /= 3;

        sidebar.removeClass('collapsed');
        sidebar.animate({ width: maxWidth }, UI.FADING_TIME, () => {
            sidebarBody.fadeIn(UI.FADING_TIME);
        });
        icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');

    }

    /**
     * 
     * @param {*} sidebarToggler 
     */
    hideSidebarContent(sidebarToggler) {
        let sidebar = sidebarToggler.closest('.sidebar');
        let sidebarBody = sidebar.find('.sidebar-body');
        let icon = sidebarToggler.find('i');
        sidebar.addClass('collapsed');
        sidebarBody.fadeOut(UI.FADING_TIME, () => {
            sidebar.animate({ width: 50 }, UI.FADING_TIME);
        });
        icon.addClass('fa-chevron-circle-right').removeClass('fa-chevron-circle-left');
    }

}

UI.FADING_TIME = 200;