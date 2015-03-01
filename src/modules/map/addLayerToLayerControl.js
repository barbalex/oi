/*
 * adds a layer to the layercontrol
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                     = require('jquery'),
    capitalizeFirstLetter = require('../capitalizeFirstLetter'),
    layertoolListGroup    = require('../../../templates/layertoolListGroup');

module.exports = function (layer) {
    var dataObject = {},
        layerGroup,
        collapseSelector;

    dataObject.layerTitle    = layer.get('layerTitle');
    dataObject.showControlId = 'show' + layer.get('layerName');
    dataObject.checked       = layer.getVisible() ? 'checked' : '';
    layerGroup               = layer.get('layerGroup');
    dataObject.inputType     = layerGroup === 'background' ? 'radio' : 'checkbox';
    // name attribute is needed for radios so only one can be choosen
    dataObject.inputName     = layerGroup === 'background' ? 'lytBackground' : '';
    collapseSelector         = '#collapse' + capitalizeFirstLetter(layerGroup);

    $(collapseSelector).append(layertoolListGroup(dataObject));
};