"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});