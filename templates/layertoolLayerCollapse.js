var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <div class=\"checkbox\">\r\n                <label>\r\n                    <input type=\"checkbox\" id=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.editControlId : stack1), depth0))
    + "\" class=\"js-lytEditLayer\"><div class=\"lytListGroupLabelText\">bearbeiten</div>\r\n                </label>\r\n            </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<div class=\"list-group\" data-object=\""
    + escapeExpression(((helpers.json || (depth0 && depth0.json) || helperMissing).call(depth0, (depth0 != null ? depth0.object : depth0), {"name":"json","hash":{},"data":data})))
    + "\">\r\n    <div class=\"layerName\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.layerTitle : stack1), depth0))
    + "</div>\r\n    <div class=\"lytLayerColumns\">\r\n        <div class=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.inputType : stack1), depth0))
    + "\">\r\n            <label>\r\n                <input type=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.inputType : stack1), depth0))
    + "\" id=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.showControlId : stack1), depth0))
    + "\" name=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.inputName : stack1), depth0))
    + "\" class=\"js-lytShowLayer\" "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.checked : stack1), depth0))
    + "><div class=\"lytListGroupLabelText\">zeigen</div>\r\n            </label>\r\n        </div>\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.isProject : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\r\n</div>";
},"useData":true});