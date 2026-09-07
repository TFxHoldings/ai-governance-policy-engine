/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. */
import { assess } from "./policy-engine.js";

const $ = (id) => document.getElementById(id);

const form = $("assessment-form");
const emptyState = $("empty-state");
const resultPanel = $("result");
let lastReport = null;

const getInput = () => ({
  name: $("name").value.trim(),
  purpose: $("purpose").value.trim(),
  domain: $("domain").value,
  autonomy: $("autonomy").value,
  impact: $("impact").value,
  audience: $("audience").value,
  personalData: $("personalData").checked,
  sensitiveData: $("sensitiveData").checked,
  generativeAI: $("generativeAI").checked,
  humanApproval: $("humanApproval").checked,
  auditLogging: $("auditLogging").checked,
  monitoring: $("monitoring").checked,
  vendorAssessed: $("vendorAssessed").checked,
  aiDisclosure: $("aiDisclosure").checked
});

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));

const render = (report) => {
  lastReport = report;
  const { result, controls, triggeredPolicies, frameworkSignals, input } = report;

  emptyState.classList.add("hidden");
  resultPanel.classList.remove("hidden");

  $("result-name").textContent = input.name;
  $("score").textContent = result.riskScore;
  $("score-ring").style.setProperty("--score-deg", `${result.riskScore * 3.6}deg`);
  $("posture").textContent = result.posture;
  $("decision-text").textContent = result.decision;
  $("trigger-count").textContent = result.triggeredPolicyCount;
  $("control-count").textContent = result.requiredControlCount;
  $("blocker-count").textContent = result.blockerCount;

  $("controls").innerHTML = controls.length
    ? controls.map((control) => `<span class="chip">${escapeHtml(control)}</span>`).join("")
    : `<span class="chip">No additional controls triggered</span>`;

  $("policy-trace").innerHTML = triggeredPolicies.length
    ? triggeredPolicies.map((p) => `
      <article class="policy">
        <div class="policy-top">
          <span><span class="policy-id">${escapeHtml(p.id)}</span> · ${escapeHtml(p.title)}</span>
          <span class="policy-severity severity-${escapeHtml(p.severity)}">${escapeHtml(p.severity)}</span>
        </div>
        <p>${escapeHtml(p.reason)} <strong>+${p.score}</strong> risk points.</p>
      </article>
    `).join("")
    : `<div class="policy"><p>No policies triggered by the current input.</p></div>`;

  $("framework-signals").innerHTML = frameworkSignals.map((f) => `
    <div class="framework">
      <strong>${escapeHtml(f.name)} · ${escapeHtml(f.signal)}</strong>
      <span>${escapeHtml(f.detail)}</span>
    </div>
  `).join("");
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  render(assess(getInput()));
});

form.addEventListener("reset", () => {
  setTimeout(() => {
    lastReport = null;
    resultPanel.classList.add("hidden");
    emptyState.classList.remove("hidden");
  }, 0);
});

$("load-example").addEventListener("click", () => {
  $("name").value = "AI-assisted recruitment screening";
  $("purpose").value = "Ranks applicants and recommends a shortlist to recruiters before interview selection.";
  $("domain").value = "employment";
  $("autonomy").value = "assistive";
  $("impact").value = "high";
  $("audience").value = "both";
  $("personalData").checked = true;
  $("sensitiveData").checked = false;
  $("generativeAI").checked = true;
  $("humanApproval").checked = true;
  $("auditLogging").checked = false;
  $("monitoring").checked = false;
  $("vendorAssessed").checked = false;
  $("aiDisclosure").checked = false;
  render(assess(getInput()));
});

$("download-report").addEventListener("click", () => {
  if (!lastReport) return;
  const blob = new Blob([JSON.stringify(lastReport, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  const safeName = lastReport.input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  link.download = `${safeName || "ai-governance"}-assessment.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});
