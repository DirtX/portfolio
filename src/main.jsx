import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import App from "./App.jsx";
import "./styles/variables.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* LANGUAGE CONTEXT WRAPS THE WHOLE APP */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
