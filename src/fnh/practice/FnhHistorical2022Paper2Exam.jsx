import React from "react";
import FnhPaper2Exam from "./FnhPaper2Exam";
import {FNH_HISTORICAL_P2_2022} from "../data/fnhHistorical2022Paper2";
export default function FnhHistorical2022Paper2Exam(props){
  return <FnhPaper2Exam historicalPaper={FNH_HISTORICAL_P2_2022} {...props}/>;
}
