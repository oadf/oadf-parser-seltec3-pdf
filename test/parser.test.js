import { expect } from 'chai';
import { graphql } from 'graphql';
import Parser from '../src/Parser';
import Token, { TYPES as Type } from '../src/Token';

function testResult(schema, query, expected, done) {
  graphql(schema, query).then((result) => {
    if (result.errors) {
      done(new Error(result.errors));
    } else {
      expect(result.data).to.deep.equal(expected);
      done();
    }
  }).catch(err => done(err));
}

describe('SELTEC 3 PDF Parser', () => {
  it('should handle the default case', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, '100m'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.GROUP_NUMBER, '1'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '12,34'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          name
          venue {
            name
            city
          }
          events {
            discipline {
              name
            }
            ageGroup {
              name
            }
            rounds {
              date
              time
              groups {
                number
                results {
                  ...AthleteResultFields
                  performance
                  position
                }
              }
            }
          }
        }
      }
      fragment AthleteResultFields on AthleteResult {
        athlete {
          firstName
          lastName
          yob
          bib
          club {
            name
          }
        }
      }
    `;

    const expected = {
      meeting: {
        name: 'Test Competition',
        venue: {
          name: 'Test',
          city: 'Test City',
        },
        events: [
          {
            discipline: {
              name: '100m',
            },
            ageGroup: {
              name: 'Men',
            },
            rounds: [
              {
                date: '01.01.2016',
                time: '12:45',
                groups: [
                  {
                    number: 1,
                    results: [
                      {
                        athlete: {
                          firstName: 'John',
                          lastName: 'Doe',
                          yob: 2000,
                          bib: '1',
                          club: {
                            name: 'Test Club',
                          },
                        },
                        performance: 12.34,
                        position: 1,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle discipline with additional info', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Shot Put'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '5000g'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '12,34'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            weight
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            weight: 5000,
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle group info', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Shot Put'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.GROUP_NUMBER, '1'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.GROUP_INFO, 'Test'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '12,34'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                comment
              }
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    comment: 'Test',
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle round name', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Shot Put'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ROUND_NAME, 'Final'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '12,34'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              name
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                name: 'Final',
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle two disciplines without result', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Shot Put'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.DISCIPLINE_NAME, 'Javelin'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '12,34'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            discipline {
              name
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            discipline: {
              name: 'Shot Put',
            },
          },
          {
            discipline: {
              name: 'Javelin',
            },
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle result without position', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Shot Put'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.GROUP_NUMBER, '1'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, 'DNF'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                results {
                  position
                }
              }
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    results: [
                      {
                        position: null,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle team result (relay)', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, '4x100m'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.TEAM_POSITION, '1'),
      new Token(Type.TEAM_NAME, 'Test Team'),
      new Token(Type.TEAM_COUNTRY, 'GER'),
      new Token(Type.TEAM_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '64,56'),
      new Token(Type.GROUP_NUMBER_PLACE, '1./I'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                results {
                  ...TeamResultFields
                  performance
                  position
                }
              }
            }
          }
        }
      }
      fragment TeamResultFields on TeamResult {
        club {
          name
        }
        teamMembers {
          athlete {
            bib
            firstName
            lastName
            yob
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    results: [
                      {
                        club: {
                          name: 'Test Club',
                        },
                        teamMembers: [
                          {
                            athlete: {
                              bib: '1',
                              firstName: 'John',
                              lastName: 'Doe',
                              yob: 2000,
                            },
                          },
                        ],
                        performance: 64.56,
                        position: 1,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle split times', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, '800m'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '12,34'),
      new Token(Type.GROUP_NUMBER_PLACE, '1./II'),
      new Token(Type.SPLIT_GROUP, '2'),
      new Token(Type.SPLIT_DISTANCE, '200m'),
      new Token(Type.SPLIT_TIME, '55,45'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_COUNTRY, 'GER'),
      new Token(Type.SPLIT_DISTANCE, '400m'),
      new Token(Type.SPLIT_TIME, '1:23,45'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_COUNTRY, 'GER'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                number
                splitTimes {
                  distance
                  time
                  athlete {
                    bib
                    firstName
                    lastName
                  }
                }
              }
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    number: 2,
                    splitTimes: [
                      {
                        distance: 200,
                        time: 55.45,
                        athlete: {
                          bib: '1',
                          firstName: 'John',
                          lastName: 'Doe',
                        },
                      },
                      {
                        distance: 400,
                        time: 83.45,
                        athlete: {
                          bib: '1',
                          firstName: 'John',
                          lastName: 'Doe',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle attempts', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Long Jump'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '5,75'),
      new Token(Type.WIND, '+0,1'),
      new Token(Type.ATTEMPT1, '5,56'),
      new Token(Type.ATTEMPT2, '5,75'),
      new Token(Type.ATTEMPT3, '-'),
      new Token(Type.ATTEMPT4, '5,50'),
      new Token(Type.ATTEMPT5, '-'),
      new Token(Type.ATTEMPT6, '-'),
      new Token(Type.ATTEMPT_WIND1, '+0,5'),
      new Token(Type.ATTEMPT_WIND2, '+0,1'),
      new Token(Type.ATTEMPT_WIND4, '+0,6'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                number
                results {
                  performance
                  ...AthleteResultFields
                }
              }
            }
          }
        }
      }
      fragment AthleteResultFields on AthleteResult {
        wind
        attempts {
          number
          performance
          wind
          exception
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    number: 1,
                    results: [
                      {
                        performance: 5.75,
                        wind: 0.1,
                        attempts: [
                          {
                            number: 1,
                            performance: 5.56,
                            wind: 0.5,
                            exception: null,
                          },
                          {
                            number: 2,
                            performance: 5.75,
                            wind: 0.1,
                            exception: null,
                          },
                          {
                            number: 3,
                            performance: null,
                            wind: null,
                            exception: '-',
                          },
                          {
                            number: 4,
                            performance: 5.50,
                            wind: 0.6,
                            exception: null,
                          },
                          {
                            number: 5,
                            performance: null,
                            wind: null,
                            exception: '-',
                          },
                          {
                            number: 6,
                            performance: null,
                            wind: null,
                            exception: '-',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle wind for group', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Long Jump'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ROUND_NAME, 'Zeitläufe'),
      new Token(Type.WIND, 'I:-0,3,II:+0,6'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '5,75'),
      new Token(Type.GROUP_NUMBER_PLACE, '1./I'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                number
                wind
              }
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    number: 1,
                    wind: -0.3,
                  },
                  {
                    number: 2,
                    wind: 0.6,
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle athlete with exception after attempts', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Long Jump'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '5,75'),
      new Token(Type.WIND, '+0,1'),
      new Token(Type.ATTEMPT1, '5,56'),
      new Token(Type.ATTEMPT2, '5,75'),
      new Token(Type.ATTEMPT3, '-'),
      new Token(Type.ATTEMPT4, '5,50'),
      new Token(Type.ATTEMPT5, '-'),
      new Token(Type.ATTEMPT6, '-'),
      new Token(Type.ATTEMPT_WIND1, '+0,5'),
      new Token(Type.ATTEMPT_WIND2, '+0,1'),
      new Token(Type.ATTEMPT_WIND4, '+0,6'),
      new Token(Type.ATHLETE_BIB, '2'),
      new Token(Type.ATHLETE_FULL_NAME, 'Mustermann Max'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, 'abg.'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                results {
                  performance
                  exception
                }
              }
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    results: [
                      {
                        performance: 5.75,
                        exception: null,
                      },
                      {
                        performance: null,
                        exception: 'DNF',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle a comment for relay result', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, '4x200m'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.TEAM_NAME, 'Teat Team'),
      new Token(Type.TEAM_COUNTRY, 'GER'),
      new Token(Type.TEAM_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, 'disq.'),
      new Token(Type.ATHLETE_BIB, '380'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_BIB, '388'),
      new Token(Type.ATHLETE_FULL_NAME, 'Mustermann Max'),
      new Token(Type.ATHLETE_YOB, '2001'),
      new Token(Type.COMMENT, 'Test'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                results {
                  comment
                }
              }
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    results: [
                      {
                        comment: 'Test',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle empty group at end of the page', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, '100m'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.GROUP_NUMBER, '1'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.GROUP_INFO, 'Test'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                number
                comment
              }
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    number: 1,
                    comment: 'Test',
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle a combined result', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Fünfkampf'),
      new Token(Type.AGE_GROUP_NAME, 'Männliche Jugend U18'),
      new Token(Type.EVENT_DATE, '17.09.2016'),
      new Token(Type.PARTICIPANT_COUNT, '1'),
      new Token(Type.ROUND_NAME, 'Finalstand'),
      new Token(Type.COMBINED_DISCIPLINE, '100'),
      new Token(Type.COMBINED_DISCIPLINE, 'WEI'),
      new Token(Type.COMBINED_DISCIPLINE, 'KUG'),
      new Token(Type.COMBINED_DISCIPLINE, 'HOC'),
      new Token(Type.COMBINED_DISCIPLINE, '400'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '155'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '2.813'),
      new Token(Type.COMBINED_PERFORMANCE, '12,33', '100'),
      new Token(Type.COMBINED_PERFORMANCE, '6,21', 'WEI'),
      new Token(Type.COMBINED_PERFORMANCE, '10,19', 'KUG'),
      new Token(Type.COMBINED_PERFORMANCE, '1,70', 'HOC'),
      new Token(Type.COMBINED_PERFORMANCE, '55,64', '400'),
      new Token(Type.COMBINED_WIND, '0,0', '100'),
      new Token(Type.COMBINED_POINTS, '557', '100'),
      new Token(Type.COMBINED_POINTS, '612', 'WEI'),
      new Token(Type.COMBINED_POINTS, '477', 'KUG'),
      new Token(Type.COMBINED_POINTS, '578', 'HOC'),
      new Token(Type.COMBINED_POINTS, '589', '400'),
      new Token(Type.COMBINED_SUM, '557', '100'),
      new Token(Type.COMBINED_SUM, '1.169', 'WEI'),
      new Token(Type.COMBINED_SUM, '1.646', 'KUG'),
      new Token(Type.COMBINED_SUM, '2.224', 'HOC'),
      new Token(Type.COMBINED_SUM, '2.813', '400'),
      new Token(Type.ATHLETE_POSITION, '2'),
      new Token(Type.ATHLETE_BIB, '156'),
      new Token(Type.ATHLETE_FULL_NAME, 'Mustermann Max'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '2.813'),
      new Token(Type.COMBINED_PERFORMANCE, '12,33', '100'),
      new Token(Type.COMBINED_PERFORMANCE, '6,21', 'WEI'),
      new Token(Type.COMBINED_PERFORMANCE, '10,19', 'KUG'),
      new Token(Type.COMBINED_PERFORMANCE, '1,70', 'HOC'),
      new Token(Type.COMBINED_PERFORMANCE, '55,64', '400'),
      new Token(Type.COMBINED_WIND, '0,0', '100'),
      new Token(Type.COMBINED_POINTS, '557', '100'),
      new Token(Type.COMBINED_POINTS, '612', 'WEI'),
      new Token(Type.COMBINED_POINTS, '477', 'KUG'),
      new Token(Type.COMBINED_POINTS, '578', 'HOC'),
      new Token(Type.COMBINED_POINTS, '589', '400'),
      new Token(Type.COMBINED_SUM, '557', '100'),
      new Token(Type.COMBINED_SUM, '1.169', 'WEI'),
      new Token(Type.COMBINED_SUM, '1.646', 'KUG'),
      new Token(Type.COMBINED_SUM, '2.224', 'HOC'),
      new Token(Type.COMBINED_SUM, '2.813', '400'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            combinedDisciplines {
              order
              discipline {
                name
              }
            }
            rounds {
              name
              groups {
                number
                results {
                   position
                   performance
                   ...AthleteResultFields
                }
              }
              combinedDiscipline {
                discipline {
                  name
                }
              }
            }
          }
        }
      }
      fragment AthleteResultFields on AthleteResultInterface {
        wind
        athlete {
          firstName
          lastName
          yob
          club {
            name
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            combinedDisciplines: [
              {
                order: 1,
                discipline: {
                  name: '100',
                },
              },
              {
                order: 2,
                discipline: {
                  name: 'WEI',
                },
              },
              {
                order: 3,
                discipline: {
                  name: 'KUG',
                },
              },
              {
                order: 4,
                discipline: {
                  name: 'HOC',
                },
              },
              {
                order: 5,
                discipline: {
                  name: '400',
                },
              },
            ],
            rounds: [
              {
                name: 'Finalstand',
                groups: [
                  {
                    number: 1,
                    results: [
                      {
                        position: 1,
                        performance: 2813,
                        wind: null,
                        athlete: {
                          firstName: 'John',
                          lastName: 'Doe',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                      {
                        position: 2,
                        performance: 2813,
                        wind: null,
                        athlete: {
                          firstName: 'Max',
                          lastName: 'Mustermann',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                    ],
                  },
                ],
                combinedDiscipline: null,
              },
              {
                name: '100',
                groups: [
                  {
                    number: 1,
                    results: [
                      {
                        position: null,
                        performance: 12.33,
                        wind: 0.0,
                        athlete: {
                          firstName: 'John',
                          lastName: 'Doe',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                      {
                        position: null,
                        performance: 12.33,
                        wind: 0.0,
                        athlete: {
                          firstName: 'Max',
                          lastName: 'Mustermann',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                    ],
                  },
                ],
                combinedDiscipline: {
                  discipline: {
                    name: '100',
                  },
                },
              },
              {
                name: 'WEI',
                groups: [
                  {
                    number: 1,
                    results: [
                      {
                        position: null,
                        performance: 6.21,
                        wind: null,
                        athlete: {
                          firstName: 'John',
                          lastName: 'Doe',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                      {
                        position: null,
                        performance: 6.21,
                        wind: null,
                        athlete: {
                          firstName: 'Max',
                          lastName: 'Mustermann',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                    ],
                  },
                ],
                combinedDiscipline: {
                  discipline: {
                    name: 'WEI',
                  },
                },
              },
              {
                name: 'KUG',
                groups: [
                  {
                    number: 1,
                    results: [
                      {
                        position: null,
                        performance: 10.19,
                        wind: null,
                        athlete: {
                          firstName: 'John',
                          lastName: 'Doe',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                      {
                        position: null,
                        performance: 10.19,
                        wind: null,
                        athlete: {
                          firstName: 'Max',
                          lastName: 'Mustermann',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                    ],
                  },
                ],
                combinedDiscipline: {
                  discipline: {
                    name: 'KUG',
                  },
                },
              },
              {
                name: 'HOC',
                groups: [
                  {
                    number: 1,
                    results: [
                      {
                        position: null,
                        performance: 1.70,
                        wind: null,
                        athlete: {
                          firstName: 'John',
                          lastName: 'Doe',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                      {
                        position: null,
                        performance: 1.70,
                        wind: null,
                        athlete: {
                          firstName: 'Max',
                          lastName: 'Mustermann',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                    ],
                  },
                ],
                combinedDiscipline: {
                  discipline: {
                    name: 'HOC',
                  },
                },
              },
              {
                name: '400',
                groups: [
                  {
                    number: 1,
                    results: [
                      {
                        position: null,
                        performance: 55.64,
                        wind: null,
                        athlete: {
                          firstName: 'John',
                          lastName: 'Doe',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                      {
                        position: null,
                        performance: 55.64,
                        wind: null,
                        athlete: {
                          firstName: 'Max',
                          lastName: 'Mustermann',
                          yob: 2000,
                          club: {
                            name: 'Test Club',
                          },
                        },
                      },
                    ],
                  },
                ],
                combinedDiscipline: {
                  discipline: {
                    name: '400',
                  },
                },
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle team result (combined)', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Zehnkampf Mannschaft'),
      new Token(Type.AGE_GROUP_NAME, 'Männer'),
      new Token(Type.TEAM_POSITION, '1'),
      new Token(Type.TEAM_CLUB_NAME, 'Test Club'),
      new Token(Type.TEAM_NUMBER, '1'),
      new Token(Type.PERFORMANCE, '2.970'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.PERFORMANCE, '787'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                results {
                  ...TeamResultFields
                  performance
                  position
                }
              }
            }
          }
        }
      }
      fragment TeamResultFields on TeamResult {
        club {
          name
        }
        teamMembers {
          athlete {
            firstName
            lastName
            yob
          }
          performance
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    results: [
                      {
                        club: {
                          name: 'Test Club',
                        },
                        teamMembers: [
                          {
                            athlete: {
                              firstName: 'John',
                              lastName: 'Doe',
                              yob: 2000,
                            },
                            performance: 787,
                          },
                        ],
                        performance: 2970,
                        position: 1,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle weight for result in group with different weights', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Shot Put'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.GROUP_NUMBER, '1'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.RESULT_WEIGHT, '5000g'),
      new Token(Type.PERFORMANCE, '12,34'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                results {
                  ...AthleteResultFields
                }
              }
            }
          }
        }
      }
      fragment AthleteResultFields on AthleteResult {
        weight
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    results: [
                      {
                        weight: 5000,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle manual timing', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, '50m'),
      new Token(Type.AGE_GROUP_NAME, 'Men'),
      new Token(Type.GROUP_NUMBER, '1'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '1'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '6,7*'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                results {
                  performance
                  automaticTiming
                }
              }
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    results: [
                      {
                        performance: 6.7,
                        automaticTiming: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle multiple results with height', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Hochsprung'),
      new Token(Type.AGE_GROUP_NAME, 'Jugend M14'),
      new Token(Type.GROUP_NUMBER, '1'),
      new Token(Type.EVENT_DATE, '05.02.2017'),
      new Token(Type.EVENT_TIME, '12:30'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '2'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2003'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '1,55'),
      new Token(Type.HEIGHT, '1,15'),
      new Token(Type.HEIGHT_RESULT, '-'),
      new Token(Type.HEIGHT, '1,20'),
      new Token(Type.HEIGHT_RESULT, '-'),
      new Token(Type.HEIGHT, '1,25'),
      new Token(Type.HEIGHT_RESULT, '-'),
      new Token(Type.HEIGHT, '1,28'),
      new Token(Type.HEIGHT_RESULT, '-'),
      new Token(Type.HEIGHT, '1,31'),
      new Token(Type.HEIGHT_RESULT, '-'),
      new Token(Type.HEIGHT, '1,34'),
      new Token(Type.HEIGHT_RESULT, '-'),
      new Token(Type.HEIGHT, '1,37'),
      new Token(Type.HEIGHT_RESULT, '-'),
      new Token(Type.HEIGHT, '1,40'),
      new Token(Type.HEIGHT_RESULT, 'O'),
      new Token(Type.HEIGHT, '1,43'),
      new Token(Type.HEIGHT_RESULT, 'O'),
      new Token(Type.HEIGHT, '1,46'),
      new Token(Type.HEIGHT_RESULT, 'O'),
      new Token(Type.HEIGHT, '1,49'),
      new Token(Type.HEIGHT_RESULT, 'O'),
      new Token(Type.HEIGHT, '1,52'),
      new Token(Type.HEIGHT_RESULT, 'O'),
      new Token(Type.HEIGHT, '1,55'),
      new Token(Type.HEIGHT_RESULT, 'XXO'),
      new Token(Type.HEIGHT, '1,60'),
      new Token(Type.HEIGHT_RESULT, 'XXX'),
      new Token(Type.ATHLETE_POSITION, '2'),
      new Token(Type.ATHLETE_BIB, '104'),
      new Token(Type.ATHLETE_FULL_NAME, 'Mustermann Max'),
      new Token(Type.ATHLETE_YOB, '2003'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '1,34'),
      new Token(Type.HEIGHT, '1,15'),
      new Token(Type.HEIGHT_RESULT, '-'),
      new Token(Type.HEIGHT, '1,20'),
      new Token(Type.HEIGHT_RESULT, 'O'),
      new Token(Type.HEIGHT, '1,25'),
      new Token(Type.HEIGHT_RESULT, 'O'),
      new Token(Type.HEIGHT, '1,28'),
      new Token(Type.HEIGHT_RESULT, 'O'),
      new Token(Type.HEIGHT, '1,31'),
      new Token(Type.HEIGHT_RESULT, 'XO'),
      new Token(Type.HEIGHT, '1,34'),
      new Token(Type.HEIGHT_RESULT, 'O'),
      new Token(Type.HEIGHT, '1,37'),
      new Token(Type.HEIGHT_RESULT, 'XXX'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                results {
                  performance
                  ...AthleteResultFields
                }
              }
            }
          }
        }
      }
      fragment AthleteResultFields on AthleteResult {
        athlete {
          firstName
          lastName
        }
        heights {
          height {
            height
          }
          performance
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    results: [
                      {
                        performance: 1.55,
                        athlete: {
                          firstName: 'John',
                          lastName: 'Doe',
                        },
                        heights: [
                          {
                            height: {
                              height: 1.15,
                            },
                            performance: '-',
                          },
                          {
                            height: {
                              height: 1.20,
                            },
                            performance: '-',
                          },
                          {
                            height: {
                              height: 1.25,
                            },
                            performance: '-',
                          },
                          {
                            height: {
                              height: 1.28,
                            },
                            performance: '-',
                          },
                          {
                            height: {
                              height: 1.31,
                            },
                            performance: '-',
                          },
                          {
                            height: {
                              height: 1.34,
                            },
                            performance: '-',
                          },
                          {
                            height: {
                              height: 1.37,
                            },
                            performance: '-',
                          },
                          {
                            height: {
                              height: 1.40,
                            },
                            performance: 'O',
                          },
                          {
                            height: {
                              height: 1.43,
                            },
                            performance: 'O',
                          },
                          {
                            height: {
                              height: 1.46,
                            },
                            performance: 'O',
                          },
                          {
                            height: {
                              height: 1.49,
                            },
                            performance: 'O',
                          },
                          {
                            height: {
                              height: 1.52,
                            },
                            performance: 'O',
                          },
                          {
                            height: {
                              height: 1.55,
                            },
                            performance: 'XXO',
                          },
                          {
                            height: {
                              height: 1.60,
                            },
                            performance: 'XXX',
                          },
                        ],
                      },
                      {
                        performance: 1.34,
                        athlete: {
                          firstName: 'Max',
                          lastName: 'Mustermann',
                        },
                        heights: [
                          {
                            height: {
                              height: 1.15,
                            },
                            performance: '-',
                          },
                          {
                            height: {
                              height: 1.20,
                            },
                            performance: 'O',
                          },
                          {
                            height: {
                              height: 1.25,
                            },
                            performance: 'O',
                          },
                          {
                            height: {
                              height: 1.28,
                            },
                            performance: 'O',
                          },
                          {
                            height: {
                              height: 1.31,
                            },
                            performance: 'XO',
                          },
                          {
                            height: {
                              height: 1.34,
                            },
                            performance: 'O',
                          },
                          {
                            height: {
                              height: 1.37,
                            },
                            performance: 'XXX',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle comment between result and attempts', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Javelin Throw'),
      new Token(Type.AGE_GROUP_NAME, 'M'),
      new Token(Type.DISCIPLINE_ADDITIONAL_INFO, '800g'),
      new Token(Type.GROUP_NUMBER, '1'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '36'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_COUNTRY, 'GER'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '29,74'),
      new Token(Type.COMMENT, 'Comment'),
      new Token(Type.ATTEMPT1, '28,66'),
      new Token(Type.ATTEMPT2, '29,05'),
      new Token(Type.ATTEMPT3, '29,74'),
      new Token(Type.ATTEMPT4, '27,35'),
      new Token(Type.ATTEMPT5, '29,34'),
      new Token(Type.ATTEMPT6, 'x'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                results {
                  comment
                }
              }
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    results: [
                      {
                        comment: 'Comment',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });

  it('should handle points is single result list', (done) => {
    const tokens = [
      new Token(Type.COMPETITION_NAME, 'Test Competition'),
      new Token(Type.COMPETITION_CITY, 'Test City'),
      new Token(Type.COMPETITION_VENUE, 'Test'),
      new Token(Type.COMPETITION_START_DATE, '01.01.2016'),
      new Token(Type.DISCIPLINE_NAME, 'Javelin Throw'),
      new Token(Type.AGE_GROUP_NAME, 'M'),
      new Token(Type.EVENT_DATE, '01.01.2016'),
      new Token(Type.EVENT_TIME, '12:45'),
      new Token(Type.ROUND_NAME, 'Test'),
      new Token(Type.ATHLETE_POSITION, '1'),
      new Token(Type.ATHLETE_BIB, '36'),
      new Token(Type.ATHLETE_FULL_NAME, 'Doe John'),
      new Token(Type.ATHLETE_YOB, '2000'),
      new Token(Type.ATHLETE_COUNTRY, 'GER'),
      new Token(Type.ATHLETE_CLUB_NAME, 'Test Club'),
      new Token(Type.PERFORMANCE, '29,74'),
      new Token(Type.GROUP_NUMBER_PLACE, '1./I'),
      new Token(Type.POINTS, '363'),
      new Token(Type.END),
    ];

    const parser = new Parser(tokens);
    const store = parser.parse();
    const query = `
      query TestQuery {
        meeting(id: 1) {
          events {
            rounds {
              groups {
                results {
                  performance
                }
              }
            }
          }
        }
      }
    `;

    const expected = {
      meeting: {
        events: [
          {
            rounds: [
              {
                groups: [
                  {
                    results: [
                      {
                        performance: 29.74,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    testResult(store.getSchema(), query, expected, done);
  });
});
