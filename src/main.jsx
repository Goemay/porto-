import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PortfolioSelector from "./PortfolioSelector.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PortfolioSelector />
  </StrictMode>
);
