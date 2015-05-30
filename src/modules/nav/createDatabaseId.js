'use strict'

module.exports = function () {
  if (!window.localStorage.databaseId) {
    window.localStorage.databaseId = Math.random()
  }
  window.oi.databaseId = window.localStorage.databaseId
}
