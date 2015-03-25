var Handlebars = require("handlebars");module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression, alias3=helpers.helperMissing;

  return "            <div class=\"radio\">\n                <label>\n                    <input type=\"radio\" name=\""
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].object : depths[1])) != null ? stack1._id : stack1), depth0))
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].object : depths[1])) != null ? stack1.label : stack1), depth0))
    + "\" id=\""
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].object : depths[1])) != null ? stack1._id : stack1), depth0))
    + alias2(alias1(((stack1 = (depths[1] != null ? depths[1].object : depths[1])) != null ? stack1.label : stack1), depth0))
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias3),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-object=\""
    + alias2((helpers.json || (depth0 && depth0.json) || alias3).call(depth0,(depths[1] != null ? depths[1].object : depths[1]),{"name":"json","hash":{},"data":data}))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "\" "
    + alias2(alias1((depth0 != null ? depth0.checked : depth0), depth0))
    + ">\n                    "
    + alias2(alias1((depth0 != null ? depth0.label : depth0), depth0))
    + "\n                </label>\n            </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"form-group js-form-group\">\n    <label class=\"control-label\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.label : stack1), depth0))
    + "</label>\n    <div class=\"controls reducedMargin\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.object : depth0)) != null ? stack1.valueList : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true,"useDepths":true});