'use strict'

var getObject = require('./getObject'),
  getHierarchy = require('./getHierarchy'),
  createNewObject = require('./createNewObject')

module.exports = function (objectId) {
  var object,
    hierarchy,
    newObject

  object = getObject(objectId)

  // console.log('createNewObjectFromObject: object', object)

  if (object && object.hId) {
    // get metadata for doc
    hierarchy = getHierarchy(object.hId)

    // console.log('createNewObjectFromObject: hierarchy', hierarchy)
    // console.log('createNewObjectFromObject: object.hId', object.hId)

    // erstellt neues Objekt, ergänzt model und tree und selected node
    newObject = createNewObject(object, hierarchy)

    // console.log('createNewObjectFromObject: newObject', newObject)

    if (!newObject) {
      console.log('error: new object not created')
    }
  } else {
    console.log('error: no hierarchy found for object with id = ', objectId)
  }
}
