/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('openlayers'),
    $  = require('jquery');

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
    $interaction_type.on('click', function(e) {
        // add new interaction
        if (this.value === 'draw') {
            addDrawInteraction();
        } else {
            addModifyInteraction();
        }
    });

    // get geometry type
    var $geom_type = $('#geom_type');
    // rebuild interaction when the geometry type is changed
    $geom_type.on('change', function(e) {
        map.removeInteraction(drawInteraction);
        addDrawInteraction();
    });

    // get data type to save in
    $data_type = $('#data_type');
    // clear map and rebuild interaction when changed
    $data_type.onchange = function() {
        clearMap();
        map.removeInteraction(drawInteraction);
        addDrawInteraction();
    };

    // build up modify interaction
    // needs a select and a modify interaction working together
    function addModifyInteraction() {
        // remove draw interaction
        map.removeInteraction(drawInteraction);
        // create select interaction
        selectInteraction = new ol.interaction.Select({
            // make sure only the desired layer can be selected
            layers: function(layer) {
                return layer.get('name') === 'my_vectorlayer';
            }
        });
        map.addInteraction(selectInteraction);
        
        // grab the features from the select interaction to use in the modify interaction
        var selected_features = selectInteraction.getFeatures();
        // when a feature is selected...
        selected_features.on('add', function(event) {
            // grab the feature
            var feature = event.element;
            // ...listen for changes and save them
            feature.on('change', saveData);
            // listen to pressing of delete key, then delete selected features
            $(document).on('keyup', function(event) {
                if (event.keyCode == 46) {
                    // remove all selected features from selectInteraction and my_vectorlayer
                    selected_features.forEach(function(selected_feature) {
                        var selected_feature_id = selected_feature.getId();
                        // remove from selectInteraction
                        selected_features.remove(selected_feature);
                        // features aus vectorlayer entfernen
                        var vectorlayer_features = layer.getSource().getFeatures();
                        vectorlayer_features.forEach(function(source_feature) {
                            var source_feature_id = source_feature.getId();
                            if (source_feature_id === selected_feature_id) {
                                // remove from my_vectorlayer
                                layer.getSource().removeFeature(source_feature);
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
            features: selected_features,
            // delete vertices by pressing the SHIFT key
            deleteCondition: function(event) {
                return ol.events.condition.shiftKeyOnly(event) &&
                    ol.events.condition.singleClick(event);
            }
        });
        // add it to the map
        map.addInteraction(modifyInteraction);
    }

    // creates a draw interaction
    function addDrawInteraction() {
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
        drawInteraction.on('drawend', function(event) {
            // create a unique id
            // it is later needed to delete features
            var id = uid();
            // give the feature this id
            event.feature.setId(id);
            // save the changed data
            saveData(); 
        });
    }

    // add the draw interaction when the page is first shown
    addDrawInteraction();

    // shows data in textarea
    // replace this function by what you need
    function saveData() {
        // get the format the user has chosen
        var data_type = $data_type.val(),
                // define a format the data shall be converted to
                    format = new ol.format[data_type](),
                // this will be the data in the chosen format
                    data;
        try {
            // convert the data of the layer into the chosen format
            data = format.writeFeatures(layer.getSource().getFeatures());
        } catch (e) {
            // at time of creation there is an error in the GPX format (18.7.2014)
            $('#data').val(e.name + ": " + e.message);
            return;
        }
        if ($data_type.val() === 'GeoJSON') {
            // format is JSON
            $('#data').val(JSON.stringify(data, null, 4));
        } else {
            // format is XML (GPX or KML)
            var serializer = new XMLSerializer();
            $('#data').val(serializer.serializeToString(data));
        }
    }

    // clear map when user clicks on 'Delete all features'
    $("#delete").click(function() {
        clearMap();
    });

    // clears the map and the output of the data
    function clearMap() {
        layer.getSource().clear();
        if (selectInteraction) {
            selectInteraction.getFeatures().clear();
        }
        $('#data').val('');
    }

    // creates unique id's
    function uid(){
        var id = 0;
        return function() {
            if (arguments[0] === 0) {
                id = 0;
            }
            return id++;
        }
    }
};