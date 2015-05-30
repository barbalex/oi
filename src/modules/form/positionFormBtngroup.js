'use strict'

var $ = require('jquery')

module.exports = function () {
  $('#form').find('.btn-group').css('margin-left', $('#formContent').width() - 120)
}
