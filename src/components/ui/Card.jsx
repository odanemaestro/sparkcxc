// ============================================================================
// Done by: Odane Robinson - extracted from App.js, behavior unchanged.
// ============================================================================
import { useState } from "react";
import { T } from "../../theme";

const Card = ({ children, style: s = {}, onClick, className = "", ...rest }) => {
  const [hover, setHover] = useState(false);
  return (
    <div {...rest} className={`spark-card ${onClick ? "spark-card--interactive" : ""} ${className}`.trim()} onClick={onClick} onMouseEnter={()=>onClick&&setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{background:T.paper,border:`1px solid ${hover?T.tealLight:T.border}`,borderRadius:T.rMd,
        padding:22,boxShadow:hover?T.shadowMd:T.shadowSm,cursor:onClick?"pointer":"default",
        transform:hover?"translateY(-3px)":"translateY(0)",transition:`transform .2s ${T.ease}, border-color .18s ${T.ease}, box-shadow .2s ${T.ease}, background-color .18s ${T.ease}`,...s}}>{children}</div>
  );
};

export default Card;
