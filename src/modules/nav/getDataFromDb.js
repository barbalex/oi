/*
 * gets data from the db to populate the model
 * on firstsync gets from couch
 * otherwise from pouch
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                  = require('underscore'),
    PouchDB            = require('pouchdb'),
    configuration      = require('../configuration'),
    couchUrl           = configuration.couch.dbUrl,
    createFirstProject = require('../createFirstProject');

module.exports = function (projectName, login, callback) {
    if (projectName) {
        var localDb,
            remoteDbUrl,
            remoteDb,
            db,
            dbOptions;

        dbOptions = {
            auth: {
                username: window.oi.me.name,
                password: window.oi.me.password
            }
        };
        localDb     = new PouchDB(projectName);
        remoteDbUrl = 'http://' + couchUrl + '/' + projectName;
        remoteDb    = new PouchDB(remoteDbUrl, dbOptions);
        // on fist sync get model data from remoteDb
        db          = login ? remoteDb : localDb;

        console.log('getDataFromDb, projectName: ', projectName);
        //console.log('getDataFromDb, login: ', login);

        db.allDocs({
            include_docs: true,
            auth: {
                username: window.oi.me.name,
                password: window.oi.me.password
            }
        }).then(function (result) {
            var docs,
                hierarchies,
                objects;

            console.log('getDataFromDb: result from db.allDocs: ', result);

            if (result.rows.length === 0) {
                // somehow this db didn't get a first set of docs
                // do that now
                createFirstProject(projectName);
            }

            docs = _.map(result.rows, function (row) {
                return row.doc;
            });

            hierarchies = _.filter(docs, function (doc) {
                return doc.type === 'hierarchy';
            });
            if (hierarchies && hierarchies.length > 0) {
                window.oi.hierarchies = _.union(window.oi.hierarchies, hierarchies);
            }

            objects = _.filter(docs, function (doc) {
                return doc.type === 'object';
            });
            if (objects && objects.length > 0) {
                window.oi.objects = _.union(window.oi.objects, objects);
            }
            callback();
        }).catch(function (error) {
            console.log('got an error getting data from ' + projectName + ': ', error);
        });
    } else {
        console.log('getDataFromDb: no projectName passed');
    }
};