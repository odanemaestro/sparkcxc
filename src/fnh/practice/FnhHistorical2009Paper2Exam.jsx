import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2009} from "../data/fnhHistorical2009Paper2";
export function fnhHistorical2009ExamStructure(selected=[]){return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2009,selected);}
export default function FnhHistorical2009Paper2Exam(props){return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2009} {...props}/>;}
