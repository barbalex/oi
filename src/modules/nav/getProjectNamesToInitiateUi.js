/*
 * initiiert die nav
 * 
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $             = require('jquery'),
    PouchDB       = require('pouchdb'),
    getUserDbName = require('../getUserDbName'),
    initiateUi    = require('../initiateUi'),
    syncUserDb    = require('../syncUserDb');

module.exports = function (login) {
    var userDbName,
        projectNames,
        userDb;

    //console.log('getProjectNamesToInitiateUi, login: ', login);

    // get user info
    if (login) {
        // login info came from signup/signin
        projectNames = login.roles;
        initiateUi(projectNames, login);
    } else {
        // get login info from local userdb
        userDbName = getUserDbName();
        userDb     = new PouchDB(userDbName);
        // get project names from user roles
        userDb.get('org.couchdb.user:' + window.oi.me.name).then(function (userDoc) {
            projectNames = userDoc.roles;
            initiateUi(projectNames, login);
        }).catch(function (error) {
            if (error.status === 404) {
                // user not found > user was never created
                // maybe account was created on other computer and user is loggin in for the first time
                // syncUserDb checks if userDoc coming as change is new
                // if new it initiates UI
                syncUserDb();
            } else {
                console.log('getProjectNamesToInitiateUi: error getting user ' + window.oi.me.name + ' from local userDb ' + userDbName + ': ', error);
            }
        });
    }
};