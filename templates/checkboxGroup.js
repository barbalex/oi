var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "            <div class=\"checkbox\">\r\n                <label>\r\n                    <input type=\"checkbox\" id=\""
    + escapeExpression(lambda(((stack1 = (depths[1] != null ? depths[1].object : depths[1])) != null ? stack1._id : stack1), depth0))
    + escapeExpression(lambda(((stack1 = (depths[1] != null ? depths[1].object : depths[1])) != null ? stack1.label : stack1), depth0))
    + escapeExpression(lambda((data && data.index), depth0))
    + "\" name=\""
    + escapeExpression(lambda(((stack1 = (depths[1] != null ? depths[1].object : depths[1])) != null ? stack1._id : stack1), depth0))
    + escapeExpression(lambda(((stack1 = (depths[1] != null ? depths[1].object : depths[1])) != null ? stack1.label : stack1), depth0))
    + "\" data-object=\""
    + escapeExpression(((helpers.json || (depth0 && depth0.json) || helperMissing).call(depth0, (depths[1] != null ? depths[1].object : depths[1]), {"name":"json","hash":{},"data":data})))
    + "\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\" "
    + escapeExpression(lambda((depth0 != null ? depth0.checked : depth0), depth0))
    + ">\r\n                    "
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "\r\n                </label>\r\n            </div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<div class=\"form-group\">\r\n    <label class=\"control-label\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "</label>\r\n    <div class=\"controls reducedMargin\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.valueList : stack1), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\r\n</div>";
},"useData":true,"useDepths":true});