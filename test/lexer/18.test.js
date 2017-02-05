import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import pdf from 'oadf-pdf-converter';
import Lexer from '../../src/Lexer';
import Token, { TYPES as Type } from '../../src/Token';

describe('SELTEC 3 PDF Lexer 18.pdf', () => {
  it('should create the correct tokens', (done) => {
    const filePath = path.join(process.cwd(), 'test/lexer/fixtures/18.pdf');
    const data = new Uint8Array(fs.readFileSync(filePath));
    pdf(data).then((pages) => {
      const tokens = Lexer(pages);
      expect(tokens).to.deep.equal([
        new Token(Type.COMPETITION_NAME, 'Werfertag'),
        new Token(Type.COMPETITION_CITY, 'Dietzhölztal'),
        new Token(Type.COMPETITION_VENUE, 'Ewersbach'),
        new Token(Type.COMPETITION_START_DATE, '24.09.2016'),
        new Token(Type.DISCIPLINE_NAME, 'Werferfünfkampf'),
        new Token(Type.AGE_GROUP_NAME, 'Seniorinnen W45'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, 'aus gemeinsamen Bewerb'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.PARTICIPANT_COUNT, '3'),
        new Token(Type.ROUND_NAME, 'Finalstand'),
        new Token(Type.COMBINED_DISCIPLINE, 'HAM'),
        new Token(Type.COMBINED_DISCIPLINE, 'KUG'),
        new Token(Type.COMBINED_DISCIPLINE, 'DIS'),
        new Token(Type.COMBINED_DISCIPLINE, 'SPE'),
        new Token(Type.COMBINED_DISCIPLINE, 'GEW'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '34'),
        new Token(Type.ATHLETE_FULL_NAME, 'Morbitzer Juliane'),
        new Token(Type.ATHLETE_YOB, '1969'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LAV Dietzhölztal'),
        new Token(Type.PERFORMANCE, '1.943'),
        new Token(Type.COMBINED_PERFORMANCE, '21,04', 'HAM'),
        new Token(Type.COMBINED_PERFORMANCE, '7,30', 'KUG'),
        new Token(Type.COMBINED_PERFORMANCE, '25,14', 'DIS'),
        new Token(Type.COMBINED_PERFORMANCE, '27,35', 'SPE'),
        new Token(Type.COMBINED_PERFORMANCE, '7,87', 'GEW'),
        new Token(Type.COMBINED_POINTS, '302', 'HAM'),
        new Token(Type.COMBINED_POINTS, '357', 'KUG'),
        new Token(Type.COMBINED_POINTS, '445', 'DIS'),
        new Token(Type.COMBINED_POINTS, '475', 'SPE'),
        new Token(Type.COMBINED_POINTS, '364', 'GEW'),
        new Token(Type.COMBINED_SUM, '302', 'HAM'),
        new Token(Type.COMBINED_SUM, '659', 'KUG'),
        new Token(Type.COMBINED_SUM, '1.104', 'DIS'),
        new Token(Type.COMBINED_SUM, '1.579', 'SPE'),
        new Token(Type.COMBINED_SUM, '1.943', 'GEW'),
        new Token(Type.DISCIPLINE_NAME, 'Werferfünfkampf'),
        new Token(Type.AGE_GROUP_NAME, 'Seniorinnen W50'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, 'aus gemeinsamen Bewerb'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.PARTICIPANT_COUNT, '3'),
        new Token(Type.ROUND_NAME, 'Finalstand'),
        new Token(Type.COMBINED_DISCIPLINE, 'HAM'),
        new Token(Type.COMBINED_DISCIPLINE, 'KUG'),
        new Token(Type.COMBINED_DISCIPLINE, 'DIS'),
        new Token(Type.COMBINED_DISCIPLINE, 'SPE'),
        new Token(Type.COMBINED_DISCIPLINE, 'GEW'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '5'),
        new Token(Type.ATHLETE_FULL_NAME, 'Reitemeier Karin'),
        new Token(Type.ATHLETE_YOB, '1965'),
        new Token(Type.ATHLETE_CLUB_NAME, 'SSC Vellmar'),
        new Token(Type.PERFORMANCE, '3.159'),
        new Token(Type.COMBINED_PERFORMANCE, '38,25', 'HAM'),
        new Token(Type.COMBINED_PERFORMANCE, '9,28', 'KUG'),
        new Token(Type.COMBINED_PERFORMANCE, '25,41', 'DIS'),
        new Token(Type.COMBINED_PERFORMANCE, '24,63', 'SPE'),
        new Token(Type.COMBINED_PERFORMANCE, '10,49', 'GEW'),
        new Token(Type.COMBINED_POINTS, '871', 'HAM'),
        new Token(Type.COMBINED_POINTS, '641', 'KUG'),
        new Token(Type.COMBINED_POINTS, '526', 'DIS'),
        new Token(Type.COMBINED_POINTS, '481', 'SPE'),
        new Token(Type.COMBINED_POINTS, '640', 'GEW'),
        new Token(Type.COMBINED_SUM, '871', 'HAM'),
        new Token(Type.COMBINED_SUM, '1.512', 'KUG'),
        new Token(Type.COMBINED_SUM, '2.038', 'DIS'),
        new Token(Type.COMBINED_SUM, '2.519', 'SPE'),
        new Token(Type.COMBINED_SUM, '3.159', 'GEW'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '35'),
        new Token(Type.ATHLETE_FULL_NAME, 'Hartmann Susanne'),
        new Token(Type.ATHLETE_YOB, '1965'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LAV Dietzhölztal'),
        new Token(Type.PERFORMANCE, '1.917'),
        new Token(Type.COMBINED_PERFORMANCE, '24,66', 'HAM'),
        new Token(Type.COMBINED_PERFORMANCE, '8,39', 'KUG'),
        new Token(Type.COMBINED_PERFORMANCE, '24,64', 'DIS'),
        new Token(Type.COMBINED_PERFORMANCE, '13,98', 'SPE'),
        new Token(Type.COMBINED_PERFORMANCE, '7,92', 'GEW'),
        new Token(Type.COMBINED_POINTS, '378', 'HAM'),
        new Token(Type.COMBINED_POINTS, '406', 'KUG'),
        new Token(Type.COMBINED_POINTS, '439', 'DIS'),
        new Token(Type.COMBINED_POINTS, '327', 'SPE'),
        new Token(Type.COMBINED_POINTS, '367', 'GEW'),
        new Token(Type.COMBINED_SUM, '378', 'HAM'),
        new Token(Type.COMBINED_SUM, '784', 'KUG'),
        new Token(Type.COMBINED_SUM, '1.223', 'DIS'),
        new Token(Type.COMBINED_SUM, '1.550', 'SPE'),
        new Token(Type.COMBINED_SUM, '1.917', 'GEW'),
        new Token(Type.DISCIPLINE_NAME, 'Werferfünfkampf'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M40'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, 'aus gemeinsamen Bewerb'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.PARTICIPANT_COUNT, '3'),
        new Token(Type.ROUND_NAME, 'Finalstand'),
        new Token(Type.COMBINED_DISCIPLINE, 'HAM'),
        new Token(Type.COMBINED_DISCIPLINE, 'DIS'),
        new Token(Type.COMBINED_DISCIPLINE, 'SPE'),
        new Token(Type.COMBINED_DISCIPLINE, 'KUG'),
        new Token(Type.COMBINED_DISCIPLINE, 'GEW'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '33'),
        new Token(Type.ATHLETE_FULL_NAME, 'Morbitzer Jörg'),
        new Token(Type.ATHLETE_YOB, '1972'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LAV Dietzhölztal'),
        new Token(Type.PERFORMANCE, '2.382'),
        new Token(Type.COMBINED_PERFORMANCE, '33,76', 'HAM'),
        new Token(Type.COMBINED_PERFORMANCE, '26,90', 'DIS'),
        new Token(Type.COMBINED_PERFORMANCE, '31,85', 'SPE'),
        new Token(Type.COMBINED_PERFORMANCE, '10,02', 'KUG'),
        new Token(Type.COMBINED_PERFORMANCE, '8,40', 'GEW'),
        new Token(Type.COMBINED_POINTS, '573', 'HAM'),
        new Token(Type.COMBINED_POINTS, '473', 'DIS'),
        new Token(Type.COMBINED_POINTS, '503', 'SPE'),
        new Token(Type.COMBINED_POINTS, '470', 'KUG'),
        new Token(Type.COMBINED_POINTS, '363', 'GEW'),
        new Token(Type.COMBINED_SUM, '573', 'HAM'),
        new Token(Type.COMBINED_SUM, '1.046', 'DIS'),
        new Token(Type.COMBINED_SUM, '1.549', 'SPE'),
        new Token(Type.COMBINED_SUM, '2.019', 'KUG'),
        new Token(Type.COMBINED_SUM, '2.382', 'GEW'),
        new Token(Type.DISCIPLINE_NAME, 'Werferfünfkampf'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M70'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, 'aus gemeinsamen Bewerb'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.PARTICIPANT_COUNT, '3'),
        new Token(Type.ROUND_NAME, 'Finalstand'),
        new Token(Type.COMBINED_DISCIPLINE, 'HAM'),
        new Token(Type.COMBINED_DISCIPLINE, 'DIS'),
        new Token(Type.COMBINED_DISCIPLINE, 'SPE'),
        new Token(Type.COMBINED_DISCIPLINE, 'KUG'),
        new Token(Type.COMBINED_DISCIPLINE, 'GEW'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '29'),
        new Token(Type.ATHLETE_FULL_NAME, 'Wagner Rudolf'),
        new Token(Type.ATHLETE_YOB, '1946'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TuS Dierdorf'),
        new Token(Type.PERFORMANCE, '2.022'),
        new Token(Type.COMBINED_PERFORMANCE, '25,89', 'HAM'),
        new Token(Type.COMBINED_PERFORMANCE, '21,53', 'DIS'),
        new Token(Type.COMBINED_PERFORMANCE, '13,28', 'SPE'),
        new Token(Type.COMBINED_PERFORMANCE, '7,96', 'KUG'),
        new Token(Type.COMBINED_PERFORMANCE, '9,18', 'GEW'),
        new Token(Type.COMBINED_POINTS, '521', 'HAM'),
        new Token(Type.COMBINED_POINTS, '405', 'DIS'),
        new Token(Type.COMBINED_POINTS, '313', 'SPE'),
        new Token(Type.COMBINED_POINTS, '377', 'KUG'),
        new Token(Type.COMBINED_POINTS, '406', 'GEW'),
        new Token(Type.COMBINED_SUM, '521', 'HAM'),
        new Token(Type.COMBINED_SUM, '926', 'DIS'),
        new Token(Type.COMBINED_SUM, '1.239', 'SPE'),
        new Token(Type.COMBINED_SUM, '1.616', 'KUG'),
        new Token(Type.COMBINED_SUM, '2.022', 'GEW'),
        new Token(Type.DISCIPLINE_NAME, 'Werferfünfkampf'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M75'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, 'aus gemeinsamen Bewerb'),
        new Token(Type.EVENT_DATE, '06.08.2016'),
        new Token(Type.PARTICIPANT_COUNT, '3'),
        new Token(Type.ROUND_NAME, 'Finalstand'),
        new Token(Type.COMBINED_DISCIPLINE, 'HAM'),
        new Token(Type.COMBINED_DISCIPLINE, 'DIS'),
        new Token(Type.COMBINED_DISCIPLINE, 'SPE'),
        new Token(Type.COMBINED_DISCIPLINE, 'KUG'),
        new Token(Type.COMBINED_DISCIPLINE, 'GEW'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '7'),
        new Token(Type.ATHLETE_FULL_NAME, 'Willershäuser Arno'),
        new Token(Type.ATHLETE_YOB, '1939'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LG Wettenberg'),
        new Token(Type.PERFORMANCE, '2.631'),
        new Token(Type.COMBINED_PERFORMANCE, '34,18', 'HAM'),
        new Token(Type.COMBINED_PERFORMANCE, '32,13', 'DIS'),
        new Token(Type.COMBINED_PERFORMANCE, '21,36', 'SPE'),
        new Token(Type.COMBINED_PERFORMANCE, '9,19', 'KUG'),
        new Token(Type.COMBINED_PERFORMANCE, '14,09', 'GEW'),
        new Token(Type.COMBINED_POINTS, '575', 'HAM'),
        new Token(Type.COMBINED_POINTS, '533', 'DIS'),
        new Token(Type.COMBINED_POINTS, '406', 'SPE'),
        new Token(Type.COMBINED_POINTS, '434', 'KUG'),
        new Token(Type.COMBINED_POINTS, '683', 'GEW'),
        new Token(Type.COMBINED_SUM, '575', 'HAM'),
        new Token(Type.COMBINED_SUM, '1.108', 'DIS'),
        new Token(Type.COMBINED_SUM, '1.514', 'SPE'),
        new Token(Type.COMBINED_SUM, '1.948', 'KUG'),
        new Token(Type.COMBINED_SUM, '2.631', 'GEW'),
        new Token(Type.END, undefined),
      ]);
      done();
    }).catch((e) => {
      done(e);
    });
  });
});
