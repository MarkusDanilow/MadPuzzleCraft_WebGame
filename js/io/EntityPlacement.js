class EntityPlacement {

    /**
     * 
     */
    constructor() {
        this.placementHandlers = {
            'building': this.handlePlaceBuilding
        };

        this.activeUiPlacementElement = null;

    }

    /**
     * 
     */
    resetUiPlacementElement() {
        if (!this.activeUiPlacementElement) return;
        this.activeUiPlacementElement.removeClass("active");
        this.activeUiPlacementElement = null;
        application.getInput().definePlacementEntity(null);
    }

    /**
     * 
     */
    setUiPlacementElement(element) {
        if (!element) return;
        if (this.isPlacementInProgress()) {
            this.resetUiPlacementElement();
        }
        this.activeUiPlacementElement = element;
        this.activeUiPlacementElement.addClass("active");
    }

    /**
     * 
     * @param {*} element 
     */
    isSelectedPlacement(element) {
        if (element == null || !this.isPlacementInProgress()) return false;
        return element[0] === this.activeUiPlacementElement[0];
    }

    /**
     * 
     */
    isPlacementInProgress() {
        return this.activeUiPlacementElement != null;
    }

    /**
     * 
     * @param {*} uiPlacementElement 
     */
    handlePlacement(uiPlacementElement = null) {
        if (!uiPlacementElement) return;
        let placementType = $(uiPlacementElement).attr('placement-type');
        let placementHandler = this.placementHandlers[placementType];
        if (placementHandler) {
            this.setUiPlacementElement(uiPlacementElement);
            placementHandler(uiPlacementElement);
        }
    }

    /**
     * 
     * @param {*} uiPlacementElement 
     */
    handlePlaceBuilding(uiPlacementElement) {
        // instantiate building type and add to ui module as temp. entity
        let buildingTypeString = $(uiPlacementElement).attr('building-type');
        let buildingReference = eval(`new ${buildingTypeString}()`);
        application.getInput().definePlacementEntity(buildingReference);
    }

}