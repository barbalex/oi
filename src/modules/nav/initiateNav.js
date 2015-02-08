/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                   = require('jquery'),
    _                   = require('underscore'),
    async               = require('async'),
    PouchDB             = require('pouchdb'),
    pouchDbOptions      = require('../pouchDbOptions'),
    syncPouch           = require('../syncPouch'),
    createTree          = require('./createTree'),
    createDatabaseId    = require('./createDatabaseId'),
    objectsByTypeIndex  = require('./objectsByTypeIndex');

module.exports = function () {
    var db = new PouchDB('http://localhost:5984/oi', pouchDbOptions);

    // expose pouchdb to pouchdb-fauxton
    window.PouchDB = PouchDB;

    // every database gets a locally saved id
    // this id is added to every document changed
    // with it the changes feed can ignore locally changed documents
    // also starts the change-stream
    createDatabaseId();

    syncPouch();

    // get data from db
    async.parallel({
        hierarchies: function (callback) {
            // TODO: get only the users data
            db.query('objects_by_type', {include_docs: true, key: 'hierarchy'}).then(function (result) {
                var hierarchies = _.map(result.rows, function (row) {
                    return row.doc;
                });
                callback(null, hierarchies);
            }).catch(function (error) {
                if (error.status === 404) {
                    // index doesnt exist yet
                    db.put(objectsByTypeIndex()).then(function () {
                        // kick off an initial build, return immediately
                        return db.query('objects_by_type', {stale: 'update_after'});
                    }).then(function () {
                        // query the index (much faster now!)
                        return db.query('objects_by_type', {include_docs: true, key: 'hierarchy'});
                    }).then(function (result) {
                        var hierarchies = _.map(result.rows, function (row) {
                            return row.doc;
                        });
                        callback(null, hierarchies);
                    }).catch(function (error) {
                        callback('error querrying hierarchies after putting objectsByTypeIndex: ' + error, null);
                    });
                } else {
                    callback('error querrying hierarchies: ' + error, null);
                }
            });
        },
        objects: function (callback) {
            // TODO: get only the users data
            db.query('objects_by_type', {include_docs: true, key: 'object'}).then(function (result) {
                var objects = _.map(result.rows, function (row) {
                    return row.doc;
                });
                callback(null, objects);
            }).catch(function (error) {
                if (error.status === 404) {
                    // index doesnt exist yet > create it
                    db.put(objectsByTypeIndex()).then(function () {
                        // kick off an initial build, return immediately
                        return db.query('objects_by_type', {stale: 'update_after'});
                    }).then(function () {
                        // query the index (much faster now!)
                        return db.query('objects_by_type', {include_docs: true, key: 'object'});
                    }).then(function (result) {
                        var objects = _.map(result.rows, function (row) {
                            return row.doc;
                        });
                        callback(null, objects);
                    }).catch(function (error) {
                        callback('error querrying objects after putting objectsByTypeIndex: ' + error, null);
                    });
                } else {
                    callback('error querrying objects: ' + error, null);
                }
            });
        }
    }, function (error, results) {
        // results equals to: { hierarchies: hierarchies, objects: objects }
        if (error) { return console.log('error: ', error); }

        // create globals for data (primitive self-built models)
        window.oi.hierarchies = results.hierarchies;
        window.oi.objects     = results.objects;

        createTree();
    });
};