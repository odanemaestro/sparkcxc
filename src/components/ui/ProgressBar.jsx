// ============================================================================
// Done by: Odane Robinson - extracted from App.js.
// ============================================================================
import { T } from "../../theme";

const ProgressBar = ({ value, max, color = T.teal, height = 6, style, className = "" }) => {
  const safeMax = Math.max(Number(max) || 0, 1);
  const safeValue = Math.max(0, Number(value) || 0);
  const pct = Math.min(100, (safeValue / safeMax) * 100);

  return (
    <div className={className} role="progressbar" aria-valuemin="0" aria-valuemax={safeMax}
      aria-valuenow={Math.min(safeValue, safeMax)} aria-valuetext={`${Math.round(pct)}%`}
      style={{background:T.muted,borderRadius:99,height,overflow:"hidden",...style}}>
      <div style={{width:`${pct}%`,minWidth:safeValue > 0 ? 6 : 0,height:"100%",
        background:`linear-gradient(90deg,${color},${color}CC)`,borderRadius:99,transition:`width .6s ${T.ease}`}}/>
    </div>
  );
};

export default ProgressBar;
