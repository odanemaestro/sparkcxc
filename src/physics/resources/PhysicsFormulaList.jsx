import React, { useMemo, useState } from 'react';
import MathText from '../../practice/MathText';
import { PHYSICS_FORMULA_LIST, physicsFormulaStats } from './physicsFormulaList.mjs';
import { PHYSICS_WORKBOOK_SECTIONS } from './physicsWorkbookContent.mjs';
import './physicsResources.css';

export default function PhysicsFormulaList({ onBack, inModal = false }) {
  const [section, setSection] = useState('ALL');
  const [query, setQuery] = useState('');
  const stats = useMemo(() => physicsFormulaStats(), []);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return PHYSICS_FORMULA_LIST.filter(item => {
      if (section !== 'ALL' && item.section !== section) return false;
      if (!needle) return true;
      return [item.name, item.equation, item.symbols, item.unit, item.topic].join(' ').toLowerCase().includes(needle);
    });
  }, [section, query]);

  const grouped = useMemo(() => {
    const result = new Map();
    for (const item of filtered) {
      const rows = result.get(item.topic) || [];
      rows.push(item);
      result.set(item.topic, rows);
    }
    return [...result.entries()];
  }, [filtered]);

  const content = (
    <div className={inModal ? 'physics-resource-shell physics-resource-shell-modal' : 'physics-resource-shell'}>
      <header className={inModal ? 'physics-resource-hero physics-resource-hero-modal' : 'physics-resource-hero'}>
        <div>
          {!inModal && onBack && <button type="button" className="physics-resource-back" onClick={onBack}>← Back to Physics</button>}
          <span className="physics-resource-eyebrow">CSEC Physics revision aid</span>
          <h1>Physics Formula List</h1>
          <p>Review equations, relationships, direction rules, symbols and units by syllabus section. Learn when each relationship applies, not only the symbols.</p>
        </div>
        <div className="physics-resource-stats" aria-label="Formula list coverage">
          <div><strong>{stats.entries}</strong><span>entries</span></div>
          <div><strong>{stats.topics}</strong><span>topics</span></div>
          <div><strong>{stats.sections}</strong><span>sections</span></div>
        </div>
      </header>

      <section className="physics-resource-note" aria-label="Examination note">
        <strong>Revision list</strong>
        <p>CSEC Physics does not provide a formula sheet in the examination. Use this list to learn the relationships, symbols, units and conditions before exam day.</p>
      </section>

      <div className="physics-resource-toolbar">
        <nav className="physics-resource-tabs" aria-label="Formula sections">
          <button type="button" className={section === 'ALL' ? 'active' : ''} onClick={() => setSection('ALL')}>All</button>
          {Object.entries(PHYSICS_WORKBOOK_SECTIONS).map(([id, title]) => (
            <button key={id} type="button" className={section === id ? 'active' : ''} onClick={() => setSection(id)}>{id}<span>{title}</span></button>
          ))}
        </nav>
        <label className="physics-resource-search">
          <span>Search formulae</span>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Try resistance, half-life, wave speed..." />
        </label>
      </div>

      <div className="physics-formula-groups">
        {grouped.map(([topic, rows]) => (
          <section key={topic} className="physics-resource-card physics-formula-group">
            <div className="physics-formula-group-head"><strong>{topic}</strong></div>
            <div className="physics-formula-table-wrap" tabIndex="0" aria-label={`${topic} formula table, horizontally scrollable if needed`}>
              <table className="physics-formula-table">
                <thead><tr><th>Quantity or rule</th><th>Relationship</th><th>Symbols and condition</th><th>Unit</th></tr></thead>
                <tbody>{rows.map((row, index) => (
                  <tr key={`${topic}-${index}`}>
                    <td><strong><MathText prose>{row.name}</MathText></strong></td>
                    <td className="physics-formula-equation"><MathText prose>{row.equation}</MathText></td>
                    <td><MathText prose>{row.symbols}</MathText></td>
                    <td><MathText prose>{row.unit}</MathText></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </section>
        ))}
        {!grouped.length && <section className="physics-resource-card"><p>No formula or relationship matches your search.</p></section>}
      </div>
    </div>
  );

  if (inModal) return <div className="physics-resource-root physics-resource-root-modal">{content}</div>;
  return <main className="physics-resource-root">{content}</main>;
}
