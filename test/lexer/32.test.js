import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import pdf from 'oadf-pdf-converter';
import Lexer from '../../src/Lexer';
import Token, { TYPES as Type } from '../../src/Token';

describe('SELTEC 3 PDF Lexer 32.pdf', () => {
  it('should create the correct tokens', (done) => {
    const filePath = path.join(process.cwd(), 'test/lexer/fixtures/32.pdf');
    const data = new Uint8Array(fs.readFileSync(filePath));
    pdf(data).then((pages) => {
      const tokens = Lexer(pages);
      expect(tokens).to.deep.equal([
        new Token(Type.COMPETITION_NAME, 'MTG Mannheim Vereinsmeisterschaften 2016'),
        new Token(Type.COMPETITION_CITY, 'Mannheim'),
        new Token(Type.COMPETITION_VENUE, 'Michael-Hoffmann-Stadion'),
        new Token(Type.COMPETITION_START_DATE, '03.10.2016'),
        new Token(Type.DISCIPLINE_NAME, '100m (DMT)'),
        new Token(Type.AGE_GROUP_NAME, 'Männer'),
        new Token(Type.EVENT_DATE, '03.10.2016'),
        new Token(Type.EVENT_TIME, '10:30'),
        new Token(Type.ROUND_NAME, 'Team DM'),
        new Token(Type.WIND, 'I:+1,1'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '62'),
        new Token(Type.ATHLETE_FULL_NAME, 'Spissinger Yannick'),
        new Token(Type.ATHLETE_YOB, '1995'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '11,22'),
        new Token(Type.GROUP_NUMBER_PLACE, '1./I'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '33'),
        new Token(Type.ATHLETE_FULL_NAME, 'Ganter Robin'),
        new Token(Type.ATHLETE_YOB, '2001'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '11,90'),
        new Token(Type.GROUP_NUMBER_PLACE, '2./I'),
        new Token(Type.ATHLETE_POSITION, '3'),
        new Token(Type.ATHLETE_BIB, '35'),
        new Token(Type.ATHLETE_FULL_NAME, 'Grau Luca'),
        new Token(Type.ATHLETE_YOB, '2000'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '11,98'),
        new Token(Type.GROUP_NUMBER_PLACE, '3./I'),
        new Token(Type.ATHLETE_POSITION, '4'),
        new Token(Type.ATHLETE_BIB, '34'),
        new Token(Type.ATHLETE_FULL_NAME, 'Graf Michael'),
        new Token(Type.ATHLETE_YOB, '1999'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '12,41'),
        new Token(Type.GROUP_NUMBER_PLACE, '4./I'),
        new Token(Type.ATHLETE_POSITION, '5'),
        new Token(Type.ATHLETE_BIB, '25'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bernhardt Julian'),
        new Token(Type.ATHLETE_YOB, '2001'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '12,65'),
        new Token(Type.GROUP_NUMBER_PLACE, '5./I'),
        new Token(Type.ATHLETE_POSITION, '6'),
        new Token(Type.ATHLETE_BIB, '146'),
        new Token(Type.ATHLETE_FULL_NAME, 'Hepperle Wolfgang'),
        new Token(Type.ATHLETE_YOB, '1966'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LG Neckar-Enz'),
        new Token(Type.PERFORMANCE, '13,35'),
        new Token(Type.GROUP_NUMBER_PLACE, '6./I'),
        new Token(Type.DISCIPLINE_NAME, '400m (DMT)'),
        new Token(Type.AGE_GROUP_NAME, 'Männer'),
        new Token(Type.EVENT_DATE, '03.10.2016'),
        new Token(Type.EVENT_TIME, '12:00'),
        new Token(Type.ROUND_NAME, 'Team DM'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '61'),
        new Token(Type.ATHLETE_FULL_NAME, 'Schuh Alexander'),
        new Token(Type.ATHLETE_YOB, '1996'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '53,56'),
        new Token(Type.GROUP_NUMBER_PLACE, '1./I'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '33'),
        new Token(Type.ATHLETE_FULL_NAME, 'Ganter Robin'),
        new Token(Type.ATHLETE_YOB, '2001'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '54,39'),
        new Token(Type.GROUP_NUMBER_PLACE, '2./I'),
        new Token(Type.ATHLETE_POSITION, '3'),
        new Token(Type.ATHLETE_BIB, '35'),
        new Token(Type.ATHLETE_FULL_NAME, 'Grau Luca'),
        new Token(Type.ATHLETE_YOB, '2000'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '54,70'),
        new Token(Type.GROUP_NUMBER_PLACE, '3./I'),
        new Token(Type.ATHLETE_POSITION, '4'),
        new Token(Type.ATHLETE_BIB, '25'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bernhardt Julian'),
        new Token(Type.ATHLETE_YOB, '2001'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '58,24'),
        new Token(Type.GROUP_NUMBER_PLACE, '4./I'),
        new Token(Type.DISCIPLINE_NAME, '1500m (DMT)'),
        new Token(Type.AGE_GROUP_NAME, 'Männer'),
        new Token(Type.EVENT_DATE, '03.10.2016'),
        new Token(Type.EVENT_TIME, '17:00'),
        new Token(Type.ROUND_NAME, 'Team DM'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '26'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bernhardt Simon'),
        new Token(Type.ATHLETE_YOB, '1999'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '4:53,54'),
        new Token(Type.GROUP_NUMBER_PLACE, '1./I'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '25'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bernhardt Julian'),
        new Token(Type.ATHLETE_YOB, '2001'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '5:00,92'),
        new Token(Type.GROUP_NUMBER_PLACE, '1./II'),
        new Token(Type.ATHLETE_POSITION, '3'),
        new Token(Type.ATHLETE_BIB, '43'),
        new Token(Type.ATHLETE_FULL_NAME, 'Kriesamer Jonas'),
        new Token(Type.ATHLETE_YOB, '1995'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '5:13,27'),
        new Token(Type.GROUP_NUMBER_PLACE, '2./II'),
        new Token(Type.ATHLETE_POSITION, '4'),
        new Token(Type.ATHLETE_BIB, '51'),
        new Token(Type.ATHLETE_FULL_NAME, 'Otchere Colin'),
        new Token(Type.ATHLETE_YOB, '1994'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '5:14,98'),
        new Token(Type.GROUP_NUMBER_PLACE, '2./I'),
        new Token(Type.ATHLETE_POSITION, '5'),
        new Token(Type.ATHLETE_BIB, '58'),
        new Token(Type.ATHLETE_FULL_NAME, 'Rupp Alexander'),
        new Token(Type.ATHLETE_YOB, '1989'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '5:26,35'),
        new Token(Type.GROUP_NUMBER_PLACE, '3./I'),
        new Token(Type.ATHLETE_POSITION, '6'),
        new Token(Type.ATHLETE_BIB, '29'),
        new Token(Type.ATHLETE_FULL_NAME, 'Domogala Patrick'),
        new Token(Type.ATHLETE_YOB, '1993'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '5:26,52'),
        new Token(Type.GROUP_NUMBER_PLACE, '4./I'),
        new Token(Type.ATHLETE_POSITION, '7'),
        new Token(Type.ATHLETE_BIB, '62'),
        new Token(Type.ATHLETE_FULL_NAME, 'Spissinger Yannick'),
        new Token(Type.ATHLETE_YOB, '1995'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '5:41,67'),
        new Token(Type.GROUP_NUMBER_PLACE, '5./I'),
        new Token(Type.ATHLETE_BIB, '61'),
        new Token(Type.ATHLETE_FULL_NAME, 'Schuh Alexander'),
        new Token(Type.ATHLETE_YOB, '1996'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, 'aufg.'),
        new Token(Type.ATHLETE_BIB, '60'),
        new Token(Type.ATHLETE_FULL_NAME, 'Schmunk Rudi'),
        new Token(Type.ATHLETE_YOB, '1994'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, 'abg.'),
        new Token(Type.ATHLETE_BIB, '38'),
        new Token(Type.ATHLETE_FULL_NAME, 'Hoecker Yannick'),
        new Token(Type.ATHLETE_YOB, '1992'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, 'abg.'),
        new Token(Type.ATHLETE_BIB, '35'),
        new Token(Type.ATHLETE_FULL_NAME, 'Grau Luca'),
        new Token(Type.ATHLETE_YOB, '2000'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, 'abg.'),
        new Token(Type.ATHLETE_BIB, '34'),
        new Token(Type.ATHLETE_FULL_NAME, 'Graf Michael'),
        new Token(Type.ATHLETE_YOB, '1999'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, 'abg.'),
        new Token(Type.ATHLETE_BIB, '24'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bayerl Andreas'),
        new Token(Type.ATHLETE_YOB, '1993'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, 'abg.'),
        new Token(Type.ATHLETE_BIB, '47'),
        new Token(Type.ATHLETE_FULL_NAME, 'Manke-Reimers Fabian'),
        new Token(Type.ATHLETE_YOB, '1995'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, 'n.a.'),
        new Token(Type.ATHLETE_BIB, '33'),
        new Token(Type.ATHLETE_FULL_NAME, 'Ganter Robin'),
        new Token(Type.ATHLETE_YOB, '2001'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, 'n.a.'),
        new Token(Type.ATHLETE_BIB, '37'),
        new Token(Type.ATHLETE_FULL_NAME, 'Herdt Dennis'),
        new Token(Type.ATHLETE_YOB, '1993'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, 'n.a.'),
        new Token(Type.SPLIT_GROUP, '1'),
        new Token(Type.SPLIT_DISTANCE, '400 m'),
        new Token(Type.SPLIT_TIME, '1:09,56'),
        new Token(Type.ATHLETE_BIB, '26'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bernhardt Simon'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.SPLIT_DISTANCE, '800 m'),
        new Token(Type.SPLIT_TIME, '2:42,24'),
        new Token(Type.ATHLETE_BIB, '26'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bernhardt Simon'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.SPLIT_DISTANCE, '1200 m'),
        new Token(Type.SPLIT_TIME, '4:02,48'),
        new Token(Type.ATHLETE_BIB, '26'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bernhardt Simon'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.END),
      ]);
      done();
    }).catch((e) => {
      done(e);
    });
  });
});