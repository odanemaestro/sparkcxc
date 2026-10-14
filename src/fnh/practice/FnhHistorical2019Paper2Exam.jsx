import React from "react";
import FnhPaper2Exam from "./FnhPaper2Exam";
import {FNH_HISTORICAL_P2_2019} from "../data/fnhHistorical2019Paper2";
export default function FnhHistorical2019Paper2Exam(props){
 return <FnhPaper2Exam historicalPaper={FNH_HISTORICAL_P2_2019} {...props}/>;
}
