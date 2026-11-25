import React, { useMemo, useState } from "react";

const phpMyAdminExport = [
  { type: "header", version: "5.2.1deb3", comment: "Export to JSON plugin for PHPMyAdmin" },
  { type: "database", name: "tomato220" },
  {
    type: "table",
    name: "category",
    database: "tomato220",
    data: [
      { id: "1", userid: "1001", category: "Code", favorite: "0", timestamp: "2017-12-20 18:04:32" },
      { id: "2", userid: "1001", category: "Norsk", favorite: "0", timestamp: "2017-12-20 18:04:32" },
      { id: "3", userid: "1001", category: "Study", favorite: "0", timestamp: "2017-12-20 18:05:17" },
      { id: "4", userid: "1001", category: "Health", favorite: "0", timestamp: "2017-12-20 18:05:17" },
      { id: "5", userid: "1001", category: "Guitar", favorite: "0", timestamp: "2017-12-20 18:06:29" },
      { id: "6", userid: "1001", category: "Task", favorite: "0", timestamp: "2017-12-20 18:06:29" },
      { id: "7", userid: "1001", category: "Exercise", favorite: "0", timestamp: "2017-12-20 18:09:06" },
      { id: "8", userid: "1001", category: "Drawing", favorite: "0", timestamp: "2017-12-20 18:09:06" },
      { id: "9", userid: "1001", category: "Design", favorite: "0", timestamp: "2017-12-20 18:09:26" },
      { id: "10", userid: "1001", category: "Writing", favorite: "0", timestamp: "2017-12-20 18:09:26" },
      { id: "14", userid: "1001", category: "Job Search", favorite: "0", timestamp: "2017-12-20 18:11:40" },
      { id: "20", userid: "1001", category: "Business", favorite: "0", timestamp: "2018-01-23 11:09:29" },
      { id: "22", userid: "1001", category: "NULL", favorite: "0", timestamp: "2018-10-22 14:40:39" },
      { id: "23", userid: "1001", category: "Kids", favorite: "1", timestamp: "2022-10-11 11:55:21" },
      { id: "24", userid: "1001", category: "Organize", favorite: "1", timestamp: "2023-07-29 14:08:11" },
      { id: "25", userid: "1001", category: "UX Scouts", favorite: "1", timestamp: "2023-11-14 23:24:02" },
      { id: "26", userid: "1001", category: "UX/UI", favorite: "1", timestamp: "2024-01-04 18:21:01" }
    ]
  }
];

function extractCategories(exportData) {
  const tableBlock = Array.isArray(exportData)
    ? exportData.find((item) => item.type === "table" && item.name === "category")
    : null;

  return Array.isArray(tableBlock?.data) ? tableBlock.data : [];
}

function formatCategoryLabel(categoryName) {
  return categoryName === "NULL" ? "Uncategorized (Deleted Category)" : categoryName;
}

export default function CategoryList({ onEditCategory, onDeleteCategory }) {
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const categories = useMemo(() => {
    const rawRows = extractCategories(phpMyAdminExport);

    return rawRows
      .filter((row) => Boolean(row.category))
      .filter((row) => (!favoritesOnly ? true : row.favorite === "1"));
  }, [favoritesOnly]);

  const handleEdit = (e, item) => {
    e.preventDefault();
    if (onEditCategory) {
      onEditCategory(item);
    } else {
      console.log("Edit category:", item);
    }
  };

  const handleDelete = (e, item) => {
    e.preventDefault();
    if (item.category === "NULL") return;

    if (onDeleteCategory) {
      onDeleteCategory(item);
    } else {
      console.log("Delete category (reassigning items to NULL):", item);
    }
  };

  return (
    <section style={{ maxWidth: "640px", margin: "2rem auto", padding: "0 1rem", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Categories</h1>
          <p style={{ margin: "0.25rem 0 0", color: "#555", fontSize: "0.9rem" }}>
            Showing {categories.length} {categories.length === 1 ? "category" : "categories"}
          </p>
        </div>

        <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={(e) => setFavoritesOnly(e.target.checked)}
          />
          Favorites only
        </label>
      </header>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
        {categories.map((item) => {
          const isFavorite = item.favorite === "1";
          const isDeletedSentinel = item.category === "NULL";

          return (
            <li
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "0.75rem 1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: isFavorite ? "#fffdf5" : isDeletedSentinel ? "#f8fafc" : "#fff"
              }}
            >
              <div>
                <strong>{formatCategoryLabel(item.category)}</strong>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  ID #{item.id} • Raw value: {item.category} • {item.timestamp}
                </div>
                <div style={{ marginTop: "0.35rem", display: "flex", gap: "0.75rem", fontSize: "0.85rem" }}>
                  <a
                    href={`#edit-${item.id}`}
                    onClick={(e) => handleEdit(e, item)}
                    style={{ color: "#2563eb", textDecoration: "none" }}
                  >
                    Edit
                  </a>
                  {!isDeletedSentinel && (
                    <a
                      href={`#delete-${item.id}`}
                      onClick={(e) => handleDelete(e, item)}
                      style={{ color: "#dc2626", textDecoration: "none" }}
                    >
                      Delete
                    </a>
                  )}
                </div>
              </div>

              {isFavorite && (
                <span
                  aria-label="Favorite"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "999px",
                    backgroundColor: "#fef08a",
                    color: "#713f12"
                  }}
                >
                  ★ Favorite
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}