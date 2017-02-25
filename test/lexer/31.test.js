import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import pdf from 'oadf-pdf-converter';
import Lexer from '../../src/Lexer';
import Token, { TYPES as Type } from '../../src/Token';

describe('SELTEC 3 PDF Lexer 31.pdf', () => {
  it('should create the correct tokens', (done) => {
    const filePath = path.join(process.cwd(), 'test/lexer/fixtures/31.pdf');
    const data = new Uint8Array(fs.readFileSync(filePath));
    pdf(data).then((pages) => {
      const tokens = Lexer(pages);
      expect(tokens).to.deep.equal([
        new Token(Type.COMPETITION_NAME, 'MTG Mannheim Vereinsmeisterschaften 2016'),
        new Token(Type.COMPETITION_CITY, 'Mannheim'),
        new Token(Type.COMPETITION_VENUE, 'Michael-Hoffmann-Stadion'),
        new Token(Type.COMPETITION_START_DATE, '03.10.2016'),
        new Token(Type.DISCIPLINE_NAME, 'Kugelstoß'),
        new Token(Type.AGE_GROUP_NAME, 'Jugend M12'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '3000g'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '03.10.2016'),
        new Token(Type.EVENT_TIME, '13:30'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '14'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bürger Johannes'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSG 78 Heidelberg'),
        new Token(Type.PERFORMANCE, '7,51'),
        new Token(Type.ATTEMPT1, '7,35'),
        new Token(Type.ATTEMPT2, '7,29'),
        new Token(Type.ATTEMPT3, '7,51'),
        new Token(Type.ATTEMPT4, '7,10'),
        new Token(Type.ATTEMPT5, '6,38'),
        new Token(Type.ATTEMPT6, '5,80'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '18'),
        new Token(Type.ATHLETE_FULL_NAME, 'Schmidt Matteo'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSG 78 Heidelberg'),
        new Token(Type.PERFORMANCE, '6,90'),
        new Token(Type.ATTEMPT1, '6,90'),
        new Token(Type.ATTEMPT2, '6,13'),
        new Token(Type.ATTEMPT3, '5,99'),
        new Token(Type.ATTEMPT4, '5,67'),
        new Token(Type.ATTEMPT5, '6,79'),
        new Token(Type.ATTEMPT6, '6,29'),
        new Token(Type.ATHLETE_POSITION, '3'),
        new Token(Type.ATHLETE_BIB, '15'),
        new Token(Type.ATHLETE_FULL_NAME, 'Gresset-Bourgeois Matteo'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSG 78 Heidelberg'),
        new Token(Type.PERFORMANCE, '5,90'),
        new Token(Type.ATTEMPT1, '5,70'),
        new Token(Type.ATTEMPT2, '5,90'),
        new Token(Type.ATTEMPT3, '5,64'),
        new Token(Type.ATTEMPT4, '5,43'),
        new Token(Type.ATTEMPT5, '5,90'),
        new Token(Type.ATTEMPT6, '5,74'),
        new Token(Type.DISCIPLINE_NAME, 'Diskuswurf'),
        new Token(Type.AGE_GROUP_NAME, 'Jugend M12'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '750g'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '03.10.2016'),
        new Token(Type.EVENT_TIME, '12:05'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '36'),
        new Token(Type.ATHLETE_FULL_NAME, 'Heid Nicola'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '25,03'),
        new Token(Type.ATTEMPT1, '17,28'),
        new Token(Type.ATTEMPT2, '22,53'),
        new Token(Type.ATTEMPT3, '23,26'),
        new Token(Type.ATTEMPT4, '23,08'),
        new Token(Type.ATTEMPT5, '22,46'),
        new Token(Type.ATTEMPT6, '25,03'),
        new Token(Type.DISCIPLINE_NAME, 'Speerwurf'),
        new Token(Type.AGE_GROUP_NAME, 'Jugend M12'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '400g'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '03.10.2016'),
        new Token(Type.EVENT_TIME, '12:45'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '36'),
        new Token(Type.ATHLETE_FULL_NAME, 'Heid Nicola'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '29,74'),
        new Token(Type.COMMENT, '4. V, Ersatzversuch nach IWR 180.17'),
        new Token(Type.ATTEMPT1, '28,66'),
        new Token(Type.ATTEMPT2, '29,05'),
        new Token(Type.ATTEMPT3, '29,74'),
        new Token(Type.ATTEMPT4, '27,35'),
        new Token(Type.ATTEMPT5, '29,34'),
        new Token(Type.ATTEMPT6, 'x'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '14'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bürger Johannes'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSG 78 Heidelberg'),
        new Token(Type.PERFORMANCE, '24,78'),
        new Token(Type.ATTEMPT1, '19,99'),
        new Token(Type.ATTEMPT2, '21,43'),
        new Token(Type.ATTEMPT3, '24,78'),
        new Token(Type.ATTEMPT4, 'x'),
        new Token(Type.ATTEMPT5, '23,18'),
        new Token(Type.ATTEMPT6, '23,32'),
        new Token(Type.ATHLETE_POSITION, '3'),
        new Token(Type.ATHLETE_BIB, '18'),
        new Token(Type.ATHLETE_FULL_NAME, 'Schmidt Matteo'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSG 78 Heidelberg'),
        new Token(Type.PERFORMANCE, '17,08'),
        new Token(Type.ATTEMPT1, '17,06'),
        new Token(Type.ATTEMPT2, '13,68'),
        new Token(Type.ATTEMPT3, '12,68'),
        new Token(Type.ATTEMPT4, '15,95'),
        new Token(Type.ATTEMPT5, '17,08'),
        new Token(Type.ATTEMPT6, '15,55'),
        new Token(Type.DISCIPLINE_NAME, 'Ballwurf'),
        new Token(Type.AGE_GROUP_NAME, 'Jugend M12'),
        new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '200g'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '03.10.2016'),
        new Token(Type.EVENT_TIME, '11:15'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '14'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bürger Johannes'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSG 78 Heidelberg'),
        new Token(Type.PERFORMANCE, '37,50'),
        new Token(Type.ATTEMPT1, '30,00'),
        new Token(Type.ATTEMPT2, '34,50'),
        new Token(Type.ATTEMPT3, '37,50'),
        new Token(Type.ATTEMPT4, '-'),
        new Token(Type.ATTEMPT5, '-'),
        new Token(Type.ATTEMPT6, '-'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '18'),
        new Token(Type.ATHLETE_FULL_NAME, 'Schmidt Matteo'),
        new Token(Type.ATHLETE_YOB, '2004'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSG 78 Heidelberg'),
        new Token(Type.PERFORMANCE, '33,50'),
        new Token(Type.ATTEMPT1, '29,00'),
        new Token(Type.ATTEMPT2, '31,00'),
        new Token(Type.ATTEMPT3, '33,50'),
        new Token(Type.ATTEMPT4, '-'),
        new Token(Type.ATTEMPT5, '-'),
        new Token(Type.ATTEMPT6, '-'),
        new Token(Type.DISCIPLINE_NAME, '75m'),
        new Token(Type.AGE_GROUP_NAME, 'Jugend W13'),
        new Token(Type.EVENT_DATE, '03.10.2016'),
        new Token(Type.EVENT_TIME, '11:30'),
        new Token(Type.ROUND_NAME, 'Zeitläufe'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '142'),
        new Token(Type.ATHLETE_FULL_NAME, 'Kammerschmitt Sina'),
        new Token(Type.ATHLETE_YOB, '2003'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TG Worms'),
        new Token(Type.PERFORMANCE, '9,99'),
        new Token(Type.GROUP_NUMBER_PLACE, '1./II'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '65'),
        new Token(Type.ATHLETE_FULL_NAME, 'Borne Shirlene'),
        new Token(Type.ATHLETE_YOB, '2003'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '10,39'),
        new Token(Type.GROUP_NUMBER_PLACE, '2./II'),
        new Token(Type.ATHLETE_POSITION, '3'),
        new Token(Type.ATHLETE_BIB, '144'),
        new Token(Type.ATHLETE_FULL_NAME, 'Stohner Elena'),
        new Token(Type.ATHLETE_YOB, '2003'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TG Worms'),
        new Token(Type.PERFORMANCE, '10,46'),
        new Token(Type.GROUP_NUMBER_PLACE, '3./II'),
        new Token(Type.ATHLETE_POSITION, '4'),
        new Token(Type.ATHLETE_BIB, '74'),
        new Token(Type.ATHLETE_FULL_NAME, 'Domogala Victoria'),
        new Token(Type.ATHLETE_YOB, '2003'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '10,56'),
        new Token(Type.GROUP_NUMBER_PLACE, '4./II'),
        new Token(Type.ATHLETE_POSITION, '5'),
        new Token(Type.ATHLETE_BIB, '127'),
        new Token(Type.ATHLETE_FULL_NAME, 'Boehl Julia'),
        new Token(Type.ATHLETE_YOB, '2003'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LG Neckargemünd'),
        new Token(Type.PERFORMANCE, '10,73'),
        new Token(Type.GROUP_NUMBER_PLACE, '1./I'),
        new Token(Type.ATHLETE_POSITION, '6'),
        new Token(Type.ATHLETE_BIB, '109'),
        new Token(Type.ATHLETE_FULL_NAME, 'Winke Michelle'),
        new Token(Type.ATHLETE_YOB, '2003'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '10,77'),
        new Token(Type.GROUP_NUMBER_PLACE, '2./I'),
        new Token(Type.ATHLETE_POSITION, '7'),
        new Token(Type.ATHLETE_BIB, '88'),
        new Token(Type.ATHLETE_FULL_NAME, 'Oladejo Fehintola'),
        new Token(Type.ATHLETE_YOB, '2003'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '10,85'),
        new Token(Type.GROUP_NUMBER_PLACE, '3./I'),
        new Token(Type.ATHLETE_POSITION, '8'),
        new Token(Type.ATHLETE_BIB, '75'),
        new Token(Type.ATHLETE_FULL_NAME, 'Ganter Janina'),
        new Token(Type.ATHLETE_YOB, '2003'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, '11,82'),
        new Token(Type.GROUP_NUMBER_PLACE, '4./I'),
        new Token(Type.ATHLETE_BIB, '103'),
        new Token(Type.ATHLETE_FULL_NAME, 'Wedel Selma'),
        new Token(Type.ATHLETE_YOB, '2003'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'MTG Mannheim'),
        new Token(Type.PERFORMANCE, 'abg.'),
        new Token(Type.END),
      ]);
      done();
    }).catch((e) => {
      done(e);
    });
  });
});
