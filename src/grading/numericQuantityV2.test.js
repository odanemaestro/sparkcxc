import {parseGradingQuantity,compareGradingQuantity} from "./numericQuantityV2";
test("converts compatible metric units",()=>{
 expect(compareGradingQuantity({response:"120 cm",expected:1.2,unit:"m",tolerance:0}).status).toBe("match");
});
test("dimension mismatch stays unresolved",()=>{
 expect(compareGradingQuantity({response:"1.2 kg",expected:1.2,unit:"m"}).status).toBe("unresolved");
});
test("unrecognized units and expressions stay unresolved",()=>{
 expect(parseGradingQuantity("12 apples")).toBeNull();
 expect(parseGradingQuantity("12/2")).toBeNull();
});
test("units must be present for required-unit answers",()=>{
 expect(compareGradingQuantity({response:"12",expected:12,unit:"cm"}).reason).toBe("missing-unit");
});
test("supports scientific notation and negative values",()=>{
 expect(compareGradingQuantity({response:"-1.2e2 cm",expected:-1.2,unit:"m"}).status).toBe("match");
});
