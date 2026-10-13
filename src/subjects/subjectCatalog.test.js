import {
  catalogRowFromSubject,
  mergeSubjectCatalog,
  normalizeCatalogSubject,
  publicCatalogSubjects,
  runtimeSubjectCatalog,
  subjectIdFromValue,
} from "./subjectCatalog";

describe("SPARK Dynamic Subject Catalog V1", () => {
  test("normalizes stable subject ids", () => {
    expect(subjectIdFromValue("  CSEC Chemistry ")).toBe("csec-chemistry");
    expect(subjectIdFromValue("Information Technology")).toBe("information-technology");
  });

  test("merges database metadata over a built-in implementation", () => {
    const result = mergeSubjectCatalog(
      [{ id:"physics", name:"CSEC Physics", enabled:false, capabilities:{study:true, progress:true}, routes:{study:"/study/physics"} }],
      [{ id:"physics", name:"CSEC Physics", enabled:true, status:"live", sort_order:2, capabilities:{paper1:true} }]
    );
    expect(result).toHaveLength(1);
    expect(result[0].enabled).toBe(true);
    expect(result[0].capabilities.study).toBe(true);
    expect(result[0].capabilities.paper1).toBe(true);
    expect(result[0].routes.study).toBe("/study/physics");
  });

  test("keeps Chemistry flashcards visible when a stale Supabase catalog says they are disabled", () => {
    const builtin={
      id:"chemistry",name:"CSEC Chemistry",enabled:true,status:"live",implementation:"generic",
      capabilities:{study:true,practice:true,flashcards:true,paper1:true,paper2:true,progress:true},
      routes:{study:"/study/chemistry",practice:"/practice/chemistry",
        flashcards:"/dashboard/flashcards/chemistry",progress:"/dashboard/progress"},
    };
    const stale={
      id:"chemistry",enabled:true,status:"live",
      capabilities:{flashcards:false,paper1:false,study:true},
      routes:{flashcards:null,paper1:"/practice/chemistry"},
    };
    const [merged]=runtimeSubjectCatalog([builtin],[stale],{catalogAvailable:true});
    expect(merged.capabilities.flashcards).toBe(true);
    expect(merged.capabilities.paper1).toBe(true);
    expect(merged.routes.flashcards).toBe("/dashboard/flashcards/chemistry");
    expect(merged.enabled).toBe(true);
    // Other subjects' catalog permissions remain authoritative.
    const [other]=mergeSubjectCatalog([{...builtin,id:"future",name:"Future",routes:{flashcards:"/future"},capabilities:{flashcards:true}}],[{id:"future",capabilities:{flashcards:false}}]);
    expect(other.capabilities.flashcards).toBe(false);
  });

  test("discovers a future database-only subject", () => {
    const result = mergeSubjectCatalog([], [{
      id:"chemistry",
      name:"CSEC Chemistry",
      short_name:"Chemistry",
      status:"draft",
      capabilities:{progress:true},
    }]);
    expect(result[0].id).toBe("chemistry");
    expect(result[0].implementation).toBe("generic");
  });

  test("public catalog only exposes enabled live subjects", () => {
    const rows = [
      normalizeCatalogSubject({id:"math",name:"Math",status:"live",enabled:true}),
      normalizeCatalogSubject({id:"chem",name:"Chem",status:"draft",enabled:true}),
      normalizeCatalogSubject({id:"bio",name:"Bio",status:"live",enabled:false}),
    ];
    expect(publicCatalogSubjects(rows).map(item => item.id)).toEqual(["math"]);
  });

  test("runtime catalog uses the public database list as learner discovery authority", () => {
    const base = [
      {id:"mathematics",name:"Math",enabled:true,status:"live",capabilities:{progress:true}},
      {id:"physics",name:"Physics",enabled:true,status:"live",capabilities:{progress:true}},
    ];
    const published = [
      {id:"mathematics",name:"Math",enabled:true,status:"live",sort_order:10,capabilities:{progress:true}},
      {id:"chemistry",name:"Chemistry",enabled:true,status:"live",sort_order:40,capabilities:{study:true,progress:true},routes:{study:"/study/chemistry"}},
    ];

    expect(runtimeSubjectCatalog(base, published, {catalogAvailable:true}).map(item => item.id))
      .toEqual(["mathematics","chemistry"]);

    expect(runtimeSubjectCatalog(base, [], {catalogAvailable:false}).map(item => item.id))
      .toEqual(["mathematics","physics"]);
  });

  test("serializes subject manifests for the secure sync RPC", () => {
    const row = catalogRowFromSubject({
      id:"chemistry",
      name:"CSEC Chemistry",
      shortName:"Chemistry",
      enabled:true,
      status:"draft",
      capabilities:{study:true,progress:true},
      routes:{study:"/study/chemistry"},
    });
    expect(row.id).toBe("chemistry");
    expect(row.short_name).toBe("Chemistry");
    expect(row.capabilities.study).toBe(true);
    expect(row.routes.study).toBe("/study/chemistry");
  });
});