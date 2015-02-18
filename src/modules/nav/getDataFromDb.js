/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                        = require('underscore'),
    PouchDB                  = require('pouchdb'),
    pouchDbOptions           = require('../pouchDbOptions'),
    configuration            = require('../configuration'),
    couchUrl                 = configuration.couch.dbUrl;

module.exports = function (firstSync, projectName, callback) {
    // now open LOCAL localDb
    var localDb  = new PouchDB(projectName, pouchDbOptions),
        remoteDb = new PouchDB('http://' + couchUrl + '/' + projectName),
        // if ist the fist sync: get the modeldata from remoteDb
        db = firstSync ? remoteDb : localDb;

    //console.log('db: ', db);

    db.allDocs({include_docs: true}).then(function (result) {
        var docs = _.map(result.rows, function (row) {
               return row.doc; 
            }),
            hierarchies,
            objects;

        //console.log('docs: ', docs);

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
};