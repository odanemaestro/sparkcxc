# SPARK FNH · Online media research and placement audit

Date: 15 October 2026

## Scope and decision

The CSEC Food, Nutrition and Health Study course has **25 study topics** (seven syllabus sections). A cross-topic search of Wikimedia Commons, USDA, CDC, FDA, NIH and FAO resources found **23 suitable learning-media references across 18 topics**, including **2 student-controlled videos**. The remaining seven topics retain their existing text, examples and exercises because the available images were weak, repetitive, inaccurate, unsuitable for Jamaica, or their licensing was unclear.

No past paper diagrams were replaced and no teaching note, learning objective, interactive laboratory, examiner marking behaviour, or student progress record was altered.

## Accepted media by topic

| Study topic | Reference(s) | Learning goal |
| --- | --- | --- |
| Diet basics | USDA MyPlate icon | Compare a food-group plate with Caribbean six-food-group guidance |
| Food choices and life cycle | USDA preschool food-group example | Understand differing eating needs across life stages |
| Community food security | FAO 2021 regional food cost graph | Distinguish availability from affordability |
| Nutrient foundations | USDA grains/legumes/vegetable/fruit/dairy meal | Identify nutrient sources in a meal |
| Vitamins and minerals | Jamaican callaloo meal photo | Discuss local food variety and micronutrient sources |
| Water, digestion and evidence | LadyofHats digestive anatomy SVG | Trace food from mouth to small intestine |
| Multi-mix meal planning | USDA fish, grains, corn/beans and oranges meal | Identify food-group choices and adapt to a Caribbean menu |
| Vegetarian menus | Jamaican rice and peas photograph | Discuss a plant-based starting point, not a complete diet by itself |
| Food spoilage | NIAID bread-mould illustration | Recognise a mould as a fungus; not a real-food photograph |
| Microbes and food safety | Salmonella micrograph, bacterial growth graph, USDA cross-contamination video | Distinguish bacterial identity, multiplication and contamination pathways |
| Preservation and additives | Food dehydrator photograph | Connect water removal to food preservation |
| Cooking heat and raising agents | Conduction/convection/induction illustration | Compare routes of heating |
| Kitchen design | Kitchen work triangle | Analyse the flow between storage, sink and cooking area |
| Equipment | Kitchen tools and measuring cups photographs | Identify appropriate use, units and care |
| Food labels and claims | 2016 US FDA label | Read serving size and nutrients; explain that Jamaica may use different labelling rules |
| Hygiene and cooking | HACCP principles and CDC handwashing demonstration | Hazard controls and practical hygiene |
| Preparation and service | Formal and basic table settings | Compare service for different occasions |
| Caribbean food culture | Ackee and saltfish; Jamaican breakfast with callaloo | Discuss authentic foods in nutritional and cultural context |

## Important educational distinctions

- **Caribbean priority:** US MyPlate and FDA teaching media are not represented as Caribbean food-group rules, Jamaican law, or individual dietary advice. The captions explicitly identify them as comparisons.
- **No false scientific precision:** A bacterial growth curve is a general microbiology model, not a safe food shelf-life chart. Bread mould is a scientific illustration, not food-safety assessment. The food dehydrator photograph is not an instruction to use any single time or temperature for all foods.
- **Video controls:** Videos never autoplay, use `preload="none"`, and are inserted only after students select **Load video**. Students may follow the original source link instead.
- **Accessibility:** Useful alt text, captions, explicit learning prompts, clickable source and licence links, and graceful image-failure fallback.
- **Dark mode:** Illustrations retain their original scientific colours inside a neutral image canvas.
- **Network dependency:** Files are referenced from Wikimedia Commons instead of copied to the repository. Offline access is not guaranteed.

## Licensing approach

Each entry in `fnhReferenceMedia.js` records the original Wikimedia Commons file page, credited author, reuse licence, licence URL, and learning purpose. Included terms are CC0 1.0, CC BY 2.0/3.0/4.0, CC BY-SA 3.0/4.0, and public-domain US government works. Every image and video is credited alongside its display.

File-specific licensing may change if the source file is deleted or replaced; before any future redistribution as offline bundles, recheck the corresponding source page. This project does not claim ownership of third-party visual media.

## Topics deliberately left without external media

- `budget-packed-dining`: Existing budget planner is more directly useful than generic lunch images.
- `efficiency-sinks`: Without a correctly dimensioned floor plan and context, photographs risk implying one ideal kitchen.
- `kitchen-first-aid`: Medical diagrams require up-to-date reviewed advice; not added speculatively.
- `consumer-rights`: Generic stock photos do not help students apply local consumer law.
- `shops-budgets`: Price data changes and could be misread as current Jamaican prices.
- `selection-storage`: Broad storage images do not convey food-specific safety limits accurately.
- `beverages-evaluation`: Drink photos alone do not meaningfully strengthen the assessment.

## Review gates

- Automated tests: media file metadata, unique asset references, topic alignment, video opt-in, image error fallback, source attribution, preservation of original study text and subject isolation.
- Manual browser review pending: asset loading in SPARK deployment, correct labels and US/Caribbean distinctions, mobile/tablet widths, dark/light themes, and video playback in Safari.
- Merge must be explicit; source branch remains separate from `main`.
