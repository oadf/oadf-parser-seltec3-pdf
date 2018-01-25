import converter from 'roma-convertor/src/index';
import OADFStore from 'oadf-js-store';
import { TYPES as TokenType } from './Token';

export default class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.lookahead = tokens[0];
    this.store = new OADFStore();
  }

  parse() {
    this.meeting();

    /* istanbul ignore next */
    if (this.lookahead.type !== TokenType.END) {
      throw new Error(`Unexpected symbol ${JSON.stringify(this.lookahead)} found. Expected END`);
    }

    return this.store;
  }

  meeting() {
    const name = this.expression(TokenType.COMPETITION_NAME);
    const city = this.expression(TokenType.COMPETITION_CITY);
    const venueName = this.expression(TokenType.COMPETITION_VENUE);
    const startDate = this.expression(TokenType.COMPETITION_START_DATE);

    // Add data to store
    if (!this.store.getMeetingById(1)) {
      const venue = this.store.addVenue(venueName, city);
      this.meetingId = this.store.addMeeting(name, venue, startDate);
    }

    while (this.lookahead.type === TokenType.DISCIPLINE_NAME) {
      this.event();
    }
  }
  
  eventWind() {
	  const winds = [];
	  if (this.lookahead.type === TokenType.WIND) {
	    	
		  const windInfo = this.expression(TokenType.WIND);
	      let groupWindInfo;
	      let wind;
	      let roundNumber;
	      let ready = false;
	      
	      const pattern = new RegExp('([IVX]{1,}):([+-]?[0-9],[0-9])', 'g');
	      while ((groupWindInfo = pattern.exec(windInfo)) !== null) {
	    	ready = true;
	        roundNumber = converter.deParse(groupWindInfo[1]);
	        wind = Parser.processWind(groupWindInfo[2]);
	        winds.push({
	          roundNumber,
	          wind,
	        });
	      }
	      
	      if (!ready) {
	    	  const pattern2 = new RegExp('([+-]?[0-9],[0-9])', 'g');
		      while ((groupWindInfo = pattern2.exec(windInfo)) !== null) {
		    	roundNumber = 1;
		        wind = Parser.processWind(groupWindInfo[1]);
		        winds.push({ 
		          roundNumber, 
		          wind, 
		        });
		        
		      } 
	      }
	      
	  }
	  return winds;
  }

  event() {
    const disciplineName = this.expression(TokenType.DISCIPLINE_NAME);
    const ageGroupName = this.expression(TokenType.AGE_GROUP_NAME);

    let height;
    let weight;
    let date;
    let time;
    let winds = [];
    
    if (this.lookahead.type === TokenType.DISCIPLINE_ADDITIONAL_INFO) {
      const additionalInfo = this.expression(TokenType.DISCIPLINE_ADDITIONAL_INFO);
      if (additionalInfo.endsWith('mm')) {
        height = parseInt(additionalInfo, 10);
      } else if (additionalInfo.endsWith('g')) {
        weight = parseInt(additionalInfo, 10);
      }
    }

    //groupNumber
    let groupNumber;
    if (this.lookahead.type === TokenType.GROUP_NUMBER) {
      groupNumber = this.expression(TokenType.GROUP_NUMBER);
    }
    
    //wind
    if (this.lookahead.type === TokenType.WIND) {
    	winds = this.eventWind();
    }  
    
    //date
    if (this.lookahead.type === TokenType.EVENT_DATE) {
    	date = this.expression(TokenType.EVENT_DATE);
    }
    
    //time
    if (this.lookahead.type === TokenType.EVENT_TIME) {
	    time = this.expression(TokenType.EVENT_TIME);
	}
    
    //groupNumber
    if (this.lookahead.type === TokenType.GROUP_NUMBER) {
      groupNumber = this.expression(TokenType.GROUP_NUMBER);
    }
    
    //participant count
    if (this.lookahead.type === TokenType.PARTICIPANT_COUNT) {
      this.expression(TokenType.PARTICIPANT_COUNT);
    }
    
    //roundName
    let roundName = 'Finale';
    if (this.lookahead.type === TokenType.ROUND_NAME) {
      roundName = this.expression(TokenType.ROUND_NAME);
    }
    
    //wind
    if (this.lookahead.type === TokenType.WIND) {
    	winds = this.eventWind();
    }
    
    //date
    if (this.lookahead.type === TokenType.EVENT_DATE) {
    	date = this.expression(TokenType.EVENT_DATE);
    }
    
    //time
    if (this.lookahead.type === TokenType.EVENT_TIME) {
	    time = this.expression(TokenType.EVENT_TIME);
	}

    //comment
    let comment;
    if (this.lookahead.type === TokenType.GROUP_INFO) {
      comment = this.expression(TokenType.GROUP_INFO);
    }

    // Add data to store
    const disciplineId = this.store.addDiscipline(disciplineName);
    const ageGroupId = this.store.addAgeGroup(ageGroupName);
    const event = this.store.addEvent(this.meetingId, ageGroupId, disciplineId, height, weight);
    const round = this.store.addRound(event, roundName, date, time);
    let group;
    if (groupNumber) {
      group = this.store.addGroup(round, groupNumber, null, null, comment);
    }

    for (const wind of winds) {
      let groupObject = this.store.getGroupByRoundAndNumber(round, wind.roundNumber);
      if (!groupObject) {
        this.store.addGroup(round, wind.roundNumber);
        groupObject = this.store.getGroupByRoundAndNumber(round, wind.roundNumber);
      }
      groupObject.wind = wind.wind;
    }

    if (this.lookahead.type === TokenType.COMBINED_DISCIPLINE) {
      this.combinedDisciplines(event);
    }

    while (
      this.lookahead.type === TokenType.ATHLETE_POSITION ||
      this.lookahead.type === TokenType.ATHLETE_BIB ||
      this.lookahead.type === TokenType.TEAM_POSITION ||
      this.lookahead.type === TokenType.TEAM_NAME
    ) {
      this.result(event, round, group);
    }
  }

  result(event, round, groupId) {
    if (this.lookahead.type === TokenType.ATHLETE_POSITION || this.lookahead.type === TokenType.ATHLETE_BIB) {
      this.singleResult(event, round, groupId);
    } else if (this.lookahead.type === TokenType.TEAM_POSITION || this.lookahead.type === TokenType.TEAM_NAME) {
      this.teamResult(event, round, groupId);
    }
  }

  singleResult(event, round, group) {
    let resultGroup = group;
    let position;
    if (this.lookahead.type === TokenType.ATHLETE_POSITION) {
      position = parseInt(this.expression(TokenType.ATHLETE_POSITION), 10);
    }
    const bib = this.expression(TokenType.ATHLETE_BIB);
    const name = Parser.processName(this.expression(TokenType.ATHLETE_FULL_NAME));
    const lastName = name.lastName;
    const firstName = name.firstName;
    const yob = this.expression(TokenType.ATHLETE_YOB);

    let citizenship;
    if (this.lookahead.type === TokenType.ATHLETE_COUNTRY) {
      citizenship = this.expression(TokenType.ATHLETE_COUNTRY);
    }

    const clubName = this.expression(TokenType.ATHLETE_CLUB_NAME);

    let weight;
    if (this.lookahead.type === TokenType.RESULT_WEIGHT) {
      weight = this.expression(TokenType.RESULT_WEIGHT).match(/^([0-9]+)g/)[1];
    }

    const performanceInfo = Parser.processPerformance(this.expression(TokenType.PERFORMANCE));

    let wind;
    if (this.lookahead.type === TokenType.WIND) {
      wind = Parser.processWind(this.expression(TokenType.WIND));
    }

    if (this.lookahead.type === TokenType.POINTS) {
      this.expression(TokenType.POINTS);
    }

    let qualified;
    if (this.lookahead.type === TokenType.QUALIFIED) {
      qualified = this.expression(TokenType.QUALIFIED);
    }

    if (this.lookahead.type === TokenType.GROUP_NUMBER_PLACE) {
      const positionRound = Parser.processPositionRound(this.expression(TokenType.GROUP_NUMBER_PLACE));
      position = positionRound.position;
      resultGroup = this.store.addGroup(round, positionRound.group);
    }

    // If no group id is given at all just use number 1
    if (!resultGroup) {
      resultGroup = this.store.addGroup(round, 1);
    }

    if (this.lookahead.type === TokenType.POINTS) {
      // TODO Save points in store?
      this.expression(TokenType.POINTS);
    }

    let comment;
    if (this.lookahead.type === TokenType.COMMENT) {
      comment = this.expression(TokenType.COMMENT);
    }

    // Add data to store
    const club = this.store.addClub(clubName);
    const athlete = this.store.addAthlete(firstName, lastName, yob, null, citizenship, club, bib);
    const result = this.store.addAthleteResult(athlete, resultGroup, performanceInfo.performance, performanceInfo.exception, wind, position, qualified, weight, comment, performanceInfo.automaticTiming);

    if ([TokenType.ATTEMPT1, TokenType.ATTEMPT2, TokenType.ATTEMPT3, TokenType.ATTEMPT4, TokenType.ATTEMPT5, TokenType.ATTEMPT6].includes(this.lookahead.type)) {
      this.attempts(result);
    } else if (this.lookahead.type === TokenType.HEIGHT) {
      this.heights(event, round, group, result);
    } else if (this.lookahead.type === TokenType.SPLIT_GROUP) {
      this.splitRound(round);
    } else if (this.lookahead.type === TokenType.COMBINED_PERFORMANCE) {
      this.combinedPerformances(event, athlete, result);
    }
  }

  teamResult(event, round, group) {
    let resultGroup = group;
    let position;
    if (this.lookahead.type === TokenType.TEAM_POSITION) {
      position = this.expression(TokenType.TEAM_POSITION);
    }
    if (this.lookahead.type === TokenType.TEAM_NAME) {
      this.expression(TokenType.TEAM_NAME);
    }
    let country;
    if (this.lookahead.type === TokenType.TEAM_COUNTRY) {
      country = this.expression(TokenType.TEAM_COUNTRY);
    }
    const clubName = this.expression(TokenType.TEAM_CLUB_NAME);

    if (this.lookahead.type === TokenType.TEAM_NUMBER) {
      this.expression(TokenType.TEAM_NUMBER);
    }

    const performanceInfo = Parser.processPerformance(this.expression(TokenType.PERFORMANCE));

    let qualified;
    if (this.lookahead.type === TokenType.QUALIFIED) {
      qualified = this.expression(TokenType.QUALIFIED);
    }

    if (this.lookahead.type === TokenType.GROUP_NUMBER_PLACE) {
      const positionRound = Parser.processPositionRound(this.expression(TokenType.GROUP_NUMBER_PLACE));
      position = positionRound.position;
      resultGroup = this.store.addGroup(round, positionRound.group);
    }

    // If no group id is given at all just use number 1
    if (!resultGroup) {
      resultGroup = this.store.addGroup(round, 1);
    }

    // Add data to store
    const clubId = this.store.addClub(clubName);
    const resultId = this.store.addTeamResult(clubId, resultGroup, performanceInfo.performance, performanceInfo.exception, position, qualified, null, performanceInfo.automaticTiming);

    while (this.lookahead.type === TokenType.ATHLETE_BIB || this.lookahead.type === TokenType.ATHLETE_FULL_NAME) {
      const comment = this.teamMember(resultId, clubId);
      if (comment) {
        const result = this.store.getResultById(resultId);
        result.comment = comment;
      }
    }
  }

  teamMember(resultId, clubId) {
    let bib;
    if (this.lookahead.type === TokenType.ATHLETE_BIB) {
      bib = this.expression(TokenType.ATHLETE_BIB);
    }
    const name = Parser.processName(this.expression(TokenType.ATHLETE_FULL_NAME));
    const lastName = name.lastName;
    const firstName = name.firstName;
    const yob = this.expression(TokenType.ATHLETE_YOB);

    let performance;
    if (this.lookahead.type === TokenType.PERFORMANCE) {
      performance = Parser.processPerformance(this.expression(TokenType.PERFORMANCE)).performance;
    }

    // Comments for relays are between athletes
    let comment;
    if (this.lookahead.type === TokenType.COMMENT) {
      comment = this.expression(TokenType.COMMENT);
    }

    // Add data to store
    const athleteId = this.store.addAthlete(firstName, lastName, yob, null, null, clubId, bib);
    this.store.addTeamMember(resultId, athleteId, performance);
    return comment;
  }

  attempts(result) {
    if (this.lookahead.type === TokenType.ATTEMPT1) {
      const performance = Parser.processPerformance(this.expression(TokenType.ATTEMPT1));
      this.store.addAttempt(result, 1, performance.performance, performance.exception);
    }
    if (this.lookahead.type === TokenType.ATTEMPT2) {
      const performance = Parser.processPerformance(this.expression(TokenType.ATTEMPT2));
      this.store.addAttempt(result, 2, performance.performance, performance.exception);
    }
    if (this.lookahead.type === TokenType.ATTEMPT3) {
      const performance = Parser.processPerformance(this.expression(TokenType.ATTEMPT3));
      this.store.addAttempt(result, 3, performance.performance, performance.exception);
    }
    if (this.lookahead.type === TokenType.ATTEMPT4) {
      const performance = Parser.processPerformance(this.expression(TokenType.ATTEMPT4));
      this.store.addAttempt(result, 4, performance.performance, performance.exception);
    }
    if (this.lookahead.type === TokenType.ATTEMPT5) {
      const performance = Parser.processPerformance(this.expression(TokenType.ATTEMPT5));
      this.store.addAttempt(result, 5, performance.performance, performance.exception);
    }
    if (this.lookahead.type === TokenType.ATTEMPT6) {
      const performance = Parser.processPerformance(this.expression(TokenType.ATTEMPT6));
      this.store.addAttempt(result, 6, performance.performance, performance.exception);
    }

    if (
      [
        TokenType.ATTEMPT_WIND1, TokenType.ATTEMPT_WIND2, TokenType.ATTEMPT_WIND3,
        TokenType.ATTEMPT_WIND4, TokenType.ATTEMPT_WIND5, TokenType.ATTEMPT_WIND6,
      ].includes(this.lookahead.type)
    ) {
      this.attemptWind(result);
    }
  }

  attemptWind(result) {
    if (this.lookahead.type === TokenType.ATTEMPT_WIND1) {
      const wind = Parser.processWind(this.expression(TokenType.ATTEMPT_WIND1));
      const attempt = this.store.getAttemptByResultAndNumber(result, 1);
      attempt.wind = wind;
    }
    if (this.lookahead.type === TokenType.ATTEMPT_WIND2) {
      const wind = Parser.processWind(this.expression(TokenType.ATTEMPT_WIND2));
      const attempt = this.store.getAttemptByResultAndNumber(result, 2);
      attempt.wind = wind;
    }
    if (this.lookahead.type === TokenType.ATTEMPT_WIND3) {
      const wind = Parser.processWind(this.expression(TokenType.ATTEMPT_WIND3));
      const attempt = this.store.getAttemptByResultAndNumber(result, 3);
      attempt.wind = wind;
    }
    if (this.lookahead.type === TokenType.ATTEMPT_WIND4) {
      const wind = Parser.processWind(this.expression(TokenType.ATTEMPT_WIND4));
      const attempt = this.store.getAttemptByResultAndNumber(result, 4);
      attempt.wind = wind;
    }
    if (this.lookahead.type === TokenType.ATTEMPT_WIND5) {
      const wind = Parser.processWind(this.expression(TokenType.ATTEMPT_WIND5));
      const attempt = this.store.getAttemptByResultAndNumber(result, 5);
      attempt.wind = wind;
    }
    if (this.lookahead.type === TokenType.ATTEMPT_WIND6) {
      const wind = Parser.processWind(this.expression(TokenType.ATTEMPT_WIND6));
      const attempt = this.store.getAttemptByResultAndNumber(result, 6);
      attempt.wind = wind;
    }
  }

  heights(event, round, group, result) {
    const height = this.expression(TokenType.HEIGHT);
    const performance = this.expression(TokenType.HEIGHT_RESULT);

    const heightId = this.store.addHeight(group, parseFloat(height.replace(',', '.')));
    this.store.addHeightResult(result, heightId, performance);

    if (this.lookahead.type === TokenType.HEIGHT) {
      this.heights(event, round, group, result);
    }
  }

  splitRound(round) {
    const number = parseInt(this.expression(TokenType.SPLIT_GROUP), 10);
    const group = this.store.addGroup(round, number);
    this.splitTime(round, group);
  }

  splitTime(round, group) {
    const distance = parseInt(this.expression(TokenType.SPLIT_DISTANCE), 10);
    const timeInfo = Parser.processPerformance(this.expression(TokenType.SPLIT_TIME));

    let athlete;
    if (this.lookahead.type === TokenType.ATHLETE_BIB) {
      const bib = this.expression(TokenType.ATHLETE_BIB);
      Parser.processName(this.expression(TokenType.ATHLETE_FULL_NAME));
      this.expression(TokenType.ATHLETE_COUNTRY);
      athlete = this.store.getAthletesByBib(bib)[0].id;
    }

    // Add data to store
    this.store.addSplitTime(group, distance, timeInfo.performance, athlete);

    if (this.lookahead.type === TokenType.SPLIT_DISTANCE) {
      this.splitTime(round, group);
    } else if (this.lookahead.type === TokenType.SPLIT_GROUP) {
      this.splitRound(round);
    }
  }

  combinedDisciplines(event) {
    let idx = 1;
    while (this.lookahead.type === TokenType.COMBINED_DISCIPLINE) {
      const disciplineName = this.expression(TokenType.COMBINED_DISCIPLINE);
      const discipline = this.store.addDiscipline(disciplineName);
      const combinedDiscipline = this.store.addCombinedDiscipline(event, discipline, idx);
      this.store.addRound(event, disciplineName, null, null, null, combinedDiscipline);
      idx += 1;
    }
  }

  combinedPerformances(event, athlete, parent) {
    const combinedResults = {};

    while (this.lookahead.type === TokenType.COMBINED_PERFORMANCE) {
      const reference = this.lookahead.ref;
      combinedResults[reference] = Parser.processPerformance(this.expression(TokenType.COMBINED_PERFORMANCE));
    }
    if (this.lookahead.type === TokenType.COMBINED_WIND) {
      while (this.lookahead.type === TokenType.COMBINED_WIND) {
        const reference = this.lookahead.ref;
        combinedResults[reference].wind = Parser.processWind(this.expression(TokenType.COMBINED_WIND));
      }
    }
    while (this.lookahead.type === TokenType.COMBINED_POINTS) {
      const reference = this.lookahead.ref;
      combinedResults[reference].points = parseInt(this.expression(TokenType.COMBINED_POINTS), 10);
    }
    while (this.lookahead.type === TokenType.COMBINED_SUM) {
      this.expression(TokenType.COMBINED_SUM);
    }

    Object.keys(combinedResults).forEach((disciplineName) => {
      const result = combinedResults[disciplineName];
      const discipline = this.store.addDiscipline(disciplineName);
      const combinedDiscipline = this.store.getCombinedDisciplineByEventAndDiscipline(event, discipline);
      const combinedRound = this.store.addRound(event, disciplineName, null, null, null, combinedDiscipline);
      const combinedGroup = this.store.addGroup(combinedRound, 1);
      this.store.addCombinedResult(athlete, combinedGroup, parent, result.performance, result.exception, result.wind, result.points, null, null, null, null, result.automaticTiming);
    });
  }

  static processName(name) {
    const nameParts = name.split(' ');
    const lastName = nameParts.shift().trim();
    const firstName = nameParts.join(' ').trim();
    return {
      firstName,
      lastName,
    };
  }

  static processPerformance(performanceString) {
    if (performanceString === 'abg.' || performanceString === 'aufg.' || performanceString === 'DNF') {
      return {
        performance: null,
        exception: 'DNF',
      };
    } else if (performanceString === 'n.a.') {
      return {
        performance: null,
        exception: 'DNS',
      };
    } else if (performanceString === 'disq.') {
      return {
        performance: null,
        exception: 'DQF',
      };
    } else if (performanceString === '-') {
      return {
        performance: null,
        exception: performanceString,
      };
    }

    let automaticTiming = true;
    if (performanceString.endsWith('*')) {
      automaticTiming = false;
    }

    const multiplicators = [60, 3600];
    const parts = performanceString.replace('.', '').replace(',', '.').split(':');

    let performance = parseFloat(parts.pop());

    if (parts.length > 0) {
      let index = 0;
      while (true) {
        performance += parseInt(parts.pop(), 10) * multiplicators[index];
        index += 1;
        if (parts.length === 0) break;
      }
    }

    return {
      performance: parseFloat(performance),
      exception: null,
      automaticTiming,
    };
  }

  static processWind(windString) {
    return parseFloat(windString.replace(',', '.'));
  }

  static processPositionRound(data) {
    const patternRound = new RegExp('^(?:([0-9]{0,2})\\.|-)/([IVX]*)$');
    const roundMatch = data.match(patternRound);
    const position = parseInt(roundMatch[1], 10);
    const group = converter.deParse(roundMatch[2]);
    return {
      position,
      group,
    };
  }

  expression(type) {
    if (this.lookahead.type === type) {
      const text = this.lookahead.text;
      this.nextToken();
      return text;
    }

    /* istanbul ignore next */
    if (this.lookahead.type === TokenType.END) {
      throw new Error('Unexpected end of input');
    }
    /* istanbul ignore next */
    throw new Error(`Unexpected symbol ${JSON.stringify(this.lookahead)} found. Expected ${type}`);
  }

  nextToken() {
    this.tokens.shift();
    this.lookahead = this.tokens[0];
  }
}
