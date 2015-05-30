'use strict'

var $ = require('jquery'),
  removeSnapInteractions = require('./removeSnapInteractions'),
  toggleEditButtons = require('./toggleEditButtons')

module.exports = function () {
  var map = window.oi.olMap.map

  if (map.drawInteraction) { map.removeInteraction(map.drawInteraction) }
  if (map.modifyInteraction) { map.removeInteraction(map.modifyInteraction) }
  if (map.selectInteraction) {
    map.removeInteraction(map.selectInteraction)
    $(document).off('keyup')
  }
  if (map.dragBoxInteraction) { map.removeInteraction(map.dragBoxInteraction) }
  removeSnapInteractions()
  toggleEditButtons(false)
}
