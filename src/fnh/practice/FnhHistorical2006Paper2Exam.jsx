import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2006} from "../data/fnhHistorical2006Paper2";

export function fnhHistorical2006ExamStructure(selected=[]){
  return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2006,selected);
}
export default function FnhHistorical2006Paper2Exam(props){
  return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2006} {...props}/>;
}
