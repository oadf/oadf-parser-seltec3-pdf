import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import pdf from 'oadf-pdf-converter';
import Lexer from '../../src/Lexer';
import Token, { TYPES as Type } from '../../src/Token';

describe('SELTEC 3 PDF Lexer 20.pdf', () => {
  it('should create the correct tokens', (done) => {
    const filePath = path.join(process.cwd(), 'test/lexer/fixtures/20.pdf');
    const data = new Uint8Array(fs.readFileSync(filePath));
    pdf(data).then((pages) => {
      const tokens = Lexer(pages);
      expect(tokens).to.deep.equal([
        new Token(Type.COMPETITION_NAME, 'Werfertag'),
        new Token(Type.COMPETITION_CITY, 'Dietzhölztal'),
        new Token(Type.COMPETITION_VENUE, 'Ewersbach'),
        new Token(Type.COMPETITION_START_DATE, '24.09.2016'),
        new Token(Type.DISCIPLINE_NAME, 'Hammerwurf (W5K)'),
        new Token(Type.AGE_GROUP_NAME, 'Jugend W12'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '2000g'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.EVENT_TIME, '12:15'),
        new Token(Type.ATHLETE_POSITION, '3 (18)'),
        new Token(Type.ATHLETE_BIB, '12'),
        new Token(Type.ATHLETE_FULL_NAME, 'Kunz Saleah'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TV Burg'),
        new Token(Type.RESULT_WEIGHT, '2000g'),
        new Token(Type.PERFORMANCE, '22,75'),
        new Token(Type.ATTEMPT1, '-'),
        new Token(Type.ATTEMPT2, '-'),
        new Token(Type.ATTEMPT3, '22,75'),
        new Token(Type.ATTEMPT4, '-'),
        new Token(Type.ATTEMPT5, '20,21'),
        new Token(Type.ATTEMPT6, '21,92'),
        new Token(Type.ATHLETE_POSITION, '4 (20)'),
        new Token(Type.ATHLETE_BIB, '50'),
        new Token(Type.ATHLETE_FULL_NAME, 'Reidl Lara'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TV  Haiger'),
        new Token(Type.RESULT_WEIGHT, '2000g'),
        new Token(Type.PERFORMANCE, '16,00'),
        new Token(Type.ATTEMPT1, '14,90'),
        new Token(Type.ATTEMPT2, '15,53'),
        new Token(Type.ATTEMPT3, '15,85'),
        new Token(Type.ATTEMPT4, '10,82'),
        new Token(Type.ATTEMPT5, '15,71'),
        new Token(Type.ATTEMPT6, '16,00'),
        new Token(Type.ATHLETE_BIB, '3'),
        new Token(Type.ATHLETE_FULL_NAME, 'Scholl Emma'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSV Frankenberg'),
        new Token(Type.PERFORMANCE, 'abg.'),
        new Token(Type.DISCIPLINE_NAME, 'Hammerwurf (W5K)'),
        new Token(Type.AGE_GROUP_NAME, 'Jugend W12'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '2000g'),
        new Token(Type.GROUP_NUMBER, '2'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.EVENT_TIME, '12:17'),
        new Token(Type.DISCIPLINE_NAME, 'Speerwurf (W5K)'),
        new Token(Type.AGE_GROUP_NAME, 'Jugend W12'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '400g'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.EVENT_TIME, '17:00'),
        new Token(Type.ATHLETE_POSITION, '1 (7)'),
        new Token(Type.ATHLETE_BIB, '22'),
        new Token(Type.ATHLETE_FULL_NAME, 'Brückel Kim'),
        new Token(Type.ATHLETE_YOB, '2005'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSF Heuchelheim'),
        new Token(Type.RESULT_WEIGHT, '400g'),
        new Token(Type.PERFORMANCE, '23,27'),
        new Token(Type.ATTEMPT1, 'x'),
        new Token(Type.ATTEMPT2, '22,58'),
        new Token(Type.ATTEMPT3, '23,27'),
        new Token(Type.ATTEMPT4, '19,99'),
        new Token(Type.ATTEMPT5, '22,38'),
        new Token(Type.ATTEMPT6, '18,40'),
        new Token(Type.ATHLETE_POSITION, '2 (9)'),
        new Token(Type.ATHLETE_BIB, '49'),
        new Token(Type.ATHLETE_FULL_NAME, 'Lanzer Tabea'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TV  Haiger'),
        new Token(Type.RESULT_WEIGHT, '400g'),
        new Token(Type.PERFORMANCE, '20,08'),
        new Token(Type.ATTEMPT1, '18,00'),
        new Token(Type.ATTEMPT2, '14,75'),
        new Token(Type.ATTEMPT3, '20,08'),
        new Token(Type.ATTEMPT4, '19,68'),
        new Token(Type.ATTEMPT5, '18,40'),
        new Token(Type.ATTEMPT6, '17,92'),
        new Token(Type.ATHLETE_POSITION, '3 (10)'),
        new Token(Type.ATHLETE_BIB, '2'),
        new Token(Type.ATHLETE_FULL_NAME, 'Siegfried Malia'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSV Frankenberg'),
        new Token(Type.RESULT_WEIGHT, '400g'),
        new Token(Type.PERFORMANCE, '19,63'),
        new Token(Type.ATTEMPT1, 'x'),
        new Token(Type.ATTEMPT2, 'x'),
        new Token(Type.ATTEMPT3, '19,63'),
        new Token(Type.ATTEMPT4, '16,45'),
        new Token(Type.ATTEMPT5, '17,85'),
        new Token(Type.ATTEMPT6, '18,25'),
        new Token(Type.ATHLETE_BIB, '42'),
        new Token(Type.ATHLETE_FULL_NAME, 'Thomas Charlotte'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LAV Dietzhölztal'),
        new Token(Type.PERFORMANCE, 'n.a.'),
        new Token(Type.DISCIPLINE_NAME, 'Kugelstoß (W5K)'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M40'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '7260g'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.EVENT_TIME, '17:00'),
        new Token(Type.ATHLETE_POSITION, '1 (4)'),
        new Token(Type.ATHLETE_BIB, '33'),
        new Token(Type.ATHLETE_FULL_NAME, 'Morbitzer Jörg'),
        new Token(Type.ATHLETE_YOB, '1972'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LAV Dietzhölztal'),
        new Token(Type.RESULT_WEIGHT, '7260g'),
        new Token(Type.PERFORMANCE, '10,02'),
        new Token(Type.POINTS, '470'),
        new Token(Type.ATTEMPT1, '9,75'),
        new Token(Type.ATTEMPT2, '9,85'),
        new Token(Type.ATTEMPT3, '10,02'),
        new Token(Type.ATTEMPT4, '9,77'),
        new Token(Type.ATTEMPT5, '9,90'),
        new Token(Type.ATTEMPT6, '9,40'),
        new Token(Type.DISCIPLINE_NAME, 'Diskuswurf (W5K)'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M40'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '2000g'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.EVENT_TIME, '14:15'),
        new Token(Type.ATHLETE_POSITION, '1 (6)'),
        new Token(Type.ATHLETE_BIB, '33'),
        new Token(Type.ATHLETE_FULL_NAME, 'Morbitzer Jörg'),
        new Token(Type.ATHLETE_YOB, '1972'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LAV Dietzhölztal'),
        new Token(Type.RESULT_WEIGHT, '2000g'),
        new Token(Type.PERFORMANCE, '26,90'),
        new Token(Type.POINTS, '473'),
        new Token(Type.ATTEMPT1, '25,11'),
        new Token(Type.ATTEMPT2, '-'),
        new Token(Type.ATTEMPT3, '26,90'),
        new Token(Type.ATTEMPT4, '-'),
        new Token(Type.ATTEMPT5, '-'),
        new Token(Type.ATTEMPT6, '-'),
        new Token(Type.DISCIPLINE_NAME, 'Hammerwurf (W5K)'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M40'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '7260g'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.EVENT_TIME, '11:30'),
        new Token(Type.ATHLETE_POSITION, '1 (4)'),
        new Token(Type.ATHLETE_BIB, '33'),
        new Token(Type.ATHLETE_FULL_NAME, 'Morbitzer Jörg'),
        new Token(Type.ATHLETE_YOB, '1972'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LAV Dietzhölztal'),
        new Token(Type.RESULT_WEIGHT, '7260g'),
        new Token(Type.PERFORMANCE, '33,76'),
        new Token(Type.POINTS, '573'),
        new Token(Type.ATTEMPT1, '33,55'),
        new Token(Type.ATTEMPT2, '33,76'),
        new Token(Type.ATTEMPT3, '-'),
        new Token(Type.ATTEMPT4, '-'),
        new Token(Type.ATTEMPT5, '32,52'),
        new Token(Type.ATTEMPT6, '-'),
        new Token(Type.DISCIPLINE_NAME, 'Speerwurf (W5K)'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M40'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '800g'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.EVENT_TIME, '15:30'),
        new Token(Type.ATHLETE_POSITION, '1 (4)'),
        new Token(Type.ATHLETE_BIB, '33'),
        new Token(Type.ATHLETE_FULL_NAME, 'Morbitzer Jörg'),
        new Token(Type.ATHLETE_YOB, '1972'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LAV Dietzhölztal'),
        new Token(Type.RESULT_WEIGHT, '800g'),
        new Token(Type.PERFORMANCE, '31,85'),
        new Token(Type.POINTS, '503'),
        new Token(Type.ATTEMPT1, 'x'),
        new Token(Type.ATTEMPT2, 'x'),
        new Token(Type.ATTEMPT3, '31,85'),
        new Token(Type.ATTEMPT4, 'x'),
        new Token(Type.ATTEMPT5, '-'),
        new Token(Type.ATTEMPT6, '-'),
        new Token(Type.END),
      ]);
      done();
    }).catch((e) => {
      done(e);
    });
  });
});
