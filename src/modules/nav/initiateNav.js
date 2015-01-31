/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $               = require('jquery'),
    _               = require('underscore'),
    async           = require('async'),
    PouchDB         = require('pouchdb'),
    db              = new PouchDB('oi'),
    syncPouch       = require('../syncPouch'),
    createTree      = require('./createTree'),
    handleDbChanges = require('../handleDbChanges');

// expose pouchdb to pouchdb-fauxton
window.PouchDB = PouchDB;

// TODO: get only the users data
// TODO: create real views
function mapHierarchies(doc) {
    if (doc.type === 'hierarchy') {
        emit(doc._id);
    }
}

// TODO: get only the users data
function mapObjects(doc) {
    if (doc.type === 'object') {
        emit(doc._id);
    }
}

module.exports = function () {

    syncPouch();

    // TODO: filter only the users documents
    db.changes({since: 'now', live: true, include_docs: true}).on('change', handleDbChanges);

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