var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<div id=\"lytProject"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projId : stack1), depth0))
    + "\" class=\"panel panel-default js-layerPanel js-projectPanel\" data-projId=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projId : stack1), depth0))
    + "\">\r\n    <div class=\"panel-heading\" role=\"tab\" id=\"headingProjekte\">\r\n        <h4 class=\"panel-title\">\r\n            <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#utilsLayertoolAccordion\" href=\"#collapseProject"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projId : stack1), depth0))
    + "\" aria-expanded=\"false\" aria-controls=\"collapseProject"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projId : stack1), depth0))
    + "\">\r\n              "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.layerTitle : stack1), depth0))
    + "\r\n            </a>\r\n        </h4>\r\n    </div>\r\n    <div id=\"collapseProject"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projId : stack1), depth0))
    + "\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingProjekte\">\r\n        <!--insert layer collapses-->\r\n    </div>\r\n</div>";
},"useData":true});