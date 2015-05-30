/*
 * saves previous nav configurations
 * Goal: User sets width of navs
 * the next time he blends the same navs,
 * they are shown with the same widths as before
 *
 * idea: previous configurations are saved
 * - in an object ("previous")
 * - inside a key named "w" + window.width
 *   this is to make sure, configurations are only saved for same window widths
 * - in a key named "c" + <a series of 4 0's and 1's representing the 4 tabs and their status>
 * - example: object.w1920.c1110
 *
 * when a tab is shown/hidden, the app searches for a previous configuration to apply
 * if there is none, it uses the function "setWidthOfTabs"
 */

'use strict'

var $ = require('jquery')

module.exports = function () {
  var now = {},
    nowName = 'c',
    $nav = $('#nav'),
    $form = $('#form'),
    $map = $('#map'),
    $utils = $('#utils'),
    windowWidth = $(window).width()

  window.oi.previousTabConfig = window.oi.previousTabConfig || {}
  window.oi.previousTabConfig['w' + windowWidth] = window.oi.previousTabConfig['w' + windowWidth] || {}

  if ($nav.is(':visible')) {
    nowName = nowName + '1'
    now.nav = $nav.width()
  } else {
    nowName = nowName + '0'
    now.nav = 0
  }
  if ($form.is(':visible')) {
    nowName = nowName + '1'
    now.form = $form.width()
  } else {
    nowName = nowName + '0'
    now.form = 0
  }
  if ($map.is(':visible')) {
    nowName = nowName + '1'
    now.map = $map.width()
  } else {
    nowName = nowName + '0'
    now.map = 0
  }
  if ($utils.is(':visible')) {
    nowName = nowName + '1'
    now.utils = $utils.width()
  } else {
    nowName = nowName + '0'
    now.utils = 0
  }

  window.oi.previousTabConfig['w' + windowWidth][nowName] = now
  // save in window.localStorage so it can be loaded on next app start
  window.localStorage.previousTabConfig = JSON.stringify(window.oi.previousTabConfig)
}
