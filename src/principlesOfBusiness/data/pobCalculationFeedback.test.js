import {checkPobCalculation,POB_CALCULATION_TARGETS} from "./pobCalculationFeedback";

describe("POB Paper 2 calculation feedback",()=>{
  test.each([
    ["POB-SPARK-P2-ORIGINAL-01-Q3:a","300 / 10 = 30 bottles per hour"],
    ["POB-SPARK-P2-ORIGINAL-01-Q3:c","J$250 - J$130 = J$120"],
    ["POB-SPARK-P2-ORIGINAL-01-Q5:a","Gross profit J$380,000"],
    ["POB-SPARK-P2-ORIGINAL-01-Q5:b","120000"]
  ])("recognises expected result in %s",(key,answer)=>{
    expect(checkPobCalculation(key,answer).status).toBe("result-found");
  });
  test("avoids partial number matches",()=>{
    expect(checkPobCalculation("POB-SPARK-P2-ORIGINAL-01-Q3:c","120000").status).toBe("review-needed");
    expect(checkPobCalculation("POB-SPARK-P2-ORIGINAL-01-Q3:a","300").status).toBe("review-needed");
  });
  test("avoids claiming marks for absent or incorrect results",()=>{
    expect(checkPobCalculation("POB-SPARK-P2-ORIGINAL-01-Q5:a","").status).toBe("unanswered");
    expect(checkPobCalculation("POB-SPARK-P2-ORIGINAL-01-Q5:a","400000").status).toBe("review-needed");
  });
  test("does not accept a correct intermediate number over an explicit incorrect final answer",()=>{
    expect(checkPobCalculation("POB-SPARK-P2-ORIGINAL-01-Q3:c","I used 120 as a starting point. Final answer is 130.").status).toBe("review-needed");
  });
  test("does not grade narrative questions",()=>{
    expect(checkPobCalculation("POB-SPARK-P2-ORIGINAL-01-Q1:e","A partnership is better")).toBeNull();
  });
  test("limits the checker to four known numerical parts",()=>{
    expect(Object.keys(POB_CALCULATION_TARGETS)).toHaveLength(4);
  });
});
