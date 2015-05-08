/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $               = require('jquery'),
    getEditingLayer = require('./getEditingLayer'),
    guid            = require('../guid'),
    saveFeatureData = require('./saveFeatureData');

module.exports = function (event) {
    // Two cases:
    // 1. changing geometry of existing object that is shown in form
    //    how to tell: geoJson Field of modifiable layer is empty
    //    - get guid from jstree active node
    //    - set id of feature
    //    - save feature data
    // 2. TODO: creating new geometry for new object
    //    how to tell: geoJson Field of modifiable layer is not empty
    //    - create new guid
    //    - create new doc with sensible nameField and geometry
    //    - refresh jstree and form
    var feature,
        layer,
        objId,
        label,
        geomElemVal;

    feature     = event.feature;
    layer       = getEditingLayer();
    objId       = $('#navContent').jstree(true).get_selected(true)[0].id;
    label       = layer.get('fieldLabel');
    geomElemVal = objId ? $('#' + objId + label).val() : null;  // if no object is active, create new one

    if (geomElemVal) {
        // TODO
        console.log('oops: a new object should be created here. This functionality is not yet implemented');
        //feature.setId(guid());
    } else {
        // give the feature an id
        // it is later needed to delete features
        feature.setId(objId);
        // ...save the changed data
        saveFeatureData(feature);
    }
    // jetzt auf auswählen wechseln
    $('#utilsEditChoose').trigger('click');
};