// SPARK CSEC Mathematics Paper 2 bank V5.2
// 100 rebuilt CSEC-style base templates. Original questions, not past-paper reproductions.
export const PAPER2_QUESTION_BANK_V2 = [
  {
    "question_id": "p2-q1-v1",
    "question_number": 1,
    "section": "I",
    "marks": 9,
    "topic": "Computation and consumer arithmetic",
    "design": "Q1-A exact fractions with profit worked back from selling price",
    "stem": "A trader sells an article for $4,500, making a profit of 25% on the cost price.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (2 1/3 + 1 3/4) ÷ (5/6 - 1/4), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "7",
        "solution": "(2 1/3 + 1 3/4) = 7/3 + 7/4 = 28/12 + 21/12 = 49/12. (5/6 - 1/4) = 5/6 - 1/4 = 10/12 - 3/12 = 7/12. Dividing by a fraction means multiplying by its reciprocal, so 49/12 ÷ 7/12 = 49/12 × 12/7 = 7."
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Calculate the cost price of the article.",
        "marks": 2,
        "answer": "3600.00",
        "solution": "The selling price is 125% of the cost price, so cost = 4,500 × 100/125 = $3600.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate the price at which the article must be sold to make a profit of 40% on the cost price.",
        "marks": 2,
        "answer": "5040.00",
        "solution": "New selling price = 3600.00 × 140/100 = $5040.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b3",
        "label": "(b) (iii)",
        "prompt": "Calculate the percentage increase in the selling price.",
        "marks": 2,
        "answer": "12",
        "solution": "Increase = 5040.00 - 4,500 = $540.00. As a percentage of the original selling price this is (540.00 ÷ 4,500) × 100 = 12%.",
        "suffix": "%",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q1-v2",
    "question_number": 1,
    "section": "I",
    "marks": 9,
    "topic": "Computation and consumer arithmetic",
    "design": "Q1-A exact fractions with profit worked back from selling price",
    "stem": "A trader sells an article for $5,400, making a profit of 20% on the cost price.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (3 1/5 - 1 7/10) ÷ (2/3 + 1/6), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "9/5",
        "solution": "(3 1/5 - 1 7/10) = 16/5 - 17/10 = 32/10 - 17/10 = 3/2. (2/3 + 1/6) = 2/3 + 1/6 = 4/6 + 1/6 = 5/6. Dividing by a fraction means multiplying by its reciprocal, so 3/2 ÷ 5/6 = 3/2 × 6/5 = 9/5. As a mixed number this is 1 4/5.",
        "accepted": [
          "1 4/5",
          "1.8"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Calculate the cost price of the article.",
        "marks": 2,
        "answer": "4500.00",
        "solution": "The selling price is 120% of the cost price, so cost = 5,400 × 100/120 = $4500.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate the price at which the article must be sold to make a profit of 35% on the cost price.",
        "marks": 2,
        "answer": "6075.00",
        "solution": "New selling price = 4500.00 × 135/100 = $6075.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b3",
        "label": "(b) (iii)",
        "prompt": "Calculate the percentage increase in the selling price.",
        "marks": 2,
        "answer": "12.5",
        "solution": "Increase = 6075.00 - 5,400 = $675.00. As a percentage of the original selling price this is (675.00 ÷ 5,400) × 100 = 12.5%.",
        "suffix": "%",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q1-v3",
    "question_number": 1,
    "section": "I",
    "marks": 9,
    "topic": "Computation and consumer arithmetic",
    "design": "Q1-B exact fractions with hire purchase",
    "stem": "A refrigerator has a cash price of $3,600. It may also be bought on hire purchase by paying a deposit of 25% of the cash price together with 15 monthly instalments of $220.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (3 1/2 + 2 1/4) ÷ (7/8 - 1/2), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "46/3",
        "solution": "(3 1/2 + 2 1/4) = 7/2 + 9/4 = 14/4 + 9/4 = 23/4. (7/8 - 1/2) = 7/8 - 1/2 = 7/8 - 4/8 = 3/8. Dividing by a fraction means multiplying by its reciprocal, so 23/4 ÷ 3/8 = 23/4 × 8/3 = 46/3. As a mixed number this is 15 1/3.",
        "accepted": [
          "15 1/3"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Calculate the deposit.",
        "marks": 2,
        "answer": "900.00",
        "solution": "Deposit = 25% of 3,600 = $900.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate the TOTAL hire purchase price.",
        "marks": 2,
        "answer": "4200.00",
        "solution": "Instalments = 15 × 220 = $3,300. Hire purchase price = 900.00 + 3,300 = $4200.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b3",
        "label": "(b) (iii)",
        "prompt": "Calculate the amount by which the hire purchase price exceeds the cash price, as a percentage of the cash price.",
        "marks": 2,
        "answer": "16.67",
        "solution": "Extra paid = 4200.00 - 3,600 = $600.00. As a percentage of the cash price this is (600.00 ÷ 3,600) × 100 = 16.67%.",
        "suffix": "%",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q1-v4",
    "question_number": 1,
    "section": "I",
    "marks": 9,
    "topic": "Computation and consumer arithmetic",
    "design": "Q1-B exact fractions with hire purchase",
    "stem": "A refrigerator has a cash price of $4,800. It may also be bought on hire purchase by paying a deposit of 20% of the cash price together with 12 monthly instalments of $355.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (2 1/6 + 3/4) ÷ (5/8 - 1/3), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "10",
        "solution": "(2 1/6 + 3/4) = 13/6 + 3/4 = 26/12 + 9/12 = 35/12. (5/8 - 1/3) = 5/8 - 1/3 = 15/24 - 8/24 = 7/24. Dividing by a fraction means multiplying by its reciprocal, so 35/12 ÷ 7/24 = 35/12 × 24/7 = 10."
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Calculate the deposit.",
        "marks": 2,
        "answer": "960.00",
        "solution": "Deposit = 20% of 4,800 = $960.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate the TOTAL hire purchase price.",
        "marks": 2,
        "answer": "5220.00",
        "solution": "Instalments = 12 × 355 = $4,260. Hire purchase price = 960.00 + 4,260 = $5220.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b3",
        "label": "(b) (iii)",
        "prompt": "Calculate the amount by which the hire purchase price exceeds the cash price, as a percentage of the cash price.",
        "marks": 2,
        "answer": "8.75",
        "solution": "Extra paid = 5220.00 - 4,800 = $420.00. As a percentage of the cash price this is (420.00 ÷ 4,800) × 100 = 8.75%.",
        "suffix": "%",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q1-v5",
    "question_number": 1,
    "section": "I",
    "marks": 9,
    "topic": "Computation and consumer arithmetic",
    "design": "Q1-C exact fractions with wages, overtime and income tax",
    "stem": "Marcia is paid a basic wage of $24.00 per hour for a basic week of 40 hours. Overtime is paid at time-and-a-half.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (4 1/2 - 1 5/6) ÷ (3/4 - 1/3), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "32/5",
        "solution": "(4 1/2 - 1 5/6) = 9/2 - 11/6 = 27/6 - 11/6 = 8/3. (3/4 - 1/3) = 3/4 - 1/3 = 9/12 - 4/12 = 5/12. Dividing by a fraction means multiplying by its reciprocal, so 8/3 ÷ 5/12 = 8/3 × 12/5 = 32/5. As a mixed number this is 6 2/5.",
        "accepted": [
          "6 2/5",
          "6.4"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "In one week Marcia works a total of 47 hours. Calculate her overtime pay for that week.",
        "marks": 2,
        "answer": "252.00",
        "solution": "Overtime hours = 47 - 40 = 7. Overtime rate = 1.5 × 24 = $36.00 per hour. Overtime pay = 7 × 36.00 = $252.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate her TOTAL wage for that week.",
        "marks": 2,
        "answer": "1212.00",
        "solution": "Basic pay = 40 × 24 = $960. Total wage = 960 + 252.00 = $1212.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Marcia's brother has an annual salary of $46,000. He is allowed a tax-free allowance of $18,400 and pays tax at 20% on the remainder. Calculate the tax he pays in one year.",
        "marks": 2,
        "answer": "5520.00",
        "solution": "Taxable income = 46,000 - 18,400 = $27,600. Tax = 20% of 27,600 = $5520.00.",
        "prefix": "$",
        "tolerance": 0.01
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q1-v6",
    "question_number": 1,
    "section": "I",
    "marks": 9,
    "topic": "Computation and consumer arithmetic",
    "design": "Q1-C exact fractions with wages, overtime and income tax",
    "stem": "Marcia is paid a basic wage of $32.00 per hour for a basic week of 35 hours. Overtime is paid at double time.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (2 3/5 + 1 1/2) ÷ (4/5 - 3/10), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "41/5",
        "solution": "(2 3/5 + 1 1/2) = 13/5 + 3/2 = 26/10 + 15/10 = 41/10. (4/5 - 3/10) = 4/5 - 3/10 = 8/10 - 3/10 = 1/2. Dividing by a fraction means multiplying by its reciprocal, so 41/10 ÷ 1/2 = 41/10 × 2 = 41/5. As a mixed number this is 8 1/5.",
        "accepted": [
          "8 1/5",
          "8.2"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "In one week Marcia works a total of 44 hours. Calculate her overtime pay for that week.",
        "marks": 2,
        "answer": "576.00",
        "solution": "Overtime hours = 44 - 35 = 9. Overtime rate = 2 × 32 = $64.00 per hour. Overtime pay = 9 × 64.00 = $576.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate her TOTAL wage for that week.",
        "marks": 2,
        "answer": "1696.00",
        "solution": "Basic pay = 35 × 32 = $1,120. Total wage = 1,120 + 576.00 = $1696.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Marcia's brother has an annual salary of $58,000. He is allowed a tax-free allowance of $21,500 and pays tax at 25% on the remainder. Calculate the tax he pays in one year.",
        "marks": 2,
        "answer": "9125.00",
        "solution": "Taxable income = 58,000 - 21,500 = $36,500. Tax = 25% of 36,500 = $9125.00.",
        "prefix": "$",
        "tolerance": 0.01
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q1-v7",
    "question_number": 1,
    "section": "I",
    "marks": 9,
    "topic": "Computation and consumer arithmetic",
    "design": "Q1-D exact fractions with currency conversion and a best buy",
    "stem": "The exchange rate is US$1.00 = J$158.40. A bank charges a commission of 2% on the Jamaican dollar value of every transaction.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (5 1/4 - 2 5/8) ÷ (7/12 + 1/6), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "7/2",
        "solution": "(5 1/4 - 2 5/8) = 21/4 - 21/8 = 42/8 - 21/8 = 21/8. (7/12 + 1/6) = 7/12 + 1/6 = 7/12 + 2/12 = 3/4. Dividing by a fraction means multiplying by its reciprocal, so 21/8 ÷ 3/4 = 21/8 × 4/3 = 7/2. As a mixed number this is 3 1/2.",
        "accepted": [
          "3 1/2",
          "3.5"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Calculate the value, in Jamaican dollars, of US$240.00 before commission is charged.",
        "marks": 2,
        "answer": "38016.00",
        "solution": "Value = 240 × 158.40 = J$38016.00.",
        "prefix": "J$",
        "tolerance": 0.02
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate the TOTAL amount, in Jamaican dollars, that the customer pays.",
        "marks": 2,
        "answer": "38776.32",
        "solution": "Commission = 2% of 38016.00 = J$760.32. Total = 38016.00 + 760.32 = J$38776.32.",
        "prefix": "J$",
        "tolerance": 0.02
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Cooking oil is sold in a 1.8 litre bottle for $720.00 and in a 500 millilitre bottle for $225.00. Calculate the cost per litre of the SMALLER bottle.",
        "marks": 2,
        "answer": "450.00",
        "solution": "500 mL = 0.5 litre. Cost per litre = 225 ÷ 0.5 = $450.00. For comparison the large bottle costs 720 ÷ 1.8 = $400.00 per litre, so the large bottle is the better buy.",
        "prefix": "$",
        "tolerance": 0.01
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q1-v8",
    "question_number": 1,
    "section": "I",
    "marks": 9,
    "topic": "Computation and consumer arithmetic",
    "design": "Q1-D exact fractions with currency conversion and a best buy",
    "stem": "The exchange rate is US$1.00 = J$157.50. A bank charges a commission of 3% on the Jamaican dollar value of every transaction.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (1 5/6 + 2 1/4) ÷ (5/6 + 1/3), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "7/2",
        "solution": "(1 5/6 + 2 1/4) = 11/6 + 9/4 = 22/12 + 27/12 = 49/12. (5/6 + 1/3) = 5/6 + 1/3 = 5/6 + 2/6 = 7/6. Dividing by a fraction means multiplying by its reciprocal, so 49/12 ÷ 7/6 = 49/12 × 6/7 = 7/2. As a mixed number this is 3 1/2.",
        "accepted": [
          "3 1/2",
          "3.5"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Calculate the value, in Jamaican dollars, of US$180.00 before commission is charged.",
        "marks": 2,
        "answer": "28350.00",
        "solution": "Value = 180 × 157.50 = J$28350.00.",
        "prefix": "J$",
        "tolerance": 0.02
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate the TOTAL amount, in Jamaican dollars, that the customer pays.",
        "marks": 2,
        "answer": "29200.50",
        "solution": "Commission = 3% of 28350.00 = J$850.50. Total = 28350.00 + 850.50 = J$29200.50.",
        "prefix": "J$",
        "tolerance": 0.02
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Cooking oil is sold in a 2.5 litre bottle for $950.00 and in a 400 millilitre bottle for $168.00. Calculate the cost per litre of the SMALLER bottle.",
        "marks": 2,
        "answer": "420.00",
        "solution": "400 mL = 0.4 litre. Cost per litre = 168 ÷ 0.4 = $420.00. For comparison the large bottle costs 950 ÷ 2.5 = $380.00 per litre, so the large bottle is the better buy.",
        "prefix": "$",
        "tolerance": 0.01
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q1-v9",
    "question_number": 1,
    "section": "I",
    "marks": 9,
    "topic": "Computation and consumer arithmetic",
    "design": "Q1-E exact fractions with ratio sharing and inverse proportion",
    "stem": "A sum of $5,040 is shared among three people in the ratio 2 : 3 : 4.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (3 3/4 - 1 1/2) ÷ (3/8 - 1/6), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "54/5",
        "solution": "(3 3/4 - 1 1/2) = 15/4 - 3/2 = 15/4 - 6/4 = 9/4. (3/8 - 1/6) = 3/8 - 1/6 = 9/24 - 4/24 = 5/24. Dividing by a fraction means multiplying by its reciprocal, so 9/4 ÷ 5/24 = 9/4 × 24/5 = 54/5. As a mixed number this is 10 4/5.",
        "accepted": [
          "10 4/5",
          "10.8"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Calculate the LARGEST share.",
        "marks": 2,
        "answer": "2240.00",
        "solution": "Total parts = 2 + 3 + 4 = 9. One part = 5,040 ÷ 9 = $560.00. Largest share = 4 × 560.00 = $2240.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate the difference between the largest and the smallest share.",
        "marks": 2,
        "answer": "1120.00",
        "solution": "Smallest share = 2 × 560.00 = $1120.00. Difference = 2240.00 - 1120.00 = $1120.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "8 workers can complete a job in 15 days. Assuming all workers work at the same rate, calculate the number of days 12 workers would take to complete the same job.",
        "marks": 2,
        "answer": "10",
        "solution": "The job needs 8 × 15 = 120 worker-days. With 12 workers this takes 120 ÷ 12 = 10 days.",
        "suffix": " days",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q1-v10",
    "question_number": 1,
    "section": "I",
    "marks": 9,
    "topic": "Computation and consumer arithmetic",
    "design": "Q1-E exact fractions with ratio sharing and inverse proportion",
    "stem": "A sum of $7,200 is shared among three people in the ratio 3 : 4 : 5.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the EXACT value of (2 2/5 + 1 1/3) ÷ (7/10 - 1/6), giving your answer as a fraction in its lowest terms.",
        "marks": 3,
        "answer": "7",
        "solution": "(2 2/5 + 1 1/3) = 12/5 + 4/3 = 36/15 + 20/15 = 56/15. (7/10 - 1/6) = 7/10 - 1/6 = 21/30 - 5/30 = 8/15. Dividing by a fraction means multiplying by its reciprocal, so 56/15 ÷ 8/15 = 56/15 × 15/8 = 7."
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Calculate the LARGEST share.",
        "marks": 2,
        "answer": "3000.00",
        "solution": "Total parts = 3 + 4 + 5 = 12. One part = 7,200 ÷ 12 = $600.00. Largest share = 5 × 600.00 = $3000.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate the difference between the largest and the smallest share.",
        "marks": 2,
        "answer": "1200.00",
        "solution": "Smallest share = 3 × 600.00 = $1800.00. Difference = 3000.00 - 1800.00 = $1200.00.",
        "prefix": "$",
        "tolerance": 0.01
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "6 workers can complete a job in 20 days. Assuming all workers work at the same rate, calculate the number of days 10 workers would take to complete the same job.",
        "marks": 2,
        "answer": "12",
        "solution": "The job needs 6 × 20 = 120 worker-days. With 10 workers this takes 120 ÷ 10 = 12 days.",
        "suffix": " days",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q2-v1",
    "question_number": 2,
    "section": "I",
    "marks": 9,
    "topic": "Algebra and measurement",
    "design": "Q2-A indices, both factorisation types and a worded equation",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Simplify, giving your answer in its simplest form, (3x^2y^1)(4x^3y^4) ÷ (6x^4y^2).",
        "marks": 2,
        "answer": "2xy^3",
        "solution": "Multiply the numerator: 12x^5y^5. Dividing, subtract the indices: 2xy^3.",
        "answerType": "expression"
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Factorise completely: 4m^2 - 100n^2",
        "marks": 2,
        "answer": "4(m - 5n)(m + 5n)",
        "solution": "Take out the common factor 4: 4(m^2 - 25n^2). The bracket is a difference of two squares, so the answer is 4(m - 5n)(m + 5n).",
        "answerType": "expression",
        "requiredForm": "factorised"
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Factorise completely: 2x^2 + 5x - 12",
        "marks": 2,
        "answer": "(2x - 3)(x + 4)",
        "solution": "Split the middle term using 8 and 3: 2x^2 + 8x - 3x - 12 = 2x(x + 4) - 3(x + 4) = (2x - 3)(x + 4).",
        "answerType": "expression",
        "requiredForm": "factorised"
      },
      {
        "id": "c1",
        "label": "(c) (i)",
        "prompt": "The length of a rectangle is 4 cm more than 3 times its width. The width is w cm. Write an expression, in terms of w, for the PERIMETER of the rectangle, in its simplest form.",
        "marks": 1,
        "answer": "8w + 8",
        "solution": "Length = 3w + 4. Perimeter = 2[w + (3w + 4)] = 8w + 8.",
        "answerType": "expression"
      },
      {
        "id": "c2",
        "label": "(c) (ii)",
        "prompt": "The perimeter of the rectangle is 44 cm. Calculate the length and the width of the rectangle.",
        "marks": 2,
        "answer": "width 4.5 cm, length 17.5 cm",
        "solution": "8w + 8 = 44, so 8w = 36 and w = 4.5. Width = 4.5 cm and length = 3(4.5) + 4 = 17.5 cm.",
        "accepted": [
          "4.5, 17.5",
          "17.5, 4.5",
          "width = 4.5 cm, length = 17.5 cm"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q2-v2",
    "question_number": 2,
    "section": "I",
    "marks": 9,
    "topic": "Algebra and measurement",
    "design": "Q2-A indices, both factorisation types and a worded equation",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Simplify, giving your answer in its simplest form, (5x^3y^2)(3x^2y^3) ÷ (5x^3y^3).",
        "marks": 2,
        "answer": "3x^2y^2",
        "solution": "Multiply the numerator: 15x^5y^5. Dividing, subtract the indices: 3x^2y^2.",
        "answerType": "expression"
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Factorise completely: 3m^2 - 147n^2",
        "marks": 2,
        "answer": "3(m - 7n)(m + 7n)",
        "solution": "Take out the common factor 3: 3(m^2 - 49n^2). The bracket is a difference of two squares, so the answer is 3(m - 7n)(m + 7n).",
        "answerType": "expression",
        "requiredForm": "factorised"
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Factorise completely: 3x^2 + 7x - 6",
        "marks": 2,
        "answer": "(3x - 2)(x + 3)",
        "solution": "Split the middle term using 9 and 2: 3x^2 + 9x - 2x - 6 = 3x(x + 3) - 2(x + 3) = (3x - 2)(x + 3).",
        "answerType": "expression",
        "requiredForm": "factorised"
      },
      {
        "id": "c1",
        "label": "(c) (i)",
        "prompt": "The length of a rectangle is 5 cm more than 2 times its width. The width is w cm. Write an expression, in terms of w, for the PERIMETER of the rectangle, in its simplest form.",
        "marks": 1,
        "answer": "6w + 10",
        "solution": "Length = 2w + 5. Perimeter = 2[w + (2w + 5)] = 6w + 10.",
        "answerType": "expression"
      },
      {
        "id": "c2",
        "label": "(c) (ii)",
        "prompt": "The perimeter of the rectangle is 46 cm. Calculate the length and the width of the rectangle.",
        "marks": 2,
        "answer": "width 6 cm, length 17 cm",
        "solution": "6w + 10 = 46, so 6w = 36 and w = 6. Width = 6 cm and length = 2(6) + 5 = 17 cm.",
        "accepted": [
          "6, 17",
          "17, 6",
          "width = 6 cm, length = 17 cm"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q2-v3",
    "question_number": 2,
    "section": "I",
    "marks": 9,
    "topic": "Algebra and measurement",
    "design": "Q2-A indices, both factorisation types and a worded equation",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Simplify, giving your answer in its simplest form, (4x^4y^3)(6x^2y^2) ÷ (8x^3y^4).",
        "marks": 2,
        "answer": "3x^3y",
        "solution": "Multiply the numerator: 24x^6y^5. Dividing, subtract the indices: 3x^3y.",
        "answerType": "expression"
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "Factorise completely: 5m^2 - 45n^2",
        "marks": 2,
        "answer": "5(m - 3n)(m + 3n)",
        "solution": "Take out the common factor 5: 5(m^2 - 9n^2). The bracket is a difference of two squares, so the answer is 5(m - 3n)(m + 3n).",
        "answerType": "expression",
        "requiredForm": "factorised"
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Factorise completely: 5x^2 + 3x - 14",
        "marks": 2,
        "answer": "(5x - 7)(x + 2)",
        "solution": "Split the middle term using 10 and 7: 5x^2 + 10x - 7x - 14 = 5x(x + 2) - 7(x + 2) = (5x - 7)(x + 2).",
        "answerType": "expression",
        "requiredForm": "factorised"
      },
      {
        "id": "c1",
        "label": "(c) (i)",
        "prompt": "The length of a rectangle is 3 cm more than 4 times its width. The width is w cm. Write an expression, in terms of w, for the PERIMETER of the rectangle, in its simplest form.",
        "marks": 1,
        "answer": "10w + 6",
        "solution": "Length = 4w + 3. Perimeter = 2[w + (4w + 3)] = 10w + 6.",
        "answerType": "expression"
      },
      {
        "id": "c2",
        "label": "(c) (ii)",
        "prompt": "The perimeter of the rectangle is 56 cm. Calculate the length and the width of the rectangle.",
        "marks": 2,
        "answer": "width 5 cm, length 23 cm",
        "solution": "10w + 6 = 56, so 10w = 50 and w = 5. Width = 5 cm and length = 4(5) + 3 = 23 cm.",
        "accepted": [
          "5, 23",
          "23, 5",
          "width = 5 cm, length = 23 cm"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q2-v4",
    "question_number": 2,
    "section": "I",
    "marks": 9,
    "topic": "Algebra and measurement",
    "design": "Q2-B algebraic fractions, change of subject and substitution",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Express as a SINGLE fraction in its simplest form: 3/(x + 2) - 2/(x - 1)",
        "marks": 3,
        "answer": "(x - 7)/((x + 2)(x - 1))",
        "solution": "The common denominator is (x + 2)(x - 1). The numerator is 3(x - 1) - 2(x + 2) = 3x - 3 - 2x - 4 = x - 7. So the single fraction is (x - 7)/((x + 2)(x - 1)).",
        "answerType": "expression"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Make r the subject of the formula V = (1/3)πr^2h.",
        "marks": 3,
        "answer": "r = sqrt(3V/(πh))",
        "solution": "Multiply both sides by 3: 3V = πr^2h. Divide by πh: r^2 = 3V/(πh). Take the positive square root: r = sqrt(3V/(πh)).",
        "answerType": "expression",
        "accepted": [
          "sqrt(3V/(πh))",
          "sqrt(3V/πh)",
          "r = sqrt(3V/πh)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Given that a = -3 and b = 4, calculate the value of (3a^2 - b^3)/(a + b).",
        "marks": 3,
        "answer": "-37",
        "solution": "3a^2 = 3(-3)^2 = 27 and b^3 = 4^3 = 64. The numerator is 27 - 64 = -37 and the denominator is -3 + 4 = 1. The value is -37.",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q2-v5",
    "question_number": 2,
    "section": "I",
    "marks": 9,
    "topic": "Algebra and measurement",
    "design": "Q2-B algebraic fractions, change of subject and substitution",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Express as a SINGLE fraction in its simplest form: 4/(x + 1) - 3/(x - 3)",
        "marks": 3,
        "answer": "(x - 15)/((x + 1)(x - 3))",
        "solution": "The common denominator is (x + 1)(x - 3). The numerator is 4(x - 3) - 3(x + 1) = 4x - 12 - 3x - 3 = x - 15. So the single fraction is (x - 15)/((x + 1)(x - 3)).",
        "answerType": "expression"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Make r the subject of the formula V = (1/3)πr^2h.",
        "marks": 3,
        "answer": "r = sqrt(3V/(πh))",
        "solution": "Multiply both sides by 3: 3V = πr^2h. Divide by πh: r^2 = 3V/(πh). Take the positive square root: r = sqrt(3V/(πh)).",
        "answerType": "expression",
        "accepted": [
          "sqrt(3V/(πh))",
          "sqrt(3V/πh)",
          "r = sqrt(3V/πh)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Given that a = -6 and b = 2, calculate the value of (3a^2 - b^3)/(a + b).",
        "marks": 3,
        "answer": "-25",
        "solution": "3a^2 = 3(-6)^2 = 108 and b^3 = 2^3 = 8. The numerator is 108 - 8 = 100 and the denominator is -6 + 2 = -4. The value is -25.",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q2-v6",
    "question_number": 2,
    "section": "I",
    "marks": 9,
    "topic": "Algebra and measurement",
    "design": "Q2-B algebraic fractions, change of subject and substitution",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Express as a SINGLE fraction in its simplest form: 5/(x + 3) - 2/(x - 2)",
        "marks": 3,
        "answer": "(3x - 16)/((x + 3)(x - 2))",
        "solution": "The common denominator is (x + 3)(x - 2). The numerator is 5(x - 2) - 2(x + 3) = 5x - 10 - 2x - 6 = 3x - 16. So the single fraction is (3x - 16)/((x + 3)(x - 2)).",
        "answerType": "expression"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Make r the subject of the formula V = (1/3)πr^2h.",
        "marks": 3,
        "answer": "r = sqrt(3V/(πh))",
        "solution": "Multiply both sides by 3: 3V = πr^2h. Divide by πh: r^2 = 3V/(πh). Take the positive square root: r = sqrt(3V/(πh)).",
        "answerType": "expression",
        "accepted": [
          "sqrt(3V/(πh))",
          "sqrt(3V/πh)",
          "r = sqrt(3V/πh)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Given that a = -4 and b = 3, calculate the value of (3a^2 - b^3)/(a + b).",
        "marks": 3,
        "answer": "-21",
        "solution": "3a^2 = 3(-4)^2 = 48 and b^3 = 3^3 = 27. The numerator is 48 - 27 = 21 and the denominator is -4 + 3 = -1. The value is -21.",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q2-v7",
    "question_number": 2,
    "section": "I",
    "marks": 9,
    "topic": "Algebra and measurement",
    "design": "Q2-C expansion, factorising by grouping and an inequality",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Expand and simplify (3x - 2)(x + 5) - 4(x^2 - 1).",
        "marks": 3,
        "answer": "-1x^2 + 13x - 6",
        "solution": "(3x - 2)(x + 5) = 3x^2 + 15x - 2x - 10 = 3x^2 + 13x - 10. Also -4(x^2 - 1) = -4x^2 + 4. Adding gives -1x^2 + 13x - 6.",
        "answerType": "expression"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Factorise completely: 4ab - 6a + 10b - 15",
        "marks": 2,
        "answer": "(10b - 15)(0.4a + 1)",
        "solution": "Group the terms: 0.4a(10b - 15) + 1(10b - 15) = (10b - 15)(0.4a + 1).",
        "answerType": "expression",
        "requiredForm": "factorised"
      },
      {
        "id": "c1",
        "label": "(c) (i)",
        "prompt": "Solve the inequality 3(x - 2) < x + 8.",
        "marks": 2,
        "answer": "x < 7",
        "solution": "3x - 6 < x + 8, so 2x < 14 and x < 7.",
        "answerType": "expression",
        "accepted": [
          "x<7",
          "< 7"
        ]
      },
      {
        "id": "c2",
        "label": "(c) (ii)",
        "prompt": "State the GREATEST integer value of x that satisfies the inequality.",
        "marks": 2,
        "answer": "6",
        "solution": "x must be strictly less than 7, so the greatest integer is 6."
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q2-v8",
    "question_number": 2,
    "section": "I",
    "marks": 9,
    "topic": "Algebra and measurement",
    "design": "Q2-C expansion, factorising by grouping and an inequality",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Expand and simplify (2x - 3)(x + 4) - 3(x^2 - 1).",
        "marks": 3,
        "answer": "-1x^2 + 5x - 9",
        "solution": "(2x - 3)(x + 4) = 2x^2 + 8x - 3x - 12 = 2x^2 + 5x - 12. Also -3(x^2 - 1) = -3x^2 + 3. Adding gives -1x^2 + 5x - 9.",
        "answerType": "expression"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Factorise completely: 6ab - 9a + 4b - 6",
        "marks": 2,
        "answer": "(4b - 6)(1.5a + 1)",
        "solution": "Group the terms: 1.5a(4b - 6) + 1(4b - 6) = (4b - 6)(1.5a + 1).",
        "answerType": "expression",
        "requiredForm": "factorised"
      },
      {
        "id": "c1",
        "label": "(c) (i)",
        "prompt": "Solve the inequality 4(x - 3) < x + 9.",
        "marks": 2,
        "answer": "x < 7",
        "solution": "4x - 12 < x + 9, so 3x < 21 and x < 7.",
        "answerType": "expression",
        "accepted": [
          "x<7",
          "< 7"
        ]
      },
      {
        "id": "c2",
        "label": "(c) (ii)",
        "prompt": "State the GREATEST integer value of x that satisfies the inequality.",
        "marks": 2,
        "answer": "6",
        "solution": "x must be strictly less than 7, so the greatest integer is 6."
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q2-v9",
    "question_number": 2,
    "section": "I",
    "marks": 9,
    "topic": "Algebra and measurement",
    "design": "Q2-D simultaneous equations in context",
    "stem": "At a school store, 3 notebooks and 2 pens cost $32.00, while 5 notebooks and 4 pens cost $58.00. The cost of one notebook is $x and the cost of one pen is $y.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write TWO equations in x and y to represent the information given.",
        "marks": 2,
        "answer": "3x + 2y = 32; 5x + 4y = 58",
        "solution": "From the first purchase, 3x + 2y = 32. From the second, 5x + 4y = 58.",
        "answerType": "expression",
        "accepted": [
          "3x+2y=32, 5x+4y=58"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Solve the equations to find the cost of one notebook and the cost of one pen.",
        "marks": 5,
        "answer": "notebook $6.00, pen $7.00",
        "solution": "Multiply the first equation by 5 and the second by 3 to eliminate x, or use substitution. Solving gives x = 6 and y = 7. Check: 3(6) + 2(7) = 32 and 5(6) + 4(7) = 58.",
        "accepted": [
          "x = 6, y = 7",
          "6, 7",
          "(6, 7)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the total cost of 6 notebooks and 5 pens.",
        "marks": 2,
        "answer": "71",
        "solution": "Total = 6(6) + 5(7) = $71.00.",
        "prefix": "$",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q2-v10",
    "question_number": 2,
    "section": "I",
    "marks": 9,
    "topic": "Algebra and measurement",
    "design": "Q2-D simultaneous equations in context",
    "stem": "At a school store, 4 cups and 3 plates cost $41.00, while 2 cups and 5 plates cost $45.00. The cost of one cup is $x and the cost of one plate is $y.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write TWO equations in x and y to represent the information given.",
        "marks": 2,
        "answer": "4x + 3y = 41; 2x + 5y = 45",
        "solution": "From the first purchase, 4x + 3y = 41. From the second, 2x + 5y = 45.",
        "answerType": "expression",
        "accepted": [
          "4x+3y=41, 2x+5y=45"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Solve the equations to find the cost of one cup and the cost of one plate.",
        "marks": 5,
        "answer": "cup $5.00, plate $7.00",
        "solution": "Multiply the first equation by 2 and the second by 4 to eliminate x, or use substitution. Solving gives x = 5 and y = 7. Check: 4(5) + 3(7) = 41 and 2(5) + 5(7) = 45.",
        "accepted": [
          "x = 5, y = 7",
          "5, 7",
          "(5, 7)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the total cost of 6 cups and 5 plates.",
        "marks": 2,
        "answer": "65",
        "solution": "Total = 6(5) + 5(7) = $65.00.",
        "prefix": "$",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q3-v1",
    "question_number": 3,
    "section": "I",
    "marks": 9,
    "topic": "Geometry and transformations",
    "design": "Q3-A reflection described, translation, and a slant length",
    "stem": "Triangle P has vertices A(1, 1), B(5, 1) and C(1, 4). The diagram below shows triangle P and its image, triangle Q, on a square grid.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Describe FULLY the single transformation that maps triangle P onto triangle Q.",
        "marks": 3,
        "answer": "A reflection in the x-axis (y = 0)",
        "solution": "Each vertex keeps one coordinate and the other changes sign: (1, 1) maps to (1, -1), (5, 1) to (5, -1) and (1, 4) to (1, -4). That is a reflection in the x-axis.",
        "answerType": "text",
        "accepted": [
          "reflection in the x-axis",
          "reflection in y = 0",
          "reflection y = 0"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Triangle P is mapped onto triangle R by a translation with vector (-6, 2). State the coordinates of the THREE vertices of triangle R.",
        "marks": 3,
        "answer": "(-5, 3); (-1, 3); (-5, 6)",
        "solution": "Add the translation vector to each vertex: (1, 1) + (-6, 2) = (-5, 3); (5, 1) + (-6, 2) = (-1, 3); (1, 4) + (-6, 2) = (-5, 6).",
        "answerType": "ordered",
        "accepted": [
          "(-5, 3), (-1, 3), (-5, 6)",
          "(-5,3) (-1,3) (-5,6)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the length of BC, giving your answer correct to 2 decimal places.",
        "marks": 3,
        "answer": "5.00",
        "solution": "Length = sqrt[(1 - 5)^2 + (4 - 1)^2] = sqrt(25) = 5.00 units.",
        "suffix": " units",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 322 424\" width=\"100%\" style=\"max-width:322px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M42.0 382.0 L42.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M76.0 382.0 L76.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M110.0 382.0 L110.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M144.0 382.0 L144.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M178.0 382.0 L178.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M212.0 382.0 L212.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M246.0 382.0 L246.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M280.0 382.0 L280.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 382.0 L280.0 382.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 348.0 L280.0 348.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 314.0 L280.0 314.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 280.0 L280.0 280.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 246.0 L280.0 246.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 212.0 L280.0 212.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 178.0 L280.0 178.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 144.0 L280.0 144.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 110.0 L280.0 110.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 76.0 L280.0 76.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 42.0 L280.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M26.0 212.0 L292.4 212.0\" stroke-width=\"1.8\"/><path d=\"M300.0 212.0 L291.5 217.3 L291.5 206.7 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M76.0 398.0 L76.0 29.6\" stroke-width=\"1.8\"/><path d=\"M76.0 22.0 L81.3 30.5 L70.7 30.5 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M110.0 178.0 L246.0 178.0 L110.0 76.0 Z\" stroke-width=\"2\"/><text x=\"155.3\" y=\"144.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">P</text><path d=\"M110.0 246.0 L246.0 246.0 L110.0 348.0 Z\" stroke-width=\"2\"/><text x=\"155.3\" y=\"280.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">Q</text><text x=\"42.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"110.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"144.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"178.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"212.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"246.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"280.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"68.0\" y=\"382.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-5</text><text x=\"68.0\" y=\"348.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-4</text><text x=\"68.0\" y=\"314.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-3</text><text x=\"68.0\" y=\"280.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-2</text><text x=\"68.0\" y=\"246.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"68.0\" y=\"178.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"68.0\" y=\"144.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"68.0\" y=\"110.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"68.0\" y=\"76.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"68.0\" y=\"42.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"302.0\" y=\"217.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">x</text><text x=\"70.0\" y=\"18.0\" text-anchor=\"end\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y</text></svg>",
      "alt": "A square grid showing triangle P with vertices (1, 1), (5, 1) and (1, 4), and triangle Q with vertices (1, -1), (5, -1) and (1, -4)."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q3-v2",
    "question_number": 3,
    "section": "I",
    "marks": 9,
    "topic": "Geometry and transformations",
    "design": "Q3-A reflection described, translation, and a slant length",
    "stem": "Triangle P has vertices A(2, 2), B(6, 2) and C(2, 5). The diagram below shows triangle P and its image, triangle Q, on a square grid.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Describe FULLY the single transformation that maps triangle P onto triangle Q.",
        "marks": 3,
        "answer": "A reflection in the y-axis (x = 0)",
        "solution": "Each vertex keeps one coordinate and the other changes sign: (2, 2) maps to (-2, 2), (6, 2) to (-6, 2) and (2, 5) to (-2, 5). That is a reflection in the y-axis.",
        "answerType": "text",
        "accepted": [
          "reflection in the y-axis",
          "reflection in x = 0",
          "reflection x = 0"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Triangle P is mapped onto triangle R by a translation with vector (3, -7). State the coordinates of the THREE vertices of triangle R.",
        "marks": 3,
        "answer": "(5, -5); (9, -5); (5, -2)",
        "solution": "Add the translation vector to each vertex: (2, 2) + (3, -7) = (5, -5); (6, 2) + (3, -7) = (9, -5); (2, 5) + (3, -7) = (5, -2).",
        "answerType": "ordered",
        "accepted": [
          "(5, -5), (9, -5), (5, -2)",
          "(5,-5) (9,-5) (5,-2)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the length of BC, giving your answer correct to 2 decimal places.",
        "marks": 3,
        "answer": "5.00",
        "solution": "Length = sqrt[(2 - 6)^2 + (5 - 2)^2] = sqrt(25) = 5.00 units.",
        "suffix": " units",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 560 322\" width=\"100%\" style=\"max-width:430px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M42.0 280.0 L42.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M76.0 280.0 L76.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M110.0 280.0 L110.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M144.0 280.0 L144.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M178.0 280.0 L178.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M212.0 280.0 L212.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M246.0 280.0 L246.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M280.0 280.0 L280.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M314.0 280.0 L314.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M348.0 280.0 L348.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M382.0 280.0 L382.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M416.0 280.0 L416.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M450.0 280.0 L450.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M484.0 280.0 L484.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M518.0 280.0 L518.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 280.0 L518.0 280.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 246.0 L518.0 246.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 212.0 L518.0 212.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 178.0 L518.0 178.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 144.0 L518.0 144.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 110.0 L518.0 110.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 76.0 L518.0 76.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 42.0 L518.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M26.0 246.0 L530.4 246.0\" stroke-width=\"1.8\"/><path d=\"M538.0 246.0 L529.5 251.3 L529.5 240.7 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M280.0 296.0 L280.0 29.6\" stroke-width=\"1.8\"/><path d=\"M280.0 22.0 L285.3 30.5 L274.7 30.5 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M348.0 178.0 L484.0 178.0 L348.0 76.0 Z\" stroke-width=\"2\"/><text x=\"393.3\" y=\"144.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">P</text><path d=\"M212.0 178.0 L76.0 178.0 L212.0 76.0 Z\" stroke-width=\"2\"/><text x=\"166.7\" y=\"144.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">Q</text><text x=\"42.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-7</text><text x=\"76.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-6</text><text x=\"110.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-5</text><text x=\"144.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-4</text><text x=\"178.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-3</text><text x=\"212.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-2</text><text x=\"246.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"314.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"348.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"382.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"416.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"450.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"484.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"518.0\" y=\"262.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">7</text><text x=\"272.0\" y=\"280.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"272.0\" y=\"212.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"272.0\" y=\"178.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"272.0\" y=\"144.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"272.0\" y=\"110.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"272.0\" y=\"76.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"272.0\" y=\"42.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"540.0\" y=\"251.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">x</text><text x=\"274.0\" y=\"18.0\" text-anchor=\"end\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y</text></svg>",
      "alt": "A square grid showing triangle P with vertices (2, 2), (6, 2) and (2, 5), and triangle Q with vertices (-2, 2), (-6, 2) and (-2, 5)."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q3-v3",
    "question_number": 3,
    "section": "I",
    "marks": 9,
    "topic": "Geometry and transformations",
    "design": "Q3-A reflection described, translation, and a slant length",
    "stem": "Triangle P has vertices A(1, 2), B(4, 2) and C(1, 6). The diagram below shows triangle P and its image, triangle Q, on a square grid.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Describe FULLY the single transformation that maps triangle P onto triangle Q.",
        "marks": 3,
        "answer": "A reflection in the x-axis (y = 0)",
        "solution": "Each vertex keeps one coordinate and the other changes sign: (1, 2) maps to (1, -2), (4, 2) to (4, -2) and (1, 6) to (1, -6). That is a reflection in the x-axis.",
        "answerType": "text",
        "accepted": [
          "reflection in the x-axis",
          "reflection in y = 0",
          "reflection y = 0"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Triangle P is mapped onto triangle R by a translation with vector (-5, -1). State the coordinates of the THREE vertices of triangle R.",
        "marks": 3,
        "answer": "(-4, 1); (-1, 1); (-4, 5)",
        "solution": "Add the translation vector to each vertex: (1, 2) + (-5, -1) = (-4, 1); (4, 2) + (-5, -1) = (-1, 1); (1, 6) + (-5, -1) = (-4, 5).",
        "answerType": "ordered",
        "accepted": [
          "(-4, 1), (-1, 1), (-4, 5)",
          "(-4,1) (-1,1) (-4,5)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the length of BC, giving your answer correct to 2 decimal places.",
        "marks": 3,
        "answer": "5.00",
        "solution": "Length = sqrt[(1 - 4)^2 + (6 - 2)^2] = sqrt(25) = 5.00 units.",
        "suffix": " units",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 288 560\" width=\"100%\" style=\"max-width:288px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M42.0 518.0 L42.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M76.0 518.0 L76.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M110.0 518.0 L110.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M144.0 518.0 L144.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M178.0 518.0 L178.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M212.0 518.0 L212.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M246.0 518.0 L246.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 518.0 L246.0 518.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 484.0 L246.0 484.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 450.0 L246.0 450.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 416.0 L246.0 416.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 382.0 L246.0 382.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 348.0 L246.0 348.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 314.0 L246.0 314.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 280.0 L246.0 280.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 246.0 L246.0 246.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 212.0 L246.0 212.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 178.0 L246.0 178.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 144.0 L246.0 144.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 110.0 L246.0 110.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 76.0 L246.0 76.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 42.0 L246.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M26.0 280.0 L258.4 280.0\" stroke-width=\"1.8\"/><path d=\"M266.0 280.0 L257.5 285.3 L257.5 274.7 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M76.0 534.0 L76.0 29.6\" stroke-width=\"1.8\"/><path d=\"M76.0 22.0 L81.3 30.5 L70.7 30.5 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M110.0 212.0 L212.0 212.0 L110.0 76.0 Z\" stroke-width=\"2\"/><text x=\"144.0\" y=\"166.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">P</text><path d=\"M110.0 348.0 L212.0 348.0 L110.0 484.0 Z\" stroke-width=\"2\"/><text x=\"144.0\" y=\"393.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">Q</text><text x=\"42.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"110.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"144.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"178.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"212.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"246.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"68.0\" y=\"518.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-7</text><text x=\"68.0\" y=\"484.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-6</text><text x=\"68.0\" y=\"450.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-5</text><text x=\"68.0\" y=\"416.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-4</text><text x=\"68.0\" y=\"382.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-3</text><text x=\"68.0\" y=\"348.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-2</text><text x=\"68.0\" y=\"314.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"68.0\" y=\"246.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"68.0\" y=\"212.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"68.0\" y=\"178.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"68.0\" y=\"144.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"68.0\" y=\"110.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"68.0\" y=\"76.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"68.0\" y=\"42.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">7</text><text x=\"268.0\" y=\"285.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">x</text><text x=\"70.0\" y=\"18.0\" text-anchor=\"end\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y</text></svg>",
      "alt": "A square grid showing triangle P with vertices (1, 2), (4, 2) and (1, 6), and triangle Q with vertices (1, -2), (4, -2) and (1, -6)."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q3-v4",
    "question_number": 3,
    "section": "I",
    "marks": 9,
    "topic": "Geometry and transformations",
    "design": "Q3-B enlargement about the origin and the area scale factor",
    "stem": "The diagram below shows triangle A and its image, triangle B, on a square grid.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Describe FULLY the single transformation that maps triangle A onto triangle B.",
        "marks": 3,
        "answer": "An enlargement, centre the origin (0, 0), with scale factor 3",
        "solution": "Every image coordinate is 3 times the corresponding object coordinate: (1, 1) maps to (3, 3). The origin is the only point that does not move, so it is an enlargement of scale factor 3 about (0, 0).",
        "answerType": "text",
        "accepted": [
          "enlargement centre (0,0) scale factor 3",
          "enlargement, centre origin, scale factor 3"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the area of triangle A.",
        "marks": 3,
        "answer": "3",
        "solution": "Using the base and perpendicular height read from the grid, area = 1/2 × 2 × 3 = 3 square units.",
        "suffix": " square units",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Hence calculate the area of triangle B, without measuring it.",
        "marks": 3,
        "answer": "27",
        "solution": "Under an enlargement of scale factor k the area is multiplied by k^2. Area of B = 3^2 × 3 = 27 square units.",
        "suffix": " square units",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 458 560\" width=\"100%\" style=\"max-width:430px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M42.0 518.0 L42.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M76.0 518.0 L76.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M110.0 518.0 L110.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M144.0 518.0 L144.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M178.0 518.0 L178.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M212.0 518.0 L212.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M246.0 518.0 L246.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M280.0 518.0 L280.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M314.0 518.0 L314.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M348.0 518.0 L348.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M382.0 518.0 L382.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M416.0 518.0 L416.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 518.0 L416.0 518.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 484.0 L416.0 484.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 450.0 L416.0 450.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 416.0 L416.0 416.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 382.0 L416.0 382.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 348.0 L416.0 348.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 314.0 L416.0 314.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 280.0 L416.0 280.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 246.0 L416.0 246.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 212.0 L416.0 212.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 178.0 L416.0 178.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 144.0 L416.0 144.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 110.0 L416.0 110.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 76.0 L416.0 76.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 42.0 L416.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M26.0 484.0 L428.4 484.0\" stroke-width=\"1.8\"/><path d=\"M436.0 484.0 L427.5 489.3 L427.5 478.7 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M76.0 534.0 L76.0 29.6\" stroke-width=\"1.8\"/><path d=\"M76.0 22.0 L81.3 30.5 L70.7 30.5 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M110.0 450.0 L178.0 450.0 L110.0 348.0 Z\" stroke-width=\"2\"/><text x=\"132.7\" y=\"416.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">A</text><path d=\"M178.0 382.0 L382.0 382.0 L178.0 76.0 Z\" stroke-width=\"2\"/><text x=\"246.0\" y=\"280.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">B</text><text x=\"42.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"110.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"144.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"178.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"212.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"246.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"280.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"314.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">7</text><text x=\"348.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">8</text><text x=\"382.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">9</text><text x=\"416.0\" y=\"500.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">10</text><text x=\"68.0\" y=\"518.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"68.0\" y=\"450.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"68.0\" y=\"416.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"68.0\" y=\"382.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"68.0\" y=\"348.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"68.0\" y=\"314.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"68.0\" y=\"280.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"68.0\" y=\"246.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">7</text><text x=\"68.0\" y=\"212.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">8</text><text x=\"68.0\" y=\"178.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">9</text><text x=\"68.0\" y=\"144.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">10</text><text x=\"68.0\" y=\"110.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">11</text><text x=\"68.0\" y=\"76.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">12</text><text x=\"68.0\" y=\"42.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">13</text><text x=\"438.0\" y=\"489.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">x</text><text x=\"70.0\" y=\"18.0\" text-anchor=\"end\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y</text></svg>",
      "alt": "A square grid showing triangle A with vertices (1, 1), (3, 1) and (1, 4), and triangle B with vertices (3, 3), (9, 3) and (3, 12)."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q3-v5",
    "question_number": 3,
    "section": "I",
    "marks": 9,
    "topic": "Geometry and transformations",
    "design": "Q3-B enlargement about the origin and the area scale factor",
    "stem": "The diagram below shows triangle A and its image, triangle B, on a square grid.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Describe FULLY the single transformation that maps triangle A onto triangle B.",
        "marks": 3,
        "answer": "An enlargement, centre the origin (0, 0), with scale factor 2",
        "solution": "Every image coordinate is 2 times the corresponding object coordinate: (1, 2) maps to (2, 4). The origin is the only point that does not move, so it is an enlargement of scale factor 2 about (0, 0).",
        "answerType": "text",
        "accepted": [
          "enlargement centre (0,0) scale factor 2",
          "enlargement, centre origin, scale factor 2"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the area of triangle A.",
        "marks": 3,
        "answer": "3",
        "solution": "Using the base and perpendicular height read from the grid, area = 1/2 × 3 × 2 = 3 square units.",
        "suffix": " square units",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Hence calculate the area of triangle B, without measuring it.",
        "marks": 3,
        "answer": "12",
        "solution": "Under an enlargement of scale factor k the area is multiplied by k^2. Area of B = 2^2 × 3 = 12 square units.",
        "suffix": " square units",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 424 424\" width=\"100%\" style=\"max-width:424px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M42.0 382.0 L42.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M76.0 382.0 L76.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M110.0 382.0 L110.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M144.0 382.0 L144.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M178.0 382.0 L178.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M212.0 382.0 L212.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M246.0 382.0 L246.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M280.0 382.0 L280.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M314.0 382.0 L314.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M348.0 382.0 L348.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M382.0 382.0 L382.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 382.0 L382.0 382.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 348.0 L382.0 348.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 314.0 L382.0 314.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 280.0 L382.0 280.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 246.0 L382.0 246.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 212.0 L382.0 212.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 178.0 L382.0 178.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 144.0 L382.0 144.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 110.0 L382.0 110.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 76.0 L382.0 76.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 42.0 L382.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M26.0 348.0 L394.4 348.0\" stroke-width=\"1.8\"/><path d=\"M402.0 348.0 L393.5 353.3 L393.5 342.7 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M76.0 398.0 L76.0 29.6\" stroke-width=\"1.8\"/><path d=\"M76.0 22.0 L81.3 30.5 L70.7 30.5 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M110.0 280.0 L212.0 280.0 L110.0 212.0 Z\" stroke-width=\"2\"/><text x=\"144.0\" y=\"257.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">A</text><path d=\"M144.0 212.0 L348.0 212.0 L144.0 76.0 Z\" stroke-width=\"2\"/><text x=\"212.0\" y=\"166.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">B</text><text x=\"42.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"110.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"144.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"178.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"212.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"246.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"280.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"314.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">7</text><text x=\"348.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">8</text><text x=\"382.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">9</text><text x=\"68.0\" y=\"382.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"68.0\" y=\"314.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"68.0\" y=\"280.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"68.0\" y=\"246.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"68.0\" y=\"212.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"68.0\" y=\"178.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"68.0\" y=\"144.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"68.0\" y=\"110.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">7</text><text x=\"68.0\" y=\"76.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">8</text><text x=\"68.0\" y=\"42.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">9</text><text x=\"404.0\" y=\"353.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">x</text><text x=\"70.0\" y=\"18.0\" text-anchor=\"end\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y</text></svg>",
      "alt": "A square grid showing triangle A with vertices (1, 2), (4, 2) and (1, 4), and triangle B with vertices (2, 4), (8, 4) and (2, 8)."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q3-v6",
    "question_number": 3,
    "section": "I",
    "marks": 9,
    "topic": "Geometry and transformations",
    "design": "Q3-B enlargement about the origin and the area scale factor",
    "stem": "The diagram below shows triangle A and its image, triangle B, on a square grid.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Describe FULLY the single transformation that maps triangle A onto triangle B.",
        "marks": 3,
        "answer": "An enlargement, centre the origin (0, 0), with scale factor 2",
        "solution": "Every image coordinate is 2 times the corresponding object coordinate: (2, 1) maps to (4, 2). The origin is the only point that does not move, so it is an enlargement of scale factor 2 about (0, 0).",
        "answerType": "text",
        "accepted": [
          "enlargement centre (0,0) scale factor 2",
          "enlargement, centre origin, scale factor 2"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the area of triangle A.",
        "marks": 3,
        "answer": "3",
        "solution": "Using the base and perpendicular height read from the grid, area = 1/2 × 2 × 3 = 3 square units.",
        "suffix": " square units",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Hence calculate the area of triangle B, without measuring it.",
        "marks": 3,
        "answer": "12",
        "solution": "Under an enlargement of scale factor k the area is multiplied by k^2. Area of B = 2^2 × 3 = 12 square units.",
        "suffix": " square units",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 424 424\" width=\"100%\" style=\"max-width:424px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M42.0 382.0 L42.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M76.0 382.0 L76.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M110.0 382.0 L110.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M144.0 382.0 L144.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M178.0 382.0 L178.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M212.0 382.0 L212.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M246.0 382.0 L246.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M280.0 382.0 L280.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M314.0 382.0 L314.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M348.0 382.0 L348.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M382.0 382.0 L382.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 382.0 L382.0 382.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 348.0 L382.0 348.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 314.0 L382.0 314.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 280.0 L382.0 280.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 246.0 L382.0 246.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 212.0 L382.0 212.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 178.0 L382.0 178.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 144.0 L382.0 144.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 110.0 L382.0 110.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 76.0 L382.0 76.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 42.0 L382.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M26.0 348.0 L394.4 348.0\" stroke-width=\"1.8\"/><path d=\"M402.0 348.0 L393.5 353.3 L393.5 342.7 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M76.0 398.0 L76.0 29.6\" stroke-width=\"1.8\"/><path d=\"M76.0 22.0 L81.3 30.5 L70.7 30.5 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M144.0 314.0 L212.0 314.0 L144.0 212.0 Z\" stroke-width=\"2\"/><text x=\"166.7\" y=\"280.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">A</text><path d=\"M212.0 280.0 L348.0 280.0 L212.0 76.0 Z\" stroke-width=\"2\"/><text x=\"257.3\" y=\"212.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">B</text><text x=\"42.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"110.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"144.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"178.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"212.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"246.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"280.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"314.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">7</text><text x=\"348.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">8</text><text x=\"382.0\" y=\"364.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">9</text><text x=\"68.0\" y=\"382.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"68.0\" y=\"314.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"68.0\" y=\"280.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"68.0\" y=\"246.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"68.0\" y=\"212.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"68.0\" y=\"178.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"68.0\" y=\"144.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"68.0\" y=\"110.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">7</text><text x=\"68.0\" y=\"76.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">8</text><text x=\"68.0\" y=\"42.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">9</text><text x=\"404.0\" y=\"353.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">x</text><text x=\"70.0\" y=\"18.0\" text-anchor=\"end\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y</text></svg>",
      "alt": "A square grid showing triangle A with vertices (2, 1), (4, 1) and (2, 4), and triangle B with vertices (4, 2), (8, 2) and (4, 8)."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q3-v7",
    "question_number": 3,
    "section": "I",
    "marks": 9,
    "topic": "Geometry and transformations",
    "design": "Q3-C rotation about the origin stated as a rule and applied",
    "stem": "The diagram below shows triangle T on a square grid.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Triangle T is rotated through 90° clockwise about the origin. State the rule that maps a point (x, y) onto its image under this rotation.",
        "marks": 2,
        "answer": "(x, y) maps to (y, -x)",
        "solution": "A quarter turn clockwise about O interchanges the coordinates and changes one sign: (x, y) maps to (y, -x).",
        "answerType": "text",
        "accepted": [
          "(x, y) -> (y, -x)",
          "(x, y) -> (y, -x)"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the coordinates of the images of the three vertices of triangle T under this rotation.",
        "marks": 4,
        "answer": "(1, -2); (1, -6); (4, -2)",
        "solution": "Applying the rule to each vertex: (2, 1) -> (1, -2); (6, 1) -> (1, -6); (2, 4) -> (4, -2).",
        "answerType": "ordered",
        "accepted": [
          "(1, -2), (1, -6), (4, -2)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the coordinates of the image of the MIDPOINT of the side joining (2, 1) and (6, 1) under the same rotation.",
        "marks": 3,
        "answer": "(1, -4)",
        "solution": "The midpoint is ((2 + 6)/2, (1 + 1)/2) = (4, 1). Applying the rule gives (1, -4). A rotation maps the midpoint of a side onto the midpoint of the image of that side.",
        "answerType": "coordinate"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 356 492\" width=\"100%\" style=\"max-width:356px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M42.0 450.0 L42.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M76.0 450.0 L76.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M110.0 450.0 L110.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M144.0 450.0 L144.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M178.0 450.0 L178.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M212.0 450.0 L212.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M246.0 450.0 L246.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M280.0 450.0 L280.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M314.0 450.0 L314.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 450.0 L314.0 450.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 416.0 L314.0 416.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 382.0 L314.0 382.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 348.0 L314.0 348.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 314.0 L314.0 314.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 280.0 L314.0 280.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 246.0 L314.0 246.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 212.0 L314.0 212.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 178.0 L314.0 178.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 144.0 L314.0 144.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 110.0 L314.0 110.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 76.0 L314.0 76.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 42.0 L314.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M26.0 212.0 L326.4 212.0\" stroke-width=\"1.8\"/><path d=\"M334.0 212.0 L325.5 217.3 L325.5 206.7 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M76.0 466.0 L76.0 29.6\" stroke-width=\"1.8\"/><path d=\"M76.0 22.0 L81.3 30.5 L70.7 30.5 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M144.0 178.0 L280.0 178.0 L144.0 76.0 Z\" stroke-width=\"2\"/><text x=\"189.3\" y=\"144.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">T</text><text x=\"42.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"110.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"144.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"178.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"212.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"246.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"280.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"314.0\" y=\"228.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">7</text><text x=\"68.0\" y=\"450.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-7</text><text x=\"68.0\" y=\"416.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-6</text><text x=\"68.0\" y=\"382.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-5</text><text x=\"68.0\" y=\"348.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-4</text><text x=\"68.0\" y=\"314.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-3</text><text x=\"68.0\" y=\"280.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-2</text><text x=\"68.0\" y=\"246.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"68.0\" y=\"178.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"68.0\" y=\"144.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"68.0\" y=\"110.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"68.0\" y=\"76.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"68.0\" y=\"42.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"336.0\" y=\"217.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">x</text><text x=\"70.0\" y=\"18.0\" text-anchor=\"end\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y</text></svg>",
      "alt": "A square grid showing triangle T with vertices (2, 1), (6, 1) and (2, 4)."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q3-v8",
    "question_number": 3,
    "section": "I",
    "marks": 9,
    "topic": "Geometry and transformations",
    "design": "Q3-C rotation about the origin stated as a rule and applied",
    "stem": "The diagram below shows triangle T on a square grid.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Triangle T is rotated through 90° anticlockwise about the origin. State the rule that maps a point (x, y) onto its image under this rotation.",
        "marks": 2,
        "answer": "(x, y) maps to (-y, x)",
        "solution": "A quarter turn anticlockwise about O interchanges the coordinates and changes one sign: (x, y) maps to (-y, x).",
        "answerType": "text",
        "accepted": [
          "(x, y) -> (-y, x)",
          "(x, y) -> (-y, x)"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the coordinates of the images of the three vertices of triangle T under this rotation.",
        "marks": 4,
        "answer": "(-2, 1); (-2, 5); (-6, 1)",
        "solution": "Applying the rule to each vertex: (1, 2) -> (-2, 1); (5, 2) -> (-2, 5); (1, 6) -> (-6, 1).",
        "answerType": "ordered",
        "accepted": [
          "(-2, 1), (-2, 5), (-6, 1)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the coordinates of the image of the MIDPOINT of the side joining (1, 2) and (5, 2) under the same rotation.",
        "marks": 3,
        "answer": "(-2, 3)",
        "solution": "The midpoint is ((1 + 5)/2, (2 + 2)/2) = (3, 2). Applying the rule gives (-2, 3). A rotation maps the midpoint of a side onto the midpoint of the image of that side.",
        "answerType": "coordinate"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 526 356\" width=\"100%\" style=\"max-width:430px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M42.0 314.0 L42.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M76.0 314.0 L76.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M110.0 314.0 L110.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M144.0 314.0 L144.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M178.0 314.0 L178.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M212.0 314.0 L212.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M246.0 314.0 L246.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M280.0 314.0 L280.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M314.0 314.0 L314.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M348.0 314.0 L348.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M382.0 314.0 L382.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M416.0 314.0 L416.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M450.0 314.0 L450.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M484.0 314.0 L484.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 314.0 L484.0 314.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 280.0 L484.0 280.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 246.0 L484.0 246.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 212.0 L484.0 212.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 178.0 L484.0 178.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 144.0 L484.0 144.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 110.0 L484.0 110.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 76.0 L484.0 76.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M42.0 42.0 L484.0 42.0\" stroke-width=\"0.5\" opacity=\"0.4\"/><path d=\"M26.0 280.0 L496.4 280.0\" stroke-width=\"1.8\"/><path d=\"M504.0 280.0 L495.5 285.3 L495.5 274.7 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M280.0 330.0 L280.0 29.6\" stroke-width=\"1.8\"/><path d=\"M280.0 22.0 L285.3 30.5 L274.7 30.5 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M314.0 212.0 L450.0 212.0 L314.0 76.0 Z\" stroke-width=\"2\"/><text x=\"359.3\" y=\"166.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"14\" font-style=\"italic\">T</text><text x=\"42.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-7</text><text x=\"76.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-6</text><text x=\"110.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-5</text><text x=\"144.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-4</text><text x=\"178.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-3</text><text x=\"212.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-2</text><text x=\"246.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"314.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"348.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"382.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"416.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"450.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"484.0\" y=\"296.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"272.0\" y=\"314.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"272.0\" y=\"246.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"272.0\" y=\"212.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"272.0\" y=\"178.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"272.0\" y=\"144.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"272.0\" y=\"110.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"272.0\" y=\"76.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"272.0\" y=\"42.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">7</text><text x=\"506.0\" y=\"285.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">x</text><text x=\"274.0\" y=\"18.0\" text-anchor=\"end\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y</text></svg>",
      "alt": "A square grid showing triangle T with vertices (1, 2), (5, 2) and (1, 6)."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q3-v9",
    "question_number": 3,
    "section": "I",
    "marks": 9,
    "topic": "Geometry and transformations",
    "design": "Q3-D ruler-and-compasses construction with measurement",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Using a ruler, a pencil and a pair of compasses only, construct triangle PQR in which PQ = 8 cm, angle PQR = 60° and QR = 6 cm. Credit will be given for clearly visible construction arcs.",
        "marks": 4,
        "answer": "A correct construction of triangle PQR",
        "solution": "Draw PQ = 8 cm. At Q construct an angle of 60° using compass arcs only (an equilateral-triangle arc gives 60°). Mark R on that arm with QR = 6 cm and join PR.",
        "answerType": "text",
        "accepted": [
          "construction",
          "constructed",
          "done"
        ],
        "responseSchema": {
          "type": "construction_triangle",
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "target": {
            "pq": 8,
            "qr": 6,
            "anglePqr": 60
          },
          "tolerance": {
            "length": 0.25,
            "angle": 2.5
          },
          "criteria": [
            {
              "kind": "construction_base",
              "marks": 1
            },
            {
              "kind": "construction_angle",
              "marks": 1,
              "requireCompassEvidence": true
            },
            {
              "kind": "construction_side",
              "marks": 1
            },
            {
              "kind": "construction_complete",
              "marks": 1,
              "requireCompassEvidence": true
            }
          ]
        },
        "grading_mode": "rubric"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Measure and state the length of PR.",
        "marks": 2,
        "answer": "7.2",
        "solution": "By the cosine rule the true length is PR^2 = 8^2 + 6^2 - 2(8)(6)cos 60° = 52.00, so PR = 7.21 cm. A measurement of 7.2 cm is expected.",
        "suffix": " cm",
        "tolerance": 0.16
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the area of triangle PQR, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "20.8",
        "solution": "Area = 1/2 × PQ × QR × sin(angle PQR) = 1/2 × 8 × 6 × sin 60° = 20.8 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.051
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q3-v10",
    "question_number": 3,
    "section": "I",
    "marks": 9,
    "topic": "Geometry and transformations",
    "design": "Q3-D ruler-and-compasses construction with measurement",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Using a ruler, a pencil and a pair of compasses only, construct triangle PQR in which PQ = 9 cm, angle PQR = 90° and QR = 5 cm. Credit will be given for clearly visible construction arcs.",
        "marks": 4,
        "answer": "A correct construction of triangle PQR",
        "solution": "Draw PQ = 9 cm. At Q construct an angle of 90° using compass arcs only (a perpendicular at Q gives 90°). Mark R on that arm with QR = 5 cm and join PR.",
        "answerType": "text",
        "accepted": [
          "construction",
          "constructed",
          "done"
        ],
        "responseSchema": {
          "type": "construction_triangle",
          "allowedTools": [
            "segment",
            "circle"
          ],
          "toolPolicy": "ruler_compasses_only",
          "target": {
            "pq": 9,
            "qr": 5,
            "anglePqr": 90
          },
          "tolerance": {
            "length": 0.25,
            "angle": 2.5
          },
          "criteria": [
            {
              "kind": "construction_base",
              "marks": 1
            },
            {
              "kind": "construction_angle",
              "marks": 1,
              "requireCompassEvidence": true
            },
            {
              "kind": "construction_side",
              "marks": 1
            },
            {
              "kind": "construction_complete",
              "marks": 1,
              "requireCompassEvidence": true
            }
          ]
        },
        "grading_mode": "rubric"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Measure and state the length of PR.",
        "marks": 2,
        "answer": "10.3",
        "solution": "By the cosine rule the true length is PR^2 = 9^2 + 5^2 - 2(9)(5)cos 90° = 106.00, so PR = 10.30 cm. A measurement of 10.3 cm is expected.",
        "suffix": " cm",
        "tolerance": 0.16
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the area of triangle PQR, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "22.5",
        "solution": "Area = 1/2 × PQ × QR × sin(angle PQR) = 1/2 × 9 × 5 × sin 90° = 22.5 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.051
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q4-v1",
    "question_number": 4,
    "section": "I",
    "marks": 9,
    "topic": "Relations, functions and coordinate geometry",
    "design": "Q4-A evaluating, composite and inverse functions",
    "stem": "The functions f and g are defined by f(x) = 2x + 7 and g(x) = x^2 - 3.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Calculate the value of f(4).",
        "marks": 1,
        "answer": "15",
        "solution": "f(4) = 2(4) + 7 = 15."
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Calculate the value of fg(2).",
        "marks": 3,
        "answer": "9",
        "solution": "Apply g first: g(2) = 2^2 - 3 = 1. Then f(1) = 2(1) + 7 = 9."
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine f^-1(x), the inverse of f(x).",
        "marks": 3,
        "answer": "(x - 7)/2",
        "solution": "Let y = 2x + 7. Interchanging the variables, x = 2y + 7, so 2y = x - 7 and y = (x - 7)/2. Check: f^-1(f(1)) = 1.",
        "answerType": "expression",
        "accepted": [
          "f^-1(x) = (x - 7)/2",
          "(x-7)/2"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the value(s) of x for which g(x) = 13.",
        "marks": 2,
        "answer": "4 and -4",
        "solution": "x^2 - 3 = 13, so x^2 = 16 and x = +/-4. The two values are 4 and -4.",
        "answerType": "ordered",
        "accepted": [
          "4, -4",
          "x = 4 or x = -4",
          "+/-4"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q4-v2",
    "question_number": 4,
    "section": "I",
    "marks": 9,
    "topic": "Relations, functions and coordinate geometry",
    "design": "Q4-A evaluating, composite and inverse functions",
    "stem": "The functions f and g are defined by f(x) = 3x - 5 and g(x) = x^2 + 1.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Calculate the value of f(6).",
        "marks": 1,
        "answer": "13",
        "solution": "f(6) = 3(6) - 5 = 13."
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Calculate the value of fg(3).",
        "marks": 3,
        "answer": "25",
        "solution": "Apply g first: g(3) = 3^2 + 1 = 10. Then f(10) = 3(10) - 5 = 25."
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine f^-1(x), the inverse of f(x).",
        "marks": 3,
        "answer": "(x + 5)/3",
        "solution": "Let y = 3x - 5. Interchanging the variables, x = 3y - 5, so 3y = x + 5 and y = (x + 5)/3. Check: f^-1(f(1)) = 1.",
        "answerType": "expression",
        "accepted": [
          "f^-1(x) = (x + 5)/3",
          "(x+5)/3"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the value(s) of x for which g(x) = 26.",
        "marks": 2,
        "answer": "5 and -5",
        "solution": "x^2 + 1 = 26, so x^2 = 25 and x = +/-5. The two values are 5 and -5.",
        "answerType": "ordered",
        "accepted": [
          "5, -5",
          "x = 5 or x = -5",
          "+/-5"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q4-v3",
    "question_number": 4,
    "section": "I",
    "marks": 9,
    "topic": "Relations, functions and coordinate geometry",
    "design": "Q4-A evaluating, composite and inverse functions",
    "stem": "The functions f and g are defined by f(x) = 4x + 3 and g(x) = x^2 - 2.",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "Calculate the value of f(2).",
        "marks": 1,
        "answer": "11",
        "solution": "f(2) = 4(2) + 3 = 11."
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Calculate the value of fg(4).",
        "marks": 3,
        "answer": "59",
        "solution": "Apply g first: g(4) = 4^2 - 2 = 14. Then f(14) = 4(14) + 3 = 59."
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine f^-1(x), the inverse of f(x).",
        "marks": 3,
        "answer": "(x - 3)/4",
        "solution": "Let y = 4x + 3. Interchanging the variables, x = 4y + 3, so 4y = x - 3 and y = (x - 3)/4. Check: f^-1(f(1)) = 1.",
        "answerType": "expression",
        "accepted": [
          "f^-1(x) = (x - 3)/4",
          "(x-3)/4"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the value(s) of x for which g(x) = 34.",
        "marks": 2,
        "answer": "6 and -6",
        "solution": "x^2 - 2 = 34, so x^2 = 36 and x = +/-6. The two values are 6 and -6.",
        "answerType": "ordered",
        "accepted": [
          "6, -6",
          "x = 6 or x = -6",
          "+/-6"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q4-v4",
    "question_number": 4,
    "section": "I",
    "marks": 9,
    "topic": "Relations, functions and coordinate geometry",
    "design": "Q4-B gradient, midpoint, length and equation from two points",
    "stem": "The points P(-2, 7) and Q(4, -5) are joined by a straight line.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the gradient of PQ.",
        "marks": 2,
        "answer": "-2",
        "solution": "Gradient = (-5 - (7))/(4 - (-2)) = -12/6 = -2.",
        "accepted": [
          "-2"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the coordinates of the midpoint of PQ.",
        "marks": 2,
        "answer": "(1, 1)",
        "solution": "Midpoint = ((-2 + 4)/2, (7 + -5)/2) = (1, 1).",
        "answerType": "coordinate"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the length of PQ, giving your answer correct to 2 decimal places.",
        "marks": 2,
        "answer": "13.42",
        "solution": "PQ = sqrt[(4 - (-2))^2 + (-5 - (7))^2] = sqrt(180) = 13.42 units.",
        "suffix": " units",
        "tolerance": 0.011
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the equation of the line PQ in the form y = mx + c.",
        "marks": 3,
        "answer": "y = -2x + 3",
        "solution": "Using y - 7 = -2(x - (-2)) and simplifying gives y = -2x + 3.",
        "answerType": "expression",
        "requiredForm": "slope_intercept",
        "accepted": [
          "y=-2x+3"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q4-v5",
    "question_number": 4,
    "section": "I",
    "marks": 9,
    "topic": "Relations, functions and coordinate geometry",
    "design": "Q4-B gradient, midpoint, length and equation from two points",
    "stem": "The points P(-3, 1) and Q(5, 7) are joined by a straight line.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the gradient of PQ.",
        "marks": 2,
        "answer": "3/4",
        "solution": "Gradient = (7 - (1))/(5 - (-3)) = 6/8 = 3/4.",
        "accepted": [
          "0.750",
          "3/4"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the coordinates of the midpoint of PQ.",
        "marks": 2,
        "answer": "(1, 4)",
        "solution": "Midpoint = ((-3 + 5)/2, (1 + 7)/2) = (1, 4).",
        "answerType": "coordinate"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the length of PQ, giving your answer correct to 2 decimal places.",
        "marks": 2,
        "answer": "10.00",
        "solution": "PQ = sqrt[(5 - (-3))^2 + (7 - (1))^2] = sqrt(100) = 10.00 units.",
        "suffix": " units",
        "tolerance": 0.011
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the equation of the line PQ in the form y = mx + c.",
        "marks": 3,
        "answer": "y = 3x/4 + 13/4",
        "solution": "Using y - 1 = 3/4(x - (-3)) and simplifying gives y = 3x/4 + 13/4.",
        "answerType": "expression",
        "requiredForm": "slope_intercept",
        "accepted": [
          "y = (3/4)x + 13/4",
          "y=(3/4)x+13/4",
          "y=3x/4+13/4"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q4-v6",
    "question_number": 4,
    "section": "I",
    "marks": 9,
    "topic": "Relations, functions and coordinate geometry",
    "design": "Q4-B gradient, midpoint, length and equation from two points",
    "stem": "The points P(1, -4) and Q(7, 8) are joined by a straight line.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the gradient of PQ.",
        "marks": 2,
        "answer": "2",
        "solution": "Gradient = (8 - (-4))/(7 - (1)) = 12/6 = 2.",
        "accepted": [
          "2"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the coordinates of the midpoint of PQ.",
        "marks": 2,
        "answer": "(4, 2)",
        "solution": "Midpoint = ((1 + 7)/2, (-4 + 8)/2) = (4, 2).",
        "answerType": "coordinate"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the length of PQ, giving your answer correct to 2 decimal places.",
        "marks": 2,
        "answer": "13.42",
        "solution": "PQ = sqrt[(7 - (1))^2 + (8 - (-4))^2] = sqrt(180) = 13.42 units.",
        "suffix": " units",
        "tolerance": 0.011
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the equation of the line PQ in the form y = mx + c.",
        "marks": 3,
        "answer": "y = 2x - 6",
        "solution": "Using y - -4 = 2(x - (1)) and simplifying gives y = 2x - 6.",
        "answerType": "expression",
        "requiredForm": "slope_intercept",
        "accepted": [
          "y=2x-6"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q4-v7",
    "question_number": 4,
    "section": "I",
    "marks": 9,
    "topic": "Relations, functions and coordinate geometry",
    "design": "Q4-C parallel and perpendicular lines with exact gradients",
    "stem": "The line L has equation y = 3x - 4. The point A has coordinates (6, 1).",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "State the gradient of any line PARALLEL to L.",
        "marks": 1,
        "answer": "3",
        "solution": "Parallel lines have equal gradients, so the gradient is 3.",
        "accepted": [
          "3"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the gradient of any line PERPENDICULAR to L, giving your answer as a fraction where appropriate.",
        "marks": 2,
        "answer": "-1/3",
        "solution": "Perpendicular gradients multiply to -1, so the gradient is -1/(3) = -1/3.",
        "accepted": [
          "-0.333",
          "-1/3"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the equation of the line through A that is PARALLEL to L, in the form y = mx + c.",
        "marks": 3,
        "answer": "y = 3x - 17",
        "solution": "Using y - (1) = 3(x - 6) gives y = 3x - 17.",
        "answerType": "expression",
        "requiredForm": "slope_intercept",
        "accepted": [
          "y=3x-17"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the equation of the line through A that is PERPENDICULAR to L, in the form y = mx + c.",
        "marks": 3,
        "answer": "y = -x/3 + 3",
        "solution": "Using y - (1) = -1/3(x - 6) gives y = -x/3 + 3.",
        "answerType": "expression",
        "requiredForm": "slope_intercept",
        "accepted": [
          "y = (-1/3)x + 3",
          "y=(-1/3)x+3",
          "y=-x/3+3"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q4-v8",
    "question_number": 4,
    "section": "I",
    "marks": 9,
    "topic": "Relations, functions and coordinate geometry",
    "design": "Q4-C parallel and perpendicular lines with exact gradients",
    "stem": "The line L has equation y = -2x + 5. The point A has coordinates (4, 1).",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "State the gradient of any line PARALLEL to L.",
        "marks": 1,
        "answer": "-2",
        "solution": "Parallel lines have equal gradients, so the gradient is -2.",
        "accepted": [
          "-2"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the gradient of any line PERPENDICULAR to L, giving your answer as a fraction where appropriate.",
        "marks": 2,
        "answer": "1/2",
        "solution": "Perpendicular gradients multiply to -1, so the gradient is -1/(-2) = 1/2.",
        "accepted": [
          "0.500",
          "1/2"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the equation of the line through A that is PARALLEL to L, in the form y = mx + c.",
        "marks": 3,
        "answer": "y = -2x + 9",
        "solution": "Using y - (1) = -2(x - 4) gives y = -2x + 9.",
        "answerType": "expression",
        "requiredForm": "slope_intercept",
        "accepted": [
          "y=-2x+9"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the equation of the line through A that is PERPENDICULAR to L, in the form y = mx + c.",
        "marks": 3,
        "answer": "y = x/2 - 1",
        "solution": "Using y - (1) = 1/2(x - 4) gives y = x/2 - 1.",
        "answerType": "expression",
        "requiredForm": "slope_intercept",
        "accepted": [
          "y = (1/2)x - 1",
          "y=(1/2)x-1",
          "y=x/2-1"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q4-v9",
    "question_number": 4,
    "section": "I",
    "marks": 9,
    "topic": "Relations, functions and coordinate geometry",
    "design": "Q4-D a relation from a table, with domain, range and type",
    "stem": "The relation f is defined by f(x) = 2x - 1 for the domain {-2, -1, 0, 1, 2}.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table of values for f.",
        "marks": 3,
        "answer": "-5, -3, -1, 1, 3",
        "solution": "Substituting each value of x in turn: f(-2) = -5; f(-1) = -3; f(0) = -1; f(1) = 1; f(2) = 3.",
        "answerType": "ordered",
        "accepted": [
          "-5 -3 -1 1 3"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the range of f.",
        "marks": 2,
        "answer": "{-5, -3, -1, 1, 3}",
        "solution": "The range is the set of output values: {-5, -3, -1, 1, 3}.",
        "answerType": "ordered",
        "accepted": [
          "-5, -3, -1, 1, 3"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the value of x for which f(x) = 9, and state whether this value is in the domain given above.",
        "marks": 2,
        "answer": "x = 5; not in the domain",
        "solution": "2x - 1 = 9 gives 2x = 10 and x = 5. This value is not in the given domain.",
        "accepted": [
          "5",
          "x=5"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "State whether f is a one-to-one relation, giving a reason.",
        "marks": 2,
        "answer": "Yes, one-to-one",
        "solution": "Every value of x gives a different value of f(x), because the relation is linear with a non-zero gradient, so no two members of the domain map onto the same member of the range. The relation is therefore one-to-one.",
        "answerType": "text",
        "accepted": [
          "yes",
          "one to one",
          "one-to-one"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q4-v10",
    "question_number": 4,
    "section": "I",
    "marks": 9,
    "topic": "Relations, functions and coordinate geometry",
    "design": "Q4-D a relation from a table, with domain, range and type",
    "stem": "The relation f is defined by f(x) = -3x + 4 for the domain {-1, 0, 1, 2, 3}.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table of values for f.",
        "marks": 3,
        "answer": "7, 4, 1, -2, -5",
        "solution": "Substituting each value of x in turn: f(-1) = 7; f(0) = 4; f(1) = 1; f(2) = -2; f(3) = -5.",
        "answerType": "ordered",
        "accepted": [
          "7 4 1 -2 -5"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the range of f.",
        "marks": 2,
        "answer": "{-5, -2, 1, 4, 7}",
        "solution": "The range is the set of output values: {-5, -2, 1, 4, 7}.",
        "answerType": "ordered",
        "accepted": [
          "-5, -2, 1, 4, 7"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the value of x for which f(x) = -11, and state whether this value is in the domain given above.",
        "marks": 2,
        "answer": "x = 5; not in the domain",
        "solution": "-3x + 4 = -11 gives -3x = -15 and x = 5. This value is not in the given domain.",
        "accepted": [
          "5",
          "x=5"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "State whether f is a one-to-one relation, giving a reason.",
        "marks": 2,
        "answer": "Yes, one-to-one",
        "solution": "Every value of x gives a different value of f(x), because the relation is linear with a non-zero gradient, so no two members of the domain map onto the same member of the range. The relation is therefore one-to-one.",
        "answerType": "text",
        "accepted": [
          "yes",
          "one to one",
          "one-to-one"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q5-v1",
    "question_number": 5,
    "section": "I",
    "marks": 9,
    "topic": "Statistics and probability",
    "design": "Q5-A grouped frequency: modal class, mean, cumulative frequency and probability",
    "stem": "The table below shows the masses, in kilograms, of 40 parcels handled by a courier in one morning.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "State the modal class.",
        "marks": 1,
        "answer": "16 - 20",
        "solution": "The class 16 - 20 has the highest frequency, 16.",
        "answerType": "text",
        "accepted": [
          "16-20"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate an ESTIMATE of the mean mass of a parcel.",
        "marks": 3,
        "answer": "13",
        "solution": "Use the class midpoints 3, 8, 13, 18. Sum of fx = 4(3) + 8(8) + 12(13) + 16(18) = 520. Mean = 520 / 40 = 13 kg.",
        "suffix": " kg",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Copy and complete the cumulative frequency table below.",
        "marks": 3,
        "answer": "4, 12, 24, 40",
        "solution": "Add the frequencies in order: 4, 12, 24, 40.",
        "answerType": "ordered",
        "accepted": [
          "4 12 24 40"
        ],
        "table": {
          "headers": [
            "Mass (kg)",
            "Cumulative frequency"
          ],
          "rows": [
            [
              "Not more than 5.5",
              "4"
            ],
            [
              "Not more than 10.5",
              ""
            ],
            [
              "Not more than 15.5",
              ""
            ],
            [
              "Not more than 20.5",
              ""
            ]
          ]
        }
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 40 parcels is chosen at random. Determine the probability that its mass is MORE than 15 kg. Give your answer as a fraction in its simplest form.",
        "marks": 2,
        "answer": "2/5",
        "solution": "16 of the 40 parcels have a mass greater than 15 kg, so the probability is 16/40 = 2/5.",
        "requiredForm": "simplified_fraction"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "table": {
      "headers": [
        "Mass (kg)",
        "Frequency"
      ],
      "rows": [
        [
          "1 - 5",
          "4"
        ],
        [
          "6 - 10",
          "8"
        ],
        [
          "11 - 15",
          "12"
        ],
        [
          "16 - 20",
          "16"
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q5-v2",
    "question_number": 5,
    "section": "I",
    "marks": 9,
    "topic": "Statistics and probability",
    "design": "Q5-A grouped frequency: modal class, mean, cumulative frequency and probability",
    "stem": "The table below shows the masses, in kilograms, of 40 parcels handled by a courier in one morning.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "State the modal class.",
        "marks": 1,
        "answer": "11 - 15",
        "solution": "The class 11 - 15 has the highest frequency, 12.",
        "answerType": "text",
        "accepted": [
          "11-15"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate an ESTIMATE of the mean mass of a parcel.",
        "marks": 3,
        "answer": "13",
        "solution": "Use the class midpoints 3, 8, 13, 18, 23. Sum of fx = 5(3) + 9(8) + 12(13) + 9(18) + 5(23) = 520. Mean = 520 / 40 = 13 kg.",
        "suffix": " kg",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Copy and complete the cumulative frequency table below.",
        "marks": 3,
        "answer": "5, 14, 26, 35, 40",
        "solution": "Add the frequencies in order: 5, 14, 26, 35, 40.",
        "answerType": "ordered",
        "accepted": [
          "5 14 26 35 40"
        ],
        "table": {
          "headers": [
            "Mass (kg)",
            "Cumulative frequency"
          ],
          "rows": [
            [
              "Not more than 5.5",
              "5"
            ],
            [
              "Not more than 10.5",
              ""
            ],
            [
              "Not more than 15.5",
              ""
            ],
            [
              "Not more than 20.5",
              ""
            ],
            [
              "Not more than 25.5",
              ""
            ]
          ]
        }
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 40 parcels is chosen at random. Determine the probability that its mass is MORE than 15 kg. Give your answer as a fraction in its simplest form.",
        "marks": 2,
        "answer": "7/20",
        "solution": "14 of the 40 parcels have a mass greater than 15 kg, so the probability is 14/40 = 7/20.",
        "requiredForm": "simplified_fraction"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "table": {
      "headers": [
        "Mass (kg)",
        "Frequency"
      ],
      "rows": [
        [
          "1 - 5",
          "5"
        ],
        [
          "6 - 10",
          "9"
        ],
        [
          "11 - 15",
          "12"
        ],
        [
          "16 - 20",
          "9"
        ],
        [
          "21 - 25",
          "5"
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q5-v3",
    "question_number": 5,
    "section": "I",
    "marks": 9,
    "topic": "Statistics and probability",
    "design": "Q5-A grouped frequency: modal class, mean, cumulative frequency and probability",
    "stem": "The table below shows the masses, in kilograms, of 34 parcels handled by a courier in one morning.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "State the modal class.",
        "marks": 1,
        "answer": "11 - 15",
        "solution": "The class 11 - 15 has the highest frequency, 16.",
        "answerType": "text",
        "accepted": [
          "11-15"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate an ESTIMATE of the mean mass of a parcel.",
        "marks": 3,
        "answer": "13",
        "solution": "Use the class midpoints 3, 8, 13, 18, 23. Sum of fx = 3(3) + 6(8) + 16(13) + 6(18) + 3(23) = 442. Mean = 442 / 34 = 13 kg.",
        "suffix": " kg",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Copy and complete the cumulative frequency table below.",
        "marks": 3,
        "answer": "3, 9, 25, 31, 34",
        "solution": "Add the frequencies in order: 3, 9, 25, 31, 34.",
        "answerType": "ordered",
        "accepted": [
          "3 9 25 31 34"
        ],
        "table": {
          "headers": [
            "Mass (kg)",
            "Cumulative frequency"
          ],
          "rows": [
            [
              "Not more than 5.5",
              "3"
            ],
            [
              "Not more than 10.5",
              ""
            ],
            [
              "Not more than 15.5",
              ""
            ],
            [
              "Not more than 20.5",
              ""
            ],
            [
              "Not more than 25.5",
              ""
            ]
          ]
        }
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 34 parcels is chosen at random. Determine the probability that its mass is MORE than 15 kg. Give your answer as a fraction in its simplest form.",
        "marks": 2,
        "answer": "9/34",
        "solution": "9 of the 34 parcels have a mass greater than 15 kg, so the probability is 9/34 = 9/34.",
        "requiredForm": "simplified_fraction"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "table": {
      "headers": [
        "Mass (kg)",
        "Frequency"
      ],
      "rows": [
        [
          "1 - 5",
          "3"
        ],
        [
          "6 - 10",
          "6"
        ],
        [
          "11 - 15",
          "16"
        ],
        [
          "16 - 20",
          "6"
        ],
        [
          "21 - 25",
          "3"
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q5-v4",
    "question_number": 5,
    "section": "I",
    "marks": 9,
    "topic": "Statistics and probability",
    "design": "Q5-B cumulative frequency, median and interquartile range",
    "stem": "The table below shows the marks obtained by 60 candidates in a test.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the cumulative frequency column.",
        "marks": 2,
        "answer": "5, 18, 38, 52, 60",
        "solution": "Add the frequencies in order: 5, 18, 38, 52, 60.",
        "answerType": "ordered",
        "accepted": [
          "5 18 38 52 60"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Using a scale of 2 cm to represent 10 marks on the horizontal axis and 2 cm to represent 10 candidates on the vertical axis, draw the cumulative frequency curve for the data.",
        "marks": 3,
        "answer": "A smooth curve through (10.5, 5), (20.5, 18), (30.5, 38), (40.5, 52), (50.5, 60)",
        "solution": "Plot each cumulative frequency against the UPPER CLASS BOUNDARY of its class, 10.5, 20.5, 30.5, 40.5, 50.5, then join the points with a smooth curve.",
        "answerType": "text",
        "accepted": [
          "curve drawn",
          "drawn",
          "done"
        ],
        "responseSchema": {
          "type": "graph",
          "graph": {
            "mode": "curve",
            "xMin": 0,
            "xMax": 60,
            "yMin": 0,
            "yMax": 60,
            "xStep": 10,
            "yStep": 10,
            "snapX": 0.5,
            "snapY": 0.5,
            "xLabel": "Mark",
            "yLabel": "Cumulative frequency"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  10.5,
                  5
                ],
                [
                  20.5,
                  18
                ],
                [
                  30.5,
                  38
                ],
                [
                  40.5,
                  52
                ],
                [
                  50.5,
                  60
                ]
              ],
              "minimumMatches": 5,
              "tolerance": [
                0.3,
                0.6
              ]
            },
            {
              "kind": "graph_curve",
              "marks": 1,
              "minimumPoints": 5,
              "increasing": true
            }
          ]
        },
        "grading_mode": "rubric"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Use your graph to estimate the MEDIAN mark.",
        "marks": 2,
        "answer": "26.5",
        "solution": "The median is the 30th value. Reading across from 30 on the vertical axis gives about 26.5 marks.",
        "suffix": " marks",
        "tolerance": 1.6
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Use your graph to estimate the INTERQUARTILE RANGE.",
        "marks": 2,
        "answer": "17.3",
        "solution": "Lower quartile: the 15th value, about 18.2. Upper quartile: the 45th value, about 35.5. Interquartile range = 35.5 - 18.2 = 17.3 marks.",
        "suffix": " marks",
        "tolerance": 2.6
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "table": {
      "headers": [
        "Mark",
        "Frequency",
        "Cumulative frequency"
      ],
      "rows": [
        [
          "1 - 10",
          "5",
          "5"
        ],
        [
          "11 - 20",
          "13",
          ""
        ],
        [
          "21 - 30",
          "20",
          ""
        ],
        [
          "31 - 40",
          "14",
          ""
        ],
        [
          "41 - 50",
          "8",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q5-v5",
    "question_number": 5,
    "section": "I",
    "marks": 9,
    "topic": "Statistics and probability",
    "design": "Q5-B cumulative frequency, median and interquartile range",
    "stem": "The table below shows the marks obtained by 80 candidates in a test.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the cumulative frequency column.",
        "marks": 2,
        "answer": "4, 14, 30, 52, 70, 80",
        "solution": "Add the frequencies in order: 4, 14, 30, 52, 70, 80.",
        "answerType": "ordered",
        "accepted": [
          "4 14 30 52 70 80"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Using a scale of 2 cm to represent 10 marks on the horizontal axis and 2 cm to represent 10 candidates on the vertical axis, draw the cumulative frequency curve for the data.",
        "marks": 3,
        "answer": "A smooth curve through (10.5, 4), (20.5, 14), (30.5, 30), (40.5, 52), (50.5, 70), (60.5, 80)",
        "solution": "Plot each cumulative frequency against the UPPER CLASS BOUNDARY of its class, 10.5, 20.5, 30.5, 40.5, 50.5, 60.5, then join the points with a smooth curve.",
        "answerType": "text",
        "accepted": [
          "curve drawn",
          "drawn",
          "done"
        ],
        "responseSchema": {
          "type": "graph",
          "graph": {
            "mode": "curve",
            "xMin": 0,
            "xMax": 70,
            "yMin": 0,
            "yMax": 80,
            "xStep": 10,
            "yStep": 10,
            "snapX": 0.5,
            "snapY": 0.5,
            "xLabel": "Mark",
            "yLabel": "Cumulative frequency"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  10.5,
                  4
                ],
                [
                  20.5,
                  14
                ],
                [
                  30.5,
                  30
                ],
                [
                  40.5,
                  52
                ],
                [
                  50.5,
                  70
                ],
                [
                  60.5,
                  80
                ]
              ],
              "minimumMatches": 6,
              "tolerance": [
                0.3,
                0.6
              ]
            },
            {
              "kind": "graph_curve",
              "marks": 1,
              "minimumPoints": 6,
              "increasing": true
            }
          ]
        },
        "grading_mode": "rubric"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Use your graph to estimate the MEDIAN mark.",
        "marks": 2,
        "answer": "35.0",
        "solution": "The median is the 40th value. Reading across from 40 on the vertical axis gives about 35.0 marks.",
        "suffix": " marks",
        "tolerance": 1.6
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Use your graph to estimate the INTERQUARTILE RANGE.",
        "marks": 2,
        "answer": "20.7",
        "solution": "Lower quartile: the 20th value, about 24.3. Upper quartile: the 60th value, about 44.9. Interquartile range = 44.9 - 24.3 = 20.7 marks.",
        "suffix": " marks",
        "tolerance": 2.6
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "table": {
      "headers": [
        "Mark",
        "Frequency",
        "Cumulative frequency"
      ],
      "rows": [
        [
          "1 - 10",
          "4",
          "4"
        ],
        [
          "11 - 20",
          "10",
          ""
        ],
        [
          "21 - 30",
          "16",
          ""
        ],
        [
          "31 - 40",
          "22",
          ""
        ],
        [
          "41 - 50",
          "18",
          ""
        ],
        [
          "51 - 60",
          "10",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q5-v6",
    "question_number": 5,
    "section": "I",
    "marks": 9,
    "topic": "Statistics and probability",
    "design": "Q5-C reading and using a pie chart",
    "stem": "The pie chart below, not drawn to scale, shows how each of 240 people answered a survey question. The angles of three of the sectors are Bus 105°, Car 135°, Train 75°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the angle of the Walk sector.",
        "marks": 2,
        "answer": "45",
        "solution": "Angles at the centre of a circle add up to 360°, so the remaining angle is 360 - (105 + 135 + 75) = 45°.",
        "suffix": "°",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the number of people who chose Bus.",
        "marks": 3,
        "answer": "70",
        "solution": "The Bus sector is 105/360 of the circle, so the number of people is (105/360) × 240 = 70.",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the response chosen by the GREATEST number of people, and give a reason.",
        "marks": 2,
        "answer": "Car",
        "solution": "Car has the largest sector angle, 135°, and the number of people is proportional to the angle.",
        "answerType": "text",
        "accepted": [
          "car"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 240 people is chosen at random. Determine the probability that the person chose Walk. Give your answer as a fraction in its simplest form.",
        "marks": 2,
        "answer": "1/8",
        "solution": "30 of the 240 people chose Walk, so the probability is 30/240 = 1/8.",
        "requiredForm": "simplified_fraction"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 430 310\" width=\"100%\" style=\"max-width:430px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"150\" cy=\"150\" r=\"108\"/><path d=\"M150 150 L150.0 42.0\"/><text x=\"213.4\" y=\"101.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Bus</text><path d=\"M150.0 118.0 A32 32 0 0 1 180.9 158.3\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"164.0\" y=\"139.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">105&#176;</text><path d=\"M150 150 L254.3 178.0\"/><text x=\"160.4\" y=\"229.2\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Car</text><path d=\"M150 150 L56.5 204.0\"/><text x=\"70.8\" y=\"139.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Train</text><path d=\"M150 150 L73.6 73.6\"/><text x=\"119.4\" y=\"76.2\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Walk</text></svg>",
      "alt": "A pie chart with four sectors labelled Bus, Car, Train, Walk. The Bus sector angle is marked 105 degrees."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q5-v7",
    "question_number": 5,
    "section": "I",
    "marks": 9,
    "topic": "Statistics and probability",
    "design": "Q5-C reading and using a pie chart",
    "stem": "The pie chart below, not drawn to scale, shows how each of 180 people answered a survey question. The angles of three of the sectors are Football 150°, Cricket 90°, Athletics 72°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the angle of the Netball sector.",
        "marks": 2,
        "answer": "48",
        "solution": "Angles at the centre of a circle add up to 360°, so the remaining angle is 360 - (150 + 90 + 72) = 48°.",
        "suffix": "°",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the number of people who chose Cricket.",
        "marks": 3,
        "answer": "45",
        "solution": "The Cricket sector is 90/360 of the circle, so the number of people is (90/360) × 180 = 45.",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the response chosen by the GREATEST number of people, and give a reason.",
        "marks": 2,
        "answer": "Football",
        "solution": "Football has the largest sector angle, 150°, and the number of people is proportional to the angle.",
        "answerType": "text",
        "accepted": [
          "football"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 180 people is chosen at random. Determine the probability that the person chose Netball. Give your answer as a fraction in its simplest form.",
        "marks": 2,
        "answer": "2/15",
        "solution": "24 of the 180 people chose Netball, so the probability is 24/180 = 2/15.",
        "requiredForm": "simplified_fraction"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 430 310\" width=\"100%\" style=\"max-width:430px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"150\" cy=\"150\" r=\"108\"/><path d=\"M150 150 L150.0 42.0\"/><text x=\"227.2\" y=\"129.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Football</text><path d=\"M150 150 L204.0 243.5\"/><text x=\"129.3\" y=\"227.2\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Cricket</text><path d=\"M166.0 177.7 A32 32 0 0 1 122.3 166.0\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"145.4\" y=\"167.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">90&#176;</text><path d=\"M150 150 L56.5 204.0\"/><text x=\"70.5\" y=\"141.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Athletics</text><path d=\"M150 150 L69.7 77.7\"/><text x=\"117.5\" y=\"77.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Netball</text></svg>",
      "alt": "A pie chart with four sectors labelled Football, Cricket, Athletics, Netball. The Cricket sector angle is marked 90 degrees."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q5-v8",
    "question_number": 5,
    "section": "I",
    "marks": 9,
    "topic": "Statistics and probability",
    "design": "Q5-D probability with and without replacement",
    "stem": "A bag contains 5 red marbles, 3 blue marbles and 4 green marbles. A marble is drawn at random from the bag.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Determine the probability that the marble drawn is red. Give your answer as a fraction in its simplest form.",
        "marks": 2,
        "answer": "5/12",
        "solution": "There are 12 marbles altogether and 5 of them are red, so the probability is 5/12 = 5/12.",
        "requiredForm": "simplified_fraction"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the probability that the marble drawn is NOT green.",
        "marks": 2,
        "answer": "2/3",
        "solution": "5 + 3 = 8 marbles are not green, so the probability is 8/12 = 2/3.",
        "requiredForm": "simplified_fraction"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The first marble is NOT replaced and a second marble is drawn. Determine the probability that BOTH marbles are red.",
        "marks": 3,
        "answer": "5/33",
        "solution": "P(first red) = 5/12. After a red marble is removed there are 4 red marbles out of 11, so P(second red) = 4/11. Multiplying, P(both red) = (5/12) × (4/11) = 5/33.",
        "requiredForm": "simplified_fraction"
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the probability that the first marble is red and the second is blue, again without replacement.",
        "marks": 2,
        "answer": "5/44",
        "solution": "P = (5/12) × (3/11) = 5/44.",
        "requiredForm": "simplified_fraction"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q5-v9",
    "question_number": 5,
    "section": "I",
    "marks": 9,
    "topic": "Statistics and probability",
    "design": "Q5-D probability with and without replacement",
    "stem": "A bag contains 4 red marbles, 6 blue marbles and 5 green marbles. A marble is drawn at random from the bag.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Determine the probability that the marble drawn is red. Give your answer as a fraction in its simplest form.",
        "marks": 2,
        "answer": "4/15",
        "solution": "There are 15 marbles altogether and 4 of them are red, so the probability is 4/15 = 4/15.",
        "requiredForm": "simplified_fraction"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the probability that the marble drawn is NOT green.",
        "marks": 2,
        "answer": "2/3",
        "solution": "4 + 6 = 10 marbles are not green, so the probability is 10/15 = 2/3.",
        "requiredForm": "simplified_fraction"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The first marble is NOT replaced and a second marble is drawn. Determine the probability that BOTH marbles are red.",
        "marks": 3,
        "answer": "2/35",
        "solution": "P(first red) = 4/15. After a red marble is removed there are 3 red marbles out of 14, so P(second red) = 3/14. Multiplying, P(both red) = (4/15) × (3/14) = 2/35.",
        "requiredForm": "simplified_fraction"
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the probability that the first marble is red and the second is blue, again without replacement.",
        "marks": 2,
        "answer": "4/35",
        "solution": "P = (4/15) × (6/14) = 4/35.",
        "requiredForm": "simplified_fraction"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q5-v10",
    "question_number": 5,
    "section": "I",
    "marks": 9,
    "topic": "Statistics and probability",
    "design": "Q5-A grouped frequency: modal class, mean, cumulative frequency and probability",
    "stem": "The table below shows the masses, in kilograms, of 30 parcels handled by a courier in one morning.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "State the modal class.",
        "marks": 1,
        "answer": "21 - 25",
        "solution": "The class 21 - 25 has the highest frequency, 12.",
        "answerType": "text",
        "accepted": [
          "21-25"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate an ESTIMATE of the mean mass of a parcel.",
        "marks": 3,
        "answer": "17",
        "solution": "Use the class midpoints 3, 8, 13, 18, 23. Sum of fx = 3(3) + 3(8) + 3(13) + 9(18) + 12(23) = 510. Mean = 510 / 30 = 17 kg.",
        "suffix": " kg",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Copy and complete the cumulative frequency table below.",
        "marks": 3,
        "answer": "3, 6, 9, 18, 30",
        "solution": "Add the frequencies in order: 3, 6, 9, 18, 30.",
        "answerType": "ordered",
        "accepted": [
          "3 6 9 18 30"
        ],
        "table": {
          "headers": [
            "Mass (kg)",
            "Cumulative frequency"
          ],
          "rows": [
            [
              "Not more than 5.5",
              "3"
            ],
            [
              "Not more than 10.5",
              ""
            ],
            [
              "Not more than 15.5",
              ""
            ],
            [
              "Not more than 20.5",
              ""
            ],
            [
              "Not more than 25.5",
              ""
            ]
          ]
        }
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One of the 30 parcels is chosen at random. Determine the probability that its mass is MORE than 15 kg. Give your answer as a fraction in its simplest form.",
        "marks": 2,
        "answer": "7/10",
        "solution": "21 of the 30 parcels have a mass greater than 15 kg, so the probability is 21/30 = 7/10.",
        "requiredForm": "simplified_fraction"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "table": {
      "headers": [
        "Mass (kg)",
        "Frequency"
      ],
      "rows": [
        [
          "1 - 5",
          "3"
        ],
        [
          "6 - 10",
          "3"
        ],
        [
          "11 - 15",
          "3"
        ],
        [
          "16 - 20",
          "9"
        ],
        [
          "21 - 25",
          "12"
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q6-v1",
    "question_number": 6,
    "section": "I",
    "marks": 9,
    "topic": "Measurement, geometry and trigonometry",
    "design": "Q6-A cylinder with pi = 22/7",
    "stem": "[In this question, take π = 22/7.] The diagram below, not drawn to scale, shows a closed cylindrical water tank of radius 3.5 m and height 4 m.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the area of the circular base of the tank.",
        "marks": 2,
        "answer": "38.5",
        "solution": "Area = πr^2 = (22/7)(3.5)^2 = 38.5 m^2.",
        "suffix": " m^2",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the volume of the tank.",
        "marks": 3,
        "answer": "154",
        "solution": "Volume = πr^2h = 38.5 × 4 = 154 m^3.",
        "suffix": " m^3",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the CURVED surface area of the tank.",
        "marks": 2,
        "answer": "88",
        "solution": "Curved surface area = 2πrh = 2 × (22/7) × 3.5 × 4 = 88 m^2.",
        "suffix": " m^2",
        "tolerance": 0.011
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Water is pumped into the empty tank at a constant rate of 5.5 m^3 per hour. Calculate the time taken to fill the tank.",
        "marks": 2,
        "answer": "28",
        "solution": "Time = volume / rate = 154 / 5.5 = 28 hours.",
        "suffix": " hours",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 268\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><ellipse cx=\"150\" cy=\"58\" rx=\"62\" ry=\"17\"/><path d=\"M88 58 L88 214\"/><path d=\"M212 58 L212 214\"/><path d=\"M88 214 A62 17 0 0 0 212 214\"/><path d=\"M88 214 A62 17 0 0 1 212 214\" stroke-dasharray=\"5 4\"/><path d=\"M150 58 L212 58\" stroke-width=\"1.3\"/><circle cx=\"150\" cy=\"58\" r=\"2.4\" fill=\"currentColor\"/><path d=\"M242 58 L242 214\" stroke-width=\"1.3\"/><path d=\"M237 58 L247 58\" stroke-width=\"1.3\"/><path d=\"M237 214 L247 214\" stroke-width=\"1.3\"/><g stroke=\"none\" fill=\"currentColor\" font-size=\"12\"><text x=\"181\" y=\"32\" text-anchor=\"middle\">3.5 m</text><text x=\"251\" y=\"140\">4 m</text></g></svg>",
      "alt": "A cylinder with its radius marked 3.5 m across the top face and its height marked 4 m."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q6-v2",
    "question_number": 6,
    "section": "I",
    "marks": 9,
    "topic": "Measurement, geometry and trigonometry",
    "design": "Q6-A cylinder with pi = 22/7",
    "stem": "[In this question, take π = 22/7.] The diagram below, not drawn to scale, shows a closed cylindrical water tank of radius 7 m and height 15 m.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the area of the circular base of the tank.",
        "marks": 2,
        "answer": "154",
        "solution": "Area = πr^2 = (22/7)(7)^2 = 154 m^2.",
        "suffix": " m^2",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the volume of the tank.",
        "marks": 3,
        "answer": "2310",
        "solution": "Volume = πr^2h = 154 × 15 = 2310 m^3.",
        "suffix": " m^3",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the CURVED surface area of the tank.",
        "marks": 2,
        "answer": "660",
        "solution": "Curved surface area = 2πrh = 2 × (22/7) × 7 × 15 = 660 m^2.",
        "suffix": " m^2",
        "tolerance": 0.011
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Water is pumped into the empty tank at a constant rate of 21 m^3 per hour. Calculate the time taken to fill the tank.",
        "marks": 2,
        "answer": "110",
        "solution": "Time = volume / rate = 2310 / 21 = 110 hours.",
        "suffix": " hours",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 268\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><ellipse cx=\"150\" cy=\"58\" rx=\"62\" ry=\"17\"/><path d=\"M88 58 L88 214\"/><path d=\"M212 58 L212 214\"/><path d=\"M88 214 A62 17 0 0 0 212 214\"/><path d=\"M88 214 A62 17 0 0 1 212 214\" stroke-dasharray=\"5 4\"/><path d=\"M150 58 L212 58\" stroke-width=\"1.3\"/><circle cx=\"150\" cy=\"58\" r=\"2.4\" fill=\"currentColor\"/><path d=\"M242 58 L242 214\" stroke-width=\"1.3\"/><path d=\"M237 58 L247 58\" stroke-width=\"1.3\"/><path d=\"M237 214 L247 214\" stroke-width=\"1.3\"/><g stroke=\"none\" fill=\"currentColor\" font-size=\"12\"><text x=\"181\" y=\"32\" text-anchor=\"middle\">7 m</text><text x=\"251\" y=\"140\">15 m</text></g></svg>",
      "alt": "A cylinder with its radius marked 7 m across the top face and its height marked 15 m."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q6-v3",
    "question_number": 6,
    "section": "I",
    "marks": 9,
    "topic": "Measurement, geometry and trigonometry",
    "design": "Q6-A cylinder with pi = 22/7",
    "stem": "[In this question, take π = 22/7.] The diagram below, not drawn to scale, shows a closed cylindrical water tank of radius 10.5 m and height 8 m.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the area of the circular base of the tank.",
        "marks": 2,
        "answer": "346.5",
        "solution": "Area = πr^2 = (22/7)(10.5)^2 = 346.5 m^2.",
        "suffix": " m^2",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the volume of the tank.",
        "marks": 3,
        "answer": "2772",
        "solution": "Volume = πr^2h = 346.5 × 8 = 2772 m^3.",
        "suffix": " m^3",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the CURVED surface area of the tank.",
        "marks": 2,
        "answer": "528",
        "solution": "Curved surface area = 2πrh = 2 × (22/7) × 10.5 × 8 = 528 m^2.",
        "suffix": " m^2",
        "tolerance": 0.011
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Water is pumped into the empty tank at a constant rate of 77 m^3 per hour. Calculate the time taken to fill the tank.",
        "marks": 2,
        "answer": "36",
        "solution": "Time = volume / rate = 2772 / 77 = 36 hours.",
        "suffix": " hours",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 268\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><ellipse cx=\"150\" cy=\"58\" rx=\"62\" ry=\"17\"/><path d=\"M88 58 L88 214\"/><path d=\"M212 58 L212 214\"/><path d=\"M88 214 A62 17 0 0 0 212 214\"/><path d=\"M88 214 A62 17 0 0 1 212 214\" stroke-dasharray=\"5 4\"/><path d=\"M150 58 L212 58\" stroke-width=\"1.3\"/><circle cx=\"150\" cy=\"58\" r=\"2.4\" fill=\"currentColor\"/><path d=\"M242 58 L242 214\" stroke-width=\"1.3\"/><path d=\"M237 58 L247 58\" stroke-width=\"1.3\"/><path d=\"M237 214 L247 214\" stroke-width=\"1.3\"/><g stroke=\"none\" fill=\"currentColor\" font-size=\"12\"><text x=\"181\" y=\"32\" text-anchor=\"middle\">10.5 m</text><text x=\"251\" y=\"140\">8 m</text></g></svg>",
      "alt": "A cylinder with its radius marked 10.5 m across the top face and its height marked 8 m."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q6-v4",
    "question_number": 6,
    "section": "I",
    "marks": 9,
    "topic": "Measurement, geometry and trigonometry",
    "design": "Q6-B arc length, sector area and sector perimeter",
    "stem": "[In this question, take π = 22/7.] The diagram below, not drawn to scale, shows a sector OAB of a circle with centre O and radius 21 cm. Angle AOB = 120°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the length of the arc AB.",
        "marks": 3,
        "answer": "44",
        "solution": "Arc = (120/360) × 2πr = (0.3333) × 2 × (22/7) × 21 = 44 cm.",
        "suffix": " cm",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the area of the sector OAB.",
        "marks": 3,
        "answer": "462",
        "solution": "Area = (120/360) × πr^2 = (0.3333) × (22/7) × 21^2 = 462 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the PERIMETER of the sector OAB.",
        "marks": 3,
        "answer": "86",
        "solution": "The perimeter is the arc plus the two radii: 44 + 2(21) = 86 cm.",
        "suffix": " cm",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 350 280\" width=\"100%\" style=\"max-width:330px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M172 176 L69.8 117.0\"/><path d=\"M172 176 L274.2 117.0\"/><path d=\"M69.8 117.0 A118 118 0 0 1 274.2 117.0\"/><path d=\"M135.6 155.0 A42 42 0 0 1 208.4 155.0\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"172.0\" y=\"152.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">120&#176;</text><circle cx=\"172\" cy=\"176\" r=\"2.6\" fill=\"currentColor\"/><text x=\"172.0\" y=\"194.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text><text x=\"53.8\" y=\"111.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"290.2\" y=\"111.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"100.9\" y=\"152.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">21 cm</text></svg>",
      "alt": "A sector OAB of a circle of radius 21 cm with the angle at the centre marked 120 degrees."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q6-v5",
    "question_number": 6,
    "section": "I",
    "marks": 9,
    "topic": "Measurement, geometry and trigonometry",
    "design": "Q6-B arc length, sector area and sector perimeter",
    "stem": "[In this question, take π = 22/7.] The diagram below, not drawn to scale, shows a sector OAB of a circle with centre O and radius 14 cm. Angle AOB = 90°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the length of the arc AB.",
        "marks": 3,
        "answer": "22",
        "solution": "Arc = (90/360) × 2πr = (0.25) × 2 × (22/7) × 14 = 22 cm.",
        "suffix": " cm",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the area of the sector OAB.",
        "marks": 3,
        "answer": "154",
        "solution": "Area = (90/360) × πr^2 = (0.25) × (22/7) × 14^2 = 154 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the PERIMETER of the sector OAB.",
        "marks": 3,
        "answer": "50",
        "solution": "The perimeter is the arc plus the two radii: 22 + 2(14) = 50 cm.",
        "suffix": " cm",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 350 280\" width=\"100%\" style=\"max-width:330px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M172 176 L88.6 92.6\"/><path d=\"M172 176 L255.4 92.6\"/><path d=\"M88.6 92.6 A118 118 0 0 1 255.4 92.6\"/><path d=\"M142.3 146.3 A42 42 0 0 1 201.7 146.3\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"172.0\" y=\"152.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">90&#176;</text><circle cx=\"172\" cy=\"176\" r=\"2.6\" fill=\"currentColor\"/><text x=\"172.0\" y=\"194.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text><text x=\"72.6\" y=\"86.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"271.4\" y=\"86.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"110.3\" y=\"140.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">14 cm</text></svg>",
      "alt": "A sector OAB of a circle of radius 14 cm with the angle at the centre marked 90 degrees."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q6-v6",
    "question_number": 6,
    "section": "I",
    "marks": 9,
    "topic": "Measurement, geometry and trigonometry",
    "design": "Q6-B arc length, sector area and sector perimeter",
    "stem": "[In this question, take π = 22/7.] The diagram below, not drawn to scale, shows a sector OAB of a circle with centre O and radius 42 cm. Angle AOB = 60°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the length of the arc AB.",
        "marks": 3,
        "answer": "44",
        "solution": "Arc = (60/360) × 2πr = (0.1667) × 2 × (22/7) × 42 = 44 cm.",
        "suffix": " cm",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the area of the sector OAB.",
        "marks": 3,
        "answer": "924",
        "solution": "Area = (60/360) × πr^2 = (0.1667) × (22/7) × 42^2 = 924 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the PERIMETER of the sector OAB.",
        "marks": 3,
        "answer": "128",
        "solution": "The perimeter is the arc plus the two radii: 44 + 2(42) = 128 cm.",
        "suffix": " cm",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 350 280\" width=\"100%\" style=\"max-width:330px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M172 176 L113.0 73.8\"/><path d=\"M172 176 L231.0 73.8\"/><path d=\"M113.0 73.8 A118 118 0 0 1 231.0 73.8\"/><path d=\"M151.0 139.6 A42 42 0 0 1 193.0 139.6\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"172.0\" y=\"152.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">60&#176;</text><circle cx=\"172\" cy=\"176\" r=\"2.6\" fill=\"currentColor\"/><text x=\"172.0\" y=\"194.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text><text x=\"97.0\" y=\"67.8\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"247.0\" y=\"67.8\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"122.5\" y=\"130.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">42 cm</text></svg>",
      "alt": "A sector OAB of a circle of radius 42 cm with the angle at the centre marked 60 degrees."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q6-v7",
    "question_number": 6,
    "section": "I",
    "marks": 9,
    "topic": "Measurement, geometry and trigonometry",
    "design": "Q6-C volume and surface area of a triangular prism",
    "stem": "The diagram below, not drawn to scale, shows a solid prism 20 cm long. Its cross-section is a right-angled triangle with base 8 cm and perpendicular height 6 cm.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the area of the triangular cross-section.",
        "marks": 2,
        "answer": "24",
        "solution": "Area = 1/2 × 8 × 6 = 24 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the volume of the prism.",
        "marks": 2,
        "answer": "480",
        "solution": "Volume = area of cross-section × length = 24 × 20 = 480 cm^3.",
        "suffix": " cm^3",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the length of the sloping edge of the cross-section.",
        "marks": 2,
        "answer": "10",
        "solution": "By Pythagoras' theorem the hypotenuse is sqrt(8^2 + 6^2) = sqrt(100) = 10 cm.",
        "suffix": " cm",
        "tolerance": 0.011
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate the TOTAL surface area of the prism.",
        "marks": 3,
        "answer": "528",
        "solution": "Two triangular ends: 2 × 24 = 48 cm^2. The perimeter of the cross-section is 8 + 6 + 10 = 24 cm, so the three rectangles give 24 × 20 = 480 cm^2. Total = 528 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 300\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M74 236 L218 236 L74 116 Z\"/><path d=\"M218 236 L296 192\"/><path d=\"M74 116 L152 72\"/><path d=\"M296 192 L152 72\"/><path d=\"M74 236 L152 192 L296 192 M152 192 L152 72\" stroke-dasharray=\"5 4\" stroke-width=\"1.2\"/><path d=\"M87.0 236.0 L87.0 223.0 L74.0 223.0\" stroke-width=\"1.2\"/><text x=\"146.0\" y=\"257.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">8 cm</text><text x=\"47.0\" y=\"176.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">6 cm</text><text x=\"283.0\" y=\"226.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">20 cm</text></svg>",
      "alt": "A prism 20 cm long whose cross-section is a right-angled triangle with base 8 cm and perpendicular height 6 cm."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q6-v8",
    "question_number": 6,
    "section": "I",
    "marks": 9,
    "topic": "Measurement, geometry and trigonometry",
    "design": "Q6-C volume and surface area of a triangular prism",
    "stem": "The diagram below, not drawn to scale, shows a solid prism 25 cm long. Its cross-section is a right-angled triangle with base 12 cm and perpendicular height 5 cm.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the area of the triangular cross-section.",
        "marks": 2,
        "answer": "30",
        "solution": "Area = 1/2 × 12 × 5 = 30 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the volume of the prism.",
        "marks": 2,
        "answer": "750",
        "solution": "Volume = area of cross-section × length = 30 × 25 = 750 cm^3.",
        "suffix": " cm^3",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the length of the sloping edge of the cross-section.",
        "marks": 2,
        "answer": "13",
        "solution": "By Pythagoras' theorem the hypotenuse is sqrt(12^2 + 5^2) = sqrt(169) = 13 cm.",
        "suffix": " cm",
        "tolerance": 0.011
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate the TOTAL surface area of the prism.",
        "marks": 3,
        "answer": "810",
        "solution": "Two triangular ends: 2 × 30 = 60 cm^2. The perimeter of the cross-section is 12 + 5 + 13 = 30 cm, so the three rectangles give 30 × 25 = 750 cm^2. Total = 810 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.011
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 300\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M74 236 L218 236 L74 116 Z\"/><path d=\"M218 236 L296 192\"/><path d=\"M74 116 L152 72\"/><path d=\"M296 192 L152 72\"/><path d=\"M74 236 L152 192 L296 192 M152 192 L152 72\" stroke-dasharray=\"5 4\" stroke-width=\"1.2\"/><path d=\"M87.0 236.0 L87.0 223.0 L74.0 223.0\" stroke-width=\"1.2\"/><text x=\"146.0\" y=\"257.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">12 cm</text><text x=\"47.0\" y=\"176.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">5 cm</text><text x=\"283.0\" y=\"226.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">25 cm</text></svg>",
      "alt": "A prism 25 cm long whose cross-section is a right-angled triangle with base 12 cm and perpendicular height 5 cm."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q6-v9",
    "question_number": 6,
    "section": "I",
    "marks": 9,
    "topic": "Measurement, geometry and trigonometry",
    "design": "Q6-D angles of elevation from two points",
    "stem": "The diagram below, not drawn to scale, shows a vertical tower TB standing on level ground. The point A on the ground is 48 m from the foot B of the tower, and the angle of elevation of the top T from A is 34°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the height of the tower, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "32.4",
        "solution": "tan 34° = TB / 48, so TB = 48 tan 34° = 32.38 = 32.4 m.",
        "suffix": " m",
        "tolerance": 0.051
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the distance AT, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "57.9",
        "solution": "cos 34° = 48 / AT, so AT = 48 / cos 34° = 57.90 = 57.9 m.",
        "suffix": " m",
        "tolerance": 0.051
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "A second point C lies on the ground on the same side of the tower as A, with C 68 m from B. Calculate the angle of elevation of T from C, correct to the nearest degree.",
        "marks": 3,
        "answer": "25",
        "solution": "tan(angle) = TB / 68 = 32.38 / 68 = 0.4761, so the angle of elevation is 25.5°, which is 25° to the nearest degree. It is smaller than 34°, as expected, because C is further from the tower.",
        "suffix": "°",
        "tolerance": 0.51
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 290\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M30 236 L326 236\"/><path d=\"M300 236 L300 84.7\" stroke-width=\"2\"/><path d=\"M56 236 L300 84.7\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><path d=\"M300.0 223.0 L287.0 223.0 L287.0 236.0\" stroke-width=\"1.2\"/><path d=\"M96.0 236.0 A40 40 0 0 0 90.0 214.9\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"79.0\" y=\"229.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">34&#176;</text><text x=\"178.0\" y=\"256.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">48 m</text><text x=\"326.0\" y=\"160.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">h</text><text x=\"44.0\" y=\"254.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"306.0\" y=\"72.7\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">T</text><text x=\"314.0\" y=\"242.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text></svg>",
      "alt": "A vertical tower TB on level ground with A on the ground 48 m from B. The angle of elevation of T from A is 34 degrees."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q6-v10",
    "question_number": 6,
    "section": "I",
    "marks": 9,
    "topic": "Measurement, geometry and trigonometry",
    "design": "Q6-D angles of elevation from two points",
    "stem": "The diagram below, not drawn to scale, shows a vertical tower TB standing on level ground. The point A on the ground is 35 m from the foot B of the tower, and the angle of elevation of the top T from A is 42°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the height of the tower, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "31.5",
        "solution": "tan 42° = TB / 35, so TB = 35 tan 42° = 31.51 = 31.5 m.",
        "suffix": " m",
        "tolerance": 0.051
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the distance AT, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "47.1",
        "solution": "cos 42° = 35 / AT, so AT = 35 / cos 42° = 47.10 = 47.1 m.",
        "suffix": " m",
        "tolerance": 0.051
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "A second point C lies on the ground on the same side of the tower as A, with C 50 m from B. Calculate the angle of elevation of T from C, correct to the nearest degree.",
        "marks": 3,
        "answer": "32",
        "solution": "tan(angle) = TB / 50 = 31.51 / 50 = 0.6303, so the angle of elevation is 32.2°, which is 32° to the nearest degree. It is smaller than 42°, as expected, because C is further from the tower.",
        "suffix": "°",
        "tolerance": 0.51
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 290\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M30 236 L326 236\"/><path d=\"M300 236 L300 84.7\" stroke-width=\"2\"/><path d=\"M56 236 L300 84.7\" stroke-width=\"1.8\" stroke-dasharray=\"6 4\"/><path d=\"M300.0 223.0 L287.0 223.0 L287.0 236.0\" stroke-width=\"1.2\"/><path d=\"M96.0 236.0 A40 40 0 0 0 90.0 214.9\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"79.0\" y=\"229.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">42&#176;</text><text x=\"178.0\" y=\"256.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">35 m</text><text x=\"326.0\" y=\"160.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">h</text><text x=\"44.0\" y=\"254.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"306.0\" y=\"72.7\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">T</text><text x=\"314.0\" y=\"242.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text></svg>",
      "alt": "A vertical tower TB on level ground with A on the ground 35 m from B. The angle of elevation of T from A is 42 degrees."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q7-v1",
    "question_number": 7,
    "section": "I",
    "marks": 10,
    "topic": "Sequences, patterns and investigation",
    "design": "Q7-A a quadratic tile pattern with a table",
    "stem": "A sequence of designs is made from square tiles. In Design n the shaded tiles form an n by n block, and n unshaded tiles are placed against each of its four sides. The first three designs are shown below.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table for Design 4.",
        "marks": 2,
        "answer": "16, 16, 32",
        "solution": "Design 4 has a 4 by 4 block, so 16 shaded tiles, and 4 unshaded tiles against each of the 4 sides, so 16 unshaded. The total is 32.",
        "answerType": "ordered",
        "accepted": [
          "16 16 32"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression, in terms of n, for the number of shaded tiles, the number of unshaded tiles and the TOTAL number of tiles in Design n.",
        "marks": 4,
        "answer": "shaded n^2; unshaded 4n; total n^2 + 4n",
        "solution": "The shaded tiles form an n by n block, so there are n^2 of them. There are n unshaded tiles against each of the four sides, so 4n of them. The total is n^2 + 4n, which can also be written n(n + 4). Check with n = 3: 9 + 12 = 21, which matches the table.",
        "answerType": "expression",
        "accepted": [
          "n^2, 4n, n^2+4n",
          "n^2 4n n^2+4n",
          "n^2, 4n, n(n+4)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "One design uses a total of 165 tiles. Determine the design number.",
        "marks": 2,
        "answer": "11",
        "solution": "n^2 + 4n = 165, so n^2 + 4n - 165 = 0. Factorising gives (n + 15)(n - 11) = 0, so n = 11, since a design number must be positive. Check: 11^2 + 4(11) = 165."
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Another design uses 144 shaded tiles. Determine the number of UNSHADED tiles in that design.",
        "marks": 2,
        "answer": "48",
        "solution": "n^2 = 144, so n = 12. The number of unshaded tiles is 4n = 4(12) = 48."
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 284 131\" width=\"100%\" style=\"max-width:284px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"41.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"41.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"41.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"26.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"56.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><text x=\"48.5\" y=\"115.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Design 1</text><rect x=\"112.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"112.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"127.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"127.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"112.0\" y=\"23.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"112.0\" y=\"68.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"97.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"142.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"127.0\" y=\"23.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"127.0\" y=\"68.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"97.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"142.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><text x=\"127.0\" y=\"115.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Design 2</text><rect x=\"198.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"198.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"198.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"213.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"213.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"213.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"228.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"228.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"228.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"198.0\" y=\"16.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"198.0\" y=\"76.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"183.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"243.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"213.0\" y=\"16.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"213.0\" y=\"76.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"183.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"243.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"228.0\" y=\"16.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"228.0\" y=\"76.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"183.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"243.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><text x=\"220.5\" y=\"115.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Design 3</text></svg>",
      "alt": "Design 1 is a single shaded tile with one unshaded tile against each of its four sides. Design 2 has a 2 by 2 block of shaded tiles with 2 unshaded tiles against each side. Design 3 has a 3 by 3 block with 3 unshaded tiles against each side."
    },
    "table": {
      "headers": [
        "Design",
        "Shaded tiles",
        "Unshaded tiles",
        "Total tiles"
      ],
      "rows": [
        [
          "1",
          "1",
          "4",
          "5"
        ],
        [
          "2",
          "4",
          "8",
          "12"
        ],
        [
          "3",
          "9",
          "12",
          "21"
        ],
        [
          "4",
          "",
          "",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q7-v2",
    "question_number": 7,
    "section": "I",
    "marks": 10,
    "topic": "Sequences, patterns and investigation",
    "design": "Q7-A a quadratic tile pattern with a table",
    "stem": "A sequence of designs is made from square tiles. In Design n the shaded tiles form an n by n block, and n unshaded tiles are placed against each of its four sides. The first three designs are shown below.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table for Design 4.",
        "marks": 2,
        "answer": "16, 16, 32",
        "solution": "Design 4 has a 4 by 4 block, so 16 shaded tiles, and 4 unshaded tiles against each of the 4 sides, so 16 unshaded. The total is 32.",
        "answerType": "ordered",
        "accepted": [
          "16 16 32"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression, in terms of n, for the number of shaded tiles, the number of unshaded tiles and the TOTAL number of tiles in Design n.",
        "marks": 4,
        "answer": "shaded n^2; unshaded 4n; total n^2 + 4n",
        "solution": "The shaded tiles form an n by n block, so there are n^2 of them. There are n unshaded tiles against each of the four sides, so 4n of them. The total is n^2 + 4n, which can also be written n(n + 4). Check with n = 3: 9 + 12 = 21, which matches the table.",
        "answerType": "expression",
        "accepted": [
          "n^2, 4n, n^2+4n",
          "n^2 4n n^2+4n",
          "n^2, 4n, n(n+4)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "One design uses a total of 96 tiles. Determine the design number.",
        "marks": 2,
        "answer": "8",
        "solution": "n^2 + 4n = 96, so n^2 + 4n - 96 = 0. Factorising gives (n + 12)(n - 8) = 0, so n = 8, since a design number must be positive. Check: 8^2 + 4(8) = 96."
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Another design uses 225 shaded tiles. Determine the number of UNSHADED tiles in that design.",
        "marks": 2,
        "answer": "60",
        "solution": "n^2 = 225, so n = 15. The number of unshaded tiles is 4n = 4(15) = 60."
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 284 131\" width=\"100%\" style=\"max-width:284px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"41.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"41.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"41.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"26.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"56.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><text x=\"48.5\" y=\"115.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Design 1</text><rect x=\"112.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"112.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"127.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"127.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"112.0\" y=\"23.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"112.0\" y=\"68.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"97.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"142.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"127.0\" y=\"23.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"127.0\" y=\"68.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"97.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"142.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><text x=\"127.0\" y=\"115.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Design 2</text><rect x=\"198.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"198.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"198.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"213.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"213.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"213.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"228.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"228.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"228.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"198.0\" y=\"16.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"198.0\" y=\"76.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"183.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"243.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"213.0\" y=\"16.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"213.0\" y=\"76.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"183.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"243.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"228.0\" y=\"16.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"228.0\" y=\"76.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"183.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"243.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><text x=\"220.5\" y=\"115.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Design 3</text></svg>",
      "alt": "Design 1 is a single shaded tile with one unshaded tile against each of its four sides. Design 2 has a 2 by 2 block of shaded tiles with 2 unshaded tiles against each side. Design 3 has a 3 by 3 block with 3 unshaded tiles against each side."
    },
    "table": {
      "headers": [
        "Design",
        "Shaded tiles",
        "Unshaded tiles",
        "Total tiles"
      ],
      "rows": [
        [
          "1",
          "1",
          "4",
          "5"
        ],
        [
          "2",
          "4",
          "8",
          "12"
        ],
        [
          "3",
          "9",
          "12",
          "21"
        ],
        [
          "4",
          "",
          "",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q7-v3",
    "question_number": 7,
    "section": "I",
    "marks": 10,
    "topic": "Sequences, patterns and investigation",
    "design": "Q7-A a quadratic tile pattern with a table",
    "stem": "A sequence of designs is made from square tiles. In Design n the shaded tiles form an n by n block, and n unshaded tiles are placed against each of its four sides. The first three designs are shown below.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table for Design 4.",
        "marks": 2,
        "answer": "16, 16, 32",
        "solution": "Design 4 has a 4 by 4 block, so 16 shaded tiles, and 4 unshaded tiles against each of the 4 sides, so 16 unshaded. The total is 32.",
        "answerType": "ordered",
        "accepted": [
          "16 16 32"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression, in terms of n, for the number of shaded tiles, the number of unshaded tiles and the TOTAL number of tiles in Design n.",
        "marks": 4,
        "answer": "shaded n^2; unshaded 4n; total n^2 + 4n",
        "solution": "The shaded tiles form an n by n block, so there are n^2 of them. There are n unshaded tiles against each of the four sides, so 4n of them. The total is n^2 + 4n, which can also be written n(n + 4). Check with n = 3: 9 + 12 = 21, which matches the table.",
        "answerType": "expression",
        "accepted": [
          "n^2, 4n, n^2+4n",
          "n^2 4n n^2+4n",
          "n^2, 4n, n(n+4)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "One design uses a total of 320 tiles. Determine the design number.",
        "marks": 2,
        "answer": "16",
        "solution": "n^2 + 4n = 320, so n^2 + 4n - 320 = 0. Factorising gives (n + 20)(n - 16) = 0, so n = 16, since a design number must be positive. Check: 16^2 + 4(16) = 320."
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Another design uses 400 shaded tiles. Determine the number of UNSHADED tiles in that design.",
        "marks": 2,
        "answer": "80",
        "solution": "n^2 = 400, so n = 20. The number of unshaded tiles is 4n = 4(20) = 80."
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 284 131\" width=\"100%\" style=\"max-width:284px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><rect x=\"41.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"41.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"41.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"26.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"56.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><text x=\"48.5\" y=\"115.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Design 1</text><rect x=\"112.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"112.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"127.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"127.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"112.0\" y=\"23.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"112.0\" y=\"68.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"97.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"142.0\" y=\"38.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"127.0\" y=\"23.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"127.0\" y=\"68.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"97.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"142.0\" y=\"53.5\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><text x=\"127.0\" y=\"115.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Design 2</text><rect x=\"198.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"198.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"198.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"213.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"213.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"213.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"228.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"228.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"228.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\" fill=\"currentColor\" fill-opacity=\"0.30\"/><rect x=\"198.0\" y=\"16.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"198.0\" y=\"76.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"183.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"243.0\" y=\"31.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"213.0\" y=\"16.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"213.0\" y=\"76.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"183.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"243.0\" y=\"46.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"228.0\" y=\"16.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"228.0\" y=\"76.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"183.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><rect x=\"243.0\" y=\"61.0\" width=\"15\" height=\"15\" stroke-width=\"1.2\"/><text x=\"220.5\" y=\"115.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Design 3</text></svg>",
      "alt": "Design 1 is a single shaded tile with one unshaded tile against each of its four sides. Design 2 has a 2 by 2 block of shaded tiles with 2 unshaded tiles against each side. Design 3 has a 3 by 3 block with 3 unshaded tiles against each side."
    },
    "table": {
      "headers": [
        "Design",
        "Shaded tiles",
        "Unshaded tiles",
        "Total tiles"
      ],
      "rows": [
        [
          "1",
          "1",
          "4",
          "5"
        ],
        [
          "2",
          "4",
          "8",
          "12"
        ],
        [
          "3",
          "9",
          "12",
          "21"
        ],
        [
          "4",
          "",
          "",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q7-v4",
    "question_number": 7,
    "section": "I",
    "marks": 10,
    "topic": "Sequences, patterns and investigation",
    "design": "Q7-B a linear dot pattern with a table",
    "stem": "A sequence of figures is made from dots. Figure n has a top row of n dots and a bottom row with one more dot than the row above it. The first three figures are shown below.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table for Figure 4.",
        "marks": 2,
        "answer": "4, 5, 9",
        "solution": "Figure 4 has 4 dots in the top row and one more, 5, in the bottom row, giving 9 dots altogether.",
        "answerType": "ordered",
        "accepted": [
          "4 5 9"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression, in terms of n, for the number of dots in the top row, the number in the bottom row and the TOTAL number of dots in Figure n.",
        "marks": 4,
        "answer": "top n; bottom n + 1; total 2n + 1",
        "solution": "The top row has n dots and the bottom row has n + 1. The total is n + (n + 1) = 2n + 1. Check with n = 3: 2(3) + 1 = 7, which matches the table.",
        "answerType": "expression",
        "accepted": [
          "n, n+1, 2n+1",
          "n n+1 2n+1"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the figure number of the figure with a total of 61 dots.",
        "marks": 2,
        "answer": "30",
        "solution": "2n + 1 = 61, so 2n = 60 and n = 30."
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One figure has 24 dots in its BOTTOM row. Determine the TOTAL number of dots in that figure.",
        "marks": 2,
        "answer": "47",
        "solution": "n + 1 = 24, so n = 23. The total is 2(23) + 1 = 47."
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 116\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"60.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"50.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"70.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"60.0\" y=\"100.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 1</text><circle cx=\"140.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"160.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"130.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"150.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"170.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"150.0\" y=\"100.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 2</text><circle cx=\"240.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"260.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"280.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"230.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"250.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"270.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"290.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"260.0\" y=\"100.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 3</text></svg>",
      "alt": "Figure 1 has 1 dot on top and 2 below, Figure 2 has 2 on top and 3 below, and Figure 3 has 3 on top and 4 below."
    },
    "table": {
      "headers": [
        "Figure",
        "Dots in top row",
        "Dots in bottom row",
        "Total dots"
      ],
      "rows": [
        [
          "1",
          "1",
          "2",
          "3"
        ],
        [
          "2",
          "2",
          "3",
          "5"
        ],
        [
          "3",
          "3",
          "4",
          "7"
        ],
        [
          "4",
          "",
          "",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q7-v5",
    "question_number": 7,
    "section": "I",
    "marks": 10,
    "topic": "Sequences, patterns and investigation",
    "design": "Q7-B a linear dot pattern with a table",
    "stem": "A sequence of figures is made from dots. Figure n has a top row of n dots and a bottom row with one more dot than the row above it. The first three figures are shown below.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table for Figure 4.",
        "marks": 2,
        "answer": "4, 5, 9",
        "solution": "Figure 4 has 4 dots in the top row and one more, 5, in the bottom row, giving 9 dots altogether.",
        "answerType": "ordered",
        "accepted": [
          "4 5 9"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression, in terms of n, for the number of dots in the top row, the number in the bottom row and the TOTAL number of dots in Figure n.",
        "marks": 4,
        "answer": "top n; bottom n + 1; total 2n + 1",
        "solution": "The top row has n dots and the bottom row has n + 1. The total is n + (n + 1) = 2n + 1. Check with n = 3: 2(3) + 1 = 7, which matches the table.",
        "answerType": "expression",
        "accepted": [
          "n, n+1, 2n+1",
          "n n+1 2n+1"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the figure number of the figure with a total of 87 dots.",
        "marks": 2,
        "answer": "43",
        "solution": "2n + 1 = 87, so 2n = 86 and n = 43."
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "One figure has 31 dots in its BOTTOM row. Determine the TOTAL number of dots in that figure.",
        "marks": 2,
        "answer": "61",
        "solution": "n + 1 = 31, so n = 30. The total is 2(30) + 1 = 61."
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 116\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"60.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"50.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"70.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"60.0\" y=\"100.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 1</text><circle cx=\"140.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"160.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"130.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"150.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"170.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"150.0\" y=\"100.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 2</text><circle cx=\"240.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"260.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"280.0\" cy=\"28.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"230.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"250.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"270.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><circle cx=\"290.0\" cy=\"48.0\" r=\"5\" fill=\"currentColor\" stroke=\"none\"/><text x=\"260.0\" y=\"100.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">Figure 3</text></svg>",
      "alt": "Figure 1 has 1 dot on top and 2 below, Figure 2 has 2 on top and 3 below, and Figure 3 has 3 on top and 4 below."
    },
    "table": {
      "headers": [
        "Figure",
        "Dots in top row",
        "Dots in bottom row",
        "Total dots"
      ],
      "rows": [
        [
          "1",
          "1",
          "2",
          "3"
        ],
        [
          "2",
          "2",
          "3",
          "5"
        ],
        [
          "3",
          "3",
          "4",
          "7"
        ],
        [
          "4",
          "",
          "",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q7-v6",
    "question_number": 7,
    "section": "I",
    "marks": 10,
    "topic": "Sequences, patterns and investigation",
    "design": "Q7-C a sequence of number statements",
    "stem": "The number statements below form a sequence.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write the 5th statement in the sequence and state its value.",
        "marks": 2,
        "answer": "5 × 7 + 6 = 41",
        "solution": "The first number is the statement number, the second is 2 more and the number added is 1 more. So the 5th statement is 5 × 7 + 6 = 41.",
        "answerType": "expression",
        "accepted": [
          "5x7+6=41",
          "41"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write the 10th statement in the sequence and state its value.",
        "marks": 2,
        "answer": "10 × 12 + 11 = 131",
        "solution": "10 × 12 + 11 = 120 + 11 = 131.",
        "answerType": "expression",
        "accepted": [
          "10x12+11=131",
          "131"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Write the nth statement, and show that its value simplifies to n^2 + 3n + 1.",
        "marks": 4,
        "answer": "n × (n + 2) + (n + 1) = n^2 + 3n + 1",
        "solution": "The nth statement is n × (n + 2) + (n + 1). Expanding, n(n + 2) = n^2 + 2n, so the value is n^2 + 2n + n + 1 = n^2 + 3n + 1. Check with n = 4: 16 + 12 + 1 = 29, which matches the table.",
        "answerType": "expression",
        "accepted": [
          "n(n+2)+(n+1)",
          "n^2+3n+1"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the statement number whose value is 71.",
        "marks": 2,
        "answer": "7",
        "solution": "n^2 + 3n + 1 = 71, so n^2 + 3n - 70 = 0, which factorises to (n + 10)(n - 7) = 0. Since n must be positive, n = 7. Check: 7 × 9 + 8 = 71."
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "table": {
      "headers": [
        "Statement number",
        "Statement",
        "Value"
      ],
      "rows": [
        [
          "1",
          "1 × 3 + 2",
          "5"
        ],
        [
          "2",
          "2 × 4 + 3",
          "11"
        ],
        [
          "3",
          "3 × 5 + 4",
          "19"
        ],
        [
          "4",
          "4 × 6 + 5",
          "29"
        ],
        [
          "5",
          "",
          ""
        ],
        [
          "10",
          "",
          ""
        ],
        [
          "n",
          "",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q7-v7",
    "question_number": 7,
    "section": "I",
    "marks": 10,
    "topic": "Sequences, patterns and investigation",
    "design": "Q7-C a sequence of number statements",
    "stem": "The number statements below form a sequence.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write the 5th statement in the sequence and state its value.",
        "marks": 2,
        "answer": "5 × 7 + 6 = 41",
        "solution": "The first number is the statement number, the second is 2 more and the number added is 1 more. So the 5th statement is 5 × 7 + 6 = 41.",
        "answerType": "expression",
        "accepted": [
          "5x7+6=41",
          "41"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write the 10th statement in the sequence and state its value.",
        "marks": 2,
        "answer": "10 × 12 + 11 = 131",
        "solution": "10 × 12 + 11 = 120 + 11 = 131.",
        "answerType": "expression",
        "accepted": [
          "10x12+11=131",
          "131"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Write the nth statement, and show that its value simplifies to n^2 + 3n + 1.",
        "marks": 4,
        "answer": "n × (n + 2) + (n + 1) = n^2 + 3n + 1",
        "solution": "The nth statement is n × (n + 2) + (n + 1). Expanding, n(n + 2) = n^2 + 2n, so the value is n^2 + 2n + n + 1 = n^2 + 3n + 1. Check with n = 4: 16 + 12 + 1 = 29, which matches the table.",
        "answerType": "expression",
        "accepted": [
          "n(n+2)+(n+1)",
          "n^2+3n+1"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the statement number whose value is 131.",
        "marks": 2,
        "answer": "10",
        "solution": "n^2 + 3n + 1 = 131, so n^2 + 3n - 130 = 0, which factorises to (n + 13)(n - 10) = 0. Since n must be positive, n = 10. Check: 10 × 12 + 11 = 131."
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "table": {
      "headers": [
        "Statement number",
        "Statement",
        "Value"
      ],
      "rows": [
        [
          "1",
          "1 × 3 + 2",
          "5"
        ],
        [
          "2",
          "2 × 4 + 3",
          "11"
        ],
        [
          "3",
          "3 × 5 + 4",
          "19"
        ],
        [
          "4",
          "4 × 6 + 5",
          "29"
        ],
        [
          "5",
          "",
          ""
        ],
        [
          "10",
          "",
          ""
        ],
        [
          "n",
          "",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q7-v8",
    "question_number": 7,
    "section": "I",
    "marks": 10,
    "topic": "Sequences, patterns and investigation",
    "design": "Q7-D arithmetic sequence: nth term, a term, the sum and a reverse",
    "stem": "The first four terms of an arithmetic sequence are 7, 11, 15, 19.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "State the common difference.",
        "marks": 1,
        "answer": "4",
        "solution": "Each term is 4 more than the one before."
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression for the nth term of the sequence in the form an + b.",
        "marks": 3,
        "answer": "4n + 3",
        "solution": "T_n = a + (n - 1)d = 7 + (n - 1)(4) = 4n + 3. Check with n = 1: 4(1) + 3 = 7.",
        "answerType": "expression",
        "accepted": [
          "4n+3"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the 12th term.",
        "marks": 2,
        "answer": "51",
        "solution": "T_12 = 7 + (12 - 1)(4) = 51."
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate the sum of the first 20 terms.",
        "marks": 2,
        "answer": "900",
        "solution": "S_n = (n/2)[2a + (n - 1)d], so S_20 = (20/2)[2(7) + (20 - 1)(4)] = 900."
      },
      {
        "id": "e",
        "label": "(e)",
        "prompt": "Determine which term of the sequence has the value 79.",
        "marks": 2,
        "answer": "the 19th term",
        "solution": "Set 4n + 3 = 79. Then 4n = 76 and n = 19, so 79 is the 19th term.",
        "accepted": [
          "19",
          "n = 19"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q7-v9",
    "question_number": 7,
    "section": "I",
    "marks": 10,
    "topic": "Sequences, patterns and investigation",
    "design": "Q7-D arithmetic sequence: nth term, a term, the sum and a reverse",
    "stem": "The first four terms of an arithmetic sequence are 13, 18, 23, 28.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "State the common difference.",
        "marks": 1,
        "answer": "5",
        "solution": "Each term is 5 more than the one before."
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression for the nth term of the sequence in the form an + b.",
        "marks": 3,
        "answer": "5n + 8",
        "solution": "T_n = a + (n - 1)d = 13 + (n - 1)(5) = 5n + 8. Check with n = 1: 5(1) + 8 = 13.",
        "answerType": "expression",
        "accepted": [
          "5n+8"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the 16th term.",
        "marks": 2,
        "answer": "88",
        "solution": "T_16 = 13 + (16 - 1)(5) = 88."
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate the sum of the first 18 terms.",
        "marks": 2,
        "answer": "999",
        "solution": "S_n = (n/2)[2a + (n - 1)d], so S_18 = (18/2)[2(13) + (18 - 1)(5)] = 999."
      },
      {
        "id": "e",
        "label": "(e)",
        "prompt": "Determine which term of the sequence has the value 98.",
        "marks": 2,
        "answer": "the 18th term",
        "solution": "Set 5n + 8 = 98. Then 5n = 90 and n = 18, so 98 is the 18th term.",
        "accepted": [
          "18",
          "n = 18"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q7-v10",
    "question_number": 7,
    "section": "I",
    "marks": 10,
    "topic": "Sequences, patterns and investigation",
    "design": "Q7-D arithmetic sequence: nth term, a term, the sum and a reverse",
    "stem": "The first four terms of an arithmetic sequence are 5, 12, 19, 26.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "State the common difference.",
        "marks": 1,
        "answer": "7",
        "solution": "Each term is 7 more than the one before."
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write an expression for the nth term of the sequence in the form an + b.",
        "marks": 3,
        "answer": "7n - 2",
        "solution": "T_n = a + (n - 1)d = 5 + (n - 1)(7) = 7n - 2. Check with n = 1: 7(1) - 2 = 5.",
        "answerType": "expression",
        "accepted": [
          "7n-2"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the 14th term.",
        "marks": 2,
        "answer": "96",
        "solution": "T_14 = 5 + (14 - 1)(7) = 96."
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate the sum of the first 15 terms.",
        "marks": 2,
        "answer": "810",
        "solution": "S_n = (n/2)[2a + (n - 1)d], so S_15 = (15/2)[2(5) + (15 - 1)(7)] = 810."
      },
      {
        "id": "e",
        "label": "(e)",
        "prompt": "Determine which term of the sequence has the value 138.",
        "marks": 2,
        "answer": "the 20th term",
        "solution": "Set 7n - 2 = 138. Then 7n = 140 and n = 20, so 138 is the 20th term.",
        "accepted": [
          "20",
          "n = 20"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q8-v1",
    "question_number": 8,
    "section": "II",
    "marks": 12,
    "topic": "Algebra, relations and functions",
    "design": "Q8-A completing the square and the features of the graph",
    "stem": "The function f is defined by f(x) = 3x^2 - 12x + 20.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Express f(x) in the form a(x - h)^2 + k, where a, h and k are constants.",
        "marks": 4,
        "answer": "3(x - 2)^2 + 8",
        "solution": "Take out the factor 3 from the first two terms: 3(x^2 - 4x) + 20. Completing the square inside the bracket, x^2 - 4x = (x - 2)^2 - 4. So f(x) = 3(x - 2)^2 + 8.",
        "answerType": "expression",
        "accepted": [
          "3(x-2)^2+8"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "State the MINIMUM value of f(x).",
        "marks": 2,
        "answer": "8",
        "solution": "3(x - 2)^2 is never negative and is zero when x = 2, so the least value of f(x) is 8."
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "State the value of x at which this value occurs.",
        "marks": 2,
        "answer": "2",
        "solution": "The square is zero when x - 2 = 0, that is x = 2."
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the equation of the axis of symmetry of the graph of f.",
        "marks": 2,
        "answer": "x = 2",
        "solution": "The graph is symmetrical about the vertical line through the turning point, so the axis of symmetry is x = 2.",
        "answerType": "expression",
        "accepted": [
          "2",
          "x=2"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "State the coordinates of the point where the graph of f cuts the y-axis.",
        "marks": 2,
        "answer": "(0, 20)",
        "solution": "When x = 0, f(0) = 20, so the graph cuts the y-axis at (0, 20).",
        "answerType": "coordinate"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q8-v2",
    "question_number": 8,
    "section": "II",
    "marks": 12,
    "topic": "Algebra, relations and functions",
    "design": "Q8-A completing the square and the features of the graph",
    "stem": "The function f is defined by f(x) = 2x^2 + 12x + 23.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Express f(x) in the form a(x - h)^2 + k, where a, h and k are constants.",
        "marks": 4,
        "answer": "2(x + 3)^2 + 5",
        "solution": "Take out the factor 2 from the first two terms: 2(x^2 + 6x) + 23. Completing the square inside the bracket, x^2 + 6x = (x + 3)^2 - 9. So f(x) = 2(x + 3)^2 + 5.",
        "answerType": "expression",
        "accepted": [
          "2(x+3)^2+5"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "State the MINIMUM value of f(x).",
        "marks": 2,
        "answer": "5",
        "solution": "2(x + 3)^2 is never negative and is zero when x = -3, so the least value of f(x) is 5."
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "State the value of x at which this value occurs.",
        "marks": 2,
        "answer": "-3",
        "solution": "The square is zero when x + 3 = 0, that is x = -3."
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the equation of the axis of symmetry of the graph of f.",
        "marks": 2,
        "answer": "x = -3",
        "solution": "The graph is symmetrical about the vertical line through the turning point, so the axis of symmetry is x = -3.",
        "answerType": "expression",
        "accepted": [
          "-3",
          "x=-3"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "State the coordinates of the point where the graph of f cuts the y-axis.",
        "marks": 2,
        "answer": "(0, 23)",
        "solution": "When x = 0, f(0) = 23, so the graph cuts the y-axis at (0, 23).",
        "answerType": "coordinate"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q8-v3",
    "question_number": 8,
    "section": "II",
    "marks": 12,
    "topic": "Algebra, relations and functions",
    "design": "Q8-A completing the square and the features of the graph",
    "stem": "The function f is defined by f(x) = x^2 - 8x + 9.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Express f(x) in the form a(x - h)^2 + k, where a, h and k are constants.",
        "marks": 4,
        "answer": "(x - 4)^2 - 7",
        "solution": "Take out the factor 1 from the first two terms: 1(x^2 - 8x) + 9. Completing the square inside the bracket, x^2 - 8x = (x - 4)^2 - 16. So f(x) = (x - 4)^2 - 7.",
        "answerType": "expression",
        "accepted": [
          "(x-4)^2-7"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "State the MINIMUM value of f(x).",
        "marks": 2,
        "answer": "-7",
        "solution": "1(x - 4)^2 is never negative and is zero when x = 4, so the least value of f(x) is -7."
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "State the value of x at which this value occurs.",
        "marks": 2,
        "answer": "4",
        "solution": "The square is zero when x - 4 = 0, that is x = 4."
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the equation of the axis of symmetry of the graph of f.",
        "marks": 2,
        "answer": "x = 4",
        "solution": "The graph is symmetrical about the vertical line through the turning point, so the axis of symmetry is x = 4.",
        "answerType": "expression",
        "accepted": [
          "4",
          "x=4"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "State the coordinates of the point where the graph of f cuts the y-axis.",
        "marks": 2,
        "answer": "(0, 9)",
        "solution": "When x = 0, f(0) = 9, so the graph cuts the y-axis at (0, 9).",
        "answerType": "coordinate"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q8-v4",
    "question_number": 8,
    "section": "II",
    "marks": 12,
    "topic": "Algebra, relations and functions",
    "design": "Q8-B a plotted quadratic, its minimum and solutions from the graph",
    "stem": "The table below shows some values for the function y = x^2 - 2x - 3, for -2 ≤ x ≤ 4.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table of values.",
        "marks": 3,
        "answer": "0, -4, 5",
        "solution": "When x = -1, y = 0; When x = 1, y = -4; When x = 4, y = 5.",
        "answerType": "ordered",
        "accepted": [
          "0 -4 5"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Using a scale of 2 cm to represent 1 unit on the x-axis and 1 cm to represent 1 unit on the y-axis, draw the graph of y = x^2 - 2x - 3 for -2 ≤ x ≤ 4.",
        "marks": 3,
        "answer": "A smooth parabola through (-2, 5), (-1, 0), (0, -3), (1, -4), (2, -3), (3, 0), (4, 5)",
        "solution": "Plot the points from the completed table and join them with a smooth curve, not a series of straight segments.",
        "answerType": "text",
        "accepted": [
          "graph drawn",
          "drawn",
          "done"
        ],
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 332 268\" width=\"100%\" style=\"max-width:332px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M46.0 222.0 L46.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M86.0 222.0 L86.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M126.0 222.0 L126.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M166.0 222.0 L166.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M206.0 222.0 L206.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M246.0 222.0 L246.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M286.0 222.0 L286.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 222.0 L286.0 222.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 190.0 L286.0 190.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 158.0 L286.0 158.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 126.0 L286.0 126.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 94.0 L286.0 94.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 62.0 L286.0 62.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M32.0 142.0 L298.4 142.0\" stroke-width=\"1.8\"/><path d=\"M306.0 142.0 L297.5 147.3 L297.5 136.7 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M126.0 222.0 L126.0 33.6\" stroke-width=\"1.8\"/><path d=\"M126.0 26.0 L131.3 34.5 L120.7 34.5 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"46.0\" y=\"158.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-2</text><text x=\"86.0\" y=\"158.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"166.0\" y=\"158.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"206.0\" y=\"158.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"246.0\" y=\"158.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"286.0\" y=\"158.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"118.0\" y=\"222.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-5</text><text x=\"118.0\" y=\"190.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-3</text><text x=\"118.0\" y=\"158.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"118.0\" y=\"126.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"118.0\" y=\"94.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"118.0\" y=\"62.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"308.0\" y=\"147.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">x</text><text x=\"120.0\" y=\"22.0\" text-anchor=\"end\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y</text></svg>",
          "alt": "A blank grid with x from -2 to 4 and y from -5 to 6."
        },
        "responseSchema": {
          "type": "graph",
          "graph": {
            "mode": "curve",
            "xMin": -2,
            "xMax": 4,
            "yMin": -5,
            "yMax": 6,
            "xStep": 1,
            "yStep": 1,
            "snapX": 0.05,
            "snapY": 0.05,
            "xLabel": "x",
            "yLabel": "y"
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
              "minimumMatches": 7,
              "tolerance": 0.16
            },
            {
              "kind": "graph_curve",
              "marks": 1,
              "minimumPoints": 7
            }
          ]
        },
        "grading_mode": "rubric"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the coordinates of the MINIMUM point of the graph.",
        "marks": 2,
        "answer": "(1, -4)",
        "solution": "The curve is symmetrical about x = 1, the value halfway between the roots -1 and 3. There y = -4, so the minimum point is (1, -4).",
        "answerType": "coordinate"
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Use your graph to solve the equation x^2 - 2x - 3 = 0.",
        "marks": 2,
        "answer": "x = -1 and x = 3",
        "solution": "The curve cuts the x-axis where y = 0, at x = -1 and x = 3. Check: (x + 1)(x - 3) = x^2 - 2x - 3.",
        "answerType": "ordered",
        "accepted": [
          "-1, 3",
          "3, -1"
        ]
      },
      {
        "id": "e",
        "label": "(e)",
        "prompt": "By drawing a suitable straight line on the same axes, solve the equation x^2 - 2x - 3 = 2, giving your answers correct to 1 decimal place.",
        "marks": 2,
        "answer": "x = -1.4 and x = 3.4",
        "solution": "Draw the line y = 2 and read off where it meets the curve. The exact values are (2 ± sqrt(24))/2, that is -1.449 and 3.449, so -1.4 and 3.4 to 1 decimal place.",
        "answerType": "ordered",
        "accepted": [
          "-1.4, 3.4"
        ],
        "responseSchema": {
          "type": "graph",
          "graph": {
            "mode": "line",
            "xMin": -2,
            "xMax": 4,
            "yMin": -5,
            "yMax": 6,
            "xStep": 1,
            "yStep": 1,
            "snapX": 0.05,
            "snapY": 0.05,
            "xLabel": "x",
            "yLabel": "y",
            "backgroundPoints": [
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
            ]
          },
          "answerFields": [
            {
              "id": "x1",
              "label": "First solution, x",
              "answer": "-1.4",
              "tolerance": 0.15
            },
            {
              "id": "x2",
              "label": "Second solution, x",
              "answer": "3.4",
              "tolerance": 0.15
            }
          ],
          "criteria": [
            {
              "kind": "graph_line",
              "marks": 1,
              "slope": 0,
              "intercept": 2,
              "tolerance": 0.12,
              "label": "Suitable straight line y = 2"
            },
            {
              "kind": "root_set",
              "marks": 1,
              "fields": [
                "x1",
                "x2"
              ],
              "answers": [
                -1.4,
                3.4
              ],
              "tolerance": 0.15,
              "label": "Solutions read from the graph"
            }
          ]
        },
        "grading_mode": "rubric"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "table": {
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
          "",
          "-3",
          "",
          "-3",
          "0",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q8-v5",
    "question_number": 8,
    "section": "II",
    "marks": 12,
    "topic": "Algebra, relations and functions",
    "design": "Q8-B a plotted quadratic, its minimum and solutions from the graph",
    "stem": "The table below shows some values for the function y = x^2 - 2x - 8, for -3 ≤ x ≤ 5.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Copy and complete the table of values.",
        "marks": 3,
        "answer": "0, -8, 7",
        "solution": "When x = -2, y = 0; When x = 0, y = -8; When x = 5, y = 7.",
        "answerType": "ordered",
        "accepted": [
          "0 -8 7"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Using a scale of 2 cm to represent 1 unit on the x-axis and 1 cm to represent 1 unit on the y-axis, draw the graph of y = x^2 - 2x - 8 for -3 ≤ x ≤ 5.",
        "marks": 3,
        "answer": "A smooth parabola through (-3, 7), (-2, 0), (-1, -5), (0, -8), (1, -9), (2, -8), (3, -5), (4, 0), (5, 7)",
        "solution": "Plot the points from the completed table and join them with a smooth curve, not a series of straight segments.",
        "answerType": "text",
        "accepted": [
          "graph drawn",
          "drawn",
          "done"
        ],
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 412 380\" width=\"100%\" style=\"max-width:412px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M46.0 334.0 L46.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M86.0 334.0 L86.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M126.0 334.0 L126.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M166.0 334.0 L166.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M206.0 334.0 L206.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M246.0 334.0 L246.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M286.0 334.0 L286.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M326.0 334.0 L326.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M366.0 334.0 L366.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 334.0 L366.0 334.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 302.0 L366.0 302.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 270.0 L366.0 270.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 238.0 L366.0 238.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 206.0 L366.0 206.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 174.0 L366.0 174.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 142.0 L366.0 142.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 110.0 L366.0 110.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 78.0 L366.0 78.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M46.0 46.0 L366.0 46.0\" stroke-width=\"0.5\" opacity=\"0.35\"/><path d=\"M32.0 174.0 L378.4 174.0\" stroke-width=\"1.8\"/><path d=\"M386.0 174.0 L377.5 179.3 L377.5 168.7 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M166.0 334.0 L166.0 33.6\" stroke-width=\"1.8\"/><path d=\"M166.0 26.0 L171.3 34.5 L160.7 34.5 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"46.0\" y=\"190.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-3</text><text x=\"86.0\" y=\"190.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-2</text><text x=\"126.0\" y=\"190.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-1</text><text x=\"206.0\" y=\"190.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">1</text><text x=\"246.0\" y=\"190.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"286.0\" y=\"190.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">3</text><text x=\"326.0\" y=\"190.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"366.0\" y=\"190.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">5</text><text x=\"158.0\" y=\"334.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-10</text><text x=\"158.0\" y=\"302.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-8</text><text x=\"158.0\" y=\"270.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-6</text><text x=\"158.0\" y=\"238.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-4</text><text x=\"158.0\" y=\"206.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">-2</text><text x=\"158.0\" y=\"142.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">2</text><text x=\"158.0\" y=\"110.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">4</text><text x=\"158.0\" y=\"78.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">6</text><text x=\"158.0\" y=\"46.0\" text-anchor=\"end\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">8</text><text x=\"388.0\" y=\"179.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">x</text><text x=\"160.0\" y=\"22.0\" text-anchor=\"end\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">y</text></svg>",
          "alt": "A blank grid with x from -3 to 5 and y from -10 to 8."
        },
        "responseSchema": {
          "type": "graph",
          "graph": {
            "mode": "curve",
            "xMin": -3,
            "xMax": 5,
            "yMin": -10,
            "yMax": 8,
            "xStep": 1,
            "yStep": 1,
            "snapX": 0.05,
            "snapY": 0.05,
            "xLabel": "x",
            "yLabel": "y"
          },
          "criteria": [
            {
              "kind": "graph_points",
              "marks": 2,
              "points": [
                [
                  -3,
                  7
                ],
                [
                  -2,
                  0
                ],
                [
                  -1,
                  -5
                ],
                [
                  0,
                  -8
                ],
                [
                  1,
                  -9
                ],
                [
                  2,
                  -8
                ],
                [
                  3,
                  -5
                ],
                [
                  4,
                  0
                ],
                [
                  5,
                  7
                ]
              ],
              "minimumMatches": 9,
              "tolerance": 0.16
            },
            {
              "kind": "graph_curve",
              "marks": 1,
              "minimumPoints": 9
            }
          ]
        },
        "grading_mode": "rubric"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the coordinates of the MINIMUM point of the graph.",
        "marks": 2,
        "answer": "(1, -9)",
        "solution": "The curve is symmetrical about x = 1, the value halfway between the roots -2 and 4. There y = -9, so the minimum point is (1, -9).",
        "answerType": "coordinate"
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Use your graph to solve the equation x^2 - 2x - 8 = 0.",
        "marks": 2,
        "answer": "x = -2 and x = 4",
        "solution": "The curve cuts the x-axis where y = 0, at x = -2 and x = 4. Check: (x + 2)(x - 4) = x^2 - 2x - 8.",
        "answerType": "ordered",
        "accepted": [
          "-2, 4",
          "4, -2"
        ]
      },
      {
        "id": "e",
        "label": "(e)",
        "prompt": "By drawing a suitable straight line on the same axes, solve the equation x^2 - 2x - 8 = 3, giving your answers correct to 1 decimal place.",
        "marks": 2,
        "answer": "x = -2.5 and x = 4.5",
        "solution": "Draw the line y = 3 and read off where it meets the curve. The exact values are (2 ± sqrt(48))/2, that is -2.464 and 4.464, so -2.5 and 4.5 to 1 decimal place.",
        "answerType": "ordered",
        "accepted": [
          "-2.5, 4.5"
        ],
        "responseSchema": {
          "type": "graph",
          "graph": {
            "mode": "line",
            "xMin": -3,
            "xMax": 5,
            "yMin": -10,
            "yMax": 8,
            "xStep": 1,
            "yStep": 1,
            "snapX": 0.05,
            "snapY": 0.05,
            "xLabel": "x",
            "yLabel": "y",
            "backgroundPoints": [
              [
                -3,
                7
              ],
              [
                -2,
                0
              ],
              [
                -1,
                -5
              ],
              [
                0,
                -8
              ],
              [
                1,
                -9
              ],
              [
                2,
                -8
              ],
              [
                3,
                -5
              ],
              [
                4,
                0
              ],
              [
                5,
                7
              ]
            ]
          },
          "answerFields": [
            {
              "id": "x1",
              "label": "First solution, x",
              "answer": "-2.5",
              "tolerance": 0.15
            },
            {
              "id": "x2",
              "label": "Second solution, x",
              "answer": "4.5",
              "tolerance": 0.15
            }
          ],
          "criteria": [
            {
              "kind": "graph_line",
              "marks": 1,
              "slope": 0,
              "intercept": 3,
              "tolerance": 0.12,
              "label": "Suitable straight line y = 3"
            },
            {
              "kind": "root_set",
              "marks": 1,
              "fields": [
                "x1",
                "x2"
              ],
              "answers": [
                -2.5,
                4.5
              ],
              "tolerance": 0.15,
              "label": "Solutions read from the graph"
            }
          ]
        },
        "grading_mode": "rubric"
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "table": {
      "headers": [
        "x",
        "-3",
        "-2",
        "-1",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5"
      ],
      "rows": [
        [
          "y",
          "7",
          "",
          "-5",
          "",
          "-9",
          "-8",
          "-5",
          "0",
          ""
        ]
      ]
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q8-v6",
    "question_number": 8,
    "section": "II",
    "marks": 12,
    "topic": "Algebra, relations and functions",
    "design": "Q8-C linear programming with a feasible region and an objective function",
    "stem": "A workshop makes x shirts and y pairs of trousers each week. Each shirt uses 2 m of cloth and each trouser uses 3 m, and 60 m of cloth is available. At least 6 shirts and at least 4 pairs of trousers must be made.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write THREE inequalities, other than x ≥ 0 and y ≥ 0, to represent this information.",
        "marks": 3,
        "answer": "2x + 3y ≤ 60; x ≥ 6; y ≥ 4",
        "solution": "Cloth: 2x + 3y ≤ 60. At least 6 shirts: x ≥ 6. At least 4 pairs of trousers: y ≥ 4.",
        "answerType": "expression",
        "accepted": [
          "2x+3y<=60, x>=6, y>=4"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the coordinates of the three vertices of the feasible region.",
        "marks": 3,
        "answer": "(6, 4); (6, 16); (24, 4)",
        "solution": "The region is bounded by x = 6, y = 4 and 2x + 3y = 60. Taking the lines in pairs gives (6, 4), (6, 16), (24, 4).",
        "answerType": "ordered"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The profit on each shirt is $50 and on each trouser is $60. Write an expression, in terms of x and y, for the TOTAL profit P.",
        "marks": 2,
        "answer": "P = 50x + 60y",
        "solution": "P = 50x + 60y.",
        "answerType": "expression",
        "accepted": [
          "50x+60y"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the MAXIMUM profit, and the number of each item that should be made to obtain it.",
        "marks": 4,
        "answer": "$1440, from 24 shirts and 4 pairs of trousers",
        "solution": "The maximum of a linear expression over a polygon occurs at a vertex. Testing each: P(6, 4) = 540; P(6, 16) = 1260; P(24, 4) = 1440. The maximum profit is $1440, making 24 shirts and 4 pairs of trousers.",
        "accepted": [
          "1440",
          "$1440"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q8-v7",
    "question_number": 8,
    "section": "II",
    "marks": 12,
    "topic": "Algebra, relations and functions",
    "design": "Q8-C linear programming with a feasible region and an objective function",
    "stem": "A workshop makes x tables and y chairs each week. Each table uses 3 m of timber and each chair uses 2 m, and 72 m of timber is available. At least 6 tables and at least 6 chairs must be made.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write THREE inequalities, other than x ≥ 0 and y ≥ 0, to represent this information.",
        "marks": 3,
        "answer": "3x + 2y ≤ 72; x ≥ 6; y ≥ 6",
        "solution": "Timber: 3x + 2y ≤ 72. At least 6 tables: x ≥ 6. At least 6 chairs: y ≥ 6.",
        "answerType": "expression",
        "accepted": [
          "3x+2y<=72, x>=6, y>=6"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "State the coordinates of the three vertices of the feasible region.",
        "marks": 3,
        "answer": "(6, 6); (6, 27); (20, 6)",
        "solution": "The region is bounded by x = 6, y = 6 and 3x + 2y = 72. Taking the lines in pairs gives (6, 6), (6, 27), (20, 6).",
        "answerType": "ordered"
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The profit on each table is $40 and on each chair is $30. Write an expression, in terms of x and y, for the TOTAL profit P.",
        "marks": 2,
        "answer": "P = 40x + 30y",
        "solution": "P = 40x + 30y.",
        "answerType": "expression",
        "accepted": [
          "40x+30y"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine the MAXIMUM profit, and the number of each item that should be made to obtain it.",
        "marks": 4,
        "answer": "$1050, from 6 tables and 27 chairs",
        "solution": "The maximum of a linear expression over a polygon occurs at a vertex. Testing each: P(6, 6) = 420; P(6, 27) = 1050; P(20, 6) = 980. The maximum profit is $1050, making 6 tables and 27 chairs.",
        "accepted": [
          "1050",
          "$1050"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q8-v8",
    "question_number": 8,
    "section": "II",
    "marks": 12,
    "topic": "Algebra, relations and functions",
    "design": "Q8-D the quadratic formula and a line meeting a curve",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Solve the equation 2x^2 - 7x - 3 = 0, giving your answers correct to 2 decimal places.",
        "marks": 5,
        "answer": "x = 3.89 and x = -0.39",
        "solution": "Using x = [-b ± sqrt(b^2 - 4ac)]/(2a) with a = 2, b = -7 and c = -3: b^2 - 4ac = 49 - 4(2)(-3) = 73, and sqrt(73) = 8.5440. So x = (7 ± 8.5440)/4, giving x = 3.89 or x = -0.39.",
        "answerType": "ordered",
        "accepted": [
          "-0.39, 3.89",
          "3.89, -0.39"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "The line y = 3x + 1 meets the curve y = x^2 + 2x - 5. Show that the x-coordinates of the points of intersection satisfy x^2 - x - 6 = 0.",
        "marks": 3,
        "answer": "x^2 - x - 6 = 0",
        "solution": "At a point of intersection the two y-values are equal, so x^2 + 2x - 5 = 3x + 1. Collecting all the terms on one side gives x^2 - x - 6 = 0.",
        "answerType": "expression"
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Hence determine the coordinates of the TWO points at which the line meets the curve.",
        "marks": 4,
        "answer": "(-2, -5) and (3, 10)",
        "solution": "Factorising, (x + 2)(x - 3) = 0, so x = -2 or x = 3. Substituting into y = 3x + 1 gives y = -5 and y = 10. The points are (-2, -5) and (3, 10).",
        "answerType": "ordered",
        "accepted": [
          "(-2,-5), (3,10)"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q8-v9",
    "question_number": 8,
    "section": "II",
    "marks": 12,
    "topic": "Algebra, relations and functions",
    "design": "Q8-D the quadratic formula and a line meeting a curve",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Solve the equation 3x^2 + 5x - 1 = 0, giving your answers correct to 2 decimal places.",
        "marks": 5,
        "answer": "x = 0.18 and x = -1.85",
        "solution": "Using x = [-b ± sqrt(b^2 - 4ac)]/(2a) with a = 3, b = 5 and c = -1: b^2 - 4ac = 25 - 4(3)(-1) = 37, and sqrt(37) = 6.0828. So x = (-5 ± 6.0828)/6, giving x = 0.18 or x = -1.85.",
        "answerType": "ordered",
        "accepted": [
          "-1.85, 0.18",
          "0.18, -1.85"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "The line y = 2x - 2 meets the curve y = x^2 - 3x + 4. Show that the x-coordinates of the points of intersection satisfy x^2 - 5x + 6 = 0.",
        "marks": 3,
        "answer": "x^2 - 5x + 6 = 0",
        "solution": "At a point of intersection the two y-values are equal, so x^2 - 3x + 4 = 2x - 2. Collecting all the terms on one side gives x^2 - 5x + 6 = 0.",
        "answerType": "expression"
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Hence determine the coordinates of the TWO points at which the line meets the curve.",
        "marks": 4,
        "answer": "(2, 2) and (3, 4)",
        "solution": "Factorising, (x - 2)(x - 3) = 0, so x = 2 or x = 3. Substituting into y = 2x - 2 gives y = 2 and y = 4. The points are (2, 2) and (3, 4).",
        "answerType": "ordered",
        "accepted": [
          "(2,2), (3,4)"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q8-v10",
    "question_number": 8,
    "section": "II",
    "marks": 12,
    "topic": "Algebra, relations and functions",
    "design": "Q8-D the quadratic formula and a line meeting a curve",
    "stem": "",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Solve the equation 2x^2 + 5x - 4 = 0, giving your answers correct to 2 decimal places.",
        "marks": 5,
        "answer": "x = 0.64 and x = -3.14",
        "solution": "Using x = [-b ± sqrt(b^2 - 4ac)]/(2a) with a = 2, b = 5 and c = -4: b^2 - 4ac = 25 - 4(2)(-4) = 57, and sqrt(57) = 7.5498. So x = (-5 ± 7.5498)/4, giving x = 0.64 or x = -3.14.",
        "answerType": "ordered",
        "accepted": [
          "-3.14, 0.64",
          "0.64, -3.14"
        ]
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "The line y = 4x - 1 meets the curve y = x^2 + x - 11. Show that the x-coordinates of the points of intersection satisfy x^2 - 3x - 10 = 0.",
        "marks": 3,
        "answer": "x^2 - 3x - 10 = 0",
        "solution": "At a point of intersection the two y-values are equal, so x^2 + x - 11 = 4x - 1. Collecting all the terms on one side gives x^2 - 3x - 10 = 0.",
        "answerType": "expression"
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Hence determine the coordinates of the TWO points at which the line meets the curve.",
        "marks": 4,
        "answer": "(-2, -9) and (5, 19)",
        "solution": "Factorising, (x + 2)(x - 5) = 0, so x = -2 or x = 5. Substituting into y = 4x - 1 gives y = -9 and y = 19. The points are (-2, -9) and (5, 19).",
        "answerType": "ordered",
        "accepted": [
          "(-2,-9), (5,19)"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q9-v1",
    "question_number": 9,
    "section": "II",
    "marks": 12,
    "topic": "Geometry and trigonometry",
    "design": "Q9-A circle theorems and a two-leg bearing journey",
    "stem": "",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "In the diagram below, O is the centre of the circle and A, B and C lie on the circumference. Angle AOB = 104°. Determine the value of x, the size of angle ACB, giving a reason for your answer.",
        "marks": 3,
        "answer": "52",
        "solution": "The angle at the centre is twice the angle at the circumference standing on the same arc AB, so x = 104 / 2 = 52.",
        "suffix": "°",
        "tolerance": 0.011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 310 300\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"152\" cy=\"152\" r=\"107\"/><path d=\"M152 44 L74 226 M152 44 L230 226\"/><path d=\"M152 152 L74 226 M152 152 L230 226 M74 226 L230 226\"/><path d=\"M138.6 75.3 A34 34 0 0 0 165.4 75.3\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"152.0\" y=\"62.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">x&#176;</text><path d=\"M125.9 176.8 A36 36 0 0 0 178.1 176.8\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"152.0\" y=\"171.8\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">104&#176;</text><circle cx=\"152\" cy=\"152\" r=\"2.8\" fill=\"currentColor\"/><text x=\"152.0\" y=\"28.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">C</text><text x=\"56.0\" y=\"236.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"248.0\" y=\"236.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"168.0\" y=\"148.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text></svg>",
          "alt": "A circle with centre O. A and B lie on the circumference with the chord AB drawn and C on the major arc. Angle ACB is marked x and angle AOB is 104 degrees."
        }
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Determine the size of angle OAB, showing your working.",
        "marks": 2,
        "answer": "38",
        "solution": "OA = OB because both are radii, so triangle OAB is isosceles and angle OAB = angle OBA. The angle sum gives angle OAB = (180 - 104) / 2 = 38°.",
        "suffix": "°",
        "tolerance": 0.011
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "A yacht leaves port P and sails 90 km on a bearing of 040° to Q. It then sails 120 km on a bearing of 130° to R. Show that angle PQR = 90°.",
        "marks": 3,
        "answer": "Angle PQR = 90°",
        "solution": "The bearing of P from Q is 40 + 180 = 220°. The bearing of R from Q is 130°. Angle PQR = 220 - 130 = 90°.",
        "answerType": "text",
        "accepted": [
          "90",
          "90 degrees"
        ],
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 390\" width=\"100%\" style=\"max-width:360px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M83.9 271.0 L83.9 207.3\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M83.9 201.0 L88.3 208.0 L79.6 208.0 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"83.9\" y=\"191.0\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">N</text><path d=\"M83.9 271.0 L165.9 173.4\" stroke-width=\"2\"/><path d=\"M83.9 235.0 A36 36 0 0 1 107.1 243.5\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"90.7\" y=\"252.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">40&#176;</text><text x=\"144.8\" y=\"238.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">90 km</text><path d=\"M165.9 173.4 L165.9 109.7\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M165.9 103.4 L170.2 110.4 L161.5 110.4 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"165.9\" y=\"93.4\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">N</text><path d=\"M165.9 173.4 L296.1 282.6\" stroke-width=\"2\"/><path d=\"M165.9 137.4 A36 36 0 0 1 193.4 196.5\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"183.8\" y=\"165.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">130&#176;</text><text x=\"214.3\" y=\"247.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">120 km</text><circle cx=\"83.9\" cy=\"271.0\" r=\"3.2\" fill=\"currentColor\"/><text x=\"67.9\" y=\"281.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">P</text><circle cx=\"165.9\" cy=\"173.4\" r=\"3.2\" fill=\"currentColor\"/><text x=\"149.9\" y=\"183.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">Q</text><circle cx=\"296.1\" cy=\"282.6\" r=\"3.2\" fill=\"currentColor\"/><text x=\"280.1\" y=\"292.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">R</text></svg>",
          "alt": "Point P with a north line, a leg of 90 km on a bearing of 040 degrees to Q, then a leg of 120 km on a bearing of 130 degrees to R."
        }
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate the distance PR.",
        "marks": 2,
        "answer": "150",
        "solution": "Triangle PQR is right-angled at Q, so PR^2 = 90^2 + 120^2 = 22500 and PR = 150 km.",
        "suffix": " km",
        "tolerance": 0.11
      },
      {
        "id": "b3",
        "label": "(b) (iii)",
        "prompt": "Calculate the bearing of R from P, to the nearest degree.",
        "marks": 2,
        "answer": "093",
        "solution": "tan(angle QPR) = 120/90, so angle QPR = 53.1°. The bearing of R from P is 40 + 53.1 = 93.1°, which is 093° to the nearest degree.",
        "suffix": "°",
        "tolerance": 0.51
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q9-v2",
    "question_number": 9,
    "section": "II",
    "marks": 12,
    "topic": "Geometry and trigonometry",
    "design": "Q9-A circle theorems and a two-leg bearing journey",
    "stem": "",
    "parts": [
      {
        "id": "a1",
        "label": "(a) (i)",
        "prompt": "In the diagram below, O is the centre of the circle and A, B and C lie on the circumference. Angle AOB = 128°. Determine the value of x, the size of angle ACB, giving a reason for your answer.",
        "marks": 3,
        "answer": "64",
        "solution": "The angle at the centre is twice the angle at the circumference standing on the same arc AB, so x = 128 / 2 = 64.",
        "suffix": "°",
        "tolerance": 0.011,
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 310 300\" width=\"100%\" style=\"max-width:300px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"152\" cy=\"152\" r=\"107\"/><path d=\"M152 44 L74 226 M152 44 L230 226\"/><path d=\"M152 152 L74 226 M152 152 L230 226 M74 226 L230 226\"/><path d=\"M138.6 75.3 A34 34 0 0 0 165.4 75.3\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"152.0\" y=\"62.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">x&#176;</text><path d=\"M125.9 176.8 A36 36 0 0 0 178.1 176.8\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"152.0\" y=\"171.8\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">128&#176;</text><circle cx=\"152\" cy=\"152\" r=\"2.8\" fill=\"currentColor\"/><text x=\"152.0\" y=\"28.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">C</text><text x=\"56.0\" y=\"236.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"248.0\" y=\"236.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"168.0\" y=\"148.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text></svg>",
          "alt": "A circle with centre O. A and B lie on the circumference with the chord AB drawn and C on the major arc. Angle ACB is marked x and angle AOB is 128 degrees."
        }
      },
      {
        "id": "a2",
        "label": "(a) (ii)",
        "prompt": "Determine the size of angle OAB, showing your working.",
        "marks": 2,
        "answer": "26",
        "solution": "OA = OB because both are radii, so triangle OAB is isosceles and angle OAB = angle OBA. The angle sum gives angle OAB = (180 - 128) / 2 = 26°.",
        "suffix": "°",
        "tolerance": 0.011
      },
      {
        "id": "b1",
        "label": "(b) (i)",
        "prompt": "A yacht leaves port P and sails 60 km on a bearing of 055° to Q. It then sails 80 km on a bearing of 145° to R. Show that angle PQR = 90°.",
        "marks": 3,
        "answer": "Angle PQR = 90°",
        "solution": "The bearing of P from Q is 55 + 180 = 235°. The bearing of R from Q is 145°. Angle PQR = 235 - 145 = 90°.",
        "answerType": "text",
        "accepted": [
          "90",
          "90 degrees"
        ],
        "diagram": {
          "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 390\" width=\"100%\" style=\"max-width:360px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M79.0 231.9 L79.0 168.2\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M79.0 161.9 L83.3 168.9 L74.7 168.9 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"79.0\" y=\"151.9\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">N</text><path d=\"M79.0 231.9 L193.8 151.5\" stroke-width=\"2\"/><path d=\"M79.0 195.9 A36 36 0 0 1 108.5 211.2\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"88.1\" y=\"214.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">55&#176;</text><text x=\"151.3\" y=\"213.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">60 km</text><path d=\"M193.8 151.5 L193.8 87.8\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M193.8 81.5 L198.2 88.5 L189.5 88.5 Z\" fill=\"currentColor\" stroke=\"none\"/><text x=\"193.8\" y=\"71.5\" text-anchor=\"middle\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">N</text><path d=\"M193.8 151.5 L301.0 304.5\" stroke-width=\"2\"/><path d=\"M193.8 115.5 A36 36 0 0 1 214.5 180.9\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"212.7\" y=\"145.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">145&#176;</text><text x=\"226.1\" y=\"242.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">80 km</text><circle cx=\"79.0\" cy=\"231.9\" r=\"3.2\" fill=\"currentColor\"/><text x=\"63.0\" y=\"241.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">P</text><circle cx=\"193.8\" cy=\"151.5\" r=\"3.2\" fill=\"currentColor\"/><text x=\"177.8\" y=\"161.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">Q</text><circle cx=\"301.0\" cy=\"304.5\" r=\"3.2\" fill=\"currentColor\"/><text x=\"285.0\" y=\"314.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">R</text></svg>",
          "alt": "Point P with a north line, a leg of 60 km on a bearing of 055 degrees to Q, then a leg of 80 km on a bearing of 145 degrees to R."
        }
      },
      {
        "id": "b2",
        "label": "(b) (ii)",
        "prompt": "Calculate the distance PR.",
        "marks": 2,
        "answer": "100",
        "solution": "Triangle PQR is right-angled at Q, so PR^2 = 60^2 + 80^2 = 10000 and PR = 100 km.",
        "suffix": " km",
        "tolerance": 0.11
      },
      {
        "id": "b3",
        "label": "(b) (iii)",
        "prompt": "Calculate the bearing of R from P, to the nearest degree.",
        "marks": 2,
        "answer": "108",
        "solution": "tan(angle QPR) = 80/60, so angle QPR = 53.1°. The bearing of R from P is 55 + 53.1 = 108.1°, which is 108° to the nearest degree.",
        "suffix": "°",
        "tolerance": 0.51
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q9-v3",
    "question_number": 9,
    "section": "II",
    "marks": 12,
    "topic": "Geometry and trigonometry",
    "design": "Q9-B cosine rule, an angle by the cosine rule, and area",
    "stem": "In triangle LMK, LK = 9 cm, LM = 14 cm and angle KLM = 68°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the length of KM, giving your answer correct to 1 decimal place.",
        "marks": 4,
        "answer": "13.5",
        "solution": "By the cosine rule, KM^2 = 9^2 + 14^2 - 2(9)(14)cos 68° = 182.60, so KM = 13.51 = 13.5 cm.",
        "suffix": " cm",
        "tolerance": 0.051
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the size of angle LKM, giving your answer correct to the nearest degree.",
        "marks": 4,
        "answer": "74",
        "solution": "Use the cosine rule again, so that an obtuse angle is found correctly: cos(LKM) = (9^2 + 13.51^2 - 14^2) / (2 × 9 × 13.51), giving angle LKM = 73.9°, which is 74° to the nearest degree. Check: the three angles 68, 73.9 and 38.1 add to 180.",
        "suffix": "°",
        "tolerance": 0.51
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the area of triangle LMK, giving your answer correct to 1 decimal place.",
        "marks": 4,
        "answer": "58.4",
        "solution": "Area = 1/2 × LK × LM × sin(KLM) = 1/2 × 9 × 14 × sin 68° = 58.41 = 58.4 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.051
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 280\" width=\"100%\" style=\"max-width:380px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M48.0 224.6 L332.0 224.6 L116.4 55.4 Z\"/><path d=\"M82.0 224.6 A34 34 0 0 0 60.7 193.1\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"63.5\" y=\"214.2\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">68&#176;</text><text x=\"23.7\" y=\"236.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">L</text><text x=\"357.6\" y=\"233.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">M</text><text x=\"105.6\" y=\"30.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">K</text><text x=\"198.0\" y=\"243.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">14 cm</text><text x=\"63.3\" y=\"133.6\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">9 cm</text></svg>",
      "alt": "Triangle LMK with LM = 14 cm, LK = 9 cm and the angle between them at L marked 68 degrees."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q9-v4",
    "question_number": 9,
    "section": "II",
    "marks": 12,
    "topic": "Geometry and trigonometry",
    "design": "Q9-B cosine rule, an angle by the cosine rule, and area",
    "stem": "In triangle LMK, LK = 11 cm, LM = 15 cm and angle KLM = 57°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the length of KM, giving your answer correct to 1 decimal place.",
        "marks": 4,
        "answer": "12.9",
        "solution": "By the cosine rule, KM^2 = 11^2 + 15^2 - 2(11)(15)cos 57° = 166.27, so KM = 12.89 = 12.9 cm.",
        "suffix": " cm",
        "tolerance": 0.051
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the size of angle LKM, giving your answer correct to the nearest degree.",
        "marks": 4,
        "answer": "77",
        "solution": "Use the cosine rule again, so that an obtuse angle is found correctly: cos(LKM) = (11^2 + 12.89^2 - 15^2) / (2 × 11 × 12.89), giving angle LKM = 77.3°, which is 77° to the nearest degree. Check: the three angles 57, 77.3 and 45.7 add to 180.",
        "suffix": "°",
        "tolerance": 0.51
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the area of triangle LMK, giving your answer correct to 1 decimal place.",
        "marks": 4,
        "answer": "69.2",
        "solution": "Area = 1/2 × LK × LM × sin(KLM) = 1/2 × 11 × 15 × sin 57° = 69.19 = 69.2 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.051
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 280\" width=\"100%\" style=\"max-width:380px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M48.0 227.3 L332.0 227.3 L161.4 52.7 Z\"/><path d=\"M82.0 227.3 A34 34 0 0 0 66.5 198.8\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"64.4\" y=\"218.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">57&#176;</text><text x=\"23.3\" y=\"238.2\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">L</text><text x=\"357.2\" y=\"237.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">M</text><text x=\"157.1\" y=\"26.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">K</text><text x=\"193.2\" y=\"247.1\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">15 cm</text><text x=\"86.0\" y=\"132.8\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">11 cm</text></svg>",
      "alt": "Triangle LMK with LM = 15 cm, LK = 11 cm and the angle between them at L marked 57 degrees."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q9-v5",
    "question_number": 9,
    "section": "II",
    "marks": 12,
    "topic": "Geometry and trigonometry",
    "design": "Q9-B cosine rule, an angle by the cosine rule, and area",
    "stem": "In triangle LMK, LK = 8 cm, LM = 13 cm and angle KLM = 112°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the length of KM, giving your answer correct to 1 decimal place.",
        "marks": 4,
        "answer": "17.6",
        "solution": "By the cosine rule, KM^2 = 8^2 + 13^2 - 2(8)(13)cos 112° = 310.92, so KM = 17.63 = 17.6 cm.",
        "suffix": " cm",
        "tolerance": 0.051
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the size of angle LKM, giving your answer correct to the nearest degree.",
        "marks": 4,
        "answer": "43",
        "solution": "Use the cosine rule again, so that an obtuse angle is found correctly: cos(LKM) = (8^2 + 17.63^2 - 13^2) / (2 × 8 × 17.63), giving angle LKM = 43.1°, which is 43° to the nearest degree. Check: the three angles 112, 43.1 and 24.9 add to 180.",
        "suffix": "°",
        "tolerance": 0.51
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the area of triangle LMK, giving your answer correct to 1 decimal place.",
        "marks": 4,
        "answer": "48.2",
        "solution": "Area = 1/2 × LK × LM × sin(KLM) = 1/2 × 8 × 13 × sin 112° = 48.21 = 48.2 cm^2.",
        "suffix": " cm^2",
        "tolerance": 0.051
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 280\" width=\"100%\" style=\"max-width:380px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M101.2 205.8 L332.0 205.8 L48.0 74.2 Z\"/><path d=\"M135.2 205.8 A34 34 0 0 0 88.5 174.3\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"111.7\" y=\"190.3\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">112&#176;</text><text x=\"79.5\" y=\"221.9\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">L</text><text x=\"358.2\" y=\"212.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">M</text><text x=\"26.7\" y=\"57.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">K</text><text x=\"232.4\" y=\"218.2\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">13 cm</text><text x=\"55.2\" y=\"135.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"12\">8 cm</text></svg>",
      "alt": "Triangle LMK with LM = 13 cm, LK = 8 cm and the angle between them at L marked 112 degrees."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q9-v6",
    "question_number": 9,
    "section": "II",
    "marks": 12,
    "topic": "Geometry and trigonometry",
    "design": "Q9-C the alternate segment theorem",
    "stem": "In the diagram below, not drawn to scale, A, B and T are points on the circumference of a circle with centre O, and the straight line through T is a tangent to the circle. The angle between the tangent and the chord TA is 47°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Determine the value of x, the size of angle ABT, giving a reason for your answer.",
        "marks": 3,
        "answer": "47",
        "solution": "By the alternate segment theorem, the angle between a tangent and a chord equals the angle that the chord subtends in the alternate segment. Angle ABT stands on the chord TA in that segment, so x = 47.",
        "suffix": "°",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Given that angle BAT = 61°, calculate the size of angle ATB.",
        "marks": 3,
        "answer": "72",
        "solution": "In triangle ABT the three angles are 47°, 61° and angle ATB, so angle ATB = 180 - 47 - 61 = 72°.",
        "suffix": "°",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the size of the angle between the tangent and the chord TB, giving a reason for your answer.",
        "marks": 3,
        "answer": "61",
        "solution": "The chord TB subtends angle TAB = 61° in the alternate segment, so the angle between the tangent and TB is also 61°. Check: 47 + 72 + 61 = 180, the angles on the straight line at T.",
        "suffix": "°",
        "tolerance": 0.011
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Explain why OT is perpendicular to the tangent at T.",
        "marks": 3,
        "answer": "A tangent is perpendicular to the radius at the point of contact",
        "solution": "A tangent to a circle meets the radius drawn to the point of contact at a right angle. OT is that radius, so angle between OT and the tangent is 90°.",
        "answerType": "text",
        "accepted": [
          "radius",
          "perpendicular to the radius",
          "tangent perpendicular to radius"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 330\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"168\" cy=\"150\" r=\"104\"/><path d=\"M36 254 L300 254\"/><path d=\"M168.0 254.0 L77.9 98.0\"/><path d=\"M77.9 98.0 L213.6 56.5 L168.0 254.0\"/><circle cx=\"168\" cy=\"150\" r=\"2.6\" fill=\"currentColor\"/><path d=\"M134.0 254.0 A34 34 0 0 1 151.0 224.6\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"151.8\" y=\"244.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">47&#176;</text><path d=\"M183.0 65.9 A32 32 0 0 0 206.4 87.7\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"201.6\" y=\"69.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">x&#176;</text><text x=\"182.0\" y=\"144.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text><text x=\"168.0\" y=\"274.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">T</text><text x=\"57.9\" y=\"88.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"235.6\" y=\"42.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text></svg>",
      "alt": "A circle with centre O and a tangent touching at T. The chord TA is drawn and the angle between the tangent and TA is 47 degrees. B lies on the circumference and angle ABT is marked x."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q9-v7",
    "question_number": 9,
    "section": "II",
    "marks": 12,
    "topic": "Geometry and trigonometry",
    "design": "Q9-C the alternate segment theorem",
    "stem": "In the diagram below, not drawn to scale, A, B and T are points on the circumference of a circle with centre O, and the straight line through T is a tangent to the circle. The angle between the tangent and the chord TA is 52°.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Determine the value of x, the size of angle ABT, giving a reason for your answer.",
        "marks": 3,
        "answer": "52",
        "solution": "By the alternate segment theorem, the angle between a tangent and a chord equals the angle that the chord subtends in the alternate segment. Angle ABT stands on the chord TA in that segment, so x = 52.",
        "suffix": "°",
        "tolerance": 0.011
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Given that angle BAT = 58°, calculate the size of angle ATB.",
        "marks": 3,
        "answer": "70",
        "solution": "In triangle ABT the three angles are 52°, 58° and angle ATB, so angle ATB = 180 - 52 - 58 = 70°.",
        "suffix": "°",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State the size of the angle between the tangent and the chord TB, giving a reason for your answer.",
        "marks": 3,
        "answer": "58",
        "solution": "The chord TB subtends angle TAB = 58° in the alternate segment, so the angle between the tangent and TB is also 58°. Check: 52 + 70 + 58 = 180, the angles on the straight line at T.",
        "suffix": "°",
        "tolerance": 0.011
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Explain why OT is perpendicular to the tangent at T.",
        "marks": 3,
        "answer": "A tangent is perpendicular to the radius at the point of contact",
        "solution": "A tangent to a circle meets the radius drawn to the point of contact at a right angle. OT is that radius, so angle between OT and the tangent is 90°.",
        "answerType": "text",
        "accepted": [
          "radius",
          "perpendicular to the radius",
          "tangent perpendicular to radius"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 330\" width=\"100%\" style=\"max-width:340px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><circle cx=\"168\" cy=\"150\" r=\"104\"/><path d=\"M36 254 L300 254\"/><path d=\"M168.0 254.0 L77.9 98.0\"/><path d=\"M77.9 98.0 L213.6 56.5 L168.0 254.0\"/><circle cx=\"168\" cy=\"150\" r=\"2.6\" fill=\"currentColor\"/><path d=\"M134.0 254.0 A34 34 0 0 1 151.0 224.6\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"151.8\" y=\"244.7\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">52&#176;</text><path d=\"M183.0 65.9 A32 32 0 0 0 206.4 87.7\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"201.6\" y=\"69.4\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"11\">x&#176;</text><text x=\"182.0\" y=\"144.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text><text x=\"168.0\" y=\"274.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">T</text><text x=\"57.9\" y=\"88.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"235.6\" y=\"42.5\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text></svg>",
      "alt": "A circle with centre O and a tangent touching at T. The chord TA is drawn and the angle between the tangent and TA is 52 degrees. B lies on the circumference and angle ABT is marked x."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q9-v8",
    "question_number": 9,
    "section": "II",
    "marks": 12,
    "topic": "Geometry and trigonometry",
    "design": "Q9-D bearings resolved into north and east components",
    "stem": "A ship leaves port P and sails 60 km on a bearing of 210° to Q. It then sails 80 km on a bearing of 120° to R.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate how far south of P the point Q is, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "52.0",
        "solution": "A bearing is measured clockwise from north, so the northerly component is 60 cos 210° = -51.96. Q is 52.0 km south of P.",
        "suffix": " km",
        "tolerance": 0.051
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate how far west of P the point Q is, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "30.0",
        "solution": "The easterly component is 60 sin 210° = -30.00, so Q is 30.0 km west of P. Check: 52.0^2 + 30.0^2 gives 60^2.",
        "suffix": " km",
        "tolerance": 0.051
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the distance PR, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "100.0",
        "solution": "Adding the components of the second leg, R is -91.96 km north and 39.28 km east of P. So PR = sqrt(-91.96^2 + 39.28^2) = 100.0 km.",
        "suffix": " km",
        "tolerance": 0.11
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate the bearing of R from P, to the nearest degree.",
        "marks": 3,
        "answer": "157",
        "solution": "tan(bearing) = east / north = 39.28 / -91.96, so the bearing of R from P is 156.9°, that is 157° to the nearest degree.",
        "suffix": "°",
        "tolerance": 0.51
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q9-v9",
    "question_number": 9,
    "section": "II",
    "marks": 12,
    "topic": "Geometry and trigonometry",
    "design": "Q9-D bearings resolved into north and east components",
    "stem": "A ship leaves port P and sails 45 km on a bearing of 320° to Q. It then sails 70 km on a bearing of 050° to R.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate how far north of P the point Q is, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "34.5",
        "solution": "A bearing is measured clockwise from north, so the northerly component is 45 cos 320° = 34.47. Q is 34.5 km north of P.",
        "suffix": " km",
        "tolerance": 0.051
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate how far west of P the point Q is, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "28.9",
        "solution": "The easterly component is 45 sin 320° = -28.93, so Q is 28.9 km west of P. Check: 34.5^2 + 28.9^2 gives 45^2.",
        "suffix": " km",
        "tolerance": 0.051
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the distance PR, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "83.2",
        "solution": "Adding the components of the second leg, R is 79.47 km north and 24.70 km east of P. So PR = sqrt(79.47^2 + 24.70^2) = 83.2 km.",
        "suffix": " km",
        "tolerance": 0.11
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate the bearing of R from P, to the nearest degree.",
        "marks": 3,
        "answer": "017",
        "solution": "tan(bearing) = east / north = 24.70 / 79.47, so the bearing of R from P is 17.3°, that is 017° to the nearest degree.",
        "suffix": "°",
        "tolerance": 0.51
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q9-v10",
    "question_number": 9,
    "section": "II",
    "marks": 12,
    "topic": "Geometry and trigonometry",
    "design": "Q9-D bearings resolved into north and east components",
    "stem": "A ship leaves port P and sails 90 km on a bearing of 240° to Q. It then sails 50 km on a bearing of 150° to R.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate how far south of P the point Q is, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "45.0",
        "solution": "A bearing is measured clockwise from north, so the northerly component is 90 cos 240° = -45.00. Q is 45.0 km south of P.",
        "suffix": " km",
        "tolerance": 0.051
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate how far west of P the point Q is, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "77.9",
        "solution": "The easterly component is 90 sin 240° = -77.94, so Q is 77.9 km west of P. Check: 45.0^2 + 77.9^2 gives 90^2.",
        "suffix": " km",
        "tolerance": 0.051
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Calculate the distance PR, giving your answer correct to 1 decimal place.",
        "marks": 3,
        "answer": "103.0",
        "solution": "Adding the components of the second leg, R is -88.30 km north and -52.94 km east of P. So PR = sqrt(-88.30^2 + -52.94^2) = 103.0 km.",
        "suffix": " km",
        "tolerance": 0.11
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Calculate the bearing of R from P, to the nearest degree.",
        "marks": 3,
        "answer": "211",
        "solution": "tan(bearing) = east / north = -52.94 / -88.30, so the bearing of R from P is 210.9°, that is 211° to the nearest degree.",
        "suffix": "°",
        "tolerance": 0.51
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q10-v1",
    "question_number": 10,
    "section": "II",
    "marks": 12,
    "topic": "Vectors and matrices",
    "design": "Q10-A matrix product, determinant, inverse and a matrix solution",
    "stem": "The matrices M and N are given by M = [[2, 3], [1, 5]] and N = [[4, -1], [0, 2]].",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the matrix product MN.",
        "marks": 3,
        "answer": "[[8, 4], [4, 9]]",
        "solution": "Pair each row of M with each column of N: entry (1,1) = 2(4) + 3(0) = 8; entry (1,2) = 2(-1) + 3(2) = 4; entry (2,1) = 1(4) + 5(0) = 4; entry (2,2) = 1(-1) + 5(2) = 9.",
        "answerType": "ordered",
        "accepted": [
          "8,4,4,9"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the determinant of M.",
        "marks": 2,
        "answer": "7",
        "solution": "det M = (2)(5) - (3)(1) = 10 - 3 = 7."
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine M^-1, the inverse of M.",
        "marks": 3,
        "answer": "(1/7)[[5, -3], [-1, 2]]",
        "solution": "Interchange the entries on the leading diagonal and change the sign of the other two, then divide by the determinant: M^-1 = (1/7)[[5, -3], [-1, 2]]. Check: M × M^-1 gives the identity matrix.",
        "answerType": "ordered",
        "accepted": [
          "1/7[[5,-3],[-1,2]]"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Hence use a matrix method to solve the pair of simultaneous equations 2x + 3y = 13 and 1x + 5y = 17.",
        "marks": 4,
        "answer": "x = 2, y = 3",
        "solution": "The system is M(x, y) = (13, 17), so (x, y) = M^-1(13, 17) = (1/7)(5(13) + (-3)(17), (-1)(13) + 2(17)) = (1/7)(14, 21), giving x = 2 and y = 3. Check: 2(2) + 3(3) = 13.",
        "accepted": [
          "(2, 3)",
          "2, 3"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q10-v2",
    "question_number": 10,
    "section": "II",
    "marks": 12,
    "topic": "Vectors and matrices",
    "design": "Q10-A matrix product, determinant, inverse and a matrix solution",
    "stem": "The matrices M and N are given by M = [[3, 1], [2, 4]] and N = [[1, -2], [0, 5]].",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the matrix product MN.",
        "marks": 3,
        "answer": "[[3, -1], [2, 16]]",
        "solution": "Pair each row of M with each column of N: entry (1,1) = 3(1) + 1(0) = 3; entry (1,2) = 3(-2) + 1(5) = -1; entry (2,1) = 2(1) + 4(0) = 2; entry (2,2) = 2(-2) + 4(5) = 16.",
        "answerType": "ordered",
        "accepted": [
          "3,-1,2,16"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the determinant of M.",
        "marks": 2,
        "answer": "10",
        "solution": "det M = (3)(4) - (1)(2) = 12 - 2 = 10."
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine M^-1, the inverse of M.",
        "marks": 3,
        "answer": "(1/10)[[4, -1], [-2, 3]]",
        "solution": "Interchange the entries on the leading diagonal and change the sign of the other two, then divide by the determinant: M^-1 = (1/10)[[4, -1], [-2, 3]]. Check: M × M^-1 gives the identity matrix.",
        "answerType": "ordered",
        "accepted": [
          "1/10[[4,-1],[-2,3]]"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Hence use a matrix method to solve the pair of simultaneous equations 3x + 1y = 11 and 2x + 4y = 24.",
        "marks": 4,
        "answer": "x = 2, y = 5",
        "solution": "The system is M(x, y) = (11, 24), so (x, y) = M^-1(11, 24) = (1/10)(4(11) + (-1)(24), (-2)(11) + 3(24)) = (1/10)(20, 50), giving x = 2 and y = 5. Check: 3(2) + 1(5) = 11.",
        "accepted": [
          "(2, 5)",
          "2, 5"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q10-v3",
    "question_number": 10,
    "section": "II",
    "marks": 12,
    "topic": "Vectors and matrices",
    "design": "Q10-A matrix product, determinant, inverse and a matrix solution",
    "stem": "The matrices M and N are given by M = [[4, 3], [2, 5]] and N = [[2, 0], [1, 3]].",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Calculate the matrix product MN.",
        "marks": 3,
        "answer": "[[11, 9], [9, 15]]",
        "solution": "Pair each row of M with each column of N: entry (1,1) = 4(2) + 3(1) = 11; entry (1,2) = 4(0) + 3(3) = 9; entry (2,1) = 2(2) + 5(1) = 9; entry (2,2) = 2(0) + 5(3) = 15.",
        "answerType": "ordered",
        "accepted": [
          "11,9,9,15"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Determine the determinant of M.",
        "marks": 2,
        "answer": "14",
        "solution": "det M = (4)(5) - (3)(2) = 20 - 6 = 14."
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine M^-1, the inverse of M.",
        "marks": 3,
        "answer": "(1/14)[[5, -3], [-2, 4]]",
        "solution": "Interchange the entries on the leading diagonal and change the sign of the other two, then divide by the determinant: M^-1 = (1/14)[[5, -3], [-2, 4]]. Check: M × M^-1 gives the identity matrix.",
        "answerType": "ordered",
        "accepted": [
          "1/14[[5,-3],[-2,4]]"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Hence use a matrix method to solve the pair of simultaneous equations 4x + 3y = 15 and 2x + 5y = 11.",
        "marks": 4,
        "answer": "x = 3, y = 1",
        "solution": "The system is M(x, y) = (15, 11), so (x, y) = M^-1(15, 11) = (1/14)(5(15) + (-3)(11), (-2)(15) + 4(11)) = (1/14)(42, 14), giving x = 3 and y = 1. Check: 4(3) + 3(1) = 15.",
        "accepted": [
          "(3, 1)",
          "3, 1"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q10-v4",
    "question_number": 10,
    "section": "II",
    "marks": 12,
    "topic": "Vectors and matrices",
    "design": "Q10-B rotation and enlargement matrices combined",
    "stem": "The matrix R = [[0, -1], [1, 0]] represents an anticlockwise rotation of 90° about the origin, and the matrix T = [[k, 0], [0, k]] represents an enlargement with centre the origin and scale factor k.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Determine the image of the point P(3, 2) under the rotation R.",
        "marks": 3,
        "answer": "(-2, 3)",
        "solution": "R(P) = (0(3) + (-1)(2), 1(3) + 0(2)) = (-2, 3). Check: the distance from the origin is unchanged.",
        "answerType": "coordinate"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Under the enlargement T, the image of the point (4, -3) is (10, -7.5). Determine the value of k.",
        "marks": 3,
        "answer": "2.5",
        "solution": "T(4, -3) = (4k, -3k) = (10, -7.5), so 4k = 10 and k = 2.5. Check: -3 × 2.5 = -7.5.",
        "accepted": [
          "5/2"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the SINGLE matrix that represents the rotation R followed by the enlargement T.",
        "marks": 3,
        "answer": "[[0, -2.5], [2.5, 0]]",
        "solution": "Doing R first and then T is represented by the product TR (the second transformation on the left): TR = [[2.5, 0], [0, 2.5]] × [[0, -1], [1, 0]] = [[0, -2.5], [2.5, 0]].",
        "answerType": "ordered",
        "accepted": [
          "0,-2.5,2.5,0"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "State the determinant of the single matrix found in part (c), and state what it tells you about areas under the combined transformation.",
        "marks": 3,
        "answer": "6.25; areas are multiplied by 6.25",
        "solution": "det = (0)(0) - (-2.5)(2.5) = 6.25. The determinant of a transformation matrix is the factor by which areas are multiplied, so every area is multiplied by 6.25. The rotation alone does not change area, and the enlargement multiplies it by k^2.",
        "accepted": [
          "6.25"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q10-v5",
    "question_number": 10,
    "section": "II",
    "marks": 12,
    "topic": "Vectors and matrices",
    "design": "Q10-B rotation and enlargement matrices combined",
    "stem": "The matrix R = [[0, -1], [1, 0]] represents an anticlockwise rotation of 90° about the origin, and the matrix T = [[k, 0], [0, k]] represents an enlargement with centre the origin and scale factor k.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Determine the image of the point P(2, 5) under the rotation R.",
        "marks": 3,
        "answer": "(-5, 2)",
        "solution": "R(P) = (0(2) + (-1)(5), 1(2) + 0(5)) = (-5, 2). Check: the distance from the origin is unchanged.",
        "answerType": "coordinate"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Under the enlargement T, the image of the point (-2, 4) is (-6, 12). Determine the value of k.",
        "marks": 3,
        "answer": "3",
        "solution": "T(-2, 4) = (-2k, 4k) = (-6, 12), so -2k = -6 and k = 3. Check: 4 × 3 = 12.",
        "accepted": [
          "3"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "Determine the SINGLE matrix that represents the rotation R followed by the enlargement T.",
        "marks": 3,
        "answer": "[[0, -3], [3, 0]]",
        "solution": "Doing R first and then T is represented by the product TR (the second transformation on the left): TR = [[3, 0], [0, 3]] × [[0, -1], [1, 0]] = [[0, -3], [3, 0]].",
        "answerType": "ordered",
        "accepted": [
          "0,-3,3,0"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "State the determinant of the single matrix found in part (c), and state what it tells you about areas under the combined transformation.",
        "marks": 3,
        "answer": "9; areas are multiplied by 9",
        "solution": "det = (0)(0) - (-3)(3) = 9. The determinant of a transformation matrix is the factor by which areas are multiplied, so every area is multiplied by 9. The rotation alone does not change area, and the enlargement multiplies it by k^2.",
        "accepted": [
          "9"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q10-v6",
    "question_number": 10,
    "section": "II",
    "marks": 12,
    "topic": "Vectors and matrices",
    "design": "Q10-C vector geometry and the midpoint theorem",
    "stem": "In the diagram below, not drawn to scale, OAB is a triangle in which \\vec{OA} = a and \\vec{OB} = b. M is the midpoint of OA and N is the midpoint of OB.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write, in terms of a and b, an expression for \\vec{AB}.",
        "marks": 2,
        "answer": "b - a",
        "solution": "\\vec{AB} = \\vec{AO} + \\vec{OB} = -a + b = b - a.",
        "answerType": "expression",
        "accepted": [
          "-a+b",
          "b-a"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write, in terms of a and b, an expression for \\vec{MN}, in its simplest form.",
        "marks": 3,
        "answer": "(1/2)(b - a)",
        "solution": "\\vec{OM} = (1/2)a and \\vec{ON} = (1/2)b, so \\vec{MN} = \\vec{ON} - \\vec{OM} = (1/2)b - (1/2)a = (1/2)(b - a).",
        "answerType": "expression",
        "accepted": [
          "1/2(b-a)",
          "(b-a)/2",
          "0.5(b-a)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State TWO geometrical relationships between MN and AB, giving a reason for your answer.",
        "marks": 3,
        "answer": "MN is parallel to AB and MN is half the length of AB",
        "solution": "\\vec{MN} = (1/2)\\vec{AB}, so MN is a scalar multiple of AB. Two vectors that are scalar multiples of one another are parallel, so MN is parallel to AB, and since the scalar is 1/2, MN is half as long as AB.",
        "answerType": "text",
        "accepted": [
          "parallel and half",
          "parallel, half the length"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "The point P is such that \\vec{OP} = a + b. Show that OAPB is a parallelogram.",
        "marks": 4,
        "answer": "\\vec{AP} = b = \\vec{OB}, so OAPB is a parallelogram",
        "solution": "\\vec{AP} = \\vec{OP} - \\vec{OA} = (a + b) - a = b, and \\vec{OB} = b. So AP and OB are equal in length and parallel. A quadrilateral with one pair of opposite sides equal and parallel is a parallelogram, so OAPB is a parallelogram.",
        "answerType": "text",
        "accepted": [
          "AP = OB",
          "AP = b",
          "parallelogram"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 370 300\" width=\"100%\" style=\"max-width:350px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M66.0 254.0 L150.0 66.0 L312.0 178.0 Z\"/><path d=\"M66.0 254.0 L89.6 201.2\" stroke-width=\"2.6\"/><path d=\"M92.9 193.8 L94.3 204.3 L84.1 199.8 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M66.0 254.0 L137.0 232.1\" stroke-width=\"2.6\"/><path d=\"M144.7 229.7 L137.8 237.7 L134.5 227.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M108.0 160.0 L189.0 216.0\" stroke-dasharray=\"6 4\" stroke-width=\"1.5\"/><circle cx=\"108.0\" cy=\"160.0\" r=\"3.6\" fill=\"currentColor\"/><circle cx=\"189.0\" cy=\"216.0\" r=\"3.6\" fill=\"currentColor\"/><text x=\"48.0\" y=\"264.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text><text x=\"150.0\" y=\"46.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"332.0\" y=\"178.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"84.0\" y=\"158.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">M</text><text x=\"195.0\" y=\"239.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">N</text><text x=\"64.0\" y=\"218.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"15\" font-style=\"italic\" font-weight=\"bold\">a</text><text x=\"123.0\" y=\"251.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"15\" font-style=\"italic\" font-weight=\"bold\">b</text></svg>",
      "alt": "Triangle OAB with the vector a drawn along OA and the vector b along OB. M is the midpoint of OA, N the midpoint of OB, and MN is drawn as a dashed line."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q10-v7",
    "question_number": 10,
    "section": "II",
    "marks": 12,
    "topic": "Vectors and matrices",
    "design": "Q10-C vector geometry and the midpoint theorem",
    "stem": "In the diagram below, not drawn to scale, OAB is a triangle in which \\vec{OA} = a and \\vec{OB} = b. M is the midpoint of OA and N is the midpoint of OB.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Write, in terms of a and b, an expression for \\vec{AB}.",
        "marks": 2,
        "answer": "b - a",
        "solution": "\\vec{AB} = \\vec{AO} + \\vec{OB} = -a + b = b - a.",
        "answerType": "expression",
        "accepted": [
          "-a+b",
          "b-a"
        ]
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Write, in terms of a and b, an expression for \\vec{MN}, in its simplest form.",
        "marks": 3,
        "answer": "(1/2)(b - a)",
        "solution": "\\vec{OM} = (1/2)a and \\vec{ON} = (1/2)b, so \\vec{MN} = \\vec{ON} - \\vec{OM} = (1/2)b - (1/2)a = (1/2)(b - a).",
        "answerType": "expression",
        "accepted": [
          "1/2(b-a)",
          "(b-a)/2",
          "0.5(b-a)"
        ]
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "State TWO geometrical relationships between MN and AB, giving a reason for your answer.",
        "marks": 3,
        "answer": "MN is parallel to AB and MN is half the length of AB",
        "solution": "\\vec{MN} = (1/2)\\vec{AB}, so MN is a scalar multiple of AB. Two vectors that are scalar multiples of one another are parallel, so MN is parallel to AB, and since the scalar is 1/2, MN is half as long as AB.",
        "answerType": "text",
        "accepted": [
          "parallel and half",
          "parallel, half the length"
        ]
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "The point P is such that \\vec{OP} = a + b. Show that OAPB is a parallelogram.",
        "marks": 4,
        "answer": "\\vec{AP} = b = \\vec{OB}, so OAPB is a parallelogram",
        "solution": "\\vec{AP} = \\vec{OP} - \\vec{OA} = (a + b) - a = b, and \\vec{OB} = b. So AP and OB are equal in length and parallel. A quadrilateral with one pair of opposite sides equal and parallel is a parallelogram, so OAPB is a parallelogram.",
        "answerType": "text",
        "accepted": [
          "AP = OB",
          "AP = b",
          "parallelogram"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "diagram": {
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 370 300\" width=\"100%\" style=\"max-width:350px;height:auto;color:inherit\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" font-family=\"Georgia,serif\" font-size=\"13\"><path d=\"M66.0 254.0 L150.0 66.0 L312.0 178.0 Z\"/><path d=\"M66.0 254.0 L89.6 201.2\" stroke-width=\"2.6\"/><path d=\"M92.9 193.8 L94.3 204.3 L84.1 199.8 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M66.0 254.0 L137.0 232.1\" stroke-width=\"2.6\"/><path d=\"M144.7 229.7 L137.8 237.7 L134.5 227.0 Z\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M108.0 160.0 L189.0 216.0\" stroke-dasharray=\"6 4\" stroke-width=\"1.5\"/><circle cx=\"108.0\" cy=\"160.0\" r=\"3.6\" fill=\"currentColor\"/><circle cx=\"189.0\" cy=\"216.0\" r=\"3.6\" fill=\"currentColor\"/><text x=\"48.0\" y=\"264.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">O</text><text x=\"150.0\" y=\"46.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">A</text><text x=\"332.0\" y=\"178.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">B</text><text x=\"84.0\" y=\"158.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">M</text><text x=\"195.0\" y=\"239.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"13\" font-style=\"italic\">N</text><text x=\"64.0\" y=\"218.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"15\" font-style=\"italic\" font-weight=\"bold\">a</text><text x=\"123.0\" y=\"251.0\" text-anchor=\"middle\" dominant-baseline=\"central\" stroke=\"none\" fill=\"currentColor\" font-size=\"15\" font-style=\"italic\" font-weight=\"bold\">b</text></svg>",
      "alt": "Triangle OAB with the vector a drawn along OA and the vector b along OB. M is the midpoint of OA, N the midpoint of OB, and MN is drawn as a dashed line."
    },
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q10-v8",
    "question_number": 10,
    "section": "II",
    "marks": 12,
    "topic": "Vectors and matrices",
    "design": "Q10-D position vectors, magnitude and a point dividing a line",
    "stem": "The position vectors of A and B relative to the origin O are \\vec{OA} = (3, 1) and \\vec{OB} = (7, 9), written as column vectors.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Determine \\vec{AB}.",
        "marks": 3,
        "answer": "(4, 8)",
        "solution": "\\vec{AB} = \\vec{OB} - \\vec{OA} = (7 - 3, 9 - 1) = (4, 8).",
        "answerType": "coordinate"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the magnitude of \\vec{AB}, giving your answer correct to 2 decimal places.",
        "marks": 3,
        "answer": "8.94",
        "solution": "|\\vec{AB}| = sqrt(4^2 + 8^2) = sqrt(80) = 8.94 units.",
        "suffix": " units",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The point C lies on AB such that AC : CB = 1 : 3. Determine the position vector \\vec{OC}.",
        "marks": 4,
        "answer": "(4, 3)",
        "solution": "AC : CB = 1 : 3, so \\vec{AC} = (1/4)\\vec{AB} = (1, 2). Then \\vec{OC} = \\vec{OA} + \\vec{AC} = (4, 3).",
        "answerType": "coordinate"
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine whether \\vec{OC} is parallel to \\vec{AB}, justifying your answer.",
        "marks": 2,
        "answer": "not parallel",
        "solution": "\\vec{OC} = (4, 3) and \\vec{AB} = (4, 8). For them to be parallel we would need 4 × 8 = 3 × 4, that is 32 = 12, which is false. So they are not parallel.",
        "answerType": "text",
        "accepted": [
          "no",
          "not parallel"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q10-v9",
    "question_number": 10,
    "section": "II",
    "marks": 12,
    "topic": "Vectors and matrices",
    "design": "Q10-D position vectors, magnitude and a point dividing a line",
    "stem": "The position vectors of A and B relative to the origin O are \\vec{OA} = (2, -1) and \\vec{OB} = (10, 5), written as column vectors.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Determine \\vec{AB}.",
        "marks": 3,
        "answer": "(8, 6)",
        "solution": "\\vec{AB} = \\vec{OB} - \\vec{OA} = (10 - 2, 5 - -1) = (8, 6).",
        "answerType": "coordinate"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the magnitude of \\vec{AB}, giving your answer correct to 2 decimal places.",
        "marks": 3,
        "answer": "10.00",
        "solution": "|\\vec{AB}| = sqrt(8^2 + 6^2) = sqrt(100) = 10.00 units.",
        "suffix": " units",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The point C lies on AB such that AC : CB = 1 : 1. Determine the position vector \\vec{OC}.",
        "marks": 4,
        "answer": "(6, 2)",
        "solution": "AC : CB = 1 : 1, so \\vec{AC} = (1/2)\\vec{AB} = (4, 3). Then \\vec{OC} = \\vec{OA} + \\vec{AC} = (6, 2).",
        "answerType": "coordinate"
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine whether \\vec{OC} is parallel to \\vec{AB}, justifying your answer.",
        "marks": 2,
        "answer": "not parallel",
        "solution": "\\vec{OC} = (6, 2) and \\vec{AB} = (8, 6). For them to be parallel we would need 6 × 6 = 2 × 8, that is 36 = 16, which is false. So they are not parallel.",
        "answerType": "text",
        "accepted": [
          "no",
          "not parallel"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  },
  {
    "question_id": "p2-q10-v10",
    "question_number": 10,
    "section": "II",
    "marks": 12,
    "topic": "Vectors and matrices",
    "design": "Q10-D position vectors, magnitude and a point dividing a line",
    "stem": "The position vectors of A and B relative to the origin O are \\vec{OA} = (-1, 2) and \\vec{OB} = (8, 8), written as column vectors.",
    "parts": [
      {
        "id": "a",
        "label": "(a)",
        "prompt": "Determine \\vec{AB}.",
        "marks": 3,
        "answer": "(9, 6)",
        "solution": "\\vec{AB} = \\vec{OB} - \\vec{OA} = (8 - -1, 8 - 2) = (9, 6).",
        "answerType": "coordinate"
      },
      {
        "id": "b",
        "label": "(b)",
        "prompt": "Calculate the magnitude of \\vec{AB}, giving your answer correct to 2 decimal places.",
        "marks": 3,
        "answer": "10.82",
        "solution": "|\\vec{AB}| = sqrt(9^2 + 6^2) = sqrt(117) = 10.82 units.",
        "suffix": " units",
        "tolerance": 0.011
      },
      {
        "id": "c",
        "label": "(c)",
        "prompt": "The point C lies on AB such that AC : CB = 2 : 1. Determine the position vector \\vec{OC}.",
        "marks": 4,
        "answer": "(5, 6)",
        "solution": "AC : CB = 2 : 1, so \\vec{AC} = (2/3)\\vec{AB} = (6, 4). Then \\vec{OC} = \\vec{OA} + \\vec{AC} = (5, 6).",
        "answerType": "coordinate"
      },
      {
        "id": "d",
        "label": "(d)",
        "prompt": "Determine whether \\vec{OC} is parallel to \\vec{AB}, justifying your answer.",
        "marks": 2,
        "answer": "not parallel",
        "solution": "\\vec{OC} = (5, 6) and \\vec{AB} = (9, 6). For them to be parallel we would need 5 × 6 = 6 × 9, that is 30 = 54, which is false. So they are not parallel.",
        "answerType": "text",
        "accepted": [
          "no",
          "not parallel"
        ]
      }
    ],
    "source": "SPARK original CSEC-style (v2)",
    "content_class": "SPARK_CXC_STYLE",
    "content_provenance": "Original SPARK CSEC-style question. Language, structure, mark allocation and question design are modelled on CSEC Mathematics Paper 2; no past-paper question is reproduced."
  }
];

export default PAPER2_QUESTION_BANK_V2;
