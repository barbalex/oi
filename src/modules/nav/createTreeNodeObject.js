/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                 = require('underscore'),
    getLabelForObject = require('./getLabelForObject');

module.exports = function (object) {
    var jstreeObject,
        correspondingHierarchy;

    jstreeObject           = {};
    jstreeObject.id        = object._id;
    // weitere Daten mitgeben
    jstreeObject.data      = {};
    jstreeObject.data.type = 'object';
    // text is nameField
    correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
        return hierarchy._id === object.hId;
    });
    // beschrifte object
    if (object.data && correspondingHierarchy && correspondingHierarchy.nameField) {
        // suche nach den Metadaten des Felds
        jstreeObject.text   = getLabelForObject(object, correspondingHierarchy);
        // parent ist ein descendant hierarchy, ausser in der obersten Ebene
        jstreeObject.parent = object.parent + correspondingHierarchy._id;
    } else {
        jstreeObject.text   = '<strong>(kein Wert)</strong>';
        jstreeObject.parent = object.parent;
    }

    return jstreeObject;
};