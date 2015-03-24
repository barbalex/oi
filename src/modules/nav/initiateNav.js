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
    createDatabaseId = require('./createDatabaseId'),
    getModelData     = require('./getModelData'),
    getUserDbName    = require('../getUserDbName');

function initiate(projectNames, login) {

    console.log('initiate: projectNames: ', projectNames);

    // build model
    // model is added to window.oi.objects and window.oi.hierarchies
    // then creates tree
    getModelData(projectNames, login);

    // start syncing projects
    syncProjectDbs(projectNames);

    // every database gets a locally saved id
    // this id is added to every document changed
    // with it the changes feed can ignore locally changed documents
    createDatabaseId();

    // set navUser
    // add a space to space the caret
    $('#navUserText').text(window.oi.me.name + ' ');

    // sync user db
    syncUserDb();
}

module.exports = function (newSignup, login) {
    var userDbName,
        projectNames,
        userDb;

    console.log('initiateNav, newSignup: ', newSignup);
    console.log('initiateNav, login: ', login);

    // get user info
    if (login) {
        // login info came from signup/signin
        projectNames = login.roles;
        initiate(projectNames, login);
    } else {
        // get login info from local userdb
        userDbName = getUserDbName();
        userDb     = new PouchDB(userDbName);
        // get project names from user roles
        userDb.get('org.couchdb.user:' + window.oi.me.name).then(function (userDoc) {
            projectNames = userDoc.roles;
            initiate(projectNames, login);
        }).catch(function (error) {
            console.log('initiateNav: error getting user from local userDb: ', error);
        });
    }
};