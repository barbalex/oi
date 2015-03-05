// build up select interaction

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
'use strict';

var ol = require('openlayers'),
    $  = require('jquery');

module.exports = function () {
    var map = window.oi.olMap.map,
        selectInteraction,
        selectedFeatures,
        feature,
        $jstree = $('#navContent').jstree(true);

    // create select interaction
    selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.click
    });
    // make interactions global so they can later be removed
    window.oi.olMap.map.selectInteraction = selectInteraction;
    map.addInteraction(selectInteraction);

    // grab the features from the select interaction to use in the modify interaction
    selectedFeatures = selectInteraction.getFeatures();
    // when a feature is selected...
    selectedFeatures.on('add', function (event) {
        var objId,
            selectedObj;
        // grab the feature
        feature = event.element;
        // show this feature in tree und Formular anzeigen
        objId = feature.getId();
        selectedObj = $jstree.get_selected(true)[0];
        if (!selectedObj || objId !== selectedObj.id) {
            $jstree.deselect_all();
            window.oi.olMap.dontZoom = true;
            $jstree.select_node('#' + objId);
        }
    });
};