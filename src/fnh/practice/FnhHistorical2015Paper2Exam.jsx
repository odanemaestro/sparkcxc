import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2015} from "../data/fnhHistorical2015Paper2";
export function fnhHistorical2015ExamStructure(selected=[]){return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2015,selected);}
export default function FnhHistorical2015Paper2Exam(props){return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2015} {...props}/>;}
