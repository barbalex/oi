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
    syncWithRemoteDbs        = require('../syncWithRemoteDbs'),
    syncWithRemoteUserDb     = require('../syncWithRemoteUserDb'),
    createTree               = require('./createTree'),
    createDatabaseId         = require('./createDatabaseId'),
    getModelData             = require('./getModelData');

function initiate(projectNames) {
    var firstSync = projectNames ? true : false;

    // expose pouchdb to pouchdb-fauxton
    window.PouchDB = PouchDB;

    // build model
    getModelData(firstSync, projectNames, function (errors, done) {
        if (errors && errors.length > 0) { console.log('got model data errors: ', errors); }

        // every database gets a locally saved id
        // this id is added to every document changed
        // with it the changes feed can ignore locally changed documents
        createDatabaseId();

        createTree();

        // start syncing
        syncWithRemoteDbs(projectNames);

        // not possible without admin rights
        // so new projects will not turn up without login!
        // TODO: make new projects turn up via oi_pg creating userDocs
        //syncWithRemoteUserDb();
    });
}

module.exports = function (projectNames) {

    console.log('projectNames: ', projectNames);

    if (!projectNames) {
        //PouchDB.plugin(require('pouchdb-all-dbs'));
        require('pouchdb-all-dbs')(PouchDB);

        PouchDB.allDbs().then(function (dbs) {
            // dbs is an array of strings, e.g. ['mydb1', 'mydb2']

            console.log('projectNames from allDbs: ', dbs);

            projectNames = dbs;
            initiate(projectNames);
        }).catch(function (err) {
            // handle err
            console.log('error getting projects: ', err);
        });
    } else {
        initiate(projectNames);
    }
};