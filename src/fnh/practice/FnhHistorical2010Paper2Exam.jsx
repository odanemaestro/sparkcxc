import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2010} from "../data/fnhHistorical2010Paper2";
export function fnhHistorical2010ExamStructure(selected=[]){return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2010,selected);}
export default function FnhHistorical2010Paper2Exam(props){return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2010} {...props}/>;}
