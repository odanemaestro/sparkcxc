// ============================================================================
// Done by: Odane Robinson - extracted from App.js, behavior unchanged.
// ============================================================================
import { T } from "../../theme";

const ProgressBar = ({ value, max, color = T.teal, height = 6 }) => (
  <div style={{background:T.muted,borderRadius:99,height,overflow:"hidden"}}>
    <div style={{width:`${Math.min(100,Math.round((value/Math.max(max,1))*100))}%`,height:"100%",
      background:`linear-gradient(90deg,${color},${color}CC)`,borderRadius:99,transition:`width .6s ${T.ease}`}}/>
  </div>
);

export default ProgressBar;
