"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function LoadingScreen() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const key = "noralixlabs_has_loaded";
    const has = sessionStorage.getItem(key);
    if (has) return;
    setShow(true);
    sessionStorage.setItem(key, "1");
  }, []);

  if (!show) return null;

  const word = "Noralixlabs";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f6fbf8]"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ delay: 1.9, duration: 0.6, ease: "easeInOut" }}
    >
      <div className="w-full max-w-md px-6 text-center">
        <div className="text-3xl font-semibold tracking-tight">
          {word.split("").map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              className="text-[#00c4b4]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: "easeOut" }}
            >
              {ch}
            </motion.span>
          ))}
        </div>

        <div className="mt-6 h-[2px] w-full overflow-hidden rounded bg-black/10">
          <motion.div
            className="h-full bg-[#00c4b4]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

