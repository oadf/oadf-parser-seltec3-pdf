import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import pdf from 'oadf-pdf-converter';
import Lexer from '../../src/Lexer';
import Token, { TYPES as Type } from '../../src/Token';

describe('SELTEC 3 PDF Lexer 17.pdf', () => {
  it('should create the correct tokens', (done) => {
    const filePath = path.join(process.cwd(), 'test/lexer/fixtures/17.pdf');
    const data = new Uint8Array(fs.readFileSync(filePath));
    pdf(data).then((pages) => {
      const tokens = Lexer(pages);
      expect(tokens).to.deep.equal([
        new Token(Type.COMPETITION_NAME, 'Kreismeisterschaften Drei-/Vierkampf'),
        new Token(Type.COMPETITION_CITY, ''),
        new Token(Type.COMPETITION_VENUE, 'Bergisch Gladbach'),
        new Token(Type.COMPETITION_START_DATE, '24.09.2016'),
        new Token(Type.DISCIPLINE_NAME, 'Dreikampf'),
        new Token(Type.AGE_GROUP_NAME, 'Kinder W9'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, 'aus gemeinsamen Bewerb'),
        new Token(Type.EVENT_DATE, '24.09.2016'),
        new Token(Type.PARTICIPANT_COUNT, '30'),
        new Token(Type.ROUND_NAME, 'Finalstand'),
        new Token(Type.COMBINED_DISCIPLINE, '50M'),
        new Token(Type.COMBINED_DISCIPLINE, 'WEI'),
        new Token(Type.COMBINED_DISCIPLINE, 'SCH'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '770'),
        new Token(Type.ATHLETE_FULL_NAME, 'Boecker Anne'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TUS 06 Waldbröhl'),
        new Token(Type.PERFORMANCE, '1.041'),
        new Token(Type.COMBINED_PERFORMANCE, '8,02', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '3,63', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '18,50', 'SCH'),
        new Token(Type.COMBINED_POINTS, '391', '50M'),
        new Token(Type.COMBINED_POINTS, '390', 'WEI'),
        new Token(Type.COMBINED_POINTS, '260', 'SCH'),
        new Token(Type.COMBINED_SUM, '391', '50M'),
        new Token(Type.COMBINED_SUM, '781', 'WEI'),
        new Token(Type.COMBINED_SUM, '1.041', 'SCH'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '737'),
        new Token(Type.ATHLETE_FULL_NAME, 'Fröhlich Enna'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'Leichlinger TV'),
        new Token(Type.PERFORMANCE, '858'),
        new Token(Type.COMBINED_PERFORMANCE, '9,22', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '3,32', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '17,00', 'SCH'),
        new Token(Type.COMBINED_POINTS, '268', '50M'),
        new Token(Type.COMBINED_POINTS, '350', 'WEI'),
        new Token(Type.COMBINED_POINTS, '240', 'SCH'),
        new Token(Type.COMBINED_SUM, '268', '50M'),
        new Token(Type.COMBINED_SUM, '618', 'WEI'),
        new Token(Type.COMBINED_SUM, '858', 'SCH'),
        new Token(Type.ATHLETE_POSITION, '3'),
        new Token(Type.ATHLETE_BIB, '841'),
        new Token(Type.ATHLETE_FULL_NAME, 'Orthmann Hanna'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'Wiehltaler LC'),
        new Token(Type.PERFORMANCE, '826'),
        new Token(Type.COMBINED_PERFORMANCE, '9,02', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '3,27', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '14,00', 'SCH'),
        new Token(Type.COMBINED_POINTS, '287', '50M'),
        new Token(Type.COMBINED_POINTS, '343', 'WEI'),
        new Token(Type.COMBINED_POINTS, '196', 'SCH'),
        new Token(Type.COMBINED_SUM, '287', '50M'),
        new Token(Type.COMBINED_SUM, '630', 'WEI'),
        new Token(Type.COMBINED_SUM, '826', 'SCH'),
        new Token(Type.ATHLETE_POSITION, '4'),
        new Token(Type.ATHLETE_BIB, '845'),
        new Token(Type.ATHLETE_FULL_NAME, 'Jakobs Antonia'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'Wiehltaler LC'),
        new Token(Type.PERFORMANCE, '820'),
        new Token(Type.COMBINED_PERFORMANCE, '8,59', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '3,21', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '11,50', 'SCH'),
        new Token(Type.COMBINED_POINTS, '329', '50M'),
        new Token(Type.COMBINED_POINTS, '335', 'WEI'),
        new Token(Type.COMBINED_POINTS, '156', 'SCH'),
        new Token(Type.COMBINED_SUM, '329', '50M'),
        new Token(Type.COMBINED_SUM, '664', 'WEI'),
        new Token(Type.COMBINED_SUM, '820', 'SCH'),
        new Token(Type.ATHLETE_POSITION, '5'),
        new Token(Type.ATHLETE_BIB, '850'),
        new Token(Type.ATHLETE_FULL_NAME, 'Maier Lelia'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'Leichlinger TV'),
        new Token(Type.PERFORMANCE, '790'),
        new Token(Type.COMBINED_PERFORMANCE, '9,66', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '3,04', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '17,50', 'SCH'),
        new Token(Type.COMBINED_POINTS, '231', '50M'),
        new Token(Type.COMBINED_POINTS, '312', 'WEI'),
        new Token(Type.COMBINED_POINTS, '247', 'SCH'),
        new Token(Type.COMBINED_SUM, '231', '50M'),
        new Token(Type.COMBINED_SUM, '543', 'WEI'),
        new Token(Type.COMBINED_SUM, '790', 'SCH'),
        new Token(Type.ATHLETE_POSITION, '6'),
        new Token(Type.ATHLETE_BIB, '846'),
        new Token(Type.ATHLETE_FULL_NAME, 'Herrmann Marla'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'Wiehltaler LC'),
        new Token(Type.PERFORMANCE, '710'),
        new Token(Type.COMBINED_PERFORMANCE, '9,74', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '2,77', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '15,00', 'SCH'),
        new Token(Type.COMBINED_POINTS, '225', '50M'),
        new Token(Type.COMBINED_POINTS, '274', 'WEI'),
        new Token(Type.COMBINED_POINTS, '211', 'SCH'),
        new Token(Type.COMBINED_SUM, '225', '50M'),
        new Token(Type.COMBINED_SUM, '499', 'WEI'),
        new Token(Type.COMBINED_SUM, '710', 'SCH'),
        new Token(Type.ATHLETE_POSITION, '7'),
        new Token(Type.ATHLETE_BIB, '793'),
        new Token(Type.ATHLETE_FULL_NAME, 'Schober Lena'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TV Herkenrath'),
        new Token(Type.PERFORMANCE, '689'),
        new Token(Type.COMBINED_PERFORMANCE, '9,88', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '2,86', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '13,50', 'SCH'),
        new Token(Type.COMBINED_POINTS, '214', '50M'),
        new Token(Type.COMBINED_POINTS, '287', 'WEI'),
        new Token(Type.COMBINED_POINTS, '188', 'SCH'),
        new Token(Type.COMBINED_SUM, '214', '50M'),
        new Token(Type.COMBINED_SUM, '501', 'WEI'),
        new Token(Type.COMBINED_SUM, '689', 'SCH'),
        new Token(Type.ATHLETE_POSITION, '8'),
        new Token(Type.ATHLETE_BIB, '842'),
        new Token(Type.ATHLETE_FULL_NAME, 'Möbius Klara'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'Wiehltaler LC'),
        new Token(Type.PERFORMANCE, '671'),
        new Token(Type.COMBINED_PERFORMANCE, '9,81', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '2,87', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '12,00', 'SCH'),
        new Token(Type.COMBINED_POINTS, '219', '50M'),
        new Token(Type.COMBINED_POINTS, '288', 'WEI'),
        new Token(Type.COMBINED_POINTS, '164', 'SCH'),
        new Token(Type.COMBINED_SUM, '219', '50M'),
        new Token(Type.COMBINED_SUM, '507', 'WEI'),
        new Token(Type.COMBINED_SUM, '671', 'SCH'),
        new Token(Type.ATHLETE_POSITION, '9'),
        new Token(Type.ATHLETE_BIB, '774'),
        new Token(Type.ATHLETE_FULL_NAME, 'Post Lenja'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TV Herkenrath'),
        new Token(Type.PERFORMANCE, '655'),
        new Token(Type.COMBINED_PERFORMANCE, '9,50', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '2,70', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '11,00', 'SCH'),
        new Token(Type.COMBINED_POINTS, '244', '50M'),
        new Token(Type.COMBINED_POINTS, '264', 'WEI'),
        new Token(Type.COMBINED_POINTS, '147', 'SCH'),
        new Token(Type.COMBINED_SUM, '244', '50M'),
        new Token(Type.COMBINED_SUM, '508', 'WEI'),
        new Token(Type.COMBINED_SUM, '655', 'SCH'),
        new Token(Type.ATHLETE_POSITION, '10'),
        new Token(Type.ATHLETE_BIB, '824'),
        new Token(Type.ATHLETE_FULL_NAME, 'Richter Amelie'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'VfL Engelskirchen'),
        new Token(Type.PERFORMANCE, '560'),
        new Token(Type.COMBINED_PERFORMANCE, '10,19', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, '2,54', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, '10,00', 'SCH'),
        new Token(Type.COMBINED_POINTS, '190', '50M'),
        new Token(Type.COMBINED_POINTS, '240', 'WEI'),
        new Token(Type.COMBINED_POINTS, '130', 'SCH'),
        new Token(Type.COMBINED_SUM, '190', '50M'),
        new Token(Type.COMBINED_SUM, '430', 'WEI'),
        new Token(Type.COMBINED_SUM, '560', 'SCH'),
        new Token(Type.ATHLETE_BIB, '792'),
        new Token(Type.ATHLETE_FULL_NAME, 'Leifeld Greta'),
        new Token(Type.ATHLETE_YOB, '2007'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TV Herkenrath'),
        new Token(Type.PERFORMANCE, 'DNF'),
        new Token(Type.COMBINED_PERFORMANCE, '0', '50M'),
        new Token(Type.COMBINED_PERFORMANCE, 'Dns', 'WEI'),
        new Token(Type.COMBINED_PERFORMANCE, 'ogV', 'SCH'),
        new Token(Type.COMBINED_POINTS, '0', '50M'),
        new Token(Type.COMBINED_POINTS, '0', 'WEI'),
        new Token(Type.COMBINED_POINTS, '0', 'SCH'),
        new Token(Type.COMBINED_SUM, '0', '50M'),
        new Token(Type.COMBINED_SUM, '0', 'WEI'),
        new Token(Type.COMBINED_SUM, '0', 'SCH'),
        new Token(Type.ATHLETE_BIB, '718'),
        new Token(Type.ATHLETE_FULL_NAME, 'Böhler Zarah-Lee'),
        new Token(Type.ATHLETE_YOB, '2007'),
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
        new Token(Type.END, undefined),
      ]);
      done();
    }).catch((e) => {
      done(e);
    });
  });
});
