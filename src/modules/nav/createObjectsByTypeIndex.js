/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB            = require('pouchdb'),
    pouchDbOptions     = require('../pouchDbOptions'),
    objectsByTypeIndex = require('./objectsByTypeIndex');

module.exports = function (db) {
    //var localDb  = new PouchDB('oi', pouchDbOptions);

    console.log('createObjectsByTypeIndex for db: ', db);

    // index doesn't exist yet
    db.put(objectsByTypeIndex()).then(function () {
        // kick off an initial build, return immediately
        return db.query('objects_by_type', {stale: 'update_after'});
    }).then(function () {
        // query the index (much faster now!)
        return db.query('objects_by_type');
    }).catch(function (error) {
        return console.log('error querrying hierarchies after putting objectsByTypeIndex: ' + error);
    });
};