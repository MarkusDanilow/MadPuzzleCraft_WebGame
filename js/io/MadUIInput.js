function MadUIInput() {

    this.init = function() {
        this.initSidebarEvents();
    }

    this.initSidebarEvents = function() {
        // sidebar toggling
        $('.sidebar .sidebar-toggle').click(function(e) {
            let sidebar = $(this).closest('.sidebar');
            if (sidebar.hasClass('collapsed')) {
                application.getUI().showSidebarContent($(this));
            } else {
                application.getUI().hideSidebarContent($(this));
            }
        });

        // clicking a UI button to place something in the world
        $('body').on('click', '.ui-placement-element', function(e) {
            let placementType = $(this).attr('placement-type');
            switch (placementType) {
                case 'building':
                    // instantiate building type and add to ui module as temp. entity
                    let buildingTypeString = $(this).attr('building-type');
                    let buildingReference = eval(`new ${buildingTypeString}()`);
                    application.getInput().definePlacementEntity(buildingReference);
                    break;
            }
        });

    }


    this.init();

}