/*
 * initiiert die nav
 * 
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                            = require('jquery'),
    _                            = require('underscore'),
    async                        = require('async'),
    PouchDB                      = require('pouchdb'),
    pouchDbOptions               = require('../pouchDbOptions'),
    syncWithRemoteDb             = require('../syncWithRemoteDb'),
    syncWithRemoteUserDb         = require('../syncWithRemoteUserDb'),
    createTree                   = require('./createTree'),
    createDatabaseId             = require('./createDatabaseId'),
    createObjectsByUserTypeIndex = require('./createObjectsByUserTypeIndex'),
    getModelData                 = require('./getModelData'),
    getProjectNames              = require('./getProjectNames');

function syncWithRemoteDbs(projectDbs) {
    _.each(projectDbs, function (projectDb) {
        syncWithRemoteDb(projectDb);
    });
}

module.exports = function (firstSync) {
    // expose pouchdb to pouchdb-fauxton
    window.PouchDB = PouchDB;

    // get project names
    getProjectNames(firstSync, function (error, projectNames) {
        // TODO: tell the user
        if (error) { console.log('error getting project names: ', error); }

        // build model
        getModelData(firstSync, projectNames, function (error) {
            if (error) { console.log('error getting model data: ', error); }
            // every database gets a locally saved id
            // this id is added to every document changed
            // with it the changes feed can ignore locally changed documents
            createDatabaseId();

            createTree();

            // start syncing
            syncWithRemoteDbs(projectNames);
            syncWithRemoteUserDb();
        });
    });
};