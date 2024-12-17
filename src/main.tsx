import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeContextProvider } from "./store/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider validationBehavior="native">
      <ThemeContextProvider>
          <App />

      </ThemeContextProvider>
    </NextUIProvider>
  </StrictMode>
);
