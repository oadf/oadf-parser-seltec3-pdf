'use strict';

var _oadfParserSeltec3Pdf = require('../lib');

var _oadfParserSeltec3Pdf2 = _interopRequireDefault(_oadfParserSeltec3Pdf);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function execute() {
	(0, _oadfParserSeltec3Pdf2.default)(new Uint8Array(_fs2.default.readFileSync(files[0]))).then(
		function (schema) {
			console.log(files[0]+" ->  erfolg");
			files.shift();
			execute();
		}
	);
}

var files = [
	'./test/einzelergebnisse.pdf',
	'./test/einzelergebnisse2.pdf',
	'./test/einzelergebnisse3.pdf',
	'./test/einzelergebnisse4.pdf',
	'./test/mehrkampf.pdf',
	'./test/mehrkampf2.pdf',
	'./test/mehrkampf3.pdf',
	'./test/mehrkampf4.pdf'
];

execute();