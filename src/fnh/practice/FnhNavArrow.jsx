import React from "react";
import BackArrowIcon from "../../components/ui/BackArrowIcon";
import ForwardArrowIcon from "../../components/ui/ForwardArrowIcon";

// All FNH navigation uses the same thin SVG icons as the rest of SPARK.
export default function FnhNavArrow({direction="right"}) {
  return direction==="left"
    ? <BackArrowIcon className="fnh-nav-arrow"/>
    : <ForwardArrowIcon className="fnh-nav-arrow"/>;
}
