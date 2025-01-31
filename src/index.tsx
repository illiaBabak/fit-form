import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./root";
import "./index.scss";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  throw new Error("Something went wrong with root element!");
}
