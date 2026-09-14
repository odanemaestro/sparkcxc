import React from 'react';
import { render, screen } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import PhysicsStudyToolkit from './physics/components/PhysicsStudyToolkit';
import PhysicsPracticalNotebook from './physics/labs/PhysicsPracticalNotebook';
import { PHYSICS_COURSE_LESSONS } from './physics/course/fullCourseIndex.mjs';
import { PHYSICS_STUDY_UPGRADES, physicsStudyUpgradeStats } from './physics/course/physicsStudyUpgrade.mjs';
import { PHYSICS_PRACTICAL_BLUEPRINTS, physicsPracticalStats } from './physics/labs/physicsPracticalBlueprints.mjs';
import { buildLatentHeatFusionLabModel } from './physics/thermal/interactives/bThermalInteractiveModels.mjs';
import { THERMAL_INTERACTIVES } from './physics/thermal/interactives/bThermalInteractiveRegistry.mjs';

const sectionFiles = [
  'physics/mechanics/components/PhysicsMechanicsSection.jsx',
  'physics/thermal/components/PhysicsThermalSection.jsx',
  'physics/waves/components/PhysicsWavesSection.jsx',
  'physics/electricity/components/PhysicsElectricitySection.jsx',
  'physics/atomic/components/PhysicsAtomicSection.jsx',
];

describe('Physics study and practical upgrade V2', () => {
  test('every Physics topic has upgraded study content', () => {
    const lessonIds = PHYSICS_COURSE_LESSONS.map(item => item.id).sort();
    expect(Object.keys(PHYSICS_STUDY_UPGRADES).sort()).toEqual(lessonIds);
    const stats = physicsStudyUpgradeStats();
    expect(stats.topics).toBe(25);
    expect(stats.workedExamples).toBeGreaterThanOrEqual(25);
    expect(stats.quickChecks).toBeGreaterThanOrEqual(50);
    expect(stats.dataSkills).toBe(25);
    for (const entry of Object.values(PHYSICS_STUDY_UPGRADES)) {
      expect(entry.examFocus.length).toBeGreaterThanOrEqual(3);
      expect(entry.workedExamples.length).toBeGreaterThanOrEqual(1);
      expect(entry.quickChecks.length).toBeGreaterThanOrEqual(2);
      expect(entry.dataSkill?.prompt).toBeTruthy();
      expect(entry.examLanguage).toBeTruthy();
      expect(JSON.stringify(entry)).not.toContain('—');
    }
  });

  test('practical companions cover all sections and the audit-priority experiments', () => {
    const stats = physicsPracticalStats();
    expect(stats.practicals).toBeGreaterThanOrEqual(26);
    expect(stats.topics).toBeGreaterThanOrEqual(17);
    expect(stats.sections).toBe(5);
    expect(stats.withGraphs).toBeGreaterThanOrEqual(10);
    for (const id of ['a3-spring','a3-lever','a6-buoyancy','b3-specific-heat','b3-latent-heat','c2-echo-ranging','c4-double-slit','d4-ohms-law','d7-transformer']) {
      expect(PHYSICS_PRACTICAL_BLUEPRINTS[id]).toBeTruthy();
    }
    const practicalTopics = new Set(Object.values(PHYSICS_PRACTICAL_BLUEPRINTS).map(item => item.topic));
    for (const topicId of ['A1','A3','A6','B2','B3','C2','C4','C5','D4','D7','E3']) {
      expect(practicalTopics.has(topicId)).toBe(true);
    }
    for (const practical of Object.values(PHYSICS_PRACTICAL_BLUEPRINTS)) {
      expect(practical.aim).toBeTruthy();
      expect(practical.apparatus.length).toBeGreaterThan(0);
      expect(practical.method.length).toBeGreaterThanOrEqual(3);
      expect(practical.table.columns.length).toBeGreaterThan(0);
      expect(practical.errors.length).toBeGreaterThan(0);
      expect(practical.accuracy.length).toBeGreaterThan(0);
      expect(practical.followUp.length).toBeGreaterThan(0);
    }
  });

  test('non-linear practical graphs do not receive an automatic straight-line fit', () => {
    for (const id of ['b4-radiation-surfaces','c5-focal-length','e3-random-decay','e3-half-life']) {
      expect(PHYSICS_PRACTICAL_BLUEPRINTS[id].graph?.fitMode).toBe('none');
      expect(PHYSICS_PRACTICAL_BLUEPRINTS[id].graph?.fitGuidance).toBeTruthy();
    }
  });

  test('qualitative results columns use text entry instead of a decimal keypad hint', () => {
    expect(PHYSICS_PRACTICAL_BLUEPRINTS['d6-magnetic-fields'].table.columns.some(column => column.type === 'text')).toBe(true);
    expect(PHYSICS_PRACTICAL_BLUEPRINTS['d7-motor-effect'].table.columns.every(column => column.type === 'text')).toBe(true);
  });

  test('latent heat interactive applies background-melt correction', () => {
    const result = buildLatentHeatFusionLabModel({ voltageV:12, currentA:2, timeS:300, massMeltedKg:0.020, backgroundMassKg:0.002 });
    expect(result.energyJ).toBe(7200);
    expect(result.correctedMassKg).toBeCloseTo(0.018, 9);
    expect(result.specificLatentHeatJPerKg).toBeCloseTo(400000, 3);
    expect(THERMAL_INTERACTIVES.some(item => item.id === 'b3-latent-heat' && item.objectives.includes('B3.6'))).toBe(true);
  });

  test('study toolkit and practical notebook render student-facing learning content', () => {
    const { unmount } = render(<PhysicsStudyToolkit topicId="B3" />);
    expect(screen.getByText('Study notes and exam practice')).toBeInTheDocument();
    expect(screen.getAllByText(/specific heat capacity/i).length).toBeGreaterThan(0);
    unmount();
    render(<PhysicsPracticalNotebook interactiveId="d4-ohms-law" userId="test-user" />);
    expect(screen.getByText('Potential difference and current')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText('Sources of error')).toBeInTheDocument();
    expect(screen.getByText('Precautions')).toBeInTheDocument();
    expect(screen.getByText('Follow-up questions')).toBeInTheDocument();
  });

  test('electricity lab metadata keeps labels and values visually separated', () => {
    const component = fs.readFileSync(path.join(__dirname, 'physics/electricity/components/ElectricityInteractiveLab.jsx'), 'utf8');
    const css = fs.readFileSync(path.join(__dirname, 'physics/electricity/components/physicsElectricity.css'), 'utf8');
    expect(component).toContain('className="pm-lab-metric"');
    expect(component).not.toContain('|| Generic');
    expect(css).toContain('.pm-lab-metric{display:grid');
  });

  test('all five section views expose the upgraded study toolkit and practical notebook', () => {
    for (const relative of sectionFiles) {
      const source = fs.readFileSync(path.join(__dirname, relative), 'utf8');
      expect(source).toContain('PhysicsStudyToolkit');
      expect(source).toContain('PhysicsPracticalNotebook');
      expect(source).toContain('Labs & practicals');
    }
  });
});
