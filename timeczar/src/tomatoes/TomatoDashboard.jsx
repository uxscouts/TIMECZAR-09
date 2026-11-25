import React, { useMemo, useState } from "react";

const CATEGORY_MAP = {
  "1": "Code",
  "2": "Norsk",
  "3": "Study",
  "4": "Health",
  "5": "Guitar",
  "6": "Task",
  "14": "Job Search",
  "20": "Business",
  "22": "Uncategorized (Deleted Category)"
};

// Anchored to Sunday, Nov 22, 2026 so Day, Week, Month, and 3-Month views all have live data
const REFERENCE_TODAY = "2026-11-22";

const shiftedTomatoExport = [
  { type: "header", version: "5.2.1deb3", comment: "Export to JSON plugin for PHPMyAdmin" },
  { type: "database", name: "tomato220" },
  {
    type: "table",
    name: "tomato",
    database: "tomato220",
    data: [
      // --- TODAY (Sunday, 2026-11-22) ---
      { id: "1", userid: "1001", title: "work on tomato220 tomato 1", tomdate: "2026-11-22", count: "4", category: "1", notes: "work on tomato220 tomato 1", URL: null, nowstamp: "2026-11-22 08:42:42" },
      { id: "11", userid: "1001", title: "play all my guitars", tomdate: "2026-11-22", count: "2", category: "5", notes: "play all my guitars", URL: null, nowstamp: "2026-11-22 09:52:45" },
      { id: "16", userid: "1001", title: "Read technical description of access2online.", tomdate: "2026-11-22", count: "1", category: "1", notes: "Read technical description of access2online.", URL: null, nowstamp: "2026-11-22 10:16:13" },
      { id: "26", userid: "1001", title: "fullstack cousera class 1 angular week 1", tomdate: "2026-11-22", count: "2", category: "3", notes: "fullstack cousera class 1 angular week 1", URL: null, nowstamp: "2026-11-22 11:17:38" },

      // --- EARLIER THIS WEEK (Mon 2026-11-16 through Sat 2026-11-21) ---
      { id: "17", userid: "1001", title: "Remake SQL so daily and weekly view access Tomato220 database", tomdate: "2026-11-16", count: "3", category: "1", notes: "Remake SQL so daily and weekly view access Tomato220 database", URL: null, nowstamp: "2026-11-16 12:42:33" },
      { id: "18", userid: "1001", title: "Create new github for Tomato220", tomdate: "2026-11-16", count: "2", category: "1", notes: "Create new github for Tomato220", URL: null, nowstamp: "2026-11-16 13:04:36" },
      { id: "20", userid: "1001", title: "Rebuild Changed Today with new database schema", tomdate: "2026-11-17", count: "4", category: "1", notes: "Rebuild Changed Today with new database schema", URL: null, nowstamp: "2026-11-17 11:25:18" },
      { id: "43", userid: "1001", title: "Karense For eller Fordi", tomdate: "2026-11-17", count: "2", category: "2", notes: "Karense For eller Fordi", URL: "https://www.youtube.com/watch?v=_bSBbJk0CKM", nowstamp: "2026-11-17 15:16:02" },
      { id: "24", userid: "1001", title: "Create tooltip for notes", tomdate: "2026-11-18", count: "2", category: "1", notes: "Create tooltip for notes", URL: null, nowstamp: "2026-11-18 17:53:34" },
      { id: "35", userid: "1001", title: "wash clothes organize clothes into separate travel bags for cycling", tomdate: "2026-11-18", count: "2", category: "6", notes: "wash clothes organize clothes into separate travel bags for cycling", URL: null, nowstamp: "2026-11-18 10:57:52" },
      { id: "40", userid: "1001", title: "Rebuild code on Vets page for mobile devices", tomdate: "2026-11-19", count: "4", category: "1", notes: "Rebuild code on Vets page to function correctly when viewed by mobile device.", URL: "http://dyrehospital.com/veterinaerer/", nowstamp: "2026-11-19 13:59:07" },
      { id: "47", userid: "1001", title: "Listen and Repeat Kapital 5 Stein Pa Stein Fra Iran", tomdate: "2026-11-19", count: "2", category: "2", notes: "Listen and Repeat Kapital 5 Stein Pa Stein Fra Iran", URL: "URL", nowstamp: "2026-11-19 16:12:02" },
      { id: "41", userid: "1001", title: "Replace broken spoke on rear wheel", tomdate: "2026-11-20", count: "2", category: "6", notes: "Replace broken spoke on rear wheel", URL: null, nowstamp: "2026-11-20 14:02:51" },
      { id: "95", userid: "1001", title: "Create invoice for Halvard Dyrehospital with google spreadsheet", tomdate: "2026-11-20", count: "2", category: "20", notes: "Create invoice for Halvard Dyrehospital", URL: null, nowstamp: "2026-11-20 16:00:00" },
      { id: "96", userid: "1001", title: "Play freestyle major scales and flat picking bar chords", tomdate: "2026-11-21", count: "3", category: "5", notes: "Play freestyle major scales and flat picking bar chords with fixed finger and alternate picking.", URL: "URL", nowstamp: "2026-11-21 11:17:07" },
      { id: "93", userid: "1001", title: "work on frisor alternative build of full stack class", tomdate: "2026-11-21", count: "4", category: "3", notes: "Learn how to use npm uninstall --save", URL: "http://localhost:4200/", nowstamp: "2026-11-21 18:42:44" },

      // --- EARLIER THIS MONTH (Nov 1 – Nov 15, 2026) ---
      { id: "58", userid: "1001", title: "Put hydraulic calipers on Frankenbike", tomdate: "2026-11-03", count: "3", category: "6", notes: "Put hydraulic calipers on Frankenbike", URL: "URL", nowstamp: "2026-11-03 11:37:00" },
      { id: "66", userid: "1001", title: "Norsk teacher Karense langsomt", tomdate: "2026-11-05", count: "4", category: "2", notes: "Norsk teacher Karense langsomt", URL: "https://www.youtube.com/watch?v=aaKiFyndjIk", nowstamp: "2026-11-05 12:47:07" },
      { id: "70", userid: "1001", title: "Fullstack week 2 components 1 assignment", tomdate: "2026-11-08", count: "5", category: "3", notes: "Fullstack week 2 relearn components and do components 1 assignment", URL: null, nowstamp: "2026-11-08 14:00:00" },
      { id: "83", userid: "1001", title: "Installed popup and accordion plugins in wordpress", tomdate: "2026-11-11", count: "6", category: "1", notes: "Installed three different pop up plugins and two accordion plugins", URL: null, nowstamp: "2026-11-11 19:35:38" },
      { id: "89", userid: "1001", title: "Apply for job at Robinapp.no", tomdate: "2026-11-13", count: "2", category: "14", notes: "Apply for job at Robinapp.no", URL: "http://robinapp.no/karriere/", nowstamp: "2026-11-13 14:02:57" },
      { id: "102", userid: "1001", title: "Billing paperwork and invoice creation", tomdate: "2026-11-14", count: "4", category: "20", notes: "Billing paperwork and invoice creation google spreadsheet.", URL: "URL", nowstamp: "2026-11-14 10:37:32" },

      // --- PREVIOUS 2 MONTHS IN 3-MONTH WINDOW (Sept & Oct 2026) ---
      { id: "88", userid: "1001", title: "Sign up for shifts and read employee notification", tomdate: "2026-10-18", count: "5", category: "4", notes: "Sign up for shifts and read employee notification", URL: "URL", nowstamp: "2026-10-18 14:00:50" },
      { id: "94", userid: "1001", title: "Bizware SSL FTP and PHPMyAdmin test table", tomdate: "2026-10-10", count: "10", category: "1", notes: "Create test table on bizware PHPMyAdmin", URL: null, nowstamp: "2026-10-10 13:25:23" },
      { id: "98", userid: "1001", title: "Studied Norwegian flash cards", tomdate: "2026-10-04", count: "6", category: "2", notes: "Studied flash cards.", URL: "URL", nowstamp: "2026-10-04 09:22:31" },
      { id: "77", userid: "1001", title: "Create flash cards for kapital 5", tomdate: "2026-09-22", count: "8", category: "2", notes: "Create flash cards for kapital 5", URL: "URL", nowstamp: "2026-09-22 11:56:18" },
      { id: "85", userid: "1001", title: "Vet texts, assistants, and Google Map on homepage", tomdate: "2026-09-14", count: "9", category: "1", notes: "Completed configuring content and css styles.", URL: null, nowstamp: "2026-09-14 10:07:17" },
      { id: "104", userid: "1001", title: "Legacy archived task from deleted category", tomdate: "2026-09-05", count: "4", category: "22", notes: "Reassigned to NULL sentinel category", URL: null, nowstamp: "2026-09-05 09:15:00" }
    ]
  }
];

const WEEKDAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function parseLocalDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatIsoDate(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getMondayOfWeek(dateObj) {
  const copy = new Date(dateObj);
  const day = copy.getDay(); // 0 = Sun, 1 = Mon, ...
  const diffToMonday = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diffToMonday);
  return copy;
}

function sumCounts(rows) {
  return rows.reduce((total, row) => total + (Number(row.count) || 0), 0);
}

function groupTotalsByCategory(rows) {
  const map = new Map();
  rows.forEach((row) => {
    const key = row.category || "22";
    const prev = map.get(key) || { categoryId: key, label: CATEGORY_MAP[key] || `Category #${key}`, count: 0, entries: 0 };
    prev.count += Number(row.count) || 0;
    prev.entries += 1;
    map.set(key, prev);
  });
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export default function TomatoDashboard() {
  const [activeTab, setActiveTab] = useState("today");

  const allTomatoes = useMemo(() => {
    const table = shiftedTomatoExport.find((item) => item.type === "table" && item.name === "tomato");
    return Array.isArray(table?.data) ? table.data : [];
  }, []);

  const views = useMemo(() => {
    const todayDate = parseLocalDate(REFERENCE_TODAY);
    const mondayDate = getMondayOfWeek(todayDate);
    const sundayDate = new Date(mondayDate);
    sundayDate.setDate(mondayDate.getDate() + 6);

    const mondayIso = formatIsoDate(mondayDate);
    const sundayIso = formatIsoDate(sundayDate);
    const currentMonthPrefix = REFERENCE_TODAY.slice(0, 7); // "2026-11"

    // 3-month window: current month + 2 preceding months (2026-09-01 through 2026-11-30)
    const threeMonthStart = new Date(todayDate.getFullYear(), todayDate.getMonth() - 2, 1);
    const threeMonthStartIso = formatIsoDate(threeMonthStart);

    const todayRows = allTomatoes.filter((t) => t.tomdate === REFERENCE_TODAY);
    const weekRows = allTomatoes.filter((t) => t.tomdate >= mondayIso && t.tomdate <= sundayIso);
    const monthRows = allTomatoes.filter((t) => t.tomdate.startsWith(currentMonthPrefix));
    const threeMonthRows = allTomatoes.filter((t) => t.tomdate >= threeMonthStartIso && t.tomdate <= REFERENCE_TODAY);

    // Build Monday -> Sunday buckets for "This Week"
    const daysOfWeek = WEEKDAY_NAMES.map((dayName, idx) => {
      const d = new Date(mondayDate);
      d.setDate(mondayDate.getDate() + idx);
      const iso = formatIsoDate(d);
      const entries = weekRows.filter((t) => t.tomdate === iso);
      return {
        dayName,
        iso,
        isToday: iso === REFERENCE_TODAY,
        entries,
        total: sumCounts(entries)
      };
    });

    // Build monthly breakdown inside the 3-month window
    const monthBucketsMap = new Map();
    threeMonthRows.forEach((row) => {
      const monthKey = row.tomdate.slice(0, 7);
      const prev = monthBucketsMap.get(monthKey) || { month: monthKey, total: 0, entries: 0 };
      prev.total += Number(row.count) || 0;
      prev.entries += 1;
      monthBucketsMap.set(monthKey, prev);
    });
    const threeMonthByMonth = Array.from(monthBucketsMap.values()).sort((a, b) => a.month.localeCompare(b.month));

    return {
      todayRows,
      weekRows,
      daysOfWeek,
      monthRows,
      threeMonthRows,
      threeMonthByMonth,
      mondayIso,
      sundayIso
    };
  }, [allTomatoes]);

  const tabButtonStyle = (tabKey) => ({
    padding: "0.5rem 0.9rem",
    borderRadius: "6px",
    border: activeTab === tabKey ? "1px solid #b91c1c" : "1px solid #ddd",
    backgroundColor: activeTab === tabKey ? "#fef2f2" : "#fff",
    color: activeTab === tabKey ? "#991b1b" : "#333",
    fontWeight: activeTab === tabKey ? 600 : 400,
    cursor: "pointer"
  });

  return (
    <section style={{ maxWidth: "780px", margin: "2rem auto", padding: "0 1rem", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: "1.25rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Tomatoes Overview</h1>
        <p style={{ margin: "0.25rem 0 0", color: "#555", fontSize: "0.9rem" }}>
          Reference Today: <strong>{REFERENCE_TODAY}</strong> (Sunday)
        </p>

        {/* Summary Strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem", marginTop: "1rem" }}>
          <div style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            <div style={{ fontSize: "0.75rem", color: "#666" }}>Today</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "#b91c1c" }}>{sumCounts(views.todayRows)}</div>
          </div>
          <div style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            <div style={{ fontSize: "0.75rem", color: "#666" }}>This Week</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700 }}>{sumCounts(views.weekRows)}</div>
          </div>
          <div style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            <div style={{ fontSize: "0.75rem", color: "#666" }}>This Month</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700 }}>{sumCounts(views.monthRows)}</div>
          </div>
          <div style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            <div style={{ fontSize: "0.75rem", color: "#666" }}>3-Month Total</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700 }}>{sumCounts(views.threeMonthRows)}</div>
          </div>
        </div>

        {/* View Switcher */}
        <nav style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
          <button type="button" style={tabButtonStyle("today")} onClick={() => setActiveTab("today")}>
            Day (Today)
          </button>
          <button type="button" style={tabButtonStyle("week")} onClick={() => setActiveTab("week")}>
            Week (Days of Week)
          </button>
          <button type="button" style={tabButtonStyle("month")} onClick={() => setActiveTab("month")}>
            Month Totals
          </button>
          <button type="button" style={tabButtonStyle("threeMonth")} onClick={() => setActiveTab("threeMonth")}>
            3-Month Totals
          </button>
        </nav>
      </header>

      {/* 1. DAY VIEW (TODAY) */}
      {activeTab === "today" && (
        <div>
          <h2 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>
            Today — {REFERENCE_TODAY} ({sumCounts(views.todayRows)} tomatoes)
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
            {views.todayRows.map((item) => (
              <li key={item.id} style={{ padding: "0.75rem 1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{item.title}</strong>
                  <span style={{ fontWeight: 600, color: "#b91c1c" }}>{item.count} 🍅</span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.2rem" }}>
                  {CATEGORY_MAP[item.category] || `Category #${item.category}`} • Logged {item.nowstamp}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 2. WEEK VIEW (DAYS OF WEEK) */}
      {activeTab === "week" && (
        <div>
          <h2 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>
            This Week ({views.mondayIso} to {views.sundayIso}) — {sumCounts(views.weekRows)} tomatoes
          </h2>
          <div style={{ display: "grid", gap: "0.6rem" }}>
            {views.daysOfWeek.map((day) => (
              <div
                key={day.iso}
                style={{
                  padding: "0.75rem 1rem",
                  border: day.isToday ? "1px solid #b91c1c" : "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: day.isToday ? "#fffafa" : "#fff"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>
                    {day.dayName} ({day.iso}) {day.isToday ? "• Today" : ""}
                  </strong>
                  <span style={{ fontWeight: 700, color: day.total > 0 ? "#b91c1c" : "#888" }}>
                    {day.total} {day.total === 1 ? "tomato" : "tomatoes"}
                  </span>
                </div>
                {day.entries.length > 0 && (
                  <ul style={{ margin: "0.4rem 0 0", paddingLeft: "1.1rem", fontSize: "0.85rem", color: "#444" }}>
                    {day.entries.map((entry) => (
                      <li key={entry.id}>
                        {entry.title} ({CATEGORY_MAP[entry.category]}) — <strong>{entry.count}</strong>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MONTH TOTALS VIEW */}
      {activeTab === "month" && (
        <div>
          <h2 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>
            This Month ({REFERENCE_TODAY.slice(0, 7)}) — {sumCounts(views.monthRows)} tomatoes across {views.monthRows.length} entries
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
            {groupTotalsByCategory(views.monthRows).map((cat) => (
              <li
                key={cat.categoryId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px"
                }}
              >
                <div>
                  <strong>{cat.label}</strong>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>{cat.entries} logged sessions</div>
                </div>
                <span style={{ fontWeight: 700, color: "#b91c1c" }}>{cat.count} tomatoes</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 4. 3-MONTH TOTALS VIEW */}
      {activeTab === "threeMonth" && (
        <div>
          <h2 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>
            Last 3 Months — {sumCounts(views.threeMonthRows)} tomatoes across {views.threeMonthRows.length} entries
          </h2>

          <h3 style={{ fontSize: "0.95rem", color: "#444", marginBottom: "0.5rem" }}>By Month</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem", marginBottom: "1rem" }}>
            {views.threeMonthByMonth.map((m) => (
              <div key={m.month} style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}>
                <div style={{ fontWeight: 600 }}>{m.month}</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#b91c1c" }}>{m.total} 🍅</div>
                <div style={{ fontSize: "0.78rem", color: "#666" }}>{m.entries} sessions</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: "0.95rem", color: "#444", marginBottom: "0.5rem" }}>By Category (3-Month Combined)</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
            {groupTotalsByCategory(views.threeMonthRows).map((cat) => (
              <li
                key={cat.categoryId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px"
                }}
              >
                <div>
                  <strong>{cat.label}</strong>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>{cat.entries} logged sessions</div>
                </div>
                <span style={{ fontWeight: 700, color: "#b91c1c" }}>{cat.count} tomatoes</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}