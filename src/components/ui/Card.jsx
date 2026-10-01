import { useState } from "react";
import { T } from "../../theme";

const Card = ({ children, style: s = {}, onClick, className = "", ...rest }) => {
  const [hover, setHover] = useState(false);
  const interactive = Boolean(onClick);
  return (
    <div
      {...rest}
      className={`spark-card ${interactive ? "spark-card--interactive" : ""} ${className}`.trim()}
      onClick={onClick}
      onMouseEnter={()=>interactive&&setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        background:T.paper,
        border:`1px solid ${hover ? T.borderStrong : T.border}`,
        borderRadius:T.rMd,
        padding:20,
        boxShadow:hover ? T.shadowSm : "none",
        cursor:interactive ? "pointer" : "default",
        transform:hover ? "translateY(-1px)" : "translateY(0)",
        transition:`transform .18s ${T.ease}, border-color .18s ${T.ease}, box-shadow .18s ${T.ease}, background-color .18s ${T.ease}`,
        ...s,
      }}
    >{children}</div>
  );
};
export default Card;
