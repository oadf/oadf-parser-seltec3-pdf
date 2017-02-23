import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import pdf from 'oadf-pdf-converter';
import Lexer from '../../src/Lexer';
import Token, { TYPES as Type } from '../../src/Token';

describe('SELTEC 3 PDF Lexer 30.pdf', () => {
  it('should create the correct tokens', (done) => {
    const filePath = path.join(process.cwd(), 'test/lexer/fixtures/30.pdf');
    const data = new Uint8Array(fs.readFileSync(filePath));
    pdf(data).then((pages) => {
      const tokens = Lexer(pages);
      expect(tokens).to.deep.equal([
        new Token(Type.COMPETITION_NAME, 'Hessische Seniorenmeisterschaften Halle'),
        new Token(Type.COMPETITION_CITY, 'Stadtallendorf'),
        new Token(Type.COMPETITION_VENUE, 'Herrenwaldhalle'),
        new Token(Type.COMPETITION_START_DATE, '12.02.2017'),
        new Token(Type.DISCIPLINE_NAME, '4x1Runde'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M60'),
        new Token(Type.EVENT_DATE, '12.02.2017'),
        new Token(Type.EVENT_TIME, '15:35'),
        new Token(Type.ROUND_NAME, 'Zeitläufe'),
        new Token(Type.TEAM_POSITION, '1 (1)'),
        new Token(Type.TEAM_NAME, 'TSG Wehrheim'),
        new Token(Type.TEAM_COUNTRY, 'GER'),
        new Token(Type.TEAM_CLUB_NAME, 'TSG Wehrheim'),
        new Token(Type.PERFORMANCE, '2:01,04'),
        new Token(Type.GROUP_NUMBER_PLACE, '1./I'),
        new Token(Type.ATHLETE_BIB, '258'),
        new Token(Type.ATHLETE_FULL_NAME, 'Meyer Franz-Josef'),
        new Token(Type.ATHLETE_YOB, '1956'),
        new Token(Type.ATHLETE_BIB, '257'),
        new Token(Type.ATHLETE_FULL_NAME, 'Dressler Peter'),
        new Token(Type.ATHLETE_YOB, '1955'),
        new Token(Type.ATHLETE_BIB, '259'),
        new Token(Type.ATHLETE_FULL_NAME, 'Niklas Eberhard'),
        new Token(Type.ATHLETE_YOB, '1954'),
        new Token(Type.ATHLETE_BIB, '256'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bartsch Ulrich'),
        new Token(Type.ATHLETE_YOB, '1957'),
        new Token(Type.TEAM_POSITION, '2 (2)'),
        new Token(Type.TEAM_NAME, 'LG Biebesheim/Eschollbrücken/Crumstadt'),
        new Token(Type.TEAM_COUNTRY, 'GER'),
        new Token(Type.TEAM_CLUB_NAME, 'LG Biebesheim/Eschollbrücken/Crumstadt'),
        new Token(Type.PERFORMANCE, '2:12,00'),
        new Token(Type.GROUP_NUMBER_PLACE, '2./I'),
        new Token(Type.ATHLETE_BIB, '39'),
        new Token(Type.ATHLETE_FULL_NAME, 'Zeisse Lutz'),
        new Token(Type.ATHLETE_YOB, '1948'),
        new Token(Type.ATHLETE_BIB, '40'),
        new Token(Type.ATHLETE_FULL_NAME, 'Leitsch Hans-Joachim'),
        new Token(Type.ATHLETE_YOB, '1943'),
        new Token(Type.ATHLETE_BIB, '32'),
        new Token(Type.ATHLETE_FULL_NAME, 'Büchsel Helmut'),
        new Token(Type.ATHLETE_YOB, '1953'),
        new Token(Type.ATHLETE_BIB, '37'),
        new Token(Type.ATHLETE_FULL_NAME, 'Elsner Roland'),
        new Token(Type.ATHLETE_YOB, '1942'),
        new Token(Type.DISCIPLINE_NAME, 'Hochsprung'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M60'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '12.02.2017'),
        new Token(Type.EVENT_TIME, '11:30'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '86'),
        new Token(Type.ATHLETE_FULL_NAME, 'Köhl Dieter'),
        new Token(Type.ATHLETE_YOB, '1954'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TV Flieden'),
        new Token(Type.PERFORMANCE, '1,60'),
        new Token(Type.HEIGHT, '1,00'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,05'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,10'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,15'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,18'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,21'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,24'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,27'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,30'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,33'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,36'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '1,39'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '1,42'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '1,45'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '1,48'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '1,51'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '1,54'),
        new Token(Type.HEIGHT_RESULT, 'XO'),
        new Token(Type.HEIGHT, '1,57'),
        new Token(Type.HEIGHT_RESULT, 'XO'),
        new Token(Type.HEIGHT, '1,60'),
        new Token(Type.HEIGHT_RESULT, 'XO'),
        new Token(Type.HEIGHT, '1,63'),
        new Token(Type.HEIGHT_RESULT, 'XXX'),
        new Token(Type.DISCIPLINE_NAME, 'Stabhochsprung'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M60'),
        new Token(Type.GROUP_NUMBER, '1'),
        new Token(Type.EVENT_DATE, '12.02.2017'),
        new Token(Type.EVENT_TIME, '10:00'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '276'),
        new Token(Type.ATHLETE_FULL_NAME, 'Nucklies Rolf'),
        new Token(Type.ATHLETE_YOB, '1954'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TuS Eintracht Wiesbaden'),
        new Token(Type.PERFORMANCE, '3,45'),
        new Token(Type.HEIGHT, '2,00'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '2,10'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '2,20'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '2,30'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '2,40'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '2,50'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '2,60'),
        new Token(Type.HEIGHT_RESULT, '-'),
        new Token(Type.HEIGHT, '3,30'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '3,45'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '3,55'),
        new Token(Type.HEIGHT_RESULT, 'XXX'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '263'),
        new Token(Type.ATHLETE_FULL_NAME, 'Bartkowski Gerhard'),
        new Token(Type.ATHLETE_YOB, '1957'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LG Wettenberg'),
        new Token(Type.PERFORMANCE, '2,50'),
        new Token(Type.HEIGHT, '2,00'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '2,10'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '2,20'),
        new Token(Type.HEIGHT_RESULT, 'XO'),
        new Token(Type.HEIGHT, '2,30'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '2,40'),
        new Token(Type.HEIGHT_RESULT, 'XO'),
        new Token(Type.HEIGHT, '2,50'),
        new Token(Type.HEIGHT_RESULT, 'O'),
        new Token(Type.HEIGHT, '2,60'),
        new Token(Type.HEIGHT_RESULT, 'XXX'),
        new Token(Type.DISCIPLINE_NAME, 'Weitsprung'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M60'),
        new Token(Type.EVENT_DATE, '12.02.2017'),
        new Token(Type.EVENT_TIME, '11:50'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '204'),
        new Token(Type.ATHLETE_FULL_NAME, 'Arnreich Georg'),
        new Token(Type.ATHLETE_YOB, '1955'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TV Jahn Neuhof'),
        new Token(Type.PERFORMANCE, '4,82'),
        new Token(Type.ATTEMPT1, '4,43'),
        new Token(Type.ATTEMPT2, '4,73'),
        new Token(Type.ATTEMPT3, '4,82'),
        new Token(Type.ATTEMPT4, '4,64'),
        new Token(Type.ATTEMPT5, 'x'),
        new Token(Type.ATTEMPT6, '4,43'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '278'),
        new Token(Type.ATHLETE_FULL_NAME, 'Höner Thomas'),
        new Token(Type.ATHLETE_YOB, '1954'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TuS Eintracht Wiesbaden'),
        new Token(Type.PERFORMANCE, '4,51'),
        new Token(Type.ATTEMPT1, '4,49'),
        new Token(Type.ATTEMPT2, '4,39'),
        new Token(Type.ATTEMPT3, '4,51'),
        new Token(Type.ATTEMPT4, 'x'),
        new Token(Type.ATTEMPT5, 'x'),
        new Token(Type.ATTEMPT6, '4,32'),
        new Token(Type.ATHLETE_POSITION, '3'),
        new Token(Type.ATHLETE_BIB, '32'),
        new Token(Type.ATHLETE_FULL_NAME, 'Büchsel Helmut'),
        new Token(Type.ATHLETE_YOB, '1953'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LG Biebesheim/Eschollbrücken/Crumstadt'),
        new Token(Type.PERFORMANCE, '3,63'),
        new Token(Type.ATTEMPT1, '3,34'),
        new Token(Type.ATTEMPT2, '3,58'),
        new Token(Type.ATTEMPT3, '3,50'),
        new Token(Type.ATTEMPT4, '3,52'),
        new Token(Type.ATTEMPT5, '3,55'),
        new Token(Type.ATTEMPT6, '3,63'),
        new Token(Type.DISCIPLINE_NAME, 'Kugelstoß'),
        new Token(Type.AGE_GROUP_NAME, 'Senioren M60'),
        new Token(Type.EVENT_DATE, '12.02.2017'),
        new Token(Type.EVENT_TIME, '10:45'),
        new Token(Type.ATHLETE_POSITION, '1'),
        new Token(Type.ATHLETE_BIB, '278'),
        new Token(Type.ATHLETE_FULL_NAME, 'Höner Thomas'),
        new Token(Type.ATHLETE_YOB, '1954'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TuS Eintracht Wiesbaden'),
        new Token(Type.PERFORMANCE, '11,86'),
        new Token(Type.ATTEMPT1, '11,86'),
        new Token(Type.ATTEMPT2, '-'),
        new Token(Type.ATTEMPT3, 'x'),
        new Token(Type.ATTEMPT4, 'x'),
        new Token(Type.ATTEMPT5, 'x'),
        new Token(Type.ATTEMPT6, '11,59'),
        new Token(Type.ATHLETE_POSITION, '2'),
        new Token(Type.ATHLETE_BIB, '175'),
        new Token(Type.ATHLETE_FULL_NAME, 'Kiel Eckard'),
        new Token(Type.ATHLETE_YOB, '1954'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'TSV 1850/09 Korbach'),
        new Token(Type.PERFORMANCE, '11,68'),
        new Token(Type.ATTEMPT1, '11,68'),
        new Token(Type.ATTEMPT2, '11,36'),
        new Token(Type.ATTEMPT3, 'x'),
        new Token(Type.ATTEMPT4, 'x'),
        new Token(Type.ATTEMPT5, '11,38'),
        new Token(Type.ATTEMPT6, '11,38'),
        new Token(Type.ATHLETE_POSITION, '3'),
        new Token(Type.ATHLETE_BIB, '47'),
        new Token(Type.ATHLETE_FULL_NAME, 'Dundik Aleksander'),
        new Token(Type.ATHLETE_YOB, '1957'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'LG Biebesheim/Eschollbrücken/Crumstadt'),
        new Token(Type.PERFORMANCE, '11,60'),
        new Token(Type.ATTEMPT1, '11,59'),
        new Token(Type.ATTEMPT2, '11,60'),
        new Token(Type.ATTEMPT3, '11,24'),
        new Token(Type.ATTEMPT4, '11,31'),
        new Token(Type.ATTEMPT5, 'x'),
        new Token(Type.ATTEMPT6, '11,32'),
        new Token(Type.ATHLETE_POSITION, '4'),
        new Token(Type.ATHLETE_BIB, '218'),
        new Token(Type.ATHLETE_FULL_NAME, 'Henkel Heinz-Dieter'),
        new Token(Type.ATHLETE_YOB, '1954'),
        new Token(Type.ATHLETE_COUNTRY, 'GER'),
        new Token(Type.ATHLETE_CLUB_NAME, 'ASV Rauschenberg'),
        new Token(Type.PERFORMANCE, '9,82'),
        new Token(Type.ATTEMPT1, '9,67'),
        new Token(Type.ATTEMPT2, '9,82'),
        new Token(Type.ATTEMPT3, 'x'),
        new Token(Type.ATTEMPT4, 'x'),
        new Token(Type.ATTEMPT5, '9,73'),
        new Token(Type.ATTEMPT6, 'x'),
        new Token(Type.END),
      ]);
      done();
    }).catch((e) => {
      done(e);
    });
  });
});