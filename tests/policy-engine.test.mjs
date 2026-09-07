import test from "node:test";
import assert from "node:assert/strict";
import { assess } from "../src/policy-engine.js";

const baseline = {
  name: "Internal productivity assistant",
  purpose: "Helps staff draft internal notes.",
  domain: "general",
  autonomy: "assistive",
  impact: "low",
  audience: "internal",
  personalData: false,
  sensitiveData: false,
  generativeAI: true,
  humanApproval: true,
  auditLogging: true,
  monitoring: true,
  vendorAssessed: true,
  aiDisclosure: true
};

test("low-impact governed use case remains low risk", () => {
  const report = assess(baseline);
  assert.ok(report.result.riskScore < 15);
  assert.equal(report.result.blockerCount, 0);
});

test("high-impact autonomous action without human approval blocks deployment", () => {
  const report = assess({
    ...baseline,
    name: "Autonomous credit decision",
    domain: "financial",
    autonomy: "autonomous",
    impact: "high",
    humanApproval: false,
    personalData: true
  });
  assert.equal(report.result.posture, "DO NOT DEPLOY");
  assert.ok(report.triggeredPolicies.some((p) => p.id === "HITL-001"));
});

test("employment screening triggers enhanced domain safeguards", () => {
  const report = assess({
    ...baseline,
    domain: "employment",
    impact: "high",
    personalData: true
  });
  assert.ok(report.triggeredPolicies.some((p) => p.id === "DOMAIN-EMP-001"));
  assert.ok(report.controls.includes("Bias and fairness testing"));
});

test("control list is deduplicated", () => {
  const report = assess({
    ...baseline,
    domain: "employment",
    impact: "high",
    autonomy: "autonomous",
    humanApproval: false,
    auditLogging: false,
    monitoring: false,
    vendorAssessed: false
  });
  assert.equal(report.controls.length, new Set(report.controls).size);
});
