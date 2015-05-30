'use strict'

var $ = require('jquery')

module.exports = function () {
  // Werte im Modal zurücksetzen, falls es schon mal offen war
  $('#signinWithModal').find('input').each(function (index, element) {
    if (element.type === 'checkbox') {
      $(element).val(element.id === 'signinWithModalRemember')
    } else {
      $(element).val('')
    }
  })
  // modal öffnen
  // so, dass der Benutzer nicht daran vorbeikommt
  $('#signinWithModal')
    .modal({backdrop: 'static', keyboard: false})
    .find('.well').validator({
    errors: {
      delay: 1000,
      match: 'stimmt nicht überein'
    }
  })
  $('#signinWithModalEmail').focus()
}
