import {FNH_TOPICS} from "../data/fnhCourse";
import {FNH_MEAL_FOODS,FNH_BUDGET_ITEMS,fnhMealGroupSummary,fnhBudgetSummary,fnhNutritionLabelTotal} from "./FnhDecisionLab";

describe("FNH interactive food planning and label calculations",()=>{
  test("a four-mix requires four different food groups, not just four items",()=>{
    const three=fnhMealGroupSummary(["yam","breadfruit","peas","callaloo"]);
    expect(three.chosen).toHaveLength(4);
    expect(three.groups).toHaveLength(3);
    expect(three.fourMix).toBe(false);
    const four=fnhMealGroupSummary(["yam","peas","callaloo","mango"]);
    expect(four.groups).toHaveLength(4);
    expect(four.fourMix).toBe(true);
    expect(four.feedback).toMatch(/portions/);
    expect(new Set(FNH_MEAL_FOODS.map(row=>row.id)).size).toBe(FNH_MEAL_FOODS.length);
  });
  test("nutrition label calculations use consistent reference units",()=>{
    expect(fnhNutritionLabelTotal(6,100,250)).toBe(15);
    expect(fnhNutritionLabelTotal(7,100,300)).toBe(21);
    expect(fnhNutritionLabelTotal(8,40,80)).toBe(16);
    expect(fnhNutritionLabelTotal(200,50,100)).toBe(400);
    expect(fnhNutritionLabelTotal(6,0,250)).toBeNull();
    expect(fnhNutritionLabelTotal(-5,100,250)).toBeNull();
    expect(fnhNutritionLabelTotal(6,100,-250)).toBeNull();
    expect(fnhNutritionLabelTotal("invalid",100,250)).toBeNull();
    expect(fnhNutritionLabelTotal("",100,250)).toBeNull();
    expect(fnhNutritionLabelTotal(" ",100,250)).toBeNull();
    expect(fnhNutritionLabelTotal(0,"",250)).toBeNull();
    expect(fnhNutritionLabelTotal(0,100,"")).toBeNull();
    expect(fnhNutritionLabelTotal(6,100,Number.POSITIVE_INFINITY)).toBeNull();
    expect(fnhNutritionLabelTotal(6,100,1e308)).toBeNull();
    expect(fnhNutritionLabelTotal(0,100,250)).toBe(0);
  });
  test("budget planner totals example prices and detects overspending",()=>{
    const selected=Object.fromEntries(FNH_BUDGET_ITEMS.map(row=>[row.id,1]));
    const planned=fnhBudgetSummary(FNH_BUDGET_ITEMS,selected,2500);
    expect(planned).toMatchObject({total:1950,limit:2500,left:550,withinBudget:true});
    const tight=fnhBudgetSummary(FNH_BUDGET_ITEMS,selected,1800);
    expect(tight).toMatchObject({total:1950,left:-150,withinBudget:false});
    const overflow=fnhBudgetSummary(FNH_BUDGET_ITEMS,{rice:1000,peas:-20,cabbage:1.9},2500);
    expect(overflow.rows.find(row=>row.id==="rice").quantity).toBe(99);
    expect(overflow.rows.find(row=>row.id==="peas").quantity).toBe(0);
    expect(overflow.rows.find(row=>row.id==="cabbage").quantity).toBe(1);
    const bad=fnhBudgetSummary(FNH_BUDGET_ITEMS,{rice:Number.POSITIVE_INFINITY},"not-a-number");
    expect(bad).toMatchObject({total:0,limit:0,withinBudget:true});
  });
  test("interactive labs appear on the correct syllabus topic lessons",()=>{
    const modelFor=id=>FNH_TOPICS.find(topic=>topic.id===id)?.metadata?.lesson?.interactiveModels?.[0]?.type;
    expect(modelFor("meal-planning-multimix")).toBe("fnh-meal-builder");
    expect(modelFor("labels-claims")).toBe("fnh-label-calculator");
    expect(modelFor("budget-packed-dining")).toBe("fnh-budget-planner");
  });
});
