/*
 * is passed a layer and a feature id
 * returns the corresponding feature
 */

'use strict'

module.exports = function (layer, featureId) {
  var source,
    feature

  source = layer.getSource()
  feature = source.getFeatureById(featureId)
  return feature
}
