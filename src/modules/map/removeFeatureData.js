/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol              = require('openlayers'),
    $               = require('jquery'),
    _               = require('underscore'),
    getEditingLayer = require('./getEditingLayer'),
    getObject       = require('../getObject'),
    saveObjectValue = require('../form/saveObjectValue');

module.exports = function (feature) {
    var layer,
        passingObject,
        objId,
        object;

    layer  = getEditingLayer();
    objId  = feature.getId();
    object = getObject(objId);

    if (object) {
        // create object to pass to saveObjectValue
        passingObject        = {};
        passingObject._id    = objId;
        passingObject.projId = object.projId;
        passingObject.label  = layer.get('fieldLabel');
        // dont pass inputType - it's not necessary to convert the GeoJson to an Object
        passingObject.inputType = null;
        saveObjectValue(passingObject, null);
        // update field in ui
        $('#' + objId + passingObject.label).val('');
    }
};