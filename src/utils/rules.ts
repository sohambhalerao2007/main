/**
 * Pure business logic for 4OURSIGHT B2B Surplus Intelligence
 * Decoupled for deterministic unit testing with node:test
 */

export interface InventoryItemLogic {
  id: number;
  name: string;
  stock: number;
  sold: number;
  price: number;
  expiryHours: number;
  category: string;
}

/**
 * Calculates dynamic clearance price based on remaining expiry hours and surplus volume.
 * Rules:
 * - <= 2 hours to expiry: 40% discount (60% of base)
 * - <= 4 hours to expiry: 25% discount (75% of base)
 * - <= 6 hours to expiry: 15% discount (85% of base)
 * - Otherwise: base price
 */
export function calculateDynamicPrice(basePrice: number, expiryHours: number, surplusUnits: number = 0): number {
  if (basePrice <= 0) return 0;
  
  let multiplier = 1.0;
  if (expiryHours <= 2) {
    multiplier = 0.60;
  } else if (expiryHours <= 4) {
    multiplier = 0.75;
  } else if (expiryHours <= 6) {
    multiplier = 0.85;
  }

  // If heavy surplus (> 8 units remaining at afternoon), add an extra 5% incentive
  if (surplusUnits >= 8 && expiryHours <= 6) {
    multiplier = Math.max(0.50, multiplier - 0.05);
  }

  return Math.round(basePrice * multiplier);
}

/**
 * Assesses surplus risk status
 */
export function assessSurplusRisk(stock: number, sold: number, expiryHours: number): {
  remaining: number;
  surplusUnits: number;
  riskLevel: 'safe' | 'moderate' | 'high' | 'critical';
} {
  const remaining = Math.max(0, stock - sold);
  // Expected sales buffer based on time left
  const expectedSalePerHour = 1.5;
  const projectedSold = Math.round(expiryHours * expectedSalePerHour);
  const surplusUnits = Math.max(0, remaining - projectedSold);

  let riskLevel: 'safe' | 'moderate' | 'high' | 'critical' = 'safe';
  if (remaining === 0) {
    riskLevel = 'safe';
  } else if (expiryHours <= 2 && remaining > 0) {
    riskLevel = 'critical';
  } else if (expiryHours <= 4 && surplusUnits > 3) {
    riskLevel = 'high';
  } else if (surplusUnits > 0) {
    riskLevel = 'moderate';
  }

  return { remaining, surplusUnits, riskLevel };
}

/**
 * Calculates monthly net salvage and ROI on 4OURSIGHT subscription
 */
export function calculateRoiSalvage(
  monthlyRevenue: number,
  wastePercent: number,
  planMonthlyFee: number,
  recoveryRatePercent: number = 70
): {
  monthlyWastedRupees: number;
  monthlySalvagedRupees: number;
  netMonthlyGain: number;
  roiMultiplier: number;
} {
  const safeRevenue = Math.max(0, monthlyRevenue);
  const safeWaste = Math.max(0, Math.min(100, wastePercent));
  const monthlyWastedRupees = Math.round((safeRevenue * safeWaste) / 100);
  const monthlySalvagedRupees = Math.round((monthlyWastedRupees * recoveryRatePercent) / 100);
  const netMonthlyGain = Math.max(0, monthlySalvagedRupees - planMonthlyFee);
  const roiMultiplier = planMonthlyFee > 0 ? Number((monthlySalvagedRupees / planMonthlyFee).toFixed(1)) : 0;

  return {
    monthlyWastedRupees,
    monthlySalvagedRupees,
    netMonthlyGain,
    roiMultiplier
  };
}

/**
 * Calculates weather and festive PYR adjustments
 */
export function calculatePyrAdjustment(baseDemand: number, condition: string): {
  adjustedDemand: number;
  percentChange: number;
  rationale: string;
} {
  const condLower = (condition || '').toLowerCase();
  let factor = 1.0;
  let rationale = "Standard seasonal baseline based on past year historical velocity.";

  if (condLower.includes('rain') || condLower.includes('storm')) {
    factor = 0.75;
    rationale = "Unseasonal rain decreases walk-in foot traffic by ~25%. Trim morning bake.";
  } else if (condLower.includes('festival') || condLower.includes('diwali') || condLower.includes('eid') || condLower.includes('christmas')) {
    factor = 1.40;
    rationale = "Festive surge elevates gifting and confectionery demand by ~40%. Increase morning prep.";
  } else if (condLower.includes('weekend') || condLower.includes('sunday')) {
    factor = 1.25;
    rationale = "Weekend leisure breakfast & brunch volume increases pastry sales by ~25%.";
  } else if (condLower.includes('heat') || condLower.includes('summer')) {
    factor = 0.85;
    rationale = "Midday heat wave dampens afternoon walk-ins; shift volume to early evening bundles.";
  }

  const adjustedDemand = Math.round(baseDemand * factor);
  const percentChange = Math.round((factor - 1.0) * 100);

  return { adjustedDemand, percentChange, rationale };
}
