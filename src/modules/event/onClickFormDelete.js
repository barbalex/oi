'use strict'

var $ = require('jquery'),
  deleteObjectAndChildren = require('../deleteObjectAndChildren')

module.exports = function () {
  var node = $('#navContent').jstree(true).get_selected(true)[0]
  deleteObjectAndChildren(node)
}
