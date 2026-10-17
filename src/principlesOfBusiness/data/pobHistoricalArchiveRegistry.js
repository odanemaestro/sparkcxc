// Canonical review-only bank registry for all 46 original archived POB PDFs.
// These are SPARK-authored answers/rubrics, not scanned question text or CXC-published schemes.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import * as source00 from "./pobHistorical2002MjP1AuthoredKey";
import * as source01 from "./pobHistorical2003MjP1AuthoredKey";
import * as source02 from "./pobHistorical2004MjP1AuthoredKey";
import * as source03 from "./pobHistorical2005MjP1AuthoredKey";
import * as source04 from "./pobHistorical2006MjP1AuthoredKey";
import * as source05 from "./pobHistorical2007MjP1AuthoredKey";
import * as source06 from "./pobHistorical2008MjP1AuthoredKey";
import * as source07 from "./pobHistorical2011MjP1AuthoredKey";
import * as source08 from "./pobHistorical2012MjP1AuthoredKey";
import * as source09 from "./pobHistorical2014MjP1AuthoredKey";
import * as source10 from "./pobHistorical2015MjP1AuthoredKey";
import * as source11 from "./pobHistorical2016MjP1AuthoredKey";
import * as source12 from "./pobHistorical2017MjP1AuthoredKey";
import * as source13 from "./pobHistorical2018MjP1AuthoredKey";
import * as source14 from "./pobHistorical2020JanP1AuthoredKey";
import * as source15 from "./pobHistorical2020MjP1AuthoredKey";
import * as source16 from "./pobHistorical2021MjP1AuthoredKey";
import * as source17 from "./pobHistorical2022JanP1AuthoredKey";
import * as source18 from "./pobHistorical2023JanP1AuthoredKey";
import * as source19 from "./pobHistorical2024MjP1AuthoredKey";
import * as source20 from "./pobHistorical2005MjP2AuthoredScheme";
import * as source21 from "./pobHistorical2006MjP2AuthoredScheme";
import * as source22 from "./pobHistorical2007MjP2AuthoredScheme";
import * as source23 from "./pobHistorical2008MjP2AuthoredScheme";
import * as source24 from "./pobHistorical2009MjP2AuthoredScheme";
import * as source25 from "./pobHistorical2010MjP2AuthoredScheme";
import * as source26 from "./pobHistorical2011MjP2AuthoredScheme";
import * as source27 from "./pobHistorical2012MjP2AuthoredScheme";
import * as source28 from "./pobHistorical2013MjP2AuthoredScheme";
import * as source29 from "./pobHistorical2014MjP2AuthoredScheme";
import * as source30 from "./pobHistorical2015MjP2AuthoredScheme";
import * as source31 from "./pobHistorical2016MjP2AuthoredScheme";
import * as source32 from "./pobHistorical2017MjP2AuthoredScheme";
import * as source33 from "./pobHistorical2018MjP2AuthoredScheme";
import * as source34 from "./pobHistorical2019JanP2AuthoredScheme";
import * as source35 from "./pobHistorical2019MjP2AuthoredScheme";
import * as source36 from "./pobHistorical2019MjAltP2AuthoredScheme";
import * as source37 from "./pobHistorical2021MjP2AuthoredScheme";
import * as source38 from "./pobHistorical2022JanP2AuthoredScheme";
import * as source39 from "./pobHistorical2022MjP2AuthoredScheme";
import * as source40 from "./pobHistorical2023JanP2AuthoredScheme";
import * as source41 from "./pobHistorical2023MjP2AuthoredScheme";
import * as source42 from "./pobHistorical2024JanP2AuthoredRubric";
import * as source43 from "./pobHistorical2024MjP2AuthoredScheme";
import * as source44 from "./pobHistorical2025JanP2AuthoredScheme";
import * as source45 from "./pobHistorical2026JanP2AuthoredScheme";

const declarations=Object.freeze([
  ["POB-P1-2002-MJ",source00],
  ["POB-P1-2003-MJ",source01],
  ["POB-P1-2004-MJ",source02],
  ["POB-P1-2005-MJ",source03],
  ["POB-P1-2006-MJ",source04],
  ["POB-P1-2007-MJ",source05],
  ["POB-P1-2008-MJ",source06],
  ["POB-P1-2011-MJ",source07],
  ["POB-P1-2012-MJ",source08],
  ["POB-P1-2014-MJ",source09],
  ["POB-P1-2015-MJ",source10],
  ["POB-P1-2016-MJ",source11],
  ["POB-P1-2017-MJ",source12],
  ["POB-P1-2018-MJ",source13],
  ["POB-P1-2020-JAN",source14],
  ["POB-P1-2020-MJ",source15],
  ["POB-P1-2021-MJ",source16],
  ["POB-P1-2022-JAN",source17],
  ["POB-P1-2023-JAN",source18],
  ["POB-P1-2024-MJ",source19],
  ["POB-P2-2005-MJ",source20],
  ["POB-P2-2006-MJ",source21],
  ["POB-P2-2007-MJ",source22],
  ["POB-P2-2008-MJ",source23],
  ["POB-P2-2009-MJ",source24],
  ["POB-P2-2010-MJ",source25],
  ["POB-P2-2011-MJ",source26],
  ["POB-P2-2012-MJ",source27],
  ["POB-P2-2013-MJ",source28],
  ["POB-P2-2014-MJ",source29],
  ["POB-P2-2015-MJ",source30],
  ["POB-P2-2016-MJ",source31],
  ["POB-P2-2017-MJ",source32],
  ["POB-P2-2018-MJ",source33],
  ["POB-P2-2019-JAN",source34],
  ["POB-P2-2019-MJ",source35],
  ["POB-P2-2019-MJ-ALT",source36],
  ["POB-P2-2021-MJ",source37],
  ["POB-P2-2022-JAN",source38],
  ["POB-P2-2022-MJ",source39],
  ["POB-P2-2023-JAN",source40],
  ["POB-P2-2023-MJ",source41],
  ["POB-P2-2024-JAN",source42],
  ["POB-P2-2024-MJ",source43],
  ["POB-P2-2025-JAN",source44],
  ["POB-P2-2026-JAN",source45],
]);
export const POB_HISTORICAL_REVIEW_BANKS=Object.freeze(declarations.map(([id,module])=>{
 const source=POB_SUPPLIED_ARCHIVE.find(row=>row.id===id);
 if(!source)throw new Error("Unknown archived POB source "+id);
 const bank=Object.values(module).find(value=>value&&typeof value==="object"&&value.id===id&&
   (Array.isArray(value.questions)||Array.isArray(value.entries)));
 if(!bank)throw new Error("Authored POB material not found for "+id);
 if(bank.sourceSha256!==source.sourceSha256)throw new Error("Historical source checksum mismatch "+id);
 return Object.freeze({id,source,bank,paper:source.paper,
  historical:true,sourceWordingTranscribed:id==="POB-P2-2026-JAN"||id==="POB-P2-2024-JAN",
  label:source.year+" "+(source.sitting==="JAN"?"January":"May/June")+
    " · Paper "+source.paper+(source.reclassifiedFromPaper1?" · reclassified":"")
 });
}));
export function getPobHistoricalReviewBank(id){return POB_HISTORICAL_REVIEW_BANKS.find(p=>p.id===id)||null;}
