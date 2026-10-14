import {makeFnhFoodLabel,parseFnhFoodLabel,fnhFoodLabelCompleteness} from "./FnhFoodLabelDesigner";
import {FNH_HISTORICAL_P2_2018} from "../data/fnhHistorical2018Paper2";
describe("2018 original food-label design activity",()=>{
 test("label draft survives saved exam response round trip",()=>{
  const fields={name:"Guava Oat Mix",serving:"40 g",energy:"145 kcal",protein:"6 g",ingredients:"oats, guava",netQuantity:"400 g"};
  const text=makeFnhFoodLabel(fields);
  expect(parseFnhFoodLabel(text)).toEqual(fields);
  expect(fnhFoodLabelCompleteness(fields)).toMatchObject({nutrition:2,general:3,hasServingSize:true});
 });
 test("empty label is incomplete rather than receiving unearned marking points",()=>{
  expect(fnhFoodLabelCompleteness(parseFnhFoodLabel(""))).toMatchObject({nutrition:0,general:0,hasServingSize:false});
 });
 test("historical label prompt uses four-mark allocation",()=>{
  const part=FNH_HISTORICAL_P2_2018.questions[5].items.find(x=>x.id==="d-i");
  expect(part.marks).toBe(4);
  expect(part.prompt).toMatch(/label/);
  expect(part.modelPoints).toHaveLength(4);
 });
});
