/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                        = require('underscore'),
    getLabelForObject        = require('./getLabelForObject'),
    createTreeNodeObject     = require('./createTreeNodeObject'),
    createTreeNodeRootObject = require('./createTreeNodeRootObject');

// creates descendant hierarchical objects of single objects
// adds them to an array
function createDescendantHierarchiesOfObject(object) {
    var descendantHierarchies,
        jstreeHierarchies = [],
        jstreeHierarchy;

    // look for descendant hierarchies
    descendantHierarchies = _.filter(window.oi.hierarchies, function (hierarchy) {
        return hierarchy.parent !== null && hierarchy.parent === object.hId && _.indexOf(hierarchy.projIds, object.projId) > -1;
    });

    if (descendantHierarchies.length > 0) {
        _.each(descendantHierarchies, function (hierarchy) {
            jstreeHierarchy                  = {};
            jstreeHierarchy.id               = object._id + hierarchy._id;
            jstreeHierarchy.parent           = object._id;
            jstreeHierarchy.text             = hierarchy.name || '(?)';
            // weitere Daten mitgeben
            jstreeHierarchy.data             = {};
            jstreeHierarchy.data.type        = hierarchy.type;
            jstreeHierarchy.data.id          = hierarchy._id;
            jstreeHierarchy.data.objectId    = object._id;
            jstreeHierarchies.push(jstreeHierarchy);
        });
        return jstreeHierarchies;
    }
    return [];
}

module.exports = function () {
    // globals for data are: window.oi.hierarchies, window.oi.objects
    var objectsData = [],
        descendantHierarchiesData = [],
        obj,
        dat;

    _.each(window.oi.objects, function (object) {
        if (object && (object.parent || object.parent === null)) {
            obj = object.parent === null ? createTreeNodeRootObject(object) : createTreeNodeObject(object);
            if (obj) {
                objectsData.push(obj);
            }
        }
    });

    _.each(window.oi.objects, function (object) {
        dat = createDescendantHierarchiesOfObject(object);
        if (dat.length > 0) {
            descendantHierarchiesData = _.union(descendantHierarchiesData, dat);
        }
    });

    return _.union(objectsData, descendantHierarchiesData);
};