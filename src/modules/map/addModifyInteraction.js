// build up modify interaction
// needs a select and a modify interaction working together

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
'use strict';

var ol                     = require('openlayers'),
    $                      = require('jquery'),
    saveFeatureData        = require('./saveFeatureData'),
    removeFeatureData      = require('./removeFeatureData'),
    toggleEditButtons      = require('./toggleEditButtons'),
    removeAllInteractions  = require('./removeAllInteractions'),
    selectObjectNode       = require('../nav/selectObjectNode'),
    addDragboxInteraction  = require('./addDragboxInteraction'),
    deleteSelectedFeatures = require('./deleteSelectedFeatures');

module.exports = function (layer) {
    var map = window.oi.olMap.map,
        selectInteraction,
        modifyInteraction,
        selectedFeatures,
        feature,
        layerName = layer.get('layerName'),
        $jstree = $('#navContent').jstree(true);

    removeAllInteractions();

    // create select interaction
    selectInteraction = new ol.interaction.Select({
        // make sure only the desired layer can be selected
        layers: function (layer) {
            return layer.get('layerName') === layerName;
        },
        condition: ol.events.condition.click
    });

    // make interactions global so they can later be removed
    window.oi.olMap.map.selectInteraction = selectInteraction;
    map.addInteraction(selectInteraction);

    addDragboxInteraction();

    // grab the features from the select interaction to use in the modify interaction
    selectedFeatures = selectInteraction.getFeatures();

    // when features are changed
    selectedFeatures.on('remove', function (event) {

        console.log('feature removed from select interaction');

        toggleEditButtons();
    });

    // when a feature is selected...
    selectedFeatures.on('add', function (event) {
        var objId,
            selectedObj;

        console.log('feature added to select interaction');

        toggleEditButtons();

        // grab the feature
        feature = event.element;
        // dieses Objekt in tree und Formular anzeigen
        objId = feature.getId();
        selectObjectNode(objId);

        // problem: change happens for every pixel that a point is dragged!
        // need to call it only on dragend. But there is no such event
        // counts how often .on('change') happened
        window.oi.eventCounter = 0;
        // ...listen for changes and save them
        feature.on('change', function () {
            var counter,
                that = this;

            window.oi.eventCounter++;
            // registers how often .on('change') happened before end of timeout
            counter = window.oi.eventCounter;
            setTimeout(function () {
                if (counter === window.oi.eventCounter) {
                    // during the timeout no further change happened > do it!
                    saveFeatureData(that);
                }
            }, 200);
        });
        // listen to pressing of delete key, then delete selected features
        $(document).on('keyup', function (event) {
            if (event.keyCode === 46) {
                // remove all selected features from selectInteraction and layer
                deleteSelectedFeatures();
                // remove listener
                $(document).off('keyup');
            }
        });
    });

    // create the modify interaction
    modifyInteraction = new ol.interaction.Modify({
        features: selectedFeatures,
        // delete vertices by pressing the SHIFT key
        deleteCondition: function (event) {
            return (ol.events.condition.shiftKeyOnly(event) || $('#utilsEditDeletePoint').is(':checked')) &&
                ol.events.condition.singleClick(event);
        }
    });
    // make interactions global so they can later be removed
    window.oi.olMap.map.modifyInteraction = modifyInteraction;
    // add it to the map
    map.addInteraction(modifyInteraction);
    // enable buttons
    toggleEditButtons();
};