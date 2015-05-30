'use strict'

var _ = require('underscore'),
  $ = require('jquery')

module.exports = function () {
  var $tabs = []

  // create an array of the visible tabs
  $('.js-tab:visible').each(function () {
    $tabs.push($(this).attr('id'))
  })

  _.each($tabs, function (tabId, index) {
    if (index === $tabs.length - 1) {
      $('#' + tabId + 'Separator').hide()
    } else {
      $('#' + tabId + 'Separator').show()
    }
  })
}
