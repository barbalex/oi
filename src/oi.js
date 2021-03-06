'use strict'

var initiateApp = require('./modules/initiateApp'),
  PouchDB = require('pouchdb')

// set up pouchdb plugins
require('bootstrap-validator')
PouchDB.plugin(require('pouchdb-authentication'))

// benötigte globale Variabeln initialisieren
window.oi = window.oi || {}
window.oi.olMap = window.oi.olMap || {}
window.oi.sync = window.oi.sync || {}
window.oi.changes = window.oi.changes || []
window.oi.me = window.oi.me || {}
window.oi.objects = []
window.oi.hierarchies = []

// expose pouchdb to pouchdb-fauxton
window.PouchDB = PouchDB

initiateApp()
