import React from "react";
import FnhHistoricalPaper2Exam,{fnhHistoricalExamStructure} from "./FnhHistoricalPaper2Exam";
import {FNH_HISTORICAL_P2_2011} from "../data/fnhHistorical2011Paper2";
export function fnhHistorical2011ExamStructure(selected=[]){return fnhHistoricalExamStructure(FNH_HISTORICAL_P2_2011,selected);}
export default function FnhHistorical2011Paper2Exam(props){return <FnhHistoricalPaper2Exam paper={FNH_HISTORICAL_P2_2011} {...props}/>;}
