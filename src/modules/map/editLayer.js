/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('openlayers'),
    $  = require('jquery');

// shows data in textarea
// replace this function by what you need
function saveData(layer) {
    var format = new ol.format.GeoJSON(),
        // this will be the data in the chosen format
        data;

    // convert the data of the layer into GeoJson
    data = format.writeFeatures(layer.getSource().getFeatures());
    $('#data').val(JSON.stringify(data, null, 4));
}

// build up modify interaction
// needs a select and a modify interaction working together
function addModifyInteraction(layer) {
    var map               = window.oi.olMap.map,
        drawInteraction   = window.oi.olMap.map.drawInteraction,
        selectInteraction,
        modifyInteraction,
        selectedFeatures,
        feature;

    // remove draw interaction
    map.removeInteraction(drawInteraction);
    // create select interaction
    selectInteraction = new ol.interaction.Select({
        // make sure only the desired layer can be selected
        layers: function (layer) {
            return layer.get('name') === 'my_vectorlayer';
        }
    });
    // make interactions global so they can later be removed
    window.oi.olMap.map.selectInteraction = selectInteraction;
    map.addInteraction(selectInteraction);

    // grab the features from the select interaction to use in the modify interaction
    selectedFeatures = selectInteraction.getFeatures();
    // when a feature is selected...
    selectedFeatures.on('add', function (event) {
        // grab the feature
        feature = event.element;
        // ...listen for changes and save them
        feature.on('change', function () {
            saveData(layer);
        });
        // listen to pressing of delete key, then delete selected features
        $(document).on('keyup', function (event) {
            var selectedFeatureId,
                layerFeatures;
            if (event.keyCode === 46) {
                // remove all selected features from selectInteraction and layer
                selectedFeatures.forEach(function (selectedFeature) {
                    selectedFeatureId = selectedFeature.getId();
                    // remove from selectInteraction
                    selectedFeatures.remove(selectedFeature);
                    // features aus vectorlayer entfernen
                    layerFeatures = layer.getSource().getFeatures();
                    layerFeatures.forEach(function (sourceFeature) {
                        var sourceFeatureId = sourceFeature.getId();
                        if (sourceFeatureId === selectedFeatureId) {
                            // remove from layer
                            layer.getSource().removeFeature(sourceFeature);
                            // save the changed data
                            saveData();
                        }
                    });
                });
                // remove listener
                $(document).off('keyup');
            }
        });
    });
    // create the modify interaction
    modifyInteraction = new ol.interaction.Modify({
        features: selectedFeatures,
        // delete vertices by pressing the SHIFT key
        deleteCondition: function (event) {
            return ol.events.condition.shiftKeyOnly(event) &&
                ol.events.condition.singleClick(event);
        }
    });
    // make interactions global so they can later be removed
    window.oi.olMap.map.modifyInteraction = modifyInteraction;
    // add it to the map
    map.addInteraction(modifyInteraction);
}

// creates a draw interaction
function addDrawInteraction(layer) {
    var map               = window.oi.olMap.map,
        selectInteraction = window.oi.olMap.map.selectInteraction,
        modifyInteraction = window.oi.olMap.map.modifyInteraction,
        drawInteraction;

    // remove other interactions
    map.removeInteraction(selectInteraction);
    map.removeInteraction(modifyInteraction);

    // create the interaction
    drawInteraction = new ol.interaction.Draw({
        source: layer.getSource(),
        type: /** @type {ol.geom.GeometryType} */ ($geom_type.val())
    });
        // add it to the map
    map.addInteraction(drawInteraction);

    // when a new feature has been drawn...
    drawInteraction.on('drawend', function (event) {
        // create a unique id
        // it is later needed to delete features
        var id = uid();
        // give the feature this id
        event.feature.setId(id);
        // save the changed data
        saveData(); 
    });
}

module.exports = function (layer) {
    // Create a map
    var map               = window.oi.olMap.map,
        selectInteraction,
        drawInteraction,
        modifyInteraction;

    // make interactions global so they can later be removed
    window.oi.olMap.map.selectInteraction = selectInteraction;
    window.oi.olMap.map.drawInteraction   = drawInteraction;
    window.oi.olMap.map.modifyInteraction = modifyInteraction;

    // get the interaction type
    var $interaction_type = $('[name="interaction_type"]');
    // rebuild interaction when changed
    $interaction_type.on('click', function (e) {
        // add new interaction
        if (this.value === 'draw') {
            addDrawInteraction(layer);
        } else {
            addModifyInteraction(layer);
        }
    });

    // get geometry type
    var $geom_type = $('#geom_type');
    // rebuild interaction when the geometry type is changed
    $geom_type.on('change', function (e) {
        map.removeInteraction(drawInteraction);
        addDrawInteraction(layer);
    });

    // get data type to save in
    $data_type = $('#data_type');
    // clear map and rebuild interaction when changed
    $data_type.onchange = function () {
        clearMap();
        map.removeInteraction(drawInteraction);
        addDrawInteraction(layer);
    };
};