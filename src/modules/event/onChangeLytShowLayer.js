/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function () {
    var layerTitle = $(this).next('.lytListGroupLabelText').html(),
        layers     = window.oi.olMap.map.getLayers().getArray(),
        layer,
        backgroundLayers;

    layer = _.filter(layers, function (layer) {
        return layer.get('layerTitle') === layerTitle;
    });
    if (layer && layer[0]) {
        if (layer[0].get('layerGroup') === 'background') {
            // these are radios, so all other background layers need to be invisible
            backgroundLayers = _.filter(layers, function (layer) {
                return layer.get('layerGroup') === 'background';
            });
            _.each(backgroundLayers, function (layer) {
                layer.setVisible(false);
            });
        }
        layer[0].setVisible(this.checked);
    }
};