# State Management Architecture

## 🎯 Overview

Mini Admin uses **Zustand** for global state management - a lightweight, TypeScript-first state management solution that's simpler than Redux and more powerful than Context API.

## 📦 Store Structure

```
/src/app/store/
├── index.ts                 # Central export point
├── types.ts                 # Shared TypeScript types
├── useAuthStore.ts          # Authentication & user context
├── useChemicalStore.ts      # Chemical inventory management
├── useAlertStore.ts         # Alert & notification system
├── useMSDSStore.ts          # MSDS document management
└── useSettingsStore.ts      # Application settings
```

## 🏪 Available Stores

### 1. **useAuthStore** - Authentication & User Management

**State:**
```typescript
interface AuthState {
  user: User | null;
  currentFactory: Factory | null;
  factories: Factory[];
  isAuthenticated: boolean;
}
```

**Actions:**
- `login(user)` - Authenticate user
- `logout()` - Clear user session
- `switchFactory(factoryId)` - Switch between factories/plants
- `updateUser(updates)` - Update user profile

**Usage:**
```typescript
import { useAuthStore } from '../store';

function Component() {
  const { user, currentFactory, switchFactory } = useAuthStore();
  
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <p>Factory: {currentFactory?.name}</p>
      <button onClick={() => switchFactory('2')}>
        Switch to Plant B
      </button>
    </div>
  );
}
```

**Features:**
- ✅ Persistent storage (survives page refresh)
- ✅ Multi-factory support
- ✅ Role-based access control ready

---

### 2. **useChemicalStore** - Chemical Inventory Management

**State:**
```typescript
interface ChemicalState {
  chemicals: Chemical[];
  filteredChemicals: Chemical[];
  searchQuery: string;
  filterStatus: string;
  isLoading: boolean;
}
```

**Actions:**
- `setChemicals(chemicals)` - Initialize chemical list
- `addChemical(chemical)` - Add new chemical
- `updateChemical(id, updates)` - Update chemical info
- `deleteChemical(id)` - Remove chemical
- `setSearchQuery(query)` - Filter by search
- `setFilterStatus(status)` - Filter by status
- `updateStock(id, newStock)` - Update stock level
- `getChemicalById(id)` - Get single chemical

**Usage:**
```typescript
import { useChemicalStore } from '../store';

function ChemicalList() {
  const { 
    filteredChemicals, 
    searchQuery,
    setSearchQuery,
    updateStock 
  } = useChemicalStore();
  
  return (
    <div>
      <input 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredChemicals.map(chemical => (
        <ChemicalCard 
          key={chemical.id}
          chemical={chemical}
          onUpdateStock={(newStock) => updateStock(chemical.id, newStock)}
        />
      ))}
    </div>
  );
}
```

**Features:**
- ✅ Real-time filtering and search
- ✅ Automatic status calculation based on stock levels
- ✅ Persistent storage
- ✅ Mock data included for demo

---

### 3. **useAlertStore** - Notifications & Alerts

**State:**
```typescript
interface AlertState {
  alerts: Alert[];
  unreadCount: number;
  filter: string;
}
```

**Actions:**
- `addAlert(alert)` - Create new alert
- `acknowledgeAlert(id)` - Mark as read
- `dismissAlert(id)` - Remove alert
- `clearAll()` - Clear all alerts
- `setFilter(filter)` - Filter alerts
- `getUnreadAlerts()` - Get unread only
- `getAlertsByPriority(priority)` - Filter by priority

**Usage:**
```typescript
import { useAlertStore } from '../store';

function NotificationBell() {
  const { 
    alerts, 
    unreadCount, 
    acknowledgeAlert 
  } = useAlertStore();
  
  const unreadAlerts = alerts.filter(a => !a.acknowledged);
  
  return (
    <div>
      <Badge>{unreadCount}</Badge>
      {unreadAlerts.map(alert => (
        <AlertItem 
          key={alert.id}
          alert={alert}
          onClick={() => acknowledgeAlert(alert.id)}
        />
      ))}
    </div>
  );
}
```

**Features:**
- ✅ Priority levels: low, medium, high, critical
- ✅ Categories: stock, compliance, safety, maintenance, system
- ✅ Timestamp tracking
- ✅ Auto-count unread alerts

---

### 4. **useMSDSStore** - MSDS Document Management

**State:**
```typescript
interface MSDSState {
  documents: MSDS[];
  filteredDocuments: MSDS[];
  searchQuery: string;
  filterStatus: string;
  isUploading: boolean;
}
```

**Actions:**
- `setDocuments(documents)` - Initialize documents
- `addDocument(document)` - Upload new MSDS
- `updateDocument(id, updates)` - Update document info
- `deleteDocument(id)` - Remove document
- `setSearchQuery(query)` - Search documents
- `setFilterStatus(status)` - Filter by status
- `setUploading(uploading)` - Upload state
- `getDocumentById(id)` - Get single document
- `getExpiringDocuments()` - Get expiring/expired

**Usage:**
```typescript
import { useMSDSStore } from '../store';

function MSDSList() {
  const { 
    filteredDocuments,
    isUploading,
    addDocument,
    getExpiringDocuments 
  } = useMSDSStore();
  
  const expiringDocs = getExpiringDocuments();
  
  const handleUpload = async (file: File) => {
    const newDoc: MSDS = {
      // ... document data
    };
    addDocument(newDoc);
  };
  
  return (
    <div>
      <UploadButton onUpload={handleUpload} loading={isUploading} />
      <Alert>Expiring documents: {expiringDocs.length}</Alert>
      {filteredDocuments.map(doc => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
}
```

**Features:**
- ✅ Status tracking: current, expiring, expired
- ✅ File size tracking
- ✅ Upload state management
- ✅ Persistent storage

---

### 5. **useSettingsStore** - Application Settings

**State:**
```typescript
interface SettingsState {
  settings: AppSettings;
  isDirty: boolean;
}

interface AppSettings {
  notifications: { email, push, sms };
  alerts: { lowStock, complianceDue, safetyIncidents };
  display: { language, timezone, dateFormat };
}
```

**Actions:**
- `updateSettings(updates)` - Update all settings
- `updateNotifications(updates)` - Update notification prefs
- `updateAlerts(updates)` - Update alert preferences
- `updateDisplay(updates)` - Update display settings
- `resetSettings()` - Reset to defaults
- `saveSettings()` - Persist changes

**Usage:**
```typescript
import { useSettingsStore } from '../store';

function SettingsPage() {
  const { 
    settings, 
    isDirty,
    updateNotifications,
    saveSettings 
  } = useSettingsStore();
  
  return (
    <div>
      <Switch 
        checked={settings.notifications.email}
        onCheckedChange={(checked) => 
          updateNotifications({ email: checked })
        }
      />
      
      {isDirty && (
        <Button onClick={saveSettings}>
          Save Changes
        </Button>
      )}
    </div>
  );
}
```

**Features:**
- ✅ Persistent storage
- ✅ Dirty state tracking
- ✅ Nested settings updates
- ✅ Reset to defaults

---

## 🎨 TypeScript Types

All stores use shared types from `/src/app/store/types.ts`:

```typescript
// Core entity types
- User
- Factory
- Chemical
- MSDS
- Alert
- WasteRecord
- WaterUsage
- ComplianceRecord
- InventoryItem
- AppSettings

// Enum types
- HazardType
- StatusType
- ComplianceStatus
```

## 🔄 State Persistence

Stores using `persist` middleware automatically save to localStorage:

- ✅ **useAuthStore** - Auth persists across sessions
- ✅ **useChemicalStore** - Chemical data persists
- ✅ **useMSDSStore** - Documents persist
- ✅ **useSettingsStore** - Settings persist

**Not persisted:**
- ❌ **useAlertStore** - Alerts are session-only (intentional)

## 📊 Performance

### Why Zustand?

1. **Lightweight** - Only 2kb gzipped
2. **TypeScript-first** - Full type safety
3. **No boilerplate** - Simple API
4. **React DevTools** - Built-in debugging
5. **Selective subscriptions** - Only re-render what changes

### Optimization Example

```typescript
// ✅ Good - Only subscribes to user name
function UserName() {
  const userName = useAuthStore(state => state.user?.name);
  return <span>{userName}</span>;
}

// ❌ Avoid - Subscribes to entire store
function UserName() {
  const { user } = useAuthStore();
  return <span>{user?.name}</span>;
}
```

## 🧪 Testing

Stores can be easily tested:

```typescript
import { useChemicalStore } from '../store';

test('should add chemical', () => {
  const { addChemical, chemicals } = useChemicalStore.getState();
  
  const newChemical = {
    id: 999,
    name: 'Test Chemical',
    // ... other properties
  };
  
  addChemical(newChemical);
  
  expect(chemicals).toContain(newChemical);
});
```

## 🔮 Future Enhancements

Potential additions:

1. **API Integration** - Connect to real backend
2. **Optimistic Updates** - Instant UI feedback
3. **WebSocket Support** - Real-time data sync
4. **Offline Support** - Service worker integration
5. **Data Validation** - Zod schema validation
6. **Audit Logging** - Track all state changes

## 📚 Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TypeScript with Zustand](https://github.com/pmndrs/zustand#typescript)
- [React DevTools](https://github.com/pmndrs/zustand#react-context)

---

## ✅ Integration Status

**Implemented:**
- ✅ All 5 core stores created
- ✅ TypeScript types defined
- ✅ Topbar integrated with Auth & Alerts
- ✅ ChemicalManagement using ChemicalStore
- ✅ Persistence configured
- ✅ Mock data provided

**Ready to Integrate:**
- 🔄 MSDSManagement page
- 🔄 Settings page
- 🔄 Dashboard KPIs
- 🔄 Alerts page
- 🔄 All remaining pages

**Benefits:**
- 🎯 Centralized data management
- 🔄 Data syncs across all components
- 💾 Automatic persistence
- 🐛 Easier debugging
- 📝 Full TypeScript safety
- ⚡ Better performance
