export const TYPES = {
  COMPETITION_NAME: 'COMPETITION_NAME',
  COMPETITION_CITY: 'COMPETITION_CITY',
  COMPETITION_VENUE: 'COMPETITION_VENUE',
  COMPETITION_START_DATE: 'COMPETITION_START_DATE',
  COMPETITION_END_DATE: 'COMPETITION_END_DATE',
  DISCIPLINE_NAME: 'DISCIPLINE_NAME',
  DISCIPLINE_ADDITIONAL_INFO: 'DISCIPLINE_ADDITIONAL_INFO',
  AGE_GROUP_NAME: 'AGE_GROUP_NAME',
  EVENT_DATE: 'EVENT_DATE',
  EVENT_TIME: 'EVENT_TIME',
  ATHLETE_POSITION: 'ATHLETE_POSITION',
  ATHLETE_BIB: 'ATHLETE_BIB',
  ATHLETE_FULL_NAME: 'ATHLETE_FULL_NAME',
  ATHLETE_YOB: 'ATHLETE_YOB',
  ATHLETE_COUNTRY: 'ATHLETE_COUNTRY',
  ATHLETE_CLUB_NAME: 'ATHLETE_CLUB_NAME',
  TEAM_POSITION: 'TEAM_POSITION',
  TEAM_NAME: 'TEAM_NAME',
  TEAM_COUNTRY: 'TEAM_COUNTRY',
  TEAM_CLUB_NAME: 'TEAM_CLUB_NAME',
  TEAM_NUMBER: 'TEAM_NUMBER',
  ATTEMPT1: 'ATTEMPT1',
  ATTEMPT2: 'ATTEMPT2',
  ATTEMPT3: 'ATTEMPT3',
  ATTEMPT4: 'ATTEMPT4',
  ATTEMPT5: 'ATTEMPT5',
  ATTEMPT6: 'ATTEMPT6',
  ATTEMPT_WIND1: 'ATTEMPT_WIND1',
  ATTEMPT_WIND2: 'ATTEMPT_WIND2',
  ATTEMPT_WIND3: 'ATTEMPT_WIND3',
  ATTEMPT_WIND4: 'ATTEMPT_WIND4',
  ATTEMPT_WIND5: 'ATTEMPT_WIND5',
  ATTEMPT_WIND6: 'ATTEMPT_WIND6',
  HEIGHT: 'HEIGHT',
  HEIGHT_RESULT: 'HEIGHT_RESULT',
  PERFORMANCE: 'PERFORMANCE',
  WIND: 'WIND',
  QUALIFIED: 'QUALIFIED',
  ROUND_NAME: 'ROUND_NAME',
  GROUP_NUMBER: 'GROUP_NUMBER',
  GROUP_INFO: 'GROUP_INFO',
  GROUP_NUMBER_PLACE: 'GROUP_NUMBER_PLACE',
  SPLIT_GROUP: 'SPLIT_GROUP',
  SPLIT_TIME: 'SPLIT_TIME',
  SPLIT_DISTANCE: 'SPLIT_DISTANCE',
  COMMENT: 'COMMENT',
  PARTICIPANT_COUNT: 'PARTICIPANT_COUNT',
  COMBINED_DISCIPLINE: 'COMBINED_DISCIPLINE',
  COMBINED_PERFORMANCE: 'COMBINED_PERFORMANCE',
  COMBINED_WIND: 'COMBINED_WIND',
  COMBINED_POINTS: 'COMBINED_POINTS',
  COMBINED_SUM: 'COMBINED_SUM',
  RESULT_WEIGHT: 'RESULT_WEIGHT',
  POINTS: 'POINTS',
  UNKNOWN: 'UNKNOWN',
  END: 'END',
};

export default class Token {
  constructor(type, text, reference) {
    this.type = type;
    this.text = text;
    this.ref = reference;
  }
}
