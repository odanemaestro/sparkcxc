import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2008} from "../data/fnhHistorical2008Paper2";
export function fnhHistorical2008ExamStructure(selected=[]){return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2008,selected);}
export default function FnhHistorical2008Paper2Exam(props){return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2008} {...props}/>;}
