/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('openlayers');

module.exports = function (layer) {
    var map = window.oi.olMap.map,
        snapInteraction;

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
};