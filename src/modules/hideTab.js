'use strict'

var $ = require('jquery'),
  setWidthOfTabs = require('./setWidthOfTabs')

// setTabsWidth wird von toggleTabs false gesetzt, damit die Width nur ein mal gesetzt wird
module.exports = function (tab, setTabsWidth) {
  // navbar: Menu deaktivieren
  $('#' + tab + 'Menu').removeClass('active')
  // Seite ausblenden
  $('#' + tab).hide()
  if (tab === 'map') {
    $('#utils').hide()
    $('#utilsMenu').removeClass('active')
  }
  if (!setTabsWidth) {
    setWidthOfTabs()
  }
}
