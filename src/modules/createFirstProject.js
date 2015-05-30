/*
 * creates the first project if a user has none yet
 * 1. creates project-hierarchy (metadata for project-doc)
 * 2. creates project-doc
 * 3. adds these docs to the model
 * 4. creates new local project db and adds these docs
 * 5. syncs local project db to remote couch
 *
 * if a projectName is passed, then there is an empty db that needs to get its first docs
 */

'use strict'

var PouchDB = require('pouchdb'),
  guid = require('./guid'),
  addRoleToUserDb = require('./addRoleToUserDb')

module.exports = function (projectNamePassed) {
  var projHierarchy,
    projHierarchyGuid,
    projObject,
    projObjectGuid,
    projectDb,
    projectName

  console.log('createFirstProject: setting up first project')

  // the user has no data yet
  // add standard project

  // first create hierarchy- and object-doc for the project
  projHierarchyGuid = guid()
  projObjectGuid = guid()
  projHierarchy = {
    '_id': projHierarchyGuid,
    'type': 'hierarchy',
    'parent': null,
    'projId': projObjectGuid,
    'name': 'Projekte',
    'nameField': 'Projektname',
    'users': [window.oi.me.name],
    'lastEdited': {'date': null, 'user': null, 'database': null},
    'fields': [
      {
        'label': 'Projektname',
        'inputType': 'input',
        'valueList': [],
        'order': 1,
        'inputDataType': 'text',
        'standardValue': ''
      },
      {
        'label': 'Bemerkungen',
        'inputType': 'textarea',
        'valueList': [],
        'order': 1,
        'inputDataType': '',
        'standardValue': ''
      }
    ]
  }
  projObject = {
    '_id': projObjectGuid,
    'type': 'object',
    'hId': projHierarchyGuid,
    'parent': null,
    'projId': projObjectGuid,
    'users': [window.oi.me.name],
    'lastEdited': {'date': null, 'user': null, 'database': null},
    'data': {
      'Projektname': 'Mein erstes Projekt',
      'Bemerkungen': null
    }
  }
  // add docs to model
  window.oi.objects.push(projObject)
  window.oi.hierarchies.push(projHierarchy)

  if (projectNamePassed) {
    // there is an empty db that needs to get its first docs
    projectName = projectNamePassed
  } else {
    projectName = 'project_' + projObjectGuid
  }
  // add docs to new local project-db
  projectDb = new PouchDB(projectName)
  projectDb.put(projObject).then(function (response) {
    projObject._rev = response.rev
  }).catch(function (err) {
    console.log('error saving first projects object: ', err)
  })
  projectDb.put(projHierarchy).then(function (response) {
    projHierarchy._rev = response.rev
  }).catch(function (err) {
    console.log('error saving first projects hierarchy: ', err)
  })
  // add role to user in userDb
  // userDb syncs role to server
  // server script then creates projectDb in couch
  addRoleToUserDb(projectName, projectDb)
}
