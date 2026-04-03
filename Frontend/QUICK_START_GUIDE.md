# 🎯 Quick Start Guide - Compliance & Certification Management

## 📌 Where to Find Everything

### **Main Menu → Compliance & Audit**

When you click on "Compliance & Audit" in the sidebar, you'll see:

---

## 🏠 **Dashboard Overview**

### **Top Statistics (5 Cards)**
```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│   Total     │   Active    │  Expiring   │   Expired   │  Open NCRs  │
│  Certs: 5   │    3 🟢     │    1 🟡     │    1 🔴     │    1 🔵     │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

---

## 📑 **Four Main Tabs**

### **Tab 1: Certificates** 📜

**Grid View (Default):**
```
┌──────────────────────────────────────────┐
│ 🏆 OEKO-TEX Standard 100        [Active] │
│                                           │
│ Certificate: OTX-2024-001234             │
│ Issued By: OEKO-TEX Association          │
│ Scope: All textile products              │
│ Score: 98%                                │
│                                           │
│ ━━━━━━━━━━━━━━━━━━━ 75% ━━━━━━━━━━      │
│          286 days remaining               │
│                                           │
│ 📅 Next Audit: Dec 15, 2024              │
│                                           │
│ [View Details]  [Renew]                  │
└──────────────────────────────────────────┘
```

**List View:**
```
Certificate Name       | Type    | Number         | Status  | Expiry
─────────────────────────────────────────────────────────────────────
OEKO-TEX Standard 100  | OKEO-   | OTX-2024-001  | Active  | Jan 14, 2025
GOTS                   | GOTS    | GOTS-2023-789 | Expired | Mar 19, 2024
ISO 9001               | ISO-    | ISO-9001-2024 | Active  | Jun 09, 2026
```

**Toggle View:** Click the Grid/List buttons at top-right

---

### **Tab 2: Audit History** 📊

```
Date        | Type         | Auditor       | Body    | Score | NCRs | Status
─────────────────────────────────────────────────────────────────────────
Jan 15,2024 | Surveillance | M. Schmidt    | TESTEX  | 98/100|  0   | Passed
Sep 05,2023 | External     | S. Johnson    | SGS     | 88/100|  2   | Passed w/Obs
```

**Features:**
- See all audit history
- Click to view full audit report
- See findings and recommendations
- Track audit scores over time

---

### **Tab 3: NCRs** 🔴

```
NCR Number  | Title                     | Severity | Status      | Due Date
─────────────────────────────────────────────────────────────────────────
NCR-2024-001| Incomplete training       | Minor    | In Progress | Apr 30
NCR-2024-002| Fire extinguisher overdue | Major    | Closed      | Oct 05
```

**NCR Details:**
- Raised by: Auditor name
- Assigned to: Your team member
- Root cause: What went wrong
- Corrective action: What you did
- Preventive action: How to prevent future
- Verification: Who verified closure

---

### **Tab 4: Compliance Calendar** 📅

**Left Side: Timeline**
```
🗓️ April 2026
  └─ No expirations

🗓️ September 2024
  └─ ⚠️ BSCI Certificate (154 days left)
     BSCI-2024-998877

🗓️ January 2025
  └─ ✅ OEKO-TEX Standard 100 (286 days left)
     OTX-2024-001234
  └─ ✅ GRS Certificate (303 days left)
     GRS-2024-445566
```

**Right Side: Upcoming Renewals (90 days)**
```
┌──────────────────────────────────────────┐
│ BSCI Certificate                  [Renew]│
│ BSCI-2024-998877                         │
│ 📅 Expires: Sep 4, 2024  (154 days)     │
└──────────────────────────────────────────┘
```

---

## ➕ **Adding a New Certificate**

**Click "Add Certificate" button:**

```
1. Select Certificate Type:
   ┌─────────────────────────────────┐
   │ OEKO-TEX Standard 100           │  ◄ Choose from 14 types
   │ OEKO-TEX STeP                   │
   │ GOTS                            │
   │ GRS                             │
   │ ISO 9001, ISO 14001, etc.       │
   └─────────────────────────────────┘

2. Enter Details:
   Certificate Number:  [OTX-2024-001234]
   Certificate Name:    [OEKO-TEX Standard 100]
   Issued By:          [OEKO-TEX Association]
   Issue Date:         [2024-01-15]
   Expiry Date:        [2025-01-14]
   Scope:              [All textile products - Class I]

3. Click [Add Certificate]

✅ Certificate added automatically!
✅ Status calculated automatically!
✅ Alerts scheduled automatically!
```

---

## 🔍 **Search & Filter**

### **Search Bar:**
```
🔎 Search certificates...
```
Type: Certificate name, number, or issuing body

### **Filter Dropdowns:**
```
[Certificate Type ▼]  [Status ▼]
```

**Certificate Type Options:**
- All Types
- OEKO-TEX 100
- OEKO-TEX STeP
- GOTS, GRS, BCI
- BSCI, WRAP, SA8000
- ISO 9001, 14001, 45001
- Higg Index, SEDEX

**Status Options:**
- All Status
- Active ✅
- Expiring Soon ⚠️
- Expired 🔴
- Pending Renewal ⏳

---

## 🎨 **Color Coding**

| Color  | Meaning |
|--------|---------|
| 🟢 Green  | Active, Safe, >30 days |
| 🟡 Amber  | Expiring Soon, ≤30 days |
| 🔴 Red    | Expired, Critical |
| 🔵 Blue   | Pending, In Progress |
| 🟣 Purple | Primary Actions |

---

## 🔔 **Automatic Alerts**

The system automatically creates alerts:

**90 Days Before Expiry:**
```
ℹ️ Info Alert
"Certificate renewal due in 90 days"
```

**60 Days Before Expiry:**
```
⚠️ Warning Alert
"Certificate renewal due in 60 days"
```

**30 Days Before Expiry:**
```
🔴 High Priority Alert
"URGENT: Certificate renewal due in 30 days"
```

**After Expiry:**
```
🔴 Critical Alert
"Certificate EXPIRED - Immediate action required"
```

All alerts appear in:
- 🔔 Top-right notification bell
- 📊 Dashboard "Recent Alerts" section
- 📧 Email (if configured)

---

## 📱 **Mobile View**

On mobile devices:
- Single column layout
- Swipe to see more details
- Touch-friendly buttons
- All features accessible

---

## 🌙 **Dark Mode**

Toggle with moon/sun icon in top-right:
- All screens support dark mode
- Easy on eyes for night shifts
- Same functionality

---

## 💡 **Pro Tips**

1. **Use Grid View** for visual overview
2. **Use List View** to scan many certificates quickly
3. **Check Calendar Tab** every Monday
4. **Set reminders** 90 days before expiry
5. **Upload PDFs** immediately after receiving
6. **Track NCRs** until verified closure
7. **Review Audit History** before new audits

---

## 🆘 **Common Questions**

**Q: How do I know when a certificate is expiring?**
A: Check the Statistics cards at top - "Expiring Soon" shows count

**Q: Can I track multiple factories?**
A: Yes! Switch factories using top-right dropdown

**Q: What if I have a custom certificate type?**
A: Select "Other" when adding, and enter custom name

**Q: How do I renew a certificate?**
A: Click [Renew] button on certificate card

**Q: Can I upload the actual certificate PDF?**
A: Yes! (Feature ready, just needs file upload integration)

**Q: How do I close an NCR?**
A: Update status to "Closed" and add verification details

---

## 🎯 **Real Example Workflow**

**Scenario: OEKO-TEX certification expiring in 60 days**

1. **System automatically creates alert** ⚠️
2. **You see it in notification bell** 🔔
3. **Click "Renew" button** on certificate
4. **Contact TESTEX for renewal** 
5. **Schedule audit date**
6. **After audit, update certificate:**
   - New expiry date
   - New certificate number
   - Upload new PDF
7. **System logs in Renewal History** ✅
8. **Alert auto-dismissed** ✅

**Total time: 5 minutes** ⏱️

---

## ✅ **You're All Set!**

Now you can:
- ✅ Track all factory certificates
- ✅ Never miss a renewal
- ✅ Manage audit findings
- ✅ Close NCRs properly
- ✅ View compliance calendar
- ✅ Get automatic alerts
- ✅ Work on mobile
- ✅ Use dark mode

**Questions? Check COMPLIANCE_SYSTEM.md for detailed documentation!** 📚
