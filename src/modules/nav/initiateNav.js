/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                  = require('jquery'),
    _                  = require('underscore'),
    async              = require('async'),
    PouchDB            = require('pouchdb'),
    db                 = new PouchDB('oi'),
    syncPouch          = require('../syncPouch'),
    createTree         = require('./createTree'),
    createDatabaseId   = require('./createDatabaseId'),
    hierarchiesIndex   = require('./hierarchiesIndex'),
    objectsByTypeIndex = require('./objectsByTypeIndex');

module.exports = function () {

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
            db.query('objects_by_type', {include_docs: true, key: 'hierarchy'}, function (err, result) {
                if (err) {
                    if (err.status === 404) {
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
                            console.log('error querrying hierarchies after putting objectsByTypeIndex: ', error);
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
            db.query('objects_by_type', {include_docs: true, key: 'object'}, function (err, result) {
                if (err) {
                    if (err.status === 404) {
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
                            console.log('error querrying objects after putting objectsByTypeIndex: ', error);
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