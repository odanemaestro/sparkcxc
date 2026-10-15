import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2005} from "../data/fnhHistorical2005Paper2";
// Maintain the public helper used by source-integrity checks.
export function fnhHistorical2005ExamStructure(selected=[]){
  return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2005,selected);
}
export default function FnhHistorical2005Paper2Exam(props){
  return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2005} {...props}/>;
}
