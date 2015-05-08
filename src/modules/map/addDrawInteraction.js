/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                 = require('openlayers'),
    toggleEditButtons  = require('./toggleEditButtons'),
    onEndDraw          = require('./onEndDraw'),
    addSnapInteraction = require('./addSnapInteraction');

module.exports = function (layer, geometryType) {
    var map = window.oi.olMap.map,
        drawInteraction;

    toggleEditButtons();

    // create the interaction
    drawInteraction = new ol.interaction.Draw({
        source: layer.getSource(),
        type: /** @type {ol.geom.GeometryType} */ (geometryType)
    });
    // add it to the map
    map.addInteraction(drawInteraction);
    // make it global so it can be cancelled
    window.oi.olMap.map.drawInteraction = drawInteraction;

    // when a new feature has been drawn...
    drawInteraction.on('drawend', onEndDraw);

    // add snap interaction if clicked
    addSnapInteraction(layer);
};