import React from "react";
import FnhPaper2Exam from "./FnhPaper2Exam";
import {FNH_HISTORICAL_P2_2018} from "../data/fnhHistorical2018Paper2";
export default function FnhHistorical2018Paper2Exam(props){
 return <FnhPaper2Exam historicalPaper={FNH_HISTORICAL_P2_2018} {...props}/>;
}
