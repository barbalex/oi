/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                              = require('underscore'),
    createTreeNodeObject           = require('./createTreeNodeObject'),
    createTreeNodeRootObject       = require('./createTreeNodeRootObject'),
    createChildHierarchiesOfObject = require('./createChildHierarchiesOfObject'),
    setupFirstProject              = require('../setupFirstProject');

module.exports = function () {
    var objectsData          = [],
        childHierarchiesData = [],
        obj,
        dat;

    if (window.oi.objects.length === 0) {
        setupFirstProject();
    }

    _.each(window.oi.objects, function (object) {
        if (object && (object.parent || object.parent === null)) {
            obj = object.parent === null ? createTreeNodeRootObject(object) : createTreeNodeObject(object);
            if (obj) {
                objectsData.push(obj);
            }
        }
    });

    _.each(window.oi.objects, function (object) {
        dat = createChildHierarchiesOfObject(object);
        if (dat.length > 0) {
            childHierarchiesData = _.union(childHierarchiesData, dat);
        }
    });

    return _.union(objectsData, childHierarchiesData);
};