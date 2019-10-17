"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = void 0;

var test = function test(req, res, next) {
  return res.status(200).send('test');
};

exports.test = test;