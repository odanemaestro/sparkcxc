import React from "react";
import FnhPaper2Exam from "./FnhPaper2Exam";
import {FNH_HISTORICAL_P2_2017} from "../data/fnhHistorical2017Paper2";
export default function FnhHistorical2017Paper2Exam(props){
  return <FnhPaper2Exam historicalPaper={FNH_HISTORICAL_P2_2017} {...props}/>;
}
