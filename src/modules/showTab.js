'use strict'

var $ = require('jquery'),
  initiateMap = require('./map/initiateMap'),
  setWidthOfTabs = require('./setWidthOfTabs')

// setTabsWidth wird von toggleTabs false gesetzt, damit die Width nur ein mal gesetzt wird
module.exports = function (tab, setTabsWidth) {
  $('#' + tab + 'Menu').addClass('active')
  // Seite ausblenden
  $('#' + tab).show()
  if (tab === 'map') {
    initiateMap()
    $('#utils').show()
    $('#utilsMenu').addClass('active')
  }
  if (!setTabsWidth) {
    setWidthOfTabs()
  }
}
