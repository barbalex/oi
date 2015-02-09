var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, functionType="function";
  return "<div class=\"form-group js-form-group\">\r\n    <label class=\"control-label\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "</label>\r\n    <div class=\"controls reducedMargin\">\r\n        <div class=\"checkbox\">\r\n            <label>\r\n                <input type=\"checkbox\" id=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1._id : stack1), depth0))
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "\" data-object=\""
    + escapeExpression(((helpers.json || (depth0 && depth0.json) || helperMissing).call(depth0, (depth0 != null ? depth0.object : depth0), {"name":"json","hash":{},"data":data})))
    + "\" value=\"true\" "
    + escapeExpression(((helper = (helper = helpers.checked || (depth0 != null ? depth0.checked : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"checked","hash":{},"data":data}) : helper)))
    + ">\r\n            </label>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});