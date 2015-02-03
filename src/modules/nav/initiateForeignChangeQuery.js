/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                     = require('underscore'),
    PouchDB               = require('pouchdb'),
    db                    = new PouchDB('oi'),
    initiateChangeStream  = require('./initiateChangeStream'),
    foreignChangedIndex   = require('./foreignChangedIndex');

module.exports = function () {
    // TODO: get only the users data
    db.query('foreign_changed', {include_docs: true}, function (err, result) {
        if (err) {
            if (err.status === 404) {
                // index doesnt exist yet > create it
                db.put(foreignChangedIndex()).then(function () {
                    // kick off an initial build, return immediately
                    return db.query('foreign_changed', {stale: 'update_after'});
                }).then(function () {
                    // query the index (much faster now!)
                    return db.query('foreign_changed', {include_docs: true});
                }).then(function (result) {
                    initiateChangeStream();
                }).catch(function (err) {
                    console.log('error querrying foreignChanged: ', err);
                });
            } else {
                console.log('error querrying foreignChanged: ', err);
            }
        } else {
            initiateChangeStream();
        }
    });
};