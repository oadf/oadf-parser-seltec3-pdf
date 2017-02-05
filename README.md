# OADF SELTEC 3 PDF Result List Parser

[![Travis](https://img.shields.io/travis/oadf/oadf-parser-seltec3-pdf.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/oadf/oadf-parser-seltec3-pdf)
[![Coveralls](https://img.shields.io/coveralls/oadf/oadf-parser-seltec3-pdf.svg?maxAge=2592000?style=flat-square)](https://coveralls.io/github/oadf/oadf-parser-seltec3-pdf)

A parser which takes SELTEC3 PDF result lists and converts its data to the OADF schema.
The parser returns a GraphQL schema with which the data can be queried and processed as needed.

## Usage

```javascript
import parser from 'oadf-parser-seltec3-pdf';
import fs from 'fs';

const filePath = '...';
const data = new Uint8Array(fs.readFileSync(filePath));
parser(data).then((schema) => {
    
});
```

## LICENSE

MIT
