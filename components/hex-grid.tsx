"use client";

import React from "react";

export const HexGrid = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-10">
      <div className="relative h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-background to-background">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `pulse ${2 + Math.random() * 4}s infinite`,
            }}
          >
            <HexagonShape />
          </div>
        ))}
      </div>
    </div>
  );
};

const HexagonShape = () => (
  <svg
    width="40"
    height="44"
    viewBox="0 0 40 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 0L39.0526 11V33L20 44L0.947441 33V11L20 0Z"
      fill="currentColor"
      fillOpacity="0.1"
    />
  </svg>
);
