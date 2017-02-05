import pdf from 'oadf-pdf-converter';
import tokenize from './Lexer';
import Parser from './Parser';

module.exports = data => pdf(data).then((pages) => {
  const tokens = tokenize(pages);
  return new Parser(tokens).parse().getSchema();
});
