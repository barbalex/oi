/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                            = require('underscore'),
    async                        = require('async'),
    PouchDB                      = require('pouchdb'),
    pouchDbOptions               = require('../pouchDbOptions'),
    configuration                = require('./configuration'),
    couchUrl                     = configuration.couch.dbUrl,
    createObjectsByUserTypeIndex = require('./createObjectsByUserTypeIndex');

module.exports = function (firstSync, projectName, callback) {
    // now open LOCAL localDb
    var localDb  = new PouchDB(projectName, pouchDbOptions),
        remoteDb = new PouchDB('http://' + couchUrl + '/' + projectName),
        // if ist the fist sync: get the modeldata from remoteDb
        db = firstSync ? remoteDb : localDb;

    // get data from localDb
    // if is the fist sync: get the modeldata from remoteDb
    async.parallel({
        hierarchies: function (callback) {
            // TODO: loop through all projectDb's
            db.query('objects_by_user_type', {include_docs: true, key: [window.oi.loginName, 'hierarchy']}).then(function (result) {
                var hierarchies = _.map(result.rows, function (row) {
                    return row.doc;
                });
                callback(null, hierarchies);
            }).catch(function (error) {
                if (error.status === 404) {
                    createObjectsByUserTypeIndex();
                }
                callback('error querrying hierarchies: ' + error, null);
            });
        },
        objects: function (callback) {
            db.query('objects_by_user_type', {include_docs: true, key: [window.oi.loginName, 'object']}).then(function (result) {
                var objects = _.map(result.rows, function (row) {
                    return row.doc;
                });
                callback(null, objects);
            }).catch(function (error) {
                if (error.status === 404) {
                    createObjectsByUserTypeIndex();
                }
                callback('error querrying objects: ' + error, null);
            });
        }
    }, function (error, results) {
        // results equals to: { hierarchies: hierarchies, objects: objects }
        if (error) {
            console.log('error getting modeldata for project ' + projectName + ': ', error);
            return null;
        }

        return results;
    });
};