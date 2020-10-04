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
            let placement = application.getEntityPlacementHandler();
            if (placement.isSelectedPlacement($(this))) {
                placement.resetUiPlacementElement();
            } else {
                placement.handlePlacement($(this));
            }
        });

    }


    this.init();

}