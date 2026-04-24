"use client";

import * as React from "react";

export function FormStatus({
  successMessage,
}: {
  successMessage: string;
}) {
  const [state, setState] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    const form = e.currentTarget;
    const action = form.action;
    const method = (form.method || "POST").toUpperCase();

    try {
      const res = await fetch(action, {
        method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(
          data?.errors?.[0]?.message ??
            "Submission failed. Please try again."
        );
        setState("error");
        return;
      }

      form.reset();
      setState("success");
    } catch {
      setError("Submission failed. Please try again.");
      setState("error");
    }
  }

  return { state, error, onSubmit, successMessage } as const;
}

