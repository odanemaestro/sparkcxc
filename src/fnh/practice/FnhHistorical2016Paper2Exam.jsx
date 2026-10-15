import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2016} from "../data/fnhHistorical2016Paper2";
export function fnhHistorical2016ExamStructure(selected=[]){return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2016,selected);}
export default function FnhHistorical2016Paper2Exam(props){return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2016} {...props}/>;}
