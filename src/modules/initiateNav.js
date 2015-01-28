/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $       = require('jquery'),
    _       = require('underscore'),
    PouchDB = require('pouchdb'),
    db      = new PouchDB('oi'),
    sync    = require('./syncPouch'),
    jstree  = require('jstree'),
    async   = require('async'),
    hierarchies,
    objects;

function mapHierarchies(doc) {
    if (doc.type === 'hierarchy') {
        emit(doc._id);
    }
}

function mapObjects(doc) {
    if (doc.type === 'object') {
        emit(doc._id);
    }
}

function createObjectsData(object, results, objectsData) {
    if (object.parent !== null) {
        var jstreeObject = {};
        // _id wird id
        jstreeObject.id = object._id;
        // text is nameField
        var h = _.find(results.hierarchies, function (hierarchy) {
            return hierarchy._id == object.hId;
        });
        // beschrifte object
        if (object.data && h && h.nameField) {
            jstreeObject.text = object.data[h.nameField];
        } else {
            jstreeObject.text = '(?)';
        }
        // parent ist ein descendant hierarchy, ausser in der obersten Ebene
        jstreeObject.parent = object.parent + h._id;
        objectsData.push(jstreeObject);
    }
}

function createTopObjectsData(objects, results) {
    var topObjects = _.filter(objects, function (object) {
        return object.parent === null;
    });
    var topObjectsArray = [];

    _.each(topObjects, function (object) {
        var jstreeObject = {};
        // _id wird id
        jstreeObject.id = object._id;
        // text is nameField
        var h = _.find(results.hierarchies, function (hierarchy) {
            return hierarchy._id == object.hId;
        });
        // beschirfte object
        if (object.data && h && h.nameField) {
            jstreeObject.text = object.data[h.nameField];
        } else {
            jstreeObject.text = '(?)';
        }
        // parent ist ein descendant hierarchy, ausser in der obersten Ebene
        jstreeObject.parent = '#';
        topObjectsArray.push(jstreeObject);
    });

    return topObjectsArray;
}

// creates descendant hierarchical objects of single objects
// adds them to an array
function createDescendantHierarchiesOfObject(object, hierarchies, descendantHierarchiesData) {
    // look for descendant hierarchies
    var descendantHierarchies = _.filter(hierarchies, function (hierarchy) {
        return hierarchy.parent !== null && hierarchy.parent == object.hId && _.indexOf(hierarchy.projIds, object.projId) > -1;
    });

    _.each(descendantHierarchies, function (hierarchy) {
        var jstreeHierarchy = {};
        // _id wird id
        jstreeHierarchy.id = object._id + hierarchy._id;
        // parent
        jstreeHierarchy.parent = object._id;
        // text is name
        jstreeHierarchy.text = hierarchy.name || '(?)';
        // add to array
        descendantHierarchiesData.push(jstreeHierarchy);
    });
}

function createTopHierarchies(hierarchies) {
    // look for descendant hierarchies
    var topHierarchies = _.filter(hierarchies, function (hierarchy) {
        return hierarchy.parent === null;
    });

    var topHierarchiesData = [];

    _.each(topHierarchies, function (hierarchy) {
        var jstreeHierarchy = {};
        // _id wird id
        jstreeHierarchy.id = hierarchy._id;
        // parent
        jstreeHierarchy.parent = '#';
        // text is name
        jstreeHierarchy.text = hierarchy.name || '(?)';
        topHierarchiesData.push(jstreeHierarchy);
    });

    return topHierarchiesData;
}

module.exports = function () {

    // NUR FÜR ENTWICKLUNG
    // zuerst db komprimieren - sonst sind komische Daten drin
    db.compact();

    sync();

    async.parallel({
        hierarchies: function (callback) {
            db.query({map: mapHierarchies}, {reduce: false, include_docs: true}, function (err, response) {
                hierarchies = _.map(response.rows, function (row) {
                    return row.doc;
                });
                callback(null, hierarchies);
            });
        },
        objects: function (callback) {
            db.query({map: mapObjects}, {reduce: false, include_docs: true}, function (err, response) {
                objects = _.map(response.rows, function (row) {
                    return row.doc;
                });
                callback(null, objects);
            });
        }
    }, function (err, results) {
        if (err) { return console.log('error: ', err); }
        // results equals to: { hierarchies: hierarchies, objects: objects }

        // Daten für jstree aufbereiten
        // alle Objekte holen
        var objectsData = [];
        _.each(results.objects, function (object) {
            createObjectsData(object, results, objectsData);
        });
        console.log('objectsData: ', objectsData);

        var descendantHierarchiesData = [];
        _.each(results.objects, function (object) {
            createDescendantHierarchiesOfObject(object, results.hierarchies, descendantHierarchiesData);
        });
        console.log('descendantHierarchiesData: ', descendantHierarchiesData);

        var topObjectsData = createTopObjectsData(objects, results);
        console.log('topObjectsData: ', topObjectsData);

        $('#navContent').jstree({
            'plugins': ['wholerow', 'unique', 'dnd', 'state', 'contextmenu'],
            'core': {
                'data': _.union(objectsData, descendantHierarchiesData, topObjectsData),
                'themes': {
                    'responsive': true,
                    'icons':      false,
                    'dots':       true
                },
                'check_callback': true,
                'multiple':       false
            }
        });
    });
};