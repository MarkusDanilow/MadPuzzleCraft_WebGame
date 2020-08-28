class UI {
    constructor() {

    }

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

    showSidebarContent(sidebarToggler) {
        let sidebar = sidebarToggler.closest('.sidebar');
        let sidebarBody = sidebar.find('.sidebar-body');
        let icon = sidebarToggler.find('i');

        let maxWidth = application.getRenderer().canvasWidth;
        if (maxWidth < 800) maxWidth = 800;
        else maxWidth /= 3;

        sidebar.removeClass('collapsed');
        sidebar.animate({ width: maxWidth }, 350, () => {
            sidebarBody.fadeIn(350);
        });
        icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');

    }

    hideSidebarContent(sidebarToggler) {
        let sidebar = sidebarToggler.closest('.sidebar');
        let sidebarBody = sidebar.find('.sidebar-body');
        let icon = sidebarToggler.find('i');
        sidebar.addClass('collapsed');
        sidebarBody.fadeOut(350, () => {
            sidebar.animate({ width: 50 }, 350);
        });

        icon.addClass('fa-chevron-circle-right').removeClass('fa-chevron-circle-left');
    }

}