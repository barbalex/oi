/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                     = require('openlayers'),
    $                      = require('jquery'),
    _                      = require('underscore'),
    removeSnapInteractions = require('../map/removeSnapInteractions'),
    addSnapInteractions    = require('../map/addSnapInteractions');

module.exports = function () {
    var map       = window.oi.olMap.map,
        layerName = $(this).closest('.list-group').data('object').layerName,
        layers    = map.getLayers().getArray(),
        layer;

    layer = _.filter(layers, function (layer) {
        return layer.get('layerName') === layerName;
    })[0];
    if (layer) {
        if (this.checked) {
            layer.set('snappable', true);
        } else {
            layer.set('snappable', false);
        }
        // check if snapping interaction(s) exists
        // if true: cancel and recreate
        removeSnapInteractions();
        addSnapInteractions();
    }
};