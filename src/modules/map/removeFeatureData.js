/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                   = require('openlayers'),
    $                    = require('jquery'),
    _                    = require('underscore'),
    getEditingLayer      = require('./getEditingLayer'),
    getObject            = require('../getObject'),
    saveObjectValue      = require('../form/saveObjectValue'),
    fitTextareaToContent = require('../form/fitTextareaToContent');

module.exports = function (feature) {
    var layer,
        passingObject,
        objId,
        object,
        label,
        geomElem;

    layer  = getEditingLayer();
    objId  = feature.getId();
    object = getObject(objId);
    label  = layer.get('fieldLabel');

    if (object) {
        // create object to pass to saveObjectValue
        passingObject        = {};
        passingObject._id    = objId;
        passingObject.projId = object.projId;
        passingObject.label  = label;
        // dont pass inputType - it's not necessary to convert the GeoJson to an Object
        passingObject.inputType = null;
        saveObjectValue(passingObject, null);
        // update field in ui
        geomElem = $('#' + objId + label);
        geomElem.val('');
        fitTextareaToContent(objId + label);
    }
};