import { useDateFilterStore } from "../store";
import { DateFilter } from "../components/DateFilter";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { format } from "date-fns";

export function DateFilterTest() {
  const { dateRange, resetDateRange } = useDateFilterStore();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Date Filter Debug Test</h1>
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-4">Current Date Filter</h2>
            <DateFilter />
          </div>
          
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <p className="font-medium">Active Filter:</p>
            <p className="text-sm">
              <span className="font-semibold">Label:</span> {dateRange.label}
            </p>
            <p className="text-sm">
              <span className="font-semibold">From:</span> {format(dateRange.from, "PPP")}
            </p>
            <p className="text-sm">
              <span className="font-semibold">To:</span> {format(dateRange.to, "PPP")}
            </p>
          </div>
          
          <div>
            <Button onClick={resetDateRange} variant="outline">
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Testing Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Click the date filter button above</li>
            <li>Select any preset (e.g., "Last 6 Months")</li>
            <li>Watch the "Active Filter" section update immediately</li>
            <li>You should see a toast notification</li>
            <li>Check browser console for detailed logs</li>
            <li>Refresh the page - filter should persist</li>
          </ol>
        </CardContent>
      </Card>
      
      <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardContent className="p-6">
          <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
            🔍 Console Logs to Watch For:
          </h3>
          <ul className="text-sm space-y-1 text-amber-800 dark:text-amber-300 font-mono">
            <li>• === DATE FILTER CLICKED ===</li>
            <li>• 📅 Zustand Store: Setting date range</li>
            <li>• ✅ Zustand Store: Date range updated</li>
            <li>• 💾 Saving to localStorage</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
