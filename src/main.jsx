import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PortfolioSelector from "./PortfolioSelector.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import CursorSelector from "./components/CursorSelector.jsx";

function AppWrapper() {
  const [cursorType, setCursorType] = useState('dot');

  return (
    <>
      {cursorType === 'dot' && <CustomCursor />}
      <CursorSelector currentType={cursorType} onChange={setCursorType} />
      <PortfolioSelector />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
