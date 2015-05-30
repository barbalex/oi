'use strict'

module.exports = function () {
  if (!localStorage.databaseId) {
    localStorage.databaseId = Math.random()
  }
  window.oi.databaseId = localStorage.databaseId
}
