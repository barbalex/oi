// build up select interaction

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
'use strict';

var ol                    = require('openlayers'),
    $                     = require('jquery'),
    _                     = require('underscore'),
    removeAllInteractions = require('../map/removeAllInteractions'),
    selectObjectNode      = require('../nav/selectObjectNode');

module.exports = function () {
    var map = window.oi.olMap.map,
        selectInteraction,
        selectedFeatures,
        feature,
        layer,
        layerName,
        correspondingHierarchy,
        $jstree = $('#navContent').jstree(true);

    removeAllInteractions();

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
            selectedObj,
            vectorLayerFeature,
            vectorLayerFeatureCoordinates,
            featureCoordinates,
            layers,
            projectLayers,
            projectLayersFeatures = [];

        // grab the feature
        feature = event.element;
        // show this feature in tree und Formular anzeigen
        objId = feature.getId();
        selectedObj = $jstree.get_selected(true)[0];
        if (!window.oi.dontSelectTree) {
            selectObjectNode(objId);
            window.oi.olMap.dontZoom = true;
        } else {
            delete window.oi.dontSelectTree;
        }
        // bind features geometry to vector features geometry
        // problem: if object has several geometry fields, layername can not be found as feature only has object._id
        // so search in the combined features of all layers with layerGroup === 'projects'
        // bindTo is not documented
        // this breaks at the bindTo line
        /*
        layers = window.oi.olMap.map.getLayers().getArray();
        projectLayers = _.filter(layers, function (layer) {
            return layer.get('layerGroup') === 'projects';
        });
        _.each(projectLayers, function (layer) {
            projectLayersFeatures = projectLayersFeatures.concat(layer.getSource().getFeatures());
        });
        featureCoordinates = JSON.stringify(feature.getGeometry().getCoordinates());
        vectorLayerFeature = _.find(projectLayersFeatures, function (projectLayersFeature) {
            vectorLayerFeatureCoordinates = JSON.stringify(projectLayersFeature.getGeometry().getCoordinates());
            return vectorLayerFeatureCoordinates === featureCoordinates;
        });
        if (vectorLayerFeature) {
            feature.getGeometry().bindTo(vectorLayerFeature.getGeometry());
        }*/
    });
};