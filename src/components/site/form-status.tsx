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
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const isSubmittingRef = React.useRef(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setState("submitting");
    setError(null);
    setFieldErrors({});

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
        const data = (await res.json().catch(() => null)) as {
          error?: string;
          errors?: Record<string, string>;
        } | null;
        const errors = data?.errors ?? {};
        setFieldErrors(errors);
        setError(data?.error ?? Object.values(errors)[0] ?? "Submission failed. Please try again.");
        setState("error");
        return;
      }

      form.reset();
      setState("success");
    } catch {
      setError("Submission failed. Please try again.");
      setState("error");
    } finally {
      isSubmittingRef.current = false;
    }
  }

  return { state, error, fieldErrors, onSubmit, successMessage } as const;
}

