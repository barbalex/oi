var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <option value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\" "
    + escapeExpression(lambda((depth0 != null ? depth0.checked : depth0), depth0))
    + ">"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</option>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group\">\r\n    <label class=\"control-label\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\r\n    <div class=\"controls\">\r\n        <select id=\""
    + escapeExpression(((helper = (helper = helpers.objectId || (depth0 != null ? depth0.objectId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"objectId","hash":{},"data":data}) : helper)))
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.valueList : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </select>\r\n    </div>\r\n</div>";
},"useData":true});