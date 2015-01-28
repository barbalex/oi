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

function mapHierarchyToJstreeData(hierarchy) {
    // _id wird id
    hierarchy.id = hierarchy._id;
    delete hierarchy._id;
    // parent
}

function mapObjectToJstreeData(object) {
    // _id wird id
    object.id = object._id;
    delete object._id;
    // parent ist das Hierarchieobjekt
    object.parent = object.hId;
    delete object.type;
    delete object.users;
    delete object.editedBy;
    delete object.data;
    delete object._rev;
    return object;
}

module.exports = function () {

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

        var data = [];

        console.log('results.hierarchies: ', results.hierarchies);
        console.log('results.objects: ', results.objects);

        // höchste Hierarchieebene holen
        /*var hierarchy0 = _.find(results.hierarchies, function (hierarchy) {
            return hierarchy.parent === null;
        });*/

        // Daten für jstree aufbereiten
        // alle Objekte holen
        var objectData = _.map(results.objects, mapObjectToJstreeData);

        console.log('objectData after map: ', objectData);

        _.each(objectData, function (data) {
            var h = _.find(results.hierarchies, function (hierarchy) {
                return hierarchy._id == data.hId;
            });
            if (h && h.nameField) {
                data.text = data[h.nameField];
            } else {
                data.text = '(?)';
            }
        });

        console.log('objectData after find: ', objectData);

        // hierarchie holen

        // name als text ergänzen

        $('#navContent').jstree({
            'plugins': ['wholerow', 'unique', 'dnd', 'state', 'contextmenu'],
            'core': {
                'data': objectData,
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