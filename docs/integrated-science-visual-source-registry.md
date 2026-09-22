# Integrated Science visual source registry

This branch replaces custom placeholder-style scientific drawings with supplied images or reusable scientific references. SPARK interaction (drag/drop, tap targets, hints, scoring, zoom/reveal where applicable) is layered over the real reference image.

## Current priority replacements

| SPARK template / visual | Reference source | Licence / status | Notes |
| --- | --- | --- | --- |
| plant-cell | Wikimedia Commons: Plant cell structure no text | Public domain | Real reference-backed cell structure used beneath SPARK targets |
| animal-cell | Wikimedia Commons: Animal cell structure no text | Public domain | Real reference-backed cell structure used beneath SPARK targets |
| light-microscope | Wikimedia Commons: Compound Microscope.JPG by Acagastya | CC0 1.0 | Real microscope photograph; SPARK provides the labels/targets |
| female-reproductive-system | Wikimedia Commons: Female reproductive organs, frontal view, unlabeled.svg by RWhitwam | CC BY-SA 4.0 | Shows ovary, oviduct, uterus, cervix, vagina and uterine layers including endometrium |
| male-reproductive-system | Wikimedia Commons: Male reproductive frontal without labels.svg by T. Kebert | CC BY-SA 4.0 | Fully unlabeled frontal anatomy with SPARK targets overlaid |
| pregnancy-uterus | Wikimedia Commons: Gray38.png, Gray's Anatomy plate by Henry Vandyke Carter | Public domain | Unlabeled fetus-in-utero anatomical plate with SPARK overlay targets |

## Replacement policy

1. Prefer user-supplied images when they are scientifically suitable.
2. Otherwise prefer a reusable scientific image or diagram from Wikimedia Commons, NIH, CDC, OpenStax or a similarly reputable source.
3. Do not redraw a scientific structure merely to match SPARK's visual style.
4. Keep interactive behaviour separate from the underlying image:
   - desktop drag-and-drop labels
   - phone/tablet tap label then tap target
   - hints
   - answer checking
   - completed-state labels
   - zoom/reveal where useful
5. Every externally sourced visual must keep its source and licence information in the repository and, where practical, beside the activity.
6. When a CC BY-SA visual is adapted, preserve attribution and compatible licensing for that derivative asset.
7. Custom SVG remains acceptable only where a suitable reference does not exist or where the task itself is abstract (for example a force-vector model), and it must be grounded in a scientific reference.

## Rollback point

The prior technically green package is preserved on:

`integrated-science-final-package`

The active visual replacement branch is:

`integrated-science-visual-replacement-pass`
