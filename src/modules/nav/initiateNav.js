/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                = require('jquery'),
    _                = require('underscore'),
    async            = require('async'),
    PouchDB          = require('pouchdb'),
    db               = new PouchDB('oi'),
    syncPouch        = require('../syncPouch'),
    createTree       = require('./createTree'),
    handleDbChanges  = require('../handleDbChanges'),
    createDatabaseId = require('./createDatabaseId'),
    hierarchiesIndex,
    objectsIndex;

// expose pouchdb to pouchdb-fauxton
window.PouchDB = PouchDB;

// TODO: get only the users data
// TODO: create real views
function mapHierarchies(doc) {
    if (doc.type === 'hierarchy') {
        emit(doc._id);
    }
}

hierarchiesIndex = {
    _id: '_design/hierarchies',
    views: {
        'hierarchies': {
            map: function (doc) {
                if (doc.type === 'hierarchy') {
                    emit(doc._id);
                }
            }.toString()
        }
    }
};

// TODO: get only the users data
function mapObjects(doc) {
    if (doc.type === 'object') {
        emit(doc._id);
    }
}

objectsIndex = {
    _id: '_design/objects',
    views: {
        'objects': {
            map: function (doc) {
                if (doc.type === 'object') {
                    emit(doc._id);
                }
            }.toString()
        }
    }
};

module.exports = function () {

    // every database gets a locally saved id
    // this id is added to every document changed
    // with it the changes feed can ignore locally changed documents
    createDatabaseId();

    syncPouch();

    // create/update indexes
    // save it
    pouch.put(hierarchiesIndex).then(function () {
        // kick off an initial build, return immediately
        return pouch.query('hierarchiesIndex', {stale: 'update_after'});
    }).then(function () {
        // query the index (much faster now!)
        return pouch.query('hierarchiesIndex', {key: 'foo'});
    }).then(function (result) {
        // found docs with name === 'foo'
    });

    // TODO: filter only the users documents
    // when changes happen in DB, update model and when necessary ui
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