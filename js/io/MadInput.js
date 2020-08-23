function MadInput() {

    this.hoveredTileCoords = { x: -1, y: -1 };

    this.dragginMouseButton = 3;
    this.draggingEnabled = false;

    this.lastDragingPosition = { x: 0, y: 0 };
    this.newDraggingPosition = { x: 0, y: 0 };

    let scope = this;

    this.initBasicEvents = function() {

        if (MadApplication.developerMode) {
            application.getRenderer().canvasReference.on('contextmenu', function(e) {
                return false;
            });
        } else {
            $('body').on('contextmenu', function(e) {
                return false;
            });
        }

        application.getRenderer().canvasReference.mousemove(function(e) {
            // include draggin mode in here as well!
            let mousePos = { x: e.pageX, y: e.pageY };
            if (scope.draggingEnabled) {
                scope.lastDragingPosition = scope.newDraggingPosition;
                scope.newDraggingPosition = mousePos;
                let delta = {
                    x: scope.newDraggingPosition.x - scope.lastDragingPosition.x,
                    y: scope.newDraggingPosition.y - scope.lastDragingPosition.y
                };
                TransformationUtil.modifyRenderingOffset(delta);
            }
            var tilePosition = TransformationUtil.toWorldCoordinates(mousePos.x, mousePos.y);
            scope.hoveredTileCoords = tilePosition;
        });

        application.getRenderer().canvasReference.mousedown(function(e) {
            if (e.which == scope.dragginMouseButton) {
                scope.draggingEnabled = true;
                scope.newDraggingPosition = { x: e.pageX, y: e.pageY };
            }
        });


        application.getRenderer().canvasReference.mouseup(function(e) {
            scope.draggingEnabled = false;
        });

        $(document).mouseout(function(e) {
            scope.hoveredTileCoords = { x: -1, y: -1 };
        });

        $(window).resize(function() {
            application.getRenderer().initCanvasSize();
        });

        // sidebar toggling
        $('.sidebar .sidebar-toggle').click(function(e) {
            let sidebar = $(this).closest('.sidebar');
            let sidebarBody = sidebar.find('.sidebar-body');
            console.log(sidebarBody);
            let icon = $('.sidebar-toggle i');
            maxWidth = application.getRenderer().canvasWidth;
            if (maxWidth < 800) maxWidth = 800;
            else maxWidth /= 3;
            if (sidebar.hasClass('collapsed')) {
                sidebar.removeClass('collapsed');
                sidebar.animate({ width: maxWidth }, 350);
                icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
                sidebarBody.removeClass('d-none');
            } else {
                sidebar.addClass('collapsed');
                sidebar.animate({ width: 50 }, 350);
                icon.addClass('fa-chevron-circle-right').removeClass('fa-chevron-circle-left');
                sidebarBody.addClass('d-none');
            }
        });

    }

    this.getHoveredTileCoords = function() {
        return this.hoveredTileCoords;
    }

    this.hoveredTileCoordsInRange = function() {
        let coords = this.getHoveredTileCoords();
        return coords.x > -1 && coords.x < GameMap.WIDTH &&
            coords.y > -1 && coords.y < GameMap.HEIGHT;
    }

}