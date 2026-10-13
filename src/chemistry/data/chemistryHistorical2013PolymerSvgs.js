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
export const CHEMISTRY_2013_Q3_STARCH_MODEL_SVG=wrap(790,190,"Schematic chain of three glucose residues linked by two alpha-1,4 glycosidic bonds, not a displayed molecular structure",
 `<g stroke="#111" stroke-width="2" fill="none">
<rect x="45" y="48" width="155" height="70" rx="8"/>
<rect x="295" y="48" width="155" height="70" rx="8"/>
<rect x="545" y="48" width="155" height="70" rx="8"/>
<path d="M200 83H237M257 83H295M450 83H487M507 83H545"/>
</g>
<g font-family="Arial,sans-serif" font-size="24" fill="#111" text-anchor="middle">
<text x="122" y="88" font-size="19">Glucose residue</text><text x="372" y="88" font-size="19">Glucose residue</text><text x="622" y="88" font-size="19">Glucose residue</text>
<text x="247" y="90">O</text><text x="497" y="90">O</text>
<text x="390" y="155" font-size="15">Two α(1→4) glycosidic linkages in a linear starch segment</text>
<text x="390" y="178" font-size="15">Boxes represent residues, not four-membered glucose rings</text>
</g>`);
export const CHEMISTRY_2013_Q3_AMINO_ACID_MODEL_SVG=wrap(520,155,"Generic amino acid resulting from peptide hydrolysis",
 `<rect width="520" height="155" fill="#fff"/><text x="260" y="89" text-anchor="middle" font-family="Times New Roman,serif" font-size="29" fill="#111">H₂N–CH(R)–C(=O)–OH</text><text x="260" y="126" text-anchor="middle" font-family="Times New Roman,serif" font-size="16" fill="#111">Generic α-amino acid; R is the side chain</text>`);
