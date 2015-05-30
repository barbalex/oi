'use strict'

var _ = require('underscore'),
  syncProjectDb = require('./syncProjectDb')

module.exports = function (projectDbs) {
  // console.log('syncProjectDbs: syncing projects', projectDbs)

  _.each(projectDbs, function (projectDb) {
    syncProjectDb(projectDb)
  })
}
