import React from "react";
import {render, fireEvent, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import IntegratedScienceModel from "./IntegratedScienceModel";
const types=["membrane-transport","transport-investigations","reproduction-comparison","vegetative-propagation","flower-reproduction-process","plant-growth-investigation","crop-production-systems","soil-fertility","soil-erosion-food-production","animal-asexual-reproduction","menstrual-cycle","pregnancy-stages","birth-control","maternal-baby-care","human-growth","population-growth","transport-system-need","transport-structures","blood-groups","excretion-egestion","human-excretion-mechanisms","plant-excretion","sense-organs","eye-function","sight-defects","ear-function","nervous-system","endocrine-system","microbes","infectious-disease","immunisation","non-communicable-disease","exercise-physiology","drug-effects","personal-hygiene","pest-vectors","pest-control","food-contamination","food-microorganisms","food-preservation","energy-concept","energy-conversion","photosynthesis-energy","environment-energy","food-energy-nutrition","human-digestion","teeth-function","respiration-importance","anaerobic-respiration","breathing-mechanism","gaseous-exchange","smoking-gaseous-exchange","fossil-fuels","alternative-energy","electrical-conductors","electric-circuit-flow","electricity-consumption","household-electrical-safety","energy-conservation-measures","artificial-lighting","electrical-accident-first-aid","electrical-hazards","fire-extinguishing","protective-gear","heat-transfer-applications","thermostat-control","thermometer-types","body-temperature-regulation","ventilation","universe-components","orbit-motion","solar-system","earth-moon-effects","space-exploration","air-mass-fronts","caribbean-weather","tides","volcano-eruptions","water-properties","hard-water","water-uses","fishing-methods","water-pollution","water-purification","flotation","marine-navigation","water-safety","diving-effects","force-principles","gravity-inertia","stability-centre-gravity","equilibrium-moments","momentum-conservation","simple-machines","human-skeleton","skeletal-muscle-movement","machine-efficiency","material-properties","metal-reactivity","aluminium-utensils","alloys","rusting-conditions","corrosion-protection","household-chemicals","acids-bases-salts","states-matter","mixtures","separation-techniques","cleaning-agent-effects","soap-detergents","air-pollution","community-hygiene","plastics"];
afterEach(cleanup);
test.each(types)("%s renders its approved reference when selecting each lesson tab", type => {
  const {container}=render(<IntegratedScienceModel model={{type}}/>);
  expect(container.textContent.length).toBeGreaterThan(0);
  const check=()=>{for(const wrapper of container.querySelectorAll('.spark-reviewed-science-diagram')){
    expect(wrapper.firstElementChild).toHaveAttribute('hidden');
    for(const image of wrapper.querySelectorAll('img'))expect(image.getAttribute('src')).toMatch(/integrated-science\/diagrams\/\d{4}\.(svg|png|jpg|jpeg|gif)$/);
  }};
  check();
  const buttons=[...container.querySelectorAll('button')].filter(b=>!b.closest('.spark-reviewed-science-diagram'));
  for(const button of buttons){if(button.isConnected&&!button.disabled){fireEvent.click(button);check();}}
});
