/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function () {
    var layerTitle = $(this).next('.lytListGroupLabelText').html(),
        layers     = window.oi.olMap.map.getLayers().getArray(),
        layer;

    layer = _.filter(layers, function (layer) {
        return layer.get('layerTitle') === layerTitle;
    });
    if (layer[0]) {
        console.log('layer: ', layer[0]);
        layer[0].setVisible(this.checked);
    }
};