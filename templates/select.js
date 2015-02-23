var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "                <option value=";
  stack1 = lambda((depth0 != null ? depth0.value : depth0), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + " "
    + escapeExpression(lambda((depth0 != null ? depth0.checked : depth0), depth0))
    + ">"
    + escapeExpression(lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "</option>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<div class=\"form-group js-form-group\">\r\n    <label class=\"control-label\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "</label>\r\n    <div class=\"controls\">\r\n        <select id=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1._id : stack1), depth0))
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "\" data-object=\""
    + escapeExpression(((helpers.json || (depth0 && depth0.json) || helperMissing).call(depth0, (depth0 != null ? depth0.object : depth0), {"name":"json","hash":{},"data":data})))
    + "\" class=\"form-control\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.valueList : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </select>\r\n    </div>\r\n</div>";
},"useData":true});