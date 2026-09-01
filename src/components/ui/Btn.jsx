// ============================================================================
// Done by: Odane Robinson - extracted from App.js, behavior unchanged.
// ============================================================================
import { useState } from "react";
import { T } from "../../theme";

const Btn = ({ children, onClick, v = "primary", style: s = {}, disabled = false, full = false }) => {
  const [hover, setHover] = useState(false);
  const base = { padding:"12px 24px",borderRadius:T.rSm,fontSize:14,fontWeight:600,cursor:disabled?"not-allowed":"pointer",
    opacity:disabled?.5:1,transition:`all .2s ${T.ease}`,display:"inline-flex",alignItems:"center",gap:7,
    border:"none",width:full?"100%":"auto",justifyContent:full?"center":"flex-start",letterSpacing:"0.01em",
    transform:hover&&!disabled?"translateY(-1px)":"translateY(0)" };
  const vs = {
    primary:{ background:hover&&!disabled?T.tealDark:T.teal,color:"#fff",boxShadow:hover&&!disabled?"0 6px 18px rgba(13,148,136,.32)":"0 2px 8px rgba(13,148,136,.22)" },
    danger:{ background:T.red,color:"#fff",boxShadow:hover&&!disabled?"0 6px 18px rgba(220,38,38,.3)":"0 2px 8px rgba(220,38,38,.18)" },
    amber:{ background:T.amber,color:"#fff",boxShadow:hover&&!disabled?"0 6px 18px rgba(217,119,6,.32)":"0 2px 8px rgba(217,119,6,.2)" },
    outline:{ background:hover&&!disabled?T.muted:"transparent",color:T.ink,border:`1.5px solid ${hover&&!disabled?T.ink:T.border}` },
    ghost:{ background:hover&&!disabled?"rgba(255,255,255,.18)":"rgba(255,255,255,.08)",color:"#fff",border:"1px solid rgba(255,255,255,.22)" },
    tealOutline:{ background:hover&&!disabled?T.tealLight:"transparent",color:T.teal,border:`1.5px solid ${T.teal}` },
    success:{ background:T.emerald,color:"#fff",boxShadow:hover&&!disabled?"0 6px 18px rgba(5,150,105,.3)":"0 2px 8px rgba(5,150,105,.18)" },
  };
  return <button className="press" style={{...base,...(vs[v]||vs.primary),...s}} onClick={onClick} disabled={disabled}
    onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>{children}</button>;
};

export default Btn;
