"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";

export const BarProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="purple"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};
