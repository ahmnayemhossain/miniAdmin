import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { ChemicalManagement } from "./pages/ChemicalManagement";
import { MSDSManagement } from "./pages/MSDSManagement";
import { WasteManagement } from "./pages/WasteManagement";
import { WaterManagement } from "./pages/WaterManagement";
import { ComplianceAudit } from "./pages/ComplianceAudit";
import { Inventory } from "./pages/Inventory";
import { Alerts } from "./pages/Alerts";
import { UserManagement } from "./pages/UserManagement";
import { Safety } from "./pages/Safety";
import { Sustainability } from "./pages/Sustainability";
import { Settings } from "./pages/Settings";
import { DateFilterTest } from "./pages/DateFilterTest";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "chemicals", Component: ChemicalManagement },
      { path: "msds", Component: MSDSManagement },
      { path: "waste", Component: WasteManagement },
      { path: "water", Component: WaterManagement },
      { path: "compliance", Component: ComplianceAudit },
      { path: "inventory", Component: Inventory },
      { path: "alerts", Component: Alerts },
      { path: "users", Component: UserManagement },
      { path: "safety", Component: Safety },
      { path: "sustainability", Component: Sustainability },
      { path: "settings", Component: Settings },
      { path: "test-date-filter", Component: DateFilterTest },
    ],
  },
]);