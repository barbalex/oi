var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "        <option value="
    + ((stack1 = alias1((depth0 != null ? depth0.value : depth0), depth0)) != null ? stack1 : "")
    + " "
    + alias2(alias1((depth0 != null ? depth0.checked : depth0), depth0))
    + ">"
    + alias2(alias1((depth0 != null ? depth0.label : depth0), depth0))
    + "</option>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"form-group js-form-group\">\r\n  <label class=\"control-label\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "</label>\r\n  <div class=\"controls\">\r\n    <select id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1._id : stack1), depth0))
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "\" data-object=\""
    + alias2((helpers.json || (depth0 && depth0.json) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.object : depth0),{"name":"json","hash":{},"data":data}))
    + "\" class=\"form-control\">\r\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.valueList : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </select>\r\n  </div>\r\n</div>";
},"useData":true});