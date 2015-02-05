// creates descendant hierarchical objects of single objects
// adds them to an array

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function (object) {
    var descendantHierarchies,
        jstreeHierarchies = [],
        jstreeHierarchy;

    // look for descendant hierarchies desselben Projekts
    descendantHierarchies = _.filter(window.oi.hierarchies, function (hierarchy) {
        return hierarchy.parent !== null && hierarchy.parent === object.hId && _.indexOf(hierarchy.projIds, object.projId) > -1;
    });

    if (descendantHierarchies.length > 0) {
        _.each(descendantHierarchies, function (hierarchy) {
            jstreeHierarchy               = {};
            jstreeHierarchy.id            = object._id + hierarchy._id;
            jstreeHierarchy.parent        = object._id;
            jstreeHierarchy.text          = hierarchy.name || '(kein Wert)';
            // weitere Daten mitgeben
            jstreeHierarchy.data          = {};
            jstreeHierarchy.data.type     = 'hierarchy';
            jstreeHierarchy.data.id       = hierarchy._id;
            jstreeHierarchy.data.objectId = object._id;
            jstreeHierarchy.data.projId   = object.projId;
            jstreeHierarchies.push(jstreeHierarchy);
        });
        return jstreeHierarchies;
    }
    return [];
};