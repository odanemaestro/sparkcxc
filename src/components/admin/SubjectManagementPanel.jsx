import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
import {
  catalogRowFromSubject,
  normalizeCatalogSubject,
  subjectIdFromValue,
  syncSubjectManifest,
} from "../../subjects/subjectCatalog";
import { validateSubjectLearningCompatibility } from "../../subjects/subjectLearningAdapter";
import "./dynamicSubjectAdmin.css";

const CAPABILITIES = [
  ["study","Study"],
  ["practice","Practice"],
  ["flashcards","Flashcards"],
  ["progress","Progress"],
  ["paper1","Paper 1"],
  ["paper2","Paper 2"],
  ["adaptive","Adaptive"],
  ["structured","Structured"],
  ["labs","Labs"],
  ["sba","SBA"],
];

function emptyDraft() {
  return {
    id:"",
    name:"",
    shortName:"",
    qualification:"CSEC",
    mark:"",
    description:"",
    enabled:false,
    status:"draft",
    sortOrder:100,
    implementation:"generic",
    studyView:"study",
    capabilities:{progress:true},
    routes:{study:"",practice:"",flashcards:"",progress:"/dashboard/progress"},
    learningConfig:{},
    manifestVersion:1,
  };
}

function editorFromRow(row) {
  const item = normalizeCatalogSubject(row) || emptyDraft();
  return {
    ...emptyDraft(),
    ...item,
    routes:{...emptyDraft().routes,...(item.routes || {})},
    capabilities:{...emptyDraft().capabilities,...(item.capabilities || {})},
  };
}

function Readiness({ subject }) {
  const result = validateSubjectLearningCompatibility(subject);
  return (
    <div className={`spark-ds-readiness ${result.valid ? "ready" : "needs-work"}`}>
      <strong>{result.valid ? "Generic learner contract ready" : "Needs configuration"}</strong>
      {result.valid
        ? <span>Progress and generic learner integration have the minimum configuration required.</span>
        : <span>{result.issues[0]}</span>}
    </div>
  );
}

export default function SubjectManagementPanel({
  supabase,
  showToast,
  manifestSubjects = [],
}) {
  const [rows,setRows] = useState([]);
  const [loading,setLoading] = useState(true);
  const [syncing,setSyncing] = useState(false);
  const [saving,setSaving] = useState(false);
  const [editor,setEditor] = useState(emptyDraft());
  const [editingId,setEditingId] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data,error } = await supabase.rpc("spark_admin_list_subject_catalog");
      if (error) {
        if (!["PGRST202","42883","42P01"].includes(error.code)) {
          showToast?.(error.message || "Could not load the subject catalog.");
        }
        setRows([]);
      } else {
        setRows((data || []).map(normalizeCatalogSubject).filter(Boolean));
      }
    } finally {
      setLoading(false);
    }
  },[showToast,supabase]);

  useEffect(() => { load(); },[load]);

  const liveCount = useMemo(() => rows.filter(row => row.enabled && row.status === "live").length,[rows]);
  const draftCount = useMemo(() => rows.filter(row => row.status === "draft").length,[rows]);

  function startNew() {
    setEditingId("");
    setEditor(emptyDraft());
  }

  function edit(row) {
    setEditingId(row.id);
    setEditor(editorFromRow(row));
  }

  function update(field,value) {
    setEditor(current => ({...current,[field]:value}));
  }

  function updateCapability(key,value) {
    setEditor(current => ({
      ...current,
      capabilities:{...(current.capabilities || {}),[key]:value},
    }));
  }

  function updateRoute(key,value) {
    setEditor(current => ({
      ...current,
      routes:{...(current.routes || {}),[key]:value},
    }));
  }

  async function syncManifest() {
    if (syncing) return;
    setSyncing(true);
    try {
      const { data,error } = await syncSubjectManifest({
        supabase,
        subjects:manifestSubjects,
      });
      if (error) showToast?.(error.message || "Subject configuration sync failed.","error");
      else {
        showToast?.(`${Number(data || 0)} subject configuration${Number(data) === 1 ? "" : "s"} synced.`,"success");
        await load();
      }
    } finally {
      setSyncing(false);
    }
  }

  async function save(event) {
    event.preventDefault();
    if (saving) return;

    const id = subjectIdFromValue(editor.id || editor.name);
    const payload = catalogRowFromSubject({
      ...editor,
      id,
      name:editor.name.trim(),
      shortName:(editor.shortName || editor.name).trim(),
    });

    if (!payload?.id || !payload?.name) {
      showToast?.("Subject name and id are required.","error");
      return;
    }

    const compatibility = validateSubjectLearningCompatibility(editorFromRow(payload));
    if (payload.status === "live" && !compatibility.valid) {
      showToast?.(`Cannot publish yet: ${compatibility.issues[0]}`,"error");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.rpc("spark_admin_upsert_subject", {
        p_subject:payload,
      });
      if (error) showToast?.(error.message || "Could not save the subject.","error");
      else {
        showToast?.(`${payload.name} saved.`,"success");
        setEditingId(payload.id);
        setEditor(editorFromRow(payload));
        await load();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="spark-ds-admin-section">
      <div className="spark-ds-heading">
        <div>
          <span className="section-kicker">DYNAMIC SUBJECT PLATFORM V1</span>
          <h2>Subject Management</h2>
          <p>Manage the database subject catalog and safely sync code manifests. This is configuration sync, not arbitrary SQL execution.</p>
        </div>
        <div className="spark-ds-heading-actions">
          <button type="button" onClick={syncManifest} disabled={syncing || !manifestSubjects.length}>
            {syncing ? "Syncing..." : "Sync current SPARK manifests"}
          </button>
          <button type="button" onClick={startNew}>New subject</button>
        </div>
      </div>

      <div className="spark-ds-summary">
        <Card><span>Catalog subjects</span><strong>{rows.length}</strong></Card>
        <Card><span>Live</span><strong>{liveCount}</strong></Card>
        <Card><span>Draft</span><strong>{draftCount}</strong></Card>
        <Card><span>Generic adapter</span><strong>Ready</strong></Card>
      </div>

      <div className="spark-ds-layout">
        <Card className="spark-ds-card">
          <div className="spark-ds-card-head"><strong>Subject catalog</strong><button type="button" onClick={load}>Refresh</button></div>
          <div className="spark-ds-subject-list">
            {loading ? <p>Loading subjects...</p> : rows.map(row => (
              <button
                type="button"
                key={row.id}
                className={`spark-ds-subject-item ${editingId === row.id ? "active" : ""}`}
                onClick={() => edit(row)}
              >
                <span className="spark-ds-subject-mark">{row.mark || row.shortName.slice(0,2)}</span>
                <span className="spark-ds-subject-copy">
                  <strong>{row.name}</strong>
                  <small>{row.id} · {row.implementation}</small>
                </span>
                <span className={`spark-ds-chip ${row.status}`}>{row.status}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="spark-ds-card">
          <form className="spark-ds-editor" onSubmit={save}>
            <div className="spark-ds-card-head">
              <div><strong>{editingId ? `Edit ${editor.shortName || editor.name}` : "Create subject"}</strong><small>New subjects start as drafts.</small></div>
              <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save subject"}</button>
            </div>

            <div className="spark-ds-form-grid">
              <label><span>Subject name</span><input value={editor.name} onChange={e => update("name",e.target.value)} placeholder="CSEC Chemistry"/></label>
              <label><span>Subject id</span><input value={editor.id} onChange={e => update("id",subjectIdFromValue(e.target.value))} placeholder="chemistry" disabled={Boolean(editingId)}/></label>
              <label><span>Short name</span><input value={editor.shortName} onChange={e => update("shortName",e.target.value)} placeholder="Chemistry"/></label>
              <label><span>Qualification</span><input value={editor.qualification} onChange={e => update("qualification",e.target.value)} placeholder="CSEC"/></label>
              <label><span>Mark</span><input value={editor.mark} onChange={e => update("mark",e.target.value)} placeholder="CH"/></label>
              <label><span>Sort order</span><input type="number" value={editor.sortOrder} onChange={e => update("sortOrder",Number(e.target.value))}/></label>
            </div>

            <label className="spark-ds-field"><span>Description</span><textarea value={editor.description} onChange={e => update("description",e.target.value)} rows="3"/></label>

            <div className="spark-ds-capabilities">
              <strong>Capabilities</strong>
              <div>{CAPABILITIES.map(([key,label]) => (
                <label key={key}><input type="checkbox" checked={Boolean(editor.capabilities?.[key])} onChange={e => updateCapability(key,e.target.checked)}/><span>{label}</span></label>
              ))}</div>
            </div>

            <div className="spark-ds-form-grid">
              <label><span>Study route</span><input value={editor.routes?.study || ""} onChange={e => updateRoute("study",e.target.value)} placeholder="/study/chemistry"/></label>
              <label><span>Practice route</span><input value={editor.routes?.practice || ""} onChange={e => updateRoute("practice",e.target.value)} placeholder="/practice/chemistry"/></label>
              <label><span>Flashcards route</span><input value={editor.routes?.flashcards || ""} onChange={e => updateRoute("flashcards",e.target.value)} placeholder="/dashboard/flashcards/chemistry"/></label>
              <label>
                <span>Status</span>
                <select value={editor.status} onChange={e => update("status",e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="live">Live</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
            </div>

            <label className="spark-ds-inline-check">
              <input type="checkbox" checked={Boolean(editor.enabled)} onChange={e => update("enabled",e.target.checked)}/>
              <span>Enabled for discovery when live</span>
            </label>

            <Readiness subject={editor}/>
          </form>
        </Card>
      </div>
    </section>
  );
}