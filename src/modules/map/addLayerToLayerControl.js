/*
 * adds a layer to the layercontrol
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                      = require('jquery'),
    capitalizeFirstLetter  = require('../capitalizeFirstLetter'),
    layertoolLayerCollapse = require('../../../templates/layertoolLayerCollapse'),
    layertoolProjectPanel  = require('../../../templates/layertoolProjectPanel'),
    getObject              = require('../getObject'),
    getHierarchy           = require('../getHierarchy');

module.exports = function (layer) {
    var dataObject = {},
        obj     = {},
        layerGroup,
        collapseSelector,
        project,
        projId,
        projectName,
        object,
        objId,
        hierarchy;

    obj.layerTitle    = layer.get('layerTitle');
    obj.showControlId = 'show' + layer.get('layerName');
    obj.checked       = layer.getVisible() ? 'checked' : '';
    layerGroup        = layer.get('layerGroup');
    obj.inputType     = layerGroup === 'background' ? 'radio' : 'checkbox';
    // name attribute is needed for radios so only one can be choosen
    obj.inputName     = layerGroup === 'background' ? 'lytBackground' : '';
    obj.isProject     = layerGroup === 'projects' ? true : false;
    collapseSelector  = '#collapse' + capitalizeFirstLetter(layerGroup);

    // put obj in object, so it can be used as whole
    dataObject.object = obj;

    // if background or theme
    if (layerGroup !== 'projects') {
        $(collapseSelector).append(layertoolLayerCollapse(dataObject));
    } else {
        objId                         = layer.get('objId');
        object                        = getObject(objId);
        project                       = getObject(object.projId);
        projId                        = project._id;
        hierarchy                     = getHierarchy(project.hId);
        projectName                   = project.data[hierarchy.nameField];
        dataObject.object.projectName = projectName;
        dataObject.object.projId      = projId;

        console.log('project.data: ', project.data);
        console.log('hierarchy.nameField: ', hierarchy.nameField);
        console.log('project.data[hierarchy.nameField]: ', project.data[hierarchy.nameField]);

        if (!$('#lytProject' + projId).length) {
            // add project-panel first
            $('#utilsLayertoolAccordion').append(layertoolProjectPanel(dataObject));
        }
        setTimeout(function () {
            $('#collapseProject' + projId).append(layertoolLayerCollapse(dataObject));
        }, 100);
    }
};