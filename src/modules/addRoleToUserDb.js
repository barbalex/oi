/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB       = require('pouchdb'),
    _             = require('underscore'),
    getUserDbName = require('./getUserDbName');

module.exports = function (role) {
    var userDbName,
        userDb;

    userDbName = getUserDbName();
    userDb     = new PouchDB(userDbName);
    userDb.get('org.couchdb.user:' + window.oi.me.name, {include_docs: true}).then(function (userDoc) {

        console.log('userDoc: ', userDoc);
        // userDoc has no roles after signup
        userDoc.roles = userDoc.roles || [];
        if (_.indexOf(userDoc.roles, role) === -1) {
            userDoc.roles.push(role);
            userDb.put(userDoc).then(function () {
                console.log('added role ' + role + ' to userDb ' + userDbName);
            }).catch(function (error) {
                console.log('error putting role ' + role + ' to userDb ' + userDbName + ': ', error);
            });
        }
    }).catch(function (error) {
        console.log('error getting user from local userDb ' + userDbName + ': ', error);
    });
};