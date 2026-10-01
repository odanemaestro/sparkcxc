import { useState } from "react";
import { T } from "../../theme";

const Btn = ({ children, onClick, v = "primary", style: s = {}, disabled = false, full = false, action = null, className = "" }) => {
  const [hover, setHover] = useState(false);
  const base = {
    padding:"10px 18px",minHeight:42,borderRadius:T.rSm,fontSize:13.5,fontWeight:650,
    cursor:disabled?"not-allowed":"pointer",opacity:disabled?.48:1,
    transition:`transform .14s ${T.ease}, background-color .16s ${T.ease}, border-color .16s ${T.ease}, color .16s ${T.ease}`,
    display:"inline-flex",alignItems:"center",gap:7,width:full?"100%":"auto",
    justifyContent:full?"center":"flex-start",letterSpacing:"0",
    transform:hover&&!disabled?"translateY(-1px)":"translateY(0)",boxShadow:"none"
  };
  const vs = {
    primary:{background:hover&&!disabled?T.tealDark:T.teal,color:"#fff",border:`1px solid ${hover&&!disabled?T.tealDark:T.teal}`},
    danger:{background:T.red,color:"#fff",border:`1px solid ${T.red}`},
    amber:{background:T.amber,color:"#fff",border:`1px solid ${T.amber}`},
    outline:{background:hover&&!disabled?T.muted:T.paper,color:T.ink,border:`1px solid ${hover&&!disabled?T.borderStrong:T.border}`},
    ghost:{background:hover&&!disabled?T.muted:"transparent",color:T.inkSoft,border:"1px solid transparent"},
    tealOutline:{background:hover&&!disabled?T.tealLight:"transparent",color:T.tealDark,border:`1px solid ${hover&&!disabled?T.teal:T.border}`},
    success:{background:T.emerald,color:"#fff",border:`1px solid ${T.emerald}`}
  };
  return <button className={`spark-btn spark-btn--${v} press ${className}`.trim()} data-spark-action={action||undefined}
    style={{...base,...(vs[v]||vs.primary),...s}} onClick={onClick} disabled={disabled}
    onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>{children}</button>;
};
export default Btn;
