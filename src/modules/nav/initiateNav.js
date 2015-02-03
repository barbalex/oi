/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                     = require('jquery'),
    _                     = require('underscore'),
    async                 = require('async'),
    PouchDB               = require('pouchdb'),
    db                    = new PouchDB('oi'),
    syncPouch             = require('../syncPouch'),
    createTree            = require('./createTree'),
    createDatabaseId      = require('./createDatabaseId'),
    hierarchiesIndex,
    objectsIndex;

// expose pouchdb to pouchdb-fauxton
window.PouchDB = PouchDB;

// TODO: get only the users data
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

    // get data from db
    async.parallel({
        hierarchies: function (callback) {
            // TODO: get only the users data
            db.query('hierarchies', {include_docs: true}, function (err, result) {
                if (err) {
                    if (err.status === 404) {
                        // index doesnt exist yet
                        db.put(hierarchiesIndex).then(function () {
                            // kick off an initial build, return immediately
                            return db.query('hierarchies', {stale: 'update_after'});
                        }).then(function () {
                            // query the index (much faster now!)
                            return db.query('hierarchies', {include_docs: true});
                        }).then(function (result) {
                            var hierarchies = _.map(result.rows, function (row) {
                                return row.doc;
                            });
                            callback(null, hierarchies);
                        });
                    } else {
                        return console.log('error querrying hierarchies: ', err);
                    }
                } else {
                    var hierarchies = _.map(result.rows, function (row) {
                        return row.doc;
                    });
                    callback(null, hierarchies);
                }
            });
        },
        objects: function (callback) {
            // TODO: get only the users data
            db.query('objects', {include_docs: true}, function (err, result) {
                if (err) {
                    if (err.status === 404) {
                        // index doesnt exist yet > create it
                        db.put(objectsIndex).then(function () {
                            // kick off an initial build, return immediately
                            return db.query('objects', {stale: 'update_after'});
                        }).then(function () {
                            // query the index (much faster now!)
                            return db.query('objects', {include_docs: true});
                        }).then(function (result) {
                            var objects = _.map(result.rows, function (row) {
                                return row.doc;
                            });
                            callback(null, objects);
                        });
                    } else {
                        return console.log('error querrying objects: ', err);
                    }
                } else {
                    var objects = _.map(result.rows, function (row) {
                        return row.doc;
                    });
                    callback(null, objects);
                }
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