// ============================================================================
// Done by: Odane Robinson - extracted from App.js, behavior unchanged.
// ============================================================================
import { T } from "../../theme";

const Modal = ({ children, onClose }) => (
  <div className="fade-in" style={{position:"fixed",inset:0,background:"rgba(8,26,61,.55)",display:"flex",
    alignItems:"center",justifyContent:"center",zIndex:400,padding:20,backdropFilter:"blur(3px)"}}
    onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div className="fade-in" style={{background:T.paper,borderRadius:T.rLg,padding:28,width:"100%",maxWidth:500,
      boxShadow:T.shadowXl,maxHeight:"90vh",overflowY:"auto",border:`1px solid ${T.borderSoft}`}}>
      {children}
    </div>
  </div>
);

export default Modal;
