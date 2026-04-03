import { PageHeader } from "../components/layout/PageHeader";
import { Shield, AlertTriangle, FileText, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { HazardIcon } from "../components/design-system/HazardIcon";

interface EmergencyContact {
  name: string;
  number: string;
  type: string;
}

interface HazardousChemical {
  name: string;
  hazard: "flammable" | "toxic" | "corrosive" | "explosive" | "biohazard" | "environmental";
  location: string;
  handling: string;
}

interface SafetyProcedure {
  title: string;
  steps: string[];
}

const emergencyContacts: EmergencyContact[] = [
  { name: "Emergency Services", number: "911", type: "Primary" },
  { name: "Fire Department", number: "(555) 123-4567", type: "Fire" },
  { name: "Poison Control", number: "(800) 222-1222", type: "Chemical" },
  { name: "Safety Manager", number: "(555) 987-6543", type: "Internal" },
];

const hazardousChemicals: HazardousChemical[] = [
  { name: "Sulfuric Acid", hazard: "corrosive", location: "Storage A-12", handling: "Wear full PPE, ventilated area" },
  { name: "Hydrochloric Acid", hazard: "corrosive", location: "Storage A-14", handling: "Acid-resistant gloves required" },
  { name: "Ethanol", hazard: "flammable", location: "Storage B-05", handling: "Keep away from heat and sparks" },
  { name: "Acetone", hazard: "flammable", location: "Storage B-08", handling: "Use in well-ventilated area" },
];

const safetyProcedures: SafetyProcedure[] = [
  {
    title: "Chemical Spill Response",
    steps: [
      "Evacuate area and alert others",
      "Wear appropriate PPE",
      "Contain spill with absorbent material",
      "Notify safety manager",
      "Document incident",
    ],
  },
  {
    title: "Fire Emergency",
    steps: [
      "Activate fire alarm",
      "Evacuate building via nearest exit",
      "Call emergency services",
      "Do not re-enter until cleared",
      "Report to assembly point",
    ],
  },
  {
    title: "Chemical Exposure",
    steps: [
      "Remove from exposure area",
      "Flush affected area with water (15+ min)",
      "Remove contaminated clothing",
      "Seek medical attention immediately",
      "Bring MSDS if available",
    ],
  },
];

export function Safety() {
  return (
    <div>
      <PageHeader
        title="Safety & Emergency"
        description="Critical info always visible - your safety command center"
      />

      {/* Emergency Alert Banner */}
      <Card className="mb-6 border-red-300 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Emergency Protocol</h3>
              <p className="text-sm text-red-800">
                In case of emergency, dial <strong>911</strong> immediately. 
                Evacuate to designated assembly point. Do not re-enter until cleared by safety personnel.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-red-600" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                  <Badge variant="outline">{contact.type}</Badge>
                </div>
                <a 
                  href={`tel:${contact.number}`}
                  className="text-2xl font-bold text-blue-600 hover:underline"
                >
                  {contact.number}
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hazardous Chemicals Quick Reference */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            Hazardous Chemicals - Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hazardousChemicals.map((chemical, index) => (
              <div key={index} className="p-4 border rounded-lg bg-amber-50/30 hover:bg-amber-50 transition-colors">
                <div className="flex items-start gap-4">
                  <HazardIcon type={chemical.hazard} size="lg" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{chemical.name}</h4>
                      <Badge variant="outline" className="bg-gray-100">
                        {chemical.location}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Handling:</strong> {chemical.handling}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Procedures */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {safetyProcedures.map((procedure, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="w-5 h-5 text-blue-600" />
                {procedure.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {procedure.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex gap-2 text-sm">
                    <span className="font-semibold text-gray-500 flex-shrink-0">
                      {stepIndex + 1}.
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* PPE Requirements */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Personal Protective Equipment (PPE) Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🥽</div>
              <p className="font-medium">Safety Goggles</p>
              <p className="text-xs text-gray-600 mt-1">Always required</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🧤</div>
              <p className="font-medium">Chemical Gloves</p>
              <p className="text-xs text-gray-600 mt-1">When handling chemicals</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🥼</div>
              <p className="font-medium">Lab Coat</p>
              <p className="text-xs text-gray-600 mt-1">In designated areas</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">👞</div>
              <p className="font-medium">Safety Shoes</p>
              <p className="text-xs text-gray-600 mt-1">In production areas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}