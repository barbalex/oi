/*
 * adds a layer to the layercontrol
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                     = require('jquery'),
    capitalizeFirstLetter = require('../capitalizeFirstLetter'),
    layertoolListGroup    = require('../../../templates/layertoolListGroup');

module.exports = function (layer, checked) {
    var dataObject = {},
        layerGroup,
        collapseSelector;

    dataObject.layerTitle    = layer.get('layerTitle');
    dataObject.showControlId = 'show' + layer.get('layerName');
    dataObject.checked       = checked ? 'checked' : '';
    layerGroup               = layer.get('layerGroup');
    collapseSelector         = '#collapse' + capitalizeFirstLetter(layerGroup);

    $(collapseSelector).append(layertoolListGroup(dataObject));
};