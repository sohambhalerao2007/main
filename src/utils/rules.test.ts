import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDynamicPrice,
  assessSurplusRisk,
  calculateRoiSalvage,
  calculatePyrAdjustment
} from './rules.ts';

test('calculateDynamicPrice applies appropriate markdown tiers based on hours left', () => {
  // Fresh (> 6 hours) -> 100%
  assert.equal(calculateDynamicPrice(100, 8, 2), 100);

  // Moderate (5-6 hours) -> 85%
  assert.equal(calculateDynamicPrice(100, 5, 2), 85);

  // Urgent (3-4 hours) -> 75%
  assert.equal(calculateDynamicPrice(100, 3, 2), 75);

  // Critical (<= 2 hours) -> 60%
  assert.equal(calculateDynamicPrice(100, 2, 2), 60);

  // High surplus bonus incentive
  assert.equal(calculateDynamicPrice(100, 4, 10), 70); // 75% - 5% = 70%
});

test('assessSurplusRisk categorizes risk level reliably', () => {
  // Safe: 0 remaining
  const safe = assessSurplusRisk(20, 20, 2);
  assert.equal(safe.riskLevel, 'safe');
  assert.equal(safe.remaining, 0);

  // Critical: unsold items with 1 hour left
  const critical = assessSurplusRisk(20, 15, 1);
  assert.equal(critical.riskLevel, 'critical');
  assert.equal(critical.remaining, 5);

  // High: heavy surplus with 3 hours left
  const high = assessSurplusRisk(30, 10, 3);
  assert.equal(high.riskLevel, 'high');
});

test('calculateRoiSalvage outputs accurate rupees and ROI multiplier', () => {
  // Monthly turnover ₹1,00,000, 10% waste, Basic Plan ₹250
  const result = calculateRoiSalvage(100000, 10, 250, 70);
  assert.equal(result.monthlyWastedRupees, 10000);
  assert.equal(result.monthlySalvagedRupees, 7000);
  assert.equal(result.netMonthlyGain, 6750);
  assert.equal(result.roiMultiplier, 28);
});

test('calculatePyrAdjustment computes weather and festive boosts', () => {
  const rain = calculatePyrAdjustment(100, 'heavy rainstorm');
  assert.equal(rain.adjustedDemand, 75);
  assert.equal(rain.percentChange, -25);

  const festival = calculatePyrAdjustment(100, 'Diwali festive week');
  assert.equal(festival.adjustedDemand, 140);
  assert.equal(festival.percentChange, 40);
});
