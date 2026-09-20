import React, { useCallback, useEffect, useState } from "react";
import Card from "../ui/Card";
import "./dynamicSubjectAdmin.css";

export default function AdminAccountsPanel({
  supabase,
  showToast,
  currentUserId,
  currentProfile,
}) {
  const [rows,setRows] = useState([]);
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(true);
  const [busy,setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data,error } = await supabase.rpc("spark_admin_list_dedicated_admins");
      if (error) {
        if (!["PGRST202","42883","42P01"].includes(error.code)) {
          showToast?.(error.message || "Could not load admin accounts.");
        }
        setRows([]);
      } else {
        setRows(data || []);
      }
    } finally {
      setLoading(false);
    }
  },[showToast,supabase]);

  useEffect(() => { load(); },[load]);

  async function promote(event) {
    event.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean || busy) return;
    setBusy(true);
    try {
      const { error } = await supabase.rpc("spark_admin_make_dedicated_admin", {
        p_email:clean,
      });
      if (error) {
        showToast?.(error.message || "Could not create the dedicated admin account.","error");
      } else {
        setEmail("");
        showToast?.("Dedicated admin access enabled.","success");
        await load();
      }
    } finally {
      setBusy(false);
    }
  }

  async function revoke(row) {
    if (!row?.user_id || row.user_id === currentUserId || busy) return;
    const ok = window.confirm(`Remove dedicated admin access from ${row.email}?`);
    if (!ok) return;
    setBusy(true);
    try {
      const { error } = await supabase.rpc("spark_admin_revoke_dedicated_admin", {
        p_user_id:row.user_id,
      });
      if (error) showToast?.(error.message || "Could not revoke admin access.","error");
      else {
        showToast?.("Dedicated admin access removed.","success");
        await load();
      }
    } finally {
      setBusy(false);
    }
  }

  const currentDedicated = currentProfile?.is_admin && currentProfile?.account_type === "admin";

  return (
    <section className="spark-ds-admin-section">
      <div className="spark-ds-heading">
        <div>
          <span className="section-kicker">ADMIN ACCESS</span>
          <h2>Dedicated admin accounts</h2>
          <p>Dedicated admins are locked to SPARK administration. They do not receive student, parent or tutor learning features.</p>
        </div>
      </div>

      {!currentDedicated && (
        <Card className="spark-ds-notice">
          <strong>Your current account is a legacy admin.</strong>
          <p>It still has administrator authority, but it is not admin-only. Create a fresh SPARK account, then promote that email below. Sign in with the new account to test the dedicated admin experience.</p>
        </Card>
      )}

      <Card className="spark-ds-card">
        <form className="spark-ds-promote" onSubmit={promote}>
          <div>
            <strong>Promote an existing SPARK account</strong>
            <p>Create and verify the account through the normal sign-up flow first. No service-role key is exposed to the browser.</p>
          </div>
          <div className="spark-ds-promote-row">
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="admin@example.com"
              aria-label="Admin account email"
            />
            <button type="submit" disabled={busy || !email.trim()}>
              {busy ? "Working..." : "Make dedicated admin"}
            </button>
          </div>
        </form>

        <div className="spark-ds-table-wrap">
          <table className="spark-ds-table">
            <thead><tr><th>Name</th><th>Email</th><th>Type</th><th/></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4">Loading admin accounts...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan="4">No dedicated admin account has been created yet.</td></tr>
              ) : rows.map(row => (
                <tr key={row.user_id}>
                  <td>{row.name || "Admin"}</td>
                  <td>{row.email}</td>
                  <td><span className="spark-ds-chip live">Dedicated admin</span></td>
                  <td className="spark-ds-table-action">
                    {row.user_id === currentUserId
                      ? <span className="spark-ds-muted">Current account</span>
                      : <button type="button" onClick={() => revoke(row)} disabled={busy}>Revoke</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}