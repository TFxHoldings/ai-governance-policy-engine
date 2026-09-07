/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. */
import { policies, frameworkSignals, POLICY_VERSION } from "./policies.js";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function assess(input) {
  const triggered = policies.filter((policy) => policy.when(input));
  const riskScore = clamp(triggered.reduce((sum, policy) => sum + policy.score, 0), 0, 100);
  const blockers = triggered.filter((policy) => policy.blocker);
  const controls = [...new Set(triggered.flatMap((policy) => policy.controls))];

  let posture = "STANDARD CONTROLS";
  let decision = "Proceed with proportionate governance controls and documented ownership.";

  if (blockers.length > 0) {
    posture = "DO NOT DEPLOY";
    decision = "A blocking governance condition is present. Resolve the blocking control gap before deployment or material use.";
  } else if (riskScore >= 70) {
    posture = "ENHANCED GOVERNANCE";
    decision = "Formal review and enhanced controls are recommended before pilot or deployment.";
  } else if (riskScore >= 40) {
    posture = "CONDITIONAL PILOT";
    decision = "A controlled pilot may be appropriate after the identified controls have named owners and acceptance criteria.";
  } else if (riskScore >= 15) {
    posture = "PROPORTIONATE REVIEW";
    decision = "Proceed only with the listed proportionate controls, clear ownership and monitoring.";
  }

  return {
    meta: {
      engine: "TFx AI Governance Policy Engine",
      policyVersion: POLICY_VERSION,
      generatedAt: new Date().toISOString(),
      disclaimer: "Educational governance demonstrator only; not legal advice, certification or conformity assessment."
    },
    input,
    result: {
      riskScore,
      posture,
      decision,
      blockerCount: blockers.length,
      triggeredPolicyCount: triggered.length,
      requiredControlCount: controls.length
    },
    controls,
    triggeredPolicies: triggered.map(({ when, ...policy }) => policy),
    frameworkSignals: frameworkSignals(input, triggered)
  };
}
