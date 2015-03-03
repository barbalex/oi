// build up modify interaction
// needs a select and a modify interaction working together

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                = require('openlayers'),
    $                 = require('jquery'),
    saveFeatureData   = require('./saveFeatureData'),
    removeFeatureData = require('./removeFeatureData');

module.exports = function (layer) {
    var map = window.oi.olMap.map,
        selectInteraction,
        modifyInteraction,
        selectedFeatures,
        feature,
        selectedLayer = layer;

    console.log('addModifyInteraction to layer: ', layer.get('layerTitle'));

    // create select interaction
    selectInteraction = new ol.interaction.Select({
        // make sure only the desired layer can be selected
        /*layers: function (layer) {
            return layer === selectedLayer;
        },*/
        condition: ol.events.condition.click
    });
    // make interactions global so they can later be removed
    window.oi.olMap.map.selectInteraction = selectInteraction;
    map.addInteraction(selectInteraction);

    // grab the features from the select interaction to use in the modify interaction
    selectedFeatures = selectInteraction.getFeatures();
    // when a feature is selected...
    selectedFeatures.on('add', function (event) {
        // grab the feature
        feature = event.element;
        // ...listen for changes and save them
        feature.on('change', function () {
            saveFeatureData(feature);
        });
        // listen to pressing of delete key, then delete selected features
        $(document).on('keyup', function (event) {
            if (event.keyCode === 46) {
                // remove all selected features from selectInteraction and layer
                selectedFeatures.forEach(function (selectedFeature) {
                    var selectedFeatureId,
                        layerFeatures;

                    selectedFeatureId = selectedFeature.getId();

                    // remove from selectInteraction
                    selectedFeatures.remove(selectedFeature);

                    // remove features from vectorlayer
                    layerFeatures = layer.getSource().getFeatures();
                    layerFeatures.forEach(function (sourceFeature) {
                        var sourceFeatureId = sourceFeature.getId();

                        if (sourceFeatureId === selectedFeatureId) {
                            layer.getSource().removeFeature(sourceFeature);
                            // remove feature-data in DB
                            removeFeatureData(sourceFeature);
                        }
                    });
                });
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
            return ol.events.condition.shiftKeyOnly(event) &&
                ol.events.condition.singleClick(event);
        }
    });
    // make interactions global so they can later be removed
    window.oi.olMap.map.modifyInteraction = modifyInteraction;
    // add it to the map
    map.addInteraction(modifyInteraction);
};