import assert from "node:assert/strict";
import test from "node:test";

import {
  validateContactSubmission,
  validateRfqSubmission,
} from "../src/lib/inquiries.ts";
import { renderRfqNotification } from "../src/emails/inquiry-notification.ts";
import { readLimitedBody } from "../src/lib/request-body.ts";

const contact = {
  name: "Dr. Anjali Rao",
  company: "Noralix Pharmaceuticals Pvt Ltd",
  phone: "9876543210",
  email: "anjali@example.com",
  projectStage: "Early Development",
  interest: "Formulation development",
  message: "We need formulation development support for an oral solid product.",
};

test("normalizes a supported Indian phone number and accepts an omitted email", () => {
  const result = validateContactSubmission({ ...contact, phone: "91 9876543210", email: "  " });

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.phone, "+919876543210");
    assert.equal(result.data.email, "");
  }
});

test("normalizes each supported Indian phone format", () => {
  for (const phone of ["9876543210", "+919876543210", "+91 9876543210", "91 9876543210"]) {
    const result = validateContactSubmission({ ...contact, phone });
    assert.equal(result.ok, true, phone);
    if (result.ok) assert.equal(result.data.phone, "+919876543210");
  }
});

test("rejects SQL-shaped names rather than forwarding them", () => {
  const result = validateContactSubmission({
    ...contact,
    name: "%') OR EXTRACTVALUE(3264,CONCAT(0x7e,(SELECT(ELT(3264=3264,1)))),0x7e))-- -",
  });

  assert.deepEqual(result, { ok: false, errors: { name: "Enter a valid name." } });
});

test("rejects header injection in optional email and names", () => {
  const emailResult = validateContactSubmission({
    ...contact,
    email: "test@example.com\r\nBcc: attacker@example.com",
  });
  const nameResult = validateContactSubmission({ ...contact, name: "John\nBcc: attacker@example.com" });

  assert.deepEqual(emailResult, { ok: false, errors: { email: "Enter a valid email address." } });
  assert.deepEqual(nameResult, { ok: false, errors: { name: "Enter a valid name." } });
});

test("rejects invalid phone numbers and untrusted dropdown values", () => {
  const phoneResult = validateContactSubmission({ ...contact, phone: "0000000000" });
  const stageResult = validateContactSubmission({ ...contact, projectStage: "DROP TABLE leads" });

  assert.deepEqual(phoneResult, { ok: false, errors: { phone: "Enter a valid phone number." } });
  assert.deepEqual(stageResult, { ok: false, errors: { projectStage: "Select a valid project stage." } });
});

test("rejects short and non-numeric phone numbers", () => {
  for (const phone of ["123", "abcdefghij"]) {
    const result = validateContactSubmission({ ...contact, phone });
    assert.deepEqual(result, { ok: false, errors: { phone: "Enter a valid phone number." } });
  }
});

test("keeps message HTML as data while accepting a valid RFQ", () => {
  const result = validateRfqSubmission({
    name: "Aarav Mehta",
    company: "Example Pharma",
    phone: "+91 9876543210",
    email: "",
    dosage_form: "tablets",
    project_stage: "development",
    target_markets: "India",
    timeline: "12 weeks",
    requirements: "<img src=x onerror=alert(1)> Please support tablet formulation development.",
  });

  assert.equal(result.ok, true);
  if (result.ok) assert.match(result.data.requirements, /<img src=x/);
});

test("escapes user-controlled HTML in the notification while preserving message line breaks", () => {
  const notification = renderRfqNotification({
    name: "Aarav Mehta",
    company: "<img src=x onerror=alert(1)>",
    phone: "+919876543210",
    email: "",
    dosageForm: "tablets",
    projectStage: "development",
    targetMarkets: "India",
    timeline: "12 weeks",
    requirements: "<script>alert(1)</script>\nNeed formulation support.",
    createdAt: new Date("2026-09-10T13:00:00.000Z"),
  });

  assert.doesNotMatch(notification.html, /<script>alert\(1\)<\/script>|<img src=x/);
  assert.match(notification.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;<br \/>/);
  assert.match(notification.text, /<script>alert\(1\)<\/script>/);
});

test("enforces the request-body byte limit while reading a stream", async () => {
  const accepted = await readLimitedBody(new Request("https://example.test", { method: "POST", body: "12345" }), 5);
  const rejected = await readLimitedBody(new Request("https://example.test", { method: "POST", body: "123456" }), 5);

  if (!accepted) throw new Error("Expected the limited body to be accepted.");
  assert.equal(new TextDecoder().decode(accepted), "12345");
  assert.equal(rejected, null);
});
