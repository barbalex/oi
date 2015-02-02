var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;
  return "<div class=\"form-group\">\r\n    <label for=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1._id : stack1), depth0))
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "</label>\r\n    <input type=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.inputDataType : stack1), depth0))
    + "\" class=\"form-control\" id=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1._id : stack1), depth0))
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "\" data-object=\""
    + escapeExpression(((helpers.json || (depth0 && depth0.json) || helperMissing).call(depth0, (depth0 != null ? depth0.object : depth0), {"name":"json","hash":{},"data":data})))
    + "\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.value : stack1), depth0))
    + "\">\r\n</div>";
},"useData":true});