/*
 * initiiert die nav
 * 
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                        = require('jquery'),
    _                        = require('underscore'),
    async                    = require('async'),
    PouchDB                  = require('pouchdb'),
    pouchDbOptions           = require('../pouchDbOptions'),
    syncWithRemoteDb         = require('../syncWithRemoteDb'),
    syncWithRemoteUserDb     = require('../syncWithRemoteUserDb'),
    createTree               = require('./createTree'),
    createDatabaseId         = require('./createDatabaseId'),
    getModelData             = require('./getModelData');

function syncWithRemoteDbs(projectDbs) {
    _.each(projectDbs, function (projectDb) {
        syncWithRemoteDb(projectDb);
    });
}

module.exports = function (projectNames) {
    var firstSync = projectNames ? true : false;

    // expose pouchdb to pouchdb-fauxton
    window.PouchDB = PouchDB;

    if (!projectNames) {
        projectNames = _.map(window.oi.objects, function (object) {
            if (!object.parent) {
                return 'project_' + object._id;
            }
        });
    }

    window.oi.objects     = [];
    window.oi.hierarchies = [];

    // build model
    getModelData(firstSync, projectNames, function (errors, done) {
        // every database gets a locally saved id
        // this id is added to every document changed
        // with it the changes feed can ignore locally changed documents
        createDatabaseId();

        createTree();

        // start syncing
        syncWithRemoteDbs(projectNames);
        syncWithRemoteUserDb();
    });
};