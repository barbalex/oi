'use strict'

var $ = require('jquery'),
  generateDataForTree = require('./generateDataForTree'),
  initiateForm = require('../form/initiateForm'),
  treeContextmenuItems = require('./treeContextmenuItems'),
  refreshScrollbar = require('../refreshScrollbar')

module.exports = function () {
  var treeData = generateDataForTree(),
    $navContent = $('#navContent')

  // console.log('window.oi.objects: ', window.oi.objects)
    // console.log('window.oi.hierarchies: ', window.oi.hierarchies)
    // console.log('treeData: ', treeData)

  $navContent.jstree({
    'plugins': ['wholerow', 'state', 'contextmenu'],
    'core': {
      'data': treeData,
      'themes': {
        'responsive': true,
        'icons': false,
        'dots': false
      },
      'check_callback': true,
      'multiple': false
    },
    'contextmenu': {
      'items': function ($node) {
        return treeContextmenuItems($node)
      }
    }
  }).on('ready.jstree', function () {
    refreshScrollbar()
  }).on('create_node.jstree', function (e, data) {
    if (!window.oi.dontSelectNode) {
      $navContent.jstree().select_node(data.node)
    } else {
      delete window.oi.dontSelectNode
    }
  }).on('select_node.jstree', function (e, data) {
    if (data.node.data.type === 'object') {
      initiateForm(data.node.id, 'object')
    } else {
      // hierarchy-id übergeben
      initiateForm(data.node.data.id, 'hierarchy')
    }
    $navContent.jstree().open_node(data.node)
  })
}
