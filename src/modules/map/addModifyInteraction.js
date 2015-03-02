// build up modify interaction
// needs a select and a modify interaction working together

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol          = require('openlayers'),
    $           = require('jquery'),
    saveFeature = require('./saveFeature');

module.exports = function (layer) {
    var map = window.oi.olMap.map,
        selectInteraction,
        modifyInteraction,
        selectedFeatures,
        feature,
        selectedLayer = layer;

    // create select interaction
    selectInteraction = new ol.interaction.Select({
        // make sure only the desired layer can be selected
        layers: function (layer) {
            return layer === selectedLayer;
        }
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
            console.log('on add feature: event: ', event);
            console.log('on add feature: feature: ', feature);
            saveFeature(feature);
        });
        // listen to pressing of delete key, then delete selected features
        $(document).on('keyup', function (event) {
            var selectedFeatureId,
                layerFeatures;
            if (event.keyCode === 46) {
                // remove all selected features from selectInteraction and layer
                selectedFeatures.forEach(function (selectedFeature) {
                    selectedFeatureId = selectedFeature.getId();
                    // remove from selectInteraction
                    selectedFeatures.remove(selectedFeature);
                    // features aus vectorlayer entfernen
                    layerFeatures = layer.getSource().getFeatures();
                    layerFeatures.forEach(function (sourceFeature) {
                        var sourceFeatureId = sourceFeature.getId();
                        if (sourceFeatureId === selectedFeatureId) {
                            // remove from layer
                            layer.getSource().removeFeature(sourceFeature);
                            // TODO: Delete the Feature
                            console.log('delete sourceFeature: ', sourceFeature);
                            //saveFeature(sourceFeature);
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