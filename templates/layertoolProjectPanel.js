var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div id=\"lytProject"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projId : stack1), depth0))
    + "\" class=\"panel panel-default js-layerPanel js-projectPanel\" data-projId=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projId : stack1), depth0))
    + "\">\r\n  <div class=\"panel-heading\" role=\"tab\" id=\"headingProjekte\">\r\n    <h4 class=\"panel-title\">\r\n      <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#utilsLayertoolAccordion\" href=\"#collapseProject"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projId : stack1), depth0))
    + "\" aria-expanded=\"false\" aria-controls=\"collapseProject"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projId : stack1), depth0))
    + "\">\r\n        "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projectName : stack1), depth0))
    + "\r\n      </a>\r\n    </h4>\r\n  </div>\r\n  <div id=\"collapseProject"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.projId : stack1), depth0))
    + "\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingProjekte\">\r\n    <!--insert layer collapses-->\r\n  </div>\r\n</div>";
},"useData":true});