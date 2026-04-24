export function getFormEndpoint(kind: "contact" | "rfq") {
  const key = kind === "contact" ? "NEXT_PUBLIC_CONTACT_FORM_URL" : "NEXT_PUBLIC_RFQ_FORM_URL";
  const url = process.env[key];
  if (!url) return null;
  return url;
}

