import { sectionMeta } from "./courseHelpers";

export const SOCIAL_STUDIES_SECTIONS = Object.freeze([
  sectionMeta(
    "A1",
    "Individual and the Family",
    "Section A · Part I",
    "Family life, identity, relationships, parenting, social issues, culture and the research skills used to understand them."
  ),
  sectionMeta(
    "A2",
    "Society and Governance",
    "Section A · Part II",
    "Social groups and institutions, government, elections, citizenship, good governance and responsible participation."
  ),
  sectionMeta(
    "B1",
    "Development and Use of Resources",
    "Section B · Part I",
    "Population, migration, human resources, employment, natural resources, climate change and sustainable development."
  ),
  sectionMeta(
    "B2",
    "Regional Development",
    "Section B · Part II",
    "Caribbean geography, development, industries, regional integration, institutions, tourism and shared regional action."
  ),
]);

export const SOCIAL_STUDIES_SECTION_BY_ID = Object.freeze(
  Object.fromEntries(SOCIAL_STUDIES_SECTIONS.map(section => [section.id,section]))
);
