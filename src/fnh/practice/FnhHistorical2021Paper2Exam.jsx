import React from "react";
import FnhPaper2Exam from "./FnhPaper2Exam";
import {FNH_HISTORICAL_P2_2021} from "../data/fnhHistorical2021Paper2";
export default function FnhHistorical2021Paper2Exam(props){
  return <FnhPaper2Exam historicalPaper={FNH_HISTORICAL_P2_2021} {...props}/>;
}
