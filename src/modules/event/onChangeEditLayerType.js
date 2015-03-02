/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                    = require('openlayers'),
    _                     = require('underscore'),
    removeAllInteractions = require('../map/removeAllInteractions'),
    addModifyInteraction  = require('../map/addModifyInteraction'),
    addDrawInteraction    = require('../map/addDrawInteraction');

module.exports = function () {
    var map,
        layer,
        layers,
        geometryType;

    map    = window.oi.olMap.map;
    layers = map.getLayers().getArray();
    layer  = _.filter(layers, function (layer) {
        return layer.get('editing') === true;
    })[0];

    // first remove all remaining interactions
    removeAllInteractions();

    if (layer) {
        if (this.id === 'utilsEditChoose') {
            // add modify interaction
            addModifyInteraction(layer);
        } else {
            // add draw interaction
            geometryType = this.value;
            addDrawInteraction(layer, geometryType);
        }
    }
};