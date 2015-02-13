/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB            = require('pouchdb'),
    pouchDbOptions     = require('../pouchDbOptions'),
    objectsByTypeIndex = require('./objectsByTypeIndex');

module.exports = function (callback) {
    var localDb  = new PouchDB('oi', pouchDbOptions);

    // index doesn't exist yet
    localDb.put(objectsByTypeIndex()).then(function () {
        // kick off an initial build, return immediately
        return localDb.query('objects_by_type', {stale: 'update_after'});
    }).then(function () {
        // query the index (much faster now!)
        return localDb.query('objects_by_type', {include_docs: true, key: 'hierarchy'});
    }).catch(function (error) {
        callback('error querrying hierarchies after putting objectsByTypeIndex: ' + error, null);
    });
};