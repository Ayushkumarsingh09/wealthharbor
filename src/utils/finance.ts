export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${formatNumber(value, decimals)}%`;
}

export function compoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear = 12
): number {
  const r = annualRate / 100 / compoundsPerYear;
  const n = compoundsPerYear * years;
  return principal * Math.pow(1 + r, n);
}

export function sipFutureValue(
  monthlyInvestment: number,
  annualRate: number,
  years: number
): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthlyInvestment * n;
  return monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

export function emiCalculation(
  principal: number,
  annualRate: number,
  tenureMonths: number
): number {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / tenureMonths;
  return (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
}

export function cagr(beginningValue: number, endingValue: number, years: number): number {
  if (beginningValue <= 0 || years <= 0) return 0;
  return (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
}

export function futureValue(presentValue: number, annualRate: number, years: number): number {
  return presentValue * Math.pow(1 + annualRate / 100, years);
}

export function presentValue(futureValue: number, annualRate: number, years: number): number {
  return futureValue / Math.pow(1 + annualRate / 100, years);
}

export function inflationAdjusted(
  presentValue: number,
  inflationRate: number,
  years: number
): number {
  return presentValue * Math.pow(1 + inflationRate / 100, years);
}

export function positionSize(
  accountSize: number,
  riskPercent: number,
  entryPrice: number,
  stopLoss: number
): number {
  const riskAmount = accountSize * (riskPercent / 100);
  const riskPerShare = Math.abs(entryPrice - stopLoss);
  if (riskPerShare === 0) return 0;
  return Math.floor(riskAmount / riskPerShare);
}

export function riskRewardRatio(
  entry: number,
  target: number,
  stopLoss: number
): number {
  const reward = Math.abs(target - entry);
  const risk = Math.abs(entry - stopLoss);
  if (risk === 0) return 0;
  return reward / risk;
}

export function optionsProfit(
  type: 'call' | 'put',
  strike: number,
  premium: number,
  stockPrice: number,
  contracts = 1
): number {
  const multiplier = 100 * contracts;
  if (type === 'call') {
    return (Math.max(0, stockPrice - strike) - premium) * multiplier;
  }
  return (Math.max(0, strike - stockPrice) - premium) * multiplier;
}

export function simpleInterest(
  principal: number,
  annualRate: number,
  years: number
): number {
  return principal * (1 + (annualRate / 100) * years);
}

export function totalLoanInterest(
  principal: number,
  annualRate: number,
  tenureMonths: number
): number {
  const emi = emiCalculation(principal, annualRate, tenureMonths);
  return emi * tenureMonths - principal;
}

export function mortgagePayment(
  principal: number,
  annualRate: number,
  tenureYears: number,
  propertyTaxAnnual = 0,
  insuranceAnnual = 0
): { principalInterest: number; totalMonthly: number; escrowMonthly: number } {
  const principalInterest = emiCalculation(principal, annualRate, tenureYears * 12);
  const escrowMonthly = (propertyTaxAnnual + insuranceAnnual) / 12;
  return {
    principalInterest,
    totalMonthly: principalInterest + escrowMonthly,
    escrowMonthly,
  };
}

export function retirementCorpus(
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  yearsToRetirement: number
): { total: number; fromSavings: number; fromContributions: number } {
  const fromSavings = futureValue(currentSavings, annualReturn, yearsToRetirement);
  const fromContributions = sipFutureValue(monthlyContribution, annualReturn, yearsToRetirement);
  return {
    total: fromSavings + fromContributions,
    fromSavings,
    fromContributions,
  };
}

export function swpDuration(
  corpus: number,
  monthlyWithdrawal: number,
  annualReturn: number
): { months: number; years: number; finalBalance: number } {
  if (monthlyWithdrawal <= 0) {
    return { months: 0, years: 0, finalBalance: corpus };
  }
  const r = annualReturn / 100 / 12;
  let balance = corpus;
  let months = 0;
  const maxMonths = 1200;

  while (balance > monthlyWithdrawal && months < maxMonths) {
    balance = balance * (1 + r) - monthlyWithdrawal;
    months++;
  }

  return {
    months,
    years: months / 12,
    finalBalance: Math.max(0, balance),
  };
}

export function marginBuyingPower(
  equity: number,
  marginRequirementPercent: number
): { buyingPower: number; leverage: number } {
  if (marginRequirementPercent <= 0) return { buyingPower: 0, leverage: 0 };
  const buyingPower = equity / (marginRequirementPercent / 100);
  return { buyingPower, leverage: buyingPower / equity };
}

export function breakEvenUnits(
  fixedCosts: number,
  pricePerUnit: number,
  variableCostPerUnit: number
): number {
  const contribution = pricePerUnit - variableCostPerUnit;
  if (contribution <= 0) return 0;
  return fixedCosts / contribution;
}

export function investmentBreakEven(
  shares: number,
  purchasePrice: number,
  fees = 0
): number {
  if (shares <= 0) return 0;
  return (shares * purchasePrice + fees) / shares;
}

export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  tenureMonths: number
): Array<{ month: number; payment: number; principal: number; interest: number; balance: number }> {
  const emi = emiCalculation(principal, annualRate, tenureMonths);
  const r = annualRate / 100 / 12;
  let balance = principal;
  const schedule = [];

  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      month,
      payment: emi,
      principal: principalPaid,
      interest,
      balance,
    });
  }

  return schedule;
}
