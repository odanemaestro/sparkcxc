// Generated from the audited SPARK Practice Papers E-J.
// Six 100-mark papers, 60 question templates, authored M/A/B schemes and rich workspaces.
export const PAPER2_QUESTION_BANK_EJ = [
  {
    "question_id": "p2e-q1",
    "question_number": 1,
    "paper": "SPARK Practice Paper E",
    "section": "I",
    "topic": "Number theory and computation",
    "marks": 9,
    "stem": "Hardware and Home advertises a gas stove at a marked price of $4,800.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (2 3/4 + 5/6) ÷ (7/8 - 1/3), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "86/13",
        "solution": "2 3/4 = 11/4, so the numerator is 11/4 + 5/6 = 43/12. The denominator is 7/8 - 1/3 = 13/24. Dividing means multiplying by the reciprocal: 43/12 x 24/13 = 86/13.",
        "cao": true,
        "requiredForm": "simplified_fraction",
        "accepted": [
          "6 8/13"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the numerator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                3.5833333333333335
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the denominator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                0.5416666666666666
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the exact value in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 6.615384615384615,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "A discount of 15% is offered for payment in cash. Calculate the cash price of the gas stove.",
        "marks": 2,
        "answer": "4080.00",
        "solution": "The discount is 15% of $4,800 = $720.00. The cash price is $4,800 - $720.00 = $4,080.00.",
        "prefix": "$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds 15% of $4,800",
            "check": {
              "type": "contains",
              "value": [
                720.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the cash price",
            "check": {
              "type": "numeric",
              "value": 4080.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Value Added Tax of 12.5% is then added to the cash price. Calculate the amount the customer actually pays.",
        "marks": 2,
        "answer": "4590.00",
        "solution": "VAT = 12.5% of $4,080.00 = $510.00. The customer pays $4,080.00 + $510.00 = $4,590.00.",
        "prefix": "$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds 12.5% of the cash price",
            "check": {
              "type": "contains",
              "value": [
                510.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the amount paid",
            "check": {
              "type": "numeric",
              "value": 4590.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b1"
              ],
              "formula": "b1 * 1.125"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The gas stove may instead be bought on hire purchase, by paying a deposit of $900 and 12 monthly instalments of $385. Calculate how much MORE than the amount in (b) (ii) is paid under this arrangement.",
        "marks": 2,
        "answer": "930.00",
        "solution": "The hire purchase price is $900 + 12 x $385 = $900 + $4,620 = $5,520.00. That is $5,520.00 - $4,590.00 = $930.00 more.",
        "prefix": "$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the total hire purchase price",
            "check": {
              "type": "contains",
              "value": [
                5520.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the extra amount paid",
            "check": {
              "type": "numeric",
              "value": 930.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b2"
              ],
              "formula": "5520.0 - b2"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q1-EJ-A",
    "source": "SPARK Practice Paper E original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2e-q2",
    "question_number": 2,
    "paper": "SPARK Practice Paper E",
    "section": "I",
    "topic": "Algebra",
    "marks": 9,
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Given that T = (3a^2 - 2b)/(a + b), calculate the value of T when a = 4 and b = -2.",
        "marks": 2,
        "answer": "26",
        "solution": "Substituting a = 4 and b = -2: the numerator is 3(4)^2 - 2(-2) = 48 + 4 = 52, and the denominator is (4) + (-2) = 4 - 2 = 2. So T = 52/2 = 26.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes a = 4 and b = -2 into the formula",
            "check": {
              "type": "contains",
              "value": [
                4.0,
                -2.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of T",
            "check": {
              "type": "numeric",
              "value": 26.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Expand and simplify (2x - 3)(x + 5).",
        "marks": 2,
        "answer": "2x^2 + 7x - 15",
        "solution": "Multiplying each term in the first bracket by each term in the second: (2x - 3)(x + 5) = 2x^2 + 10x - 3x - 15. Collecting the two terms in x: 2x^2 + 7x - 15.",
        "answerType": "expression",
        "accepted": [
          "2x^2 - 15 + 7x"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies out to give the four products",
            "check": {
              "type": "contains",
              "value": [
                10.0,
                3.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expansion in its simplest form",
            "check": {
              "type": "expression",
              "value": "2x^2 + 7x - 15",
              "accepted": [
                "2x^2 - 15 + 7x"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Factorise COMPLETELY: 4x^2 - 25y^2",
        "marks": 2,
        "answer": "(2x - 5y)(2x + 5y)",
        "solution": "4x^2 - 25y^2 is a difference of two squares: 4x^2 - 25y^2 = (2x)^2 - (5y)^2 = (2x - 5y)(2x + 5y).",
        "answerType": "expression",
        "requiredForm": "factorised",
        "accepted": [
          "(2x + 5y)(2x - 5y)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "recognises the difference of two squares",
            "check": {
              "type": "method",
              "any": [
                "difference of two squares"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the complete factorisation",
            "check": {
              "type": "expression",
              "value": "(2x - 5y)(2x + 5y)",
              "accepted": [
                "(2x + 5y)(2x - 5y)"
              ],
              "requireFactorised": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Solve the inequality 5x - 3 > 2x + 8, and state the SMALLEST integer value of x that satisfies it.",
        "marks": 3,
        "answer": "x > 11/3; the smallest integer value of x is 4",
        "solution": "5x - 3 > 2x + 8. Collecting the terms in x on one side and the numbers on the other: 3x > 11. Dividing both sides by 3: x > 11/3. Since 11/3 lies between 3 and 4, the smallest integer value of x that satisfies the inequality is 4.",
        "accepted": [
          "x > 3 2/3; the smallest integer value of x is 4",
          "x > 11/3, x = 4"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "collects the terms in x on one side",
            "check": {
              "type": "contains",
              "value": [
                3.0,
                11.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "solves the inequality",
            "check": {
              "type": "inequality",
              "value": "x > 11/3"
            },
            "field": "all",
            "code": "A1",
            "depends": [
              "M1"
            ]
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states the smallest integer value of x",
            "check": {
              "type": "numeric",
              "value": 4.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      }
    ],
    "design": "Q2-EJ-A",
    "source": "SPARK Practice Paper E original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2e-q3",
    "question_number": 3,
    "paper": "SPARK Practice Paper E",
    "section": "I",
    "topic": "Relations, functions and graphs",
    "marks": 9,
    "stem": "A(-4, -1) and B(2, 8) are two points in the Cartesian plane.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "On the grid provided, plot the points A(-4, -1) and B(2, 8).",
        "marks": 2,
        "answer": "A(-4, -1) and B(2, 8) correctly plotted",
        "solution": "A(-4, -1) is 4 units to the left of the y-axis and 1 unit below the x-axis. B(2, 8) is 2 units to the right of the y-axis and 8 units above the x-axis. Each point is marked where those two grid lines cross.",
        "responseType": "graph",
        "grid": {
          "xMin": -6,
          "xMax": 6,
          "yMin": -4,
          "yMax": 10,
          "xStep": 1,
          "yStep": 1,
          "minorPerStep": 2,
          "xLabel": "x",
          "yLabel": "y",
          "tools": [
            "point"
          ]
        },
        "graph": {
          "points": [
            {
              "x": -4,
              "y": -1
            },
            {
              "x": 2,
              "y": 8
            }
          ],
          "tolerance": 0.25,
          "pointMarks": 2
        },
        "answerType": "text",
        "responseSchema": {
          "type": "graph",
          "graph": {
            "xMin": -6,
            "xMax": 6,
            "yMin": -4,
            "yMax": 10,
            "xStep": 1,
            "yStep": 1,
            "minorPerStep": 2,
            "snapX": 0.25,
            "snapY": 0.25,
            "xLabel": "x",
            "yLabel": "y",
            "tools": [
              "point"
            ],
            "mode": "curve"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  -4,
                  -1
                ],
                [
                  2,
                  8
                ]
              ],
              "tolerance": [
                0.25,
                0.25
              ],
              "proportional": true,
              "label": "Accurate plotted points"
            }
          ]
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the coordinates of the midpoint of AB.",
        "marks": 2,
        "answer": "(-1, 7/2)",
        "solution": "The midpoint of AB is ((-4) + (2))/2 for the x-coordinate and ((-1) + (8))/2 for the y-coordinate. Now (-4) + (2) = -2 and (-1) + (8) = 7, so the midpoint of AB is (-1, 7/2).",
        "answerType": "coordinate",
        "accepted": [
          "(-1, 3.5)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "adds the two x-coordinates and the two y-coordinates, and halves each sum",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    -2.0,
                    7.0
                  ]
                },
                {
                  "type": "coordinate",
                  "value": [
                    -1.0,
                    3.5
                  ],
                  "tolerance": 1e-06
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the coordinates of the midpoint",
            "check": {
              "type": "coordinate",
              "value": [
                -1.0,
                3.5
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the gradient of AB.",
        "marks": 2,
        "answer": "3/2",
        "solution": "The gradient of AB is (the change in y)/(the change in x). The change in y is (8) - (-1) = 9 and the change in x is (2) - (-4) = 6, so the gradient of AB is 9/6 = 3/2.",
        "accepted": [
          "1.5"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses gradient = (y2 - y1)/(x2 - x1)",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    9.0,
                    6.0
                  ]
                },
                {
                  "type": "numeric",
                  "value": 1.5,
                  "tolerance": 1e-06
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the gradient of AB",
            "check": {
              "type": "numeric",
              "value": 1.5,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the equation of the line AB, giving your answer in the form y = mx + c.",
        "marks": 3,
        "answer": "y = (3/2)x + 5",
        "solution": "The gradient is m = 3/2. Substituting m = 3/2 and the point A(-4, -1) into y = mx + c gives (-1) = (3/2)(-4) + c, that is (-1) = -6 + c, so c = (-1) - (-6) = 5. The equation of the line AB is y = (3/2)x + 5.",
        "answerType": "expression",
        "accepted": [
          "y = 3/2x + 5",
          "y = 1.5x + 5"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes the gradient and the coordinates of a point on the line into y = mx + c",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "method",
                  "any": [
                    "y = mx + c",
                    "substituting"
                  ]
                },
                {
                  "type": "equation",
                  "value": "y = (3/2)x + 5"
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of the intercept c",
            "check": {
              "type": "contains",
              "value": [
                5.0
              ]
            },
            "field": "all",
            "ecf": {
              "uses": [
                "c"
              ],
              "formula": "(-1) - c * (-4)"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the equation of AB in the form y = mx + c",
            "check": {
              "type": "equation",
              "value": "y = (3/2)x + 5"
            },
            "field": "answer",
            "code": "A2",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q3-EJ-A",
    "source": "SPARK Practice Paper E original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2e-q4",
    "question_number": 4,
    "paper": "SPARK Practice Paper E",
    "section": "I",
    "topic": "Measurement and construction",
    "marks": 9,
    "stem": "The line AB, 9 cm long, is already drawn on the construction pad.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Using only a ruler and a pair of compasses, construct triangle ABC in which AB = 9 cm, BC = 6 cm and AC = 7 cm. Your construction arcs must be clearly shown.",
        "marks": 3,
        "answer": "triangle ABC with AB = 9 cm, BC = 6 cm and AC = 7 cm, with the arcs that locate C clearly shown",
        "solution": "AB = 9 cm is given. Open the compasses to 7 cm; with centre A draw an arc above AB. Without changing the drawing, open the compasses to 6 cm; with centre B draw a second arc to cut the first at C. Join AC and BC with the ruler. The two arcs must be left on the page - they are the mark for the construction.",
        "responseType": "construction",
        "pad": {
          "width": 560,
          "height": 340,
          "unitsPerCm": 40,
          "given": [
            {
              "id": "A",
              "x": 2.0,
              "y": 2.0
            },
            {
              "id": "B",
              "x": 11.0,
              "y": 2.0
            }
          ],
          "givenSegments": [
            [
              "A",
              "B"
            ]
          ]
        },
        "construction": {
          "construction": "triangle",
          "args": [
            {
              "A": {
                "id": "A",
                "x": 2.0,
                "y": 2.0
              },
              "B": {
                "id": "B",
                "x": 11.0,
                "y": 2.0
              },
              "sides": {
                "AB": 9,
                "BC": 6,
                "AC": 7
              }
            }
          ]
        },
        "answerType": "text",
        "responseSchema": {
          "type": "construction",
          "pad": {
            "width": 560,
            "height": 340,
            "unitsPerCm": 40,
            "given": [
              {
                "id": "A",
                "x": 2.0,
                "y": 2.0
              },
              {
                "id": "B",
                "x": 11.0,
                "y": 2.0
              }
            ],
            "givenSegments": [
              [
                "A",
                "B"
              ]
            ]
          },
          "construction": {
            "construction": "triangle",
            "args": [
              {
                "A": {
                  "id": "A",
                  "x": 2.0,
                  "y": 2.0
                },
                "B": {
                  "id": "B",
                  "x": 11.0,
                  "y": 2.0
                },
                "sides": {
                  "AB": 9,
                  "BC": 6,
                  "AC": 7
                }
              }
            ],
            "marks": 3
          },
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "allowProtractor": false
        }
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "State the perimeter of triangle ABC.",
        "marks": 1,
        "answer": "22",
        "solution": "The three sides are 9 cm, 6 cm and 7 cm, so the perimeter is 9 + 6 + 7 = 22 cm.",
        "suffix": " cm",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the perimeter of the triangle",
            "check": {
              "type": "numeric",
              "value": 22.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Measure and state the size of angle ABC in your construction, correct to the nearest degree.",
        "marks": 2,
        "answer": "51",
        "solution": "Measuring angle ABC with a protractor gives 51°. (A check by the cosine rule: cos B = (9^2 + 6^2 - 7^2)/(2 x 9 x 6) = 68/108, so angle ABC = 51.0°.) A reading within 5° of that earns the first mark and a reading within 2° earns the second.",
        "suffix": "°",
        "tolerance": 2.5,
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "a reading within 5° of the correct value",
            "check": {
              "type": "numeric",
              "value": 50.977197434767156,
              "tolerance": 5.5
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "the value correct to within 2°",
            "check": {
              "type": "numeric",
              "value": 50.977197434767156,
              "tolerance": 2.5
            },
            "field": "answer",
            "depends": [],
            "code": "B2"
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The diagram below, not drawn to scale, shows a plane figure made up of the rectangle ABCD, which is 14 cm long and 7 cm wide, together with a semicircle drawn on the end BC as diameter. [In this question, take π = 22/7.] Calculate the TOTAL area of the figure.",
        "marks": 3,
        "answer": "117.25",
        "solution": "Area of the rectangle = 14 x 7 = 98 cm^2. The semicircle has diameter 7 cm, so its radius is 3.5 cm. Area of the semicircle = (1/2) x π x r^2 = (1/2) x 22/7 x 3.5^2 = (1/2) x 22/7 x 12.25 = 19.25 cm^2. Total area = 98 + 19.25 = 117.25 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 232\" width=\"100%\" style=\"max-width:372px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M58 62 L282 62 A56.0 56.0 0 0 1 282 174 L58 174 Z\" stroke-width=\"1.8\"/><path d=\"M282 62 L282 174\" stroke-dasharray=\"5 4\" stroke-width=\"1.2\"/><text x=\"170.0\" y=\"198.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">14 cm</text><text x=\"46.0\" y=\"118.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">7 cm</text><text x=\"48.0\" y=\"54.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">A</text><text x=\"282.0\" y=\"50.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">B</text><text x=\"282.0\" y=\"196.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">C</text><text x=\"48.0\" y=\"196.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">D</text></svg>",
          "alt": "A plane figure made up of a rectangle ABCD with a semicircle on one end. A is the top left corner, B the top right, C the bottom right and D the bottom left. The rectangle is 14 cm long, marked along the bottom edge DC, and 7 cm wide, marked at the left-hand end AD. The end BC, shown as a broken line, is the diameter of a semicircle that bulges outwards to the right of the rectangle. The diagram is not drawn to scale."
        },
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the area of the rectangle",
            "check": {
              "type": "contains",
              "value": [
                98.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the area of the semicircle as (1/2) x pi x r^2",
            "check": {
              "type": "contains",
              "value": [
                19.25
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the total area of the figure",
            "check": {
              "type": "numeric",
              "value": 117.25,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      }
    ],
    "design": "Q4-EJ-A",
    "source": "SPARK Practice Paper E original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2e-q5",
    "question_number": 5,
    "paper": "SPARK Practice Paper E",
    "section": "I",
    "topic": "Statistics and probability",
    "marks": 9,
    "stem": "The table below shows the number of text messages sent in one day by 40 students.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table below.",
        "marks": 3,
        "answer": "25.5, 35.5, 45.5; 357, 248.5, 136.5",
        "solution": "The mid-interval value is the mean of the class boundaries, and f x is the frequency times that value: (21 + 30)/2 = 25.5, 14 x 25.5 = 357; (31 + 40)/2 = 35.5, 7 x 35.5 = 248.5; (41 + 50)/2 = 45.5, 3 x 45.5 = 136.5.",
        "responseType": "table",
        "table": {
          "caption": "The mid-interval value of a class is the mean of its two boundaries.",
          "headers": [
            "Number of messages",
            "Frequency",
            "Mid-interval value",
            "f x"
          ],
          "rows": [
            [
              "1 - 10",
              "6",
              "5.5",
              "33"
            ],
            [
              "11 - 20",
              "10",
              "15.5",
              "155"
            ],
            [
              "21 - 30",
              "14",
              {
                "blank": true,
                "key": "m2"
              },
              {
                "blank": true,
                "key": "p2"
              }
            ],
            [
              "31 - 40",
              "7",
              {
                "blank": true,
                "key": "m3"
              },
              {
                "blank": true,
                "key": "p3"
              }
            ],
            [
              "41 - 50",
              "3",
              {
                "blank": true,
                "key": "m4"
              },
              {
                "blank": true,
                "key": "p4"
              }
            ]
          ],
          "marks": 3,
          "cells": {
            "m2": {
              "type": "numeric",
              "value": 25.5,
              "marks": 1,
              "description": "mid-interval value of 21 - 30"
            },
            "m3": {
              "type": "numeric",
              "value": 35.5,
              "marks": 0,
              "description": "mid-interval value of 31 - 40"
            },
            "m4": {
              "type": "numeric",
              "value": 45.5,
              "marks": 0,
              "description": "mid-interval value of 41 - 50"
            },
            "p2": {
              "type": "numeric",
              "value": 357.0,
              "marks": 0,
              "description": "f x for 21 - 30"
            },
            "p3": {
              "type": "numeric",
              "value": 248.5,
              "marks": 1,
              "description": "f x for 31 - 40"
            },
            "p4": {
              "type": "numeric",
              "value": 136.5,
              "marks": 1,
              "description": "f x for 41 - 50"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The mid-interval value of a class is the mean of its two boundaries.",
          "headers": [
            "Number of messages",
            "Frequency",
            "Mid-interval value",
            "f x"
          ],
          "rows": [
            [
              "1 - 10",
              "6",
              "5.5",
              "33"
            ],
            [
              "11 - 20",
              "10",
              "15.5",
              "155"
            ],
            [
              "21 - 30",
              "14",
              {
                "key": "m2",
                "answer": "25.5",
                "answerType": "numeric",
                "marks": 1,
                "description": "mid-interval value of 21 - 30"
              },
              {
                "key": "p2",
                "answer": "357.0",
                "answerType": "numeric",
                "marks": 0,
                "description": "f x for 21 - 30"
              }
            ],
            [
              "31 - 40",
              "7",
              {
                "key": "m3",
                "answer": "35.5",
                "answerType": "numeric",
                "marks": 0,
                "description": "mid-interval value of 31 - 40"
              },
              {
                "key": "p3",
                "answer": "248.5",
                "answerType": "numeric",
                "marks": 1,
                "description": "f x for 31 - 40"
              }
            ],
            [
              "41 - 50",
              "3",
              {
                "key": "m4",
                "answer": "45.5",
                "answerType": "numeric",
                "marks": 0,
                "description": "mid-interval value of 41 - 50"
              },
              {
                "key": "p4",
                "answer": "136.5",
                "answerType": "numeric",
                "marks": 1,
                "description": "f x for 41 - 50"
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the modal class.",
        "marks": 1,
        "answer": "21 - 30",
        "solution": "The class 21 - 30 has the highest frequency, 14.",
        "answerType": "text",
        "accepted": [
          "21-30"
        ],
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the modal class",
            "check": {
              "type": "set",
              "value": [
                21.0,
                30.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate an ESTIMATE of the mean, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "23.3",
        "solution": "Use the mid-interval values 5.5, 15.5, 25.5, 35.5, 45.5. The sum of f x is 33 + 155 + 357 + 248.5 + 136.5 = 930. The estimated mean is 930/40 = 23.3.",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the mid-interval values",
            "check": {
              "type": "contains",
              "value": [
                45.5
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the sum of f x",
            "check": {
              "type": "contains",
              "value": [
                930.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the estimated mean",
            "check": {
              "type": "numeric",
              "value": 23.25,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 40 values is chosen at random. Determine the probability that it is AT LEAST 21. Give your answer as a fraction in its lowest terms.",
        "marks": 2,
        "answer": "3/5",
        "solution": "24 of the 40 values are at least 21, so the probability is 24/40 = 3/5.",
        "requiredForm": "simplified_fraction",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds how many are at least 21",
            "check": {
              "type": "contains",
              "value": [
                24.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the probability in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 0.6,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q5-EJ-A",
    "source": "SPARK Practice Paper E original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2e-q6",
    "question_number": 6,
    "paper": "SPARK Practice Paper E",
    "section": "I",
    "topic": "Geometry and trigonometry",
    "marks": 9,
    "stem": "The diagram below, not drawn to scale, shows a circle with centre O. The points A, B and C lie on the circumference, AB is a chord, and OA and OB are radii. Angle OAB = 30°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the value of y, the size of angle AOB.",
        "marks": 2,
        "answer": "120",
        "solution": "OA and OB are radii of the same circle, so OA = OB and triangle OAB is isosceles. Hence angle OBA = angle OAB = 30°. The angles of a triangle add up to 180°, so y = 180 - 30 - 30 = 120°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses OA = OB, so angle OBA = angle OAB",
            "check": {
              "type": "method",
              "any": [
                "isosceles",
                "radii",
                "radius"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the size of angle AOB",
            "check": {
              "type": "numeric",
              "value": 120.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the value of x, the size of angle ACB.",
        "marks": 2,
        "answer": "60",
        "solution": "Angle AOB at the centre and angle ACB at the circumference both stand on the same arc AB. The angle at the centre is twice the angle at the circumference, so x = 120° / 2 = 60°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the angle at the centre is twice the angle at the circumference",
            "check": {
              "type": "method",
              "any": [
                "twice the angle at the circumference",
                "angle at the centre"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the size of angle ACB",
            "check": {
              "type": "numeric",
              "value": 60.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "a / 2"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Give a reason for your answer in (b), naming the circle theorem that you used.",
        "marks": 2,
        "answer": "The angle at the centre is twice the angle at the circumference when both angles stand on the same arc AB, so angle ACB is half of angle AOB, giving x = 60 degrees.",
        "solution": "Angle AOB and angle ACB both stand on the arc AB, one at the centre and one at the circumference. The theorem the angle at the centre is twice the angle at the circumference standing on the same arc gives angle ACB = 120° / 2 = 60°. Naming the theorem earns 1 mark and saying that the two angles stand on the same arc AB earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "theorem",
            "marks": 1,
            "description": "names the theorem: the angle at the centre is twice the angle at the circumference",
            "any": [
              "angle at the centre is twice the angle at the circumference",
              "twice the angle at the circumference",
              "centre is twice"
            ]
          },
          {
            "id": "arc",
            "marks": 1,
            "description": "states that the two angles stand on the same arc",
            "any": [
              "same arc",
              "same segment",
              "arc ab"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "names the theorem: the angle at the centre is twice the angle at the circumference",
            "check": {
              "type": "written",
              "id": "theorem",
              "description": "names the theorem: the angle at the centre is twice the angle at the circumference",
              "any": [
                "angle at the centre is twice the angle at the circumference",
                "twice the angle at the circumference",
                "centre is twice"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states that the two angles stand on the same arc",
            "check": {
              "type": "written",
              "id": "arc",
              "description": "states that the two angles stand on the same arc",
              "any": [
                "same arc",
                "same segment",
                "arc ab"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "[In this question, take π = 22/7.] The radius OA is 21 cm. Calculate the area of the minor sector OAB.",
        "marks": 3,
        "answer": "462",
        "solution": "The angle of the sector at the centre is 120°, so the sector is 120/360 = 1/3 of the circle. Area of sector = (120/360) x π x r^2 = (1/3) x (22/7) x 21^2 = (1/3) x (22/7) x 441 = 462 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses area of a sector = (angle/360) x pi x r^2",
            "check": {
              "type": "method",
              "any": [
                "/360",
                "sector"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes r = 21 and pi = 22/7",
            "check": {
              "type": "contains",
              "value": [
                441.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the area of the sector",
            "check": {
              "type": "numeric",
              "value": 462.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "a * 3.85"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 310 300\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"152\" cy=\"152\" r=\"107\"/><path d=\"M152 44 L74 226 M152 44 L230 226\"/><path d=\"M152 152 L74 226 M152 152 L230 226 M74 226 L230 226\"/><path d=\"M138.6 75.3 A34 34 0 0 0 165.4 75.3\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"152.0\" y=\"62.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">x&#176;</text><path d=\"M125.9 176.8 A36 36 0 0 0 178.1 176.8\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"152.0\" y=\"171.8\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">y&#176;</text><circle cx=\"152\" cy=\"152\" r=\"2.8\" fill=\"currentColor\"/><text x=\"152.0\" y=\"28.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">C</text><text x=\"56.0\" y=\"236.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"248.0\" y=\"236.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"168.0\" y=\"148.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text></svg>",
      "alt": "A circle with centre O. The points A and B lie on the circumference with the chord AB drawn and the radii OA and OB drawn, and C lies on the major arc with CA and CB drawn. Angle ACB at the circumference is marked x and angle AOB at the centre is marked y. Angle OAB is 30 degrees. The diagram is not drawn to scale."
    },
    "design": "Q6-EJ-A",
    "source": "SPARK Practice Paper E original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2e-q7",
    "question_number": 7,
    "paper": "SPARK Practice Paper E",
    "section": "I",
    "topic": "Sequences, patterns and investigation",
    "marks": 10,
    "stem": "The diagrams below show the first three figures in a sequence of triangular patterns made from dots. The top row of every figure has 1 dot, each row below it has one more dot than the row above, and Figure n has n rows. Study the patterns of dots and answer the questions that follow.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Complete the table below, giving the number of dots in Figure 4, in Figure 5, in Figure 10 and in Figure n.",
        "marks": 4,
        "answer": "10, 15, 55, n(n + 1)/2",
        "solution": "The number of dots in Figure n is n(n + 1)/2. Figure 4 has 10 dots and Figure 5 has 15 dots, each found by continuing the pattern or by using the rule. Figure 10 has 55 dots. In Figure n there are n(n + 1)/2 dots, which checks against the table: for n = 3 it gives 6.",
        "responseType": "table",
        "table": {
          "caption": "The number of dots in each figure.",
          "headers": [
            "Figure",
            "Number of dots"
          ],
          "rows": [
            [
              "1",
              "1"
            ],
            [
              "2",
              "3"
            ],
            [
              "3",
              "6"
            ],
            [
              "4",
              {
                "blank": true,
                "key": "d4"
              }
            ],
            [
              "5",
              {
                "blank": true,
                "key": "d5"
              }
            ],
            [
              "10",
              {
                "blank": true,
                "key": "d10"
              }
            ],
            [
              "n",
              {
                "blank": true,
                "key": "dn",
                "numeric": false
              }
            ]
          ],
          "marks": 4,
          "cells": {
            "d4": {
              "type": "numeric",
              "value": 10.0,
              "marks": 1,
              "description": "the number of dots in Figure 4"
            },
            "d5": {
              "type": "numeric",
              "value": 15.0,
              "marks": 1,
              "description": "the number of dots in Figure 5"
            },
            "d10": {
              "type": "numeric",
              "value": 55.0,
              "marks": 1,
              "description": "the number of dots in Figure 10"
            },
            "dn": {
              "type": "expression",
              "value": "n(n + 1)/2",
              "marks": 1,
              "description": "the number of dots in Figure n",
              "accepted": [
                "(n^2 + n)/2",
                "(1/2)n(n + 1)",
                "(n + 1)n/2"
              ]
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The number of dots in each figure.",
          "headers": [
            "Figure",
            "Number of dots"
          ],
          "rows": [
            [
              "1",
              "1"
            ],
            [
              "2",
              "3"
            ],
            [
              "3",
              "6"
            ],
            [
              "4",
              {
                "key": "d4",
                "answer": "10.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "the number of dots in Figure 4"
              }
            ],
            [
              "5",
              {
                "key": "d5",
                "answer": "15.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "the number of dots in Figure 5"
              }
            ],
            [
              "10",
              {
                "key": "d10",
                "answer": "55.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "the number of dots in Figure 10"
              }
            ],
            [
              "n",
              {
                "key": "dn",
                "answer": "n(n + 1)/2",
                "answerType": "expression",
                "marks": 1,
                "description": "the number of dots in Figure n",
                "accepted": [
                  "(n^2 + n)/2",
                  "(1/2)n(n + 1)",
                  "(n + 1)n/2"
                ]
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the number of dots in Figure 25.",
        "marks": 2,
        "answer": "325",
        "solution": "Using the rule n(n + 1)/2 from (a) with n = 25: (25 x 26)/2 = 650/2 = 325. So Figure 25 has 325 dots.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes n = 25 into the rule for Figure n",
            "check": {
              "type": "contains",
              "value": [
                26.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number of dots in Figure 25",
            "check": {
              "type": "numeric",
              "value": 325.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the number of the figure that has 190 dots. Show clearly the equation you use and how you solve it.",
        "marks": 4,
        "answer": "19",
        "solution": "Set the rule equal to 190: n(n + 1)/2 = 190. Multiplying both sides by 2 gives n(n + 1) = 380, that is n^2 + n - 380 = 0. Factorising, (n + 20)(n - 19) = 0, so n = -20 or n = 19. A figure number must be a positive whole number, so the figure is Figure 19. Check: (19 x 20)/2 = 190.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the equation n(n + 1)/2 = 190",
            "check": {
              "type": "contains",
              "value": [
                190.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "writes it as a quadratic equation equal to zero",
            "check": {
              "type": "method",
              "any": [
                "n^2 + n - 380 = 0"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "solves the quadratic equation",
            "check": {
              "type": "method",
              "any": [
                "(n + 20)(n - 19)",
                "factoris",
                "quadratic formula"
              ]
            },
            "field": "all",
            "code": "M3"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the figure number, rejecting the negative root",
            "check": {
              "type": "numeric",
              "value": 19.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M3"
            ]
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 296 112\" width=\"100%\" style=\"max-width:296px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"54.0\" cy=\"62.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"54.0\" y=\"96.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 1</text><circle cx=\"128.0\" cy=\"42.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"118.0\" cy=\"62.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"138.0\" cy=\"62.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"128.0\" y=\"96.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 2</text><circle cx=\"222.0\" cy=\"22.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"212.0\" cy=\"42.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"232.0\" cy=\"42.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"202.0\" cy=\"62.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"222.0\" cy=\"62.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"242.0\" cy=\"62.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"222.0\" y=\"96.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 3</text></svg>",
      "alt": "Three triangular patterns of dots. Figure 1 is a single dot. Figure 2 has a row of 1 dot above a row of 2 dots, making 3 dots. Figure 3 has rows of 1, 2 and 3 dots, making 6 dots. In each figure the rows are centred one below the other so the dots form a triangle."
    },
    "design": "Q7-EJ-A",
    "source": "SPARK Practice Paper E original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2e-q8",
    "question_number": 8,
    "paper": "SPARK Practice Paper E",
    "section": "II",
    "topic": "Relations, functions and graphs",
    "marks": 12,
    "stem": "The table below shows some values of x and the corresponding values of y for the function y = x^2 - 2x - 3.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table of values.",
        "marks": 2,
        "answer": "-3, -3",
        "solution": "when x = 0, y = (0)^2 - 2(0) - 3 = -3; when x = 2, y = (2)^2 - 2(2) - 3 = -3.",
        "responseType": "table",
        "table": {
          "caption": "y = x^2 - 2x - 3 for -2 ≤ x ≤ 4.",
          "headers": [
            "x",
            "-2",
            "-1",
            "0",
            "1",
            "2",
            "3",
            "4"
          ],
          "rows": [
            [
              "y",
              "5",
              "0",
              {
                "blank": true,
                "key": "y2"
              },
              "-4",
              {
                "blank": true,
                "key": "y4"
              },
              "0",
              "5"
            ]
          ],
          "marks": 2,
          "cells": {
            "y2": {
              "type": "numeric",
              "value": -3,
              "marks": 1,
              "description": "y when x = 0"
            },
            "y4": {
              "type": "numeric",
              "value": -3,
              "marks": 1,
              "description": "y when x = 2"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "y = x^2 - 2x - 3 for -2 ≤ x ≤ 4.",
          "headers": [
            "x",
            "-2",
            "-1",
            "0",
            "1",
            "2",
            "3",
            "4"
          ],
          "rows": [
            [
              "y",
              "5",
              "0",
              {
                "key": "y2",
                "answer": "-3",
                "answerType": "numeric",
                "marks": 1,
                "description": "y when x = 0"
              },
              "-4",
              {
                "key": "y4",
                "answer": "-3",
                "answerType": "numeric",
                "marks": 1,
                "description": "y when x = 2"
              },
              "0",
              "5"
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Using a scale of 2 cm to represent 1 unit on the x axis and 1 cm to represent 1 unit on the y axis, draw the graph of y = x^2 - 2x - 3 for -2 ≤ x ≤ 4.",
        "marks": 4,
        "answer": "the points (-2, 5) to (4, 5) joined by a smooth curve",
        "solution": "Plot the seven points from the table and join them with a single smooth curve. Do not join them with straight lines.",
        "responseType": "graph",
        "grid": {
          "xMin": -2,
          "xMax": 4,
          "yMin": -5,
          "yMax": 6,
          "xStep": 1,
          "yStep": 1,
          "minorPerStep": 2,
          "xLabel": "x",
          "yLabel": "y",
          "tools": [
            "point",
            "curve"
          ]
        },
        "graph": {
          "points": [
            {
              "x": -2,
              "y": 5
            },
            {
              "x": -1,
              "y": 0
            },
            {
              "x": 0,
              "y": -3
            },
            {
              "x": 1,
              "y": -4
            },
            {
              "x": 2,
              "y": -3
            },
            {
              "x": 3,
              "y": 0
            },
            {
              "x": 4,
              "y": 5
            }
          ],
          "tolerance": 0.3,
          "pointMarks": 2,
          "curve": {
            "expression": "x*x + (-2)*x + (-3)",
            "from": -2,
            "to": 4,
            "tolerance": 0.5
          },
          "curveMarks": 2
        },
        "answerType": "text",
        "responseSchema": {
          "type": "graph",
          "graph": {
            "xMin": -2,
            "xMax": 4,
            "yMin": -5,
            "yMax": 6,
            "xStep": 1,
            "yStep": 1,
            "minorPerStep": 2,
            "snapX": 0.25,
            "snapY": 0.25,
            "xLabel": "x",
            "yLabel": "y",
            "tools": [
              "point",
              "curve"
            ],
            "mode": "curve"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  -2,
                  5
                ],
                [
                  -1,
                  0
                ],
                [
                  0,
                  -3
                ],
                [
                  1,
                  -4
                ],
                [
                  2,
                  -3
                ],
                [
                  3,
                  0
                ],
                [
                  4,
                  5
                ]
              ],
              "tolerance": [
                0.3,
                0.3
              ],
              "proportional": true,
              "label": "Accurate plotted points"
            },
            {
              "kind": "graph_curve",
              "marks": 2,
              "minimumPoints": 5,
              "referencePoints": [
                [
                  -2,
                  5
                ],
                [
                  -1,
                  0
                ],
                [
                  0,
                  -3
                ],
                [
                  1,
                  -4
                ],
                [
                  2,
                  -3
                ],
                [
                  3,
                  0
                ],
                [
                  4,
                  5
                ]
              ],
              "tolerance": [
                0.3,
                0.3
              ],
              "minimumMatches": 5,
              "increasing": false,
              "requireSmooth": true,
              "label": "Appropriate curve through the plotted data"
            }
          ]
        }
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Using your graph, state the coordinates of the MINIMUM point of the function.",
        "marks": 2,
        "answer": "(1, -4)",
        "solution": "The curve turns at its lowest point, where x = 1 and y = -4. The minimum point is (1, -4).",
        "tolerance": 0.3,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "identifies the turning point of the curve",
            "check": {
              "type": "contains",
              "value": [
                1.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the coordinates of the minimum",
            "check": {
              "type": "coordinate",
              "value": [
                1.0,
                -4.0
              ],
              "tolerance": 0.3
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ],
            "captureIndex": 0
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Using your graph, state the values of x for which x^2 - 2x - 3 = 0.",
        "marks": 2,
        "answer": "x = -1 and x = 3",
        "solution": "The curve crosses the x axis where y = 0, at x = -1 and x = 3.",
        "answerType": "ordered",
        "accepted": [
          "-1, 3",
          "-1 and 3"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "reads where the curve crosses the x axis",
            "check": {
              "type": "method",
              "any": [
                "x axis",
                "y = 0",
                "crosses"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "both values of x",
            "check": {
              "type": "set",
              "value": [
                -1.0,
                3.0
              ],
              "tolerance": 0.3
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "e",
        "label": "(e)",
        "prompt": "Write down the equation of the axis of symmetry of the graph.",
        "marks": 2,
        "answer": "x = 1",
        "solution": "The axis of symmetry is the vertical line through the minimum point, so its equation is x = 1.",
        "answerType": "expression",
        "accepted": [
          "x=1"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "refers to the vertical line through the minimum",
            "check": {
              "type": "method",
              "any": [
                "axis of symmetry",
                "vertical",
                "minimum"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the equation of the axis of symmetry",
            "check": {
              "type": "equation",
              "value": "x = 1"
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "c"
              ],
              "formula": "c",
              "template": "x = {v}"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "section_heading": "ALGEBRA, RELATIONS, FUNCTIONS AND GRAPHS",
    "design": "Q8-EJ-A",
    "source": "SPARK Practice Paper E original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2e-q9",
    "question_number": 9,
    "paper": "SPARK Practice Paper E",
    "section": "II",
    "topic": "Geometry and trigonometry",
    "marks": 12,
    "stem": "A ship leaves port P and sails 85 km on a bearing of 078° to a point Q. It then changes course and sails 60 km on a bearing of 143° to a point R. The diagram below, not drawn to scale, shows the route of the ship.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Show that angle PQR = 115°, and hence calculate, correct to 1 decimal place, the length of PR.",
        "marks": 4,
        "answer": "123.0",
        "solution": "The bearing of P from Q is 78 + 180 = 258°, so angle PQR = 258 - 143 = 115°. By the cosine rule, PR^2 = PQ^2 + QR^2 - 2(PQ)(QR) cos PQR = 85^2 + 60^2 - 2(85)(60) cos 115° = 7225 + 3600 + 4310.7063 = 15135.7063. So PR = sqrt(15135.7063) = 123.0273 = 123.0 km, correct to 1 decimal place.",
        "suffix": " km",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds angle PQR = 115 degrees from the bearings",
            "check": {
              "type": "contains",
              "value": [
                115.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the cosine rule",
            "check": {
              "type": "method",
              "any": [
                "cosine rule",
                "cos"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes 85, 60 and 115 correctly",
            "check": {
              "type": "contains",
              "value": [
                85.0,
                60.0,
                115.0
              ]
            },
            "field": "all",
            "code": "M3"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "PR = 123.0 km",
            "check": {
              "type": "numeric",
              "value": 123.02725823879493,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M3"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Hence, calculate the size of angle QPR, correct to 1 decimal place.",
        "marks": 3,
        "answer": "26.2",
        "solution": "By the sine rule, sin(angle QPR)/QR = sin(angle PQR)/PR, that is sin(angle QPR)/60 = sin 115°/123.0273. So sin(angle QPR) = 60 x sin 115° / 123.0273 = 0.442003, giving angle QPR = 26.23 = 26.2°. Angle PQR is obtuse, so angle QPR must be acute and this is the required value.",
        "suffix": "°",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the sine rule",
            "check": {
              "type": "method",
              "any": [
                "sine rule",
                "sin"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes 60, 115 and PR correctly",
            "check": {
              "type": "contains",
              "value": [
                60.0,
                115.0,
                123.0273
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "angle QPR = 26.2 degrees",
            "check": {
              "type": "numeric",
              "value": 26.231776370020192,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "asin(60*sin(115)/a)"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Hence, or otherwise, determine the bearing of R from P, giving your answer as a three-figure bearing correct to the nearest degree.",
        "marks": 3,
        "answer": "104",
        "solution": "The bearing of Q from P is 078°, and R lies clockwise of Q when viewed from P, so the bearing of R from P is the bearing of Q from P plus angle QPR. That is 78 + 26.2 = 104.2°, which is 104° as a three-figure bearing correct to the nearest degree.",
        "suffix": "°",
        "tolerance": 0.51,
        "accepted": [
          "104°",
          "104 degrees"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "bearing of R from P = bearing of Q from P + angle QPR",
            "check": {
              "type": "method",
              "any": [
                "bearing of q from p"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "adds angle QPR to 078 degrees",
            "check": {
              "type": "contains",
              "value": [
                78.0,
                26.2
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "104 degrees",
            "check": {
              "type": "numeric",
              "value": 104.23177637002019,
              "dp": 0,
              "tolerance": 0.51
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b"
              ],
              "formula": "78 + b"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate, correct to 1 decimal place, the area of triangle PQR.",
        "marks": 2,
        "answer": "2311.1",
        "solution": "Area = (1/2)(PQ)(QR) sin PQR = (1/2) x 85 x 60 x sin 115° = 2550 x sin 115° = 2311.0849 = 2311.1 km^2, correct to 1 decimal place.",
        "suffix": " km^2",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses (1/2)ab sin C with 85, 60 and 115",
            "check": {
              "type": "contains",
              "value": [
                85.0,
                60.0,
                115.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "area = 2311.1 km^2",
            "check": {
              "type": "numeric",
              "value": 2311.0848569434575,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "section_heading": "GEOMETRY AND TRIGONOMETRY",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 390\" width=\"100%\" style=\"max-width:360px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M81.5 216.6 L81.5 152.9\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M81.5 146.6 L85.9 153.6 L77.2 153.6 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"81.5\" y=\"136.6\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">N</text><path d=\"M81.5 216.6 L232.8 184.4\" stroke-width=\"2\"/><path d=\"M81.5 180.6 A36 36 0 0 1 116.8 209.1\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"94.0\" y=\"201.2\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">078&#176;</text><text x=\"162.6\" y=\"225.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">85 km</text><path d=\"M232.8 184.4 L232.8 120.7\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M232.8 114.4 L237.1 121.4 L228.4 121.4 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"232.8\" y=\"104.4\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">N</text><path d=\"M232.8 184.4 L298.5 271.6\" stroke-width=\"2\"/><path d=\"M232.8 148.4 A36 36 0 0 1 254.4 213.2\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"251.6\" y=\"178.1\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">143&#176;</text><text x=\"244.9\" y=\"243.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">60 km</text><circle cx=\"81.5\" cy=\"216.6\" r=\"3.2\" fill=\"currentColor\"/><text x=\"65.5\" y=\"226.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">P</text><circle cx=\"232.8\" cy=\"184.4\" r=\"3.2\" fill=\"currentColor\"/><text x=\"216.8\" y=\"194.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">Q</text><circle cx=\"298.5\" cy=\"271.6\" r=\"3.2\" fill=\"currentColor\"/><text x=\"282.5\" y=\"281.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">R</text></svg>",
      "alt": "A bearing diagram, not drawn to scale. From the point P a north line is drawn and the angle from it to the line PQ is marked 078 degrees; PQ is marked 85 km. From Q a second north line is drawn and the angle from it to the line QR is marked 143 degrees; QR is marked 60 km. The points P, Q and R are shown as solid dots."
    },
    "design": "Q9-EJ-A",
    "source": "SPARK Practice Paper E original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2e-q10",
    "question_number": 10,
    "paper": "SPARK Practice Paper E",
    "section": "II",
    "topic": "Vectors and matrices",
    "marks": 12,
    "stem": "The matrix M is given by M = [[3, 4], [1, 2]].",
    "parts": [
      {
        "id": "k",
        "label": "(a) (i)",
        "prompt": "Calculate the determinant of M.",
        "marks": 2,
        "answer": "2",
        "solution": "det M = (3)(2) - (4)(1) = 6 - 4 = 2.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses det M = ad - bc",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    6.0,
                    4.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    6.0,
                    -4.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    2.0
                  ]
                },
                {
                  "type": "method",
                  "any": [
                    "(3)(2) - (4)(1)",
                    "3(2) - 4(1)",
                    "3 x 2 - 4 x 1",
                    "3*2 - 4*1",
                    "ad - bc",
                    "ad-bc"
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the determinant",
            "check": {
              "type": "numeric",
              "value": 2.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Hence, write down M^-1, the inverse of M.",
        "marks": 3,
        "answer": "(1/2)[[2, -4], [-1, 3]]",
        "solution": "For M = [[a, b], [c, d]], M^-1 = (1/det M)[[d, -b], [-c, a]]. Interchange the entries on the leading diagonal, change the sign of the other two, and divide by the determinant: M^-1 = (1/2)[[2, -4], [-1, 3]] = [[1, -2], [-1/2, 3/2]].",
        "answerType": "expression",
        "accepted": [
          "[[1, -2], [-1/2, 3/2]]",
          "1/2[[2, -4], [-1, 3]]"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "interchanges the leading diagonal entries and changes the sign of the other two",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    2.0,
                    -4.0,
                    -1.0,
                    3.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    1.0,
                    -2.0,
                    -0.5,
                    1.5
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "divides by the determinant",
            "check": {
              "type": "contains",
              "value": [
                0.5,
                -0.5
              ],
              "needAll": false,
              "tolerance": 0.005
            },
            "field": "all",
            "ecf": {
              "uses": [
                "k"
              ],
              "formula": "1/k"
            },
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the inverse matrix",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "matrix",
                  "value": [
                    [
                      1.0,
                      -2.0
                    ],
                    [
                      -0.5,
                      1.5
                    ]
                  ],
                  "tolerance": 0.005
                },
                {
                  "type": "contains",
                  "value": [
                    0.5,
                    2.0,
                    -4.0,
                    -1.0,
                    3.0
                  ]
                }
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write the pair of simultaneous equations 3x + 4y = 1 and x + 2y = -1 as a matrix equation in the form M X = C.",
        "marks": 3,
        "answer": "[[3, 4], [1, 2]] [[x], [y]] = [[1], [-1]]",
        "solution": "The coefficients of x and y form the matrix M = [[3, 4], [1, 2]], the unknowns form the column matrix X = [[x], [y]], and the constants form the column matrix C = [[1], [-1]]. The pair of equations is therefore [[3, 4], [1, 2]] [[x], [y]] = [[1], [-1]].",
        "answerType": "expression",
        "accepted": [
          "[[3, 4], [1, 2]][[x], [y]] = [[1], [-1]]"
        ],
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the matrix of coefficients",
            "check": {
              "type": "contains",
              "value": [
                3.0,
                4.0,
                1.0,
                2.0
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "the column matrix of unknowns",
            "check": {
              "type": "method",
              "any": [
                "[[x], [y]]",
                "[[x],[y]]",
                "(x, y)"
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B2"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "the column matrix of constants",
            "check": {
              "type": "contains",
              "value": [
                1.0,
                -1.0
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B3"
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Hence, or otherwise, use M^-1 to solve the pair of simultaneous equations in part (b).",
        "marks": 4,
        "answer": "x = 3, y = -2",
        "solution": "Multiplying both sides of M X = C on the left by M^-1 gives X = M^-1 C = (1/2)[[2, -4], [-1, 3]] [[1], [-1]] = (1/2)[[(2)(1) + (-4)(-1)], [(-1)(1) + (3)(-1)]] = (1/2)[[6], [-4]] = [[3], [-2]]. So x = 3 and y = -2. Check: 3(3) + 4(-2) = 1.",
        "answerType": "ordered",
        "accepted": [
          "(3, -2)",
          "3, -2"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies both sides by the inverse matrix",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "method",
                  "any": [
                    "M^-1 C",
                    "M^-1",
                    "inverse"
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    3.0,
                    -2.0
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies the inverse by the column of constants",
            "check": {
              "type": "contains",
              "value": [
                6.0,
                -4.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of x",
            "check": {
              "type": "contains",
              "value": [
                3.0
              ]
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "k"
              ],
              "formula": "(6)/k"
            },
            "depends": [
              "M1"
            ],
            "code": "A1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of y",
            "check": {
              "type": "contains",
              "value": [
                -2.0
              ]
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "k"
              ],
              "formula": "(-4)/k"
            },
            "depends": [
              "M1"
            ],
            "code": "A2"
          }
        ]
      }
    ],
    "section_heading": "VECTORS AND MATRICES",
    "design": "Q10-EJ-A",
    "source": "SPARK Practice Paper E original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2f-q1",
    "question_number": 1,
    "paper": "SPARK Practice Paper F",
    "section": "I",
    "topic": "Number theory and computation",
    "marks": 9,
    "stem": "The exchange rate between the United States dollar (US$) and the Barbados dollar (BDS$) is US$1.00 = BDS$2.00.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (2 1/4 - 5/6) ÷ (2/3 + 1/4), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "17/11",
        "solution": "2 1/4 = 9/4, so the numerator is 9/4 - 5/6 = 17/12. The denominator is 2/3 + 1/4 = 11/12. Dividing means multiplying by the reciprocal: 17/12 x 12/11 = 17/11.",
        "cao": true,
        "requiredForm": "simplified_fraction",
        "accepted": [
          "1 6/11"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the numerator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                1.4166666666666667
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the denominator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                0.9166666666666666
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the exact value in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 1.5454545454545454,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Mr Grant changes US$850 into BDS dollars. Calculate the amount, in BDS dollars, that he receives before any charge is made.",
        "marks": 2,
        "answer": "1700.00",
        "solution": "850 x 2.00 = BDS$1,700.00.",
        "prefix": "BDS$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies by the exchange rate",
            "check": {
              "type": "method",
              "any": [
                "x 2.00",
                "exchange rate",
                "850"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the amount in BDS dollars",
            "check": {
              "type": "numeric",
              "value": 1700.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "The bank charges a fee of BDS$25 on the transaction. Calculate the amount Mr Grant actually receives.",
        "marks": 2,
        "answer": "1675.00",
        "solution": "BDS$1,700.00 - BDS$25 = BDS$1,675.00.",
        "prefix": "BDS$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "subtracts the fee from the amount converted",
            "check": {
              "type": "contains",
              "value": [
                25.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the amount received",
            "check": {
              "type": "numeric",
              "value": 1675.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b1"
              ],
              "formula": "b1 - 25.0"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Mr Grant invests BDS$7,500 in an account paying SIMPLE INTEREST at 6% per annum. Calculate the TOTAL amount in the account at the end of 3 years.",
        "marks": 2,
        "answer": "8850.00",
        "solution": "I = PRT/100 = (7,500 x 6 x 3)/100 = BDS$1,350.00. The total amount is 7,500 + 1,350.00 = BDS$8,850.00.",
        "prefix": "BDS$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses I = PRT/100",
            "check": {
              "type": "contains",
              "value": [
                1350.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the total amount",
            "check": {
              "type": "numeric",
              "value": 8850.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q1-EJ-B",
    "source": "SPARK Practice Paper F original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2f-q2",
    "question_number": 2,
    "paper": "SPARK Practice Paper F",
    "section": "I",
    "topic": "Algebra",
    "marks": 9,
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Simplify, giving your answer in its lowest terms, (x^2 - 16)/(x^2 - x - 12).",
        "marks": 3,
        "answer": "(x + 4)/(x + 3)",
        "solution": "Factorising the numerator: x^2 - 16 = (x - 4)(x + 4). Factorising the denominator: x^2 - x - 12 = (x - 4)(x + 3). The common factor (x - 4) cancels, leaving (x + 4)/(x + 3).",
        "answerType": "expression",
        "accepted": [
          "(x+4)/(x+3)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "factorises the numerator",
            "check": {
              "type": "method",
              "any": [
                "(x - 4)(x + 4)"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "factorises the denominator",
            "check": {
              "type": "method",
              "any": [
                "(x - 4)(x + 3)"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "cancels the common factor and gives the fraction in its lowest terms",
            "check": {
              "type": "expression",
              "value": "(x + 4)/(x + 3)",
              "accepted": [
                "(x+4)/(x+3)"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Solve the pair of simultaneous equations: 2x + 3y = 16 and 4x - y = 11.",
        "marks": 4,
        "answer": "x = 7/2, y = 3",
        "solution": "Multiplying the second equation by 3: 12x - 3y = 33. Adding 2x + 3y = 16 and 12x - 3y = 33 eliminates y: 14x = 49, so x = 7/2. Substituting x = 7/2 into 2x + 3y = 16 gives 7 + 3y = 16, so 3y = 9 and y = 3.",
        "accepted": [
          "x = 3 1/2, y = 3",
          "(7/2, 3)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "eliminates one of the variables",
            "check": {
              "type": "method",
              "any": [
                "eliminates y",
                "eliminates x"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of x",
            "check": {
              "type": "equation",
              "value": "x = 7/2"
            },
            "field": "all",
            "code": "A1",
            "depends": [
              "M1"
            ]
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes back to find the second variable",
            "check": {
              "type": "contains",
              "value": [
                7.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of y",
            "check": {
              "type": "equation",
              "value": "y = 3"
            },
            "field": "all",
            "code": "A2",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Make q the subject of the formula p = (3q - 5)/4.",
        "marks": 2,
        "answer": "q = (4p + 5)/3",
        "solution": "Multiplying both sides by 4: 4p = 3q - 5. Adding 5 to both sides: 4p + 5 = 3q. Dividing both sides by 3: q = (4p + 5)/3.",
        "answerType": "expression",
        "accepted": [
          "(4p + 5)/3",
          "q = (5 + 4p)/3",
          "q = 4p/3 + 5/3"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "carries out a correct first step in the rearrangement",
            "check": {
              "type": "method",
              "any": [
                "4p = 3q - 5"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "q as the subject",
            "check": {
              "type": "equation",
              "value": "q = (4p + 5)/3"
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q2-EJ-B",
    "source": "SPARK Practice Paper F original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2f-q3",
    "question_number": 3,
    "paper": "SPARK Practice Paper F",
    "section": "I",
    "topic": "Sets",
    "marks": 9,
    "stem": "In a survey of 50 students, 30 study Mathematics, 25 study Physics and 5 study NEITHER of these two subjects. The Venn diagram below shows this information, where x represents the number of students who study BOTH Mathematics and Physics.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Using the information in the Venn diagram, form an equation in x and solve it to calculate the number of students who study BOTH Mathematics and Physics.",
        "marks": 3,
        "answer": "10",
        "solution": "Every one of the 50 students is counted exactly once in the Venn diagram, so (30 - x) + x + (25 - x) + 5 = 50. This simplifies to 60 - x = 50, so x = 60 - 50 = 10. So 10 students study both Mathematics and Physics.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "forms an equation in x from the four regions of the Venn diagram",
            "check": {
              "type": "method",
              "any": [
                "30 - x",
                "30 + 25 - x",
                "60 - x"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "simplifies the equation",
            "check": {
              "type": "contains",
              "value": [
                60.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number who study both Mathematics and Physics",
            "check": {
              "type": "numeric",
              "value": 10.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "depends": [],
            "code": "A1"
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the number of students who study EXACTLY ONE of the two subjects.",
        "marks": 2,
        "answer": "35",
        "solution": "The number who study Mathematics only is 30 - 10 = 20, and the number who study Physics only is 25 - 10 = 15. So the number who study exactly one of the two subjects is 20 + 15 = 35.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "subtracts the number who study both from each of 30 and 25",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "method",
                  "any": [
                    "30 - ",
                    "25 - "
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    20.0,
                    15.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    35.0
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number who study exactly one of the two subjects",
            "check": {
              "type": "numeric",
              "value": 35.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "55 - 2 * a"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "One of the 50 students is chosen at random. Calculate the probability that the student chosen studies NEITHER Mathematics NOR Physics, giving your answer as a fraction in its lowest terms.",
        "marks": 2,
        "answer": "1/10",
        "solution": "5 of the 50 students study neither Mathematics nor Physics, and each student is equally likely to be chosen. So P(neither) = 5/50 = 1/10.",
        "requiredForm": "simplified_fraction",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses P(neither) = (the number who study neither)/(the total number of students)",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    5.0,
                    50.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    0.1
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the probability in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 0.1,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Describe, in words, the set represented by the shaded region in the Venn diagram below.",
        "marks": 2,
        "answer": "The shaded region represents the students who study Mathematics only, that is, the students who study Mathematics but not Physics.",
        "solution": "The shading covers the part of the Mathematics circle that lies outside the Physics circle, so it is the set of students who study Mathematics but do not study Physics - the students who study Mathematics only. Naming Mathematics earns 1 mark and making it clear that these students do not study Physics earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "subject",
            "marks": 1,
            "description": "says that the students study Mathematics",
            "any": [
              "mathematics"
            ]
          },
          {
            "id": "excludes",
            "marks": 1,
            "description": "makes it clear that they do not study Physics",
            "any": [
              "mathematics only",
              "but not physics",
              "do not study physics",
              "not study physics"
            ]
          }
        ],
        "answerType": "text",
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 250\" width=\"100%\" style=\"max-width:400px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"6\" y=\"6\" width=\"368\" height=\"238\" rx=\"2\"/><path d=\"M185.0 194.1 L181.8 195.8 L178.6 197.2 L175.3 198.6 L171.9 199.8 L168.5 200.8 L165.1 201.8 L161.6 202.5 L158.1 203.1 L154.5 203.6 L151.0 203.8 L147.4 204.0 L143.8 204.0 L140.3 203.8 L136.7 203.5 L133.2 203.0 L129.7 202.4 L126.2 201.6 L122.8 200.6 L119.4 199.6 L116.0 198.3 L112.7 196.9 L109.5 195.4 L106.3 193.8 L103.2 192.0 L100.2 190.0 L97.3 188.0 L94.5 185.8 L91.8 183.5 L89.2 181.1 L86.6 178.6 L84.2 175.9 L81.9 173.2 L79.8 170.4 L77.7 167.4 L75.8 164.4 L74.0 161.3 L72.4 158.2 L70.9 154.9 L69.5 151.6 L68.3 148.3 L67.3 144.9 L66.3 141.4 L65.6 138.0 L64.9 134.4 L64.5 130.9 L64.2 127.3 L64.0 123.8 L64.0 120.2 L64.2 116.7 L64.5 113.1 L64.9 109.6 L65.6 106.0 L66.3 102.6 L67.3 99.1 L68.3 95.7 L69.5 92.4 L70.9 89.1 L72.4 85.8 L74.0 82.7 L75.8 79.6 L77.7 76.6 L79.8 73.6 L81.9 70.8 L84.2 68.1 L86.6 65.4 L89.2 62.9 L91.8 60.5 L94.5 58.2 L97.3 56.0 L100.2 54.0 L103.2 52.0 L106.3 50.2 L109.5 48.6 L112.7 47.1 L116.0 45.7 L119.4 44.4 L122.8 43.4 L126.2 42.4 L129.7 41.6 L133.2 41.0 L136.7 40.5 L140.3 40.2 L143.8 40.0 L147.4 40.0 L151.0 40.2 L154.5 40.4 L158.1 40.9 L161.6 41.5 L165.1 42.2 L168.5 43.2 L171.9 44.2 L175.3 45.4 L178.6 46.8 L181.8 48.2 L185.0 49.9 L185.0 49.9 L181.9 51.6 L178.8 53.6 L175.9 55.6 L173.0 57.8 L170.2 60.1 L167.6 62.5 L165.0 65.0 L162.6 67.7 L160.2 70.4 L158.0 73.3 L156.0 76.2 L154.0 79.2 L152.2 82.4 L150.6 85.5 L149.0 88.8 L147.6 92.1 L146.4 95.5 L145.3 98.9 L144.4 102.4 L143.6 105.9 L143.0 109.5 L142.5 113.0 L142.2 116.6 L142.0 120.2 L142.0 123.8 L142.2 127.4 L142.5 131.0 L143.0 134.5 L143.6 138.1 L144.4 141.6 L145.3 145.1 L146.4 148.5 L147.6 151.9 L149.0 155.2 L150.6 158.5 L152.2 161.6 L154.0 164.8 L156.0 167.8 L158.0 170.7 L160.2 173.6 L162.6 176.3 L165.0 179.0 L167.6 181.5 L170.2 183.9 L173.0 186.2 L175.9 188.4 L178.8 190.4 L181.9 192.4 L185.0 194.1 Z\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><circle cx=\"146\" cy=\"122\" r=\"82\"/><circle cx=\"224\" cy=\"122\" r=\"82\"/><text x=\"20.0\" y=\"26.0\" text-anchor=\"start\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">U</text><text x=\"94.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">M</text><text x=\"276.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">P</text></svg>",
          "alt": "A Venn diagram inside a rectangle labelled U, with two overlapping circles labelled M for Mathematics and P for Physics. The part of the Mathematics circle that lies outside the Physics circle is shaded. No numbers are written in the regions."
        },
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "says that the students study Mathematics",
            "check": {
              "type": "written",
              "id": "subject",
              "description": "says that the students study Mathematics",
              "any": [
                "mathematics"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "makes it clear that they do not study Physics",
            "check": {
              "type": "written",
              "id": "excludes",
              "description": "makes it clear that they do not study Physics",
              "any": [
                "mathematics only",
                "but not physics",
                "do not study physics",
                "not study physics"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 250\" width=\"100%\" style=\"max-width:400px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"6\" y=\"6\" width=\"368\" height=\"238\" rx=\"2\"/><circle cx=\"146\" cy=\"122\" r=\"82\"/><circle cx=\"224\" cy=\"122\" r=\"82\"/><text x=\"20.0\" y=\"26.0\" text-anchor=\"start\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">U</text><text x=\"94.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">M</text><text x=\"276.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">P</text><text x=\"104.0\" y=\"122.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">30 - x</text><text x=\"185.0\" y=\"122.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">x</text><text x=\"266.0\" y=\"122.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">25 - x</text><text x=\"348.0\" y=\"228.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">5</text></svg>",
      "alt": "A Venn diagram inside a rectangle labelled U, representing the 50 students surveyed. It contains two overlapping circles, M for Mathematics and P for Physics. The part of M outside P is labelled 30 - x, the overlap of M and P is labelled x, the part of P outside M is labelled 25 - x, and 5 is written outside both circles."
    },
    "design": "Q3-EJ-B",
    "source": "SPARK Practice Paper F original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2f-q4",
    "question_number": 4,
    "paper": "SPARK Practice Paper F",
    "section": "I",
    "topic": "Measurement and construction",
    "marks": 9,
    "stem": "The line AB, 8 cm long, is already drawn on the construction pad.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Using only a ruler and a pair of compasses, construct the perpendicular bisector of AB, so that an angle of 90° is constructed at the midpoint M of AB. Your construction arcs must be clearly shown.",
        "marks": 3,
        "answer": "the perpendicular bisector of AB through M, with the construction arcs shown",
        "solution": "Open the compasses to more than half of AB, that is to more than 4 cm. With centre A draw arcs above and below AB; with the SAME radius and centre B draw two more to cut them. Rule the line through the two crossing points. It cuts AB at the midpoint M and makes an angle of 90° with AB. The arcs must be left on the page.",
        "responseType": "construction",
        "pad": {
          "width": 560,
          "height": 340,
          "unitsPerCm": 40,
          "given": [
            {
              "id": "A",
              "x": 2.0,
              "y": 2.0
            },
            {
              "id": "B",
              "x": 10.0,
              "y": 2.0
            }
          ],
          "givenSegments": [
            [
              "A",
              "B"
            ]
          ]
        },
        "construction": {
          "construction": "perpendicularBisector",
          "args": [
            {
              "id": "A",
              "x": 2.0,
              "y": 2.0
            },
            {
              "id": "B",
              "x": 10.0,
              "y": 2.0
            }
          ]
        },
        "answerType": "text",
        "responseSchema": {
          "type": "construction",
          "pad": {
            "width": 560,
            "height": 340,
            "unitsPerCm": 40,
            "given": [
              {
                "id": "A",
                "x": 2.0,
                "y": 2.0
              },
              {
                "id": "B",
                "x": 10.0,
                "y": 2.0
              }
            ],
            "givenSegments": [
              [
                "A",
                "B"
              ]
            ]
          },
          "construction": {
            "construction": "perpendicularBisector",
            "args": [
              {
                "id": "A",
                "x": 2.0,
                "y": 2.0
              },
              {
                "id": "B",
                "x": 10.0,
                "y": 2.0
              }
            ],
            "marks": 3
          },
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "allowProtractor": false
        }
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "The pad shows AB and the perpendicular MT that you constructed in (a) (i). Using only a ruler and a pair of compasses, bisect angle TMB. Your construction arcs must be clearly shown.",
        "marks": 1,
        "answer": "the bisector of angle TMB drawn from M, with the arc at M and the two equal arcs from where it cuts MT and MB shown",
        "solution": "With centre M draw an arc cutting MT and MB. From each of those two crossing points, with the same radius, draw an arc so that the two arcs cross. Rule the line from M through that crossing point. This mark is for the arcs: an angle measured with a protractor earns nothing here.",
        "responseType": "construction",
        "pad": {
          "width": 560,
          "height": 340,
          "unitsPerCm": 40,
          "given": [
            {
              "id": "A",
              "x": 2.0,
              "y": 2.0
            },
            {
              "id": "B",
              "x": 10.0,
              "y": 2.0
            },
            {
              "id": "M",
              "x": 6.0,
              "y": 2.0
            },
            {
              "id": "T",
              "x": 6.0,
              "y": 6.0
            }
          ],
          "givenSegments": [
            [
              "A",
              "B"
            ],
            [
              "M",
              "T"
            ]
          ]
        },
        "construction": {
          "construction": "angleBisector",
          "args": [
            {
              "id": "M",
              "x": 6.0,
              "y": 2.0
            },
            {
              "id": "T",
              "x": 6.0,
              "y": 6.0
            },
            {
              "id": "B",
              "x": 10.0,
              "y": 2.0
            }
          ]
        },
        "answerType": "text",
        "responseSchema": {
          "type": "construction",
          "pad": {
            "width": 560,
            "height": 340,
            "unitsPerCm": 40,
            "given": [
              {
                "id": "A",
                "x": 2.0,
                "y": 2.0
              },
              {
                "id": "B",
                "x": 10.0,
                "y": 2.0
              },
              {
                "id": "M",
                "x": 6.0,
                "y": 2.0
              },
              {
                "id": "T",
                "x": 6.0,
                "y": 6.0
              }
            ],
            "givenSegments": [
              [
                "A",
                "B"
              ],
              [
                "M",
                "T"
              ]
            ]
          },
          "construction": {
            "construction": "angleBisector",
            "args": [
              {
                "id": "M",
                "x": 6.0,
                "y": 2.0
              },
              {
                "id": "T",
                "x": 6.0,
                "y": 6.0
              },
              {
                "id": "B",
                "x": 10.0,
                "y": 2.0
              }
            ],
            "marks": 1
          },
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "allowProtractor": false
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the size of the angle that you constructed in (a) (ii), that is, the size of angle TMR where MR is your bisector.",
        "marks": 1,
        "answer": "45",
        "solution": "MT is perpendicular to AB, so angle TMB = 90°. The bisector halves it, so angle TMR = 90/2 = 45°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the size of the constructed angle",
            "check": {
              "type": "numeric",
              "value": 45.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      },
      {
        "id": "c1",
        "label": "(c) (i)",
        "prompt": "A cylindrical drum has a radius of 35 cm and a height of 50 cm. [In this question, take π = 22/7.] Calculate the volume of the drum, in cm^3.",
        "marks": 2,
        "answer": "192500",
        "solution": "Volume of a cylinder = π x r^2 x h = 22/7 x 35^2 x 50 = 22/7 x 1225 x 50 = 192500 cm^3.",
        "suffix": " cm^3",
        "tolerance": 0.011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 268\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><ellipse cx=\"150\" cy=\"58\" rx=\"62\" ry=\"17\"/><path d=\"M88 58 L88 214\"/><path d=\"M212 58 L212 214\"/><path d=\"M88 214 A62 17 0 0 0 212 214\"/><path d=\"M88 214 A62 17 0 0 1 212 214\" stroke-dasharray=\"5 4\"/><path d=\"M150 58 L212 58\" stroke-width=\"1.3\"/><circle cx=\"150\" cy=\"58\" r=\"2.4\" fill=\"currentColor\"/><path d=\"M242 58 L242 214\" stroke-width=\"1.3\"/><path d=\"M237 58 L247 58\" stroke-width=\"1.3\"/><path d=\"M237 214 L247 214\" stroke-width=\"1.3\"/><g stroke=\"none\" fill=\"currentColor\" font-size=\"12\"><text x=\"181\" y=\"32\" text-anchor=\"middle\">35 cm</text><text x=\"251\" y=\"140\">50 cm</text></g></svg>",
          "alt": "A closed cylindrical drum standing on its circular base. The radius of the top circular face is marked 35 cm and the vertical height of the drum is marked 50 cm. The diagram is not drawn to scale."
        },
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses V = pi x r^2 x h with r = 35 and h = 50",
            "check": {
              "type": "contains",
              "value": [
                1225.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the volume of the drum",
            "check": {
              "type": "numeric",
              "value": 192500.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c2",
        "label": "(c) (ii)",
        "prompt": "Calculate the capacity of the drum, in litres. [1 litre = 1000 cm^3]",
        "marks": 2,
        "answer": "192.5",
        "solution": "192500 cm^3 = 192500/1000 litres = 192.5 litres.",
        "suffix": " litres",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "divides the volume in cm^3 by 1000",
            "check": {
              "type": "method",
              "any": [
                "1000"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the capacity in litres",
            "check": {
              "type": "numeric",
              "value": 192.5,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "c1"
              ],
              "formula": "c1 / 1000"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q4-EJ-B",
    "source": "SPARK Practice Paper F original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2f-q5",
    "question_number": 5,
    "paper": "SPARK Practice Paper F",
    "section": "I",
    "topic": "Statistics and probability",
    "marks": 9,
    "stem": "The table below shows the masses, in kilograms, of parcels handled by a courier.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table below to show the cumulative frequency for each class.",
        "marks": 2,
        "answer": "15, 33, 42, 50",
        "solution": "Add each frequency to the running total: 4 + 11 = 15, 15 + 18 = 33, 33 + 9 = 42, 42 + 8 = 50.",
        "responseType": "table",
        "table": {
          "caption": "The 50 values, grouped.",
          "headers": [
            "Mass (kg)",
            "0 - 10",
            "10 - 20",
            "20 - 30",
            "30 - 40",
            "40 - 50"
          ],
          "rows": [
            [
              "Frequency",
              "4",
              "11",
              "18",
              "9",
              "8"
            ],
            [
              "Cumulative frequency",
              "4",
              {
                "blank": true,
                "key": "c1"
              },
              {
                "blank": true,
                "key": "c2"
              },
              {
                "blank": true,
                "key": "c3"
              },
              {
                "blank": true,
                "key": "c4"
              }
            ]
          ],
          "marks": 2,
          "cells": {
            "c1": {
              "type": "numeric",
              "value": 15,
              "marks": 0,
              "description": "cumulative frequency to 20"
            },
            "c2": {
              "type": "numeric",
              "value": 33,
              "marks": 0,
              "description": "cumulative frequency to 30"
            },
            "c3": {
              "type": "numeric",
              "value": 42,
              "marks": 1,
              "description": "cumulative frequency to 40"
            },
            "c4": {
              "type": "numeric",
              "value": 50,
              "marks": 1,
              "description": "cumulative frequency to 50"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The 50 values, grouped.",
          "headers": [
            "Mass (kg)",
            "0 - 10",
            "10 - 20",
            "20 - 30",
            "30 - 40",
            "40 - 50"
          ],
          "rows": [
            [
              "Frequency",
              "4",
              "11",
              "18",
              "9",
              "8"
            ],
            [
              "Cumulative frequency",
              "4",
              {
                "key": "c1",
                "answer": "15",
                "answerType": "numeric",
                "marks": 0,
                "description": "cumulative frequency to 20"
              },
              {
                "key": "c2",
                "answer": "33",
                "answerType": "numeric",
                "marks": 0,
                "description": "cumulative frequency to 30"
              },
              {
                "key": "c3",
                "answer": "42",
                "answerType": "numeric",
                "marks": 1,
                "description": "cumulative frequency to 40"
              },
              {
                "key": "c4",
                "answer": "50",
                "answerType": "numeric",
                "marks": 1,
                "description": "cumulative frequency to 50"
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Using a scale of 2 cm to represent 10 kg on the horizontal axis and 2 cm to represent 10 values on the vertical axis, draw the cumulative frequency curve for the data. Plot the cumulative frequency against the UPPER boundary of each class.",
        "marks": 3,
        "answer": "the points (10, 4), (20, 15), (30, 33), (40, 42), (50, 50) joined by a smooth curve",
        "solution": "Plot the cumulative frequency at the upper boundary of each class: (10, 4), (20, 15), (30, 33), (40, 42), (50, 50), then join them with a smooth curve.",
        "responseType": "graph",
        "grid": {
          "xMin": 0,
          "xMax": 50,
          "yMin": 0,
          "yMax": 50,
          "xStep": 10,
          "yStep": 10,
          "minorPerStep": 5,
          "xLabel": "Mass (kg)",
          "yLabel": "Cumulative frequency",
          "tools": [
            "point",
            "curve",
            "read"
          ]
        },
        "graph": {
          "points": [
            {
              "x": 10,
              "y": 4
            },
            {
              "x": 20,
              "y": 15
            },
            {
              "x": 30,
              "y": 33
            },
            {
              "x": 40,
              "y": 42
            },
            {
              "x": 50,
              "y": 50
            }
          ],
          "tolerance": 1.2,
          "pointMarks": 2,
          "curve": {
            "expression": "(x <= 20 ? (4 + (x - 10) * 11/10) : (x <= 30 ? (15 + (x - 20) * 9/5) : (x <= 40 ? (33 + (x - 30) * 9/10) : (x <= 50 ? (42 + (x - 40) * 4/5) : 50))))",
            "from": 10,
            "to": 50,
            "tolerance": 3.0,
            "requireSmooth": false
          },
          "curveMarks": 1
        },
        "answerType": "text",
        "responseSchema": {
          "type": "graph",
          "graph": {
            "xMin": 0,
            "xMax": 50,
            "yMin": 0,
            "yMax": 50,
            "xStep": 10,
            "yStep": 10,
            "minorPerStep": 5,
            "snapX": 1.0,
            "snapY": 1.0,
            "xLabel": "Mass (kg)",
            "yLabel": "Cumulative frequency",
            "tools": [
              "point",
              "curve",
              "read"
            ],
            "mode": "curve"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  10,
                  4
                ],
                [
                  20,
                  15
                ],
                [
                  30,
                  33
                ],
                [
                  40,
                  42
                ],
                [
                  50,
                  50
                ]
              ],
              "tolerance": [
                1.2,
                1.2
              ],
              "proportional": true,
              "label": "Accurate plotted points"
            },
            {
              "kind": "graph_curve",
              "marks": 1,
              "minimumPoints": 3,
              "referencePoints": [
                [
                  10,
                  4
                ],
                [
                  20,
                  15
                ],
                [
                  30,
                  33
                ],
                [
                  40,
                  42
                ],
                [
                  50,
                  50
                ]
              ],
              "tolerance": [
                1.2,
                1.2
              ],
              "minimumMatches": 3,
              "increasing": true,
              "requireSmooth": false,
              "label": "Appropriate curve through the plotted data"
            }
          ]
        }
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Use your graph to estimate the MEDIAN of the the masses.",
        "marks": 2,
        "answer": "25.5556",
        "solution": "The median is the 25th value. Reading across from 25 on the cumulative frequency axis to the curve and down to the horizontal axis gives approximately 25.5556 kg.",
        "suffix": " kg",
        "tolerance": 2.5,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "reads across from 25 on the cumulative frequency axis",
            "check": {
              "type": "contains",
              "value": [
                25.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the median",
            "check": {
              "type": "numeric",
              "value": 25.555555555555557,
              "tolerance": 2.5
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 50 values is chosen at random. Determine the probability that it is MORE than 30 kg. Give your answer as a fraction in its lowest terms.",
        "marks": 2,
        "answer": "17/50",
        "solution": "33 of the 50 values are 30 kg or less, so 50 - 33 = 17 are more than 30 kg. The probability is 17/50 = 17/50.",
        "requiredForm": "simplified_fraction",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the number greater than 30 kg",
            "check": {
              "type": "contains",
              "value": [
                17.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the probability in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 0.34,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q5-EJ-B",
    "source": "SPARK Practice Paper F original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2f-q6",
    "question_number": 6,
    "paper": "SPARK Practice Paper F",
    "section": "I",
    "topic": "Geometry and trigonometry",
    "marks": 9,
    "stem": "The diagram below, not drawn to scale, shows a regular octagon, a polygon with 8 equal sides. One of its interior angles is marked x.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the value of x, the size of EACH interior angle of the regular octagon.",
        "marks": 3,
        "answer": "135",
        "solution": "The 8 exterior angles of the polygon add up to 360°, so each exterior angle is 360°/8 = 45°. An interior angle and its exterior angle lie on a straight line, so x = 180 - 45 = 135°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses exterior angle = 360/8",
            "check": {
              "type": "contains",
              "value": [
                45.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "uses interior angle = 180 - exterior angle",
            "check": {
              "type": "contains",
              "value": [
                180.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the interior angle of the regular octagon",
            "check": {
              "type": "numeric",
              "value": 135.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "In the diagram below, not drawn to scale, PQ and RS are parallel straight lines cut by a transversal. Calculate the value of y.",
        "marks": 2,
        "answer": "58",
        "solution": "y and the angle of 58° are alternate angles between the parallel lines PQ and RS, so they are equal. y = 58.",
        "suffix": "°",
        "tolerance": 0.011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 200\" width=\"100%\" style=\"max-width:380px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M46.0 66.0 L326.8 66.0\"/><path d=\"M334.0 66.0 L326.0 71.0 L326.0 61.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M46.0 146.0 L326.8 146.0\"/><path d=\"M334.0 146.0 L326.0 151.0 L326.0 141.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M120 186 L250 26\"/><path d=\"M188.5 66.0 A29 29 0 0 0 199.2 88.5\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"200.6\" y=\"74.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">58&#176;</text><path d=\"M181.5 146.0 A29 29 0 0 0 170.8 123.5\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"169.4\" y=\"138.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y&#176;</text><g stroke=\"none\" fill=\"currentColor\" font-style=\"italic\"><text x=\"32\" y=\"71\">P</text><text x=\"344\" y=\"71\">Q</text><text x=\"32\" y=\"151\">R</text><text x=\"344\" y=\"151\">S</text></g></svg>",
          "alt": "Two parallel straight lines, PQ above and RS below, cut by a transversal that slopes upwards to the right. At PQ an angle of 58 degrees is marked below the line, on the left of the transversal. At RS the angle y is marked above the line, on the right of the transversal. The diagram is not drawn to scale."
        },
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "identifies the pair as alternate angles",
            "check": {
              "type": "method",
              "any": [
                "alternate"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of y",
            "check": {
              "type": "numeric",
              "value": 58.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the reason for your answer in (b), naming the relationship between the two angles.",
        "marks": 2,
        "answer": "y and the angle of 58 degrees are alternate angles between the parallel lines PQ and RS, so the two angles are equal.",
        "solution": "PQ is parallel to RS. The angle marked y and the angle of 58° are alternate angles, and alternate angles between parallel lines are equal. Naming them as alternate angles earns 1 mark and saying that the lines PQ and RS are parallel earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "name",
            "marks": 1,
            "description": "names the angles as alternate angles",
            "any": [
              "alternate"
            ],
            "none": [
              "corresponding",
              "co-interior"
            ]
          },
          {
            "id": "parallel",
            "marks": 1,
            "description": "says that PQ and RS are parallel",
            "any": [
              "parallel"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "names the angles as alternate angles",
            "check": {
              "type": "written",
              "id": "name",
              "description": "names the angles as alternate angles",
              "any": [
                "alternate"
              ],
              "none": [
                "corresponding",
                "co-interior"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "says that PQ and RS are parallel",
            "check": {
              "type": "written",
              "id": "parallel",
              "description": "says that PQ and RS are parallel",
              "any": [
                "parallel"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "A different regular polygon has an interior angle of 156°. Determine the number of sides of this polygon.",
        "marks": 2,
        "answer": "15",
        "solution": "Each exterior angle is 180 - 156 = 24°. The exterior angles add up to 360°, so the number of sides is 360/24 = 15.",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the exterior angle as 180 - the interior angle",
            "check": {
              "type": "contains",
              "value": [
                24.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number of sides",
            "check": {
              "type": "numeric",
              "value": 15.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 300\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M160.0 52.0 L86.5 82.5 L56.0 156.0 L86.5 229.5 L160.0 260.0 L233.5 229.5 L264.0 156.0 L233.5 82.5 Z\" stroke-width=\"1.8\"/><path d=\"M128.6 65.0 A34 34 0 0 0 191.4 65.0\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"160.0\" y=\"70.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">x&#176;</text></svg>",
      "alt": "A regular octagon with 8 equal sides and 8 equal angles. One interior angle is marked x. The diagram is not drawn to scale."
    },
    "design": "Q6-EJ-B",
    "source": "SPARK Practice Paper F original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2f-q7",
    "question_number": 7,
    "paper": "SPARK Practice Paper F",
    "section": "I",
    "topic": "Sequences, patterns and investigation",
    "marks": 10,
    "stem": "The diagrams below show the first three figures in a sequence of designs made from square tiles. In Figure n the shaded tiles form an n by n block, and this block is surrounded by a single border of unshaded tiles. Study the patterns of tiles and answer the questions that follow.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Complete the table below, giving the missing values for Figure 4 and for Figure 10.",
        "marks": 4,
        "answer": "16, 20, 100, 44",
        "solution": "Each figure has one more shaded tile along each side than the figure before, so the shaded tiles are the square numbers and Figure 4 has 4 x 4 = 16 of them. The border grows by 4 tiles each time, from 8 to 12 to 16, so Figure 4 has 20 unshaded tiles. Figure 10 is too large to draw, so use the rules: it has 10 x 10 = 100 shaded tiles and 4 x 10 + 4 = 44 unshaded tiles.",
        "responseType": "table",
        "table": {
          "caption": "The number of tiles in each figure.",
          "headers": [
            "Figure",
            "Number of shaded tiles",
            "Number of unshaded tiles"
          ],
          "rows": [
            [
              "1",
              "1",
              "8"
            ],
            [
              "2",
              "4",
              "12"
            ],
            [
              "3",
              "9",
              "16"
            ],
            [
              "4",
              {
                "blank": true,
                "key": "q4"
              },
              {
                "blank": true,
                "key": "r4"
              }
            ],
            [
              "10",
              {
                "blank": true,
                "key": "q10"
              },
              {
                "blank": true,
                "key": "r10"
              }
            ]
          ],
          "marks": 4,
          "cells": {
            "q4": {
              "type": "numeric",
              "value": 16.0,
              "marks": 1,
              "description": "number of shaded tiles in Figure 4"
            },
            "r4": {
              "type": "numeric",
              "value": 20.0,
              "marks": 1,
              "description": "number of unshaded tiles in Figure 4"
            },
            "q10": {
              "type": "numeric",
              "value": 100.0,
              "marks": 1,
              "description": "number of shaded tiles in Figure 10"
            },
            "r10": {
              "type": "numeric",
              "value": 44.0,
              "marks": 1,
              "description": "number of unshaded tiles in Figure 10"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The number of tiles in each figure.",
          "headers": [
            "Figure",
            "Number of shaded tiles",
            "Number of unshaded tiles"
          ],
          "rows": [
            [
              "1",
              "1",
              "8"
            ],
            [
              "2",
              "4",
              "12"
            ],
            [
              "3",
              "9",
              "16"
            ],
            [
              "4",
              {
                "key": "q4",
                "answer": "16.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "number of shaded tiles in Figure 4"
              },
              {
                "key": "r4",
                "answer": "20.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "number of unshaded tiles in Figure 4"
              }
            ],
            [
              "10",
              {
                "key": "q10",
                "answer": "100.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "number of shaded tiles in Figure 10"
              },
              {
                "key": "r10",
                "answer": "44.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "number of unshaded tiles in Figure 10"
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression, in terms of n, for the number of UNSHADED tiles in Figure n.",
        "marks": 2,
        "answer": "4n + 4",
        "solution": "The border is one tile deep all the way round the n by n block, so it holds n tiles along each of the four sides and one tile at each of the four corners: 4n + 4 tiles. Checking against the table, n = 3 gives 16 and n = 4 gives 20.",
        "answerType": "expression",
        "accepted": [
          "4(n + 1)",
          "4n + 4"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "shows how the unshaded tiles is built up in Figure n",
            "check": {
              "type": "contains",
              "value": [
                4.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for the unshaded tiles",
            "check": {
              "type": "expression",
              "value": "4n + 4",
              "accepted": [
                "4(n + 1)",
                "4n + 4"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the number of the figure that has a total of 361 tiles. Show clearly the equation you use.",
        "marks": 2,
        "answer": "17",
        "solution": "The total number of tiles in Figure n is n^2 + 4n + 4, which is (n + 2)^2. So (n + 2)^2 = 361, giving n + 2 = 19 by taking the positive square root, and n = 17. The figure is Figure 17. Check: 17^2 + 4 x 17 + 4 = 289 + 68 + 4 = 361.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the equation (n + 2)^2 = 361 for the total number of tiles",
            "check": {
              "type": "contains",
              "value": [
                361.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the figure number",
            "check": {
              "type": "numeric",
              "value": 17.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Explain why the number of unshaded tiles in a figure in this sequence can NEVER be 30.",
        "marks": 2,
        "answer": "The number of unshaded tiles in Figure n is 4n + 4, which is 4(n + 1), so it is always a multiple of 4. 30 is not a multiple of 4, because 30 divided by 4 is 7.5, which is not a whole number. There is therefore no figure with exactly 30 unshaded tiles.",
        "solution": "The border holds 4n + 4 = 4(n + 1) tiles, so the number of unshaded tiles is always a multiple of 4: 8, 12, 16, 20, and so on. Saying that the number of unshaded tiles is 4(n + 1), a multiple of 4, earns 1 mark. Saying that 30 is not a multiple of 4, or that 4n + 4 = 30 gives n = 6.5, which is not a whole number, earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "form",
            "marks": 1,
            "description": "states that the number of unshaded tiles is 4n + 4 = 4(n + 1), always a multiple of 4",
            "any": [
              "multiple of 4",
              "4(n + 1)",
              "divisible by 4"
            ]
          },
          {
            "id": "why",
            "marks": 1,
            "description": "states that 30 is not a multiple of 4, so n would not be a whole number",
            "any": [
              "30 is not a multiple of 4",
              "not a whole number",
              "not an integer",
              "7.5"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "states that the number of unshaded tiles is 4n + 4 = 4(n + 1), always a multiple of 4",
            "check": {
              "type": "written",
              "id": "form",
              "description": "states that the number of unshaded tiles is 4n + 4 = 4(n + 1), always a multiple of 4",
              "any": [
                "multiple of 4",
                "4(n + 1)",
                "divisible by 4"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states that 30 is not a multiple of 4, so n would not be a whole number",
            "check": {
              "type": "written",
              "id": "why",
              "description": "states that 30 is not a multiple of 4, so n would not be a whole number",
              "any": [
                "30 is not a multiple of 4",
                "not a whole number",
                "not an integer",
                "7.5"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 272 122\" width=\"100%\" style=\"max-width:272px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"26.0\" y=\"26.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"26.0\" y=\"40.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"26.0\" y=\"54.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"40.0\" y=\"26.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"40.0\" y=\"40.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"40.0\" y=\"54.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"54.0\" y=\"26.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"54.0\" y=\"40.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"54.0\" y=\"54.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><text x=\"47.0\" y=\"106.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 1</text><rect x=\"94.0\" y=\"19.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"94.0\" y=\"33.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"94.0\" y=\"47.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"94.0\" y=\"61.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"108.0\" y=\"19.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"108.0\" y=\"33.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"108.0\" y=\"47.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"108.0\" y=\"61.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"122.0\" y=\"19.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"122.0\" y=\"33.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"122.0\" y=\"47.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"122.0\" y=\"61.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"136.0\" y=\"19.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"136.0\" y=\"33.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"136.0\" y=\"47.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"136.0\" y=\"61.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><text x=\"122.0\" y=\"106.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 2</text><rect x=\"176.0\" y=\"12.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"176.0\" y=\"26.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"176.0\" y=\"40.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"176.0\" y=\"54.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"176.0\" y=\"68.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"190.0\" y=\"12.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"190.0\" y=\"26.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"190.0\" y=\"40.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"190.0\" y=\"54.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"190.0\" y=\"68.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"204.0\" y=\"12.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"204.0\" y=\"26.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"204.0\" y=\"40.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"204.0\" y=\"54.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"204.0\" y=\"68.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"218.0\" y=\"12.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"218.0\" y=\"26.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"218.0\" y=\"40.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"218.0\" y=\"54.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"218.0\" y=\"68.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"232.0\" y=\"12.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"232.0\" y=\"26.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"232.0\" y=\"40.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"232.0\" y=\"54.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><rect x=\"232.0\" y=\"68.0\" width=\"14\" height=\"14\" stroke-width=\"1.2\"/><text x=\"211.0\" y=\"106.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 3</text></svg>",
      "alt": "Three designs made from square tiles. Figure 1 is a single shaded tile with a border of 8 unshaded tiles around it, 9 tiles in all. Figure 2 has a 2 by 2 block of shaded tiles with a border of 12 unshaded tiles, 16 tiles in all. Figure 3 has a 3 by 3 block of shaded tiles with a border of 16 unshaded tiles, 25 tiles in all."
    },
    "design": "Q7-EJ-B",
    "source": "SPARK Practice Paper F original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2f-q8",
    "question_number": 8,
    "paper": "SPARK Practice Paper F",
    "section": "II",
    "topic": "Relations, functions and graphs",
    "marks": 12,
    "stem": "A tailor makes shirts and dresses. In one week x shirts and y dresses are made. The tailor can make at most 30 garments in a week. A shirt takes 2 hours to cut out and a dress takes 1 hour, and there are at most 40 hours of cutting time available.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write TWO inequalities, other than x ≥ 0 and y ≥ 0, to represent the information given.",
        "marks": 4,
        "answer": "x + y <= 30; 2x + y <= 40",
        "solution": "At most 30 in total gives x + y ≤ 30. The second condition gives 2x + y ≤ 40.",
        "answerType": "expression",
        "accepted": [
          "x + y <= 30, 2x + y <= 40"
        ],
        "criteria": [
          {
            "kind": "B",
            "marks": 2,
            "description": "the first inequality",
            "check": {
              "type": "allOf",
              "options": [
                {
                  "type": "inequality",
                  "value": "x + y <= 30"
                }
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 2,
            "description": "the second inequality",
            "check": {
              "type": "allOf",
              "options": [
                {
                  "type": "inequality",
                  "value": "2x + y <= 40"
                }
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B2"
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "The profit on a shirt is $8 and the profit on a dresse is $5. Write an expression, in terms of x and y, for the TOTAL profit, P.",
        "marks": 2,
        "answer": "P = 8x + 5y",
        "solution": "Each of the x shirts earns $8 and each of the y dresses earns $5, so P = 8x + 5y.",
        "answerType": "expression",
        "accepted": [
          "8x + 5y"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses $8 for each of the x shirts",
            "check": {
              "type": "contains",
              "value": [
                8.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for the profit",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "equation",
                  "value": "P = 8x + 5y"
                },
                {
                  "type": "expression",
                  "value": "8x + 5y"
                }
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The vertices of the feasible region are (0, 30), (10, 20), (20, 0). Calculate the profit at EACH of these vertices.",
        "marks": 4,
        "answer": "$150, $180, $160",
        "solution": "Substitute each vertex into P = 8x + 5y: at (0, 30), P = 8(0) + 5(30) = $150; at (10, 20), P = 8(10) + 5(20) = $180; at (20, 0), P = 8(20) + 5(0) = $160.",
        "answerType": "text",
        "accepted": [
          "(0, 30): $150; (10, 20): $180; (20, 0): $160"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes the vertices into P = 8x + 5y",
            "check": {
              "type": "contains",
              "value": [
                150.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "evaluates the profit at every vertex",
            "check": {
              "type": "contains",
              "value": [
                180.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 2,
            "description": "all three profits",
            "check": {
              "type": "set",
              "value": [
                150.0,
                180.0,
                160.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Hence, determine the number of shirts and the number of dresses that a tailor should make each week to obtain the MAXIMUM profit.",
        "marks": 2,
        "answer": "10 shirts and 20 dresses, giving a profit of $180",
        "solution": "The greatest of the profits is $180, at the vertex (10, 20). So 10 shirts and 20 dresses should be made.",
        "answerType": "text",
        "accepted": [
          "10, 20",
          "(10, 20)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "selects the vertex giving the greatest profit",
            "check": {
              "type": "contains",
              "value": [
                180.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "10 shirts and 20 dresses",
            "check": {
              "type": "set",
              "value": [
                10.0,
                20.0,
                180.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "section_heading": "ALGEBRA, RELATIONS, FUNCTIONS AND GRAPHS",
    "design": "Q8-EJ-B",
    "source": "SPARK Practice Paper F original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2f-q9",
    "question_number": 9,
    "paper": "SPARK Practice Paper F",
    "section": "II",
    "topic": "Geometry and trigonometry",
    "marks": 12,
    "stem": "The diagram below, not drawn to scale, shows a vertical flagpole TB standing on level horizontal ground. The points C, A, B and D lie on a straight line on the ground, with A between C and B, and B between A and D. AB = 30 m and the angle of elevation of the top, T, of the flagpole from A is 38°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate, correct to 1 decimal place, the height, TB, of the flagpole.",
        "marks": 3,
        "answer": "23.4",
        "solution": "Triangle TBA is right-angled at B, so tan 38° = TB/AB = TB/30. Therefore TB = 30 x tan 38° = 23.4386 = 23.4 m, correct to 1 decimal place.",
        "suffix": " m",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses tan = opposite/adjacent in triangle TBA",
            "check": {
              "type": "method",
              "any": [
                "tan"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes to give TB = 30 tan 38",
            "check": {
              "type": "contains",
              "value": [
                30.0,
                38.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "TB = 23.4 m",
            "check": {
              "type": "numeric",
              "value": 23.438568795201522,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "The angle of elevation of T from C is 22°. Calculate, correct to 1 decimal place, the length of AC.",
        "marks": 4,
        "answer": "28.0",
        "solution": "Triangle TBC is right-angled at B, so tan 22° = TB/CB, which gives CB = TB / tan 22°. So CB = 23.4386 / tan 22° = 58.01 m. Since A lies between C and B, AC = CB - AB = 58.01 - 30 = 28.01 = 28.0 m, correct to 1 decimal place.",
        "suffix": " m",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses tan 22 = TB/CB in triangle TBC",
            "check": {
              "type": "method",
              "any": [
                "tan"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "rearranges to CB = TB / tan 22",
            "check": {
              "type": "contains",
              "value": [
                22.0,
                23.4386
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "CB = 58.01 m and AC = CB - 30",
            "check": {
              "type": "contains",
              "value": [
                58.01,
                30.0
              ]
            },
            "field": "all",
            "code": "M3"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "AC = 28.0 m",
            "check": {
              "type": "numeric",
              "value": 28.01249348789672,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "a/tan(22) - 30"
            },
            "code": "A1",
            "depends": [
              "M3"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "D is a point on the ground on the opposite side of the flagpole from A, with BD = 25 m. Calculate, correct to 1 decimal place, the angle of depression of D from T.",
        "marks": 3,
        "answer": "43.2",
        "solution": "The angle of depression of D from T is equal to the angle of elevation of T from D, which is angle TDB. Triangle TBD is right-angled at B, with TB = 23.4386 m and BD = 25 m, so tan(angle TDB) = TB/BD = 0.9375. So angle TDB = 43.15 = 43.2°, and the angle of depression of D from T is 43.2°, correct to 1 decimal place.",
        "suffix": "°",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses tan(angle TDB) = TB/BD in triangle TBD",
            "check": {
              "type": "method",
              "any": [
                "tan"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes TB and BD = 25 correctly",
            "check": {
              "type": "contains",
              "value": [
                23.4386,
                25.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "angle of depression = 43.2 degrees",
            "check": {
              "type": "numeric",
              "value": 43.153693389213196,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "atan(a/25)"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Explain why the angle of elevation of T from A is EQUAL to the angle of depression of A from T.",
        "marks": 2,
        "answer": "The horizontal line drawn through T is parallel to the level ground AB, and AT is a transversal cutting both of them. The angle of elevation of T from A and the angle of depression of A from T are therefore alternate angles between parallel lines, and alternate angles are equal.",
        "solution": "The angle of elevation is measured at A from the horizontal ground AB up to AT, and the angle of depression is measured at T from the horizontal line through T down to TA. The horizontal line through T is parallel to AB because both are horizontal, and AT is a transversal cutting this pair of parallel lines. The two angles are alternate angles (Z angles) between the parallel lines, so they are equal.",
        "responseType": "written",
        "rubric": [
          {
            "id": "r1",
            "marks": 1,
            "description": "states that the horizontal line through T is parallel to the ground AB",
            "any": [
              "parallel"
            ]
          },
          {
            "id": "r2",
            "marks": 1,
            "description": "identifies the two angles as alternate angles, which are equal",
            "any": [
              "alternate",
              "z angles"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "states that the horizontal line through T is parallel to the ground AB",
            "check": {
              "type": "written",
              "id": "r1",
              "description": "states that the horizontal line through T is parallel to the ground AB",
              "any": [
                "parallel"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "identifies the two angles as alternate angles, which are equal",
            "check": {
              "type": "written",
              "id": "r2",
              "description": "identifies the two angles as alternate angles, which are equal",
              "any": [
                "alternate",
                "z angles"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      }
    ],
    "section_heading": "GEOMETRY AND TRIGONOMETRY",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 290\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M30 236 L326 236\"/><path d=\"M300 236 L300 86.5\" stroke-width=\"2\"/><path d=\"M56 236 L300 86.5\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><path d=\"M300.0 223.0 L287.0 223.0 L287.0 236.0\" stroke-width=\"1.2\"/><path d=\"M96.0 236.0 A40 40 0 0 0 90.1 215.1\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"79.2\" y=\"229.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">38&#176;</text><text x=\"178.0\" y=\"256.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">30 m</text><text x=\"326.0\" y=\"161.2\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\"></text><text x=\"44.0\" y=\"254.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"306.0\" y=\"74.5\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">T</text><text x=\"314.0\" y=\"242.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text></svg>",
      "alt": "A diagram, not drawn to scale, of a vertical flagpole TB standing on level horizontal ground. B is the foot of the flagpole and T is its top. A is a point on the ground with AB marked 30 m, and the right angle at B between the ground and the flagpole is marked. A broken line is drawn from A to T and the angle of elevation of T from A is marked 38 degrees."
    },
    "design": "Q9-EJ-B",
    "source": "SPARK Practice Paper F original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2f-q10",
    "question_number": 10,
    "paper": "SPARK Practice Paper F",
    "section": "II",
    "topic": "Vectors and matrices",
    "marks": 12,
    "stem": "The diagram below, not drawn to scale, shows triangle OAB in which \\vec{OA} = a and \\vec{OB} = b. M is the midpoint of OA and N is the midpoint of OB.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Write \\vec{AB} in terms of a and b.",
        "marks": 2,
        "answer": "b - a",
        "solution": "\\vec{AB} = \\vec{AO} + \\vec{OB} = -a + b = b - a.",
        "answerType": "expression",
        "accepted": [
          "-a + b"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses \\vec{AB} = \\vec{AO} + \\vec{OB}",
            "check": {
              "type": "method",
              "any": [
                "\\vec{AO} + \\vec{OB}",
                "AO + OB",
                "-a + b",
                "b - a"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for \\vec{AB}",
            "check": {
              "type": "expression",
              "value": "b - a",
              "accepted": [
                "-a + b"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Write \\vec{AN} in terms of a and b.",
        "marks": 2,
        "answer": "(1/2)b - a",
        "solution": "N is the midpoint of OB, so \\vec{ON} = (1/2)b. Then \\vec{AN} = \\vec{AO} + \\vec{ON} = -a + (1/2)b = (1/2)b - a.",
        "answerType": "expression",
        "accepted": [
          "-a + (1/2)b",
          "(b - 2a)/2"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses \\vec{ON} = (1/2)b",
            "check": {
              "type": "method",
              "any": [
                "\\vec{ON} = (1/2)b",
                "(1/2)b",
                "b/2",
                "0.5b",
                "1/2 b",
                "(b - 2a)"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for \\vec{AN}",
            "check": {
              "type": "expression",
              "value": "(1/2)b - a",
              "accepted": [
                "-a + (1/2)b",
                "(b - 2a)/2"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine \\vec{MN} in terms of a and b, giving your answer in its simplest form.",
        "marks": 3,
        "answer": "(1/2)b - (1/2)a",
        "solution": "M is the midpoint of OA, so \\vec{OM} = (1/2)a, and \\vec{ON} = (1/2)b. Then \\vec{MN} = \\vec{MO} + \\vec{ON} = -(1/2)a + (1/2)b = (1/2)(b - a).",
        "answerType": "expression",
        "accepted": [
          "(1/2)(b - a)",
          "(b - a)/2"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes \\vec{OM} = (1/2)a and \\vec{ON} = (1/2)b",
            "check": {
              "type": "method",
              "any": [
                "\\vec{OM} = (1/2)a",
                "(1/2)a",
                "a/2",
                "0.5a",
                "(1/2)(b - a)",
                "(b - a)/2"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "uses \\vec{MN} = \\vec{MO} + \\vec{ON}",
            "check": {
              "type": "method",
              "any": [
                "\\vec{MO} + \\vec{ON}",
                "\\vec{ON} - \\vec{OM}",
                "MO + ON",
                "(1/2)b - (1/2)a",
                "(1/2)(b - a)",
                "(b - a)/2",
                "0.5b - 0.5a"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the simplified expression for \\vec{MN}",
            "check": {
              "type": "expression",
              "value": "(1/2)b - (1/2)a",
              "accepted": [
                "(1/2)(b - a)",
                "(b - a)/2"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Show that \\vec{MN} is parallel to \\vec{AB}, and hence state, giving a reason, the type of quadrilateral ABNM.",
        "marks": 3,
        "answer": "\\vec{MN} = (1/2)(b - a) = (1/2)\\vec{AB}, so \\vec{MN} is a scalar multiple of \\vec{AB} and MN is parallel to AB. In the quadrilateral ABNM the sides AB and NM are parallel, but BN and MA are not, so exactly one pair of opposite sides is parallel and ABNM is a trapezium.",
        "solution": "From (a) (i), \\vec{AB} = b - a, and from (b), \\vec{MN} = (1/2)(b - a). Hence \\vec{MN} = (1/2)\\vec{AB}. One vector is a scalar multiple of the other, so MN is parallel to AB and half its length. In ABNM the sides AB and NM are therefore parallel, while \\vec{BN} = -(1/2)b and \\vec{MA} = (1/2)a are not parallel, because a and b are not parallel. A quadrilateral with exactly one pair of parallel sides is a trapezium.",
        "responseType": "written",
        "rubric": [
          {
            "id": "multiple",
            "marks": 1,
            "description": "shows that \\vec{MN} is (1/2)\\vec{AB}, a scalar multiple of it",
            "any": [
              "scalar multiple",
              "multiple of",
              "1/2",
              "half",
              "0.5"
            ]
          },
          {
            "id": "parallel",
            "marks": 1,
            "description": "states that MN is parallel to AB",
            "any": [
              "parallel",
              "same direction",
              "same gradient"
            ]
          },
          {
            "id": "trapezium",
            "marks": 1,
            "description": "names ABNM as a trapezium",
            "any": [
              "trapezium",
              "trapezoid"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "shows that \\vec{MN} is (1/2)\\vec{AB}, a scalar multiple of it",
            "check": {
              "type": "written",
              "id": "multiple",
              "description": "shows that \\vec{MN} is (1/2)\\vec{AB}, a scalar multiple of it",
              "any": [
                "scalar multiple",
                "multiple of",
                "1/2",
                "half",
                "0.5"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states that MN is parallel to AB",
            "check": {
              "type": "written",
              "id": "parallel",
              "description": "states that MN is parallel to AB",
              "any": [
                "parallel",
                "same direction",
                "same gradient"
              ]
            },
            "field": "answer",
            "code": "B2"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "names ABNM as a trapezium",
            "check": {
              "type": "written",
              "id": "trapezium",
              "description": "names ABNM as a trapezium",
              "any": [
                "trapezium",
                "trapezoid"
              ]
            },
            "field": "answer",
            "code": "B3"
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "The vectors a and b are given by a = [[3], [1]] and b = [[8], [4]]. Calculate |\\vec{AB}|, the magnitude of \\vec{AB}, giving your answer in EXACT form.",
        "marks": 2,
        "answer": "sqrt(34)",
        "solution": "\\vec{AB} = b - a = [[8], [4]] - [[3], [1]] = [[5], [3]]. So |\\vec{AB}| = sqrt((5)^2 + (3)^2) = sqrt(25 + 9) = sqrt(34), which is 5.83 correct to 2 decimal places.",
        "answerType": "expression",
        "accepted": [
          "5.83"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses |v| = sqrt(x^2 + y^2)",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    34.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    25.0,
                    9.0
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the magnitude of \\vec{AB}",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "expression",
                  "value": "sqrt(34)",
                  "accepted": [
                    "5.83"
                  ]
                },
                {
                  "type": "numeric",
                  "value": 5.830951894845301,
                  "tolerance": 0.01
                }
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "A1"
          }
        ]
      }
    ],
    "section_heading": "VECTORS AND MATRICES",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 370 300\" width=\"100%\" style=\"max-width:350px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M66.0 254.0 L150.0 66.0 L312.0 178.0 Z\"/><path d=\"M66.0 254.0 L89.6 201.2\" stroke-width=\"2.6\"/><path d=\"M92.9 193.8 L94.3 204.3 L84.1 199.8 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M66.0 254.0 L137.0 232.1\" stroke-width=\"2.6\"/><path d=\"M144.7 229.7 L137.8 237.7 L134.5 227.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M108.0 160.0 L189.0 216.0\" stroke-dasharray=\"6 4\" stroke-width=\"1.5\"/><circle cx=\"108.0\" cy=\"160.0\" r=\"3.6\" fill=\"currentColor\"/><circle cx=\"189.0\" cy=\"216.0\" r=\"3.6\" fill=\"currentColor\"/><text x=\"48.0\" y=\"264.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text><text x=\"150.0\" y=\"46.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"332.0\" y=\"178.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"84.0\" y=\"158.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">M</text><text x=\"195.0\" y=\"239.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">N</text><text x=\"64.0\" y=\"218.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"15\" font-style=\"italic\" font-weight=\"bold\">a</text><text x=\"123.0\" y=\"251.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"15\" font-style=\"italic\" font-weight=\"bold\">b</text></svg>",
      "alt": "Triangle OAB, not drawn to scale. An arrow from O along OA is labelled a and an arrow from O along OB is labelled b. M, the midpoint of OA, and N, the midpoint of OB, are marked with dots and joined by a broken line, so that ABNM is a quadrilateral."
    },
    "design": "Q10-EJ-B",
    "source": "SPARK Practice Paper F original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2g-q1",
    "question_number": 1,
    "paper": "SPARK Practice Paper G",
    "section": "I",
    "topic": "Number theory and computation",
    "marks": 9,
    "stem": "Island Appliances advertises a refrigerator at a marked price of $6,400.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (2 3/5 - 7/10) ÷ (3/4 + 1/6), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "114/55",
        "solution": "2 3/5 = 13/5, so the numerator is 13/5 - 7/10 = 19/10. The denominator is 3/4 + 1/6 = 11/12. Dividing means multiplying by the reciprocal: 19/10 x 12/11 = 114/55.",
        "cao": true,
        "requiredForm": "simplified_fraction",
        "accepted": [
          "2 4/55"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the numerator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                1.9
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the denominator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                0.9166666666666666
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the exact value in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 2.0727272727272728,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "A discount of 12.5% is offered for payment in cash. Calculate the cash price of the refrigerator.",
        "marks": 2,
        "answer": "5600.00",
        "solution": "The discount is 12.5% of $6,400 = $800.00. The cash price is $6,400 - $800.00 = $5,600.00.",
        "prefix": "$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds 12.5% of $6,400",
            "check": {
              "type": "contains",
              "value": [
                800.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the cash price",
            "check": {
              "type": "numeric",
              "value": 5600.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Value Added Tax of 15% is then added to the cash price. Calculate the amount the customer actually pays.",
        "marks": 2,
        "answer": "6440.00",
        "solution": "VAT = 15% of $5,600.00 = $840.00. The customer pays $5,600.00 + $840.00 = $6,440.00.",
        "prefix": "$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds 15% of the cash price",
            "check": {
              "type": "contains",
              "value": [
                840.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the amount paid",
            "check": {
              "type": "numeric",
              "value": 6440.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b1"
              ],
              "formula": "b1 * 1.15"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The refrigerator may instead be bought on hire purchase, by paying a deposit of $1,200 and 15 monthly instalments of $425. Calculate how much MORE than the amount in (b) (ii) is paid under this arrangement.",
        "marks": 2,
        "answer": "1135.00",
        "solution": "The hire purchase price is $1,200 + 15 x $425 = $1,200 + $6,375 = $7,575.00. That is $7,575.00 - $6,440.00 = $1,135.00 more.",
        "prefix": "$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the total hire purchase price",
            "check": {
              "type": "contains",
              "value": [
                7575.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the extra amount paid",
            "check": {
              "type": "numeric",
              "value": 1135.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b2"
              ],
              "formula": "7575.0 - b2"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q1-EJ-A",
    "source": "SPARK Practice Paper G original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2g-q2",
    "question_number": 2,
    "paper": "SPARK Practice Paper G",
    "section": "I",
    "topic": "Algebra",
    "marks": 9,
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Given that W = (4m^2 + 3n)/(2m + n), calculate the value of W when m = 3 and n = -4.",
        "marks": 2,
        "answer": "12",
        "solution": "Substituting m = 3 and n = -4: the numerator is 4(3)^2 + 3(-4) = 36 - 12 = 24, and the denominator is 2(3) + (-4) = 6 - 4 = 2. So W = 24/2 = 12.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes m = 3 and n = -4 into the formula",
            "check": {
              "type": "contains",
              "value": [
                3.0,
                -4.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of W",
            "check": {
              "type": "numeric",
              "value": 12.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Expand and simplify (3y + 4)(2y - 5).",
        "marks": 2,
        "answer": "6y^2 - 7y - 20",
        "solution": "Multiplying each term in the first bracket by each term in the second: (3y + 4)(2y - 5) = 6y^2 - 15y + 8y - 20. Collecting the two terms in y: 6y^2 - 7y - 20.",
        "answerType": "expression",
        "accepted": [
          "6y^2 - 20 - 7y"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies out to give the four products",
            "check": {
              "type": "contains",
              "value": [
                15.0,
                8.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expansion in its simplest form",
            "check": {
              "type": "expression",
              "value": "6y^2 - 7y - 20",
              "accepted": [
                "6y^2 - 20 - 7y"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Factorise COMPLETELY: 2x^2 + 10x + 12",
        "marks": 2,
        "answer": "2(x + 2)(x + 3)",
        "solution": "Take out the common factor 2: 2(x^2 + 5x + 6). Two numbers whose product is 6 and whose sum is 5 are 2 and 3, so 2x^2 + 10x + 12 = 2(x + 2)(x + 3).",
        "answerType": "expression",
        "requiredForm": "factorised",
        "accepted": [
          "2(x + 3)(x + 2)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "takes out the common factor 2",
            "check": {
              "type": "method",
              "any": [
                "common factor 2"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the complete factorisation",
            "check": {
              "type": "expression",
              "value": "2(x + 2)(x + 3)",
              "accepted": [
                "2(x + 3)(x + 2)"
              ],
              "requireFactorised": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Solve the inequality 7x + 4 ≥ 3x - 9, and state the SMALLEST integer value of x that satisfies it.",
        "marks": 3,
        "answer": "x >= -13/4; the smallest integer value of x is -3",
        "solution": "7x + 4 ≥ 3x - 9. Collecting the terms in x on one side and the numbers on the other: 4x ≥ -13. Dividing both sides by 4: x ≥ -13/4. Since -13/4 lies between -4 and -3, the smallest integer value of x that satisfies the inequality is -3.",
        "accepted": [
          "x >= -3 1/4; the smallest integer value of x is -3",
          "x >= -13/4, x = -3"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "collects the terms in x on one side",
            "check": {
              "type": "contains",
              "value": [
                4.0,
                -13.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "solves the inequality",
            "check": {
              "type": "inequality",
              "value": "x >= -13/4"
            },
            "field": "all",
            "code": "A1",
            "depends": [
              "M1"
            ]
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states the smallest integer value of x",
            "check": {
              "type": "numeric",
              "value": -3.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      }
    ],
    "design": "Q2-EJ-A",
    "source": "SPARK Practice Paper G original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2g-q3",
    "question_number": 3,
    "paper": "SPARK Practice Paper G",
    "section": "I",
    "topic": "Relations, functions and graphs",
    "marks": 9,
    "stem": "A(-5, 6) and B(3, 2) are two points in the Cartesian plane.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "On the grid provided, plot the points A(-5, 6) and B(3, 2).",
        "marks": 2,
        "answer": "A(-5, 6) and B(3, 2) correctly plotted",
        "solution": "A(-5, 6) is 5 units to the left of the y-axis and 6 units above the x-axis. B(3, 2) is 3 units to the right of the y-axis and 2 units above the x-axis. Each point is marked where those two grid lines cross.",
        "responseType": "graph",
        "grid": {
          "xMin": -6,
          "xMax": 6,
          "yMin": -4,
          "yMax": 8,
          "xStep": 1,
          "yStep": 1,
          "minorPerStep": 2,
          "xLabel": "x",
          "yLabel": "y",
          "tools": [
            "point"
          ]
        },
        "graph": {
          "points": [
            {
              "x": -5,
              "y": 6
            },
            {
              "x": 3,
              "y": 2
            }
          ],
          "tolerance": 0.25,
          "pointMarks": 2
        },
        "answerType": "text",
        "responseSchema": {
          "type": "graph",
          "graph": {
            "xMin": -6,
            "xMax": 6,
            "yMin": -4,
            "yMax": 8,
            "xStep": 1,
            "yStep": 1,
            "minorPerStep": 2,
            "snapX": 0.25,
            "snapY": 0.25,
            "xLabel": "x",
            "yLabel": "y",
            "tools": [
              "point"
            ],
            "mode": "curve"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  -5,
                  6
                ],
                [
                  3,
                  2
                ]
              ],
              "tolerance": [
                0.25,
                0.25
              ],
              "proportional": true,
              "label": "Accurate plotted points"
            }
          ]
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the coordinates of the midpoint of AB.",
        "marks": 2,
        "answer": "(-1, 4)",
        "solution": "The midpoint of AB is ((-5) + (3))/2 for the x-coordinate and ((6) + (2))/2 for the y-coordinate. Now (-5) + (3) = -2 and (6) + (2) = 8, so the midpoint of AB is (-1, 4).",
        "answerType": "coordinate",
        "accepted": [],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "adds the two x-coordinates and the two y-coordinates, and halves each sum",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    -2.0,
                    8.0
                  ]
                },
                {
                  "type": "coordinate",
                  "value": [
                    -1.0,
                    4.0
                  ],
                  "tolerance": 1e-06
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the coordinates of the midpoint",
            "check": {
              "type": "coordinate",
              "value": [
                -1.0,
                4.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the gradient of AB.",
        "marks": 2,
        "answer": "-1/2",
        "solution": "The gradient of AB is (the change in y)/(the change in x). The change in y is (2) - (6) = -4 and the change in x is (3) - (-5) = 8, so the gradient of AB is -4/8 = -1/2.",
        "accepted": [
          "-0.5"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses gradient = (y2 - y1)/(x2 - x1)",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    -4.0,
                    8.0
                  ]
                },
                {
                  "type": "numeric",
                  "value": -0.5,
                  "tolerance": 1e-06
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the gradient of AB",
            "check": {
              "type": "numeric",
              "value": -0.5,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the equation of the line AB, giving your answer in the form y = mx + c.",
        "marks": 3,
        "answer": "y = (-1/2)x + 7/2",
        "solution": "The gradient is m = -1/2. Substituting m = -1/2 and the point A(-5, 6) into y = mx + c gives (6) = (-1/2)(-5) + c, that is (6) = 5/2 + c, so c = (6) - (5/2) = 7/2. The equation of the line AB is y = (-1/2)x + 7/2.",
        "answerType": "expression",
        "accepted": [
          "y = -1/2x + 7/2",
          "y = -0.5x + 3.5"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes the gradient and the coordinates of a point on the line into y = mx + c",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "method",
                  "any": [
                    "y = mx + c",
                    "substituting"
                  ]
                },
                {
                  "type": "equation",
                  "value": "y = (-1/2)x + 7/2"
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of the intercept c",
            "check": {
              "type": "contains",
              "value": [
                3.5
              ]
            },
            "field": "all",
            "ecf": {
              "uses": [
                "c"
              ],
              "formula": "(6) - c * (-5)"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the equation of AB in the form y = mx + c",
            "check": {
              "type": "equation",
              "value": "y = (-1/2)x + 7/2"
            },
            "field": "answer",
            "code": "A2",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q3-EJ-A",
    "source": "SPARK Practice Paper G original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2g-q4",
    "question_number": 4,
    "paper": "SPARK Practice Paper G",
    "section": "I",
    "topic": "Measurement and construction",
    "marks": 9,
    "stem": "The line AB, 8 cm long, and the point K are already drawn on the construction pad.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Using only a ruler and a pair of compasses, construct the perpendicular bisector of AB. Your construction arcs must be clearly shown.",
        "marks": 3,
        "answer": "the perpendicular bisector of AB, with the construction arcs shown",
        "solution": "Open the compasses to more than half of AB. With centre A draw arcs above and below AB; with the SAME radius and centre B draw two more, cutting the first pair. Rule the line through the two crossing points. That line is the perpendicular bisector of AB, and the arcs must be left on the page.",
        "responseType": "construction",
        "pad": {
          "width": 560,
          "height": 340,
          "unitsPerCm": 40,
          "given": [
            {
              "id": "A",
              "x": 2.0,
              "y": 2.5
            },
            {
              "id": "B",
              "x": 10.0,
              "y": 2.5
            },
            {
              "id": "K",
              "x": 8.5,
              "y": 6.0
            }
          ],
          "givenSegments": [
            [
              "A",
              "B"
            ]
          ]
        },
        "construction": {
          "construction": "perpendicularBisector",
          "args": [
            {
              "id": "A",
              "x": 2.0,
              "y": 2.5
            },
            {
              "id": "B",
              "x": 10.0,
              "y": 2.5
            }
          ]
        },
        "answerType": "text",
        "responseSchema": {
          "type": "construction",
          "pad": {
            "width": 560,
            "height": 340,
            "unitsPerCm": 40,
            "given": [
              {
                "id": "A",
                "x": 2.0,
                "y": 2.5
              },
              {
                "id": "B",
                "x": 10.0,
                "y": 2.5
              },
              {
                "id": "K",
                "x": 8.5,
                "y": 6.0
              }
            ],
            "givenSegments": [
              [
                "A",
                "B"
              ]
            ]
          },
          "construction": {
            "construction": "perpendicularBisector",
            "args": [
              {
                "id": "A",
                "x": 2.0,
                "y": 2.5
              },
              {
                "id": "B",
                "x": 10.0,
                "y": 2.5
              }
            ],
            "marks": 3
          },
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "allowProtractor": false
        }
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Your bisector cuts AB at M. State the length of AM.",
        "marks": 1,
        "answer": "4",
        "solution": "The perpendicular bisector of AB cuts AB at its midpoint, so AM = (1/2) x 8 = 4 cm.",
        "suffix": " cm",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the length of AM",
            "check": {
              "type": "numeric",
              "value": 4.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Measure and state, in centimetres, the length of KM. Give your answer correct to 1 decimal place.",
        "marks": 2,
        "answer": "4.3",
        "solution": "M is the midpoint of AB, so KM is measured with the ruler from K to M and is 4.3 cm. (A check by Pythagoras' theorem: K is 2.5 cm to the right of M and 3.5 cm above it, so KM = sqrt(18.5) = 4.30 cm.) A reading within 0.5 cm earns the first mark and a reading within 0.25 cm earns the second.",
        "suffix": " cm",
        "tolerance": 0.25,
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "a reading within 0.5 cm of the correct value",
            "check": {
              "type": "numeric",
              "value": 4.301162633521313,
              "tolerance": 0.5
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "the value correct to within 0.25 cm",
            "check": {
              "type": "numeric",
              "value": 4.301162633521313,
              "tolerance": 0.25
            },
            "field": "answer",
            "depends": [],
            "code": "B2"
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The diagram below, not drawn to scale, shows a plot of land PQRS in the shape of a trapezium. PQ = 20 cm and SR = 12 cm are parallel, and the perpendicular distance between them is 9 cm. A triangular pond with base 6 cm and perpendicular height 5 cm is cut out of the plot. Calculate the area of the part of the plot that remains.",
        "marks": 3,
        "answer": "129",
        "solution": "Area of the trapezium = (1/2) x (20 + 12) x 9 = (1/2) x 32 x 9 = 144 cm^2. Area of the triangular pond = (1/2) x 6 x 5 = 15 cm^2. Area remaining = 144 - 15 = 129 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 268\" width=\"100%\" style=\"max-width:372px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M50 214 L330 214 L274 88 L106 88 Z\" stroke-width=\"1.8\"/><path d=\"M146 190 L230 190 L188 120 Z\" fill=\"currentColor\" fill-opacity=\"0.14\"/><path d=\"M188 120 L188 190\" stroke-dasharray=\"4 4\" stroke-width=\"1.1\"/><path d=\"M274 92 L274 214\" stroke-dasharray=\"5 4\" stroke-width=\"1.1\"/><text x=\"190.0\" y=\"238.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">20 cm</text><text x=\"190.0\" y=\"76.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">12 cm</text><text x=\"284.0\" y=\"151.0\" text-anchor=\"start\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">9 cm</text><text x=\"188.0\" y=\"207.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6 cm</text><text x=\"180.0\" y=\"155.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5 cm</text><text x=\"40.0\" y=\"220.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">P</text><text x=\"340.0\" y=\"220.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Q</text><text x=\"286.0\" y=\"80.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">R</text><text x=\"94.0\" y=\"80.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">S</text></svg>",
          "alt": "A trapezium PQRS with the longer parallel side PQ of 20 cm at the bottom and the shorter parallel side SR of 12 cm at the top. The perpendicular distance between the two parallel sides is marked 9 cm. A shaded triangle inside the trapezium, with base 6 cm and perpendicular height 5 cm marked, has been removed from the plot. The diagram is not drawn to scale."
        },
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses area of a trapezium = (1/2) x (a + b) x h",
            "check": {
              "type": "contains",
              "value": [
                144.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the area of the triangle as (1/2) x base x height",
            "check": {
              "type": "contains",
              "value": [
                15.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the area that remains",
            "check": {
              "type": "numeric",
              "value": 129.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      }
    ],
    "design": "Q4-EJ-A",
    "source": "SPARK Practice Paper G original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2g-q5",
    "question_number": 5,
    "paper": "SPARK Practice Paper G",
    "section": "I",
    "topic": "Statistics and probability",
    "marks": 9,
    "stem": "The table below shows the marks scored by 50 candidates in a class test.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table below.",
        "marks": 3,
        "answer": "25.5, 35.5, 45.5; 459, 461.5, 273",
        "solution": "The mid-interval value is the mean of the class boundaries, and f x is the frequency times that value: (21 + 30)/2 = 25.5, 18 x 25.5 = 459; (31 + 40)/2 = 35.5, 13 x 35.5 = 461.5; (41 + 50)/2 = 45.5, 6 x 45.5 = 273.",
        "responseType": "table",
        "table": {
          "caption": "The mid-interval value of a class is the mean of its two boundaries.",
          "headers": [
            "Mark",
            "Frequency",
            "Mid-interval value",
            "f x"
          ],
          "rows": [
            [
              "1 - 10",
              "4",
              "5.5",
              "22"
            ],
            [
              "11 - 20",
              "9",
              "15.5",
              "139.5"
            ],
            [
              "21 - 30",
              "18",
              {
                "blank": true,
                "key": "m2"
              },
              {
                "blank": true,
                "key": "p2"
              }
            ],
            [
              "31 - 40",
              "13",
              {
                "blank": true,
                "key": "m3"
              },
              {
                "blank": true,
                "key": "p3"
              }
            ],
            [
              "41 - 50",
              "6",
              {
                "blank": true,
                "key": "m4"
              },
              {
                "blank": true,
                "key": "p4"
              }
            ]
          ],
          "marks": 3,
          "cells": {
            "m2": {
              "type": "numeric",
              "value": 25.5,
              "marks": 1,
              "description": "mid-interval value of 21 - 30"
            },
            "m3": {
              "type": "numeric",
              "value": 35.5,
              "marks": 0,
              "description": "mid-interval value of 31 - 40"
            },
            "m4": {
              "type": "numeric",
              "value": 45.5,
              "marks": 0,
              "description": "mid-interval value of 41 - 50"
            },
            "p2": {
              "type": "numeric",
              "value": 459.0,
              "marks": 0,
              "description": "f x for 21 - 30"
            },
            "p3": {
              "type": "numeric",
              "value": 461.5,
              "marks": 1,
              "description": "f x for 31 - 40"
            },
            "p4": {
              "type": "numeric",
              "value": 273.0,
              "marks": 1,
              "description": "f x for 41 - 50"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The mid-interval value of a class is the mean of its two boundaries.",
          "headers": [
            "Mark",
            "Frequency",
            "Mid-interval value",
            "f x"
          ],
          "rows": [
            [
              "1 - 10",
              "4",
              "5.5",
              "22"
            ],
            [
              "11 - 20",
              "9",
              "15.5",
              "139.5"
            ],
            [
              "21 - 30",
              "18",
              {
                "key": "m2",
                "answer": "25.5",
                "answerType": "numeric",
                "marks": 1,
                "description": "mid-interval value of 21 - 30"
              },
              {
                "key": "p2",
                "answer": "459.0",
                "answerType": "numeric",
                "marks": 0,
                "description": "f x for 21 - 30"
              }
            ],
            [
              "31 - 40",
              "13",
              {
                "key": "m3",
                "answer": "35.5",
                "answerType": "numeric",
                "marks": 0,
                "description": "mid-interval value of 31 - 40"
              },
              {
                "key": "p3",
                "answer": "461.5",
                "answerType": "numeric",
                "marks": 1,
                "description": "f x for 31 - 40"
              }
            ],
            [
              "41 - 50",
              "6",
              {
                "key": "m4",
                "answer": "45.5",
                "answerType": "numeric",
                "marks": 0,
                "description": "mid-interval value of 41 - 50"
              },
              {
                "key": "p4",
                "answer": "273.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "f x for 41 - 50"
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the modal class.",
        "marks": 1,
        "answer": "21 - 30",
        "solution": "The class 21 - 30 has the highest frequency, 18.",
        "answerType": "text",
        "accepted": [
          "21-30"
        ],
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the modal class",
            "check": {
              "type": "set",
              "value": [
                21.0,
                30.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate an ESTIMATE of the mean, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "27.1",
        "solution": "Use the mid-interval values 5.5, 15.5, 25.5, 35.5, 45.5. The sum of f x is 22 + 139.5 + 459 + 461.5 + 273 = 1355. The estimated mean is 1355/50 = 27.1.",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the mid-interval values",
            "check": {
              "type": "contains",
              "value": [
                45.5
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the sum of f x",
            "check": {
              "type": "contains",
              "value": [
                1355.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the estimated mean",
            "check": {
              "type": "numeric",
              "value": 27.1,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 50 values is chosen at random. Determine the probability that it is AT LEAST 31. Give your answer as a fraction in its lowest terms.",
        "marks": 2,
        "answer": "19/50",
        "solution": "19 of the 50 values are at least 31, so the probability is 19/50 = 19/50.",
        "requiredForm": "simplified_fraction",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds how many are at least 31",
            "check": {
              "type": "contains",
              "value": [
                19.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the probability in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 0.38,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q5-EJ-A",
    "source": "SPARK Practice Paper G original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2g-q6",
    "question_number": 6,
    "paper": "SPARK Practice Paper G",
    "section": "I",
    "topic": "Geometry and trigonometry",
    "marks": 9,
    "stem": "The diagram below, not drawn to scale, shows a circle with centre O. The points A, B and C lie on the circumference, AB is a chord, and OA and OB are radii. Angle OAB = 45°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the value of y, the size of angle AOB.",
        "marks": 2,
        "answer": "90",
        "solution": "OA and OB are radii of the same circle, so OA = OB and triangle OAB is isosceles. Hence angle OBA = angle OAB = 45°. The angles of a triangle add up to 180°, so y = 180 - 45 - 45 = 90°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses OA = OB, so angle OBA = angle OAB",
            "check": {
              "type": "method",
              "any": [
                "isosceles",
                "radii",
                "radius"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the size of angle AOB",
            "check": {
              "type": "numeric",
              "value": 90.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the value of x, the size of angle ACB.",
        "marks": 2,
        "answer": "45",
        "solution": "Angle AOB at the centre and angle ACB at the circumference both stand on the same arc AB. The angle at the centre is twice the angle at the circumference, so x = 90° / 2 = 45°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the angle at the centre is twice the angle at the circumference",
            "check": {
              "type": "method",
              "any": [
                "twice the angle at the circumference",
                "angle at the centre"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the size of angle ACB",
            "check": {
              "type": "numeric",
              "value": 45.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "a / 2"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Give a reason for your answer in (b), naming the circle theorem that you used.",
        "marks": 2,
        "answer": "The angle at the centre is twice the angle at the circumference when both angles stand on the same arc AB, so angle ACB is half of angle AOB, giving x = 45 degrees.",
        "solution": "Angle AOB and angle ACB both stand on the arc AB, one at the centre and one at the circumference. The theorem the angle at the centre is twice the angle at the circumference standing on the same arc gives angle ACB = 90° / 2 = 45°. Naming the theorem earns 1 mark and saying that the two angles stand on the same arc AB earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "theorem",
            "marks": 1,
            "description": "names the theorem: the angle at the centre is twice the angle at the circumference",
            "any": [
              "angle at the centre is twice the angle at the circumference",
              "twice the angle at the circumference",
              "centre is twice"
            ]
          },
          {
            "id": "arc",
            "marks": 1,
            "description": "states that the two angles stand on the same arc",
            "any": [
              "same arc",
              "same segment",
              "arc ab"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "names the theorem: the angle at the centre is twice the angle at the circumference",
            "check": {
              "type": "written",
              "id": "theorem",
              "description": "names the theorem: the angle at the centre is twice the angle at the circumference",
              "any": [
                "angle at the centre is twice the angle at the circumference",
                "twice the angle at the circumference",
                "centre is twice"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states that the two angles stand on the same arc",
            "check": {
              "type": "written",
              "id": "arc",
              "description": "states that the two angles stand on the same arc",
              "any": [
                "same arc",
                "same segment",
                "arc ab"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "[In this question, take π = 22/7.] The radius OA is 14 cm. Calculate the length of the minor arc AB.",
        "marks": 3,
        "answer": "22",
        "solution": "The angle of the sector at the centre is 90°, so the minor arc AB is 90/360 = 1/4 of the circumference. Arc length = (90/360) x 2 x π x r = (1/4) x 2 x (22/7) x 14 = (1/4) x 88 = 22 cm.",
        "suffix": " cm",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses arc length = (angle/360) x 2 x pi x r",
            "check": {
              "type": "method",
              "any": [
                "/360",
                "arc length"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes r = 14 and pi = 22/7",
            "check": {
              "type": "contains",
              "value": [
                88.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the length of the arc",
            "check": {
              "type": "numeric",
              "value": 22.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "a * 0.24444444444444444"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 310 300\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"152\" cy=\"152\" r=\"107\"/><path d=\"M152 44 L74 226 M152 44 L230 226\"/><path d=\"M152 152 L74 226 M152 152 L230 226 M74 226 L230 226\"/><path d=\"M138.6 75.3 A34 34 0 0 0 165.4 75.3\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"152.0\" y=\"62.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">x&#176;</text><path d=\"M125.9 176.8 A36 36 0 0 0 178.1 176.8\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"152.0\" y=\"171.8\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">y&#176;</text><circle cx=\"152\" cy=\"152\" r=\"2.8\" fill=\"currentColor\"/><text x=\"152.0\" y=\"28.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">C</text><text x=\"56.0\" y=\"236.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"248.0\" y=\"236.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"168.0\" y=\"148.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text></svg>",
      "alt": "A circle with centre O. The points A and B lie on the circumference with the chord AB drawn and the radii OA and OB drawn, and C lies on the major arc with CA and CB drawn. Angle ACB at the circumference is marked x and angle AOB at the centre is marked y. Angle OAB is 45 degrees. The diagram is not drawn to scale."
    },
    "design": "Q6-EJ-A",
    "source": "SPARK Practice Paper G original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2g-q7",
    "question_number": 7,
    "paper": "SPARK Practice Paper G",
    "section": "I",
    "topic": "Sequences, patterns and investigation",
    "marks": 10,
    "stem": "The diagrams below show the first three figures in a sequence of rectangular patterns made from dots. Figure 1 has 1 row of 2 dots, Figure 2 has 2 rows of 3 dots, and Figure 3 has 3 rows of 4 dots. Study the patterns of dots and answer the questions that follow.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Complete the table below, giving the number of dots in Figure 4, in Figure 5, in Figure 10 and in Figure n.",
        "marks": 4,
        "answer": "20, 30, 110, n(n + 1)",
        "solution": "The number of dots in Figure n is n(n + 1). Figure 4 has 20 dots and Figure 5 has 30 dots, each found by continuing the pattern or by using the rule. Figure 10 has 110 dots. In Figure n there are n(n + 1) dots, which checks against the table: for n = 3 it gives 12.",
        "responseType": "table",
        "table": {
          "caption": "The number of dots in each figure.",
          "headers": [
            "Figure",
            "Number of dots"
          ],
          "rows": [
            [
              "1",
              "2"
            ],
            [
              "2",
              "6"
            ],
            [
              "3",
              "12"
            ],
            [
              "4",
              {
                "blank": true,
                "key": "d4"
              }
            ],
            [
              "5",
              {
                "blank": true,
                "key": "d5"
              }
            ],
            [
              "10",
              {
                "blank": true,
                "key": "d10"
              }
            ],
            [
              "n",
              {
                "blank": true,
                "key": "dn",
                "numeric": false
              }
            ]
          ],
          "marks": 4,
          "cells": {
            "d4": {
              "type": "numeric",
              "value": 20.0,
              "marks": 1,
              "description": "the number of dots in Figure 4"
            },
            "d5": {
              "type": "numeric",
              "value": 30.0,
              "marks": 1,
              "description": "the number of dots in Figure 5"
            },
            "d10": {
              "type": "numeric",
              "value": 110.0,
              "marks": 1,
              "description": "the number of dots in Figure 10"
            },
            "dn": {
              "type": "expression",
              "value": "n(n + 1)",
              "marks": 1,
              "description": "the number of dots in Figure n",
              "accepted": [
                "n^2 + n",
                "(n + 1)n"
              ]
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The number of dots in each figure.",
          "headers": [
            "Figure",
            "Number of dots"
          ],
          "rows": [
            [
              "1",
              "2"
            ],
            [
              "2",
              "6"
            ],
            [
              "3",
              "12"
            ],
            [
              "4",
              {
                "key": "d4",
                "answer": "20.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "the number of dots in Figure 4"
              }
            ],
            [
              "5",
              {
                "key": "d5",
                "answer": "30.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "the number of dots in Figure 5"
              }
            ],
            [
              "10",
              {
                "key": "d10",
                "answer": "110.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "the number of dots in Figure 10"
              }
            ],
            [
              "n",
              {
                "key": "dn",
                "answer": "n(n + 1)",
                "answerType": "expression",
                "marks": 1,
                "description": "the number of dots in Figure n",
                "accepted": [
                  "n^2 + n",
                  "(n + 1)n"
                ]
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the number of dots in Figure 30.",
        "marks": 2,
        "answer": "930",
        "solution": "Using the rule n(n + 1) from (a) with n = 30: 30 x 31 = 930. So Figure 30 has 930 dots.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes n = 30 into the rule for Figure n",
            "check": {
              "type": "contains",
              "value": [
                31.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number of dots in Figure 30",
            "check": {
              "type": "numeric",
              "value": 930.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the number of the figure that has 552 dots. Show clearly the equation you use and how you solve it.",
        "marks": 4,
        "answer": "23",
        "solution": "Set the rule equal to 552: n(n + 1) = 552. Expanding the left-hand side gives n^2 + n = 552, that is n^2 + n - 552 = 0. Factorising, (n + 24)(n - 23) = 0, so n = -24 or n = 23. A figure number must be a positive whole number, so the figure is Figure 23. Check: 23 x 24 = 552.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the equation n(n + 1) = 552",
            "check": {
              "type": "contains",
              "value": [
                552.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "writes it as a quadratic equation equal to zero",
            "check": {
              "type": "method",
              "any": [
                "n^2 + n - 552 = 0"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "solves the quadratic equation",
            "check": {
              "type": "method",
              "any": [
                "(n + 24)(n - 23)",
                "factoris",
                "quadratic formula"
              ]
            },
            "field": "all",
            "code": "M3"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the figure number, rejecting the negative root",
            "check": {
              "type": "numeric",
              "value": 23.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M3"
            ]
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 322 106\" width=\"100%\" style=\"max-width:322px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"49.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"67.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"58.0\" y=\"90.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 1</text><circle cx=\"125.0\" cy=\"30.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"143.0\" cy=\"30.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"161.0\" cy=\"30.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"125.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"143.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"161.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"143.0\" y=\"90.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 2</text><circle cx=\"219.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"237.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"255.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"273.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"219.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"237.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"255.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"273.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"219.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"237.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"255.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"273.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"246.0\" y=\"90.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 3</text></svg>",
      "alt": "Three rectangular arrays of dots. Figure 1 is one row of 2 dots. Figure 2 is two rows of 3 dots, making 6 dots. Figure 3 is three rows of 4 dots, making 12 dots. In every figure each row has one more dot than there are rows."
    },
    "design": "Q7-EJ-A",
    "source": "SPARK Practice Paper G original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2g-q8",
    "question_number": 8,
    "paper": "SPARK Practice Paper G",
    "section": "II",
    "topic": "Relations, functions and graphs",
    "marks": 12,
    "stem": "The table below shows some values of x and the corresponding values of y for the function y = x^2 + 2x - 8.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table of values.",
        "marks": 2,
        "answer": "-5, -5",
        "solution": "when x = -3, y = (-3)^2 + 2(-3) - 8 = -5; when x = 1, y = (1)^2 + 2(1) - 8 = -5.",
        "responseType": "table",
        "table": {
          "caption": "y = x^2 + 2x - 8 for -5 ≤ x ≤ 3.",
          "headers": [
            "x",
            "-5",
            "-4",
            "-3",
            "-2",
            "-1",
            "0",
            "1",
            "2",
            "3"
          ],
          "rows": [
            [
              "y",
              "7",
              "0",
              {
                "blank": true,
                "key": "y2"
              },
              "-8",
              "-9",
              "-8",
              {
                "blank": true,
                "key": "y6"
              },
              "0",
              "7"
            ]
          ],
          "marks": 2,
          "cells": {
            "y2": {
              "type": "numeric",
              "value": -5,
              "marks": 1,
              "description": "y when x = -3"
            },
            "y6": {
              "type": "numeric",
              "value": -5,
              "marks": 1,
              "description": "y when x = 1"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "y = x^2 + 2x - 8 for -5 ≤ x ≤ 3.",
          "headers": [
            "x",
            "-5",
            "-4",
            "-3",
            "-2",
            "-1",
            "0",
            "1",
            "2",
            "3"
          ],
          "rows": [
            [
              "y",
              "7",
              "0",
              {
                "key": "y2",
                "answer": "-5",
                "answerType": "numeric",
                "marks": 1,
                "description": "y when x = -3"
              },
              "-8",
              "-9",
              "-8",
              {
                "key": "y6",
                "answer": "-5",
                "answerType": "numeric",
                "marks": 1,
                "description": "y when x = 1"
              },
              "0",
              "7"
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Using a scale of 2 cm to represent 1 unit on the x axis and 1 cm to represent 1 unit on the y axis, draw the graph of y = x^2 + 2x - 8 for -5 ≤ x ≤ 3.",
        "marks": 4,
        "answer": "the points (-5, 7) to (3, 7) joined by a smooth curve",
        "solution": "Plot the seven points from the table and join them with a single smooth curve. Do not join them with straight lines.",
        "responseType": "graph",
        "grid": {
          "xMin": -5,
          "xMax": 3,
          "yMin": -10,
          "yMax": 8,
          "xStep": 1,
          "yStep": 1,
          "minorPerStep": 2,
          "xLabel": "x",
          "yLabel": "y",
          "tools": [
            "point",
            "curve"
          ]
        },
        "graph": {
          "points": [
            {
              "x": -5,
              "y": 7
            },
            {
              "x": -4,
              "y": 0
            },
            {
              "x": -3,
              "y": -5
            },
            {
              "x": -2,
              "y": -8
            },
            {
              "x": -1,
              "y": -9
            },
            {
              "x": 0,
              "y": -8
            },
            {
              "x": 1,
              "y": -5
            },
            {
              "x": 2,
              "y": 0
            },
            {
              "x": 3,
              "y": 7
            }
          ],
          "tolerance": 0.3,
          "pointMarks": 2,
          "curve": {
            "expression": "x*x + (2)*x + (-8)",
            "from": -5,
            "to": 3,
            "tolerance": 0.5
          },
          "curveMarks": 2
        },
        "answerType": "text",
        "responseSchema": {
          "type": "graph",
          "graph": {
            "xMin": -5,
            "xMax": 3,
            "yMin": -10,
            "yMax": 8,
            "xStep": 1,
            "yStep": 1,
            "minorPerStep": 2,
            "snapX": 0.25,
            "snapY": 0.25,
            "xLabel": "x",
            "yLabel": "y",
            "tools": [
              "point",
              "curve"
            ],
            "mode": "curve"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  -5,
                  7
                ],
                [
                  -4,
                  0
                ],
                [
                  -3,
                  -5
                ],
                [
                  -2,
                  -8
                ],
                [
                  -1,
                  -9
                ],
                [
                  0,
                  -8
                ],
                [
                  1,
                  -5
                ],
                [
                  2,
                  0
                ],
                [
                  3,
                  7
                ]
              ],
              "tolerance": [
                0.3,
                0.3
              ],
              "proportional": true,
              "label": "Accurate plotted points"
            },
            {
              "kind": "graph_curve",
              "marks": 2,
              "minimumPoints": 6,
              "referencePoints": [
                [
                  -5,
                  7
                ],
                [
                  -4,
                  0
                ],
                [
                  -3,
                  -5
                ],
                [
                  -2,
                  -8
                ],
                [
                  -1,
                  -9
                ],
                [
                  0,
                  -8
                ],
                [
                  1,
                  -5
                ],
                [
                  2,
                  0
                ],
                [
                  3,
                  7
                ]
              ],
              "tolerance": [
                0.3,
                0.3
              ],
              "minimumMatches": 6,
              "increasing": false,
              "requireSmooth": true,
              "label": "Appropriate curve through the plotted data"
            }
          ]
        }
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Using your graph, state the coordinates of the MINIMUM point of the function.",
        "marks": 2,
        "answer": "(-1, -9)",
        "solution": "The curve turns at its lowest point, where x = -1 and y = -9. The minimum point is (-1, -9).",
        "tolerance": 0.3,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "identifies the turning point of the curve",
            "check": {
              "type": "contains",
              "value": [
                -1.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the coordinates of the minimum",
            "check": {
              "type": "coordinate",
              "value": [
                -1.0,
                -9.0
              ],
              "tolerance": 0.3
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ],
            "captureIndex": 0
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Using your graph, state the values of x for which x^2 + 2x - 8 = 0.",
        "marks": 2,
        "answer": "x = -4 and x = 2",
        "solution": "The curve crosses the x axis where y = 0, at x = -4 and x = 2.",
        "answerType": "ordered",
        "accepted": [
          "-4, 2",
          "-4 and 2"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "reads where the curve crosses the x axis",
            "check": {
              "type": "method",
              "any": [
                "x axis",
                "y = 0",
                "crosses"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "both values of x",
            "check": {
              "type": "set",
              "value": [
                -4.0,
                2.0
              ],
              "tolerance": 0.3
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "e",
        "label": "(e)",
        "prompt": "Write down the equation of the axis of symmetry of the graph.",
        "marks": 2,
        "answer": "x = -1",
        "solution": "The axis of symmetry is the vertical line through the minimum point, so its equation is x = -1.",
        "answerType": "expression",
        "accepted": [
          "x=-1"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "refers to the vertical line through the minimum",
            "check": {
              "type": "method",
              "any": [
                "axis of symmetry",
                "vertical",
                "minimum"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the equation of the axis of symmetry",
            "check": {
              "type": "equation",
              "value": "x = -1"
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "c"
              ],
              "formula": "c",
              "template": "x = {v}"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "section_heading": "ALGEBRA, RELATIONS, FUNCTIONS AND GRAPHS",
    "design": "Q8-EJ-A",
    "source": "SPARK Practice Paper G original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2g-q9",
    "question_number": 9,
    "paper": "SPARK Practice Paper G",
    "section": "II",
    "topic": "Geometry and trigonometry",
    "marks": 12,
    "stem": "A light aircraft leaves airfield P and flies 70 km on a bearing of 062° to a point Q. It then changes course and flies 95 km on a bearing of 137° to a point R. The diagram below, not drawn to scale, shows the route of the light aircraft.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Show that angle PQR = 105°, and hence calculate, correct to 1 decimal place, the length of PR.",
        "marks": 4,
        "answer": "131.8",
        "solution": "The bearing of P from Q is 62 + 180 = 242°, so angle PQR = 242 - 137 = 105°. By the cosine rule, PR^2 = PQ^2 + QR^2 - 2(PQ)(QR) cos PQR = 70^2 + 95^2 - 2(70)(95) cos 105° = 4900 + 9025 + 3442.2933 = 17367.2933. So PR = sqrt(17367.2933) = 131.7850 = 131.8 km, correct to 1 decimal place.",
        "suffix": " km",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds angle PQR = 105 degrees from the bearings",
            "check": {
              "type": "contains",
              "value": [
                105.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the cosine rule",
            "check": {
              "type": "method",
              "any": [
                "cosine rule",
                "cos"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes 70, 95 and 105 correctly",
            "check": {
              "type": "contains",
              "value": [
                70.0,
                95.0,
                105.0
              ]
            },
            "field": "all",
            "code": "M3"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "PR = 131.8 km",
            "check": {
              "type": "numeric",
              "value": 131.7850268424434,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M3"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Hence, calculate the size of angle QPR, correct to 1 decimal place.",
        "marks": 3,
        "answer": "44.1",
        "solution": "By the sine rule, sin(angle QPR)/QR = sin(angle PQR)/PR, that is sin(angle QPR)/95 = sin 105°/131.7850. So sin(angle QPR) = 95 x sin 105° / 131.7850 = 0.696308, giving angle QPR = 44.13 = 44.1°. Angle PQR is obtuse, so angle QPR must be acute and this is the required value.",
        "suffix": "°",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the sine rule",
            "check": {
              "type": "method",
              "any": [
                "sine rule",
                "sin"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes 95, 105 and PR correctly",
            "check": {
              "type": "contains",
              "value": [
                95.0,
                105.0,
                131.785
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "angle QPR = 44.1 degrees",
            "check": {
              "type": "numeric",
              "value": 44.13153068806846,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "asin(95*sin(105)/a)"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Hence, or otherwise, determine the bearing of R from P, giving your answer as a three-figure bearing correct to the nearest degree.",
        "marks": 3,
        "answer": "106",
        "solution": "The bearing of Q from P is 062°, and R lies clockwise of Q when viewed from P, so the bearing of R from P is the bearing of Q from P plus angle QPR. That is 62 + 44.1 = 106.1°, which is 106° as a three-figure bearing correct to the nearest degree.",
        "suffix": "°",
        "tolerance": 0.51,
        "accepted": [
          "106°",
          "106 degrees"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "bearing of R from P = bearing of Q from P + angle QPR",
            "check": {
              "type": "method",
              "any": [
                "bearing of q from p"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "adds angle QPR to 062 degrees",
            "check": {
              "type": "contains",
              "value": [
                62.0,
                44.1
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "106 degrees",
            "check": {
              "type": "numeric",
              "value": 106.13153068806847,
              "dp": 0,
              "tolerance": 0.51
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b"
              ],
              "formula": "62 + b"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate, correct to 1 decimal place, the area of triangle PQR.",
        "marks": 2,
        "answer": "3211.7",
        "solution": "Area = (1/2)(PQ)(QR) sin PQR = (1/2) x 70 x 95 x sin 105° = 3325 x sin 105° = 3211.7034 = 3211.7 km^2, correct to 1 decimal place.",
        "suffix": " km^2",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses (1/2)ab sin C with 70, 95 and 105",
            "check": {
              "type": "contains",
              "value": [
                70.0,
                95.0,
                105.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "area = 3211.7 km^2",
            "check": {
              "type": "numeric",
              "value": 3211.703372411152,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "section_heading": "GEOMETRY AND TRIGONOMETRY",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 390\" width=\"100%\" style=\"max-width:360px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M84.1 224.9 L84.1 161.2\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M84.1 154.9 L88.4 161.9 L79.7 161.9 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"84.1\" y=\"144.9\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">N</text><path d=\"M84.1 224.9 L187.5 169.9\" stroke-width=\"2\"/><path d=\"M84.1 188.9 A36 36 0 0 1 115.9 208.0\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"94.3\" y=\"207.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">062&#176;</text><text x=\"148.0\" y=\"220.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">70 km</text><path d=\"M187.5 169.9 L187.5 106.2\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M187.5 99.9 L191.8 106.9 L183.2 106.9 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"187.5\" y=\"89.9\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">N</text><path d=\"M187.5 169.9 L295.9 286.1\" stroke-width=\"2\"/><path d=\"M187.5 133.9 A36 36 0 0 1 212.1 196.2\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"205.9\" y=\"162.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">137&#176;</text><text x=\"222.7\" y=\"245.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">95 km</text><circle cx=\"84.1\" cy=\"224.9\" r=\"3.2\" fill=\"currentColor\"/><text x=\"68.1\" y=\"234.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">P</text><circle cx=\"187.5\" cy=\"169.9\" r=\"3.2\" fill=\"currentColor\"/><text x=\"171.5\" y=\"179.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">Q</text><circle cx=\"295.9\" cy=\"286.1\" r=\"3.2\" fill=\"currentColor\"/><text x=\"279.9\" y=\"296.1\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">R</text></svg>",
      "alt": "A bearing diagram, not drawn to scale. From the point P a north line is drawn and the angle from it to the line PQ is marked 062 degrees; PQ is marked 70 km. From Q a second north line is drawn and the angle from it to the line QR is marked 137 degrees; QR is marked 95 km. The points P, Q and R are shown as solid dots."
    },
    "design": "Q9-EJ-A",
    "source": "SPARK Practice Paper G original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2g-q10",
    "question_number": 10,
    "paper": "SPARK Practice Paper G",
    "section": "II",
    "topic": "Vectors and matrices",
    "marks": 12,
    "stem": "The matrix M is given by M = [[2, -3], [1, 1]].",
    "parts": [
      {
        "id": "k",
        "label": "(a) (i)",
        "prompt": "Calculate the determinant of M.",
        "marks": 2,
        "answer": "5",
        "solution": "det M = (2)(1) - (-3)(1) = 2 - (-3) = 5.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses det M = ad - bc",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    2.0,
                    -3.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    2.0,
                    3.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    5.0
                  ]
                },
                {
                  "type": "method",
                  "any": [
                    "(2)(1) - (-3)(1)",
                    "2(1) - -3(1)",
                    "2 x 1 - -3 x 1",
                    "2*1 - -3*1",
                    "ad - bc",
                    "ad-bc"
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the determinant",
            "check": {
              "type": "numeric",
              "value": 5.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Hence, write down M^-1, the inverse of M.",
        "marks": 3,
        "answer": "(1/5)[[1, 3], [-1, 2]]",
        "solution": "For M = [[a, b], [c, d]], M^-1 = (1/det M)[[d, -b], [-c, a]]. Interchange the entries on the leading diagonal, change the sign of the other two, and divide by the determinant: M^-1 = (1/5)[[1, 3], [-1, 2]] = [[1/5, 3/5], [-1/5, 2/5]].",
        "answerType": "expression",
        "accepted": [
          "[[1/5, 3/5], [-1/5, 2/5]]",
          "1/5[[1, 3], [-1, 2]]"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "interchanges the leading diagonal entries and changes the sign of the other two",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    1.0,
                    3.0,
                    -1.0,
                    2.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    0.2,
                    0.6,
                    -0.2,
                    0.4
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "divides by the determinant",
            "check": {
              "type": "contains",
              "value": [
                0.2,
                -0.2
              ],
              "needAll": false,
              "tolerance": 0.005
            },
            "field": "all",
            "ecf": {
              "uses": [
                "k"
              ],
              "formula": "1/k"
            },
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the inverse matrix",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "matrix",
                  "value": [
                    [
                      0.2,
                      0.6
                    ],
                    [
                      -0.2,
                      0.4
                    ]
                  ],
                  "tolerance": 0.005
                },
                {
                  "type": "contains",
                  "value": [
                    0.2,
                    1.0,
                    3.0,
                    -1.0,
                    2.0
                  ]
                }
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write the pair of simultaneous equations 2x - 3y = 5 and x + y = 5 as a matrix equation in the form M X = C.",
        "marks": 3,
        "answer": "[[2, -3], [1, 1]] [[x], [y]] = [[5], [5]]",
        "solution": "The coefficients of x and y form the matrix M = [[2, -3], [1, 1]], the unknowns form the column matrix X = [[x], [y]], and the constants form the column matrix C = [[5], [5]]. The pair of equations is therefore [[2, -3], [1, 1]] [[x], [y]] = [[5], [5]].",
        "answerType": "expression",
        "accepted": [
          "[[2, -3], [1, 1]][[x], [y]] = [[5], [5]]"
        ],
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the matrix of coefficients",
            "check": {
              "type": "contains",
              "value": [
                2.0,
                -3.0,
                1.0,
                1.0
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "the column matrix of unknowns",
            "check": {
              "type": "method",
              "any": [
                "[[x], [y]]",
                "[[x],[y]]",
                "(x, y)"
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B2"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "the column matrix of constants",
            "check": {
              "type": "contains",
              "value": [
                5.0,
                5.0
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B3"
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Hence, or otherwise, use M^-1 to solve the pair of simultaneous equations in part (b).",
        "marks": 4,
        "answer": "x = 4, y = 1",
        "solution": "Multiplying both sides of M X = C on the left by M^-1 gives X = M^-1 C = (1/5)[[1, 3], [-1, 2]] [[5], [5]] = (1/5)[[(1)(5) + (3)(5)], [(-1)(5) + (2)(5)]] = (1/5)[[20], [5]] = [[4], [1]]. So x = 4 and y = 1. Check: 2(4) + (-3)(1) = 5.",
        "answerType": "ordered",
        "accepted": [
          "(4, 1)",
          "4, 1"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies both sides by the inverse matrix",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "method",
                  "any": [
                    "M^-1 C",
                    "M^-1",
                    "inverse"
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    4.0,
                    1.0
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies the inverse by the column of constants",
            "check": {
              "type": "contains",
              "value": [
                20.0,
                5.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of x",
            "check": {
              "type": "contains",
              "value": [
                4.0
              ]
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "k"
              ],
              "formula": "(20)/k"
            },
            "depends": [
              "M1"
            ],
            "code": "A1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of y",
            "check": {
              "type": "contains",
              "value": [
                1.0
              ]
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "k"
              ],
              "formula": "(5)/k"
            },
            "depends": [
              "M1"
            ],
            "code": "A2"
          }
        ]
      }
    ],
    "section_heading": "VECTORS AND MATRICES",
    "design": "Q10-EJ-A",
    "source": "SPARK Practice Paper G original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2h-q1",
    "question_number": 1,
    "paper": "SPARK Practice Paper H",
    "section": "I",
    "topic": "Number theory and computation",
    "marks": 9,
    "stem": "The exchange rate between the United States dollar (US$) and the Trinidad and Tobago dollar (TT$) is US$1.00 = TT$6.75.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (3 1/6 + 7/8) ÷ (5/6 - 1/4), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "97/14",
        "solution": "3 1/6 = 19/6, so the numerator is 19/6 + 7/8 = 97/24. The denominator is 5/6 - 1/4 = 7/12. Dividing means multiplying by the reciprocal: 97/24 x 12/7 = 97/14.",
        "cao": true,
        "requiredForm": "simplified_fraction",
        "accepted": [
          "6 13/14"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the numerator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                4.041666666666667
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the denominator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                0.5833333333333334
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the exact value in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 6.928571428571429,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Mr Grant changes US$640 into TT dollars. Calculate the amount, in TT dollars, that he receives before any charge is made.",
        "marks": 2,
        "answer": "4320.00",
        "solution": "640 x 6.75 = TT$4,320.00.",
        "prefix": "TT$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies by the exchange rate",
            "check": {
              "type": "method",
              "any": [
                "x 6.75",
                "exchange rate",
                "640"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the amount in TT dollars",
            "check": {
              "type": "numeric",
              "value": 4320.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "The bank charges a fee of TT$40 on the transaction. Calculate the amount Mr Grant actually receives.",
        "marks": 2,
        "answer": "4280.00",
        "solution": "TT$4,320.00 - TT$40 = TT$4,280.00.",
        "prefix": "TT$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "subtracts the fee from the amount converted",
            "check": {
              "type": "contains",
              "value": [
                40.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the amount received",
            "check": {
              "type": "numeric",
              "value": 4280.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b1"
              ],
              "formula": "b1 - 40.0"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Mr Grant invests TT$12,000 in an account paying SIMPLE INTEREST at 5% per annum. Calculate the TOTAL amount in the account at the end of 4 years.",
        "marks": 2,
        "answer": "14400.00",
        "solution": "I = PRT/100 = (12,000 x 5 x 4)/100 = TT$2,400.00. The total amount is 12,000 + 2,400.00 = TT$14,400.00.",
        "prefix": "TT$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses I = PRT/100",
            "check": {
              "type": "contains",
              "value": [
                2400.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the total amount",
            "check": {
              "type": "numeric",
              "value": 14400.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q1-EJ-B",
    "source": "SPARK Practice Paper H original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2h-q2",
    "question_number": 2,
    "paper": "SPARK Practice Paper H",
    "section": "I",
    "topic": "Algebra",
    "marks": 9,
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Simplify, giving your answer in its lowest terms, (3x^2 - 27)/(x^2 + 8x + 15).",
        "marks": 3,
        "answer": "3(x - 3)/(x + 5)",
        "solution": "Factorising the numerator: 3x^2 - 27 = 3(x + 3)(x - 3). Factorising the denominator: x^2 + 8x + 15 = (x + 3)(x + 5). The common factor (x + 3) cancels, leaving 3(x - 3)/(x + 5).",
        "answerType": "expression",
        "accepted": [
          "3(x-3)/(x+5)",
          "(3x - 9)/(x + 5)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "factorises the numerator",
            "check": {
              "type": "method",
              "any": [
                "3(x + 3)(x - 3)"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "factorises the denominator",
            "check": {
              "type": "method",
              "any": [
                "(x + 3)(x + 5)"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "cancels the common factor and gives the fraction in its lowest terms",
            "check": {
              "type": "expression",
              "value": "3(x - 3)/(x + 5)",
              "accepted": [
                "3(x-3)/(x+5)",
                "(3x - 9)/(x + 5)"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Solve the pair of simultaneous equations: 4x + 2y = 15 and x + 2y = 6.",
        "marks": 4,
        "answer": "x = 3, y = 3/2",
        "solution": "The coefficient of y is the same in both equations. Subtracting x + 2y = 6 from 4x + 2y = 15 eliminates y: 3x = 9, so x = 3. Substituting x = 3 into 4x + 2y = 15 gives 12 + 2y = 15, so 2y = 3 and y = 3/2.",
        "accepted": [
          "x = 3, y = 1 1/2",
          "(3, 3/2)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "eliminates one of the variables",
            "check": {
              "type": "method",
              "any": [
                "eliminates y",
                "eliminates x"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of x",
            "check": {
              "type": "equation",
              "value": "x = 3"
            },
            "field": "all",
            "code": "A1",
            "depends": [
              "M1"
            ]
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes back to find the second variable",
            "check": {
              "type": "contains",
              "value": [
                12.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of y",
            "check": {
              "type": "equation",
              "value": "y = 3/2"
            },
            "field": "all",
            "code": "A2",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Make a the subject of the formula A = h(a + b)/2.",
        "marks": 2,
        "answer": "a = 2A/h - b",
        "solution": "Multiplying both sides by 2: 2A = h(a + b). Dividing both sides by h: 2A/h = a + b. Subtracting b from both sides: a = 2A/h - b.",
        "answerType": "expression",
        "accepted": [
          "a = (2A - bh)/h",
          "(2A - bh)/h",
          "2A/h - b"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "carries out a correct first step in the rearrangement",
            "check": {
              "type": "method",
              "any": [
                "2A = h(a + b)"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "a as the subject",
            "check": {
              "type": "equation",
              "value": "a = 2A/h - b"
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q2-EJ-B",
    "source": "SPARK Practice Paper H original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2h-q3",
    "question_number": 3,
    "paper": "SPARK Practice Paper H",
    "section": "I",
    "topic": "Sets",
    "marks": 9,
    "stem": "In a survey of 40 students, 24 study Geography, 18 study History and 6 study NEITHER of these two subjects. The Venn diagram below shows this information, where x represents the number of students who study BOTH Geography and History.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Using the information in the Venn diagram, form an equation in x and solve it to calculate the number of students who study BOTH Geography and History.",
        "marks": 3,
        "answer": "8",
        "solution": "Every one of the 40 students is counted exactly once in the Venn diagram, so (24 - x) + x + (18 - x) + 6 = 40. This simplifies to 48 - x = 40, so x = 48 - 40 = 8. So 8 students study both Geography and History.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "forms an equation in x from the four regions of the Venn diagram",
            "check": {
              "type": "method",
              "any": [
                "24 - x",
                "24 + 18 - x",
                "48 - x"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "simplifies the equation",
            "check": {
              "type": "contains",
              "value": [
                48.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number who study both Geography and History",
            "check": {
              "type": "numeric",
              "value": 8.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "depends": [],
            "code": "A1"
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the number of students who study EXACTLY ONE of the two subjects.",
        "marks": 2,
        "answer": "26",
        "solution": "The number who study Geography only is 24 - 8 = 16, and the number who study History only is 18 - 8 = 10. So the number who study exactly one of the two subjects is 16 + 10 = 26.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "subtracts the number who study both from each of 24 and 18",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "method",
                  "any": [
                    "24 - ",
                    "18 - "
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    16.0,
                    10.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    26.0
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number who study exactly one of the two subjects",
            "check": {
              "type": "numeric",
              "value": 26.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "42 - 2 * a"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "One of the 40 students is chosen at random. Calculate the probability that the student chosen studies NEITHER Geography NOR History, giving your answer as a fraction in its lowest terms.",
        "marks": 2,
        "answer": "3/20",
        "solution": "6 of the 40 students study neither Geography nor History, and each student is equally likely to be chosen. So P(neither) = 6/40 = 3/20.",
        "requiredForm": "simplified_fraction",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses P(neither) = (the number who study neither)/(the total number of students)",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    6.0,
                    40.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    0.15
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the probability in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 0.15,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Describe, in words, the set represented by the shaded region in the Venn diagram below.",
        "marks": 2,
        "answer": "The shaded region represents the students who study History only, that is, the students who study History but not Geography.",
        "solution": "The shading covers the part of the History circle that lies outside the Geography circle, so it is the set of students who study History but do not study Geography - the students who study History only. Naming History earns 1 mark and making it clear that these students do not study Geography earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "subject",
            "marks": 1,
            "description": "says that the students study History",
            "any": [
              "history"
            ]
          },
          {
            "id": "excludes",
            "marks": 1,
            "description": "makes it clear that they do not study Geography",
            "any": [
              "history only",
              "but not geography",
              "do not study geography",
              "not study geography"
            ]
          }
        ],
        "answerType": "text",
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 250\" width=\"100%\" style=\"max-width:400px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"6\" y=\"6\" width=\"368\" height=\"238\" rx=\"2\"/><path d=\"M185.0 194.1 L188.2 195.8 L191.4 197.2 L194.7 198.6 L198.1 199.8 L201.5 200.8 L204.9 201.8 L208.4 202.5 L211.9 203.1 L215.5 203.6 L219.0 203.8 L222.6 204.0 L226.2 204.0 L229.7 203.8 L233.3 203.5 L236.8 203.0 L240.3 202.4 L243.8 201.6 L247.2 200.6 L250.6 199.6 L254.0 198.3 L257.3 196.9 L260.5 195.4 L263.7 193.8 L266.8 192.0 L269.8 190.0 L272.7 188.0 L275.5 185.8 L278.2 183.5 L280.8 181.1 L283.4 178.6 L285.8 175.9 L288.1 173.2 L290.2 170.4 L292.3 167.4 L294.2 164.4 L296.0 161.3 L297.6 158.2 L299.1 154.9 L300.5 151.6 L301.7 148.3 L302.7 144.9 L303.7 141.4 L304.4 138.0 L305.1 134.4 L305.5 130.9 L305.8 127.3 L306.0 123.8 L306.0 120.2 L305.8 116.7 L305.5 113.1 L305.1 109.6 L304.4 106.0 L303.7 102.6 L302.7 99.1 L301.7 95.7 L300.5 92.4 L299.1 89.1 L297.6 85.8 L296.0 82.7 L294.2 79.6 L292.3 76.6 L290.2 73.6 L288.1 70.8 L285.8 68.1 L283.4 65.4 L280.8 62.9 L278.2 60.5 L275.5 58.2 L272.7 56.0 L269.8 54.0 L266.8 52.0 L263.7 50.2 L260.5 48.6 L257.3 47.1 L254.0 45.7 L250.6 44.4 L247.2 43.4 L243.8 42.4 L240.3 41.6 L236.8 41.0 L233.3 40.5 L229.7 40.2 L226.2 40.0 L222.6 40.0 L219.0 40.2 L215.5 40.4 L211.9 40.9 L208.4 41.5 L204.9 42.2 L201.5 43.2 L198.1 44.2 L194.7 45.4 L191.4 46.8 L188.2 48.2 L185.0 49.9 L185.0 49.9 L188.1 51.6 L191.2 53.6 L194.1 55.6 L197.0 57.8 L199.8 60.1 L202.4 62.5 L205.0 65.0 L207.4 67.7 L209.8 70.4 L212.0 73.3 L214.0 76.2 L216.0 79.2 L217.8 82.4 L219.4 85.5 L221.0 88.8 L222.4 92.1 L223.6 95.5 L224.7 98.9 L225.6 102.4 L226.4 105.9 L227.0 109.5 L227.5 113.0 L227.8 116.6 L228.0 120.2 L228.0 123.8 L227.8 127.4 L227.5 131.0 L227.0 134.5 L226.4 138.1 L225.6 141.6 L224.7 145.1 L223.6 148.5 L222.4 151.9 L221.0 155.2 L219.4 158.5 L217.8 161.6 L216.0 164.8 L214.0 167.8 L212.0 170.7 L209.8 173.6 L207.4 176.3 L205.0 179.0 L202.4 181.5 L199.8 183.9 L197.0 186.2 L194.1 188.4 L191.2 190.4 L188.1 192.4 L185.0 194.1 Z\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><circle cx=\"146\" cy=\"122\" r=\"82\"/><circle cx=\"224\" cy=\"122\" r=\"82\"/><text x=\"20.0\" y=\"26.0\" text-anchor=\"start\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">U</text><text x=\"94.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">G</text><text x=\"276.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">H</text></svg>",
          "alt": "A Venn diagram inside a rectangle labelled U, with two overlapping circles labelled G for Geography and H for History. The part of the History circle that lies outside the Geography circle is shaded. No numbers are written in the regions."
        },
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "says that the students study History",
            "check": {
              "type": "written",
              "id": "subject",
              "description": "says that the students study History",
              "any": [
                "history"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "makes it clear that they do not study Geography",
            "check": {
              "type": "written",
              "id": "excludes",
              "description": "makes it clear that they do not study Geography",
              "any": [
                "history only",
                "but not geography",
                "do not study geography",
                "not study geography"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 250\" width=\"100%\" style=\"max-width:400px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"6\" y=\"6\" width=\"368\" height=\"238\" rx=\"2\"/><circle cx=\"146\" cy=\"122\" r=\"82\"/><circle cx=\"224\" cy=\"122\" r=\"82\"/><text x=\"20.0\" y=\"26.0\" text-anchor=\"start\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">U</text><text x=\"94.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">G</text><text x=\"276.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">H</text><text x=\"104.0\" y=\"122.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">24 - x</text><text x=\"185.0\" y=\"122.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">x</text><text x=\"266.0\" y=\"122.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">18 - x</text><text x=\"348.0\" y=\"228.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">6</text></svg>",
      "alt": "A Venn diagram inside a rectangle labelled U, representing the 40 students surveyed. It contains two overlapping circles, G for Geography and H for History. The part of G outside H is labelled 24 - x, the overlap of G and H is labelled x, the part of H outside G is labelled 18 - x, and 6 is written outside both circles."
    },
    "design": "Q3-EJ-B",
    "source": "SPARK Practice Paper H original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2h-q4",
    "question_number": 4,
    "paper": "SPARK Practice Paper H",
    "section": "I",
    "topic": "Measurement and construction",
    "marks": 9,
    "stem": "The line AB, 7 cm long, is already drawn on the construction pad.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Using only a ruler and a pair of compasses, construct the perpendicular bisector of AB, so that an angle of 90° is constructed at the midpoint M of AB. Your construction arcs must be clearly shown.",
        "marks": 3,
        "answer": "the perpendicular bisector of AB through M, with the construction arcs shown",
        "solution": "Open the compasses to more than half of AB, that is to more than 3.5 cm. With centre A draw arcs above and below AB; with the SAME radius and centre B draw two more to cut them. Rule the line through the two crossing points. It cuts AB at the midpoint M and makes an angle of 90° with AB. The arcs must be left on the page.",
        "responseType": "construction",
        "pad": {
          "width": 560,
          "height": 340,
          "unitsPerCm": 40,
          "given": [
            {
              "id": "A",
              "x": 2.5,
              "y": 2.5
            },
            {
              "id": "B",
              "x": 9.5,
              "y": 2.5
            }
          ],
          "givenSegments": [
            [
              "A",
              "B"
            ]
          ]
        },
        "construction": {
          "construction": "perpendicularBisector",
          "args": [
            {
              "id": "A",
              "x": 2.5,
              "y": 2.5
            },
            {
              "id": "B",
              "x": 9.5,
              "y": 2.5
            }
          ]
        },
        "answerType": "text",
        "responseSchema": {
          "type": "construction",
          "pad": {
            "width": 560,
            "height": 340,
            "unitsPerCm": 40,
            "given": [
              {
                "id": "A",
                "x": 2.5,
                "y": 2.5
              },
              {
                "id": "B",
                "x": 9.5,
                "y": 2.5
              }
            ],
            "givenSegments": [
              [
                "A",
                "B"
              ]
            ]
          },
          "construction": {
            "construction": "perpendicularBisector",
            "args": [
              {
                "id": "A",
                "x": 2.5,
                "y": 2.5
              },
              {
                "id": "B",
                "x": 9.5,
                "y": 2.5
              }
            ],
            "marks": 3
          },
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "allowProtractor": false
        }
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "The pad shows AB and the perpendicular MT that you constructed in (a) (i). Using only a ruler and a pair of compasses, bisect angle TMB. Your construction arcs must be clearly shown.",
        "marks": 1,
        "answer": "the bisector of angle TMB drawn from M, with the arc at M and the two equal arcs from where it cuts MT and MB shown",
        "solution": "With centre M draw an arc cutting MT and MB. From each of those two crossing points, with the same radius, draw an arc so that the two arcs cross. Rule the line from M through that crossing point. This mark is for the arcs: an angle measured with a protractor earns nothing here.",
        "responseType": "construction",
        "pad": {
          "width": 560,
          "height": 340,
          "unitsPerCm": 40,
          "given": [
            {
              "id": "A",
              "x": 2.5,
              "y": 2.5
            },
            {
              "id": "B",
              "x": 9.5,
              "y": 2.5
            },
            {
              "id": "M",
              "x": 6.0,
              "y": 2.5
            },
            {
              "id": "T",
              "x": 6.0,
              "y": 6.5
            }
          ],
          "givenSegments": [
            [
              "A",
              "B"
            ],
            [
              "M",
              "T"
            ]
          ]
        },
        "construction": {
          "construction": "angleBisector",
          "args": [
            {
              "id": "M",
              "x": 6.0,
              "y": 2.5
            },
            {
              "id": "T",
              "x": 6.0,
              "y": 6.5
            },
            {
              "id": "B",
              "x": 9.5,
              "y": 2.5
            }
          ]
        },
        "answerType": "text",
        "responseSchema": {
          "type": "construction",
          "pad": {
            "width": 560,
            "height": 340,
            "unitsPerCm": 40,
            "given": [
              {
                "id": "A",
                "x": 2.5,
                "y": 2.5
              },
              {
                "id": "B",
                "x": 9.5,
                "y": 2.5
              },
              {
                "id": "M",
                "x": 6.0,
                "y": 2.5
              },
              {
                "id": "T",
                "x": 6.0,
                "y": 6.5
              }
            ],
            "givenSegments": [
              [
                "A",
                "B"
              ],
              [
                "M",
                "T"
              ]
            ]
          },
          "construction": {
            "construction": "angleBisector",
            "args": [
              {
                "id": "M",
                "x": 6.0,
                "y": 2.5
              },
              {
                "id": "T",
                "x": 6.0,
                "y": 6.5
              },
              {
                "id": "B",
                "x": 9.5,
                "y": 2.5
              }
            ],
            "marks": 1
          },
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "allowProtractor": false
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the size of the angle that you constructed in (a) (ii), that is, the size of angle TMR where MR is your bisector.",
        "marks": 1,
        "answer": "45",
        "solution": "MT is perpendicular to AB, so angle TMB = 90°. The bisector halves it, so angle TMR = 90/2 = 45°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the size of the constructed angle",
            "check": {
              "type": "numeric",
              "value": 45.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      },
      {
        "id": "c1",
        "label": "(c) (i)",
        "prompt": "A closed rectangular tank measures 1.2 m long, 0.8 m wide and 0.75 m high. Calculate the volume of the tank, in m^3.",
        "marks": 2,
        "answer": "0.72",
        "solution": "Volume of a cuboid = length x width x height = 1.2 x 0.8 x 0.75 = 0.96 x 0.75 = 0.72 m^3.",
        "suffix": " m^3",
        "tolerance": 0.0011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 286\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M70 118 L250 118 L250 230 L70 230 Z\" stroke-width=\"1.8\"/><path d=\"M70 118 L128 80 L308 80 L250 118\"/><path d=\"M308 80 L308 192 L250 230\"/><path d=\"M70 230 L128 192 L308 192 M128 192 L128 80\" stroke-dasharray=\"5 4\" stroke-width=\"1.2\"/><text x=\"160.0\" y=\"254.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">1.2 m</text><text x=\"58.0\" y=\"174.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">0.75 m</text><text x=\"305.0\" y=\"103.0\" text-anchor=\"start\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">0.8 m</text></svg>",
          "alt": "A closed rectangular tank drawn as a cuboid in oblique projection, with the hidden edges dashed. The front edge is marked 1.2 m, the sloping edge going back is marked 0.8 m and the vertical edge is marked 0.75 m. The diagram is not drawn to scale."
        },
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies length by width by height",
            "check": {
              "type": "contains",
              "value": [
                0.96
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the volume of the tank",
            "check": {
              "type": "numeric",
              "value": 0.72,
              "tolerance": 0.0011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c2",
        "label": "(c) (ii)",
        "prompt": "Calculate the capacity of the tank, in litres. [1 m^3 = 1000 litres]",
        "marks": 2,
        "answer": "720",
        "solution": "0.72 m^3 = 0.72 x 1000 litres = 720 litres.",
        "suffix": " litres",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies the volume in m^3 by 1000",
            "check": {
              "type": "method",
              "any": [
                "1000"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the capacity in litres",
            "check": {
              "type": "numeric",
              "value": 720.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "c1"
              ],
              "formula": "c1 * 1000"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q4-EJ-B",
    "source": "SPARK Practice Paper H original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2h-q5",
    "question_number": 5,
    "paper": "SPARK Practice Paper H",
    "section": "I",
    "topic": "Statistics and probability",
    "marks": 9,
    "stem": "The table below shows the times, in minutes, taken by students to travel to school.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table below to show the cumulative frequency for each class.",
        "marks": 2,
        "answer": "20, 40, 52, 60",
        "solution": "Add each frequency to the running total: 6 + 14 = 20, 20 + 20 = 40, 40 + 12 = 52, 52 + 8 = 60.",
        "responseType": "table",
        "table": {
          "caption": "The 60 values, grouped.",
          "headers": [
            "Time (minutes)",
            "0 - 10",
            "10 - 20",
            "20 - 30",
            "30 - 40",
            "40 - 50"
          ],
          "rows": [
            [
              "Frequency",
              "6",
              "14",
              "20",
              "12",
              "8"
            ],
            [
              "Cumulative frequency",
              "6",
              {
                "blank": true,
                "key": "c1"
              },
              {
                "blank": true,
                "key": "c2"
              },
              {
                "blank": true,
                "key": "c3"
              },
              {
                "blank": true,
                "key": "c4"
              }
            ]
          ],
          "marks": 2,
          "cells": {
            "c1": {
              "type": "numeric",
              "value": 20,
              "marks": 0,
              "description": "cumulative frequency to 20"
            },
            "c2": {
              "type": "numeric",
              "value": 40,
              "marks": 0,
              "description": "cumulative frequency to 30"
            },
            "c3": {
              "type": "numeric",
              "value": 52,
              "marks": 1,
              "description": "cumulative frequency to 40"
            },
            "c4": {
              "type": "numeric",
              "value": 60,
              "marks": 1,
              "description": "cumulative frequency to 50"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The 60 values, grouped.",
          "headers": [
            "Time (minutes)",
            "0 - 10",
            "10 - 20",
            "20 - 30",
            "30 - 40",
            "40 - 50"
          ],
          "rows": [
            [
              "Frequency",
              "6",
              "14",
              "20",
              "12",
              "8"
            ],
            [
              "Cumulative frequency",
              "6",
              {
                "key": "c1",
                "answer": "20",
                "answerType": "numeric",
                "marks": 0,
                "description": "cumulative frequency to 20"
              },
              {
                "key": "c2",
                "answer": "40",
                "answerType": "numeric",
                "marks": 0,
                "description": "cumulative frequency to 30"
              },
              {
                "key": "c3",
                "answer": "52",
                "answerType": "numeric",
                "marks": 1,
                "description": "cumulative frequency to 40"
              },
              {
                "key": "c4",
                "answer": "60",
                "answerType": "numeric",
                "marks": 1,
                "description": "cumulative frequency to 50"
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Using a scale of 2 cm to represent 10 minutes on the horizontal axis and 2 cm to represent 10 values on the vertical axis, draw the cumulative frequency curve for the data. Plot the cumulative frequency against the UPPER boundary of each class.",
        "marks": 3,
        "answer": "the points (10, 6), (20, 20), (30, 40), (40, 52), (50, 60) joined by a smooth curve",
        "solution": "Plot the cumulative frequency at the upper boundary of each class: (10, 6), (20, 20), (30, 40), (40, 52), (50, 60), then join them with a smooth curve.",
        "responseType": "graph",
        "grid": {
          "xMin": 0,
          "xMax": 50,
          "yMin": 0,
          "yMax": 60,
          "xStep": 10,
          "yStep": 10,
          "minorPerStep": 5,
          "xLabel": "Time (minutes)",
          "yLabel": "Cumulative frequency",
          "tools": [
            "point",
            "curve",
            "read"
          ]
        },
        "graph": {
          "points": [
            {
              "x": 10,
              "y": 6
            },
            {
              "x": 20,
              "y": 20
            },
            {
              "x": 30,
              "y": 40
            },
            {
              "x": 40,
              "y": 52
            },
            {
              "x": 50,
              "y": 60
            }
          ],
          "tolerance": 1.2,
          "pointMarks": 2,
          "curve": {
            "expression": "(x <= 20 ? (6 + (x - 10) * 7/5) : (x <= 30 ? (20 + (x - 20) * 2) : (x <= 40 ? (40 + (x - 30) * 6/5) : (x <= 50 ? (52 + (x - 40) * 4/5) : 60))))",
            "from": 10,
            "to": 50,
            "tolerance": 3.0,
            "requireSmooth": false
          },
          "curveMarks": 1
        },
        "answerType": "text",
        "responseSchema": {
          "type": "graph",
          "graph": {
            "xMin": 0,
            "xMax": 50,
            "yMin": 0,
            "yMax": 60,
            "xStep": 10,
            "yStep": 10,
            "minorPerStep": 5,
            "snapX": 1.0,
            "snapY": 1.0,
            "xLabel": "Time (minutes)",
            "yLabel": "Cumulative frequency",
            "tools": [
              "point",
              "curve",
              "read"
            ],
            "mode": "curve"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  10,
                  6
                ],
                [
                  20,
                  20
                ],
                [
                  30,
                  40
                ],
                [
                  40,
                  52
                ],
                [
                  50,
                  60
                ]
              ],
              "tolerance": [
                1.2,
                1.2
              ],
              "proportional": true,
              "label": "Accurate plotted points"
            },
            {
              "kind": "graph_curve",
              "marks": 1,
              "minimumPoints": 3,
              "referencePoints": [
                [
                  10,
                  6
                ],
                [
                  20,
                  20
                ],
                [
                  30,
                  40
                ],
                [
                  40,
                  52
                ],
                [
                  50,
                  60
                ]
              ],
              "tolerance": [
                1.2,
                1.2
              ],
              "minimumMatches": 3,
              "increasing": true,
              "requireSmooth": false,
              "label": "Appropriate curve through the plotted data"
            }
          ]
        }
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Use your graph to estimate the MEDIAN of the the times.",
        "marks": 2,
        "answer": "25",
        "solution": "The median is the 30th value. Reading across from 30 on the cumulative frequency axis to the curve and down to the horizontal axis gives approximately 25 minutes.",
        "suffix": " minutes",
        "tolerance": 2.5,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "reads across from 30 on the cumulative frequency axis",
            "check": {
              "type": "contains",
              "value": [
                30.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the median",
            "check": {
              "type": "numeric",
              "value": 25.0,
              "tolerance": 2.5
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 60 values is chosen at random. Determine the probability that it is MORE than 20 minutes. Give your answer as a fraction in its lowest terms.",
        "marks": 2,
        "answer": "2/3",
        "solution": "20 of the 60 values are 20 minutes or less, so 60 - 20 = 40 are more than 20 minutes. The probability is 40/60 = 2/3.",
        "requiredForm": "simplified_fraction",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the number greater than 20 minutes",
            "check": {
              "type": "contains",
              "value": [
                40.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the probability in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 0.6666666666666666,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q5-EJ-B",
    "source": "SPARK Practice Paper H original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2h-q6",
    "question_number": 6,
    "paper": "SPARK Practice Paper H",
    "section": "I",
    "topic": "Geometry and trigonometry",
    "marks": 9,
    "stem": "The diagram below, not drawn to scale, shows a regular decagon, a polygon with 10 equal sides. One of its interior angles is marked x.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the value of x, the size of EACH interior angle of the regular decagon.",
        "marks": 3,
        "answer": "144",
        "solution": "The 10 exterior angles of the polygon add up to 360°, so each exterior angle is 360°/10 = 36°. An interior angle and its exterior angle lie on a straight line, so x = 180 - 36 = 144°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses exterior angle = 360/10",
            "check": {
              "type": "contains",
              "value": [
                36.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "uses interior angle = 180 - exterior angle",
            "check": {
              "type": "contains",
              "value": [
                180.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the interior angle of the regular decagon",
            "check": {
              "type": "numeric",
              "value": 144.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "In the diagram below, not drawn to scale, PQ and RS are parallel straight lines cut by a transversal. Calculate the value of y.",
        "marks": 2,
        "answer": "112",
        "solution": "y and the angle of 112° are corresponding angles between the parallel lines PQ and RS, so they are equal. y = 112.",
        "suffix": "°",
        "tolerance": 0.011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 200\" width=\"100%\" style=\"max-width:380px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M46.0 66.0 L326.8 66.0\"/><path d=\"M334.0 66.0 L326.0 71.0 L326.0 61.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M46.0 146.0 L326.8 146.0\"/><path d=\"M334.0 146.0 L326.0 151.0 L326.0 141.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M120 186 L250 26\"/><path d=\"M246.5 66.0 A29 29 0 0 0 235.8 43.5\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"234.4\" y=\"58.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">112&#176;</text><path d=\"M181.5 146.0 A29 29 0 0 0 170.8 123.5\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"169.4\" y=\"138.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y&#176;</text><g stroke=\"none\" fill=\"currentColor\" font-style=\"italic\"><text x=\"32\" y=\"71\">P</text><text x=\"344\" y=\"71\">Q</text><text x=\"32\" y=\"151\">R</text><text x=\"344\" y=\"151\">S</text></g></svg>",
          "alt": "Two parallel straight lines, PQ above and RS below, cut by a transversal that slopes upwards to the right. At PQ an angle of 112 degrees is marked above the line, on the right of the transversal. At RS the angle y is marked above the line, on the right of the transversal. The diagram is not drawn to scale."
        },
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "identifies the pair as corresponding angles",
            "check": {
              "type": "method",
              "any": [
                "corresponding"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of y",
            "check": {
              "type": "numeric",
              "value": 112.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the reason for your answer in (b), naming the relationship between the two angles.",
        "marks": 2,
        "answer": "y and the angle of 112 degrees are corresponding angles between the parallel lines PQ and RS, so the two angles are equal.",
        "solution": "PQ is parallel to RS. The angle marked y and the angle of 112° are corresponding angles, and corresponding angles between parallel lines are equal. Naming them as corresponding angles earns 1 mark and saying that the lines PQ and RS are parallel earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "name",
            "marks": 1,
            "description": "names the angles as corresponding angles",
            "any": [
              "corresponding"
            ],
            "none": [
              "alternate",
              "co-interior"
            ]
          },
          {
            "id": "parallel",
            "marks": 1,
            "description": "says that PQ and RS are parallel",
            "any": [
              "parallel"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "names the angles as corresponding angles",
            "check": {
              "type": "written",
              "id": "name",
              "description": "names the angles as corresponding angles",
              "any": [
                "corresponding"
              ],
              "none": [
                "alternate",
                "co-interior"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "says that PQ and RS are parallel",
            "check": {
              "type": "written",
              "id": "parallel",
              "description": "says that PQ and RS are parallel",
              "any": [
                "parallel"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "A different regular polygon has an interior angle of 162°. Determine the number of sides of this polygon.",
        "marks": 2,
        "answer": "20",
        "solution": "Each exterior angle is 180 - 162 = 18°. The exterior angles add up to 360°, so the number of sides is 360/18 = 20.",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the exterior angle as 180 - the interior angle",
            "check": {
              "type": "contains",
              "value": [
                18.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number of sides",
            "check": {
              "type": "numeric",
              "value": 20.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 300\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M160.0 52.0 L98.9 71.9 L61.1 123.9 L61.1 188.1 L98.9 240.1 L160.0 260.0 L221.1 240.1 L258.9 188.1 L258.9 123.9 L221.1 71.9 Z\" stroke-width=\"1.8\"/><path d=\"M127.7 62.5 A34 34 0 0 0 192.3 62.5\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"160.0\" y=\"70.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">x&#176;</text></svg>",
      "alt": "A regular decagon with 10 equal sides and 10 equal angles. One interior angle is marked x. The diagram is not drawn to scale."
    },
    "design": "Q6-EJ-B",
    "source": "SPARK Practice Paper H original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2h-q7",
    "question_number": 7,
    "paper": "SPARK Practice Paper H",
    "section": "I",
    "topic": "Sequences, patterns and investigation",
    "marks": 10,
    "stem": "The diagrams below show the first three figures in a sequence of patterns made from sticks of equal length. Figure 1 is a single square, and each figure after it has one more square joined to the end of the row. Study the patterns of sticks and answer the questions that follow.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Complete the table below, giving the missing values for Figure 4 and for Figure 10.",
        "marks": 4,
        "answer": "5, 13, 11, 31",
        "solution": "Each new square adds one more vertical stick, so Figure 4 has 5 vertical sticks, and it adds 3 sticks to the total, so Figure 4 uses 13 sticks in all. Figure 10 is too long to draw, so use the rules: it has 10 + 1 = 11 vertical sticks and 3 x 10 + 1 = 31 sticks altogether.",
        "responseType": "table",
        "table": {
          "caption": "The number of sticks in each figure.",
          "headers": [
            "Figure",
            "Number of vertical sticks",
            "Total number of sticks"
          ],
          "rows": [
            [
              "1",
              "2",
              "4"
            ],
            [
              "2",
              "3",
              "7"
            ],
            [
              "3",
              "4",
              "10"
            ],
            [
              "4",
              {
                "blank": true,
                "key": "q4"
              },
              {
                "blank": true,
                "key": "r4"
              }
            ],
            [
              "10",
              {
                "blank": true,
                "key": "q10"
              },
              {
                "blank": true,
                "key": "r10"
              }
            ]
          ],
          "marks": 4,
          "cells": {
            "q4": {
              "type": "numeric",
              "value": 5.0,
              "marks": 1,
              "description": "number of vertical sticks in Figure 4"
            },
            "r4": {
              "type": "numeric",
              "value": 13.0,
              "marks": 1,
              "description": "total number of sticks in Figure 4"
            },
            "q10": {
              "type": "numeric",
              "value": 11.0,
              "marks": 1,
              "description": "number of vertical sticks in Figure 10"
            },
            "r10": {
              "type": "numeric",
              "value": 31.0,
              "marks": 1,
              "description": "total number of sticks in Figure 10"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The number of sticks in each figure.",
          "headers": [
            "Figure",
            "Number of vertical sticks",
            "Total number of sticks"
          ],
          "rows": [
            [
              "1",
              "2",
              "4"
            ],
            [
              "2",
              "3",
              "7"
            ],
            [
              "3",
              "4",
              "10"
            ],
            [
              "4",
              {
                "key": "q4",
                "answer": "5.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "number of vertical sticks in Figure 4"
              },
              {
                "key": "r4",
                "answer": "13.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "total number of sticks in Figure 4"
              }
            ],
            [
              "10",
              {
                "key": "q10",
                "answer": "11.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "number of vertical sticks in Figure 10"
              },
              {
                "key": "r10",
                "answer": "31.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "total number of sticks in Figure 10"
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression, in terms of n, for the TOTAL number of sticks in Figure n.",
        "marks": 2,
        "answer": "3n + 1",
        "solution": "Figure n has 2n horizontal sticks, n along the top and n along the bottom, together with n + 1 vertical sticks, so the total is 2n + n + 1 = 3n + 1 sticks. Checking against the table, n = 3 gives 10 and n = 4 gives 13.",
        "answerType": "expression",
        "accepted": [
          "2n + (n + 1)",
          "n + 2n + 1"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "shows how the total number of sticks is built up in Figure n",
            "check": {
              "type": "contains",
              "value": [
                3.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for the total number of sticks",
            "check": {
              "type": "expression",
              "value": "3n + 1",
              "accepted": [
                "2n + (n + 1)",
                "n + 2n + 1"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the number of the figure that is made from a total of 100 sticks. Show clearly the equation you use.",
        "marks": 2,
        "answer": "33",
        "solution": "The total number of sticks in Figure n is 3n + 1. So 3n + 1 = 100, giving 3n = 99 and n = 33. The figure is Figure 33. Check: 3 x 33 + 1 = 99 + 1 = 100.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the equation 3n + 1 = 100 for the total number of sticks",
            "check": {
              "type": "contains",
              "value": [
                99.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the figure number",
            "check": {
              "type": "numeric",
              "value": 33.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Explain why no figure in this sequence can be made from exactly 51 sticks.",
        "marks": 2,
        "answer": "The total number of sticks in Figure n is 3n + 1, which is always one more than a multiple of 3. If 3n + 1 = 51 then 3n = 50 and n = 50/3, which is not a whole number, so no figure in the sequence is made from exactly 51 sticks.",
        "solution": "The totals are 4, 7, 10, 13, and so on, each one more than a multiple of 3, because Figure n uses 3n + 1 sticks. Saying that the total is 3n + 1, one more than a multiple of 3, or writing the equation 3n + 1 = 51, earns 1 mark. Showing that this gives 3n = 50 and n = 50/3, which is not a whole number, earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "form",
            "marks": 1,
            "description": "forms 3n + 1 = 51, or states that the total is always one more than a multiple of 3",
            "any": [
              "3n + 1 = 51",
              "one more than a multiple of 3",
              "multiple of 3"
            ]
          },
          {
            "id": "why",
            "marks": 1,
            "description": "shows that n would not be a whole number",
            "any": [
              "not a whole number",
              "not an integer",
              "50/3"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "forms 3n + 1 = 51, or states that the total is always one more than a multiple of 3",
            "check": {
              "type": "written",
              "id": "form",
              "description": "forms 3n + 1 = 51, or states that the total is always one more than a multiple of 3",
              "any": [
                "3n + 1 = 51",
                "one more than a multiple of 3",
                "multiple of 3"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "shows that n would not be a whole number",
            "check": {
              "type": "written",
              "id": "why",
              "description": "shows that n would not be a whole number",
              "any": [
                "not a whole number",
                "not an integer",
                "50/3"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 80\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M36.0 14.0 L36.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M62.0 14.0 L62.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M36.0 14.0 L62.0 14.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M36.0 40.0 L62.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><text x=\"49.0\" y=\"64.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 1</text><path d=\"M98.0 14.0 L98.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M124.0 14.0 L124.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M150.0 14.0 L150.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M98.0 14.0 L124.0 14.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M98.0 40.0 L124.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M124.0 14.0 L150.0 14.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M124.0 40.0 L150.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><text x=\"124.0\" y=\"64.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 2</text><path d=\"M186.0 14.0 L186.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M212.0 14.0 L212.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M238.0 14.0 L238.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M264.0 14.0 L264.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M186.0 14.0 L212.0 14.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M186.0 40.0 L212.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M212.0 14.0 L238.0 14.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M212.0 40.0 L238.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M238.0 14.0 L264.0 14.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><path d=\"M238.0 40.0 L264.0 40.0\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><text x=\"225.0\" y=\"64.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 3</text></svg>",
      "alt": "Three patterns made from sticks of equal length. Figure 1 is one square made from 4 sticks, 2 of them vertical. Figure 2 is a row of 2 squares that share a stick, made from 7 sticks, 3 of them vertical. Figure 3 is a row of 3 squares, made from 10 sticks, 4 of them vertical."
    },
    "design": "Q7-EJ-B",
    "source": "SPARK Practice Paper H original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2h-q8",
    "question_number": 8,
    "paper": "SPARK Practice Paper H",
    "section": "II",
    "topic": "Relations, functions and graphs",
    "marks": 12,
    "stem": "A furniture workshop makes chairs and tables. In one week x chairs and y tables are made. The workshop can finish at most 24 pieces a month. A chair uses 3 units of timber and a table uses 2 units, and only 60 units of timber are available.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write TWO inequalities, other than x ≥ 0 and y ≥ 0, to represent the information given.",
        "marks": 4,
        "answer": "x + y <= 24; 3x + 2y <= 60",
        "solution": "At most 24 in total gives x + y ≤ 24. The second condition gives 3x + 2y ≤ 60.",
        "answerType": "expression",
        "accepted": [
          "x + y <= 24, 3x + 2y <= 60"
        ],
        "criteria": [
          {
            "kind": "B",
            "marks": 2,
            "description": "the first inequality",
            "check": {
              "type": "allOf",
              "options": [
                {
                  "type": "inequality",
                  "value": "x + y <= 24"
                }
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 2,
            "description": "the second inequality",
            "check": {
              "type": "allOf",
              "options": [
                {
                  "type": "inequality",
                  "value": "3x + 2y <= 60"
                }
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B2"
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "The profit on a chair is $9 and the profit on a table is $7. Write an expression, in terms of x and y, for the TOTAL profit, P.",
        "marks": 2,
        "answer": "P = 9x + 7y",
        "solution": "Each of the x chairs earns $9 and each of the y tables earns $7, so P = 9x + 7y.",
        "answerType": "expression",
        "accepted": [
          "9x + 7y"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses $9 for each of the x chairs",
            "check": {
              "type": "contains",
              "value": [
                9.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for the profit",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "equation",
                  "value": "P = 9x + 7y"
                },
                {
                  "type": "expression",
                  "value": "9x + 7y"
                }
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The vertices of the feasible region are (0, 24), (12, 12), (20, 0). Calculate the profit at EACH of these vertices.",
        "marks": 4,
        "answer": "$168, $192, $180",
        "solution": "Substitute each vertex into P = 9x + 7y: at (0, 24), P = 9(0) + 7(24) = $168; at (12, 12), P = 9(12) + 7(12) = $192; at (20, 0), P = 9(20) + 7(0) = $180.",
        "answerType": "text",
        "accepted": [
          "(0, 24): $168; (12, 12): $192; (20, 0): $180"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes the vertices into P = 9x + 7y",
            "check": {
              "type": "contains",
              "value": [
                168.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "evaluates the profit at every vertex",
            "check": {
              "type": "contains",
              "value": [
                192.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 2,
            "description": "all three profits",
            "check": {
              "type": "set",
              "value": [
                168.0,
                192.0,
                180.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Hence, determine the number of chairs and the number of tables that a furniture workshop should make each week to obtain the MAXIMUM profit.",
        "marks": 2,
        "answer": "12 chairs and 12 tables, giving a profit of $192",
        "solution": "The greatest of the profits is $192, at the vertex (12, 12). So 12 chairs and 12 tables should be made.",
        "answerType": "text",
        "accepted": [
          "12, 12",
          "(12, 12)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "selects the vertex giving the greatest profit",
            "check": {
              "type": "contains",
              "value": [
                192.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "12 chairs and 12 tables",
            "check": {
              "type": "set",
              "value": [
                12.0,
                12.0,
                192.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "section_heading": "ALGEBRA, RELATIONS, FUNCTIONS AND GRAPHS",
    "design": "Q8-EJ-B",
    "source": "SPARK Practice Paper H original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2h-q9",
    "question_number": 9,
    "paper": "SPARK Practice Paper H",
    "section": "II",
    "topic": "Geometry and trigonometry",
    "marks": 12,
    "stem": "The diagram below, not drawn to scale, shows a vertical communication mast TB standing on level horizontal ground. The points C, A, B and D lie on a straight line on the ground, with A between C and B, and B between A and D. AB = 45 m and the angle of elevation of the top, T, of the communication mast from A is 32°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate, correct to 1 decimal place, the height, TB, of the communication mast.",
        "marks": 3,
        "answer": "28.1",
        "solution": "Triangle TBA is right-angled at B, so tan 32° = TB/AB = TB/45. Therefore TB = 45 x tan 32° = 28.1191 = 28.1 m, correct to 1 decimal place.",
        "suffix": " m",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses tan = opposite/adjacent in triangle TBA",
            "check": {
              "type": "method",
              "any": [
                "tan"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes to give TB = 45 tan 32",
            "check": {
              "type": "contains",
              "value": [
                45.0,
                32.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "TB = 28.1 m",
            "check": {
              "type": "numeric",
              "value": 28.119120835919738,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "The angle of elevation of T from C is 19°. Calculate, correct to 1 decimal place, the length of AC.",
        "marks": 4,
        "answer": "36.7",
        "solution": "Triangle TBC is right-angled at B, so tan 19° = TB/CB, which gives CB = TB / tan 19°. So CB = 28.1191 / tan 19° = 81.66 m. Since A lies between C and B, AC = CB - AB = 81.66 - 45 = 36.66 = 36.7 m, correct to 1 decimal place.",
        "suffix": " m",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses tan 19 = TB/CB in triangle TBC",
            "check": {
              "type": "method",
              "any": [
                "tan"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "rearranges to CB = TB / tan 19",
            "check": {
              "type": "contains",
              "value": [
                19.0,
                28.1191
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "CB = 81.66 m and AC = CB - 45",
            "check": {
              "type": "contains",
              "value": [
                81.66,
                45.0
              ]
            },
            "field": "all",
            "code": "M3"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "AC = 36.7 m",
            "check": {
              "type": "numeric",
              "value": 36.663856602358976,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "a/tan(19) - 45"
            },
            "code": "A1",
            "depends": [
              "M3"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "D is a point on the ground on the opposite side of the communication mast from A, with BD = 60 m. Calculate, correct to 1 decimal place, the angle of depression of D from T.",
        "marks": 3,
        "answer": "25.1",
        "solution": "The angle of depression of D from T is equal to the angle of elevation of T from D, which is angle TDB. Triangle TBD is right-angled at B, with TB = 28.1191 m and BD = 60 m, so tan(angle TDB) = TB/BD = 0.4687. So angle TDB = 25.11 = 25.1°, and the angle of depression of D from T is 25.1°, correct to 1 decimal place.",
        "suffix": "°",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses tan(angle TDB) = TB/BD in triangle TBD",
            "check": {
              "type": "method",
              "any": [
                "tan"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes TB and BD = 60 correctly",
            "check": {
              "type": "contains",
              "value": [
                28.1191,
                60.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "angle of depression = 25.1 degrees",
            "check": {
              "type": "numeric",
              "value": 25.11023188762961,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "atan(a/60)"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Explain why the angle of elevation of T from A is EQUAL to the angle of depression of A from T.",
        "marks": 2,
        "answer": "The horizontal line drawn through T is parallel to the level ground AB, and AT is a transversal cutting both of them. The angle of elevation of T from A and the angle of depression of A from T are therefore alternate angles between parallel lines, and alternate angles are equal.",
        "solution": "The angle of elevation is measured at A from the horizontal ground AB up to AT, and the angle of depression is measured at T from the horizontal line through T down to TA. The horizontal line through T is parallel to AB because both are horizontal, and AT is a transversal cutting this pair of parallel lines. The two angles are alternate angles (Z angles) between the parallel lines, so they are equal.",
        "responseType": "written",
        "rubric": [
          {
            "id": "r1",
            "marks": 1,
            "description": "states that the horizontal line through T is parallel to the ground AB",
            "any": [
              "parallel"
            ]
          },
          {
            "id": "r2",
            "marks": 1,
            "description": "identifies the two angles as alternate angles, which are equal",
            "any": [
              "alternate",
              "z angles"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "states that the horizontal line through T is parallel to the ground AB",
            "check": {
              "type": "written",
              "id": "r1",
              "description": "states that the horizontal line through T is parallel to the ground AB",
              "any": [
                "parallel"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "identifies the two angles as alternate angles, which are equal",
            "check": {
              "type": "written",
              "id": "r2",
              "description": "identifies the two angles as alternate angles, which are equal",
              "any": [
                "alternate",
                "z angles"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      }
    ],
    "section_heading": "GEOMETRY AND TRIGONOMETRY",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 290\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M30 236 L326 236\"/><path d=\"M300 236 L300 103.5\" stroke-width=\"2\"/><path d=\"M56 236 L300 103.5\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><path d=\"M300.0 223.0 L287.0 223.0 L287.0 236.0\" stroke-width=\"1.2\"/><path d=\"M96.0 236.0 A40 40 0 0 0 91.2 216.9\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"81.4\" y=\"229.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">32&#176;</text><text x=\"178.0\" y=\"256.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">45 m</text><text x=\"326.0\" y=\"169.8\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\"></text><text x=\"44.0\" y=\"254.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"306.0\" y=\"91.5\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">T</text><text x=\"314.0\" y=\"242.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text></svg>",
      "alt": "A diagram, not drawn to scale, of a vertical communication mast TB standing on level horizontal ground. B is the foot of the communication mast and T is its top. A is a point on the ground with AB marked 45 m, and the right angle at B between the ground and the communication mast is marked. A broken line is drawn from A to T and the angle of elevation of T from A is marked 32 degrees."
    },
    "design": "Q9-EJ-B",
    "source": "SPARK Practice Paper H original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2h-q10",
    "question_number": 10,
    "paper": "SPARK Practice Paper H",
    "section": "II",
    "topic": "Vectors and matrices",
    "marks": 12,
    "stem": "The diagram below, not drawn to scale, shows triangle OPQ in which \\vec{OP} = p and \\vec{OQ} = q. S is the midpoint of OP and T is the midpoint of OQ.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Write \\vec{PQ} in terms of p and q.",
        "marks": 2,
        "answer": "q - p",
        "solution": "\\vec{PQ} = \\vec{PO} + \\vec{OQ} = -p + q = q - p.",
        "answerType": "expression",
        "accepted": [
          "-p + q"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses \\vec{PQ} = \\vec{PO} + \\vec{OQ}",
            "check": {
              "type": "method",
              "any": [
                "\\vec{PO} + \\vec{OQ}",
                "PO + OQ",
                "-p + q",
                "q - p"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for \\vec{PQ}",
            "check": {
              "type": "expression",
              "value": "q - p",
              "accepted": [
                "-p + q"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Write \\vec{PT} in terms of p and q.",
        "marks": 2,
        "answer": "(1/2)q - p",
        "solution": "T is the midpoint of OQ, so \\vec{OT} = (1/2)q. Then \\vec{PT} = \\vec{PO} + \\vec{OT} = -p + (1/2)q = (1/2)q - p.",
        "answerType": "expression",
        "accepted": [
          "-p + (1/2)q",
          "(q - 2p)/2"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses \\vec{OT} = (1/2)q",
            "check": {
              "type": "method",
              "any": [
                "\\vec{OT} = (1/2)q",
                "(1/2)q",
                "q/2",
                "0.5q",
                "1/2 q",
                "(q - 2p)"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for \\vec{PT}",
            "check": {
              "type": "expression",
              "value": "(1/2)q - p",
              "accepted": [
                "-p + (1/2)q",
                "(q - 2p)/2"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine \\vec{ST} in terms of p and q, giving your answer in its simplest form.",
        "marks": 3,
        "answer": "(1/2)q - (1/2)p",
        "solution": "S is the midpoint of OP, so \\vec{OS} = (1/2)p, and \\vec{OT} = (1/2)q. Then \\vec{ST} = \\vec{SO} + \\vec{OT} = -(1/2)p + (1/2)q = (1/2)(q - p).",
        "answerType": "expression",
        "accepted": [
          "(1/2)(q - p)",
          "(q - p)/2"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes \\vec{OS} = (1/2)p and \\vec{OT} = (1/2)q",
            "check": {
              "type": "method",
              "any": [
                "\\vec{OS} = (1/2)p",
                "(1/2)p",
                "p/2",
                "0.5p",
                "(1/2)(q - p)",
                "(q - p)/2"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "uses \\vec{ST} = \\vec{SO} + \\vec{OT}",
            "check": {
              "type": "method",
              "any": [
                "\\vec{SO} + \\vec{OT}",
                "\\vec{OT} - \\vec{OS}",
                "SO + OT",
                "(1/2)q - (1/2)p",
                "(1/2)(q - p)",
                "(q - p)/2",
                "0.5q - 0.5p"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the simplified expression for \\vec{ST}",
            "check": {
              "type": "expression",
              "value": "(1/2)q - (1/2)p",
              "accepted": [
                "(1/2)(q - p)",
                "(q - p)/2"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Show that \\vec{ST} is parallel to \\vec{PQ}, and hence state, giving a reason, the type of quadrilateral PQTS.",
        "marks": 3,
        "answer": "\\vec{ST} = (1/2)(q - p) = (1/2)\\vec{PQ}, so \\vec{ST} is a scalar multiple of \\vec{PQ} and ST is parallel to PQ. In the quadrilateral PQTS the sides PQ and TS are parallel, but QT and SP are not, so exactly one pair of opposite sides is parallel and PQTS is a trapezium.",
        "solution": "From (a) (i), \\vec{PQ} = q - p, and from (b), \\vec{ST} = (1/2)(q - p). Hence \\vec{ST} = (1/2)\\vec{PQ}. One vector is a scalar multiple of the other, so ST is parallel to PQ and half its length. In PQTS the sides PQ and TS are therefore parallel, while \\vec{QT} = -(1/2)q and \\vec{SP} = (1/2)p are not parallel, because p and q are not parallel. A quadrilateral with exactly one pair of parallel sides is a trapezium.",
        "responseType": "written",
        "rubric": [
          {
            "id": "multiple",
            "marks": 1,
            "description": "shows that \\vec{ST} is (1/2)\\vec{PQ}, a scalar multiple of it",
            "any": [
              "scalar multiple",
              "multiple of",
              "1/2",
              "half",
              "0.5"
            ]
          },
          {
            "id": "parallel",
            "marks": 1,
            "description": "states that ST is parallel to PQ",
            "any": [
              "parallel",
              "same direction",
              "same gradient"
            ]
          },
          {
            "id": "trapezium",
            "marks": 1,
            "description": "names PQTS as a trapezium",
            "any": [
              "trapezium",
              "trapezoid"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "shows that \\vec{ST} is (1/2)\\vec{PQ}, a scalar multiple of it",
            "check": {
              "type": "written",
              "id": "multiple",
              "description": "shows that \\vec{ST} is (1/2)\\vec{PQ}, a scalar multiple of it",
              "any": [
                "scalar multiple",
                "multiple of",
                "1/2",
                "half",
                "0.5"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states that ST is parallel to PQ",
            "check": {
              "type": "written",
              "id": "parallel",
              "description": "states that ST is parallel to PQ",
              "any": [
                "parallel",
                "same direction",
                "same gradient"
              ]
            },
            "field": "answer",
            "code": "B2"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "names PQTS as a trapezium",
            "check": {
              "type": "written",
              "id": "trapezium",
              "description": "names PQTS as a trapezium",
              "any": [
                "trapezium",
                "trapezoid"
              ]
            },
            "field": "answer",
            "code": "B3"
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "The vectors p and q are given by p = [[-2], [3]] and q = [[4], [7]]. Calculate |\\vec{ST}|, the magnitude of \\vec{ST}, giving your answer in EXACT form.",
        "marks": 2,
        "answer": "sqrt(13)",
        "solution": "\\vec{ST} = (1/2)(q - p) = (1/2)[[6], [4]] = [[3], [2]]. So |\\vec{ST}| = sqrt((3)^2 + (2)^2) = sqrt(9 + 4) = sqrt(13), which is 3.61 correct to 2 decimal places.",
        "answerType": "expression",
        "accepted": [
          "3.61"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses |v| = sqrt(x^2 + y^2)",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    13.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    9.0,
                    4.0
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the magnitude of \\vec{ST}",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "expression",
                  "value": "sqrt(13)",
                  "accepted": [
                    "3.61"
                  ]
                },
                {
                  "type": "numeric",
                  "value": 3.605551275463989,
                  "tolerance": 0.01
                }
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "A1"
          }
        ]
      }
    ],
    "section_heading": "VECTORS AND MATRICES",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 370 300\" width=\"100%\" style=\"max-width:350px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M66.0 254.0 L150.0 66.0 L312.0 178.0 Z\"/><path d=\"M66.0 254.0 L89.6 201.2\" stroke-width=\"2.6\"/><path d=\"M92.9 193.8 L94.3 204.3 L84.1 199.8 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M66.0 254.0 L137.0 232.1\" stroke-width=\"2.6\"/><path d=\"M144.7 229.7 L137.8 237.7 L134.5 227.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M108.0 160.0 L189.0 216.0\" stroke-dasharray=\"6 4\" stroke-width=\"1.5\"/><circle cx=\"108.0\" cy=\"160.0\" r=\"3.6\" fill=\"currentColor\"/><circle cx=\"189.0\" cy=\"216.0\" r=\"3.6\" fill=\"currentColor\"/><text x=\"48.0\" y=\"264.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text><text x=\"150.0\" y=\"46.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">P</text><text x=\"332.0\" y=\"178.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">Q</text><text x=\"84.0\" y=\"158.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">S</text><text x=\"195.0\" y=\"239.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">T</text><text x=\"64.0\" y=\"218.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"15\" font-style=\"italic\" font-weight=\"bold\">p</text><text x=\"123.0\" y=\"251.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"15\" font-style=\"italic\" font-weight=\"bold\">q</text></svg>",
      "alt": "Triangle OPQ, not drawn to scale. An arrow from O along OP is labelled p and an arrow from O along OQ is labelled q. S, the midpoint of OP, and T, the midpoint of OQ, are marked with dots and joined by a broken line, so that PQTS is a quadrilateral."
    },
    "design": "Q10-EJ-B",
    "source": "SPARK Practice Paper H original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2i-q1",
    "question_number": 1,
    "paper": "SPARK Practice Paper I",
    "section": "I",
    "topic": "Number theory and computation",
    "marks": 9,
    "stem": "Belmont Traders advertises a sewing machine at a marked price of $3,600.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (2 5/6 + 3/4) ÷ (5/8 - 1/6), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "86/11",
        "solution": "2 5/6 = 17/6, so the numerator is 17/6 + 3/4 = 43/12. The denominator is 5/8 - 1/6 = 11/24. Dividing means multiplying by the reciprocal: 43/12 x 24/11 = 86/11.",
        "cao": true,
        "requiredForm": "simplified_fraction",
        "accepted": [
          "7 9/11"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the numerator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                3.5833333333333335
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the denominator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                0.4583333333333333
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the exact value in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 7.818181818181818,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "A discount of 20% is offered for payment in cash. Calculate the cash price of the sewing machine.",
        "marks": 2,
        "answer": "2880.00",
        "solution": "The discount is 20% of $3,600 = $720.00. The cash price is $3,600 - $720.00 = $2,880.00.",
        "prefix": "$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds 20% of $3,600",
            "check": {
              "type": "contains",
              "value": [
                720.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the cash price",
            "check": {
              "type": "numeric",
              "value": 2880.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Value Added Tax of 10% is then added to the cash price. Calculate the amount the customer actually pays.",
        "marks": 2,
        "answer": "3168.00",
        "solution": "VAT = 10% of $2,880.00 = $288.00. The customer pays $2,880.00 + $288.00 = $3,168.00.",
        "prefix": "$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds 10% of the cash price",
            "check": {
              "type": "contains",
              "value": [
                288.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the amount paid",
            "check": {
              "type": "numeric",
              "value": 3168.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b1"
              ],
              "formula": "b1 * 1.1"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The sewing machine may instead be bought on hire purchase, by paying a deposit of $700 and 10 monthly instalments of $320. Calculate how much MORE than the amount in (b) (ii) is paid under this arrangement.",
        "marks": 2,
        "answer": "732.00",
        "solution": "The hire purchase price is $700 + 10 x $320 = $700 + $3,200 = $3,900.00. That is $3,900.00 - $3,168.00 = $732.00 more.",
        "prefix": "$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the total hire purchase price",
            "check": {
              "type": "contains",
              "value": [
                3900.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the extra amount paid",
            "check": {
              "type": "numeric",
              "value": 732.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b2"
              ],
              "formula": "3900.0 - b2"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q1-EJ-A",
    "source": "SPARK Practice Paper I original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2i-q2",
    "question_number": 2,
    "paper": "SPARK Practice Paper I",
    "section": "I",
    "topic": "Algebra",
    "marks": 9,
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Given that H = (5c^2 - 4d)/(c - 2d), calculate the value of H when c = 2 and d = -3.",
        "marks": 2,
        "answer": "4",
        "solution": "Substituting c = 2 and d = -3: the numerator is 5(2)^2 - 4(-3) = 20 + 12 = 32, and the denominator is (2) - 2(-3) = 2 + 6 = 8. So H = 32/8 = 4.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes c = 2 and d = -3 into the formula",
            "check": {
              "type": "contains",
              "value": [
                2.0,
                -3.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of H",
            "check": {
              "type": "numeric",
              "value": 4.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Expand and simplify (4t + 3)(3t - 2).",
        "marks": 2,
        "answer": "12t^2 + t - 6",
        "solution": "Multiplying each term in the first bracket by each term in the second: (4t + 3)(3t - 2) = 12t^2 - 8t + 9t - 6. Collecting the two terms in t: 12t^2 + t - 6.",
        "answerType": "expression",
        "accepted": [
          "12t^2 - 6 + t"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies out to give the four products",
            "check": {
              "type": "contains",
              "value": [
                8.0,
                9.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expansion in its simplest form",
            "check": {
              "type": "expression",
              "value": "12t^2 + t - 6",
              "accepted": [
                "12t^2 - 6 + t"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Factorise COMPLETELY: 3m^2 - 27n^2",
        "marks": 2,
        "answer": "3(m - 3n)(m + 3n)",
        "solution": "Take out the common factor 3: 3(m^2 - 9n^2). The bracket is a difference of two squares, so 3m^2 - 27n^2 = 3(m - 3n)(m + 3n).",
        "answerType": "expression",
        "requiredForm": "factorised",
        "accepted": [
          "3(m + 3n)(m - 3n)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "takes out the common factor 3",
            "check": {
              "type": "method",
              "any": [
                "common factor 3"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the complete factorisation",
            "check": {
              "type": "expression",
              "value": "3(m - 3n)(m + 3n)",
              "accepted": [
                "3(m + 3n)(m - 3n)"
              ],
              "requireFactorised": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Solve the inequality 9 - 2x < 5x - 8, and state the SMALLEST integer value of x that satisfies it.",
        "marks": 3,
        "answer": "x > 17/7; the smallest integer value of x is 3",
        "solution": "9 - 2x < 5x - 8. Collecting the terms in x on one side and the numbers on the other: -7x < -17. Dividing both sides by -7 reverses the inequality: x > 17/7. Since 17/7 lies between 2 and 3, the smallest integer value of x that satisfies the inequality is 3.",
        "accepted": [
          "x > 2 3/7; the smallest integer value of x is 3",
          "x > 17/7, x = 3"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "collects the terms in x on one side",
            "check": {
              "type": "contains",
              "value": [
                -7.0,
                -17.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "solves the inequality",
            "check": {
              "type": "inequality",
              "value": "x > 17/7"
            },
            "field": "all",
            "code": "A1",
            "depends": [
              "M1"
            ]
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states the smallest integer value of x",
            "check": {
              "type": "numeric",
              "value": 3.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      }
    ],
    "design": "Q2-EJ-A",
    "source": "SPARK Practice Paper I original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2i-q3",
    "question_number": 3,
    "paper": "SPARK Practice Paper I",
    "section": "I",
    "topic": "Relations, functions and graphs",
    "marks": 9,
    "stem": "A(-2, -3) and B(3, 7) are two points in the Cartesian plane.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "On the grid provided, plot the points A(-2, -3) and B(3, 7).",
        "marks": 2,
        "answer": "A(-2, -3) and B(3, 7) correctly plotted",
        "solution": "A(-2, -3) is 2 units to the left of the y-axis and 3 units below the x-axis. B(3, 7) is 3 units to the right of the y-axis and 7 units above the x-axis. Each point is marked where those two grid lines cross.",
        "responseType": "graph",
        "grid": {
          "xMin": -6,
          "xMax": 6,
          "yMin": -6,
          "yMax": 8,
          "xStep": 1,
          "yStep": 1,
          "minorPerStep": 2,
          "xLabel": "x",
          "yLabel": "y",
          "tools": [
            "point"
          ]
        },
        "graph": {
          "points": [
            {
              "x": -2,
              "y": -3
            },
            {
              "x": 3,
              "y": 7
            }
          ],
          "tolerance": 0.25,
          "pointMarks": 2
        },
        "answerType": "text",
        "responseSchema": {
          "type": "graph",
          "graph": {
            "xMin": -6,
            "xMax": 6,
            "yMin": -6,
            "yMax": 8,
            "xStep": 1,
            "yStep": 1,
            "minorPerStep": 2,
            "snapX": 0.25,
            "snapY": 0.25,
            "xLabel": "x",
            "yLabel": "y",
            "tools": [
              "point"
            ],
            "mode": "curve"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  -2,
                  -3
                ],
                [
                  3,
                  7
                ]
              ],
              "tolerance": [
                0.25,
                0.25
              ],
              "proportional": true,
              "label": "Accurate plotted points"
            }
          ]
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the coordinates of the midpoint of AB.",
        "marks": 2,
        "answer": "(1/2, 2)",
        "solution": "The midpoint of AB is ((-2) + (3))/2 for the x-coordinate and ((-3) + (7))/2 for the y-coordinate. Now (-2) + (3) = 1 and (-3) + (7) = 4, so the midpoint of AB is (1/2, 2).",
        "answerType": "coordinate",
        "accepted": [
          "(0.5, 2)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "adds the two x-coordinates and the two y-coordinates, and halves each sum",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    1.0,
                    4.0
                  ]
                },
                {
                  "type": "coordinate",
                  "value": [
                    0.5,
                    2.0
                  ],
                  "tolerance": 1e-06
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the coordinates of the midpoint",
            "check": {
              "type": "coordinate",
              "value": [
                0.5,
                2.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the gradient of AB.",
        "marks": 2,
        "answer": "2",
        "solution": "The gradient of AB is (the change in y)/(the change in x). The change in y is (7) - (-3) = 10 and the change in x is (3) - (-2) = 5, so the gradient of AB is 10/5 = 2.",
        "accepted": [],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses gradient = (y2 - y1)/(x2 - x1)",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    10.0,
                    5.0
                  ]
                },
                {
                  "type": "numeric",
                  "value": 2.0,
                  "tolerance": 1e-06
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the gradient of AB",
            "check": {
              "type": "numeric",
              "value": 2.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the equation of the line AB, giving your answer in the form y = mx + c.",
        "marks": 3,
        "answer": "y = 2x + 1",
        "solution": "The gradient is m = 2. Substituting m = 2 and the point A(-2, -3) into y = mx + c gives (-3) = (2)(-2) + c, that is (-3) = -4 + c, so c = (-3) - (-4) = 1. The equation of the line AB is y = 2x + 1.",
        "answerType": "expression",
        "accepted": [],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes the gradient and the coordinates of a point on the line into y = mx + c",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "method",
                  "any": [
                    "y = mx + c",
                    "substituting"
                  ]
                },
                {
                  "type": "equation",
                  "value": "y = 2x + 1"
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of the intercept c",
            "check": {
              "type": "contains",
              "value": [
                1.0
              ]
            },
            "field": "all",
            "ecf": {
              "uses": [
                "c"
              ],
              "formula": "(-3) - c * (-2)"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the equation of AB in the form y = mx + c",
            "check": {
              "type": "equation",
              "value": "y = 2x + 1"
            },
            "field": "answer",
            "code": "A2",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q3-EJ-A",
    "source": "SPARK Practice Paper I original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2i-q4",
    "question_number": 4,
    "paper": "SPARK Practice Paper I",
    "section": "I",
    "topic": "Measurement and construction",
    "marks": 9,
    "stem": "The straight line LR is already drawn on the construction pad, with the points A and B on it, where AB = 6 cm.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Using only a ruler and a pair of compasses, construct triangle ABC in which AB = BC = CA = 6 cm, so that angle CAB = 60°. Your construction arcs must be clearly shown.",
        "marks": 3,
        "answer": "the equilateral triangle ABC of side 6 cm standing on AB, giving angle CAB = 60°, with the two arcs shown",
        "solution": "Open the compasses to 6 cm, the length of AB. With centre A draw an arc above the line; with the same radius and centre B draw a second arc to cut it at C. Join AC and BC. All three sides are 6 cm, so triangle ABC is equilateral and each of its angles is 60°; in particular angle CAB = 60°. The two arcs must be left on the page.",
        "responseType": "construction",
        "pad": {
          "width": 560,
          "height": 340,
          "unitsPerCm": 40,
          "given": [
            {
              "id": "L",
              "x": 1.5,
              "y": 2.0
            },
            {
              "id": "A",
              "x": 3.5,
              "y": 2.0
            },
            {
              "id": "B",
              "x": 9.5,
              "y": 2.0
            },
            {
              "id": "R",
              "x": 12.5,
              "y": 2.0
            }
          ],
          "givenSegments": [
            [
              "L",
              "R"
            ]
          ]
        },
        "construction": {
          "construction": "triangle",
          "args": [
            {
              "A": {
                "id": "A",
                "x": 3.5,
                "y": 2.0
              },
              "B": {
                "id": "B",
                "x": 9.5,
                "y": 2.0
              },
              "sides": {
                "AB": 6,
                "BC": 6,
                "AC": 6
              }
            }
          ]
        },
        "answerType": "text",
        "responseSchema": {
          "type": "construction",
          "pad": {
            "width": 560,
            "height": 340,
            "unitsPerCm": 40,
            "given": [
              {
                "id": "L",
                "x": 1.5,
                "y": 2.0
              },
              {
                "id": "A",
                "x": 3.5,
                "y": 2.0
              },
              {
                "id": "B",
                "x": 9.5,
                "y": 2.0
              },
              {
                "id": "R",
                "x": 12.5,
                "y": 2.0
              }
            ],
            "givenSegments": [
              [
                "L",
                "R"
              ]
            ]
          },
          "construction": {
            "construction": "triangle",
            "args": [
              {
                "A": {
                  "id": "A",
                  "x": 3.5,
                  "y": 2.0
                },
                "B": {
                  "id": "B",
                  "x": 9.5,
                  "y": 2.0
                },
                "sides": {
                  "AB": 6,
                  "BC": 6,
                  "AC": 6
                }
              }
            ],
            "marks": 3
          },
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "allowProtractor": false
        }
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "State the size of angle CAL.",
        "marks": 1,
        "answer": "120",
        "solution": "L, A and B lie on a straight line, so angle CAL and angle CAB add up to 180°. Angle CAB = 60°, so angle CAL = 180 - 60 = 120°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the size of angle CAL",
            "check": {
              "type": "numeric",
              "value": 120.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Measure and state, in centimetres, the length of CL. Give your answer correct to 1 decimal place.",
        "marks": 2,
        "answer": "7.2",
        "solution": "CL is measured with the ruler from C to L and is 7.2 cm. (A check: C stands 5 cm to the right of L and 5.196 cm above the line, so CL = sqrt(25 + 27) = sqrt(52) = 7.21 cm.) A reading within 0.5 cm earns the first mark and a reading within 0.25 cm earns the second.",
        "suffix": " cm",
        "tolerance": 0.25,
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "a reading within 0.5 cm of the correct value",
            "check": {
              "type": "numeric",
              "value": 7.211102550927978,
              "tolerance": 0.5
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "the value correct to within 0.25 cm",
            "check": {
              "type": "numeric",
              "value": 7.211102550927978,
              "tolerance": 0.25
            },
            "field": "answer",
            "depends": [],
            "code": "B2"
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The diagram below, not drawn to scale, shows a plane figure made up of the rectangle ABCD, which is 12 cm long and 10 cm wide, together with a semicircle drawn on the end BC as diameter. [In this question, take π = 3.14.] Calculate the TOTAL area of the figure.",
        "marks": 3,
        "answer": "159.25",
        "solution": "Area of the rectangle = 12 x 10 = 120 cm^2. The semicircle has diameter 10 cm, so its radius is 5 cm. Area of the semicircle = (1/2) x π x r^2 = (1/2) x 3.14 x 5^2 = (1/2) x 3.14 x 25 = 39.25 cm^2. Total area = 120 + 39.25 = 159.25 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 232\" width=\"100%\" style=\"max-width:372px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M58 62 L282 62 A56.0 56.0 0 0 1 282 174 L58 174 Z\" stroke-width=\"1.8\"/><path d=\"M282 62 L282 174\" stroke-dasharray=\"5 4\" stroke-width=\"1.2\"/><text x=\"170.0\" y=\"198.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">12 cm</text><text x=\"46.0\" y=\"118.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">10 cm</text><text x=\"48.0\" y=\"54.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">A</text><text x=\"282.0\" y=\"50.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">B</text><text x=\"282.0\" y=\"196.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">C</text><text x=\"48.0\" y=\"196.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">D</text></svg>",
          "alt": "A plane figure made up of a rectangle ABCD with a semicircle on one end. A is the top left corner, B the top right, C the bottom right and D the bottom left. The rectangle is 12 cm long, marked along the bottom edge DC, and 10 cm wide, marked at the left-hand end AD. The end BC, shown as a broken line, is the diameter of a semicircle that bulges outwards to the right of the rectangle. The diagram is not drawn to scale."
        },
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the area of the rectangle",
            "check": {
              "type": "contains",
              "value": [
                120.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the area of the semicircle as (1/2) x pi x r^2",
            "check": {
              "type": "contains",
              "value": [
                39.25
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the total area of the figure",
            "check": {
              "type": "numeric",
              "value": 159.25,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      }
    ],
    "design": "Q4-EJ-A",
    "source": "SPARK Practice Paper I original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2i-q5",
    "question_number": 5,
    "paper": "SPARK Practice Paper I",
    "section": "I",
    "topic": "Statistics and probability",
    "marks": 9,
    "stem": "The table below shows the ages, in years, of 60 members of a community choir.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table below.",
        "marks": 3,
        "answer": "35.5, 45.5, 55.5; 710, 500.5, 333",
        "solution": "The mid-interval value is the mean of the class boundaries, and f x is the frequency times that value: (31 + 40)/2 = 35.5, 20 x 35.5 = 710; (41 + 50)/2 = 45.5, 11 x 45.5 = 500.5; (51 + 60)/2 = 55.5, 6 x 55.5 = 333.",
        "responseType": "table",
        "table": {
          "caption": "The mid-interval value of a class is the mean of its two boundaries.",
          "headers": [
            "Age (years)",
            "Frequency",
            "Mid-interval value",
            "f x"
          ],
          "rows": [
            [
              "11 - 20",
              "8",
              "15.5",
              "124"
            ],
            [
              "21 - 30",
              "15",
              "25.5",
              "382.5"
            ],
            [
              "31 - 40",
              "20",
              {
                "blank": true,
                "key": "m2"
              },
              {
                "blank": true,
                "key": "p2"
              }
            ],
            [
              "41 - 50",
              "11",
              {
                "blank": true,
                "key": "m3"
              },
              {
                "blank": true,
                "key": "p3"
              }
            ],
            [
              "51 - 60",
              "6",
              {
                "blank": true,
                "key": "m4"
              },
              {
                "blank": true,
                "key": "p4"
              }
            ]
          ],
          "marks": 3,
          "cells": {
            "m2": {
              "type": "numeric",
              "value": 35.5,
              "marks": 1,
              "description": "mid-interval value of 31 - 40"
            },
            "m3": {
              "type": "numeric",
              "value": 45.5,
              "marks": 0,
              "description": "mid-interval value of 41 - 50"
            },
            "m4": {
              "type": "numeric",
              "value": 55.5,
              "marks": 0,
              "description": "mid-interval value of 51 - 60"
            },
            "p2": {
              "type": "numeric",
              "value": 710.0,
              "marks": 0,
              "description": "f x for 31 - 40"
            },
            "p3": {
              "type": "numeric",
              "value": 500.5,
              "marks": 1,
              "description": "f x for 41 - 50"
            },
            "p4": {
              "type": "numeric",
              "value": 333.0,
              "marks": 1,
              "description": "f x for 51 - 60"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The mid-interval value of a class is the mean of its two boundaries.",
          "headers": [
            "Age (years)",
            "Frequency",
            "Mid-interval value",
            "f x"
          ],
          "rows": [
            [
              "11 - 20",
              "8",
              "15.5",
              "124"
            ],
            [
              "21 - 30",
              "15",
              "25.5",
              "382.5"
            ],
            [
              "31 - 40",
              "20",
              {
                "key": "m2",
                "answer": "35.5",
                "answerType": "numeric",
                "marks": 1,
                "description": "mid-interval value of 31 - 40"
              },
              {
                "key": "p2",
                "answer": "710.0",
                "answerType": "numeric",
                "marks": 0,
                "description": "f x for 31 - 40"
              }
            ],
            [
              "41 - 50",
              "11",
              {
                "key": "m3",
                "answer": "45.5",
                "answerType": "numeric",
                "marks": 0,
                "description": "mid-interval value of 41 - 50"
              },
              {
                "key": "p3",
                "answer": "500.5",
                "answerType": "numeric",
                "marks": 1,
                "description": "f x for 41 - 50"
              }
            ],
            [
              "51 - 60",
              "6",
              {
                "key": "m4",
                "answer": "55.5",
                "answerType": "numeric",
                "marks": 0,
                "description": "mid-interval value of 51 - 60"
              },
              {
                "key": "p4",
                "answer": "333.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "f x for 51 - 60"
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the modal class.",
        "marks": 1,
        "answer": "31 - 40",
        "solution": "The class 31 - 40 has the highest frequency, 20.",
        "answerType": "text",
        "accepted": [
          "31-40"
        ],
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the modal class",
            "check": {
              "type": "set",
              "value": [
                31.0,
                40.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate an ESTIMATE of the mean, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "34.2",
        "solution": "Use the mid-interval values 15.5, 25.5, 35.5, 45.5, 55.5. The sum of f x is 124 + 382.5 + 710 + 500.5 + 333 = 2050. The estimated mean is 2050/60 = 34.2.",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the mid-interval values",
            "check": {
              "type": "contains",
              "value": [
                55.5
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the sum of f x",
            "check": {
              "type": "contains",
              "value": [
                2050.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the estimated mean",
            "check": {
              "type": "numeric",
              "value": 34.166666666666664,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 60 values is chosen at random. Determine the probability that it is AT LEAST 41. Give your answer as a fraction in its lowest terms.",
        "marks": 2,
        "answer": "17/60",
        "solution": "17 of the 60 values are at least 41, so the probability is 17/60 = 17/60.",
        "requiredForm": "simplified_fraction",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds how many are at least 41",
            "check": {
              "type": "contains",
              "value": [
                17.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the probability in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 0.2833333333333333,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q5-EJ-A",
    "source": "SPARK Practice Paper I original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2i-q6",
    "question_number": 6,
    "paper": "SPARK Practice Paper I",
    "section": "I",
    "topic": "Geometry and trigonometry",
    "marks": 9,
    "stem": "The diagram below, not drawn to scale, shows a circle with centre O. The points A, B and C lie on the circumference, AB is a chord, and OA and OB are radii. Angle OAB = 15°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the value of y, the size of angle AOB.",
        "marks": 2,
        "answer": "150",
        "solution": "OA and OB are radii of the same circle, so OA = OB and triangle OAB is isosceles. Hence angle OBA = angle OAB = 15°. The angles of a triangle add up to 180°, so y = 180 - 15 - 15 = 150°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses OA = OB, so angle OBA = angle OAB",
            "check": {
              "type": "method",
              "any": [
                "isosceles",
                "radii",
                "radius"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the size of angle AOB",
            "check": {
              "type": "numeric",
              "value": 150.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the value of x, the size of angle ACB.",
        "marks": 2,
        "answer": "75",
        "solution": "Angle AOB at the centre and angle ACB at the circumference both stand on the same arc AB. The angle at the centre is twice the angle at the circumference, so x = 150° / 2 = 75°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the angle at the centre is twice the angle at the circumference",
            "check": {
              "type": "method",
              "any": [
                "twice the angle at the circumference",
                "angle at the centre"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the size of angle ACB",
            "check": {
              "type": "numeric",
              "value": 75.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "a / 2"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Give a reason for your answer in (b), naming the circle theorem that you used.",
        "marks": 2,
        "answer": "The angle at the centre is twice the angle at the circumference when both angles stand on the same arc AB, so angle ACB is half of angle AOB, giving x = 75 degrees.",
        "solution": "Angle AOB and angle ACB both stand on the arc AB, one at the centre and one at the circumference. The theorem the angle at the centre is twice the angle at the circumference standing on the same arc gives angle ACB = 150° / 2 = 75°. Naming the theorem earns 1 mark and saying that the two angles stand on the same arc AB earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "theorem",
            "marks": 1,
            "description": "names the theorem: the angle at the centre is twice the angle at the circumference",
            "any": [
              "angle at the centre is twice the angle at the circumference",
              "twice the angle at the circumference",
              "centre is twice"
            ]
          },
          {
            "id": "arc",
            "marks": 1,
            "description": "states that the two angles stand on the same arc",
            "any": [
              "same arc",
              "same segment",
              "arc ab"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "names the theorem: the angle at the centre is twice the angle at the circumference",
            "check": {
              "type": "written",
              "id": "theorem",
              "description": "names the theorem: the angle at the centre is twice the angle at the circumference",
              "any": [
                "angle at the centre is twice the angle at the circumference",
                "twice the angle at the circumference",
                "centre is twice"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states that the two angles stand on the same arc",
            "check": {
              "type": "written",
              "id": "arc",
              "description": "states that the two angles stand on the same arc",
              "any": [
                "same arc",
                "same segment",
                "arc ab"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "[In this question, take π = 22/7.] The radius OA is 42 cm. Calculate the area of the minor sector OAB.",
        "marks": 3,
        "answer": "2310",
        "solution": "The angle of the sector at the centre is 150°, so the sector is 150/360 = 5/12 of the circle. Area of sector = (150/360) x π x r^2 = (5/12) x (22/7) x 42^2 = (5/12) x (22/7) x 1764 = 2310 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses area of a sector = (angle/360) x pi x r^2",
            "check": {
              "type": "method",
              "any": [
                "/360",
                "sector"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes r = 42 and pi = 22/7",
            "check": {
              "type": "contains",
              "value": [
                1764.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the area of the sector",
            "check": {
              "type": "numeric",
              "value": 2310.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "a * 15.4"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 310 300\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"152\" cy=\"152\" r=\"107\"/><path d=\"M152 44 L74 226 M152 44 L230 226\"/><path d=\"M152 152 L74 226 M152 152 L230 226 M74 226 L230 226\"/><path d=\"M138.6 75.3 A34 34 0 0 0 165.4 75.3\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"152.0\" y=\"62.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">x&#176;</text><path d=\"M125.9 176.8 A36 36 0 0 0 178.1 176.8\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"152.0\" y=\"171.8\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">y&#176;</text><circle cx=\"152\" cy=\"152\" r=\"2.8\" fill=\"currentColor\"/><text x=\"152.0\" y=\"28.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">C</text><text x=\"56.0\" y=\"236.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"248.0\" y=\"236.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"168.0\" y=\"148.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text></svg>",
      "alt": "A circle with centre O. The points A and B lie on the circumference with the chord AB drawn and the radii OA and OB drawn, and C lies on the major arc with CA and CB drawn. Angle ACB at the circumference is marked x and angle AOB at the centre is marked y. Angle OAB is 15 degrees. The diagram is not drawn to scale."
    },
    "design": "Q6-EJ-A",
    "source": "SPARK Practice Paper I original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2i-q7",
    "question_number": 7,
    "paper": "SPARK Practice Paper I",
    "section": "I",
    "topic": "Sequences, patterns and investigation",
    "marks": 10,
    "stem": "The diagrams below show the first three figures in a sequence of rectangular patterns made from dots. Figure 1 has 1 row of 3 dots, Figure 2 has 2 rows of 5 dots, and Figure 3 has 3 rows of 7 dots. Study the patterns of dots and answer the questions that follow.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Complete the table below, giving the number of dots in Figure 4, in Figure 5, in Figure 10 and in Figure n.",
        "marks": 4,
        "answer": "36, 55, 210, 2n^2 + n",
        "solution": "The number of dots in Figure n is 2n^2 + n. Figure 4 has 36 dots and Figure 5 has 55 dots, each found by continuing the pattern or by using the rule. Figure 10 has 210 dots. In Figure n there are 2n^2 + n dots, which checks against the table: for n = 3 it gives 21.",
        "responseType": "table",
        "table": {
          "caption": "The number of dots in each figure.",
          "headers": [
            "Figure",
            "Number of dots"
          ],
          "rows": [
            [
              "1",
              "3"
            ],
            [
              "2",
              "10"
            ],
            [
              "3",
              "21"
            ],
            [
              "4",
              {
                "blank": true,
                "key": "d4"
              }
            ],
            [
              "5",
              {
                "blank": true,
                "key": "d5"
              }
            ],
            [
              "10",
              {
                "blank": true,
                "key": "d10"
              }
            ],
            [
              "n",
              {
                "blank": true,
                "key": "dn",
                "numeric": false
              }
            ]
          ],
          "marks": 4,
          "cells": {
            "d4": {
              "type": "numeric",
              "value": 36.0,
              "marks": 1,
              "description": "the number of dots in Figure 4"
            },
            "d5": {
              "type": "numeric",
              "value": 55.0,
              "marks": 1,
              "description": "the number of dots in Figure 5"
            },
            "d10": {
              "type": "numeric",
              "value": 210.0,
              "marks": 1,
              "description": "the number of dots in Figure 10"
            },
            "dn": {
              "type": "expression",
              "value": "2n^2 + n",
              "marks": 1,
              "description": "the number of dots in Figure n",
              "accepted": [
                "n(2n + 1)",
                "(2n + 1)n"
              ]
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The number of dots in each figure.",
          "headers": [
            "Figure",
            "Number of dots"
          ],
          "rows": [
            [
              "1",
              "3"
            ],
            [
              "2",
              "10"
            ],
            [
              "3",
              "21"
            ],
            [
              "4",
              {
                "key": "d4",
                "answer": "36.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "the number of dots in Figure 4"
              }
            ],
            [
              "5",
              {
                "key": "d5",
                "answer": "55.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "the number of dots in Figure 5"
              }
            ],
            [
              "10",
              {
                "key": "d10",
                "answer": "210.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "the number of dots in Figure 10"
              }
            ],
            [
              "n",
              {
                "key": "dn",
                "answer": "2n^2 + n",
                "answerType": "expression",
                "marks": 1,
                "description": "the number of dots in Figure n",
                "accepted": [
                  "n(2n + 1)",
                  "(2n + 1)n"
                ]
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the number of dots in Figure 20.",
        "marks": 2,
        "answer": "820",
        "solution": "Using the rule 2n^2 + n from (a) with n = 20: 2 x 400 + 20 = 800 + 20 = 820. So Figure 20 has 820 dots.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes n = 20 into the rule for Figure n",
            "check": {
              "type": "contains",
              "value": [
                800.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number of dots in Figure 20",
            "check": {
              "type": "numeric",
              "value": 820.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the number of the figure that has 465 dots. Show clearly the equation you use and how you solve it.",
        "marks": 4,
        "answer": "15",
        "solution": "Set the rule equal to 465: 2n^2 + n = 465. Taking everything to one side gives 2n^2 + n - 465 = 0. Factorising, (2n + 31)(n - 15) = 0, so n = -31/2 or n = 15. A figure number must be a positive whole number, so the figure is Figure 15. Check: 2 x 15^2 + 15 = 450 + 15 = 465.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the equation 2n^2 + n = 465",
            "check": {
              "type": "contains",
              "value": [
                465.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "writes it as a quadratic equation equal to zero",
            "check": {
              "type": "method",
              "any": [
                "2n^2 + n - 465 = 0"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "solves the quadratic equation",
            "check": {
              "type": "method",
              "any": [
                "(2n + 31)(n - 15)",
                "factoris",
                "quadratic formula"
              ]
            },
            "field": "all",
            "code": "M3"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the figure number, rejecting the negative root",
            "check": {
              "type": "numeric",
              "value": 15.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M3"
            ]
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 430 106\" width=\"100%\" style=\"max-width:430px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"49.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"67.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"85.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"67.0\" y=\"90.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 1</text><circle cx=\"143.0\" cy=\"30.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"161.0\" cy=\"30.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"179.0\" cy=\"30.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"197.0\" cy=\"30.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"215.0\" cy=\"30.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"143.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"161.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"179.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"197.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"215.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"179.0\" y=\"90.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 2</text><circle cx=\"273.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"291.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"309.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"327.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"345.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"363.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"381.0\" cy=\"21.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"273.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"291.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"309.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"327.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"345.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"363.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"381.0\" cy=\"39.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"273.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"291.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"309.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"327.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"345.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"363.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"381.0\" cy=\"57.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"327.0\" y=\"90.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 3</text></svg>",
      "alt": "Three rectangular arrays of dots. Figure 1 is one row of 3 dots. Figure 2 is two rows of 5 dots, making 10 dots. Figure 3 is three rows of 7 dots, making 21 dots. In every figure the number of dots in a row is one more than twice the number of rows."
    },
    "design": "Q7-EJ-A",
    "source": "SPARK Practice Paper I original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2i-q8",
    "question_number": 8,
    "paper": "SPARK Practice Paper I",
    "section": "II",
    "topic": "Relations, functions and graphs",
    "marks": 12,
    "stem": "The table below shows some values of x and the corresponding values of y for the function y = x^2 - 6x + 5.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table of values.",
        "marks": 2,
        "answer": "-3, -3",
        "solution": "when x = 2, y = (2)^2 - 6(2) + 5 = -3; when x = 4, y = (4)^2 - 6(4) + 5 = -3.",
        "responseType": "table",
        "table": {
          "caption": "y = x^2 - 6x + 5 for 0 ≤ x ≤ 6.",
          "headers": [
            "x",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
          ],
          "rows": [
            [
              "y",
              "5",
              "0",
              {
                "blank": true,
                "key": "y2"
              },
              "-4",
              {
                "blank": true,
                "key": "y4"
              },
              "0",
              "5"
            ]
          ],
          "marks": 2,
          "cells": {
            "y2": {
              "type": "numeric",
              "value": -3,
              "marks": 1,
              "description": "y when x = 2"
            },
            "y4": {
              "type": "numeric",
              "value": -3,
              "marks": 1,
              "description": "y when x = 4"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "y = x^2 - 6x + 5 for 0 ≤ x ≤ 6.",
          "headers": [
            "x",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
          ],
          "rows": [
            [
              "y",
              "5",
              "0",
              {
                "key": "y2",
                "answer": "-3",
                "answerType": "numeric",
                "marks": 1,
                "description": "y when x = 2"
              },
              "-4",
              {
                "key": "y4",
                "answer": "-3",
                "answerType": "numeric",
                "marks": 1,
                "description": "y when x = 4"
              },
              "0",
              "5"
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Using a scale of 2 cm to represent 1 unit on the x axis and 1 cm to represent 1 unit on the y axis, draw the graph of y = x^2 - 6x + 5 for 0 ≤ x ≤ 6.",
        "marks": 4,
        "answer": "the points (0, 5) to (6, 5) joined by a smooth curve",
        "solution": "Plot the seven points from the table and join them with a single smooth curve. Do not join them with straight lines.",
        "responseType": "graph",
        "grid": {
          "xMin": 0,
          "xMax": 6,
          "yMin": -5,
          "yMax": 6,
          "xStep": 1,
          "yStep": 1,
          "minorPerStep": 2,
          "xLabel": "x",
          "yLabel": "y",
          "tools": [
            "point",
            "curve"
          ]
        },
        "graph": {
          "points": [
            {
              "x": 0,
              "y": 5
            },
            {
              "x": 1,
              "y": 0
            },
            {
              "x": 2,
              "y": -3
            },
            {
              "x": 3,
              "y": -4
            },
            {
              "x": 4,
              "y": -3
            },
            {
              "x": 5,
              "y": 0
            },
            {
              "x": 6,
              "y": 5
            }
          ],
          "tolerance": 0.3,
          "pointMarks": 2,
          "curve": {
            "expression": "x*x + (-6)*x + (5)",
            "from": 0,
            "to": 6,
            "tolerance": 0.5
          },
          "curveMarks": 2
        },
        "answerType": "text",
        "responseSchema": {
          "type": "graph",
          "graph": {
            "xMin": 0,
            "xMax": 6,
            "yMin": -5,
            "yMax": 6,
            "xStep": 1,
            "yStep": 1,
            "minorPerStep": 2,
            "snapX": 0.25,
            "snapY": 0.25,
            "xLabel": "x",
            "yLabel": "y",
            "tools": [
              "point",
              "curve"
            ],
            "mode": "curve"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  0,
                  5
                ],
                [
                  1,
                  0
                ],
                [
                  2,
                  -3
                ],
                [
                  3,
                  -4
                ],
                [
                  4,
                  -3
                ],
                [
                  5,
                  0
                ],
                [
                  6,
                  5
                ]
              ],
              "tolerance": [
                0.3,
                0.3
              ],
              "proportional": true,
              "label": "Accurate plotted points"
            },
            {
              "kind": "graph_curve",
              "marks": 2,
              "minimumPoints": 5,
              "referencePoints": [
                [
                  0,
                  5
                ],
                [
                  1,
                  0
                ],
                [
                  2,
                  -3
                ],
                [
                  3,
                  -4
                ],
                [
                  4,
                  -3
                ],
                [
                  5,
                  0
                ],
                [
                  6,
                  5
                ]
              ],
              "tolerance": [
                0.3,
                0.3
              ],
              "minimumMatches": 5,
              "increasing": false,
              "requireSmooth": true,
              "label": "Appropriate curve through the plotted data"
            }
          ]
        }
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Using your graph, state the coordinates of the MINIMUM point of the function.",
        "marks": 2,
        "answer": "(3, -4)",
        "solution": "The curve turns at its lowest point, where x = 3 and y = -4. The minimum point is (3, -4).",
        "tolerance": 0.3,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "identifies the turning point of the curve",
            "check": {
              "type": "contains",
              "value": [
                3.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the coordinates of the minimum",
            "check": {
              "type": "coordinate",
              "value": [
                3.0,
                -4.0
              ],
              "tolerance": 0.3
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ],
            "captureIndex": 0
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Using your graph, state the values of x for which x^2 - 6x + 5 = 0.",
        "marks": 2,
        "answer": "x = 1 and x = 5",
        "solution": "The curve crosses the x axis where y = 0, at x = 1 and x = 5.",
        "answerType": "ordered",
        "accepted": [
          "1, 5",
          "1 and 5"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "reads where the curve crosses the x axis",
            "check": {
              "type": "method",
              "any": [
                "x axis",
                "y = 0",
                "crosses"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "both values of x",
            "check": {
              "type": "set",
              "value": [
                1.0,
                5.0
              ],
              "tolerance": 0.3
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "e",
        "label": "(e)",
        "prompt": "Write down the equation of the axis of symmetry of the graph.",
        "marks": 2,
        "answer": "x = 3",
        "solution": "The axis of symmetry is the vertical line through the minimum point, so its equation is x = 3.",
        "answerType": "expression",
        "accepted": [
          "x=3"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "refers to the vertical line through the minimum",
            "check": {
              "type": "method",
              "any": [
                "axis of symmetry",
                "vertical",
                "minimum"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the equation of the axis of symmetry",
            "check": {
              "type": "equation",
              "value": "x = 3"
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "c"
              ],
              "formula": "c",
              "template": "x = {v}"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "section_heading": "ALGEBRA, RELATIONS, FUNCTIONS AND GRAPHS",
    "design": "Q8-EJ-A",
    "source": "SPARK Practice Paper I original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2i-q9",
    "question_number": 9,
    "paper": "SPARK Practice Paper I",
    "section": "II",
    "topic": "Geometry and trigonometry",
    "marks": 12,
    "stem": "A yacht leaves harbour P and sails 110 km on a bearing of 095° to a point Q. It then changes course and sails 75 km on a bearing of 150° to a point R. The diagram below, not drawn to scale, shows the route of the yacht.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Show that angle PQR = 125°, and hence calculate, correct to 1 decimal place, the length of PR.",
        "marks": 4,
        "answer": "164.9",
        "solution": "The bearing of P from Q is 95 + 180 = 275°, so angle PQR = 275 - 150 = 125°. By the cosine rule, PR^2 = PQ^2 + QR^2 - 2(PQ)(QR) cos PQR = 110^2 + 75^2 - 2(110)(75) cos 125° = 12100 + 5625 + 9464.0112 = 27189.0112. So PR = sqrt(27189.0112) = 164.8909 = 164.9 km, correct to 1 decimal place.",
        "suffix": " km",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds angle PQR = 125 degrees from the bearings",
            "check": {
              "type": "contains",
              "value": [
                125.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the cosine rule",
            "check": {
              "type": "method",
              "any": [
                "cosine rule",
                "cos"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes 110, 75 and 125 correctly",
            "check": {
              "type": "contains",
              "value": [
                110.0,
                75.0,
                125.0
              ]
            },
            "field": "all",
            "code": "M3"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "PR = 164.9 km",
            "check": {
              "type": "numeric",
              "value": 164.8909069651576,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M3"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Hence, calculate the size of angle QPR, correct to 1 decimal place.",
        "marks": 3,
        "answer": "21.9",
        "solution": "By the sine rule, sin(angle QPR)/QR = sin(angle PQR)/PR, that is sin(angle QPR)/75 = sin 125°/164.8909. So sin(angle QPR) = 75 x sin 125° / 164.8909 = 0.372588, giving angle QPR = 21.88 = 21.9°. Angle PQR is obtuse, so angle QPR must be acute and this is the required value.",
        "suffix": "°",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses the sine rule",
            "check": {
              "type": "method",
              "any": [
                "sine rule",
                "sin"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes 75, 125 and PR correctly",
            "check": {
              "type": "contains",
              "value": [
                75.0,
                125.0,
                164.8909
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "angle QPR = 21.9 degrees",
            "check": {
              "type": "numeric",
              "value": 21.875326010246027,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "asin(75*sin(125)/a)"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Hence, or otherwise, determine the bearing of R from P, giving your answer as a three-figure bearing correct to the nearest degree.",
        "marks": 3,
        "answer": "117",
        "solution": "The bearing of Q from P is 095°, and R lies clockwise of Q when viewed from P, so the bearing of R from P is the bearing of Q from P plus angle QPR. That is 95 + 21.9 = 116.9°, which is 117° as a three-figure bearing correct to the nearest degree.",
        "suffix": "°",
        "tolerance": 0.51,
        "accepted": [
          "117°",
          "117 degrees"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "bearing of R from P = bearing of Q from P + angle QPR",
            "check": {
              "type": "method",
              "any": [
                "bearing of q from p"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "adds angle QPR to 095 degrees",
            "check": {
              "type": "contains",
              "value": [
                95.0,
                21.9
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "117 degrees",
            "check": {
              "type": "numeric",
              "value": 116.87532601024603,
              "dp": 0,
              "tolerance": 0.51
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b"
              ],
              "formula": "95 + b"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate, correct to 1 decimal place, the area of triangle PQR.",
        "marks": 2,
        "answer": "3379.0",
        "solution": "Area = (1/2)(PQ)(QR) sin PQR = (1/2) x 110 x 75 x sin 125° = 4125 x sin 125° = 3379.0022 = 3379.0 km^2, correct to 1 decimal place.",
        "suffix": " km^2",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses (1/2)ab sin C with 110, 75 and 125",
            "check": {
              "type": "contains",
              "value": [
                110.0,
                75.0,
                125.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "area = 3379.0 km^2",
            "check": {
              "type": "numeric",
              "value": 3379.0021826920906,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "section_heading": "GEOMETRY AND TRIGONOMETRY",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 390\" width=\"100%\" style=\"max-width:360px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M76.8 170.6 L76.8 106.9\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M76.8 100.6 L81.1 107.6 L72.4 107.6 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"76.8\" y=\"90.6\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">N</text><path d=\"M76.8 170.6 L245.5 185.4\" stroke-width=\"2\"/><path d=\"M76.8 134.6 A36 36 0 0 1 112.6 173.8\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"91.4\" y=\"157.2\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">095&#176;</text><text x=\"158.9\" y=\"203.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">110 km</text><path d=\"M245.5 185.4 L245.5 121.7\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M245.5 115.4 L249.8 122.4 L241.2 122.4 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"245.5\" y=\"105.4\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">N</text><path d=\"M245.5 185.4 L303.2 285.4\" stroke-width=\"2\"/><path d=\"M245.5 149.4 A36 36 0 0 1 263.5 216.6\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"264.6\" y=\"180.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">150&#176;</text><text x=\"251.8\" y=\"248.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">75 km</text><circle cx=\"76.8\" cy=\"170.6\" r=\"3.2\" fill=\"currentColor\"/><text x=\"60.8\" y=\"180.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">P</text><circle cx=\"245.5\" cy=\"185.4\" r=\"3.2\" fill=\"currentColor\"/><text x=\"229.5\" y=\"195.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">Q</text><circle cx=\"303.2\" cy=\"285.4\" r=\"3.2\" fill=\"currentColor\"/><text x=\"287.2\" y=\"295.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">R</text></svg>",
      "alt": "A bearing diagram, not drawn to scale. From the point P a north line is drawn and the angle from it to the line PQ is marked 095 degrees; PQ is marked 110 km. From Q a second north line is drawn and the angle from it to the line QR is marked 150 degrees; QR is marked 75 km. The points P, Q and R are shown as solid dots."
    },
    "design": "Q9-EJ-A",
    "source": "SPARK Practice Paper I original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2i-q10",
    "question_number": 10,
    "paper": "SPARK Practice Paper I",
    "section": "II",
    "topic": "Vectors and matrices",
    "marks": 12,
    "stem": "The matrix M is given by M = [[4, 5], [1, 2]].",
    "parts": [
      {
        "id": "k",
        "label": "(a) (i)",
        "prompt": "Calculate the determinant of M.",
        "marks": 2,
        "answer": "3",
        "solution": "det M = (4)(2) - (5)(1) = 8 - 5 = 3.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses det M = ad - bc",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    8.0,
                    5.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    8.0,
                    -5.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    3.0
                  ]
                },
                {
                  "type": "method",
                  "any": [
                    "(4)(2) - (5)(1)",
                    "4(2) - 5(1)",
                    "4 x 2 - 5 x 1",
                    "4*2 - 5*1",
                    "ad - bc",
                    "ad-bc"
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the determinant",
            "check": {
              "type": "numeric",
              "value": 3.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Hence, write down M^-1, the inverse of M.",
        "marks": 3,
        "answer": "(1/3)[[2, -5], [-1, 4]]",
        "solution": "For M = [[a, b], [c, d]], M^-1 = (1/det M)[[d, -b], [-c, a]]. Interchange the entries on the leading diagonal, change the sign of the other two, and divide by the determinant: M^-1 = (1/3)[[2, -5], [-1, 4]] = [[2/3, -5/3], [-1/3, 4/3]].",
        "answerType": "expression",
        "accepted": [
          "[[2/3, -5/3], [-1/3, 4/3]]",
          "1/3[[2, -5], [-1, 4]]"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "interchanges the leading diagonal entries and changes the sign of the other two",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    2.0,
                    -5.0,
                    -1.0,
                    4.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    0.6666666666666666,
                    -1.6666666666666667,
                    -0.3333333333333333,
                    1.3333333333333333
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "divides by the determinant",
            "check": {
              "type": "contains",
              "value": [
                0.3333333333333333,
                -0.3333333333333333
              ],
              "needAll": false,
              "tolerance": 0.005
            },
            "field": "all",
            "ecf": {
              "uses": [
                "k"
              ],
              "formula": "1/k"
            },
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the inverse matrix",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "matrix",
                  "value": [
                    [
                      0.6666666666666666,
                      -1.6666666666666667
                    ],
                    [
                      -0.3333333333333333,
                      1.3333333333333333
                    ]
                  ],
                  "tolerance": 0.005
                },
                {
                  "type": "contains",
                  "value": [
                    0.3333333333333333,
                    2.0,
                    -5.0,
                    -1.0,
                    4.0
                  ]
                }
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write the pair of simultaneous equations 4x + 5y = 33 and x + 2y = 12 as a matrix equation in the form M X = C.",
        "marks": 3,
        "answer": "[[4, 5], [1, 2]] [[x], [y]] = [[33], [12]]",
        "solution": "The coefficients of x and y form the matrix M = [[4, 5], [1, 2]], the unknowns form the column matrix X = [[x], [y]], and the constants form the column matrix C = [[33], [12]]. The pair of equations is therefore [[4, 5], [1, 2]] [[x], [y]] = [[33], [12]].",
        "answerType": "expression",
        "accepted": [
          "[[4, 5], [1, 2]][[x], [y]] = [[33], [12]]"
        ],
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the matrix of coefficients",
            "check": {
              "type": "contains",
              "value": [
                4.0,
                5.0,
                1.0,
                2.0
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "the column matrix of unknowns",
            "check": {
              "type": "method",
              "any": [
                "[[x], [y]]",
                "[[x],[y]]",
                "(x, y)"
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B2"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "the column matrix of constants",
            "check": {
              "type": "contains",
              "value": [
                33.0,
                12.0
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B3"
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Hence, or otherwise, use M^-1 to solve the pair of simultaneous equations in part (b).",
        "marks": 4,
        "answer": "x = 2, y = 5",
        "solution": "Multiplying both sides of M X = C on the left by M^-1 gives X = M^-1 C = (1/3)[[2, -5], [-1, 4]] [[33], [12]] = (1/3)[[(2)(33) + (-5)(12)], [(-1)(33) + (4)(12)]] = (1/3)[[6], [15]] = [[2], [5]]. So x = 2 and y = 5. Check: 4(2) + 5(5) = 33.",
        "answerType": "ordered",
        "accepted": [
          "(2, 5)",
          "2, 5"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies both sides by the inverse matrix",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "method",
                  "any": [
                    "M^-1 C",
                    "M^-1",
                    "inverse"
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    2.0,
                    5.0
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies the inverse by the column of constants",
            "check": {
              "type": "contains",
              "value": [
                6.0,
                15.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of x",
            "check": {
              "type": "contains",
              "value": [
                2.0
              ]
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "k"
              ],
              "formula": "(6)/k"
            },
            "depends": [
              "M1"
            ],
            "code": "A1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of y",
            "check": {
              "type": "contains",
              "value": [
                5.0
              ]
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "k"
              ],
              "formula": "(15)/k"
            },
            "depends": [
              "M1"
            ],
            "code": "A2"
          }
        ]
      }
    ],
    "section_heading": "VECTORS AND MATRICES",
    "design": "Q10-EJ-A",
    "source": "SPARK Practice Paper I original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2j-q1",
    "question_number": 1,
    "paper": "SPARK Practice Paper J",
    "section": "I",
    "topic": "Number theory and computation",
    "marks": 9,
    "stem": "The exchange rate between the United States dollar (US$) and the Guyana dollar (GY$) is US$1.00 = GY$209.00.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (2 7/8 - 9/10) ÷ (7/12 + 1/6), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "79/30",
        "solution": "2 7/8 = 23/8, so the numerator is 23/8 - 9/10 = 79/40. The denominator is 7/12 + 1/6 = 3/4. Dividing means multiplying by the reciprocal: 79/40 x 4/3 = 79/30.",
        "cao": true,
        "requiredForm": "simplified_fraction",
        "accepted": [
          "2 19/30"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the numerator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                1.975
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the denominator as a single fraction",
            "check": {
              "type": "contains",
              "value": [
                0.75
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the exact value in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 2.6333333333333333,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Mr Grant changes US$300 into GY dollars. Calculate the amount, in GY dollars, that he receives before any charge is made.",
        "marks": 2,
        "answer": "62700.00",
        "solution": "300 x 209.00 = GY$62,700.00.",
        "prefix": "GY$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "multiplies by the exchange rate",
            "check": {
              "type": "method",
              "any": [
                "x 209.00",
                "exchange rate",
                "300"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the amount in GY dollars",
            "check": {
              "type": "numeric",
              "value": 62700.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "The bank charges a fee of GY$500 on the transaction. Calculate the amount Mr Grant actually receives.",
        "marks": 2,
        "answer": "62200.00",
        "solution": "GY$62,700.00 - GY$500 = GY$62,200.00.",
        "prefix": "GY$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "subtracts the fee from the amount converted",
            "check": {
              "type": "contains",
              "value": [
                500.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the amount received",
            "check": {
              "type": "numeric",
              "value": 62200.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "b1"
              ],
              "formula": "b1 - 500.0"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Mr Grant invests GY$96,000 in an account paying SIMPLE INTEREST at 8% per annum. Calculate the TOTAL amount in the account at the end of 2 years.",
        "marks": 2,
        "answer": "111360.00",
        "solution": "I = PRT/100 = (96,000 x 8 x 2)/100 = GY$15,360.00. The total amount is 96,000 + 15,360.00 = GY$111,360.00.",
        "prefix": "GY$",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses I = PRT/100",
            "check": {
              "type": "contains",
              "value": [
                15360.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the total amount",
            "check": {
              "type": "numeric",
              "value": 111360.0,
              "dp": 2,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q1-EJ-B",
    "source": "SPARK Practice Paper J original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2j-q2",
    "question_number": 2,
    "paper": "SPARK Practice Paper J",
    "section": "I",
    "topic": "Algebra",
    "marks": 9,
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Simplify, giving your answer in its lowest terms, (x^2 - 5x - 24)/(x^2 - 64).",
        "marks": 3,
        "answer": "(x + 3)/(x + 8)",
        "solution": "Factorising the numerator: x^2 - 5x - 24 = (x - 8)(x + 3). Factorising the denominator: x^2 - 64 = (x - 8)(x + 8). The common factor (x - 8) cancels, leaving (x + 3)/(x + 8).",
        "answerType": "expression",
        "accepted": [
          "(x+3)/(x+8)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "factorises the numerator",
            "check": {
              "type": "method",
              "any": [
                "(x - 8)(x + 3)"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "factorises the denominator",
            "check": {
              "type": "method",
              "any": [
                "(x - 8)(x + 8)"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "cancels the common factor and gives the fraction in its lowest terms",
            "check": {
              "type": "expression",
              "value": "(x + 3)/(x + 8)",
              "accepted": [
                "(x+3)/(x+8)"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Solve the pair of simultaneous equations: 3x - 4y = 11 and 5x + 2y = 27.",
        "marks": 4,
        "answer": "x = 5, y = 1",
        "solution": "Multiplying the second equation by 2: 10x + 4y = 54. Adding 3x - 4y = 11 and 10x + 4y = 54 eliminates y: 13x = 65, so x = 5. Substituting x = 5 into 3x - 4y = 11 gives 15 - 4y = 11, so -4y = -4 and y = 1.",
        "accepted": [
          "(5, 1)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "eliminates one of the variables",
            "check": {
              "type": "method",
              "any": [
                "eliminates y",
                "eliminates x"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of x",
            "check": {
              "type": "equation",
              "value": "x = 5"
            },
            "field": "all",
            "code": "A1",
            "depends": [
              "M1"
            ]
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes back to find the second variable",
            "check": {
              "type": "contains",
              "value": [
                15.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of y",
            "check": {
              "type": "equation",
              "value": "y = 1"
            },
            "field": "all",
            "code": "A2",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Make s the subject of the formula v^2 = u^2 + 2as.",
        "marks": 2,
        "answer": "s = (v^2 - u^2)/(2a)",
        "solution": "Subtracting u^2 from both sides: v^2 - u^2 = 2as. Dividing both sides by 2a: s = (v^2 - u^2)/(2a).",
        "answerType": "expression",
        "accepted": [
          "(v^2 - u^2)/(2a)",
          "s = (v^2 - u^2)/2a"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "carries out a correct first step in the rearrangement",
            "check": {
              "type": "method",
              "any": [
                "v^2 - u^2 = 2as"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "s as the subject",
            "check": {
              "type": "equation",
              "value": "s = (v^2 - u^2)/(2a)"
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q2-EJ-B",
    "source": "SPARK Practice Paper J original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2j-q3",
    "question_number": 3,
    "paper": "SPARK Practice Paper J",
    "section": "I",
    "topic": "Sets",
    "marks": 9,
    "stem": "In a survey of 60 students, 35 study French, 28 study Spanish and 12 study NEITHER of these two subjects. The Venn diagram below shows this information, where x represents the number of students who study BOTH French and Spanish.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Using the information in the Venn diagram, form an equation in x and solve it to calculate the number of students who study BOTH French and Spanish.",
        "marks": 3,
        "answer": "15",
        "solution": "Every one of the 60 students is counted exactly once in the Venn diagram, so (35 - x) + x + (28 - x) + 12 = 60. This simplifies to 75 - x = 60, so x = 75 - 60 = 15. So 15 students study both French and Spanish.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "forms an equation in x from the four regions of the Venn diagram",
            "check": {
              "type": "method",
              "any": [
                "35 - x",
                "35 + 28 - x",
                "75 - x"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "simplifies the equation",
            "check": {
              "type": "contains",
              "value": [
                75.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number who study both French and Spanish",
            "check": {
              "type": "numeric",
              "value": 15.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "depends": [],
            "code": "A1"
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the number of students who study EXACTLY ONE of the two subjects.",
        "marks": 2,
        "answer": "33",
        "solution": "The number who study French only is 35 - 15 = 20, and the number who study Spanish only is 28 - 15 = 13. So the number who study exactly one of the two subjects is 20 + 13 = 33.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "subtracts the number who study both from each of 35 and 28",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "method",
                  "any": [
                    "35 - ",
                    "28 - "
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    20.0,
                    13.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    33.0
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number who study exactly one of the two subjects",
            "check": {
              "type": "numeric",
              "value": 33.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "63 - 2 * a"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "One of the 60 students is chosen at random. Calculate the probability that the student chosen studies NEITHER French NOR Spanish, giving your answer as a fraction in its lowest terms.",
        "marks": 2,
        "answer": "1/5",
        "solution": "12 of the 60 students study neither French nor Spanish, and each student is equally likely to be chosen. So P(neither) = 12/60 = 1/5.",
        "requiredForm": "simplified_fraction",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses P(neither) = (the number who study neither)/(the total number of students)",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    12.0,
                    60.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    0.2
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the probability in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 0.2,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Describe, in words, the set represented by the shaded region in the Venn diagram below.",
        "marks": 2,
        "answer": "The shaded region represents the students who study French or Spanish or both, that is, the students who study at least one of the two subjects.",
        "solution": "The shading covers the whole of both circles, which is the union of the two sets. It is the set of students who study French, or Spanish, or both subjects - that is, the students who study at least one of the two subjects. Naming the two subjects earns 1 mark and making it clear that the students who study both are included earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "either",
            "marks": 1,
            "description": "says that the students study French or Spanish",
            "any": [
              "french or spanish",
              "at least one"
            ]
          },
          {
            "id": "both",
            "marks": 1,
            "description": "makes it clear that the students who study both subjects are included",
            "any": [
              "or both",
              "at least one",
              "including those who study both"
            ]
          }
        ],
        "answerType": "text",
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 250\" width=\"100%\" style=\"max-width:400px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"6\" y=\"6\" width=\"368\" height=\"238\" rx=\"2\"/><path d=\"M185.0 194.1 L181.8 195.8 L178.6 197.2 L175.3 198.6 L171.9 199.8 L168.5 200.8 L165.1 201.8 L161.6 202.5 L158.1 203.1 L154.5 203.6 L151.0 203.8 L147.4 204.0 L143.8 204.0 L140.3 203.8 L136.7 203.5 L133.2 203.0 L129.7 202.4 L126.2 201.6 L122.8 200.6 L119.4 199.6 L116.0 198.3 L112.7 196.9 L109.5 195.4 L106.3 193.8 L103.2 192.0 L100.2 190.0 L97.3 188.0 L94.5 185.8 L91.8 183.5 L89.2 181.1 L86.6 178.6 L84.2 175.9 L81.9 173.2 L79.8 170.4 L77.7 167.4 L75.8 164.4 L74.0 161.3 L72.4 158.2 L70.9 154.9 L69.5 151.6 L68.3 148.3 L67.3 144.9 L66.3 141.4 L65.6 138.0 L64.9 134.4 L64.5 130.9 L64.2 127.3 L64.0 123.8 L64.0 120.2 L64.2 116.7 L64.5 113.1 L64.9 109.6 L65.6 106.0 L66.3 102.6 L67.3 99.1 L68.3 95.7 L69.5 92.4 L70.9 89.1 L72.4 85.8 L74.0 82.7 L75.8 79.6 L77.7 76.6 L79.8 73.6 L81.9 70.8 L84.2 68.1 L86.6 65.4 L89.2 62.9 L91.8 60.5 L94.5 58.2 L97.3 56.0 L100.2 54.0 L103.2 52.0 L106.3 50.2 L109.5 48.6 L112.7 47.1 L116.0 45.7 L119.4 44.4 L122.8 43.4 L126.2 42.4 L129.7 41.6 L133.2 41.0 L136.7 40.5 L140.3 40.2 L143.8 40.0 L147.4 40.0 L151.0 40.2 L154.5 40.4 L158.1 40.9 L161.6 41.5 L165.1 42.2 L168.5 43.2 L171.9 44.2 L175.3 45.4 L178.6 46.8 L181.8 48.2 L185.0 49.9 L185.0 49.9 L188.2 48.2 L191.4 46.8 L194.7 45.4 L198.1 44.2 L201.5 43.2 L204.9 42.2 L208.4 41.5 L211.9 40.9 L215.5 40.4 L219.0 40.2 L222.6 40.0 L226.2 40.0 L229.7 40.2 L233.3 40.5 L236.8 41.0 L240.3 41.6 L243.8 42.4 L247.2 43.4 L250.6 44.4 L254.0 45.7 L257.3 47.1 L260.5 48.6 L263.7 50.2 L266.8 52.0 L269.8 54.0 L272.7 56.0 L275.5 58.2 L278.2 60.5 L280.8 62.9 L283.4 65.4 L285.8 68.1 L288.1 70.8 L290.2 73.6 L292.3 76.6 L294.2 79.6 L296.0 82.7 L297.6 85.8 L299.1 89.1 L300.5 92.4 L301.7 95.7 L302.7 99.1 L303.7 102.6 L304.4 106.0 L305.1 109.6 L305.5 113.1 L305.8 116.7 L306.0 120.2 L306.0 123.8 L305.8 127.3 L305.5 130.9 L305.1 134.4 L304.4 138.0 L303.7 141.4 L302.7 144.9 L301.7 148.3 L300.5 151.6 L299.1 154.9 L297.6 158.2 L296.0 161.3 L294.2 164.4 L292.3 167.4 L290.2 170.4 L288.1 173.2 L285.8 175.9 L283.4 178.6 L280.8 181.1 L278.2 183.5 L275.5 185.8 L272.7 188.0 L269.8 190.0 L266.8 192.0 L263.7 193.8 L260.5 195.4 L257.3 196.9 L254.0 198.3 L250.6 199.6 L247.2 200.6 L243.8 201.6 L240.3 202.4 L236.8 203.0 L233.3 203.5 L229.7 203.8 L226.2 204.0 L222.6 204.0 L219.0 203.8 L215.5 203.6 L211.9 203.1 L208.4 202.5 L204.9 201.8 L201.5 200.8 L198.1 199.8 L194.7 198.6 L191.4 197.2 L188.2 195.8 L185.0 194.1 Z\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"none\"/><circle cx=\"146\" cy=\"122\" r=\"82\"/><circle cx=\"224\" cy=\"122\" r=\"82\"/><text x=\"20.0\" y=\"26.0\" text-anchor=\"start\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">U</text><text x=\"94.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">F</text><text x=\"276.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">S</text></svg>",
          "alt": "A Venn diagram inside a rectangle labelled U, with two overlapping circles labelled F for French and S for Spanish. Both circles are shaded completely, including the region where they overlap. No numbers are written in the regions."
        },
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "says that the students study French or Spanish",
            "check": {
              "type": "written",
              "id": "either",
              "description": "says that the students study French or Spanish",
              "any": [
                "french or spanish",
                "at least one"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "makes it clear that the students who study both subjects are included",
            "check": {
              "type": "written",
              "id": "both",
              "description": "makes it clear that the students who study both subjects are included",
              "any": [
                "or both",
                "at least one",
                "including those who study both"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 250\" width=\"100%\" style=\"max-width:400px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"6\" y=\"6\" width=\"368\" height=\"238\" rx=\"2\"/><circle cx=\"146\" cy=\"122\" r=\"82\"/><circle cx=\"224\" cy=\"122\" r=\"82\"/><text x=\"20.0\" y=\"26.0\" text-anchor=\"start\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">U</text><text x=\"94.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">F</text><text x=\"276.0\" y=\"32.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">S</text><text x=\"104.0\" y=\"122.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">35 - x</text><text x=\"185.0\" y=\"122.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">x</text><text x=\"266.0\" y=\"122.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">28 - x</text><text x=\"348.0\" y=\"228.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\">12</text></svg>",
      "alt": "A Venn diagram inside a rectangle labelled U, representing the 60 students surveyed. It contains two overlapping circles, F for French and S for Spanish. The part of F outside S is labelled 35 - x, the overlap of F and S is labelled x, the part of S outside F is labelled 28 - x, and 12 is written outside both circles."
    },
    "design": "Q3-EJ-B",
    "source": "SPARK Practice Paper J original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2j-q4",
    "question_number": 4,
    "paper": "SPARK Practice Paper J",
    "section": "I",
    "topic": "Measurement and construction",
    "marks": 9,
    "stem": "The line AB, 10 cm long, is already drawn on the construction pad.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Using only a ruler and a pair of compasses, construct the perpendicular bisector of AB, so that an angle of 90° is constructed at the midpoint M of AB. Your construction arcs must be clearly shown.",
        "marks": 3,
        "answer": "the perpendicular bisector of AB through M, with the construction arcs shown",
        "solution": "Open the compasses to more than half of AB, that is to more than 5 cm. With centre A draw arcs above and below AB; with the SAME radius and centre B draw two more to cut them. Rule the line through the two crossing points. It cuts AB at the midpoint M and makes an angle of 90° with AB. The arcs must be left on the page.",
        "responseType": "construction",
        "pad": {
          "width": 560,
          "height": 340,
          "unitsPerCm": 40,
          "given": [
            {
              "id": "A",
              "x": 1.5,
              "y": 2.0
            },
            {
              "id": "B",
              "x": 11.5,
              "y": 2.0
            }
          ],
          "givenSegments": [
            [
              "A",
              "B"
            ]
          ]
        },
        "construction": {
          "construction": "perpendicularBisector",
          "args": [
            {
              "id": "A",
              "x": 1.5,
              "y": 2.0
            },
            {
              "id": "B",
              "x": 11.5,
              "y": 2.0
            }
          ]
        },
        "answerType": "text",
        "responseSchema": {
          "type": "construction",
          "pad": {
            "width": 560,
            "height": 340,
            "unitsPerCm": 40,
            "given": [
              {
                "id": "A",
                "x": 1.5,
                "y": 2.0
              },
              {
                "id": "B",
                "x": 11.5,
                "y": 2.0
              }
            ],
            "givenSegments": [
              [
                "A",
                "B"
              ]
            ]
          },
          "construction": {
            "construction": "perpendicularBisector",
            "args": [
              {
                "id": "A",
                "x": 1.5,
                "y": 2.0
              },
              {
                "id": "B",
                "x": 11.5,
                "y": 2.0
              }
            ],
            "marks": 3
          },
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "allowProtractor": false
        }
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "The pad shows AB and the perpendicular MT that you constructed in (a) (i). Using only a ruler and a pair of compasses, bisect angle TMB. Your construction arcs must be clearly shown.",
        "marks": 1,
        "answer": "the bisector of angle TMB drawn from M, with the arc at M and the two equal arcs from where it cuts MT and MB shown",
        "solution": "With centre M draw an arc cutting MT and MB. From each of those two crossing points, with the same radius, draw an arc so that the two arcs cross. Rule the line from M through that crossing point. This mark is for the arcs: an angle measured with a protractor earns nothing here.",
        "responseType": "construction",
        "pad": {
          "width": 560,
          "height": 340,
          "unitsPerCm": 40,
          "given": [
            {
              "id": "A",
              "x": 1.5,
              "y": 2.0
            },
            {
              "id": "B",
              "x": 11.5,
              "y": 2.0
            },
            {
              "id": "M",
              "x": 6.5,
              "y": 2.0
            },
            {
              "id": "T",
              "x": 6.5,
              "y": 6.0
            }
          ],
          "givenSegments": [
            [
              "A",
              "B"
            ],
            [
              "M",
              "T"
            ]
          ]
        },
        "construction": {
          "construction": "angleBisector",
          "args": [
            {
              "id": "M",
              "x": 6.5,
              "y": 2.0
            },
            {
              "id": "T",
              "x": 6.5,
              "y": 6.0
            },
            {
              "id": "B",
              "x": 11.5,
              "y": 2.0
            }
          ]
        },
        "answerType": "text",
        "responseSchema": {
          "type": "construction",
          "pad": {
            "width": 560,
            "height": 340,
            "unitsPerCm": 40,
            "given": [
              {
                "id": "A",
                "x": 1.5,
                "y": 2.0
              },
              {
                "id": "B",
                "x": 11.5,
                "y": 2.0
              },
              {
                "id": "M",
                "x": 6.5,
                "y": 2.0
              },
              {
                "id": "T",
                "x": 6.5,
                "y": 6.0
              }
            ],
            "givenSegments": [
              [
                "A",
                "B"
              ],
              [
                "M",
                "T"
              ]
            ]
          },
          "construction": {
            "construction": "angleBisector",
            "args": [
              {
                "id": "M",
                "x": 6.5,
                "y": 2.0
              },
              {
                "id": "T",
                "x": 6.5,
                "y": 6.0
              },
              {
                "id": "B",
                "x": 11.5,
                "y": 2.0
              }
            ],
            "marks": 1
          },
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "allowProtractor": false
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the size of the angle that you constructed in (a) (ii), that is, the size of angle TMR where MR is your bisector.",
        "marks": 1,
        "answer": "45",
        "solution": "MT is perpendicular to AB, so angle TMB = 90°. The bisector halves it, so angle TMR = 90/2 = 45°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "the size of the constructed angle",
            "check": {
              "type": "numeric",
              "value": 45.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          }
        ]
      },
      {
        "id": "c1",
        "label": "(c) (i)",
        "prompt": "A water trough is a right prism 90 cm long. Its cross-section is a right-angled triangle with base 30 cm and perpendicular height 20 cm. Calculate the volume of the trough, in cm^3.",
        "marks": 2,
        "answer": "27000",
        "solution": "Area of the triangular cross-section = (1/2) x 30 x 20 = 300 cm^2. Volume of a prism = area of cross-section x length = 300 x 90 = 27000 cm^3.",
        "suffix": " cm^3",
        "tolerance": 0.011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 300\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M74 236 L218 236 L74 116 Z\"/><path d=\"M218 236 L296 192\"/><path d=\"M74 116 L152 72\"/><path d=\"M296 192 L152 72\"/><path d=\"M74 236 L152 192 L296 192 M152 192 L152 72\" stroke-dasharray=\"5 4\" stroke-width=\"1.2\"/><path d=\"M87.0 236.0 L87.0 223.0 L74.0 223.0\" stroke-width=\"1.2\"/><text x=\"146.0\" y=\"257.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">30 cm</text><text x=\"47.0\" y=\"176.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">20 cm</text><text x=\"283.0\" y=\"226.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">90 cm</text></svg>",
          "alt": "A right prism whose cross-section is a right-angled triangle, drawn in oblique projection with the hidden edges dashed. The base of the triangular face is marked 30 cm, its perpendicular height is marked 20 cm and the length of the prism is marked 90 cm. The diagram is not drawn to scale."
        },
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the area of the triangular cross-section",
            "check": {
              "type": "contains",
              "value": [
                300.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the volume of the trough",
            "check": {
              "type": "numeric",
              "value": 27000.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c2",
        "label": "(c) (ii)",
        "prompt": "Calculate the capacity of the trough, in litres. [1 litre = 1000 cm^3]",
        "marks": 2,
        "answer": "27",
        "solution": "27000 cm^3 = 27000/1000 litres = 27 litres.",
        "suffix": " litres",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "divides the volume in cm^3 by 1000",
            "check": {
              "type": "method",
              "any": [
                "1000"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the capacity in litres",
            "check": {
              "type": "numeric",
              "value": 27.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "c1"
              ],
              "formula": "c1 / 1000"
            },
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q4-EJ-B",
    "source": "SPARK Practice Paper J original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2j-q5",
    "question_number": 5,
    "paper": "SPARK Practice Paper J",
    "section": "I",
    "topic": "Statistics and probability",
    "marks": 9,
    "stem": "The table below shows the lengths, in centimetres, of fish caught by a fisherman.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table below to show the cumulative frequency for each class.",
        "marks": 2,
        "answer": "17, 33, 43, 50",
        "solution": "Add each frequency to the running total: 5 + 12 = 17, 17 + 16 = 33, 33 + 10 = 43, 43 + 7 = 50.",
        "responseType": "table",
        "table": {
          "caption": "The 50 values, grouped.",
          "headers": [
            "Length (cm)",
            "10 - 15",
            "15 - 20",
            "20 - 25",
            "25 - 30",
            "30 - 35"
          ],
          "rows": [
            [
              "Frequency",
              "5",
              "12",
              "16",
              "10",
              "7"
            ],
            [
              "Cumulative frequency",
              "5",
              {
                "blank": true,
                "key": "c1"
              },
              {
                "blank": true,
                "key": "c2"
              },
              {
                "blank": true,
                "key": "c3"
              },
              {
                "blank": true,
                "key": "c4"
              }
            ]
          ],
          "marks": 2,
          "cells": {
            "c1": {
              "type": "numeric",
              "value": 17,
              "marks": 0,
              "description": "cumulative frequency to 20"
            },
            "c2": {
              "type": "numeric",
              "value": 33,
              "marks": 0,
              "description": "cumulative frequency to 25"
            },
            "c3": {
              "type": "numeric",
              "value": 43,
              "marks": 1,
              "description": "cumulative frequency to 30"
            },
            "c4": {
              "type": "numeric",
              "value": 50,
              "marks": 1,
              "description": "cumulative frequency to 35"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The 50 values, grouped.",
          "headers": [
            "Length (cm)",
            "10 - 15",
            "15 - 20",
            "20 - 25",
            "25 - 30",
            "30 - 35"
          ],
          "rows": [
            [
              "Frequency",
              "5",
              "12",
              "16",
              "10",
              "7"
            ],
            [
              "Cumulative frequency",
              "5",
              {
                "key": "c1",
                "answer": "17",
                "answerType": "numeric",
                "marks": 0,
                "description": "cumulative frequency to 20"
              },
              {
                "key": "c2",
                "answer": "33",
                "answerType": "numeric",
                "marks": 0,
                "description": "cumulative frequency to 25"
              },
              {
                "key": "c3",
                "answer": "43",
                "answerType": "numeric",
                "marks": 1,
                "description": "cumulative frequency to 30"
              },
              {
                "key": "c4",
                "answer": "50",
                "answerType": "numeric",
                "marks": 1,
                "description": "cumulative frequency to 35"
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Using a scale of 2 cm to represent 5 cm on the horizontal axis and 2 cm to represent 10 values on the vertical axis, draw the cumulative frequency curve for the data. Plot the cumulative frequency against the UPPER boundary of each class.",
        "marks": 3,
        "answer": "the points (15, 5), (20, 17), (25, 33), (30, 43), (35, 50) joined by a smooth curve",
        "solution": "Plot the cumulative frequency at the upper boundary of each class: (15, 5), (20, 17), (25, 33), (30, 43), (35, 50), then join them with a smooth curve.",
        "responseType": "graph",
        "grid": {
          "xMin": 10,
          "xMax": 35,
          "yMin": 0,
          "yMax": 50,
          "xStep": 5,
          "yStep": 10,
          "minorPerStep": 5,
          "xLabel": "Length (cm)",
          "yLabel": "Cumulative frequency",
          "tools": [
            "point",
            "curve",
            "read"
          ]
        },
        "graph": {
          "points": [
            {
              "x": 15,
              "y": 5
            },
            {
              "x": 20,
              "y": 17
            },
            {
              "x": 25,
              "y": 33
            },
            {
              "x": 30,
              "y": 43
            },
            {
              "x": 35,
              "y": 50
            }
          ],
          "tolerance": 1.2,
          "pointMarks": 2,
          "curve": {
            "expression": "(x <= 20 ? (5 + (x - 15) * 12/5) : (x <= 25 ? (17 + (x - 20) * 16/5) : (x <= 30 ? (33 + (x - 25) * 2) : (x <= 35 ? (43 + (x - 30) * 7/5) : 50))))",
            "from": 15,
            "to": 35,
            "tolerance": 3.0,
            "requireSmooth": false
          },
          "curveMarks": 1
        },
        "answerType": "text",
        "responseSchema": {
          "type": "graph",
          "graph": {
            "xMin": 10,
            "xMax": 35,
            "yMin": 0,
            "yMax": 50,
            "xStep": 5,
            "yStep": 10,
            "minorPerStep": 5,
            "snapX": 0.5,
            "snapY": 1.0,
            "xLabel": "Length (cm)",
            "yLabel": "Cumulative frequency",
            "tools": [
              "point",
              "curve",
              "read"
            ],
            "mode": "curve"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  15,
                  5
                ],
                [
                  20,
                  17
                ],
                [
                  25,
                  33
                ],
                [
                  30,
                  43
                ],
                [
                  35,
                  50
                ]
              ],
              "tolerance": [
                1.2,
                1.2
              ],
              "proportional": true,
              "label": "Accurate plotted points"
            },
            {
              "kind": "graph_curve",
              "marks": 1,
              "minimumPoints": 3,
              "referencePoints": [
                [
                  15,
                  5
                ],
                [
                  20,
                  17
                ],
                [
                  25,
                  33
                ],
                [
                  30,
                  43
                ],
                [
                  35,
                  50
                ]
              ],
              "tolerance": [
                1.2,
                1.2
              ],
              "minimumMatches": 3,
              "increasing": true,
              "requireSmooth": false,
              "label": "Appropriate curve through the plotted data"
            }
          ]
        }
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Use your graph to estimate the MEDIAN of the the lengths.",
        "marks": 2,
        "answer": "22.5",
        "solution": "The median is the 25th value. Reading across from 25 on the cumulative frequency axis to the curve and down to the horizontal axis gives approximately 22.5 cm.",
        "suffix": " cm",
        "tolerance": 1.25,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "reads across from 25 on the cumulative frequency axis",
            "check": {
              "type": "contains",
              "value": [
                25.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the median",
            "check": {
              "type": "numeric",
              "value": 22.5,
              "tolerance": 1.25
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 50 values is chosen at random. Determine the probability that it is MORE than 25 cm. Give your answer as a fraction in its lowest terms.",
        "marks": 2,
        "answer": "17/50",
        "solution": "33 of the 50 values are 25 cm or less, so 50 - 33 = 17 are more than 25 cm. The probability is 17/50 = 17/50.",
        "requiredForm": "simplified_fraction",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the number greater than 25 cm",
            "check": {
              "type": "contains",
              "value": [
                17.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the probability in its lowest terms",
            "check": {
              "type": "fraction",
              "value": 0.34,
              "simplified": true,
              "requireFraction": true
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "design": "Q5-EJ-B",
    "source": "SPARK Practice Paper J original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2j-q6",
    "question_number": 6,
    "paper": "SPARK Practice Paper J",
    "section": "I",
    "topic": "Geometry and trigonometry",
    "marks": 9,
    "stem": "The diagram below, not drawn to scale, shows a regular dodecagon, a polygon with 12 equal sides. One of its interior angles is marked x.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the value of x, the size of EACH interior angle of the regular dodecagon.",
        "marks": 3,
        "answer": "150",
        "solution": "The 12 exterior angles of the polygon add up to 360°, so each exterior angle is 360°/12 = 30°. An interior angle and its exterior angle lie on a straight line, so x = 180 - 30 = 150°.",
        "suffix": "°",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses exterior angle = 360/12",
            "check": {
              "type": "contains",
              "value": [
                30.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "uses interior angle = 180 - exterior angle",
            "check": {
              "type": "contains",
              "value": [
                180.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the interior angle of the regular dodecagon",
            "check": {
              "type": "numeric",
              "value": 150.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "In the diagram below, not drawn to scale, PQ and RS are parallel straight lines cut by a transversal. Calculate the value of y.",
        "marks": 2,
        "answer": "75",
        "solution": "y and the angle of 105° are co-interior angles between the parallel lines PQ and RS, so they add up to 180°. y = 180 - 105 = 75.",
        "suffix": "°",
        "tolerance": 0.011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 200\" width=\"100%\" style=\"max-width:380px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M46.0 66.0 L326.8 66.0\"/><path d=\"M334.0 66.0 L326.0 71.0 L326.0 61.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M46.0 146.0 L326.8 146.0\"/><path d=\"M334.0 146.0 L326.0 151.0 L326.0 141.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M120 186 L250 26\"/><path d=\"M246.5 66.0 A29 29 0 0 1 199.2 88.5\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"224.4\" y=\"80.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">105&#176;</text><path d=\"M181.5 146.0 A29 29 0 0 0 170.8 123.5\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"169.4\" y=\"138.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y&#176;</text><g stroke=\"none\" fill=\"currentColor\" font-style=\"italic\"><text x=\"32\" y=\"71\">P</text><text x=\"344\" y=\"71\">Q</text><text x=\"32\" y=\"151\">R</text><text x=\"344\" y=\"151\">S</text></g></svg>",
          "alt": "Two parallel straight lines, PQ above and RS below, cut by a transversal that slopes upwards to the right. At PQ an angle of 105 degrees is marked below the line, on the right of the transversal. At RS the angle y is marked above the line, on the right of the transversal. The diagram is not drawn to scale."
        },
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses co-interior angles adding up to 180",
            "check": {
              "type": "method",
              "any": [
                "co-interior",
                "180"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the value of y",
            "check": {
              "type": "numeric",
              "value": 75.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the reason for your answer in (b), naming the relationship between the two angles.",
        "marks": 2,
        "answer": "y and the angle of 105 degrees are co-interior angles between the parallel lines PQ and RS, so the two angles add up to 180 degrees.",
        "solution": "PQ is parallel to RS. The angle marked y and the angle of 105° are co-interior angles, and co-interior angles between parallel lines add up to 180°. Naming them as co-interior angles earns 1 mark and saying that the lines PQ and RS are parallel earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "name",
            "marks": 1,
            "description": "names the angles as co-interior angles",
            "any": [
              "co-interior"
            ],
            "none": [
              "alternate",
              "corresponding"
            ]
          },
          {
            "id": "parallel",
            "marks": 1,
            "description": "says that PQ and RS are parallel",
            "any": [
              "parallel"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "names the angles as co-interior angles",
            "check": {
              "type": "written",
              "id": "name",
              "description": "names the angles as co-interior angles",
              "any": [
                "co-interior"
              ],
              "none": [
                "alternate",
                "corresponding"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "says that PQ and RS are parallel",
            "check": {
              "type": "written",
              "id": "parallel",
              "description": "says that PQ and RS are parallel",
              "any": [
                "parallel"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "A different regular polygon has an interior angle of 140°. Determine the number of sides of this polygon.",
        "marks": 2,
        "answer": "9",
        "solution": "Each exterior angle is 180 - 140 = 40°. The exterior angles add up to 360°, so the number of sides is 360/40 = 9.",
        "tolerance": 0.011,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "finds the exterior angle as 180 - the interior angle",
            "check": {
              "type": "contains",
              "value": [
                40.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the number of sides",
            "check": {
              "type": "numeric",
              "value": 9.0,
              "tolerance": 0.011
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 300\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M160.0 52.0 L108.0 65.9 L69.9 104.0 L56.0 156.0 L69.9 208.0 L108.0 246.1 L160.0 260.0 L212.0 246.1 L250.1 208.0 L264.0 156.0 L250.1 104.0 L212.0 65.9 Z\" stroke-width=\"1.8\"/><path d=\"M127.2 60.8 A34 34 0 0 0 192.8 60.8\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"160.0\" y=\"70.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">x&#176;</text></svg>",
      "alt": "A regular dodecagon with 12 equal sides and 12 equal angles. One interior angle is marked x. The diagram is not drawn to scale."
    },
    "design": "Q6-EJ-B",
    "source": "SPARK Practice Paper J original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2j-q7",
    "question_number": 7,
    "paper": "SPARK Practice Paper J",
    "section": "I",
    "topic": "Sequences, patterns and investigation",
    "marks": 10,
    "stem": "The diagrams below show the first three figures in a sequence of rectangles made from unit squares. Every rectangle is 3 units high, and Figure n is n units wide. Study the patterns of unit squares and answer the questions that follow.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Complete the table below, giving the missing values for Figure 4 and for Figure 10.",
        "marks": 4,
        "answer": "12, 14, 30, 26",
        "solution": "Every figure is 3 units high, so the area goes up by 3 square units each time and Figure 4 has an area of 3 x 4 = 12 square units. The perimeter goes up by 2 units each time, from 8 to 10 to 12, so Figure 4 has a perimeter of 14 units. Figure 10 is too wide to draw, so use the rules: its area is 3 x 10 = 30 square units and its perimeter is 2 x 10 + 6 = 26 units.",
        "responseType": "table",
        "table": {
          "caption": "The area and the perimeter of each figure.",
          "headers": [
            "Figure",
            "Area, in square units",
            "Perimeter, in units"
          ],
          "rows": [
            [
              "1",
              "3",
              "8"
            ],
            [
              "2",
              "6",
              "10"
            ],
            [
              "3",
              "9",
              "12"
            ],
            [
              "4",
              {
                "blank": true,
                "key": "q4"
              },
              {
                "blank": true,
                "key": "r4"
              }
            ],
            [
              "10",
              {
                "blank": true,
                "key": "q10"
              },
              {
                "blank": true,
                "key": "r10"
              }
            ]
          ],
          "marks": 4,
          "cells": {
            "q4": {
              "type": "numeric",
              "value": 12.0,
              "marks": 1,
              "description": "area, in square units in Figure 4"
            },
            "r4": {
              "type": "numeric",
              "value": 14.0,
              "marks": 1,
              "description": "perimeter, in units in Figure 4"
            },
            "q10": {
              "type": "numeric",
              "value": 30.0,
              "marks": 1,
              "description": "area, in square units in Figure 10"
            },
            "r10": {
              "type": "numeric",
              "value": 26.0,
              "marks": 1,
              "description": "perimeter, in units in Figure 10"
            }
          }
        },
        "answerType": "text",
        "responseSchema": {
          "type": "table",
          "caption": "The area and the perimeter of each figure.",
          "headers": [
            "Figure",
            "Area, in square units",
            "Perimeter, in units"
          ],
          "rows": [
            [
              "1",
              "3",
              "8"
            ],
            [
              "2",
              "6",
              "10"
            ],
            [
              "3",
              "9",
              "12"
            ],
            [
              "4",
              {
                "key": "q4",
                "answer": "12.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "area, in square units in Figure 4"
              },
              {
                "key": "r4",
                "answer": "14.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "perimeter, in units in Figure 4"
              }
            ],
            [
              "10",
              {
                "key": "q10",
                "answer": "30.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "area, in square units in Figure 10"
              },
              {
                "key": "r10",
                "answer": "26.0",
                "answerType": "numeric",
                "marks": 1,
                "description": "perimeter, in units in Figure 10"
              }
            ]
          ],
          "explicitCellMarks": true
        }
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression, in terms of n, for the perimeter, in units, of Figure n.",
        "marks": 2,
        "answer": "2n + 6",
        "solution": "Figure n is a rectangle n units long and 3 units high, so its perimeter is 2(n + 3) = 2n + 6 units. Checking against the table, n = 3 gives 12 and n = 4 gives 14.",
        "answerType": "expression",
        "accepted": [
          "2(n + 3)",
          "2n + 6"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "shows how the perimeter is built up in Figure n",
            "check": {
              "type": "contains",
              "value": [
                2.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for the perimeter",
            "check": {
              "type": "expression",
              "value": "2n + 6",
              "accepted": [
                "2(n + 3)",
                "2n + 6"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the number of the figure that has a total area of 87 square units. Show clearly the equation you use.",
        "marks": 2,
        "answer": "29",
        "solution": "The area of Figure n is 3n square units. So 3n = 87, giving n = 29. The figure is Figure 29. Check: 3 x 29 = 87.",
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes the equation 3n = 87 for the area",
            "check": {
              "type": "contains",
              "value": [
                87.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the figure number",
            "check": {
              "type": "numeric",
              "value": 29.0,
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Explain why the perimeter of a figure in this sequence can NEVER be 35 units.",
        "marks": 2,
        "answer": "The perimeter of Figure n is 2n + 6 units, which is 2(n + 3), an even number for every whole number n. 35 is odd, so it cannot be 2(n + 3). Solving 2n + 6 = 35 gives n = 14.5, which is not a whole number, so no figure has a perimeter of 35 units.",
        "solution": "The perimeters are 8, 10, 12, 14, and so on, all even, because Figure n has a perimeter of 2n + 6 = 2(n + 3) units. Saying that the perimeter is 2(n + 3) and so is always even earns 1 mark. Saying that 35 is odd, or showing that 2n + 6 = 35 gives n = 14.5, which is not a whole number, earns the second.",
        "responseType": "written",
        "rubric": [
          {
            "id": "form",
            "marks": 1,
            "description": "states that the perimeter is 2n + 6 = 2(n + 3), always an even number",
            "any": [
              "even",
              "2(n + 3)",
              "multiple of 2"
            ]
          },
          {
            "id": "why",
            "marks": 1,
            "description": "states that 35 is odd, so n would not be a whole number",
            "any": [
              "odd",
              "14.5",
              "not a whole number",
              "not an integer"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "states that the perimeter is 2n + 6 = 2(n + 3), always an even number",
            "check": {
              "type": "written",
              "id": "form",
              "description": "states that the perimeter is 2n + 6 = 2(n + 3), always an even number",
              "any": [
                "even",
                "2(n + 3)",
                "multiple of 2"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states that 35 is odd, so n would not be a whole number",
            "check": {
              "type": "written",
              "id": "why",
              "description": "states that 35 is odd, so n would not be a whole number",
              "any": [
                "odd",
                "14.5",
                "not a whole number",
                "not an integer"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      }
    ],
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 236 106\" width=\"100%\" style=\"max-width:236px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"32.0\" y=\"12.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"32.0\" y=\"30.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"32.0\" y=\"48.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><text x=\"41.0\" y=\"90.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 1</text><rect x=\"82.0\" y=\"12.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"82.0\" y=\"30.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"82.0\" y=\"48.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"100.0\" y=\"12.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"100.0\" y=\"30.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"100.0\" y=\"48.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><text x=\"100.0\" y=\"90.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 2</text><rect x=\"150.0\" y=\"12.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"150.0\" y=\"30.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"150.0\" y=\"48.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"168.0\" y=\"12.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"168.0\" y=\"30.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"168.0\" y=\"48.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"186.0\" y=\"12.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"186.0\" y=\"30.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><rect x=\"186.0\" y=\"48.0\" width=\"18\" height=\"18\" stroke-width=\"1.2\"/><text x=\"177.0\" y=\"90.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 3</text></svg>",
      "alt": "Three rectangles made from unit squares, each 3 squares high. Figure 1 is 3 squares high and 1 square wide, an area of 3 square units and a perimeter of 8 units. Figure 2 is 3 squares high and 2 squares wide, an area of 6 square units and a perimeter of 10 units. Figure 3 is 3 squares high and 3 squares wide, an area of 9 square units and a perimeter of 12 units."
    },
    "design": "Q7-EJ-B",
    "source": "SPARK Practice Paper J original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2j-q8",
    "question_number": 8,
    "paper": "SPARK Practice Paper J",
    "section": "II",
    "topic": "Relations, functions and graphs",
    "marks": 12,
    "stem": "A bakery makes trays of buns and trays of bread. In one week x trays of buns and y trays of bread are made. The oven can hold at most 40 trays in a day. A tray of buns needs 1 kg of flour and a tray of bread needs 3 kg, and 90 kg of flour is available.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write TWO inequalities, other than x ≥ 0 and y ≥ 0, to represent the information given.",
        "marks": 4,
        "answer": "x + y <= 40; x + 3y <= 90",
        "solution": "At most 40 in total gives x + y ≤ 40. The second condition gives x + 3y ≤ 90.",
        "answerType": "expression",
        "accepted": [
          "x + y <= 40, x + 3y <= 90"
        ],
        "criteria": [
          {
            "kind": "B",
            "marks": 2,
            "description": "the first inequality",
            "check": {
              "type": "allOf",
              "options": [
                {
                  "type": "inequality",
                  "value": "x + y <= 40"
                }
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 2,
            "description": "the second inequality",
            "check": {
              "type": "allOf",
              "options": [
                {
                  "type": "inequality",
                  "value": "x + 3y <= 90"
                }
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "B2"
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "The profit on a trays of bun is $8 and the profit on a trays of bread is $12. Write an expression, in terms of x and y, for the TOTAL profit, P.",
        "marks": 2,
        "answer": "P = 8x + 12y",
        "solution": "Each of the x trays of buns earns $8 and each of the y trays of bread earns $12, so P = 8x + 12y.",
        "answerType": "expression",
        "accepted": [
          "8x + 12y"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses $8 for each of the x trays of buns",
            "check": {
              "type": "contains",
              "value": [
                8.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for the profit",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "equation",
                  "value": "P = 8x + 12y"
                },
                {
                  "type": "expression",
                  "value": "8x + 12y"
                }
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The vertices of the feasible region are (0, 30), (15, 25), (40, 0). Calculate the profit at EACH of these vertices.",
        "marks": 4,
        "answer": "$360, $420, $320",
        "solution": "Substitute each vertex into P = 8x + 12y: at (0, 30), P = 8(0) + 12(30) = $360; at (15, 25), P = 8(15) + 12(25) = $420; at (40, 0), P = 8(40) + 12(0) = $320.",
        "answerType": "text",
        "accepted": [
          "(0, 30): $360; (15, 25): $420; (40, 0): $320"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes the vertices into P = 8x + 12y",
            "check": {
              "type": "contains",
              "value": [
                360.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "evaluates the profit at every vertex",
            "check": {
              "type": "contains",
              "value": [
                420.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 2,
            "description": "all three profits",
            "check": {
              "type": "set",
              "value": [
                360.0,
                420.0,
                320.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Hence, determine the number of trays of buns and the number of trays of bread that a bakery should make each week to obtain the MAXIMUM profit.",
        "marks": 2,
        "answer": "15 trays of buns and 25 trays of bread, giving a profit of $420",
        "solution": "The greatest of the profits is $420, at the vertex (15, 25). So 15 trays of buns and 25 trays of bread should be made.",
        "answerType": "text",
        "accepted": [
          "15, 25",
          "(15, 25)"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "selects the vertex giving the greatest profit",
            "check": {
              "type": "contains",
              "value": [
                420.0
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "15 trays of buns and 25 trays of bread",
            "check": {
              "type": "set",
              "value": [
                15.0,
                25.0,
                420.0
              ],
              "tolerance": 1e-06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      }
    ],
    "section_heading": "ALGEBRA, RELATIONS, FUNCTIONS AND GRAPHS",
    "design": "Q8-EJ-B",
    "source": "SPARK Practice Paper J original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2j-q9",
    "question_number": 9,
    "paper": "SPARK Practice Paper J",
    "section": "II",
    "topic": "Geometry and trigonometry",
    "marks": 12,
    "stem": "The diagram below, not drawn to scale, shows a vertical lighthouse TB standing on level horizontal ground. The points C, A, B and D lie on a straight line on the ground, with A between C and B, and B between A and D. AB = 24 m and the angle of elevation of the top, T, of the lighthouse from A is 47°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate, correct to 1 decimal place, the height, TB, of the lighthouse.",
        "marks": 3,
        "answer": "25.7",
        "solution": "Triangle TBA is right-angled at B, so tan 47° = TB/AB = TB/24. Therefore TB = 24 x tan 47° = 25.7368 = 25.7 m, correct to 1 decimal place.",
        "suffix": " m",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses tan = opposite/adjacent in triangle TBA",
            "check": {
              "type": "method",
              "any": [
                "tan"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes to give TB = 24 tan 47",
            "check": {
              "type": "contains",
              "value": [
                24.0,
                47.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "TB = 25.7 m",
            "check": {
              "type": "numeric",
              "value": 25.736849040592382,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "The angle of elevation of T from C is 28°. Calculate, correct to 1 decimal place, the length of AC.",
        "marks": 4,
        "answer": "24.4",
        "solution": "Triangle TBC is right-angled at B, so tan 28° = TB/CB, which gives CB = TB / tan 28°. So CB = 25.7368 / tan 28° = 48.40 m. Since A lies between C and B, AC = CB - AB = 48.40 - 24 = 24.40 = 24.4 m, correct to 1 decimal place.",
        "suffix": " m",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses tan 28 = TB/CB in triangle TBC",
            "check": {
              "type": "method",
              "any": [
                "tan"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "rearranges to CB = TB / tan 28",
            "check": {
              "type": "contains",
              "value": [
                28.0,
                25.7368
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "CB = 48.40 m and AC = CB - 24",
            "check": {
              "type": "contains",
              "value": [
                48.4,
                24.0
              ]
            },
            "field": "all",
            "code": "M3"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "AC = 24.4 m",
            "check": {
              "type": "numeric",
              "value": 24.403973125265445,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "a/tan(28) - 24"
            },
            "code": "A1",
            "depends": [
              "M3"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "D is a point on the ground on the opposite side of the lighthouse from A, with BD = 18 m. Calculate, correct to 1 decimal place, the angle of depression of D from T.",
        "marks": 3,
        "answer": "55.0",
        "solution": "The angle of depression of D from T is equal to the angle of elevation of T from D, which is angle TDB. Triangle TBD is right-angled at B, with TB = 25.7368 m and BD = 18 m, so tan(angle TDB) = TB/BD = 1.4298. So angle TDB = 55.03 = 55.0°, and the angle of depression of D from T is 55.0°, correct to 1 decimal place.",
        "suffix": "°",
        "tolerance": 0.06,
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses tan(angle TDB) = TB/BD in triangle TBD",
            "check": {
              "type": "method",
              "any": [
                "tan"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "substitutes TB and BD = 18 correctly",
            "check": {
              "type": "contains",
              "value": [
                25.7368,
                18.0
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "angle of depression = 55.0 degrees",
            "check": {
              "type": "numeric",
              "value": 55.03158498365769,
              "dp": 1,
              "tolerance": 0.06
            },
            "field": "answer",
            "ecf": {
              "uses": [
                "a"
              ],
              "formula": "atan(a/18)"
            },
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Explain why the angle of elevation of T from A is EQUAL to the angle of depression of A from T.",
        "marks": 2,
        "answer": "The horizontal line drawn through T is parallel to the level ground AB, and AT is a transversal cutting both of them. The angle of elevation of T from A and the angle of depression of A from T are therefore alternate angles between parallel lines, and alternate angles are equal.",
        "solution": "The angle of elevation is measured at A from the horizontal ground AB up to AT, and the angle of depression is measured at T from the horizontal line through T down to TA. The horizontal line through T is parallel to AB because both are horizontal, and AT is a transversal cutting this pair of parallel lines. The two angles are alternate angles (Z angles) between the parallel lines, so they are equal.",
        "responseType": "written",
        "rubric": [
          {
            "id": "r1",
            "marks": 1,
            "description": "states that the horizontal line through T is parallel to the ground AB",
            "any": [
              "parallel"
            ]
          },
          {
            "id": "r2",
            "marks": 1,
            "description": "identifies the two angles as alternate angles, which are equal",
            "any": [
              "alternate",
              "z angles"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "states that the horizontal line through T is parallel to the ground AB",
            "check": {
              "type": "written",
              "id": "r1",
              "description": "states that the horizontal line through T is parallel to the ground AB",
              "any": [
                "parallel"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "identifies the two angles as alternate angles, which are equal",
            "check": {
              "type": "written",
              "id": "r2",
              "description": "identifies the two angles as alternate angles, which are equal",
              "any": [
                "alternate",
                "z angles"
              ]
            },
            "field": "answer",
            "code": "B2"
          }
        ]
      }
    ],
    "section_heading": "GEOMETRY AND TRIGONOMETRY",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 290\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M30 236 L326 236\"/><path d=\"M300 236 L300 58.7\" stroke-width=\"2\"/><path d=\"M56 236 L300 58.7\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><path d=\"M300.0 223.0 L287.0 223.0 L287.0 236.0\" stroke-width=\"1.2\"/><path d=\"M96.0 236.0 A40 40 0 0 0 88.4 212.5\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"76.9\" y=\"229.2\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">47&#176;</text><text x=\"178.0\" y=\"256.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">24 m</text><text x=\"326.0\" y=\"147.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\"></text><text x=\"44.0\" y=\"254.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"306.0\" y=\"46.7\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">T</text><text x=\"314.0\" y=\"242.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text></svg>",
      "alt": "A diagram, not drawn to scale, of a vertical lighthouse TB standing on level horizontal ground. B is the foot of the lighthouse and T is its top. A is a point on the ground with AB marked 24 m, and the right angle at B between the ground and the lighthouse is marked. A broken line is drawn from A to T and the angle of elevation of T from A is marked 47 degrees."
    },
    "design": "Q9-EJ-B",
    "source": "SPARK Practice Paper J original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  },
  {
    "question_id": "p2j-q10",
    "question_number": 10,
    "paper": "SPARK Practice Paper J",
    "section": "II",
    "topic": "Vectors and matrices",
    "marks": 12,
    "stem": "The diagram below, not drawn to scale, shows triangle OCD in which \\vec{OC} = c and \\vec{OD} = d. M is the midpoint of OC and N is the midpoint of OD.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Write \\vec{CD} in terms of c and d.",
        "marks": 2,
        "answer": "d - c",
        "solution": "\\vec{CD} = \\vec{CO} + \\vec{OD} = -c + d = d - c.",
        "answerType": "expression",
        "accepted": [
          "-c + d"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses \\vec{CD} = \\vec{CO} + \\vec{OD}",
            "check": {
              "type": "method",
              "any": [
                "\\vec{CO} + \\vec{OD}",
                "CO + OD",
                "-c + d",
                "d - c"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for \\vec{CD}",
            "check": {
              "type": "expression",
              "value": "d - c",
              "accepted": [
                "-c + d"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Write \\vec{CN} in terms of c and d.",
        "marks": 2,
        "answer": "(1/2)d - c",
        "solution": "N is the midpoint of OD, so \\vec{ON} = (1/2)d. Then \\vec{CN} = \\vec{CO} + \\vec{ON} = -c + (1/2)d = (1/2)d - c.",
        "answerType": "expression",
        "accepted": [
          "-c + (1/2)d",
          "(d - 2c)/2"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses \\vec{ON} = (1/2)d",
            "check": {
              "type": "method",
              "any": [
                "\\vec{ON} = (1/2)d",
                "(1/2)d",
                "d/2",
                "0.5d",
                "1/2 d",
                "(d - 2c)"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the expression for \\vec{CN}",
            "check": {
              "type": "expression",
              "value": "(1/2)d - c",
              "accepted": [
                "-c + (1/2)d",
                "(d - 2c)/2"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M1"
            ]
          }
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine \\vec{MN} in terms of c and d, giving your answer in its simplest form.",
        "marks": 3,
        "answer": "(1/2)d - (1/2)c",
        "solution": "M is the midpoint of OC, so \\vec{OM} = (1/2)c, and \\vec{ON} = (1/2)d. Then \\vec{MN} = \\vec{MO} + \\vec{ON} = -(1/2)c + (1/2)d = (1/2)(d - c).",
        "answerType": "expression",
        "accepted": [
          "(1/2)(d - c)",
          "(d - c)/2"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "writes \\vec{OM} = (1/2)c and \\vec{ON} = (1/2)d",
            "check": {
              "type": "method",
              "any": [
                "\\vec{OM} = (1/2)c",
                "(1/2)c",
                "c/2",
                "0.5c",
                "(1/2)(d - c)",
                "(d - c)/2"
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "M",
            "marks": 1,
            "description": "uses \\vec{MN} = \\vec{MO} + \\vec{ON}",
            "check": {
              "type": "method",
              "any": [
                "\\vec{MO} + \\vec{ON}",
                "\\vec{ON} - \\vec{OM}",
                "MO + ON",
                "(1/2)d - (1/2)c",
                "(1/2)(d - c)",
                "(d - c)/2",
                "0.5d - 0.5c"
              ]
            },
            "field": "all",
            "code": "M2"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the simplified expression for \\vec{MN}",
            "check": {
              "type": "expression",
              "value": "(1/2)d - (1/2)c",
              "accepted": [
                "(1/2)(d - c)",
                "(d - c)/2"
              ]
            },
            "field": "answer",
            "code": "A1",
            "depends": [
              "M2"
            ]
          }
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Show that \\vec{MN} is parallel to \\vec{CD}, and hence state, giving a reason, the type of quadrilateral CDNM.",
        "marks": 3,
        "answer": "\\vec{MN} = (1/2)(d - c) = (1/2)\\vec{CD}, so \\vec{MN} is a scalar multiple of \\vec{CD} and MN is parallel to CD. In the quadrilateral CDNM the sides CD and NM are parallel, but DN and MC are not, so exactly one pair of opposite sides is parallel and CDNM is a trapezium.",
        "solution": "From (a) (i), \\vec{CD} = d - c, and from (b), \\vec{MN} = (1/2)(d - c). Hence \\vec{MN} = (1/2)\\vec{CD}. One vector is a scalar multiple of the other, so MN is parallel to CD and half its length. In CDNM the sides CD and NM are therefore parallel, while \\vec{DN} = -(1/2)d and \\vec{MC} = (1/2)c are not parallel, because c and d are not parallel. A quadrilateral with exactly one pair of parallel sides is a trapezium.",
        "responseType": "written",
        "rubric": [
          {
            "id": "multiple",
            "marks": 1,
            "description": "shows that \\vec{MN} is (1/2)\\vec{CD}, a scalar multiple of it",
            "any": [
              "scalar multiple",
              "multiple of",
              "1/2",
              "half",
              "0.5"
            ]
          },
          {
            "id": "parallel",
            "marks": 1,
            "description": "states that MN is parallel to CD",
            "any": [
              "parallel",
              "same direction",
              "same gradient"
            ]
          },
          {
            "id": "trapezium",
            "marks": 1,
            "description": "names CDNM as a trapezium",
            "any": [
              "trapezium",
              "trapezoid"
            ]
          }
        ],
        "answerType": "text",
        "criteria": [
          {
            "kind": "B",
            "marks": 1,
            "description": "shows that \\vec{MN} is (1/2)\\vec{CD}, a scalar multiple of it",
            "check": {
              "type": "written",
              "id": "multiple",
              "description": "shows that \\vec{MN} is (1/2)\\vec{CD}, a scalar multiple of it",
              "any": [
                "scalar multiple",
                "multiple of",
                "1/2",
                "half",
                "0.5"
              ]
            },
            "field": "answer",
            "code": "B1"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "states that MN is parallel to CD",
            "check": {
              "type": "written",
              "id": "parallel",
              "description": "states that MN is parallel to CD",
              "any": [
                "parallel",
                "same direction",
                "same gradient"
              ]
            },
            "field": "answer",
            "code": "B2"
          },
          {
            "kind": "B",
            "marks": 1,
            "description": "names CDNM as a trapezium",
            "check": {
              "type": "written",
              "id": "trapezium",
              "description": "names CDNM as a trapezium",
              "any": [
                "trapezium",
                "trapezoid"
              ]
            },
            "field": "answer",
            "code": "B3"
          }
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "The vectors c and d are given by c = [[5], [-2]] and d = [[2], [4]]. Calculate |\\vec{CD}|, the magnitude of \\vec{CD}, giving your answer in EXACT form.",
        "marks": 2,
        "answer": "sqrt(45)",
        "solution": "\\vec{CD} = d - c = [[2], [4]] - [[5], [-2]] = [[-3], [6]]. So |\\vec{CD}| = sqrt((-3)^2 + (6)^2) = sqrt(9 + 36) = sqrt(45) = 3 sqrt(5), which is 6.71 correct to 2 decimal places.",
        "answerType": "expression",
        "accepted": [
          "3 sqrt(5)",
          "6.71"
        ],
        "criteria": [
          {
            "kind": "M",
            "marks": 1,
            "description": "uses |v| = sqrt(x^2 + y^2)",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "contains",
                  "value": [
                    45.0
                  ]
                },
                {
                  "type": "contains",
                  "value": [
                    9.0,
                    36.0
                  ]
                }
              ]
            },
            "field": "all",
            "code": "M1"
          },
          {
            "kind": "A",
            "marks": 1,
            "description": "the magnitude of \\vec{CD}",
            "check": {
              "type": "anyOf",
              "options": [
                {
                  "type": "expression",
                  "value": "sqrt(45)",
                  "accepted": [
                    "3 sqrt(5)",
                    "6.71"
                  ]
                },
                {
                  "type": "numeric",
                  "value": 6.708203932499369,
                  "tolerance": 0.01
                }
              ]
            },
            "field": "answer",
            "depends": [],
            "code": "A1"
          }
        ]
      }
    ],
    "section_heading": "VECTORS AND MATRICES",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 370 300\" width=\"100%\" style=\"max-width:350px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M66.0 254.0 L150.0 66.0 L312.0 178.0 Z\"/><path d=\"M66.0 254.0 L89.6 201.2\" stroke-width=\"2.6\"/><path d=\"M92.9 193.8 L94.3 204.3 L84.1 199.8 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M66.0 254.0 L137.0 232.1\" stroke-width=\"2.6\"/><path d=\"M144.7 229.7 L137.8 237.7 L134.5 227.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M108.0 160.0 L189.0 216.0\" stroke-dasharray=\"6 4\" stroke-width=\"1.5\"/><circle cx=\"108.0\" cy=\"160.0\" r=\"3.6\" fill=\"currentColor\"/><circle cx=\"189.0\" cy=\"216.0\" r=\"3.6\" fill=\"currentColor\"/><text x=\"48.0\" y=\"264.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text><text x=\"150.0\" y=\"46.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">C</text><text x=\"332.0\" y=\"178.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">D</text><text x=\"84.0\" y=\"158.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">M</text><text x=\"195.0\" y=\"239.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">N</text><text x=\"64.0\" y=\"218.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"15\" font-style=\"italic\" font-weight=\"bold\">c</text><text x=\"123.0\" y=\"251.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"15\" font-style=\"italic\" font-weight=\"bold\">d</text></svg>",
      "alt": "Triangle OCD, not drawn to scale. An arrow from O along OC is labelled c and an arrow from O along OD is labelled d. M, the midpoint of OC, and N, the midpoint of OD, are marked with dots and joined by a broken line, so that CDNM is a quadrilateral."
    },
    "design": "Q10-EJ-B",
    "source": "SPARK Practice Paper J original CSEC-style",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK Paper 2 practice item authored to the current CSEC Mathematics Paper 02 blueprint."
  }
];
