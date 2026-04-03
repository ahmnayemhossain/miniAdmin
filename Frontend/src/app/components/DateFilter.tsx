import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format, subDays, subMonths, subYears, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays } from "date-fns";
import { cn } from "./ui/utils";
import { useDateFilterStore } from "../store";
import { toast } from "sonner";

interface DateFilterProps {
  className?: string;
}

const presetRanges = [
  {
    label: "Today",
    getValue: () => ({
      from: new Date(),
      to: new Date(),
    }),
  },
  {
    label: "Yesterday",
    getValue: () => {
      const yesterday = subDays(new Date(), 1);
      return {
        from: yesterday,
        to: yesterday,
      };
    },
  },
  {
    label: "Tomorrow",
    getValue: () => {
      const tomorrow = addDays(new Date(), 1);
      return {
        from: tomorrow,
        to: tomorrow,
      };
    },
  },
  {
    label: "This Week",
    getValue: () => ({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date()),
    }),
  },
  {
    label: "This Month",
    getValue: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    }),
  },
  {
    label: "Last 3 Months",
    getValue: () => ({
      from: subMonths(new Date(), 3),
      to: new Date(),
    }),
  },
  {
    label: "Last 6 Months",
    getValue: () => ({
      from: subMonths(new Date(), 6),
      to: new Date(),
    }),
  },
  {
    label: "Last 1 Year",
    getValue: () => ({
      from: subYears(new Date(), 1),
      to: new Date(),
    }),
  },
  {
    label: "Last 2 Years",
    getValue: () => ({
      from: subYears(new Date(), 2),
      to: new Date(),
    }),
  },
];

export function DateFilter({ className }: DateFilterProps) {
  const { dateRange, setDateRange } = useDateFilterStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customFromDate, setCustomFromDate] = useState<Date | undefined>(dateRange.from);
  const [customToDate, setCustomToDate] = useState<Date | undefined>(dateRange.to);
  const [showCustom, setShowCustom] = useState(false);

  const handlePresetClick = (e: React.MouseEvent, preset: typeof presetRanges[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('=== DATE FILTER CLICKED ===');
    console.log('Preset:', preset.label);
    
    const range = preset.getValue();
    console.log('Date range:', {
      from: range.from,
      to: range.to,
      label: preset.label
    });
    
    setDateRange({
      from: range.from,
      to: range.to,
      label: preset.label,
    });
    
    console.log('Date range set successfully');
    toast.success(`Date filter updated: ${preset.label}`);
    
    setIsOpen(false);
    setShowCustom(false);
  };

  const handleCustomApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (customFromDate && customToDate) {
      const label = `${format(customFromDate, "MMM dd")} - ${format(customToDate, "MMM dd, yyyy")}`;
      
      console.log('=== CUSTOM DATE APPLIED ===');
      console.log('Custom range:', { customFromDate, customToDate, label });
      
      setDateRange({
        from: customFromDate,
        to: customToDate,
        label,
      });
      
      toast.success(`Date filter updated: ${label}`);
      setIsOpen(false);
      setShowCustom(false);
    }
  };

  const handleCustomCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setCustomFromDate(dateRange.from);
    setCustomToDate(dateRange.to);
    setShowCustom(false);
  };

  const handleShowCustom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setShowCustom(true);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal w-[140px]",
            className
          )}
        >
          <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate text-xs">{dateRange.label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" side="bottom">
        {!showCustom ? (
          <div className="p-3 space-y-1">
            <div className="text-sm font-medium text-muted-foreground px-2 py-1 mb-2">
              Quick Filters
            </div>
            {presetRanges.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className={cn(
                  "w-full px-3 py-2 text-sm rounded-md text-left transition-colors",
                  dateRange.label === preset.label
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={(e) => handlePresetClick(e, preset)}
              >
                {preset.label}
              </button>
            ))}
            <div className="pt-2 border-t mt-2">
              <button
                type="button"
                className="w-full px-3 py-2 text-sm rounded-md text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={handleShowCustom}
              >
                Custom Range...
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 space-y-3">
            <div className="text-sm font-medium">Custom Date Range</div>
            
            <div className="space-y-2">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">From Date</label>
                <CalendarComponent
                  mode="single"
                  selected={customFromDate}
                  onSelect={setCustomFromDate}
                  initialFocus
                />
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">To Date</label>
                <CalendarComponent
                  mode="single"
                  selected={customToDate}
                  onSelect={setCustomToDate}
                  disabled={(date) => customFromDate ? date < customFromDate : false}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleCustomCancel}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                className="flex-1"
                onClick={handleCustomApply}
                disabled={!customFromDate || !customToDate}
              >
                Apply
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}