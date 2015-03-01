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
    getHierarchy           = require('../getHierarchy');

module.exports = function (layer) {
    var dataObject = {},
        obj     = {},
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
    obj.showControlId = 'show' + layer.get('layerName');
    obj.checked       = layer.getVisible() ? 'checked' : '';
    layerGroup        = layer.get('layerGroup');
    obj.inputType     = layerGroup === 'background' ? 'radio' : 'checkbox';
    // name attribute is needed for radios so only one can be choosen
    obj.inputName     = layerGroup === 'background' ? 'lytBackground' : '';
    obj.isProject     = layerGroup === 'projects' ? true : false;

    // put obj in object, so it can be used as whole
    dataObject.object = obj;

    // if background or theme
    switch (layerGroup) {
    case 'background':
        $('#collapseBackground').append(layertoolLayerCollapse(dataObject));
        break;
    case 'themes':
        if (!$('#lytThemes').length) {
            // add themes-panel first
            $('#lytBackground').after(layertoolThemesPanel(dataObject));
        }
        $('#collapseThemes').append(layertoolLayerCollapse(dataObject));
        break;
    case 'projects':
        objId                         = layer.get('objId');
        object                        = getObject(objId);
        projId                        = object.projId;
        project                       = getObject(projId);
        projectHierarchy              = getHierarchy(project.hId);
        projectName                   = project.data[projectHierarchy.nameField];
        dataObject.object.projectName = projectName;
        dataObject.object.projId      = projId;

        if (!$('#lytProject' + projId).length) {
            // add project-panel first
            $('#utilsLayertoolAccordion').append(layertoolProjectPanel(dataObject));
        }
        $('#collapseProject' + projId).append(layertoolLayerCollapse(dataObject));
        break;
    }
};