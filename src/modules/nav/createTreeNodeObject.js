/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                 = require('underscore'),
    getLabelForObject = require('./getLabelForObject');

module.exports = function (object) {
    if (object && object.parent && object.parent !== null) {
        var jstreeObject = {},
            correspondingHierarchy;

        // _id wird id
        jstreeObject.id = object._id;
        // text is nameField
        correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
            return hierarchy._id === object.hId;
        });
        // beschrifte object
        if (object.data && correspondingHierarchy && correspondingHierarchy.nameField) {
            // suche nach den Metadaten des Felds
            jstreeObject.text = getLabelForObject(object, correspondingHierarchy);
            // parent ist ein descendant hierarchy, ausser in der obersten Ebene
            jstreeObject.parent = object.parent + correspondingHierarchy._id;
        } else {
            jstreeObject.text   = '<strong>(?)</strong>';
            jstreeObject.parent = object.parent;
        }
        jstreeObject.li_attr     = {};
        jstreeObject.li_attr.typ = object.typ;
        return jstreeObject;
    }
    return null;
};