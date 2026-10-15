# Physics and Information Technology Visual Reference Audit
**Date:** 15 October 2026
**Base:** main after Social Studies visual PR #65 merge

## Policy
The purpose of external media is to add educational examples **only when SPARK's existing simulations and tools do not already explain the idea sufficiently**. These images and video are reference materials; they are not original CSEC past-paper diagrams, interactive practicals, marking schemes or assessment criteria. Third-party illustrations are displayed with source, author and reuse licence links. Internet access is required for remote Wikimedia Commons files; unavailable media falls back to the original file page.

## Physics: seven topics, eight resources
| Topic | Image/video | Reason |
| --- | --- | --- |
| A1 Scientific Method and Measurement | Simple pendulum SVG (public domain) and 5-second gravity-pendulum video (CC BY-SA 4.0) | See experimental setup and real motion; no timing measurement implied by animation |
| B4 Transfer of Thermal Energy | Heat Diagram.PNG (CC BY-SA 3.0) | Distinguish conduction, convection and induction; **not a full radiation comparison** |
| C3 Electromagnetic Waves | The electromagnetic spectrum.svg (NIH, US public domain) | Compare frequency, wavelength and wavebands |
| C5 Lenses | Convex lens diagram.svg (CC0) | Identify the optical axis and convex lens before the existing ray-tracing simulator |
| D4 Circuits and Components | Series and parallel circuits.svg (CC BY-SA 3.0) | Compare current path and potential difference in series and parallel |
| D7 Electromagnetism | Ideal transformer.svg (CC0) | Examine primary and secondary circuit and idealised transformer behaviour |
| E3 Radioactivity | Activity decay.svg (public domain) | Read a graphical model of radioactive decay; individual decays are random |

## IT: four topics, four resources
| Topic | Image | Reason |
| --- | --- | --- |
| 2 Hardware Components | Motherboard diagram.svg (CC BY-SA 3.0) | Historical late-2000s motherboard architecture, not a modern chipset |
| 8 Network Components | NetworkTopologies.svg (public domain) | Recognise mesh, bus, ring, star and other network topologies |
| 19 Database Fundamentals | Relational DB Example ER Diagram Corporation.svg (public domain) | Parent-child relationship alongside SPARK Database Studio |
| 23 Flowcharts & Pseudocode | FlowchartExample.png (public domain) | Trace a factorial algorithm before doing the programming exercise |

## Design and learning safeguards
- External visuals are added only inside Physics study pages and IT's **See it** content. Every existing simulation, study note, lab, paper, marking scheme and progress behaviour is preserved.
- Diagram text is not recoloured in dark mode: images have a neutral white background. Containers use course colours and responsive stacking.
- Each entry includes specific CSEC-oriented observation questions and accurate caveats, plus author, Commons file page and licence.
- A video is opt-in, `preload="none"`, never autoplayed and cannot award marks.
- There is graceful failure if an external image cannot load.
- No external image files are copied into the repository.

## Excluded
More illustrative images of generic spreadsheets, Word screens, processors, classroom activities or stock labs were excluded. The existing SPARK interactive Office, network, algorithm, optics, electricity and mechanics laboratories already teach those concepts more effectively than a static screenshot. A few unavailable or ambiguous licence sources were not included.

## QA
Automated: registry content, mapping against Physics and IT topic catalogues, licensing metadata, image fallback, keyboard links, student-controlled video, cross-subject isolation and preserving interactive tools. Manual browser acceptance remains necessary for mobile, tablet, dark mode and live Wikimedia Commons loading. **Do not merge without explicit user approval.**
