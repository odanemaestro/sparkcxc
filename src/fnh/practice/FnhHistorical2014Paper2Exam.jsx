import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2014} from "../data/fnhHistorical2014Paper2";
export function fnhHistorical2014ExamStructure(selected=[]){return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2014,selected);}
export default function FnhHistorical2014Paper2Exam(props){return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2014} {...props}/>;}
