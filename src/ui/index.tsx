import React from "react";
import { createRoot } from "react-dom/client";
import "./global.css";

import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("root");

  if (el) {
    const root = createRoot(el);
    root.render(<App />);
  }
});
