import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PortfolioSelector from "./PortfolioSelector.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CustomCursor />
    <PortfolioSelector />
  </StrictMode>
);
