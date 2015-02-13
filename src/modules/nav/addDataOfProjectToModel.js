/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                        = require('underscore'),
    async                    = require('async'),
    PouchDB                  = require('pouchdb'),
    pouchDbOptions           = require('../pouchDbOptions'),
    configuration            = require('../configuration'),
    couchUrl                 = configuration.couch.dbUrl,
    createObjectsByTypeIndex = require('./createObjectsByTypeIndex');

module.exports = function (firstSync, projectName, callbackFromAddData) {
    // now open LOCAL localDb
    var localDb  = new PouchDB(projectName, pouchDbOptions),
        remoteDb = new PouchDB('http://' + couchUrl + '/' + projectName),
        // if ist the fist sync: get the modeldata from remoteDb
        db = firstSync ? remoteDb : localDb;

    // get data from localDb
    // if is the fist sync: get the modeldata from remoteDb
    async.parallel({
        hierarchies: function (callback) {
            db.query('objects_by_type', {include_docs: true, key: 'hierarchy'}).then(function (result) {
                var hierarchies = _.map(result.rows, function (row) {
                    return row.doc;
                });
                callback(null, hierarchies);
            }).catch(function (error) {
                if (error.status === 404) {
                    createObjectsByTypeIndex();
                }
                callback('error querrying hierarchies in project ' + projectName + ': ' + error, null);
            });
        },
        objects: function (callback) {
            db.query('objects_by_type', {include_docs: true, key: 'object'}).then(function (result) {
                var objects = _.map(result.rows, function (row) {
                    return row.doc;
                });
                callback(null, objects);
            }).catch(function (error) {
                if (error.status === 404) {
                    createObjectsByTypeIndex();
                }
                callback('error querrying objects in project ' + projectName + ': ' + error, null);
            });
        }
    }, function (error, results) {
        // results equals to: { hierarchies: hierarchies, objects: objects }
        /*if (error) {
            console.log('error getting modeldata for project ' + projectName + ': ', error);
        }*/

        console.log('results for project ' + projectName + ': ', results);
        callbackFromAddData(error, results);
    });
};