'use strict';

var _oadfParserSeltec3Pdf = require('../lib');

var _oadfParserSeltec3Pdf2 = _interopRequireDefault(_oadfParserSeltec3Pdf);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filePath = './test/cd.pdf';
var data = new Uint8Array(_fs2.default.readFileSync(filePath));
(0, _oadfParserSeltec3Pdf2.default)(data).then(
	function (schema) {
		console.log(schema);
	}
);