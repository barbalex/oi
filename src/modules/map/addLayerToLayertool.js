/*
 * adds a layer to the layercontrol
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                      = require('jquery'),
    layertoolLayerCollapse = require('../../../templates/layertoolLayerCollapse'),
    layertoolProjectPanel  = require('../../../templates/layertoolProjectPanel'),
    layertoolThemesPanel   = require('../../../templates/layertoolThemesPanel'),
    getObject              = require('../getObject'),
    getHierarchy           = require('../getHierarchy'),
    capitalizeFirstLetter  = require('../capitalizeFirstLetter');

module.exports = function (layer) {
    var dataObject = {},
        obj        = {},
        layerGroup,
        project,
        projId,
        projectName,
        object,
        objId,
        projectHierarchy,
        $layerGroups;

    $layerGroups = $('#utilsLayertoolAccordion').children();

    obj.layerTitle    = layer.get('layerTitle');
    obj.layerName     = layer.get('layerName');
    obj.showControlId = 'show' + layer.get('layerName');
    obj.editControlId = 'edit' + layer.get('layerName');
    obj.checked       = layer.getVisible() ? 'checked' : '';
    layerGroup        = layer.get('layerGroup');
    obj.inputType     = layerGroup === 'background' ? 'radio' : 'checkbox';
    // name attribute is needed for radios so only one can be choosen
    obj.inputName     = 'lyt' + capitalizeFirstLetter(layerGroup);
    obj.isProject     = layerGroup === 'projects' ? true : false;

    // put obj in object, so it can be used as whole
    dataObject.object = obj;

    // if background or theme
    switch (layerGroup) {
    case 'background':
        $('#collapseBackground').append(layertoolLayerCollapse(dataObject));
        break;
    case 'themes':
        // check if themes-panel exists
        if (!$('#lytThemes').length) {
            // add themes-panel first
            $('#lytBackground').after(layertoolThemesPanel(dataObject));
        }
        $('#collapseThemes').append(layertoolLayerCollapse(dataObject));
        break;
    case 'projects':
        // je nach Herkunft gibt es objId aber keine projId
        // oder projId, dafür keine objId
        objId = layer.get('objId');
        if (objId) {
            object = getObject(objId);
            projId = object.projId;
        } else {
            projId = layer.get('projId');
        }

        if (projId) {
            project                       = getObject(projId);
            projectHierarchy              = getHierarchy(project.hId);
            projectName                   = project.data[projectHierarchy.nameField];
            dataObject.object.projectName = projectName;
            dataObject.object.projId      = projId;

            // check if this project's panel exists
            if (!$('#lytProject' + projId).length) {
                // add project-panel first
                $('#utilsLayertoolAccordion').append(layertoolProjectPanel(dataObject));
            }
            $('#collapseProject' + projId).append(layertoolLayerCollapse(dataObject));
        }
        break;
    }
};