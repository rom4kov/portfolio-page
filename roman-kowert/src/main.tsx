import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user.context.tsx";
import { TextProvider } from "./contexts/text.context.tsx";
import { ProjectsProvider } from "./contexts/projects.context.tsx";
import { OccupationsProvider } from "./contexts/occupations.context.tsx";
import { FlashProvider } from "./contexts/flash.context.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TextProvider>
          <ProjectsProvider>
            <OccupationsProvider>
              <FlashProvider>
                <App />
              </FlashProvider>
            </OccupationsProvider>
          </ProjectsProvider>
        </TextProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
