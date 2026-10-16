/** Transparent, classroom-scale POB calculations. Values are illustrative, not advice. */
const nonnegative = value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;

export function startupFeasibility({unitPrice=0,unitCost=0,monthlyFixed=0,expectedSales=0}={}) {
  const p=nonnegative(unitPrice),v=nonnegative(unitCost),f=nonnegative(monthlyFixed),q=nonnegative(expectedSales);
  const contribution=p-v,revenue=p*q,totalVariable=v*q,totalCosts=f+totalVariable,profit=revenue-totalCosts;
  const breakEvenUnits=contribution>0?Math.ceil(f/contribution):null;
  const viable=contribution>0&&q>=breakEvenUnits;
  return {contribution,revenue,totalVariable,totalCosts,profit,breakEvenUnits,viable,
    marginPercent:p>0?contribution/p*100:null};
}

export function reorderPoint({averageDailyDemand=0,leadTimeDays=0,safetyStock=0,stockOnHand=0}={}) {
  const d=nonnegative(averageDailyDemand),l=nonnegative(leadTimeDays),s=nonnegative(safetyStock),onHand=nonnegative(stockOnHand);
  const point=Math.ceil(d*l+s);
  return {point,estimatedDemandDuringLeadTime:d*l,unitsBelowTrigger:Math.max(0,point-onHand),
    reorderRecommended:onHand<=point,
    daysOfStock:d>0?onHand/d:null};
}

export function simpleLoan({principal=0,annualRate=0,months=0}={}) {
  const p=nonnegative(principal),r=nonnegative(annualRate),m=nonnegative(months);
  const interest=p*(r/100)*(m/12);
  return {interest,totalRepayment:p+interest,monthlyAverage:m>0?(p+interest)/m:null};
}

export function priceChange({original=0,newPrice=0,units=0}={}) {
  const old=nonnegative(original),now=nonnegative(newPrice),q=nonnegative(units);
  return {difference:now-old,percentage:old>0?(now-old)/old*100:null,
    newRevenue:now*q,oldRevenue:old*q,revenueChange:(now-old)*q};
}
