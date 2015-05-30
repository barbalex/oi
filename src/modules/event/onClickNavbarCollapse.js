// wählt man in der Mobilansicht einen Menu-Eintrag, soll das Menu schliessen

'use strict'

var $ = require('jquery')

module.exports = function (event) {
  if ($(event.target).is('a')) {
    $(this).collapse('hide')
  }
}
