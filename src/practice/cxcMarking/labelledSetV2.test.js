import {check} from "./checkers";

test("profit at three labelled graph vertices counts only output values",()=>{
 const spec={type:"set",value:[150,180,160],tolerance:0.000001};
 expect(check("(0, 30): $150; (10, 20): $180; (20, 0): $160",spec).ok).toBe(true);
 expect(check("$150, $180, $160",spec).ok).toBe(true);
 expect(check("(0, 30): $150; (10, 20): $181; (20, 0): $160",spec).ok).toBe(false);
 expect(check("(0, 30): $150; (10, 20): $180; (20, 0): $160; (1, 1): $999",spec).ok).toBe(false);
 expect(check("The values are 150, 180, 160, and 999",spec).ok).toBe(false);
});

test("labelled profit set preserves all-or-nothing membership",()=>{
 const spec={type:"set",value:[168,192,180],tolerance:0.000001};
 expect(check("(0, 24): $168; (12, 12): $192; (20, 0): $180",spec).ok).toBe(true);
 expect(check("(0, 24): $168; (12, 12): $192; (20, 0): $195",spec).ok).toBe(false);
 expect(check("(0, 24): $168 or $180; (12, 12): $192; (20, 0): $180",spec).ok).toBe(false);
});
