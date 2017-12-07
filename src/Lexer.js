import Token, { TYPES as TokenType } from './Token';
import Column, { Alignment, ContentType } from './Column';

const RowType = {
  COMPETITION_NAME: 'COMPETITION_NAME',
  COMPETITION_INFO: 'COMPETITION_INFO',
  EVENT_HEADER: 'EVENT_HEADER',
  EVENT_INFO: 'EVENT_INFO',
  RESULT_HEADER: 'RESULT_HEADER',
  ATTEMPT_HEADER: 'ATTEMPT_HEADER',
  HEIGHT_HEADER: 'HEIGHT_HEADER',
  RESULT: 'RESULT',
  ATTEMPT: 'ATTEMPT',
  ATTEMPT_WIND: 'ATTEMPT_WIND',
  HEIGHT: 'HEIGHT',
  LONG_ATHLETE_NAME: 'LONG_ATHLETE_NAME',
  LONG_CLUB_NAME: 'LONG_CLUB_NAME',
  LONG_ATHLETE_CLUB_NAME: 'LONG_ATHLETE_CLUB_NAME',
  LONG_TEAM_CLUB_NAME: 'LONG_TEAM_CLUB_NAME',
  COMMENT: 'COMMENT',
  TEAM_MEMBERS: 'TEAM_MEMBERS',
  TEAM_MEMBER_YOB: 'TEAM_MEMBER_YOB',
  TEAM_RESULT_COMMENT: 'TEAM_RESULT_COMMENT',
  SINGLE_RESULT_COMMENT: 'SINGLE_RESULT_COMMENT',
  SPLIT_HEADER: 'SPLIT_HEADER',
  SPLIT_TIME: 'SPLIT_TIME',
  COMBINED_HEADER: 'COMBINED_HEADER',
  COMBINED_RESULT: 'COMBINED_RESULT',
  COMBINED_WIND: 'COMBINED_WIND',
  COMBINED_POINTS: 'COMBINED_POINTS',
  COMBINED_POINTS_SUM: 'COMBINED_POINTS_SUM',
  COMBINED_TEAM_RESULT: 'COMBINED_TEAM_RESULT',
  COMBINED_TEAM_MEMBER_RESULT: 'COMBINED_TEAM_MEMBER_RESULT',
  UNKNOWN: 'UNKNOWN',
};

const columnAlignments = {};
const contentTypes = {};
columnAlignments.Rang = Alignment.CENTER;
contentTypes.Rang = ContentType.INTEGER;
columnAlignments.StNr = Alignment.RIGHT;
contentTypes.StNr = ContentType.INTEGER;
columnAlignments.Name = Alignment.LEFT;
contentTypes.Name = ContentType.TEXT;
columnAlignments.Jahr = Alignment.CENTER;
contentTypes.Jahr = ContentType.INTEGER;
columnAlignments.Land = Alignment.CENTER;
contentTypes.Land = ContentType.TEXT;
columnAlignments.LV = Alignment.CENTER;
contentTypes.LV = ContentType.TEXT;
columnAlignments.Verein = Alignment.LEFT;
contentTypes.Verein = ContentType.TEXT;
columnAlignments.Leistung = Alignment.CENTER;
contentTypes.Leistung = ContentType.RESULT;
columnAlignments.Punkte = Alignment.CENTER;
contentTypes.Punkte = ContentType.RESULT;
columnAlignments.Wind = Alignment.LEFT;
contentTypes.Wind = ContentType.WIND;
columnAlignments.Q = Alignment.LEFT;
contentTypes.Q = ContentType.TEXT;

let currentColumn = 0;

function getCompetitionInfo(text) {
  const tokens = [];
  const pattern = new RegExp('^([^,]*),\\s(.*?),\\s([0-9]{2}\\.[0-9]{2}\\.[0-9]{4})(?:\\s-\\s([0-9]{2}\\.[0-9]{2}\\.[0-9]{4}))?$');
  const result = text.match(pattern);
  /* istanbul ignore else */
  if (result) {
    tokens.push(new Token(TokenType.COMPETITION_CITY, result[1]));
    tokens.push(new Token(TokenType.COMPETITION_VENUE, result[2]));
    tokens.push(new Token(TokenType.COMPETITION_START_DATE, result[3]));
  } else {
    tokens.push(new Token(TokenType.UNKNOWN, text));
  }
  return tokens;
}

function getEventHeader(text) {
  const tokens = [];
  const patternCombined = new RegExp('^(.*Mannschaft.*)\\s\\((.*)\\)$');
  const eventHeaderPattern1 = new RegExp('^([^,]*),\\s(.*?)(?:\\s\\(([^)]*)\\))(?:\\s-\\sFortsetzung)?$');
  const eventHeaderPattern2 = new RegExp('^([^,]*),\\s(.*?)(?:\\s-\\sFortsetzung)?$');
  const resultCombined = text.match(patternCombined);
  const result1 = text.match(eventHeaderPattern1);
  const result2 = text.match(eventHeaderPattern2);
  if (resultCombined) {
    tokens.push(new Token(TokenType.DISCIPLINE_NAME, resultCombined[1]));
    tokens.push(new Token(TokenType.AGE_GROUP_NAME, resultCombined[2]));
  } else if (result1) {
    tokens.push(new Token(TokenType.DISCIPLINE_NAME, result1[1]));
    tokens.push(new Token(TokenType.AGE_GROUP_NAME, result1[2]));
    tokens.push(new Token(TokenType.DISCIPLINE_ADDITIONAL_INFO, result1[3]));
  } else if (result2) {
    tokens.push(new Token(TokenType.DISCIPLINE_NAME, result2[1]));
    tokens.push(new Token(TokenType.AGE_GROUP_NAME, result2[2]));
  } else {
    /* istanbul ignore next */
    tokens.push(new Token(TokenType.UNKNOWN, text));
  }
  return tokens;
}

function getEventInfo(text) {
  const tokens = [];

  const pattern1 = new RegExp('^([0-9]{2}\\.[0-9]{2}\\.[0-9]{4})\\s/\\s([0-9]{1,2}:[0-9]{2})$');
  const result1 = text.match(pattern1);
  if (result1) {
    tokens.push(new Token(TokenType.EVENT_DATE, result1[1]));
    tokens.push(new Token(TokenType.EVENT_TIME, result1[2]));
    return tokens;
  }

  const pattern2 = new RegExp('^(?:Gruppe|Lauf)\\s([0-9]*)\\svon\\s[0-9]*$');
  const result2 = text.match(pattern2);
  if (result2) {
    tokens.push(new Token(TokenType.GROUP_NUMBER, result2[1]));
    return tokens;
  }

  const pattern3 = new RegExp('^Wind:\\s((?:[IVX]{1,}:[+-]?[0-9],[0-9],?)*)m/s$');
  const result3 = text.match(pattern3);
  if (result3) {
    tokens.push(new Token(TokenType.WIND, result3[1]));
    return tokens;
  }
  
  const pattern6 = new RegExp('^Wind:\\s(([+-]?[0-9],[0-9],?)*)m/s$');
  const result6 = text.match(pattern6);
  if (result6) {
    tokens.push(new Token(TokenType.WIND, result6[1]));
    return tokens;
  }

  const pattern4 = new RegExp('^Athleten:\\s([0-9]{1,3})$');
  const result4 = text.match(pattern4);
  if (result4) {
    tokens.push(new Token(TokenType.PARTICIPANT_COUNT, result4[1]));
    return tokens;
  }

  const pattern5 = new RegExp('^([0-9]{2}\\.[0-9]{2}\\.[0-9]{4})$');
  const result5 = text.match(pattern5);
  if (result5) {
    tokens.push(new Token(TokenType.EVENT_DATE, result5[1]));
    return tokens;
  }

  if (text.startsWith('Es qualifizieren sich')) {
    tokens.push(new Token(TokenType.GROUP_INFO, text));
    return tokens;
  }

  const eventHeader = getEventHeader(text);
  if (eventHeader.length > 0 && eventHeader[0].type !== TokenType.UNKNOWN) {
    return tokens;
  }

  tokens.push(new Token(TokenType.ROUND_NAME, text));
  return tokens;
}

function matchResultColumn(resultColumns, resultColumnNames, element, teamResult, allColumns = false) {
  const text = element.getText();
  // There is a special case where a weight is printed between club and performance
  const lastColumn = resultColumns[currentColumn - 1];
  if (lastColumn && lastColumn.getName() === 'Verein' && element.getText().match(/^[0-9]+g$/)) {
    return new Token(TokenType.RESULT_WEIGHT, element.getText());
  }

  const patternRound = new RegExp('^(?:[0-9]{0,2}\\.|-)/[IVX]*$');
  const roundMatch = text.match(patternRound);
  if (roundMatch) {
    return new Token(TokenType.GROUP_NUMBER_PLACE, text);
  }

  let startColumn = currentColumn;
  if (allColumns) {
    startColumn = 0;
  }

  for (let i = startColumn; i < resultColumns.length; i += 1) {
    const column = resultColumns[i];
    let previousColumn = null;
    const nextColumn = resultColumns[i + 1];
    if (i > 0) {
      previousColumn = resultColumns[i - 1];
    }
    if (column.match(element, previousColumn, nextColumn)) {
      if (!allColumns) {
        currentColumn += 1;
      }
      const columnName = column.getName();
      if (columnName === 'Rang') {
        if (teamResult) return new Token(TokenType.TEAM_POSITION, text);
        return new Token(TokenType.ATHLETE_POSITION, text);
      } else if (columnName === 'StNr') {
        return new Token(TokenType.ATHLETE_BIB, text);
      } else if (columnName === 'Name') {
        if (teamResult) return new Token(TokenType.TEAM_NAME, text);
        return new Token(TokenType.ATHLETE_FULL_NAME, text);
      } else if (columnName === 'Jahr') {
        return new Token(TokenType.ATHLETE_YOB, text);
      } else if (columnName === 'Land' || columnName === 'LV') {
        if (teamResult) return new Token(TokenType.TEAM_COUNTRY, text);
        return new Token(TokenType.ATHLETE_COUNTRY, text);
      } else if (columnName === 'Verein') {
        if (teamResult) return new Token(TokenType.TEAM_CLUB_NAME, text);
        return new Token(TokenType.ATHLETE_CLUB_NAME, text);
      } else if (columnName === 'Leistung' || (columnName === 'Punkte' && !resultColumnNames.includes('Leistung'))) {
        return new Token(TokenType.PERFORMANCE, text);
      } else if (columnName === 'Punkte') {
        return new Token(TokenType.POINTS, text);
      } else if (columnName === 'Wind') {
        return new Token(TokenType.WIND, text);
      } else if (columnName === 'Q') {
        return new Token(TokenType.QUALIFIED, text);
      }
      /* istanbul ignore next */
      return new Token(TokenType.UNKNOWN, text);
    }
    if (!allColumns) {
      currentColumn += 1;
    }
  }

  /* istanbul ignore next */
  return new Token(TokenType.UNKNOWN, text);
}

function matchAttemptColumn(attemptColumns, element, wind, validAttemptValues) {
  const text = element.getText();
  for (let i = currentColumn; i < attemptColumns.length; i += 1) {
	  
	if (!wind) {
		if (text != 'x' && isNaN(parseFloat(text.replace(',', '.')))) {
    		validAttemptValues[i] = false;
    	}
    	else {
    		validAttemptValues[i] = true;
    	}
    }
	else {
		while (!validAttemptValues[i] && i < attemptColumns.length) {
			i++;
		}
		if (i >= attemptColumns.length) {
			return undefined;
		}
	}
	  
	  
    const column = attemptColumns[i];
    let previousColumn = null;
    if (i > 0) {
      previousColumn = attemptColumns[i - 1];
    }
    currentColumn += 1;
    const columnName = column.getName();
    
    if (columnName === '- V1 -') {
      if (wind) return new Token(TokenType.ATTEMPT_WIND1, text);
      return new Token(TokenType.ATTEMPT1, text);
    } else if (columnName === '- V2 -') {
      if (wind) return new Token(TokenType.ATTEMPT_WIND2, text);
      return new Token(TokenType.ATTEMPT2, text);
    } else if (columnName === '- V3 -') {
      if (wind) return new Token(TokenType.ATTEMPT_WIND3, text);
      return new Token(TokenType.ATTEMPT3, text);
    } else if (columnName === '- V4 -') {
      if (wind) return new Token(TokenType.ATTEMPT_WIND4, text);
      return new Token(TokenType.ATTEMPT4, text);
    } else if (columnName === '- V5 -') {
      if (wind) return new Token(TokenType.ATTEMPT_WIND5, text);
      return new Token(TokenType.ATTEMPT5, text);
    } else if (columnName === '- V6 -') {
      if (wind) return new Token(TokenType.ATTEMPT_WIND6, text);
      return new Token(TokenType.ATTEMPT6, text);
    }
    currentColumn += 1;
    
  }
  /* istanbul ignore next */
  return new Token(TokenType.UNKNOWN, text);
}

function matchHeightColumn(heightColumns, element) {
  const tokens = [];
  const text = element.getText();
  for (let i = currentColumn; i < heightColumns.length; i += 1) {
    const column = heightColumns[i];
    let previousColumn = null;
    if (i > 0) {
      previousColumn = heightColumns[i - 1];
    }
    if (column.match(element, previousColumn)) {
      const columnName = column.getName();
      tokens.push(new Token(TokenType.HEIGHT, columnName));
      tokens.push(new Token(TokenType.HEIGHT_RESULT, text));
      return tokens;
    }
    currentColumn += 1;
  }
  /* istanbul ignore next */
  tokens.push(new Token(TokenType.UNKNOWN, text));
  /* istanbul ignore next */
  return tokens;
}

function matchCombinedColumn(combinedColumns, element, type) {
  let text = element.getText();
  for (let i = currentColumn; i < combinedColumns.length; i += 1) {
    const column = combinedColumns[i];
    let previousColumn = null;
    if (i > 0) {
      previousColumn = combinedColumns[i - 1];
    }
    if (column.match(element, previousColumn)) {
      currentColumn += 1;
      const columnName = column.getName();
      if (type === TokenType.COMBINED_WIND) {
        text = text.substr(1, text.length - 2);
      }
      return new Token(type, text, columnName);
    }
    currentColumn += 1;
  }
  /* istanbul ignore next */
  return new Token(TokenType.UNKNOWN, text);
}

function matchCombinedTeamResult(element) {
  const text = element.getText();
  const positionPattern = /^([0-9]+)\.$/;
  const positionMatch = text.match(positionPattern);
  if (positionMatch) {
    return [new Token(TokenType.TEAM_POSITION, positionMatch[1])];
  }
  const clubPattern = new RegExp('^(.*)\\s\\(([0-9]+)\\)$');
  const clubMatch = text.match(clubPattern);
  if (clubMatch) {
    return [
      new Token(TokenType.TEAM_CLUB_NAME, clubMatch[1]),
      new Token(TokenType.TEAM_NUMBER, clubMatch[2]),
    ];
  }
  const pointsPattern = new RegExp('^([0-9.]+)\\sPunkte$');
  const pointsMatch = text.match(pointsPattern);
  if (pointsMatch) {
    return [
      new Token(TokenType.PERFORMANCE, pointsMatch[1]),
    ];
  }
  /* istanbul ignore next */
  return [new Token(TokenType.UNKNOWN, text)];
}

function matchCombinedTeamMemberResult(element) {
  const text = element.getText();
  const yobPattern = /^([0-9]{4})$/;
  const yobMatch = text.match(yobPattern);
  if (yobMatch) {
    return new Token(TokenType.ATHLETE_YOB, yobMatch[1]);
  }
  const pointsPattern = new RegExp('^([0-9.]+)\\sPunkte$');
  const pointsMatch = text.match(pointsPattern);
  if (pointsMatch) {
    return new Token(TokenType.PERFORMANCE, pointsMatch[1]);
  }
  if (currentColumn === 0) {
    return new Token(TokenType.ATHLETE_FULL_NAME, text);
  }
  /* istanbul ignore next */
  return [new Token(TokenType.UNKNOWN, text)];
}

function matchTeamMember(element, resultColumns) {
  const text = element.getText();
  const tokens = [];
  const teamMemberPattern = new RegExp('^([0-9]*),\\s(.*?)\\s\\(([0-9]{4})\\)$');
  const teamMemberMatch = text.match(teamMemberPattern);
  const teamMemberPattern2 = new RegExp('^([0-9]*),\\s([^(]*)$');
  const teamMemberMatch2 = text.match(teamMemberPattern2);
  const teamOrderPattern = new RegExp('^[0-9]+:$');
  const teamOrderMatch = text.match(teamOrderPattern);
  const lastColumn = resultColumns && resultColumns[resultColumns.length - 1];
  if (teamMemberMatch) {
    tokens.push(new Token(TokenType.ATHLETE_BIB, teamMemberMatch[1]));
    tokens.push(new Token(TokenType.ATHLETE_FULL_NAME, teamMemberMatch[2]));
    tokens.push(new Token(TokenType.ATHLETE_YOB, teamMemberMatch[3]));
  } else if (teamMemberMatch2) {
    tokens.push(new Token(TokenType.ATHLETE_BIB, teamMemberMatch2[1]));
    tokens.push(new Token(TokenType.ATHLETE_FULL_NAME, teamMemberMatch2[2]));
    tokens.push(new Token(TokenType.ATHLETE_YOB, null));
  } else if (teamOrderMatch) {
    // do nothing not needed
  } else if (lastColumn && lastColumn.getRight() < element.getX()) {
    tokens.push(new Token(TokenType.COMMENT, text));
  }
  return tokens;
}

function matchSplitHeader(element) {
  const text = element.getText();
  const pattern = new RegExp('^Zwischenzeiten\\s-\\sLauf\\s([0-9]{1,2})$');
  const match = text.match(pattern);
  if (match) {
    return new Token(TokenType.SPLIT_GROUP, match[1]);
  }
  /* istanbul ignore next */
  return new Token(TokenType.UNKNOWN, text);
}

function matchSplitTime(element, column) {
  const text = element.getText();
  switch (column) {
    case 0:
      return new Token(TokenType.SPLIT_DISTANCE, text);
    case 1:
      return new Token(TokenType.SPLIT_TIME, text);
    case 2:
      return new Token(TokenType.ATHLETE_BIB, text);
    case 3:
      return new Token(TokenType.ATHLETE_FULL_NAME, text);
    case 4:
      return new Token(TokenType.ATHLETE_COUNTRY, text);
    /* istanbul ignore next */
    default:
      return new Token(TokenType.UNKNOWN, text);
  }
}

function matchPattern(pattern, row) {
  for (const field of row) {
    const result = field.getText().match(pattern);
    if (!result) {
      return false;
    }
  }
  return true;
}

function isAttemptRow(row) {
  return matchPattern(new RegExp('^(?:x|-|[0-9]{1,2},[0-9]{2})$'), row);
}

function isAttemptWindRow(row) {
  return matchPattern(new RegExp('^[+-]?[0-9],[0-9]$'), row);
}

function isHeightHeaderRow(row) {
  return matchPattern(new RegExp('^[0-9],[0-9]{2}$'), row);
}

function isHeightRow(row) {
  return matchPattern(new RegExp('^X{0,}O?(?:-|r)?$'), row);
}

function isCombinedHeaderRow(row) {
  return matchPattern(new RegExp('^[A-Z0-9]{2,4}$'), row);
}

function isCombinedResultRow(row) {
  return matchPattern(new RegExp('^(?:[0-9]+:)?[0-9]{1,2},[0-9]{2}|\\(-[0-9]{1,4}\\)|ogV|Can|Dns|0|Dnf$'), row);
}

function isCombinedWindRow(row) {
  return matchPattern(new RegExp('^\\(([+-]?[0-9],[0-9])\\)$'), row);
}

function isCombinedPointsRow(row) {
  return matchPattern(new RegExp('^((?:[0-9]{1,2}\\.)?[0-9]{1,3})$'), row);
}

function isEventInfoRow(row) {
  for (const field of row) {
    const result = getEventInfo(field.getText());
    if (result.length === 0) {
      return false;
    }
  }
  return true;
}

function isComment(element) {
  const text = element.getText();
  if (text.includes('IWR') || text.includes(',') || text.split(' ').length > 2) {
    return true;
  }
  return false;
}

function updateLongName(tokens, type, text) {
  for (let j = tokens.length - 1; j >= 0; j -= 1) {
    const token = tokens[j];
    if (token.type === type) {
      if (token.text.endsWith('-') || token.text.endsWith('/')) {
        token.text = `${token.text}${text}`;
      } else {
        token.text = `${token.text} ${text}`;
      }
      break;
    }
  }
}

export default (pages) => {
  const tokens = [];

  let nextRowTypes = [];
  let newPageNextRowTypes = [];
  let resultColumns = [];
  let resultColumnNames = [];
  let attemptColumns = [];
  let heightColumns = [];
  let heightsRow = -1;
  let currentHeightColumns = [];
  let combinedColumns = [];
  let pageNo = 1;
  let report = false;
  let lastRowType;
  let validAttemptValues = {};
  
  for (const page of pages) {
    if (pageNo > 1) {
      newPageNextRowTypes = nextRowTypes;
    }
    nextRowTypes = [RowType.COMPETITION_NAME];

    for (const row of page) {
      currentColumn = 0;

      const firstText = row[0].getText();
      if (firstText.startsWith('Gedruckt ') || firstText.startsWith('Dataservice by') || report) {
        continue;
      }
      let teamResult = false;

      let rowType = RowType.UNKNOWN;
      if (nextRowTypes.includes(RowType.COMPETITION_NAME)) {
        rowType = RowType.COMPETITION_NAME;
        nextRowTypes = [RowType.COMPETITION_INFO];
        if (pageNo > 1) continue;
      } else if (nextRowTypes.includes(RowType.COMPETITION_INFO)) {
        rowType = RowType.COMPETITION_INFO;
        nextRowTypes = [RowType.EVENT_HEADER, RowType.SPLIT_HEADER];
        if (pageNo > 1) {
          nextRowTypes = newPageNextRowTypes;
          if (row[row.length - 1].getText() === 'VERANSTALTUNGSBERICHT') {
            report = true;
          }
          continue;
        }
      } else if (nextRowTypes.includes(RowType.RESULT_HEADER) && row[0].getText() === 'Rang') {
        rowType = RowType.RESULT_HEADER;
        nextRowTypes = [
          RowType.ATTEMPT_HEADER, RowType.HEIGHT_HEADER,
          RowType.RESULT, RowType.EVENT_HEADER,
          RowType.COMBINED_HEADER,
        ];
      } else if (nextRowTypes.includes(RowType.SPLIT_HEADER) && row[0].getText().match(new RegExp('^Zwischenzeiten\\s-\\sLauf\\s[0-9]{1,2}$'))) {
        rowType = RowType.SPLIT_HEADER;
        nextRowTypes = [RowType.RESULT, RowType.SPLIT_TIME];
      } else if (nextRowTypes.includes(RowType.COMBINED_TEAM_RESULT) && row[0].getText().match(/^[0-9]+\.$/) && row[row.length - 1].getText().endsWith('Punkte')) {
        rowType = RowType.COMBINED_TEAM_RESULT;
        nextRowTypes = [RowType.COMBINED_TEAM_MEMBER_RESULT];
      } else if (nextRowTypes.includes(RowType.COMBINED_TEAM_MEMBER_RESULT) && row[row.length - 1].getText().endsWith('Punkte')) {
        rowType = RowType.COMBINED_TEAM_MEMBER_RESULT;
        nextRowTypes = [RowType.COMBINED_TEAM_MEMBER_RESULT, RowType.COMBINED_TEAM_RESULT, RowType.EVENT_HEADER];
      } else if (nextRowTypes.includes(RowType.EVENT_INFO) && isEventInfoRow(row)) {
        rowType = RowType.EVENT_INFO;
        nextRowTypes = [RowType.RESULT_HEADER, RowType.EVENT_INFO, RowType.EVENT_HEADER];
      } else if (
        (nextRowTypes.includes(RowType.LONG_ATHLETE_NAME) || nextRowTypes.includes(RowType.COMMENT)) && row.length === 1 &&
        matchResultColumn(resultColumns, resultColumnNames, row[0], teamResult, true).type === TokenType.ATHLETE_FULL_NAME
      ) {
        if (isComment(row[0]) || !nextRowTypes.includes(RowType.LONG_ATHLETE_NAME)) {
          rowType = RowType.COMMENT;
        } else {
          rowType = RowType.LONG_ATHLETE_NAME;
        }
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER, RowType.HEIGHT, RowType.ATTEMPT, RowType.COMMENT];
        
      } else if (
        nextRowTypes.includes(RowType.EVENT_HEADER) &&
        row[0].getX() < 100 &&
        getEventHeader(row[0].getText()).length > 1
      ) {
        rowType = RowType.EVENT_HEADER;
        nextRowTypes = [RowType.EVENT_INFO, RowType.RESULT_HEADER, RowType.COMBINED_TEAM_RESULT, RowType.EVENT_HEADER];
        resultColumns = [];
        resultColumnNames = [];
        attemptColumns = [];
        heightColumns = [];
        combinedColumns = [];
      } else if (nextRowTypes.includes(RowType.ATTEMPT_HEADER) && row[0].getText() === '- V1 -') {
        rowType = RowType.ATTEMPT_HEADER;
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER];
      } else if (nextRowTypes.includes(RowType.COMBINED_HEADER) && isCombinedHeaderRow(row)) {
        rowType = RowType.COMBINED_HEADER;
        nextRowTypes = [RowType.RESULT];
      } else if (nextRowTypes.includes(RowType.SPLIT_TIME) && row[0].getText().match(/^[0-9]{1,5}\s*m$/)) {
        rowType = RowType.SPLIT_TIME;
        nextRowTypes = [RowType.EVENT_HEADER, RowType.SPLIT_TIME, RowType.SPLIT_HEADER];
      } else if (
        nextRowTypes.includes(RowType.LONG_ATHLETE_CLUB_NAME) && row.length === 2 &&
        matchResultColumn(resultColumns, resultColumnNames, row[0], false, true).type === TokenType.ATHLETE_FULL_NAME &&
        matchResultColumn(resultColumns, resultColumnNames, row[1], false, true).type === TokenType.ATHLETE_CLUB_NAME
      ) {
        rowType = RowType.LONG_ATHLETE_CLUB_NAME;
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER, RowType.HEIGHT, RowType.ATTEMPT];
      } else if (
        nextRowTypes.includes(RowType.LONG_TEAM_CLUB_NAME) && row.length === 2 &&
        matchResultColumn(resultColumns, resultColumnNames, row[0], true, true).type === TokenType.TEAM_NAME &&
        matchResultColumn(resultColumns, resultColumnNames, row[1], true, true).type === TokenType.TEAM_CLUB_NAME
      ) {
        rowType = RowType.LONG_TEAM_CLUB_NAME;
        nextRowTypes = [RowType.RESULT, RowType.TEAM_MEMBERS];
      } else if (
        nextRowTypes.includes(RowType.LONG_CLUB_NAME) && row.length === 1 &&
        matchResultColumn(resultColumns, resultColumnNames, row[0], teamResult, true).type === TokenType.ATHLETE_CLUB_NAME
      ) {
        rowType = RowType.LONG_CLUB_NAME;
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER, RowType.HEIGHT, RowType.ATTEMPT];
      } else if (
        nextRowTypes.includes(RowType.COMMENT) && row.length === 1 &&
        row[0].getX() > resultColumns[resultColumns.length - 2].getRight()
      ) {
    	  
        rowType = RowType.COMMENT;
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER, RowType.HEIGHT, RowType.ATTEMPT];
        
      } else if (nextRowTypes.includes(RowType.TEAM_MEMBERS) && row.length > 1 && matchTeamMember(row[1]).length > 0) {
        rowType = RowType.TEAM_MEMBERS;
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER, RowType.TEAM_MEMBERS];
      } else if (nextRowTypes.includes(RowType.TEAM_MEMBERS) && row.length === 1 && row[0].getText().match(/^\([0-9]{4}\)$/)) {
        rowType = RowType.TEAM_MEMBER_YOB;
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER, RowType.TEAM_MEMBERS];
      } else if (nextRowTypes.includes(RowType.TEAM_MEMBERS) && row.length === 1 && resultColumns && row[0].getX() > resultColumns[resultColumns.length - 1].getRight()) {
    	  
        rowType = RowType.TEAM_RESULT_COMMENT;
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER, RowType.TEAM_MEMBERS];
  
      } else if (nextRowTypes.includes(RowType.RESULT) && row.length === 1 && resultColumns && row[0].getX() > resultColumns[resultColumns.length - 1].getRight()) {
    	  
    	rowType = RowType.SINGLE_RESULT_COMMENT;
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER, RowType.HEIGHT, RowType.ATTEMPT];
     
      } else if (
        nextRowTypes.includes(RowType.RESULT) &&
        !isAttemptRow(row) &&
        !isAttemptWindRow(row) &&
        !isHeightHeaderRow(row) &&
        !isHeightRow(row) &&
        !isCombinedResultRow(row) &&
        !isCombinedWindRow(row) &&
        !isCombinedPointsRow(row)
      ) {
    	  
        rowType = RowType.RESULT;
        teamResult = resultColumns[1].getName() !== 'StNr';
        heightsRow = -1;
        if (teamResult) {
          nextRowTypes = [
            RowType.TEAM_MEMBERS, RowType.LONG_TEAM_CLUB_NAME,
          ];
        } else {
          nextRowTypes = [
            RowType.RESULT, RowType.EVENT_HEADER, RowType.HEIGHT,
            RowType.LONG_ATHLETE_NAME, RowType.ATTEMPT,
            RowType.SPLIT_HEADER, RowType.COMMENT,
            RowType.COMBINED_RESULT, RowType.LONG_CLUB_NAME,
            RowType.LONG_ATHLETE_CLUB_NAME,
          ];
          
        }
      } else if (nextRowTypes.includes(RowType.ATTEMPT) && attemptColumns.length > 0 && isAttemptRow(row)) {
    	
        rowType = RowType.ATTEMPT;
        nextRowTypes = [RowType.RESULT, RowType.ATTEMPT_WIND, RowType.EVENT_HEADER];
        
      } else if (nextRowTypes.includes(RowType.ATTEMPT_WIND) && isAttemptWindRow(row)) {
    	  
    	rowType = RowType.ATTEMPT_WIND;
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER];
        
      } else if (nextRowTypes.includes(RowType.HEIGHT_HEADER) && isHeightHeaderRow(row)) {
        rowType = RowType.HEIGHT_HEADER;
        nextRowTypes = [RowType.RESULT, RowType.HEIGHT_HEADER];
        currentHeightColumns = [];
        heightColumns.push(currentHeightColumns);
      } else if (nextRowTypes.includes(RowType.HEIGHT) && isHeightRow(row)) {
        rowType = RowType.HEIGHT;
        nextRowTypes = [RowType.RESULT, RowType.HEIGHT, RowType.EVENT_HEADER];
        heightsRow += 1;
        currentHeightColumns = heightColumns[heightsRow];
      } else if (nextRowTypes.includes(RowType.COMBINED_RESULT) && isCombinedResultRow(row)) {
        rowType = RowType.COMBINED_RESULT;
        nextRowTypes = [RowType.COMBINED_WIND, RowType.COMBINED_POINTS];
      } else if (nextRowTypes.includes(RowType.COMBINED_WIND) && isCombinedWindRow(row)) {
        rowType = RowType.COMBINED_WIND;
        nextRowTypes = [RowType.COMBINED_POINTS];
      } else if (nextRowTypes.includes(RowType.COMBINED_POINTS) && isCombinedPointsRow(row)) {
        rowType = RowType.COMBINED_POINTS;
        nextRowTypes = [RowType.COMBINED_POINTS_SUM];
      } else if (nextRowTypes.includes(RowType.COMBINED_POINTS_SUM) && isCombinedPointsRow(row)) {
        rowType = RowType.COMBINED_POINTS_SUM;
        nextRowTypes = [RowType.RESULT, RowType.EVENT_HEADER];
      }

      currentColumn = 0;
      //check on special characters
      if (rowType == RowType.RESULT) {
    	  let invalidResult = false;
    	  for (let i = 0; i < row.length; i += 1) {
        	  if (row[i].text === 'n.a.'
        		  ||
        		  row[i].text === 'disq.'
        		  ||
            	  row[i].text === 'ogV'
            	  ||
                  row[i].text === 'abg.'
            	  ) {
        		  invalidResult = true;
        		  break;
        	  }
          }  
    	  
    	  if (invalidResult && isNaN(parseInt(row[1].text)) && !isNaN(parseInt(row[0].text))) {
    		  currentColumn = 1;  
    	  }
    	  
      }
      
      if (rowType == RowType.ATTEMPT) {
    	  validAttemptValues = {};
      }
      
      for (let i = 0; i < row.length; i += 1) {
        const element = row[i];
        const text = element.getText();
        switch (rowType) {
          case RowType.COMPETITION_NAME:
            tokens.push(new Token(TokenType.COMPETITION_NAME, text));
            break;
          case RowType.COMPETITION_INFO:
            if (text !== 'ERGEBNISSE' && text !== 'ERGEBNISLISTE') {
              tokens.push(...getCompetitionInfo(text));
            }
            break;
          case RowType.EVENT_HEADER:
            if (i === 0) {
              tokens.push(...getEventHeader(text));
            } else {
              tokens.push(...getEventInfo(text));
            }
            break;
          case RowType.EVENT_INFO:
            tokens.push(...getEventInfo(text));
            break;
          case RowType.RESULT_HEADER:
            resultColumns.push(new Column(element, columnAlignments[text], contentTypes[text]));
            resultColumnNames.push(text);
            break;
          case RowType.ATTEMPT_HEADER:
            attemptColumns.push(new Column(element, Alignment.CENTER, ContentType.RESULT));
            break;
          case RowType.RESULT:
            tokens.push(matchResultColumn(resultColumns, resultColumnNames, element, teamResult));
            break;
          case RowType.ATTEMPT:
            tokens.push(matchAttemptColumn(attemptColumns, element, false, validAttemptValues));
            break;
          case RowType.ATTEMPT_WIND:
        	let attemptToken = matchAttemptColumn(attemptColumns, element, true, validAttemptValues); 
        	if (attemptToken != undefined) {
        		 tokens.push(attemptToken);	
        	}
            break;
          case RowType.HEIGHT_HEADER:
            currentHeightColumns.push(new Column(element, Alignment.CENTER, ContentType.HEIGHT_RESULT));
            break;
          case RowType.HEIGHT:
            tokens.push(...matchHeightColumn(currentHeightColumns, element));
            break;
          case RowType.LONG_ATHLETE_NAME:
            updateLongName(tokens, TokenType.ATHLETE_FULL_NAME, text);
            break;
          case RowType.LONG_CLUB_NAME:
            updateLongName(tokens, TokenType.ATHLETE_CLUB_NAME, text);
            break;
          case RowType.LONG_TEAM_CLUB_NAME:
            if (i === 0) {
              updateLongName(tokens, TokenType.TEAM_NAME, text);
            } else if (i === 1) {
              updateLongName(tokens, TokenType.TEAM_CLUB_NAME, text);
            }
            break;
          case RowType.LONG_ATHLETE_CLUB_NAME:
            if (i === 0) {
              updateLongName(tokens, TokenType.ATHLETE_FULL_NAME, text);
            } else if (i === 1) {
              updateLongName(tokens, TokenType.ATHLETE_CLUB_NAME, text);
            }
            break;
          case RowType.COMMENT:
            if (lastRowType === RowType.COMMENT) {
              updateLongName(tokens, TokenType.COMMENT, text);
            } else {
              tokens.push(new Token(TokenType.COMMENT, text));
            }
            break;
          case RowType.TEAM_MEMBERS:
            tokens.push(...matchTeamMember(element, resultColumns));
            break;
          case RowType.TEAM_MEMBER_YOB:
            for (let j = tokens.length - 1; j >= 0; j -= 1) {
              const token = tokens[j];
              if (token.type === TokenType.ATHLETE_YOB && token.text === null) {
                token.text = text.substr(1, text.length - 2);
                break;
              }
            }
            break;
          case RowType.TEAM_RESULT_COMMENT:
            for (let j = tokens.length - 1; j >= 0; j -= 1) {
              const token = tokens[j];
              if (token.type === TokenType.COMMENT) {
                token.text = `${token.text} ${text}`;
                break;
              }
            }
            break;
          case RowType.SINGLE_RESULT_COMMENT:
            for (let j = tokens.length - 1; j >= 0; j -= 1) {
              const token = tokens[j];
              if (token.type === TokenType.COMMENT) {
                token.text = `${token.text} ${text}`;
                break;
              }
            }
            break;
          case RowType.SPLIT_HEADER:
            tokens.push(matchSplitHeader(element));
            break;
          case RowType.SPLIT_TIME:
            tokens.push(matchSplitTime(element, i));
            break;
          case RowType.COMBINED_HEADER:
            tokens.push(new Token(TokenType.COMBINED_DISCIPLINE, text));
            combinedColumns.push(new Column(element, Alignment.CENTER, ContentType.RESULT));
            break;
          case RowType.COMBINED_RESULT:
            if (!text.match(/\(-[0-9]{1,5}\)/)) {
              tokens.push(matchCombinedColumn(combinedColumns, element, TokenType.COMBINED_PERFORMANCE));
            }
            break;
          case RowType.COMBINED_WIND:
            tokens.push(matchCombinedColumn(combinedColumns, element, TokenType.COMBINED_WIND));
            break;
          case RowType.COMBINED_POINTS:
            tokens.push(matchCombinedColumn(combinedColumns, element, TokenType.COMBINED_POINTS));
            break;
          case RowType.COMBINED_POINTS_SUM:
            tokens.push(matchCombinedColumn(combinedColumns, element, TokenType.COMBINED_SUM));
            break;
          case RowType.COMBINED_TEAM_RESULT:
            tokens.push(...matchCombinedTeamResult(element));
            break;
          case RowType.COMBINED_TEAM_MEMBER_RESULT:
            tokens.push(matchCombinedTeamMemberResult(element));
            break;
          /* istanbul ignore next */
          default:
            console.log(`Row Type missing: ${text}`);
        }
      }

      lastRowType = rowType;
    }

    pageNo += 1;
  }

  tokens.push(new Token(TokenType.END));

  return tokens;
};
