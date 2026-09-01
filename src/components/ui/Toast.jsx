// ============================================================================
// Done by: Odane Robinson - extracted from App.js, behavior unchanged.
// ============================================================================
import { T } from "../../theme";
import { friendlyErrorMessage } from "../../lib/errorMessages";

const Toast = ({ msg }) => {
  if (!msg) return null;
  const text = typeof msg === "string" ? friendlyErrorMessage(msg) : (msg.message || friendlyErrorMessage(msg));
  const type = typeof msg === "object" && msg.type ? msg.type : "info";
  const palette = type === "success"
    ? {bg:"#ECFDF5",border:"#A7F3D0",icon:"✓",iconBg:"#059669",text:"#065F46"}
    : type === "error"
      ? {bg:"#FEF2F2",border:"#FECACA",icon:"!",iconBg:"#DC2626",text:"#991B1B"}
      : {bg:T.navyDeep,border:"rgba(255,255,255,.08)",icon:"i",iconBg:T.teal,text:"#fff"};
  return (
    <div className="fade-in" role={type === "error" ? "alert" : "status"} style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",
      background:palette.bg,color:palette.text,padding:"12px 16px",borderRadius:14,fontSize:14,
      fontWeight:500,boxShadow:"0 10px 32px rgba(8,26,61,.18)",zIndex:999,display:"flex",alignItems:"flex-start",gap:10,
      border:`1px solid ${palette.border}`,width:"min(560px, calc(100vw - 32px))",lineHeight:1.45}}>
      <span style={{width:24,height:24,borderRadius:"50%",background:palette.iconBg,color:"white",display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,flexShrink:0}}>{palette.icon}</span>
      <span style={{flex:1}}>{text}</span>
    </div>
  );
};

export default Toast;
