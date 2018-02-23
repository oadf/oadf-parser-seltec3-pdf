'use strict';

var _oadfParserSeltec3Pdf = require('../lib');

var _oadfParserSeltec3Pdf2 = _interopRequireDefault(_oadfParserSeltec3Pdf);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function execute() {
	
	if (files.length == 0) {
		return;
	}
	
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
	'./test/einzelergebnisse5.pdf',
	'./test/einzelergebnisse6.pdf',
	'./test/einzelergebnisse7.pdf',
	'./test/einzelergebnisse8.pdf',
	'./test/einzelergebnisse9.pdf',
	'./test/einzelergebnisse10.pdf',
        './test/einzelergebnisse11.pdf',
        './test/einzelergebnisse12.pdf',
        './test/einzelergebnisse13.pdf',
        './test/einzelergebnisse14.pdf',
        './test/einzelergebnisse15.pdf',
        './test/einzelergebnisse16.pdf',
	'./test/mehrkampf.pdf',
	'./test/mehrkampf2.pdf',
	'./test/mehrkampf3.pdf',
	'./test/mehrkampf4.pdf',
	'./test/mehrkampf5.pdf',
	'./test/mehrkampf6.pdf',
	'./test/mehrkampf7.pdf',
	'./test/mehrkampf8.pdf',
	'./test/mehrkampf9.pdf'
];

execute();