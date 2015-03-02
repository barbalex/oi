/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $         = require('jquery'),
    _         = require('underscore'),
    editLayer = require('../map/editLayer');

module.exports = function () {
    var layerTitle = $(this).closest('.list-group').data('object').layerTitle,
        layers     = window.oi.olMap.map.getLayers().getArray(),
        layer;

    layer = _.filter(layers, function (layer) {
        return layer.get('layerTitle') === layerTitle;
    });
    if (layer && layer[0]) {
        layer = layer[0];

        if (this.checked) {
            $('#utilsEditLayer').show();
            $('#utilsEditChoose').trigger('click');
            editLayer(layer);
        } else {
            $('#utilsEditLayer').hide();
            // TODO: call function that makes layer not modifiable?
            
        }
    }
};