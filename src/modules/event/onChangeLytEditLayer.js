/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                    = require('openlayers'),
    $                     = require('jquery'),
    _                     = require('underscore'),
    removeAllInteractions = require('../map/removeAllInteractions'),
    addSelectInteraction  = require('../map/addSelectInteraction');

module.exports = function () {
    var layerTitle = $(this).closest('.list-group').data('object').layerTitle,
        layers     = window.oi.olMap.map.getLayers().getArray(),
        layer;

    layer = _.filter(layers, function (layer) {
        return layer.get('layerTitle') === layerTitle;
    })[0];
    if (layer) {
        if (this.checked) {
            layer.set('editing', true);
            $('#utilsEditLayer').show();
            // trigger changing of edit-modus (starts modify-interaction)
            $('#utilsEditChoose').trigger('click');
        } else {
            layer.set('editing', false);
            $('#utilsEditLayer').hide();
            removeAllInteractions();
            addSelectInteraction();
        }
    }
};