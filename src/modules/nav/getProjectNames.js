/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _             = require('underscore'),
    PouchDB       = require('pouchdb'),
    configuration = require('./configuration'),
    couchUrl      = configuration.couch.dbUrl,
    couchName     = configuration.couch.dbName;

module.exports = function (firstSync, callback) {
    var projectDbs,
        remoteDb = 'http://' + couchUrl + '/' + couchName;

    // get projects when not first sync after login
    // otherwise get user roles from _users
    if (firstSync) {
        remoteDb.get('org.couchdb.user:' + window.oi.loginName).then(function (user) {
            projectDbs = user.roles;
            callback(null, projectDbs);
        }).catch(function (error) {
            callback(error, null);
        });
    } else {
        // get list of projectDbs from model
        projectDbs = _.map(window.oi.objects, function (object) {
            if (!object.parent) {
                return 'project_' + object._id;
            }
        });
        callback(null, projectDbs);
    }
};