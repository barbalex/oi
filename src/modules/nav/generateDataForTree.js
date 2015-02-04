/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                    = require('underscore'),
    getLabelForObject    = require('./getLabelForObject'),
    createTreeNodeObject = require('./createTreeNodeObject');

// creates descendant hierarchical objects of single objects
// adds them to an array
function createDescendantHierarchiesOfObject(object) {
    var descendantHierarchies,
        jstreeHierarchies = [],
        jstreeHierarchy;

    // look for descendant hierarchies
    descendantHierarchies = _.filter(window.oi.hierarchies, function (hierarchy) {
        return hierarchy.parent !== null && hierarchy.parent == object.hId && _.indexOf(hierarchy.projIds, object.projId) > -1;
    });

    if (descendantHierarchies.length > 0) {
        _.each(descendantHierarchies, function (hierarchy) {
            jstreeHierarchy             = {};
            // _id wird id
            jstreeHierarchy.id          = object._id + hierarchy._id;
            // parent
            jstreeHierarchy.parent      = object._id;
            // text is name
            jstreeHierarchy.text        = hierarchy.name || '(?)';
            // typ mitgeben
            jstreeHierarchy.li_attr     = {};
            jstreeHierarchy.li_attr.typ = hierarchy.typ;
            jstreeHierarchies.push(jstreeHierarchy);
        });
        return jstreeHierarchies;
    }
    return [];
}

function createTopObjectsData() {
    var topObjects,
        topObjectsArray = [];

    topObjects = _.filter(window.oi.objects, function (object) {
        return object.parent === null;
    });

    _.each(topObjects, function (object) {
        var jstreeObject = {},
            correspondingHierarchy;

        // _id wird id
        jstreeObject.id = object._id;
        // text is nameField
        correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
            return hierarchy._id == object.hId;
        });
        // beschrifte object
        if (object.data && correspondingHierarchy && correspondingHierarchy.nameField) {
            jstreeObject.text = '<strong>' + object.data[correspondingHierarchy.nameField] + '</strong>';
        } else {
            jstreeObject.text = '<strong>(?)</strong>';
        }
        // parent ist ein descendant hierarchy, ausser in der obersten Ebene
        jstreeObject.parent      = '#';
        jstreeObject.li_attr     = {};
        jstreeObject.li_attr.typ = object.typ;
        topObjectsArray.push(jstreeObject);
    });

    return topObjectsArray;
}

// momentan unbenutzt
function createTopHierarchies(hierarchies) {
    // look for descendant hierarchies
    var topHierarchies,
        topHierarchiesData = [];

    topHierarchies = _.filter(hierarchies, function (hierarchy) {
        return hierarchy.parent === null;
    });

    _.each(topHierarchies, function (hierarchy) {
        var jstreeHierarchy = {};
        // _id wird id
        jstreeHierarchy.id = hierarchy._id;
        // parent
        jstreeHierarchy.parent = '#';
        // text is name
        jstreeHierarchy.text = hierarchy.name || '(?)';
        // typ mitgeben
        jstreeHierarchy.typ = hierarchy.typ;
        topHierarchiesData.push(jstreeHierarchy);
    });

    return topHierarchiesData;
}

module.exports = function () {
    // globals for data are: window.oi.hierarchies, window.oi.objects
    var objectsData = [],
        descendantHierarchiesData = [],
        topObjectsData,
        obj,
        dat;

    _.each(window.oi.objects, function (object) {
        obj = createTreeNodeObject(object);
        if (obj) {
            objectsData.push(obj);
        }
    });

    _.each(window.oi.objects, function (object) {
        dat = createDescendantHierarchiesOfObject(object);
        if (dat.length > 0) {
            descendantHierarchiesData = _.union(descendantHierarchiesData, dat);
        }
    });

    topObjectsData = createTopObjectsData();

    return _.union(objectsData, descendantHierarchiesData, topObjectsData);
};