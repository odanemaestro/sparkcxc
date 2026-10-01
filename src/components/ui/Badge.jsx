import { T } from "../../theme";
const Badge = ({ children, c = "teal" }) => {
  const cs={teal:{bg:T.tealLight,tx:T.tealDark},amber:{bg:T.amberLight,tx:T.amber},green:{bg:T.emeraldLight,tx:T.emerald},red:{bg:T.redLight,tx:T.red},ink:{bg:T.muted,tx:T.inkSoft}};
  const col=cs[c]||cs.teal;
  return <span style={{display:"inline-flex",alignItems:"center",padding:"4px 8px",borderRadius:8,fontSize:10.5,fontWeight:700,lineHeight:1.2,whiteSpace:"nowrap",flexShrink:0,background:col.bg,color:col.tx,border:`1px solid ${T.borderSoft}`}}>{children}</span>;
};
export default Badge;
