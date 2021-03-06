'use strict'

var $ = require('jquery'),
  Ps = require('perfect-scrollbar'),
  alsoResizeReverse = require('./alsoResizeReverse'),
  setWidthOfTabs = require('./setWidthOfTabs'),
  toggleTab = require('./toggleTab'),
  positionFormBtngroup = require('./form/positionFormBtngroup'),
  resizeTextareas = require('./form/resizeTextareas'),
  refreshMap = require('./map/refreshMap'),
  refreshScrollbar = require('./refreshScrollbar'),
  saveResizablesConfig = require('./saveResizablesConfig')

module.exports = function () {
  var zaehler

  // add plugin to resize folowing tab
  alsoResizeReverse()

  $('#nav').resizable({
    handles: { 'e': '#navSeparator' },
    alsoResizeReverse: '#form',
    containment: '#content',
    resize: function () {
      positionFormBtngroup()
      refreshMap()
      resizeTextareas()
      saveResizablesConfig()
    }
  })

  $('#form').resizable({
    handles: { 'e': '#formSeparator' },
    alsoResizeReverse: '#map',
    containment: '#content',
    resize: function () {
      positionFormBtngroup()
      refreshMap()
      resizeTextareas()
      saveResizablesConfig()
    }
  })
  // obiger Code überschreibt display:none aus css
  $('#formSeparator').hide()

  $('#map').resizable({
    handles: { 'e': '#mapSeparator' },
    alsoResizeReverse: '#utils',
    containment: '#content',
    resize: function () {
      refreshMap()
      resizeTextareas()
      saveResizablesConfig()
    }
  })

  $('.js-nav-tabs').on('click', 'li', function (event) {
    var id = $(this).attr('id'),
      tab = id.substring(0, id.length - 4)

    event.preventDefault()
    toggleTab(tab)
  })

  // zählt, wieviele male .on('change') ausgelöst wurde
  window.oi.resizeWindowZaehler = 0

  $(window).on('resize', function (event) {
    // resize wird auch beim Verändern der Tabs-Breiten ausgelöst!
    if (event.target === window) {
      window.oi.resizeWindowZaehler++
      // speichert, wieviele male .on('change') ausgelöst wurde, bis setTimout aufgerufen wurde
      zaehler = window.oi.resizeWindowZaehler
      setTimeout(function () {
        if (zaehler === window.oi.resizeWindowZaehler) {
          // in den letzten 400 Millisekunden hat sich nichts geändert > reagieren
          setWidthOfTabs()
          refreshScrollbar()
          window.oi.resizeWindowZaehler = 0
        }
      }, 500)
    }
  })

  $('.scrollbar').each(function (index, element) {
    Ps.initialize(element, { suppressScrollX: true })
  })
}
