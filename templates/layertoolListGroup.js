var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"list-group\">\r\n    <div class=\"checkbox\">\r\n        <label>\r\n            <input type=\"checkbox\" id=\""
    + escapeExpression(((helper = (helper = helpers.showControlId || (depth0 != null ? depth0.showControlId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"showControlId","hash":{},"data":data}) : helper)))
    + "\" class=\"js-lytShowLayer\" "
    + escapeExpression(((helper = (helper = helpers.checked || (depth0 != null ? depth0.checked : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"checked","hash":{},"data":data}) : helper)))
    + "><div class=\"lytListGroupLabelText\">"
    + escapeExpression(((helper = (helper = helpers.layerTitle || (depth0 != null ? depth0.layerTitle : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"layerTitle","hash":{},"data":data}) : helper)))
    + "</div>\r\n        </label>\r\n    </div>\r\n</div>";
},"useData":true});