// 2013 Chemistry Paper 02 protein and polymer model drawings.
// All figures are native SVG. Printed figure overlay validation remains open.
const wrap=(w,h,title,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title><rect width="${w}" height="${h}" fill="#fff"/>${body}</svg>`;
export const CHEMISTRY_2013_Q3_PEPTIDE_SVG=wrap(780,210,"Figure 3. Partial protein structure",
 `<g stroke="#171717" stroke-width="2.5" fill="none">
<path d="M38 120H90M112 120H172M246 120H308M330 120H390M462 120H526M548 120H607M684 120H738"/>
<path d="M245 116V63M251 116V63M461 116V63M467 116V63M683 116V63M689 116V63"/>
<path d="M99 111V157M316 111V157M534 111V157"/>
</g>
<g fill="#ddd" stroke="#171717" stroke-width="1.5">
<rect x="174" y="99" width="69" height="41" rx="7"/><rect x="391" y="99" width="68" height="41" rx="7"/><rect x="609" y="99" width="69" height="41" rx="7"/>
</g>
<g font-family="Times New Roman,serif" font-size="25" fill="#111" text-anchor="middle">
<text x="100" y="127">N</text><text x="315" y="127">N</text><text x="534" y="127">N</text>
<text x="245" y="127">C</text><text x="462" y="127">C</text><text x="681" y="127">C</text>
<text x="245" y="48">O</text><text x="462" y="48">O</text><text x="681" y="48">O</text>
<text x="100" y="185">H</text><text x="315" y="185">H</text><text x="534" y="185">H</text>
<text x="390" y="200" font-size="16">Figure 3. Partial structure of protein</text>
</g>`);
export const CHEMISTRY_2013_Q3_MONOMERS_SVG=wrap(810,305,"Original monomers P Q R and S",
 `<g font-family="Times New Roman,serif" font-size="22" fill="#111" text-anchor="middle">
<text x="185" y="75">HO–CH₂–CH₂–OH</text><text x="185" y="105">P</text>
<text x="590" y="75">CH₃–CH=CH₂</text><text x="590" y="105">Q</text>
<text x="185" y="210">HOOC–CH₂–COOH</text><text x="185" y="240">R</text>
<text x="590" y="210">CH₂=CH–Cl</text><text x="590" y="240">S</text>
<text x="405" y="286" font-size="16">Structures of monomers P, Q, R and S</text>
</g>
<g stroke="#b1b1b1" stroke-width="1.5" stroke-dasharray="5 5">
<path d="M400 25V255M20 150H790"/>
</g>`);
export const CHEMISTRY_2013_Q3_STARCH_MODEL_SVG=wrap(790,165,"Three glucose residues linked through glycosidic bonds",
 `<g stroke="#111" stroke-width="2" fill="none">
<path d="M55 60L145 40L195 103L100 124Z"/>
<path d="M300 60L390 40L440 103L345 124Z"/>
<path d="M545 60L635 40L685 103L590 124Z"/>
<path d="M195 92H345M440 92H590"/>
</g>
<g font-family="Arial,sans-serif" font-size="24" fill="#111" text-anchor="middle">
<text x="270" y="98">O</text><text x="515" y="98">O</text>
<text x="390" y="154" font-size="15">Three glucose units joined by two –O– glycosidic linkages</text>
</g>`);
export const CHEMISTRY_2013_Q3_AMINO_ACID_MODEL_SVG=wrap(520,155,"Generic amino acid resulting from peptide hydrolysis",
 `<rect width="520" height="155" fill="#fff"/><text x="260" y="89" text-anchor="middle" font-family="Times New Roman,serif" font-size="32" fill="#111">H₂N–R–C(=O)–OH</text><text x="260" y="126" text-anchor="middle" font-family="Times New Roman,serif" font-size="16" fill="#111">Representative free amino-acid unit</text>`);
