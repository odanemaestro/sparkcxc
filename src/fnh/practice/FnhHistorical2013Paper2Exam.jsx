import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2013} from "../data/fnhHistorical2013Paper2";
export function fnhHistorical2013ExamStructure(selected=[]){return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2013,selected);}
export default function FnhHistorical2013Paper2Exam(props){return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2013} {...props}/>;}
