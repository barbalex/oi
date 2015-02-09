/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                    = require('underscore'),
    PouchDB              = require('pouchdb'),
    initiateChangeStream = require('./initiateChangeStream'),
    foreignChangedIndex  = require('./foreignChangedIndex'),
    pouchDbOptions       = require('../pouchDbOptions');

module.exports = function () {
    var db = new PouchDB('oi', pouchDbOptions);

    // key: get only changes of the users objects
    db.query('foreign_changed', {include_docs: true, key: [window.oi.loginName, 'object']}).then(function () {
        initiateChangeStream();
    }).catch(function (error) {
        if (error.status === 404) {
            // index doesnt exist yet > create it
            db.put(foreignChangedIndex()).then(function () {
                // kick off an initial build, return immediately
                return db.query('foreign_changed', {stale: 'update_after', key: [window.oi.loginName, 'object']});
            }).then(function () {
                // query the index (much faster now!)
                return db.query('foreign_changed', {include_docs: true, key: [window.oi.loginName, 'object']});
            }).then(function () {
                initiateChangeStream();
            }).catch(function (error) {
                console.log('error querrying foreignChanged: ', error);
            });
        } else {
            console.log('error querrying foreignChanged: ', error);
        }
    });
};