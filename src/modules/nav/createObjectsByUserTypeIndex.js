/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB                 = require('pouchdb'),
    pouchDbOptions          = require('../pouchDbOptions'),
    objectsByUserTypeIndex  = require('./objectsByUserTypeIndex');

module.exports = function (callback) {
    var localDb  = new PouchDB('oi', pouchDbOptions);

    // index doesnt exist yet
    localDb.put(objectsByUserTypeIndex()).then(function () {
        // kick off an initial build, return immediately
        return localDb.query('objects_by_user_type', {stale: 'update_after'});
    }).then(function () {
        // query the index (much faster now!)
        return localDb.query('objects_by_user_type', {include_docs: true, key: [window.oi.loginName, 'hierarchy']});
    }).catch(function (error) {
        callback('error querrying hierarchies after putting objectsByUserTypeIndex: ' + error, null);
    });
};