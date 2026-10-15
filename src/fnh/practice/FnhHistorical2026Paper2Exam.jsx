import React from "react";
import FnhPaper2Exam from "./FnhPaper2Exam";
import {FNH_HISTORICAL_P2_2026} from "../data/fnhHistorical2026Paper2";
export default function FnhHistorical2026Paper2Exam(props){
  return <FnhPaper2Exam historicalPaper={FNH_HISTORICAL_P2_2026} {...props}/>;
}
