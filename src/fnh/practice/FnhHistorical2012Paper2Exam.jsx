import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2012} from "../data/fnhHistorical2012Paper2";
export function fnhHistorical2012ExamStructure(selected=[]){return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2012,selected);}
export default function FnhHistorical2012Paper2Exam(props){return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2012} {...props}/>;}
