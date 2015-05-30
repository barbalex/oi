/*
 * initiates the ui
 * 
 */

'use strict'

var $ = require('jquery'),
  syncProjectDbs = require('./syncProjectDbs'),
  syncUserDb = require('./syncUserDb'),
  createDatabaseId = require('./nav/createDatabaseId'),
  getModelData = require('./nav/getModelData')

module.exports = function (projectNames, login) {
  // every database gets a locally saved id
  // this id is added to every document changed
  // with it the changes feed can ignore locally changed documents
  createDatabaseId()

  // console.log('initiateUi: projectNames: ', projectNames)

  // build model
  // model is added to window.oi.objects and window.oi.hierarchies
  // then creates tree
  getModelData(projectNames, login)

  // start syncing projects
  syncProjectDbs(projectNames)

  // set navUser
  // add a space to space the caret
  $('#navUserText').text(window.oi.me.name + ' ')

  // sync user db
  syncUserDb()
}
