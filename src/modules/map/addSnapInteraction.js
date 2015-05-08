/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol              = require('openlayers'),
    $               = require('jquery'),
    getEditingLayer = require('./getEditingLayer');

module.exports = function (layer) {
    var map = window.oi.olMap.map,
        snapInteraction;

    if (!layer) {
        // find out which layer is beeing edited
        layer = getEditingLayer();
    }

    // check if snap is wanted
    if ($('#utilsSnap').is(':checked')) {
        // create the interaction
        snapInteraction = new ol.interaction.Snap({
            source: layer.getSource()
        });
        // add it to the map
        map.addInteraction(snapInteraction);
        // make it global so it can be cancelled
        // snapping should be possible on several layers
        // so give the snap interaction a name
        if (!window.oi.olMap.map.snapInteraction) {
            window.oi.olMap.map.snapInteraction = {};
        }
        window.oi.olMap.map.snapInteraction[layer.get('layerName') || 'noLayerName'] = snapInteraction;
    }
};