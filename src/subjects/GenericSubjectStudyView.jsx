import React, { useCallback, useEffect, useMemo, useState } from "react";
import SparkLoader from "../components/ui/SparkLoader";
import Card from "../components/ui/Card";
import { recordSubjectActivity } from "./subjectProgress";
import { loadGenericSubjectStructure } from "./genericSubjectCatalog";
import InteractiveLabelDiagram from "./components/InteractiveLabelDiagram";
import TransportProcessExplorer from "./components/TransportProcessExplorer";
import TransportInvestigationExplorer from "./components/TransportInvestigationExplorer";
import ReproductionComparisonExplorer from "./components/ReproductionComparisonExplorer";
import VegetativePropagationExplorer from "./components/VegetativePropagationExplorer";
import FlowerReproductionProcess from "./components/FlowerReproductionProcess";
import PlantGrowthExplorer from "./components/PlantGrowthExplorer";
import CropProductionExplorer from "./components/CropProductionExplorer";
import SoilFertilityExplorer from "./components/SoilFertilityExplorer";
import SoilErosionExplorer from "./components/SoilErosionExplorer";
import AnimalAsexualReproductionExplorer from "./components/AnimalAsexualReproductionExplorer";
import MenstrualCycleExplorer from "./components/MenstrualCycleExplorer";
import PregnancyStagesExplorer from "./components/PregnancyStagesExplorer";
import BirthControlExplorer from "./components/BirthControlExplorer";
import MaternalBabyCareExplorer from "./components/MaternalBabyCareExplorer";
import HumanGrowthExplorer from "./components/HumanGrowthExplorer";
import PopulationGrowthExplorer from "./components/PopulationGrowthExplorer";
import TransportSystemNeedExplorer from "./components/TransportSystemNeedExplorer";
import TransportStructuresExplorer from "./components/TransportStructuresExplorer";
import BloodGroupExplorer from "./components/BloodGroupExplorer";
import ExcretionEgestionExplorer from "./components/ExcretionEgestionExplorer";
import HumanExcretionMechanismsExplorer from "./components/HumanExcretionMechanismsExplorer";
import PlantExcretionExplorer from "./components/PlantExcretionExplorer";
import SenseOrgansExplorer from "./components/SenseOrgansExplorer";
import EyeFunctionExplorer from "./components/EyeFunctionExplorer";
import SightDefectsExplorer from "./components/SightDefectsExplorer";
import EarFunctionExplorer from "./components/EarFunctionExplorer";
import NervousSystemExplorer from "./components/NervousSystemExplorer";
import EndocrineSystemExplorer from "./components/EndocrineSystemExplorer";
import MicrobeExplorer from "./components/MicrobeExplorer";
import InfectiousDiseaseExplorer from "./components/InfectiousDiseaseExplorer";
import ImmunisationExplorer from "./components/ImmunisationExplorer";
import NonCommunicableDiseaseExplorer from "./components/NonCommunicableDiseaseExplorer";
import ExercisePhysiologyExplorer from "./components/ExercisePhysiologyExplorer";
import DrugEffectsExplorer from "./components/DrugEffectsExplorer";
import PersonalHygieneExplorer from "./components/PersonalHygieneExplorer";
import PestVectorExplorer from "./components/PestVectorExplorer";
import PestControlExplorer from "./components/PestControlExplorer";
import FoodContaminationExplorer from "./components/FoodContaminationExplorer";
import FoodMicroorganismExplorer from "./components/FoodMicroorganismExplorer";
import FoodPreservationExplorer from "./components/FoodPreservationExplorer";
import EnergyConceptExplorer from "./components/EnergyConceptExplorer";
import EnergyConversionExplorer from "./components/EnergyConversionExplorer";
import PhotosynthesisEnergyExplorer from "./components/PhotosynthesisEnergyExplorer";
import EnvironmentEnergyExplorer from "./components/EnvironmentEnergyExplorer";
import FoodEnergyNutritionExplorer from "./components/FoodEnergyNutritionExplorer";
import HumanDigestionExplorer from "./components/HumanDigestionExplorer";
import TeethFunctionExplorer from "./components/TeethFunctionExplorer";
import RespirationImportanceExplorer from "./components/RespirationImportanceExplorer";
import AnaerobicRespirationExplorer from "./components/AnaerobicRespirationExplorer";
import BreathingMechanismExplorer from "./components/BreathingMechanismExplorer";
import GaseousExchangeExplorer from "./components/GaseousExchangeExplorer";
import SmokingGasExchangeExplorer from "./components/SmokingGasExchangeExplorer";
import FossilFuelsExplorer from "./components/FossilFuelsExplorer";
import AlternativeEnergyExplorer from "./components/AlternativeEnergyExplorer";
import ElectricalConductorsExplorer from "./components/ElectricalConductorsExplorer";
import ElectricCircuitFlowExplorer from "./components/ElectricCircuitFlowExplorer";
import ElectricityConsumptionExplorer from "./components/ElectricityConsumptionExplorer";
import HouseholdElectricalSafetyExplorer from "./components/HouseholdElectricalSafetyExplorer";
import EnergyConservationMeasuresExplorer from "./components/EnergyConservationMeasuresExplorer";
import ArtificialLightingExplorer from "./components/ArtificialLightingExplorer";
import ElectricalAccidentFirstAidExplorer from "./components/ElectricalAccidentFirstAidExplorer";
import ElectricalHazardsExplorer from "./components/ElectricalHazardsExplorer";
import FireExtinguishingExplorer from "./components/FireExtinguishingExplorer";
import ProtectiveGearExplorer from "./components/ProtectiveGearExplorer";
import HeatTransferApplicationsExplorer from "./components/HeatTransferApplicationsExplorer";
import ThermostatExplorer from "./components/ThermostatExplorer";
import ThermometerTypesExplorer from "./components/ThermometerTypesExplorer";
import BodyTemperatureRegulationExplorer from "./components/BodyTemperatureRegulationExplorer";
import VentilationExplorer from "./components/VentilationExplorer";
import UniverseComponentsExplorer from "./components/UniverseComponentsExplorer";
import OrbitMotionExplorer from "./components/OrbitMotionExplorer";
import SolarSystemExplorer from "./components/SolarSystemExplorer";
import EarthMoonEffectsExplorer from "./components/EarthMoonEffectsExplorer";
import SpaceExplorationExplorer from "./components/SpaceExplorationExplorer";
import AirMassFrontsExplorer from "./components/AirMassFrontsExplorer";
import CaribbeanWeatherExplorer from "./components/CaribbeanWeatherExplorer";
import TidesExplorer from "./components/TidesExplorer";
import VolcanoEruptionsExplorer from "./components/VolcanoEruptionsExplorer";
import WaterPropertiesExplorer from "./components/WaterPropertiesExplorer";
import HardWaterExplorer from "./components/HardWaterExplorer";
import WaterUsesExplorer from "./components/WaterUsesExplorer";
import ForcePrinciplesExplorer from "./components/ForcePrinciplesExplorer";
import {
  adjacentGenericTopic,
  buildSequentialProgression,
  resolveSequentialTopic,
} from "./genericSubjectProgression";
import {
  readSparkHashRoute,
  subscribeSparkRoute,
  writeSparkNestedRoute,
} from "../routing/sparkRoutingV270";
import "./genericSubjectStudy.css";

function lessonData(topic = {}) {
  const lesson = topic?.metadata?.lesson;
  return lesson && typeof lesson === "object" && !Array.isArray(lesson) ? lesson : {};
}

function lessonSections(topic = {}) {
  const lesson = lessonData(topic);
  return Array.isArray(lesson.sections) ? lesson.sections.filter(Boolean) : [];
}

function keyPoints(topic = {}) {
  const lesson = lessonData(topic);
  return Array.isArray(lesson.keyPoints) ? lesson.keyPoints.filter(Boolean) : [];
}

function lessonObjectives(topic = {}) {
  const lesson = lessonData(topic);
  return Array.isArray(lesson.objectives) ? lesson.objectives.filter(Boolean) : [];
}

function interactiveDiagrams(topic = {}) {
  const lesson = lessonData(topic);
  return Array.isArray(lesson.interactiveDiagrams) ? lesson.interactiveDiagrams.filter(Boolean) : [];
}

function interactiveModels(topic = {}) {
  const lesson = lessonData(topic);
  return Array.isArray(lesson.interactiveModels) ? lesson.interactiveModels.filter(Boolean) : [];
}

function lessonChecks(topic = {}) {
  const lesson = lessonData(topic);
  return Array.isArray(lesson.checks) ? lesson.checks.filter(Boolean) : [];
}

function LessonKnowledgeCheck({ checks = [] }) {
  const [revealed,setRevealed] = useState({});
  if (!checks.length) return null;

  return (
    <section className="spark-generic-knowledge-check">
      <div className="spark-generic-knowledge-check-head">
        <span>CHECK YOUR UNDERSTANDING</span>
        <h3>Check your understanding</h3>
      </div>

      <div className="spark-generic-knowledge-check-list">
        {checks.map((check,index) => {
          const open = Boolean(revealed[index]);
          return (
            <article key={index}>
              <strong>{index + 1}. {String(check?.prompt || "")}</strong>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setRevealed(current => ({...current,[index]:!current[index]}))}
              >
                {open ? "Hide answer" : "Show answer"}
              </button>
              {open && (
                <div className="spark-generic-knowledge-check-answer">
                  <b>{String(check?.answer || "")}</b>
                  {check?.explanation && <p>{String(check.explanation)}</p>}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function routeSelection(path, structure) {
  const route = readSparkHashRoute();
  if (route.path !== path) return { sectionId:null, topicId:null };

  const sectionId = String(route.params.get("section") || "");
  const topicId = String(route.params.get("topic") || "");
  const topic = (structure?.topics || []).find(item => item.id === topicId);

  if (topic) {
    return {
      sectionId:topic.sectionId || sectionId || null,
      topicId:topic.id,
    };
  }

  const section = (structure?.sections || []).find(item => item.id === sectionId);
  return { sectionId:section?.id || null, topicId:null };
}

function firstTopic(structure, completedIds = new Set()) {
  return (structure?.topics || []).find(topic => !completedIds.has(topic.id))
    || structure?.topics?.[0]
    || null;
}

function GenericLessonContent({
  topic,
  completedActivityKeys = new Set(),
  onActivityComplete,
}) {
  const lesson = lessonData(topic);
  const blocks = lessonSections(topic);
  const points = keyPoints(topic);
  const objectives = lessonObjectives(topic);
  const diagrams = interactiveDiagrams(topic);
  const models = interactiveModels(topic);
  const checks = lessonChecks(topic);
  const intro = String(lesson.introduction || topic?.description || "").trim();
  const summary = String(lesson.summary || "").trim();
  const example = lesson.workedExample && typeof lesson.workedExample === "object"
    ? lesson.workedExample
    : null;

  return (
    <div className="spark-generic-lesson-body">
      {intro && <p className="spark-generic-lesson-intro">{intro}</p>}

      {objectives.length > 0 && (
        <Card className="spark-generic-objectives">
          <strong>What you should be able to do</strong>
          <ul>
            {objectives.map((objective,index) => <li key={index}>{String(objective)}</li>)}
          </ul>
        </Card>
      )}

      {blocks.map((block, index) => {
        const paragraphs = Array.isArray(block?.paragraphs)
          ? block.paragraphs
          : block?.body
            ? [block.body]
            : [];
        const bullets = Array.isArray(block?.bullets) ? block.bullets : [];

        return (
          <section key={`${block?.title || "section"}-${index}`} className="spark-generic-lesson-section">
            {block?.title && <h3>{block.title}</h3>}
            {paragraphs.filter(Boolean).map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{String(paragraph)}</p>
            ))}
            {bullets.length > 0 && (
              <ul>
                {bullets.filter(Boolean).map((item, bulletIndex) => (
                  <li key={bulletIndex}>{String(item)}</li>
                ))}
              </ul>
            )}
          </section>
        );
      })}

      {models.map(model => {
        if (model?.type === "membrane-transport") {
          return <TransportProcessExplorer key={model.id || "membrane-transport"} />;
        }
        if (model?.type === "transport-investigations") {
          return <TransportInvestigationExplorer key={model.id || "transport-investigations"} />;
        }
        if (model?.type === "reproduction-comparison") {
          return <ReproductionComparisonExplorer key={model.id || "reproduction-comparison"} />;
        }
        if (model?.type === "vegetative-propagation") {
          return <VegetativePropagationExplorer key={model.id || "vegetative-propagation"} />;
        }
        if (model?.type === "flower-reproduction-process") {
          return <FlowerReproductionProcess key={model.id || "flower-reproduction-process"} />;
        }
        if (model?.type === "plant-growth-investigation") {
          return <PlantGrowthExplorer key={model.id || "plant-growth-investigation"} />;
        }
        if (model?.type === "crop-production-systems") {
          return <CropProductionExplorer key={model.id || "crop-production-systems"} />;
        }
        if (model?.type === "soil-fertility") {
          return <SoilFertilityExplorer key={model.id || "soil-fertility"} />;
        }
        if (model?.type === "soil-erosion-food-production") {
          return <SoilErosionExplorer key={model.id || "soil-erosion-food-production"} />;
        }
        if (model?.type === "animal-asexual-reproduction") {
          return <AnimalAsexualReproductionExplorer key={model.id || "animal-asexual-reproduction"} />;
        }
        if (model?.type === "menstrual-cycle") {
          return <MenstrualCycleExplorer key={model.id || "menstrual-cycle"} />;
        }
        if (model?.type === "pregnancy-stages") {
          return <PregnancyStagesExplorer key={model.id || "pregnancy-stages"} />;
        }
        if (model?.type === "birth-control") {
          return <BirthControlExplorer key={model.id || "birth-control"} />;
        }
        if (model?.type === "maternal-baby-care") {
          return <MaternalBabyCareExplorer key={model.id || "maternal-baby-care"} />;
        }
        if (model?.type === "human-growth") {
          return <HumanGrowthExplorer key={model.id || "human-growth"} />;
        }
        if (model?.type === "population-growth") {
          return <PopulationGrowthExplorer key={model.id || "population-growth"} />;
        }
        if (model?.type === "transport-system-need") {
          return <TransportSystemNeedExplorer key={model.id || "transport-system-need"} />;
        }
        if (model?.type === "transport-structures") {
          return <TransportStructuresExplorer key={model.id || "transport-structures"} />;
        }
        if (model?.type === "blood-groups") {
          return <BloodGroupExplorer key={model.id || "blood-groups"} />;
        }
        if (model?.type === "excretion-egestion") {
          return <ExcretionEgestionExplorer key={model.id || "excretion-egestion"} />;
        }
        if (model?.type === "human-excretion-mechanisms") {
          return <HumanExcretionMechanismsExplorer key={model.id || "human-excretion-mechanisms"} />;
        }
        if (model?.type === "plant-excretion") {
          return <PlantExcretionExplorer key={model.id || "plant-excretion"} />;
        }
        if (model?.type === "sense-organs") {
          return <SenseOrgansExplorer key={model.id || "sense-organs"} />;
        }
        if (model?.type === "eye-function") {
          return <EyeFunctionExplorer key={model.id || "eye-function"} />;
        }
        if (model?.type === "sight-defects") {
          return <SightDefectsExplorer key={model.id || "sight-defects"} />;
        }
        if (model?.type === "ear-function") {
          return <EarFunctionExplorer key={model.id || "ear-function"} />;
        }
        if (model?.type === "nervous-system") {
          return <NervousSystemExplorer key={model.id || "nervous-system"} />;
        }
        if (model?.type === "endocrine-system") {
          return <EndocrineSystemExplorer key={model.id || "endocrine-system"} />;
        }
        if (model?.type === "microbes") {
          return <MicrobeExplorer key={model.id || "microbes"} />;
        }
        if (model?.type === "infectious-disease") {
          return <InfectiousDiseaseExplorer key={model.id || "infectious-disease"} />;
        }
        if (model?.type === "immunisation") {
          return <ImmunisationExplorer key={model.id || "immunisation"} />;
        }
        if (model?.type === "non-communicable-disease") {
          return <NonCommunicableDiseaseExplorer key={model.id || "non-communicable-disease"} />;
        }
        if (model?.type === "exercise-physiology") {
          return <ExercisePhysiologyExplorer key={model.id || "exercise-physiology"} />;
        }
        if (model?.type === "drug-effects") {
          return <DrugEffectsExplorer key={model.id || "drug-effects"} />;
        }
        if (model?.type === "personal-hygiene") {
          return <PersonalHygieneExplorer key={model.id || "personal-hygiene"} />;
        }
        if (model?.type === "pest-vectors") {
          return <PestVectorExplorer key={model.id || "pest-vectors"} />;
        }
        if (model?.type === "pest-control") {
          return <PestControlExplorer key={model.id || "pest-control"} />;
        }
        if (model?.type === "food-contamination") {
          return <FoodContaminationExplorer key={model.id || "food-contamination"} />;
        }
        if (model?.type === "food-microorganisms") {
          return <FoodMicroorganismExplorer key={model.id || "food-microorganisms"} />;
        }
        if (model?.type === "food-preservation") {
          return <FoodPreservationExplorer key={model.id || "food-preservation"} />;
        }
        if (model?.type === "energy-concept") {
          return <EnergyConceptExplorer key={model.id || "energy-concept"} />;
        }
        if (model?.type === "energy-conversion") {
          return <EnergyConversionExplorer key={model.id || "energy-conversion"} />;
        }
        if (model?.type === "photosynthesis-energy") {
          return <PhotosynthesisEnergyExplorer key={model.id || "photosynthesis-energy"} />;
        }
        if (model?.type === "environment-energy") {
          return <EnvironmentEnergyExplorer key={model.id || "environment-energy"} />;
        }
        if (model?.type === "food-energy-nutrition") {
          return <FoodEnergyNutritionExplorer key={model.id || "food-energy-nutrition"} />;
        }
        if (model?.type === "human-digestion") {
          return <HumanDigestionExplorer key={model.id || "human-digestion"} />;
        }
        if (model?.type === "teeth-function") {
          return <TeethFunctionExplorer key={model.id || "teeth-function"} />;
        }
        if (model?.type === "respiration-importance") {
          return <RespirationImportanceExplorer key={model.id || "respiration-importance"} />;
        }
        if (model?.type === "anaerobic-respiration") {
          return <AnaerobicRespirationExplorer key={model.id || "anaerobic-respiration"} />;
        }
        if (model?.type === "breathing-mechanism") {
          return <BreathingMechanismExplorer key={model.id || "breathing-mechanism"} />;
        }
        if (model?.type === "gaseous-exchange") {
          return <GaseousExchangeExplorer key={model.id || "gaseous-exchange"} />;
        }
        if (model?.type === "smoking-gaseous-exchange") {
          return <SmokingGasExchangeExplorer key={model.id || "smoking-gaseous-exchange"} />;
        }
        if (model?.type === "fossil-fuels") {
          return <FossilFuelsExplorer key={model.id || "fossil-fuels"} />;
        }
        if (model?.type === "alternative-energy") {
          return <AlternativeEnergyExplorer key={model.id || "alternative-energy"} />;
        }
        if (model?.type === "electrical-conductors") {
          return <ElectricalConductorsExplorer key={model.id || "electrical-conductors"} />;
        }
        if (model?.type === "electric-circuit-flow") {
          return <ElectricCircuitFlowExplorer key={model.id || "electric-circuit-flow"} />;
        }
        if (model?.type === "electricity-consumption") {
          return <ElectricityConsumptionExplorer key={model.id || "electricity-consumption"} />;
        }
        if (model?.type === "household-electrical-safety") {
          return <HouseholdElectricalSafetyExplorer key={model.id || "household-electrical-safety"} />;
        }
        if (model?.type === "energy-conservation-measures") {
          return <EnergyConservationMeasuresExplorer key={model.id || "energy-conservation-measures"} />;
        }
        if (model?.type === "artificial-lighting") {
          return <ArtificialLightingExplorer key={model.id || "artificial-lighting"} />;
        }
        if (model?.type === "electrical-accident-first-aid") {
          return <ElectricalAccidentFirstAidExplorer key={model.id || "electrical-accident-first-aid"} />;
        }
        if (model?.type === "electrical-hazards") {
          return <ElectricalHazardsExplorer key={model.id || "electrical-hazards"} />;
        }
        if (model?.type === "fire-extinguishing") {
          return <FireExtinguishingExplorer key={model.id || "fire-extinguishing"} />;
        }
        if (model?.type === "protective-gear") {
          return <ProtectiveGearExplorer key={model.id || "protective-gear"} />;
        }
        if (model?.type === "heat-transfer-applications") {
          return <HeatTransferApplicationsExplorer key={model.id || "heat-transfer-applications"} />;
        }
        if (model?.type === "thermostat-control") {
          return <ThermostatExplorer key={model.id || "thermostat-control"} />;
        }
        if (model?.type === "thermometer-types") {
          return <ThermometerTypesExplorer key={model.id || "thermometer-types"} />;
        }
        if (model?.type === "body-temperature-regulation") {
          return <BodyTemperatureRegulationExplorer key={model.id || "body-temperature-regulation"} />;
        }
        if (model?.type === "ventilation") {
          return <VentilationExplorer key={model.id || "ventilation"} />;
        }
        if (model?.type === "universe-components") {
          return <UniverseComponentsExplorer key={model.id || "universe-components"} />;
        }
        if (model?.type === "orbit-motion") {
          return <OrbitMotionExplorer key={model.id || "orbit-motion"} />;
        }
        if (model?.type === "solar-system") {
          return <SolarSystemExplorer key={model.id || "solar-system"} />;
        }
        if (model?.type === "earth-moon-effects") {
          return <EarthMoonEffectsExplorer key={model.id || "earth-moon-effects"} />;
        }
        if (model?.type === "space-exploration") {
          return <SpaceExplorationExplorer key={model.id || "space-exploration"} />;
        }
        if (model?.type === "air-mass-fronts") {
          return <AirMassFrontsExplorer key={model.id || "air-mass-fronts"} />;
        }
        if (model?.type === "caribbean-weather") {
          return <CaribbeanWeatherExplorer key={model.id || "caribbean-weather"} />;
        }
        if (model?.type === "tides") {
          return <TidesExplorer key={model.id || "tides"} />;
        }
        if (model?.type === "volcano-eruptions") {
          return <VolcanoEruptionsExplorer key={model.id || "volcano-eruptions"} />;
        }
        if (model?.type === "water-properties") {
          return <WaterPropertiesExplorer key={model.id || "water-properties"} />;
        }
        if (model?.type === "hard-water") {
          return <HardWaterExplorer key={model.id || "hard-water"} />;
        }
        if (model?.type === "water-uses") {
          return <WaterUsesExplorer key={model.id || "water-uses"} />;
        }
        if (model?.type === "force-principles") {
          return <ForcePrinciplesExplorer key={model.id || "force-principles"} />;
        }
        return null;
      })}

      {diagrams.map(diagram => (
        <InteractiveLabelDiagram
          key={diagram.id || diagram.title}
          activity={diagram}
          completed={completedActivityKeys.has(`diagram:${diagram.id}`)}
          onComplete={result => onActivityComplete?.({
            ...result,
            topicId:topic.id,
            sectionId:topic.sectionId,
          })}
        />
      ))}

      {points.length > 0 && (
        <Card className="spark-generic-key-points">
          <strong>Key points</strong>
          <ul>
            {points.map((point, index) => <li key={index}>{String(point)}</li>)}
          </ul>
        </Card>
      )}

      {example && (
        <Card className="spark-generic-worked-example">
          <span>Worked example</span>
          {example.title && <h3>{example.title}</h3>}
          {example.prompt && <p>{example.prompt}</p>}
          {Array.isArray(example.steps) && example.steps.length > 0 && (
            <ol>
              {example.steps.map((step, index) => <li key={index}>{String(step)}</li>)}
            </ol>
          )}
          {example.answer && <div className="spark-generic-example-answer">{example.answer}</div>}
        </Card>
      )}

      <LessonKnowledgeCheck checks={checks} />

      {summary && (
        <section className="spark-generic-lesson-summary">
          <h3>Lesson summary</h3>
          <p>{summary}</p>
        </section>
      )}

      {!intro && blocks.length === 0 && points.length === 0 && !example && !summary && (
        <Card className="spark-generic-content-empty">
          <strong>Lesson content is being prepared.</strong>
          <p>This topic is in the course structure, but its learner notes have not been published yet.</p>
        </Card>
      )}
    </div>
  );
}

export default function GenericSubjectStudyView({
  supabase,
  userId,
  subject,
  onBack,
  onManageSubjects,
  showToast,
}) {
  const [structure, setStructure] = useState(null);
  const [loading, setLoading] = useState(Boolean(subject?.id));
  const [error, setError] = useState(null);
  const [completedTopicIds, setCompletedTopicIds] = useState(new Set());
  const [completedActivityKeys, setCompletedActivityKeys] = useState(new Set());
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [saving, setSaving] = useState(false);

  const subjectId = String(subject?.id || "").trim().toLowerCase();
  const studyPath = subject?.routes?.study || (subjectId ? `/study/${subjectId}` : "/study");
  const sequentialLessons = String(subject?.learningConfig?.progression || "").toLowerCase() === "sequential";

  const applySelection = useCallback((nextStructure, completed) => {
    if (!nextStructure) return;

    const safeCompleted = completed || new Set();
    const routed = routeSelection(studyPath, nextStructure);

    if (sequentialLessons) {
      const topic = resolveSequentialTopic({
        structure:nextStructure,
        completedIds:safeCompleted,
        requestedTopicId:routed.topicId,
        requestedSectionId:routed.sectionId,
      });

      setActiveSectionId(topic?.sectionId || nextStructure.sections?.[0]?.id || null);
      setActiveTopicId(topic?.id || null);

      if (
        topic &&
        (
          (routed.topicId && routed.topicId !== topic.id) ||
          (routed.sectionId && routed.sectionId !== topic.sectionId)
        )
      ) {
        writeSparkNestedRoute(studyPath, {
          section:topic.sectionId || null,
          topic:topic.id,
        }, { replace:true });
      }
      return;
    }

    if (routed.topicId) {
      setActiveSectionId(routed.sectionId);
      setActiveTopicId(routed.topicId);
      return;
    }

    if (routed.sectionId) {
      const section = nextStructure.sections.find(item => item.id === routed.sectionId);
      const topic = section?.topics?.[0] || null;
      setActiveSectionId(routed.sectionId);
      setActiveTopicId(topic?.id || null);
      return;
    }

    const topic = firstTopic(nextStructure, safeCompleted);
    setActiveSectionId(topic?.sectionId || nextStructure.sections?.[0]?.id || null);
    setActiveTopicId(topic?.id || null);
  }, [sequentialLessons, studyPath]);

  useEffect(() => {
    let cancelled = false;

    if (!subjectId) {
      setLoading(false);
      setStructure(null);
      return () => { cancelled = true; };
    }

    setLoading(true);
    setError(null);

    Promise.all([
      loadGenericSubjectStructure({ supabase, subjectId }),
      userId
        ? supabase.from("spark_subject_progress")
            .select("topic_id,activity_key,activity_type,completed")
            .eq("user_id", userId)
            .eq("subject_id", subjectId)
            .eq("completed", true)
        : Promise.resolve({ data:[], error:null }),
    ]).then(([structureResult, progressResult]) => {
      if (cancelled) return;

      if (structureResult.error) {
        setError(structureResult.error);
        setStructure(null);
        setLoading(false);
        return;
      }

      const completedRows = progressResult.data || [];
      const completed = new Set(
        completedRows
          .filter(row => row.activity_type === "lesson")
          .map(row => String(
            row.topic_id || String(row.activity_key || "").replace(/^lesson:/, "")
          ).trim())
          .filter(Boolean)
      );
      const completedKeys = new Set(
        completedRows.map(row => String(row.activity_key || "").trim()).filter(Boolean)
      );

      setCompletedTopicIds(completed);
      setCompletedActivityKeys(completedKeys);
      setStructure(structureResult.data);
      applySelection(structureResult.data, completed);

      if (progressResult.error && !["42P01","PGRST205"].includes(progressResult.error.code)) {
        console.warn("Could not load generic subject lesson progress", progressResult.error);
      }

      setLoading(false);
    }).catch(loadError => {
      if (cancelled) return;
      setError(loadError);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [applySelection, subjectId, supabase, userId]);

  useEffect(() => {
    if (!structure || !subjectId) return undefined;

    return subscribeSparkRoute(route => {
      if (route.path !== studyPath) return;

      const next = routeSelection(studyPath, structure);

      if (sequentialLessons) {
        const topic = resolveSequentialTopic({
          structure,
          completedIds:completedTopicIds,
          requestedTopicId:next.topicId,
          requestedSectionId:next.sectionId,
        });
        if (!topic) return;

        setActiveSectionId(topic.sectionId || null);
        setActiveTopicId(topic.id);

        if (
          (next.topicId && next.topicId !== topic.id) ||
          (next.sectionId && next.sectionId !== topic.sectionId)
        ) {
          writeSparkNestedRoute(studyPath, {
            section:topic.sectionId || null,
            topic:topic.id,
          }, { replace:true });
        }
        return;
      }

      if (next.topicId) {
        setActiveSectionId(next.sectionId);
        setActiveTopicId(next.topicId);
      } else if (next.sectionId) {
        const topic = structure.sections
          .find(section => section.id === next.sectionId)
          ?.topics?.[0];

        setActiveSectionId(next.sectionId);
        setActiveTopicId(topic?.id || null);
      }
    });
  }, [completedTopicIds, sequentialLessons, structure, studyPath, subjectId]);

  const activeTopic = useMemo(
    () => structure?.topics?.find(topic => topic.id === activeTopicId) || null,
    [activeTopicId, structure]
  );

  const activeSection = useMemo(
    () => structure?.sections?.find(
      section => section.id === (activeTopic?.sectionId || activeSectionId)
    ) || null,
    [activeSectionId, activeTopic, structure]
  );

  const completedCount = structure?.topics
    ?.filter(topic => completedTopicIds.has(topic.id))
    .length || 0;

  const totalTopics = structure?.topicCount || 0;
  const progressPercent = totalTopics
    ? Math.round((completedCount / totalTopics) * 100)
    : 0;

  const sequentialProgression = useMemo(
    () => buildSequentialProgression(structure || {},completedTopicIds),
    [completedTopicIds,structure]
  );
  const previousTopic = useMemo(
    () => adjacentGenericTopic(structure || {},activeTopicId,-1),
    [activeTopicId,structure]
  );
  const nextTopic = useMemo(
    () => adjacentGenericTopic(structure || {},activeTopicId,1),
    [activeTopicId,structure]
  );

  const openTopic = useCallback((topic, sectionId) => {
    if (!topic) return;
    if (sequentialLessons && !sequentialProgression.isUnlocked(topic)) {
      showToast?.("Complete the current lesson before opening this lesson.","info");
      return;
    }

    setActiveSectionId(sectionId || topic.sectionId || null);
    setActiveTopicId(topic.id);

    writeSparkNestedRoute(studyPath, {
      section:sectionId || topic.sectionId || null,
      topic:topic.id,
    });

    if (typeof window !== "undefined") window.scrollTo?.(0, 0);
  }, [sequentialLessons,sequentialProgression,showToast,studyPath]);

  const recordInteractiveComplete = useCallback(async ({
    activityId,
    title,
    score,
    total,
    percent,
    topicId,
    sectionId,
  }) => {
    const activityKey = `diagram:${activityId}`;
    if (!activityId || completedActivityKeys.has(activityKey)) return;

    try {
      const result = await recordSubjectActivity({
        supabase,
        activity:{
          subjectId,
          activityKey,
          activityType:"diagram",
          sectionId:sectionId || activeSection?.id || null,
          topicId:topicId || activeTopic?.id || null,
          title:title || "Interactive diagram",
          completed:true,
          score,
          maxScore:total,
          percent,
          metadata:{
            source:"generic_subject_interactive_diagram",
            adapter:"generic-subject-v1",
            at:new Date().toISOString(),
          },
        },
      });

      if (result?.error) throw result.error;
      setCompletedActivityKeys(current => new Set([...current,activityKey]));
      showToast?.(`${title || "Interactive diagram"} completed.`, "success");
    } catch (activityError) {
      console.error("Could not save interactive diagram progress",activityError);
      showToast?.(
        activityError?.message || "Your diagram score could not be saved.",
        "error"
      );
    }
  }, [
    activeSection?.id,
    activeTopic?.id,
    completedActivityKeys,
    showToast,
    subjectId,
    supabase,
  ]);

  const markComplete = useCallback(async () => {
    if (!activeTopic || !subjectId || saving) return;
    if (completedTopicIds.has(activeTopic.id)) return;

    setSaving(true);

    try {
      const result = await recordSubjectActivity({
        supabase,
        activity:{
          subjectId,
          activityKey:`lesson:${activeTopic.id}`,
          activityType:"lesson",
          sectionId:activeTopic.sectionId || activeSection?.id || null,
          topicId:activeTopic.id,
          title:activeTopic.title,
          completed:true,
          metadata:{
            source:"generic_subject_study",
            adapter:"generic-subject-v1",
            at:new Date().toISOString(),
          },
        },
      });

      if (result?.error) throw result.error;

      setCompletedTopicIds(current => new Set([...current, activeTopic.id]));
      showToast?.(`${activeTopic.title} completed.`, "success");
    } catch (saveError) {
      console.error("Could not save generic subject lesson progress", saveError);
      showToast?.(
        saveError?.message || "Could not mark this lesson complete.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }, [
    activeSection?.id,
    activeTopic,
    completedTopicIds,
    saving,
    showToast,
    subjectId,
    supabase,
  ]);

  if (!subject) {
    return (
      <main className="spark-generic-study">
        <div className="spark-generic-study-shell">
          <Card className="spark-generic-unavailable">
            <span className="section-kicker">SUBJECT UNAVAILABLE</span>
            <h1>This subject is not available for learners.</h1>
            <p>It may still be a draft, disabled, or no longer published.</p>
            <div className="spark-generic-empty-actions">
              {onBack && <button type="button" onClick={onBack}>Back to Study</button>}
              {onManageSubjects && (
                <button type="button" className="secondary" onClick={onManageSubjects}>
                  My subjects
                </button>
              )}
            </div>
          </Card>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <SparkLoader
        variant="section"
        label={`Loading ${subject.shortName || subject.name}`}
      />
    );
  }

  if (error) {
    return (
      <main className="spark-generic-study">
        <div className="spark-generic-study-shell">
          <Card className="spark-generic-unavailable">
            <span className="section-kicker">COURSE LOAD ERROR</span>
            <h1>We could not open {subject.shortName || subject.name}.</h1>
            <p>{error?.message || "The course structure could not be loaded."}</p>
            {onBack && <button type="button" onClick={onBack}>Back to Study</button>}
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="spark-generic-study">
      <div className="spark-generic-study-shell">
        <header className="spark-generic-study-hero">
          <div className="spark-generic-study-mark" aria-hidden="true">
            {subject.mark || subject.shortName?.slice(0,2) || "â€¢"}
          </div>

          <div className="spark-generic-study-hero-copy">
            <span className="section-kicker">{subject.qualification || "CSEC"} COURSE</span>
            <h1>{subject.name}</h1>
            <p>{subject.description}</p>
          </div>

          <div className="spark-generic-study-hero-actions">
            {onBack && (
              <button type="button" onClick={onBack}>Change subject</button>
            )}
          </div>
        </header>

        <section
          className="spark-generic-progress-card"
          aria-label={`${subject.shortName || subject.name} progress`}
        >
          <div>
            <strong>{completedCount}/{totalTopics || 0}</strong>
            <span>topics completed</span>
          </div>
          <div className="spark-generic-progress-track" aria-hidden="true">
            <span style={{width:`${progressPercent}%`}} />
          </div>
          <b>{progressPercent}%</b>
        </section>

        {!structure?.topicCount ? (
          <Card className="spark-generic-empty-course">
            <span className="section-kicker">COURSE STRUCTURE</span>
            <h2>Lessons are being prepared.</h2>
            <p>
              {subject.shortName || subject.name} is published in the subject
              catalog, but no learner topics are available yet.
            </p>
            {onBack && (
              <button type="button" onClick={onBack}>Choose another subject</button>
            )}
          </Card>
        ) : (
          <div className="spark-generic-learning-layout">
            <aside
              className="spark-generic-outline"
              aria-label={`${subject.shortName || subject.name} course outline`}
            >
              <div className="spark-generic-outline-head">
                <span>Course outline</span>
                <strong>{totalTopics} topics</strong>
              </div>

              {structure.sections.map(section => (
                <section key={section.id} className="spark-generic-outline-section">
                  <div className="spark-generic-outline-section-title">
                    <span>{section.title}</span>
                    <small>{section.topics.length}</small>
                  </div>

                  <div className="spark-generic-outline-topics">
                    {section.topics.map(topic => {
                      const active = topic.id === activeTopicId;
                      const complete = completedTopicIds.has(topic.id);
                      const locked = sequentialLessons && !sequentialProgression.isUnlocked(topic);

                      return (
                        <button
                          type="button"
                          key={topic.id}
                          className={`${active ? "active" : ""} ${complete ? "complete" : ""} ${locked ? "locked" : ""}`}
                          onClick={() => openTopic(topic, section.id)}
                          aria-current={active ? "page" : undefined}
                          aria-disabled={locked ? "true" : undefined}
                          disabled={locked}
                          title={locked ? "Complete the current lesson to unlock this lesson." : undefined}
                        >
                          <span className="spark-generic-topic-state" aria-hidden="true">
                            {locked ? (
                              <svg viewBox="0 0 20 20" focusable="false">
                                <rect x="5.5" y="9" width="9" height="7" rx="1.5" />
                                <path d="M7.5 9V7a2.5 2.5 0 015 0v2" />
                              </svg>
                            ) : complete ? (
                              <svg viewBox="0 0 20 20" focusable="false">
                                <path d="M5 10.5l3 3L15 7" />
                              </svg>
                            ) : (
                              <span className="spark-generic-topic-dot" />
                            )}
                          </span>
                          <span>{topic.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}

              {structure.unassignedTopics.length > 0 && (
                <section className="spark-generic-outline-section">
                  <div className="spark-generic-outline-section-title">
                    <span>More topics</span>
                    <small>{structure.unassignedTopics.length}</small>
                  </div>
                  <div className="spark-generic-outline-topics">
                    {structure.unassignedTopics.map(topic => {
                      const complete = completedTopicIds.has(topic.id);
                      const locked = sequentialLessons && !sequentialProgression.isUnlocked(topic);
                      return (
                        <button
                          type="button"
                          key={topic.id}
                          className={`${topic.id === activeTopicId ? "active" : ""} ${complete ? "complete" : ""} ${locked ? "locked" : ""}`}
                          onClick={() => openTopic(topic, null)}
                          disabled={locked}
                          aria-disabled={locked ? "true" : undefined}
                          title={locked ? "Complete the current lesson to unlock this lesson." : undefined}
                        >
                          <span className="spark-generic-topic-state" aria-hidden="true">
                            {locked ? (
                              <svg viewBox="0 0 20 20" focusable="false">
                                <rect x="5.5" y="9" width="9" height="7" rx="1.5" />
                                <path d="M7.5 9V7a2.5 2.5 0 015 0v2" />
                              </svg>
                            ) : complete ? (
                              <svg viewBox="0 0 20 20" focusable="false">
                                <path d="M5 10.5l3 3L15 7" />
                              </svg>
                            ) : (
                              <span className="spark-generic-topic-dot" />
                            )}
                          </span>
                          <span>{topic.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}
            </aside>

            <article className="spark-generic-lesson">
              {activeTopic ? (
                <>
                  <div className="spark-generic-lesson-head">
                    <div>
                      <span className="section-kicker">
                        {activeSection?.title || "COURSE TOPIC"}
                      </span>
                      <h2>{activeTopic.title}</h2>
                    </div>

                    {completedTopicIds.has(activeTopic.id) && (
                      <span className="spark-generic-complete-chip">Completed</span>
                    )}
                  </div>

                  <GenericLessonContent
                    topic={activeTopic}
                    completedActivityKeys={completedActivityKeys}
                    onActivityComplete={recordInteractiveComplete}
                  />

                  <div className="spark-generic-lesson-footer">
                    <div className="spark-generic-lesson-nav-left">
                      {previousTopic && (
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => openTopic(previousTopic,previousTopic.sectionId)}
                        >
                          Previous
                        </button>
                      )}
                    </div>

                    <div className="spark-generic-lesson-nav-right">
                      {!completedTopicIds.has(activeTopic.id) ? (
                        <button
                          type="button"
                          disabled={saving}
                          onClick={markComplete}
                        >
                          {saving ? "Saving..." : "Mark lesson complete"}
                        </button>
                      ) : nextTopic && (!sequentialLessons || sequentialProgression.isUnlocked(nextTopic)) ? (
                        <button
                          type="button"
                          onClick={() => openTopic(nextTopic,nextTopic.sectionId)}
                        >
                          Next lesson
                        </button>
                      ) : (
                        <button type="button" className="completed" disabled>
                          {nextTopic ? "Next lesson locked" : "Course complete"}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Card className="spark-generic-content-empty">
                  <strong>Choose a topic</strong>
                  <p>Select a topic from the course outline to begin.</p>
                </Card>
              )}
            </article>
          </div>
        )}
      </div>
    </main>
  );
}