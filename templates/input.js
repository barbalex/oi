var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"form-group js-form-group\">\n    <label for=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1._id : stack1), depth0))
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "</label>\n    <input type=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.inputDataType : stack1), depth0))
    + "\" class=\"form-control\" id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1._id : stack1), depth0))
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "\" data-object=\""
    + alias2((helpers.json || (depth0 && depth0.json) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.object : depth0),{"name":"json","hash":{},"data":data}))
    + "\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.value : stack1), depth0))
    + "\">\n</div>";
},"useData":true});