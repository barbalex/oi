var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <div class=\"radio\">\r\n                <label>\r\n                    <input type=\"radio\" name=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].objectId : depths[1]), depth0))
    + escapeExpression(lambda((depths[1] != null ? depths[1].label : depths[1]), depth0))
    + "\" id=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1].objectId : depths[1]), depth0))
    + escapeExpression(lambda((depths[1] != null ? depths[1].label : depths[1]), depth0))
    + escapeExpression(lambda((data && data.index), depth0))
    + "\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\" "
    + escapeExpression(lambda((depth0 != null ? depth0.checked : depth0), depth0))
    + ">\r\n                    "
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "\r\n                </label>\r\n            </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group\">\r\n    <label class=\"control-label\">"
    + escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\r\n    <div class=\"controls\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.valueList : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\r\n</div>";
},"useData":true,"useDepths":true});