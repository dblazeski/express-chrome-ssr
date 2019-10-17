"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _test = require("./functions/test.js");

var _ssr = require("./functions/ssr.js");

// Routes
var app = (0, _express["default"])();
var params = (0, _commandLineArgs["default"])([{
  name: 'port',
  alias: 'p',
  type: Number
}]);
var port = params.port || 3000;
app.listen(port, function () {
  return console.log("I listen on http://localhost:".concat(port));
});
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/test', _test.test);
var browserWSEndpoint = null;
app.get('/ssr',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var url, browser, _ref2, html, status;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = req.query.url;

            if (url) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send('Invalid url param: Example: ?url=https://binge.app'));

          case 3:
            if (browserWSEndpoint) {
              _context.next = 10;
              break;
            }

            _context.next = 6;
            return _puppeteer["default"].launch();

          case 6:
            browser = _context.sent;
            _context.next = 9;
            return browser.wsEndpoint();

          case 9:
            browserWSEndpoint = _context.sent;

          case 10:
            _context.next = 12;
            return (0, _ssr.ssr)(url, browserWSEndpoint);

          case 12:
            _ref2 = _context.sent;
            html = _ref2.html;
            status = _ref2.status;
            return _context.abrupt("return", res.status(status).send(html));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());