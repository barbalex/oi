'use strict'

var PouchDB = require('pouchdb'),
  _ = require('underscore'),
  getUserDbName = require('./getUserDbName') /*,
    syncProjectDb = require('./syncProjectDb')*/

module.exports = function (role, projectDb) {
  var userDbName,
    userDb,
    userDocId

  userDbName = getUserDbName()
  userDb = new PouchDB(userDbName)
  userDocId = 'org.couchdb.user:' + window.oi.me.name

  console.log('addRoleToUserDb: userDbName: ', userDbName)
  console.log('addRoleToUserDb: userDb: ', userDb)
  console.log('addRoleToUserDb: userDocId: ', userDocId)

  userDb.get(userDocId, { include_docs: true }).then(function (userDoc) {
    console.log('userDoc: ', userDoc)
    // userDoc has no roles after signup
    userDoc.roles = userDoc.roles || []
    if (!_.contains(userDoc.roles, role)) {
      userDoc.roles.push(role)
      userDb.put(userDoc).then(function () {
        console.log('added role ' + role + ' to userDb ' + userDbName)
        // now start syncing the new project db
        // well, wait a moment, so the project db exists on the server
        // THIS CREATES WEIRD ERROR
        // THIS FUNCTION IS RETURNED AS EMPTY OBJECT WHEN CALLED IN CREATEFIRSTOBJECT
        // error caused by calling function via browserify
        // circumvented it by calling it as global variable
        setTimeout(function () {
          window.oi.syncProjectDb(role)
        }, 1000)
      }).catch(function (error) {
        console.log('error putting role ' + role + ' to userDb ' + userDbName + ': ', error)
      })
    } else {
      // sync it all the same
      window.oi.syncProjectDb(role)
    }
  }).catch(function (error) {
    console.log('error getting user from local userDb ' + userDbName + ': ', error)
  })
}
