/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _             = require('underscore'),
    PouchDB       = require('pouchdb'),
    configuration = require('../configuration'),
    couchUrl      = configuration.couch.dbUrl;

module.exports = function (firstSync, projectName, callback) {
    if (projectName) {
        // now open LOCAL localDb
        var localDb         = new PouchDB(projectName),
            remoteDbAddress = 'http://' + couchUrl + '/' + projectName,
            remoteDb        = new PouchDB(remoteDbAddress),
            // if is fist sync: get the modeldata from remoteDb
            db              = firstSync ? remoteDb : localDb;

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
            callback(null, true);
        }).catch(function (error) {
            callback(error, false);
        });
    } else {
        callback('getDataFromDb: no projectName passed', false);
    }
};