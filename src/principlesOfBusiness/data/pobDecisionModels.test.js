import {startupFeasibility,reorderPoint,simpleLoan,priceChange} from "./pobDecisionModels";

describe("POB business decision models",()=>{
  test("startup contribution, revenue, break-even and profit",()=>{
    expect(startupFeasibility({unitPrice:800,unitCost:450,monthlyFixed:14000,expectedSales:60}))
      .toMatchObject({contribution:350,revenue:48000,totalCosts:41000,profit:7000,breakEvenUnits:40,viable:true});
    expect(startupFeasibility({unitPrice:300,unitCost:350,monthlyFixed:10000,expectedSales:100}))
      .toMatchObject({profit:-15000,breakEvenUnits:null,viable:false});
    expect(startupFeasibility({unitPrice:5,unitCost:3,monthlyFixed:11,expectedSales:5}))
      .toMatchObject({breakEvenUnits:6,viable:false});
  });
  test("supplier lead time and safety buffer affect the reorder trigger",()=>{
    expect(reorderPoint({averageDailyDemand:14,leadTimeDays:5,safetyStock:20,stockOnHand:80}))
      .toMatchObject({point:90,estimatedDemandDuringLeadTime:70,unitsBelowTrigger:10,reorderRecommended:true});
    expect(reorderPoint({averageDailyDemand:14,leadTimeDays:5,safetyStock:20,stockOnHand:100}))
      .toMatchObject({reorderRecommended:false,point:90});
    expect(reorderPoint({averageDailyDemand:0,leadTimeDays:3,stockOnHand:5}).daysOfStock).toBe(null);
  });
  test("simple interest uses years, not months or compound-interest formulas",()=>{
    expect(simpleLoan({principal:100000,annualRate:12,months:18})).toMatchObject({
      interest:18000,totalRepayment:118000});
    expect(simpleLoan({principal:100000,annualRate:12,months:0}).monthlyAverage).toBe(null);
  });
  test("price-change arithmetic respects original price and does not assume constant quantity in real life",()=>{
    expect(priceChange({original:350,newPrice:420,units:120}))
      .toMatchObject({difference:70,percentage:20,oldRevenue:42000,newRevenue:50400,revenueChange:8400});
    expect(priceChange({original:0,newPrice:100}).percentage).toBe(null);
    expect(priceChange({original:300,newPrice:200,units:2}).percentage).toBeCloseTo(-33.333,2);
  });
  test("illogical negative input does not produce negative quantities or borrowing",()=>{
    expect(simpleLoan({principal:-30,annualRate:-5,months:-2}).interest).toBe(0);
    expect(reorderPoint({averageDailyDemand:-2,safetyStock:-4}).point).toBe(0);
  });
});
