import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import pdf from 'oadf-pdf-converter';
import Lexer from '../../src/Lexer';
import Token, { TYPES as Type } from '../../src/Token';

describe('SELTEC 3 PDF Lexer 16.pdf', () => {
  it('should create the correct tokens', (done) => {
    const filePath = path.join(process.cwd(), 'test/lexer/fixtures/16.pdf');
    const data = new Uint8Array(fs.readFileSync(filePath));
    pdf(data).then((pages) => {
      const tokens = Lexer(pages);
      expect(tokens).to.deep.equal([
        new Token(Type.COMPETITION_NAME, 'Kreismeisterschaften Drei-/Vierkampf'),
        new Token(Type.COMPETITION_CITY, ''),
        new Token(Type.COMPETITION_VENUE, 'Bergisch Gladbach'),
        new Token(Type.COMPETITION_START_DATE, '24.09.2016'),
        new Token(Type.DISCIPLINE_NAME, 'Dreikampf'),
        new Token(Type.AGE_GROUP_NAME, 'Kinder W8'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, 'aus gemeinsamen Bewerb'),
        new Token(Type.EVENT_DATE, '24.09.2016'),
        new Token(Type.PARTICIPANT_COUNT, '30'),
        new Token(Type.ROUND_NAME, 'Finalstand'),
        new Token(Type.COMBINED_DISCIPLINE, '50M'),
        new Token(Type.COMBINED_DISCIPLINE, 'WEI'),
        new Token(Type.COMBINED_DISCIPLINE, 'SCH'),
        new Token(Type.ATHLETE_POSITION, '16'),
        new Token(Type.ATHLETE_BIB, '703'),
        new Token(Type.ATHLETE_FULL_NAME, 'Delija Amelie'),
        new Token(Type.ATHLETE_YOB, '2008'),
        new Token(Type.ATHLETE_CLUB_NAME, 'DJK Montania Kürten'),
        new Token(Type.PERFORMANCE, '301'),
        new Token(Type.COMBINED_PERFORMANCE, '12,70', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '1,96', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '9,00', 'SCH'),
        new Token(Type.COMBINED_POINTS, '43', '50M'),
        new Token(Type.COMBINED_POINTS, '147', 'WEI'),
        new Token(Type.COMBINED_POINTS, '111', 'SCH'),
        new Token(Type.COMBINED_SUM, '43', '50M'),
        new Token(Type.COMBINED_SUM, '190', 'WEI'),
        new Token(Type.COMBINED_SUM, '301', 'SCH'),
        new Token(Type.ATHLETE_BIB, '776'),
        new Token(Type.ATHLETE_FULL_NAME, 'Schommer Luisa'),
        new Token(Type.ATHLETE_YOB, '2008'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TV Herkenrath'),
        new Token(Type.PERFORMANCE, 'DNF'),
        new Token(Type.COMBINED_PERFORMANCE, 'Dns', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, 'Dns', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, 'ogV', 'SCH'),
        new Token(Type.COMBINED_POINTS, '0', '50M'),
        new Token(Type.COMBINED_POINTS, '0', 'WEI'),
        new Token(Type.COMBINED_POINTS, '0', 'SCH'),
        new Token(Type.COMBINED_SUM, '0', '50M'),
        new Token(Type.COMBINED_SUM, '0', 'WEI'),
        new Token(Type.COMBINED_SUM, '0', 'SCH'),
        new Token(Type.ATHLETE_BIB, '715'),
        new Token(Type.ATHLETE_FULL_NAME, 'Antrecht Lena'),
        new Token(Type.ATHLETE_YOB, '2008'),
        new Token(Type.ATHLETE_CLUB_NAME, 'DJK Montania Kürten'),
        new Token(Type.PERFORMANCE, 'DNF'),
        new Token(Type.COMBINED_PERFORMANCE, 'Dns', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, 'Dns', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, 'ogV', 'SCH'),
        new Token(Type.COMBINED_POINTS, '0', '50M'),
        new Token(Type.COMBINED_POINTS, '0', 'WEI'),
        new Token(Type.COMBINED_POINTS, '0', 'SCH'),
        new Token(Type.COMBINED_SUM, '0', '50M'),
        new Token(Type.COMBINED_SUM, '0', 'WEI'),
        new Token(Type.COMBINED_SUM, '0', 'SCH'),
        new Token(Type.DISCIPLINE_NAME, 'Dreikampf Mannschaft WKU10'),
        new Token(Type.AGE_GROUP_NAME, 'W9, W8'),
        new Token(Type.TEAM_POSITION, '1'),
        new Token(Type.TEAM_CLUB_NAME, 'DJK Montania Kürten'),
        new Token(Type.TEAM_NUMBER, '1'),
        new Token(Type.PERFORMANCE, '2.970'),
        new Token(Type.ATHLETE_FULL_NAME, 'Schmitz Lotta-Ida'),
        new Token(Type.ATHLETE_YOB, '2008'),
        new Token(Type.PERFORMANCE, '787'),
        new Token(Type.ATHLETE_FULL_NAME, 'Löpmann Leana'),
        new Token(Type.ATHLETE_YOB, '2008'),
        new Token(Type.PERFORMANCE, '667'),
        new Token(Type.ATHLETE_FULL_NAME, 'Arens Chiiara'),
        new Token(Type.ATHLETE_YOB, '2008'),
        new Token(Type.PERFORMANCE, '574'),
        new Token(Type.ATHLETE_FULL_NAME, 'Arens Alica'),
        new Token(Type.ATHLETE_YOB, '2008'),
        new Token(Type.PERFORMANCE, '514'),
        new Token(Type.ATHLETE_FULL_NAME, 'Rappenhöner Clara-Marie'),
        new Token(Type.ATHLETE_YOB, '2008'),
        new Token(Type.PERFORMANCE, '428'),
        new Token(Type.END, undefined),
      ]);
      done();
    }).catch((e) => {
      done(e);
    });
  });
});
