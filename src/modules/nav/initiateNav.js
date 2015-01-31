/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $            = require('jquery'),
    _            = require('underscore'),
    PouchDB      = require('pouchdb'),
    db           = new PouchDB('oi'),
    sync         = require('../syncPouch'),
    async        = require('async'),
    createTree   = require('./createTree'),
    initiateForm = require('../form/initiateForm');

// expose pouchdb to pouchdb-fauxton
window.PouchDB = PouchDB;

// TODO: auf den aktuellen Benutzer einschränken
function mapHierarchies(doc) {
    if (doc.type === 'hierarchy') {
        emit(doc._id);
    }
}

// TODO: auf den aktuellen Benutzer einschränken
function mapObjects(doc) {
    if (doc.type === 'object') {
        emit(doc._id);
    }
}

module.exports = function () {

    sync();

    // TODO: filter only the users documents
    db.changes({since: 'now', live: true, include_docs: true}).on('change', function (change) {
        var modelObject,
            correspondingHierarchy;

        switch (change.doc.type) {
        case 'object':
            // update hierarchy of model
            modelObject = _.find(window.oi.objects, function (object) {
                return object._id === change.id;
            });
            if (modelObject) {
                _.each(modelObject, function (value, key) {
                    delete modelObject[key];
                });
                _.extend(modelObject, change.doc);
                // refresh form if this object is shown
                if ($('#formContent').html() !== "" && $('#formContent').data('id') === change.doc._id) {
                    initiateForm(change.doc._id);
                }
                // refresh tree
                correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
                    return hierarchy._id === change.doc.hId;
                });
                if (change.doc.data && correspondingHierarchy && correspondingHierarchy.nameField) {
                    $('#navContent').jstree().rename_node('#' + change.doc._id, '<strong>' + change.doc.data[correspondingHierarchy.nameField] + '</strong>');
                }
            }
            break;
        case 'hierarchy':
            modelObject = _.find(window.oi.hierarchies, function (hierarchy) {
                return hierarchy._id === change.id;
            });
            // TODO: update hierarchy of model
            break;
        }
    });

    // get data from db
    async.parallel({
        hierarchies: function (callback) {
            // TODO: get only the users data
            db.query({map: mapHierarchies}, {reduce: false, include_docs: true}, function (err, response) {
                var hierarchies = _.map(response.rows, function (row) {
                    return row.doc;
                });
                callback(null, hierarchies);
            });
        },
        objects: function (callback) {
            // TODO: get only the users data
            db.query({map: mapObjects}, {reduce: false, include_docs: true}, function (err, response) {
                var objects = _.map(response.rows, function (row) {
                    return row.doc;
                });
                callback(null, objects);
            });
        }
    }, function (err, results) {
        // results equals to: { hierarchies: hierarchies, objects: objects }

        if (err) { return console.log('error: ', err); }

        // create globals for data (primitive self-built models)
        window.oi.hierarchies = results.hierarchies;
        window.oi.objects     = results.objects;

        createTree();
    });
};