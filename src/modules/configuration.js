/**
 * Hier werden zentral alle Konfigurationsparameter gesammelt
 */

'use strict'

var config = {}
config.couch = {}
config.couch.dbUrl = '127.0.0.1:5984'
config.couch.dbName = 'oi_messages'

module.exports = config
