/*
 * passt model und wenn nötig die ui an,
 * wenn in einer anderen DB ein object verändert wurde
 */

'use strict'

var $ = require('jquery'),
  _ = require('underscore'),
  initiateForm = require('./form/initiateForm'),
  getLabelForObject = require('./nav/getLabelForObject'),
  createTree = require('./nav/createTree'),
  createTreeNodeObject = require('./nav/createTreeNodeObject'),
  createTreeNodeRootObject = require('./nav/createTreeNodeRootObject')

function refreshTree (doc) {
  var correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
    return hierarchy._id === doc.hId
  })
  if (doc.data && correspondingHierarchy && correspondingHierarchy.nameField) {
    $('#navContent').jstree().rename_node('#' + doc._id, getLabelForObject(doc, correspondingHierarchy))
  }
}

function addNodeToTree (doc) {
  var node = doc.parent === null ? createTreeNodeRootObject(doc) : createTreeNodeObject(doc)

  // create new node
  if (doc.parent && doc.hId) {
    // tell not to select node
    window.oi.dontSelectNode = true
    $('#navContent').jstree().create_node('#' + doc.parent + doc.hId, node)
  }
}

function removeNodeFromTree (doc) {
  $('#navContent').jstree().delete_node('#' + doc._id)
}

module.exports = function (change) {
  var doc = change.doc,
    tree = $('#navContent').jstree(),
    activeNode = tree.get_selected(true)[0],
    activeId = null,
    modelObject

  if (activeNode) {
    activeId = activeNode.data.type === 'object' ? activeNode.id : activeNode.data.id
  }
  // only use changes from different databases
  if (doc.lastEdited) {
    if (!doc.lastEdited.database || doc.lastEdited.database !== window.oi.databaseId) {
      if (doc._deleted) {
        // doc was deleted
        // remove it from model
        window.oi.objects = _.without(window.oi.objects, doc)
        // remove from tree
        removeNodeFromTree(doc)
        // select parent if this object is shown
        if (activeId && activeId === doc._id) {
          $('#navContent').jstree().select_node('#' + doc.parent + doc.hId)
        }
      } else {
        // doc was changed or created new
        // update model of object
        modelObject = _.find(window.oi.objects, function (object) {
          return object._id === doc._id
        })

        // only continue if model was found
        if (modelObject) {
          // existing doc was changed
          // replace existing object with new one
          window.oi.objects[window.oi.objects.indexOf(modelObject)] = doc

          // refresh form if this object is shown
          // cant update only changed field because it is unknown (?)
          if (activeId && activeId === doc._id) {
            initiateForm(doc._id, 'object')
          }
          // refresh tree
          refreshTree(doc)
        } else {
          // doc was newly created
          window.oi.objects.push(doc)
          addNodeToTree(doc)

          // TODO: if new project, start syncing

        }
      }
    }
  }
}
