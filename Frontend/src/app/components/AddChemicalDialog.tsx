import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { useChemicalStore } from "../store";
import { toast } from "sonner";

interface AddChemicalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddChemicalDialog({
  open,
  onOpenChange,
}: AddChemicalDialogProps) {
  const { addChemical } = useChemicalStore();

  const [formData, setFormData] = useState({
    name: "",
    casNumber: "",
    supplier: "",
    location: "",
    hazardType: "flammable" as "flammable" | "corrosive" | "toxic" | "oxidizer",
    unit: "L",
    stockCurrent: "",
    stockMax: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.casNumber ||
      !formData.supplier ||
      !formData.location
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.stockCurrent || !formData.stockMax) {
      toast.error("Please enter stock levels");
      return;
    }

    // Add chemical
    addChemical({
      id: 0, // Will be overridden by the store
      name: formData.name,
      casNumber: formData.casNumber,
      supplier: formData.supplier,
      location: formData.location,
      hazardType: formData.hazardType,
      unit: formData.unit,
      stockCurrent: parseFloat(formData.stockCurrent),
      stockMax: parseFloat(formData.stockMax),
      status: "active",
      lastUpdated: new Date().toLocaleDateString(),
    });

    toast.success(`${formData.name} added successfully`);

    // Reset form
    setFormData({
      name: "",
      casNumber: "",
      supplier: "",
      location: "",
      hazardType: "flammable",
      unit: "L",
      stockCurrent: "",
      stockMax: "",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Chemical</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Chemical Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Sulfuric Acid"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="casNumber">CAS Number *</Label>
              <Input
                id="casNumber"
                placeholder="e.g., 7664-93-9"
                value={formData.casNumber}
                onChange={(e) =>
                  setFormData({ ...formData, casNumber: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier *</Label>
              <Input
                id="supplier"
                placeholder="e.g., ChemSupply Co."
                value={formData.supplier}
                onChange={(e) =>
                  setFormData({ ...formData, supplier: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., Storage A-12"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hazardType">Hazard Type *</Label>
              <Select
                value={formData.hazardType}
                onValueChange={(value) =>
                  setFormData({ ...formData, hazardType: value as any })
                }
              >
                <SelectTrigger id="hazardType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flammable">Flammable</SelectItem>
                  <SelectItem value="corrosive">Corrosive</SelectItem>
                  <SelectItem value="toxic">Toxic</SelectItem>
                  <SelectItem value="oxidizer">Oxidizer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) =>
                  setFormData({ ...formData, unit: value })
                }
              >
                <SelectTrigger id="unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Liters (L)</SelectItem>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="gal">Gallons (gal)</SelectItem>
                  <SelectItem value="lb">Pounds (lb)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stockCurrent">Current Stock *</Label>
              <Input
                id="stockCurrent"
                type="number"
                step="0.01"
                placeholder="e.g., 150"
                value={formData.stockCurrent}
                onChange={(e) =>
                  setFormData({ ...formData, stockCurrent: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stockMax">Maximum Stock *</Label>
              <Input
                id="stockMax"
                type="number"
                step="0.01"
                placeholder="e.g., 500"
                value={formData.stockMax}
                onChange={(e) =>
                  setFormData({ ...formData, stockMax: e.target.value })
                }
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Chemical</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
