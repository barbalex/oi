// when features are changed

'use strict'

var toggleEditButtons = require('./toggleEditButtons'),
  styleRed = require('./styleRed')

module.exports = function (event) {
  var feature = event.element

  console.log('feature removed from select interaction')

  // set different style
  feature.setStyle(styleRed())

  toggleEditButtons()
}
