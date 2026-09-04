// ============================================================================
// Done by: Odane Robinson - extracted from App.js, behavior unchanged.
// ============================================================================
import { T } from "../../theme";

const Badge = ({ children, c = "teal" }) => {
  const cs = { teal:{bg:T.tealLight,tx:T.tealDark},amber:{bg:T.amberLight,tx:T.amber},
    green:{bg:T.emeraldLight,tx:T.emerald},red:{bg:T.redLight,tx:T.red},ink:{bg:T.muted,tx:T.ink} };
  const col = cs[c] || cs.teal;
  return <span style={{display:"inline-flex",alignItems:"center",padding:"4px 11px",borderRadius:99,fontSize:11,fontWeight:700,letterSpacing:"0.02em",lineHeight:1.2,whiteSpace:"nowrap",flexShrink:0,background:col.bg,color:col.tx}}>{children}</span>;
};

export default Badge;
