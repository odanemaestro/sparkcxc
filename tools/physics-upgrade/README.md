# Physics study and practical upgrade validator

Run:

```text
npm run audit:physics-upgrade
```

The validator checks the combined Physics study and lab upgrade without requiring the React build toolchain. It verifies topic coverage, required study fields, practical structure, interactive mappings, graph table keys, five-section lab coverage, the five audit-priority practicals and the specific latent heat simulator.

A passing validator does not replace the full Jest regression suite or production build. Run those before deployment.
