import { T } from "../../theme";
const ProgressBar = ({ value, max, color = T.teal, height = 5, style, className = "" }) => {
  const safeMax=Math.max(Number(max)||0,1), safeValue=Math.max(0,Number(value)||0), pct=Math.min(100,(safeValue/safeMax)*100);
  return <div className={`spark-progress-bar ${className}`.trim()} role="progressbar" aria-valuemin="0" aria-valuemax={safeMax}
    aria-valuenow={Math.min(safeValue,safeMax)} aria-valuetext={`${Math.round(pct)}%`}
    style={{background:T.muted,borderRadius:99,height,overflow:"hidden",...style}}>
    <div className="spark-progress-bar__fill" style={{width:`${pct}%`,minWidth:safeValue > 0 ? 6 : 0,height:"100%",background:color,borderRadius:99,transition:`width .32s ${T.ease}`}}/>
  </div>;
};
export default ProgressBar;
