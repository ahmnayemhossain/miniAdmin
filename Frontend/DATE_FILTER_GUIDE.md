# Date Filter Guide

## Overview
The Dashboard now includes a comprehensive date filter system that allows users to quickly filter data by preset date ranges or select custom date ranges.

## Features

### 📅 **Preset Date Ranges**
Quick-select buttons for common time periods:

1. **Today** - Current day only
2. **Yesterday** - Previous day
3. **Tomorrow** - Next day  
4. **This Week** - Current week (Sunday to Saturday)
5. **This Month** - Current month (1st to last day)
6. **Last 3 Months** - Past 3 months from today
7. **Last 6 Months** - Past 6 months from today
8. **Last 1 Year** - Past 12 months from today
9. **Last 2 Years** - Past 24 months from today

### 🗓️ **Custom Date Range**
Select any custom date range with:
- **From Date** picker
- **To Date** picker (automatically disabled dates before "From")
- Apply/Cancel buttons
- Visual calendar interface

## How to Use

### **Accessing the Filter**
1. Go to Dashboard
2. Look below the page header
3. You'll see: "Showing data for: [Current Range]"
4. Click the date filter button on the right

### **Using Preset Ranges**
```
1. Click the date filter button
2. Click any preset option (e.g., "Last 3 Months")
3. ✅ Filter applies instantly
4. Data refreshes for selected period
```

### **Using Custom Range**
```
1. Click the date filter button
2. Click "Custom Range..." at the bottom
3. Select "From Date" in calendar
4. Select "To Date" in calendar
5. Click "Apply" button
6. ✅ Custom range applied
```

### **Canceling Custom Selection**
```
1. While in custom range picker
2. Click "Cancel" button
3. Returns to preset list
4. Previous selection maintained
```

## UI Layout

```
┌─────────────────────────────────────────────────────┐
│ Dashboard                                            │
│ Command center for environmental operations          │
├─────────────────────────────────────────────────────┤
│ Showing data for: Last 1 Month    [📅 Date Filter ▼]│
└─────────────────────────────────────────────────────┘
```

### **Filter Button**
```
┌──────────────────────────────────┐
│ 📅 Last 1 Month              ▼  │
└──────────────────────────────────┘
```

### **Preset Dropdown**
```
┌──��───────────────────────┐
│ Quick Filters            │
├──────────────────────────┤
│ Today                    │
│ Yesterday                │
│ Tomorrow                 │
│ This Week                │
│ This Month               │
│ Last 3 Months            │
│ Last 6 Months            │
│ Last 1 Year              │
│ Last 2 Years             │
├──────────────────────────┤
│ Custom Range...          │
└──────────────────────────┘
```

### **Custom Range Picker**
```
┌────────────────────────────┐
│ Custom Date Range          │
├────────────────────────────┤
│ From Date                  │
│ [Calendar Component]       │
│                            │
│ To Date                    │
│ [Calendar Component]       │
├────────────────────────────┤
│ [Cancel]  [Apply]          │
└────────────────────────────┘
```

## Technical Details

### **Component Structure**
```typescript
<DateFilter
  value={dateRange}
  onChange={handleDateRangeChange}
/>
```

### **DateRange Interface**
```typescript
interface DateRange {
  from: Date;      // Start date
  to: Date;        // End date
  label: string;   // Display label
}
```

### **State Management**
```typescript
const [dateRange, setDateRange] = useState<DateRange>({
  from: subMonths(new Date(), 1),
  to: new Date(),
  label: "Last 1 Month",
});
```

### **Change Handler**
```typescript
const handleDateRangeChange = (range: DateRange) => {
  setDateRange(range);
  // Add filtering logic here
  console.log("Date range changed:", range);
};
```

## Integration Examples

### **Filter API Calls**
```typescript
const handleDateRangeChange = (range: DateRange) => {
  setDateRange(range);
  
  // Fetch filtered data
  fetchDashboardData({
    startDate: range.from,
    endDate: range.to,
  });
};
```

### **Filter Chart Data**
```typescript
const filteredData = waterUsageData.filter(item => {
  const itemDate = new Date(item.date);
  return itemDate >= dateRange.from && itemDate <= dateRange.to;
});
```

### **Filter KPI Calculations**
```typescript
const activeChemicals = chemicals.filter(chem => {
  return chem.addedDate >= dateRange.from && 
         chem.addedDate <= dateRange.to;
}).length;
```

## Visual States

### **Default State**
- Shows "Last 1 Month" by default
- Button displays current selection
- Dropdown is closed

### **Dropdown Open**
- Shows all preset options
- Current selection is highlighted
- "Custom Range..." option at bottom

### **Custom Mode**
- Shows two calendar pickers
- From date is selected first
- To date is limited to dates after From
- Apply/Cancel buttons visible

### **After Selection**
- Dropdown closes automatically
- Button shows new selection label
- Toast notification (optional)
- Data refreshes

## Date Formatting

### **Display Labels**
```typescript
"Today"                    // Single day presets
"Last 3 Months"           // Range presets
"Apr 03 - May 03, 2026"   // Custom ranges
```

### **Internal Format**
```typescript
from: Date object (2026-04-03T00:00:00)
to: Date object (2026-05-03T23:59:59)
```

## Responsive Behavior

### **Desktop**
```
[Showing data text]  [Date Filter Button]
```

### **Mobile**
```
[Showing data text]
[Date Filter Button - Full Width]
```

### **Calendar in Dropdown**
- Single month view
- Touch-friendly targets
- Scrollable if needed

## Accessibility

✅ **Keyboard Navigation**
- Tab to focus button
- Enter/Space to open
- Arrow keys to navigate options
- Escape to close

✅ **Screen Readers**
- Proper ARIA labels
- Announced date changes
- Calendar navigation support

✅ **Focus Management**
- Focus trapped in dropdown
- Returns to button on close
- Visual focus indicators

## Best Practices

### **For Users**
💡 Start with presets for common periods
💡 Use custom range for specific analysis
💡 Check "Showing data for:" to confirm selection
💡 Remember: data refreshes on every change

### **For Developers**
💡 Always validate date range (from < to)
💡 Handle timezone conversions properly
💡 Cache filtered data to avoid re-fetching
💡 Show loading state during data refresh
💡 Persist user's last selection in localStorage

## Future Enhancements

🔮 **Comparison Mode** - Compare two date ranges
🔮 **Saved Ranges** - Save custom ranges as presets
🔮 **Relative Dates** - "Last 30 days" that updates daily
🔮 **Fiscal Calendar** - Support for fiscal year periods
🔮 **Time Selection** - Add hour/minute for intraday filtering

## Dependencies

- `date-fns` - Date manipulation and formatting
- `react-day-picker` - Calendar component
- `@radix-ui/react-popover` - Dropdown container
- `lucide-react` - Icons (Calendar, ChevronDown)

## Files

```
/src/app/components/DateFilter.tsx     - Main component
/src/app/pages/Dashboard.tsx           - Integration example
/DATE_FILTER_GUIDE.md                  - This documentation
```

## Support

For issues or questions:
1. Check console logs for date range changes
2. Verify date-fns is installed correctly
3. Ensure Calendar component is working
4. Test with different timezones
