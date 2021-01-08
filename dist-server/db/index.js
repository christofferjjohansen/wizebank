"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.query = exports.oneOrNone = exports.one = exports.none = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("./models"));

var none = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(sql, options) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].query(sql, options);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function none(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.none = none;

var one = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(sql, options) {
    var resp;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models["default"].query(sql, options);

          case 2:
            resp = _context2.sent;

            if (!(resp[0].length > 1)) {
              _context2.next = 7;
              break;
            }

            throw 'More than 1 row returned';

          case 7:
            if (!(resp[0].length === 0)) {
              _context2.next = 9;
              break;
            }

            throw 'No rows returned';

          case 9:
            return _context2.abrupt("return", resp[0][0]);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function one(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.one = one;

var oneOrNone = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(sql, options) {
    var resp;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models["default"].query(sql, options);

          case 2:
            resp = _context3.sent;

            if (!(resp[0].length > 1)) {
              _context3.next = 5;
              break;
            }

            throw 'More than 1 row returned';

          case 5:
            return _context3.abrupt("return", resp[0][0]);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function oneOrNone(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.oneOrNone = oneOrNone;

var query = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(sql, options) {
    var resp;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models["default"].query(sql, options);

          case 2:
            resp = _context4.sent;
            return _context4.abrupt("return", resp[0]);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function query(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.query = query;
var _default = {
  none: none,
  one: one,
  oneOrNone: oneOrNone,
  query: query
};
exports["default"] = _default;