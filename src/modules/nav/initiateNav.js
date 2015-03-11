/*
 * initiiert die nav
 * 
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                = require('jquery'),
    _                = require('underscore'),
    async            = require('async'),
    PouchDB          = require('pouchdb'),
    syncProjectDbs   = require('../syncProjectDbs'),
    syncUserDb       = require('../syncUserDb'),
    createTree       = require('./createTree'),
    createDatabaseId = require('./createDatabaseId'),
    getModelData     = require('./getModelData'),
    getUserDbName    = require('../getUserDbName');

function initiate(projectNames, firstSync) {
    // empty model if exists
    window.oi.objects     = [];
    window.oi.hierarchies = [];

    // build model
    // model is added to window.oi.objects and window.oi.hierarchies
    // so no response from getModelData
    getModelData(firstSync, projectNames, function (errors) {
        if (errors && errors.length > 0) { console.log('got model data errors: ', errors); }
        createTree();
    });
}

module.exports = function (firstSync) {
    var userDbName,
        projectNames,
        userDb;

    userDbName = getUserDbName();
    userDb     = new PouchDB(userDbName);

    // get user roles and sync user db
    // TODO: wait until sync is paused?
    syncUserDb('firstOnceThenLive');

    window.oi[userDbName + '_firstSync'].on('paused', function (error) {
        if (error) { console.log('error syncing with userDB ' + userDbName + ': ', error); }
        console.log('first syncing userDb paused');
        // get project names from user roles
        userDb.get('org.couchdb.user:' + window.oi.me.name).then(function (userDoc) {
            projectNames = userDoc.roles;
            initiate(projectNames, firstSync);
            // start syncing projects
            syncProjectDbs(projectNames);
            // every database gets a locally saved id
            // this id is added to every document changed
            // with it the changes feed can ignore locally changed documents
            createDatabaseId();
        }).catch(function (error) {
            console.log('error getting user from local userDb: ', error);
        });

        // set navUser
        // add a space to space the caret
        $('#navUserText').text(window.oi.me.name + ' ');
    });

    return true;
};