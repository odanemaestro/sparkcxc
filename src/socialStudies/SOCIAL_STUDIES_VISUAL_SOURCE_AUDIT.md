# SPARK Social Studies Visual Learning Audit

**Review date:** 15 October 2026  
**Course:** CSEC Social Studies, 39 locally defined lessons in A1, A2, B1 and B2.  
**Branch:** `feat/social-studies-curated-visuals-v1`

## Decision

Searches targeted educational Commons diagrams, credible historical Caribbean examples, demographic visualisations and public-domain meteorological footage. **20 topic-matched media placements across 18 lessons (18 image placements, 1 animation, plus one further map/image placement)** were selected; some historical reference files appear in more than one lesson when each lesson has a distinct reading task. There are 18 course topics in the reference registry. This is a carefully selected subset, not a promise to illustrate every objective with stock photos.

Media remains secondary to the existing Social Studies notes, inquiry toolkit, CSEC Paper 1 and 2 practice, interactive exercises and SBA activities. None of those were replaced.

## Lesson placement and evidence

| Lesson | Images / animation | Purpose or caution |
| --- | --- | --- |
| A1 Family types | Family Tree (Wilfredor, CC0) | Read relationships, acknowledge different Caribbean family structures |
| A1 Cultural transmission | Kingston Emancipation Park (WhisperToMe, public domain) | Historical memory and collective identity |
| A1 Caribbean culture worldwide | Jamaican reggae musician Ernie Smith (Igbochild, CC BY 3.0) | Music and cultural diffusion |
| A2 Government structure | Separation of powers (Judkessler, CC0) | Judiciary, legislature, executive; parliamentary overlap explained |
| A2 Electoral systems | Jamaica constituency election map, 2025 (Furfur/DrRandomFactor, CC BY-SA 4.0) | Constituencies and the first-past-the-post system |
| A2 Election outcomes | Same 2025 Jamaican election map | Seats vs votes; historical results only |
| B1 Understanding population | Jamaica 2013 population pyramid (CIA, public domain) | Age and sex groups, historic not current |
| B1 Population change | Demographic Transition, OWID (CC BY 3.0) | General model, not Jamaica's actual rate curve |
| B1 Population data | Jamaica 2013 population pyramid (CIA, public domain) | Graph-reading and comparison |
| B1 Migration | Windrush memorial plaque at Paddington Station (Spudgun67, CC BY-SA 4.0) | Caribbean migration and contributions in Britain |
| B1 Natural resources | Coral Reef (US Fish and Wildlife Service, public domain) | Fisheries, conservation, tourism |
| B1 Environmental practices | Coral reef diagram (US government, public domain) | Marine ecosystem protection |
| B1 Climate risk | NOAA Hurricane Maria satellite still and CIRA/NOAA 11-second WebM animation (public domain) | Storm hazards, planning and evidence limits |
| B2 Caribbean location | Antilles Map, Lesser Antilles named (Kikos/Mimich, CC BY-SA 3.0) | Geographical grouping and named islands |
| B2 Measuring development | Our World in Data / UNDP 2023 HDI map (CC BY 4.0) | Development beyond income, historical dataset |
| B2 Integration roots | CARICOM grouping map published 2010 (Carport, public domain) | Distance and regional cooperation; **not current membership reference** |
| B2 Regional organisations | CARICOM flag, simple insignia (public domain determination on Commons) | Distinguish CARICOM, CSME, OECS and CCJ |
| B2 Tourism | Dunn's River Falls, Jamaica (Jason Boldero, CC BY 2.0) | Benefits and social/environmental costs of tourism |

## Educational and attribution requirements

- **Historical maps are dated.** A 2010 CARICOM membership map must not be used to teach current political membership without consulting the Secretariat. The Jamaican 2025 election map does not predict future elections.
- **Population and development data are historical.** A 2013 population pyramid and 2023 HDI map must not be described as 2026 measurements.
- **Weather is not climate.** Hurricane Maria footage illustrates one extreme-weather event; it cannot, by itself, establish long-term climate trends.
- **Family illustrations are examples.** The family tree must not be presented as the only legitimate Caribbean family structure.
- **Caribbean perspective comes first.** A local migrant memorial, Jamaican cultural example and local tourism site are paired with general civics and demographic diagrams.
- **Video is never autoplayed.** The source is loaded only after the user selects **Load video**, with `preload="none"`; the video is descriptive, not a graded activity.
- **Rights are documented.** Every reference links to its exact Wikimedia Commons File page and the credited author and reuse licence. The lesson renderer provides alt text, learning questions, an accessible original-source fallback and a neutral background to protect map readability in dark mode.
- **No downloads are packaged for redistribution.** Images/videos load from Commons at the student's request/view; connection and remote-file availability remain dependencies.

## QA acceptance

Automated tests cover source and licence metadata, only valid syllabus topic IDs, dates and caveats, responsive reference components, on-demand video, broken-image fallback, jump navigation and no leakage to other subjects.

Before merging, visually confirm English map labels, image accessibility, expected sizes, media loading, focus order, navigation, tablets/phones, SPARK dark mode and video compatibility on Safari/iOS. Do not merge into `main` without explicit approval.
