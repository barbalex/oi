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
    syncWithRemoteDbs        = require('../syncWithRemoteDbs'),
    syncWithRemoteUserDb     = require('../syncWithRemoteUserDb'),
    createTree               = require('./createTree'),
    createDatabaseId         = require('./createDatabaseId'),
    getModelData             = require('./getModelData');

function initiate(projectNames, firstSync) {
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
    var firstSync = projectNames ? true : false;

    // set navUser
    // add a space to space the caret
    $('#navUserText').text(window.oi.me.name + ' ');

    if (!projectNames) {
        //PouchDB.plugin(require('pouchdb-all-dbs'));
        require('pouchdb-all-dbs')(PouchDB);

        PouchDB.allDbs().then(function (dbs) {
            // dbs is an array of strings, e.g. ['mydb1', 'mydb2']
            projectNames = dbs;
            initiate(projectNames, firstSync);
        }).catch(function (err) {
            // handle err
            console.log('error getting projects: ', err);
        });
    } else {
        initiate(projectNames, firstSync);
    }
};