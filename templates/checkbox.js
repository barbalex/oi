var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression, alias3=helpers.helperMissing;

  return "<div class=\"form-group js-form-group\">\r\n  <label class=\"control-label\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "</label>\r\n  <div class=\"controls reducedMargin\">\r\n    <div class=\"checkbox\">\r\n      <label>\r\n        <input type=\"checkbox\" id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1._id : stack1), depth0))
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "\" data-object=\""
    + alias2((helpers.json || (depth0 && depth0.json) || alias3).call(depth0,(depth0 != null ? depth0.object : depth0),{"name":"json","hash":{},"data":data}))
    + "\" value=\"true\" "
    + alias2(((helper = (helper = helpers.checked || (depth0 != null ? depth0.checked : depth0)) != null ? helper : alias3),(typeof helper === "function" ? helper.call(depth0,{"name":"checked","hash":{},"data":data}) : helper)))
    + ">\r\n      </label>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});