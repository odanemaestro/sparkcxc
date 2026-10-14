import React from "react";
import FnhPaper2Exam from "./FnhPaper2Exam";
import {FNH_HISTORICAL_P2_2024} from "../data/fnhHistorical2024Paper2";
export default function FnhHistorical2024Paper2Exam(props){
 return <FnhPaper2Exam historicalPaper={FNH_HISTORICAL_P2_2024} {...props}/>;
}
