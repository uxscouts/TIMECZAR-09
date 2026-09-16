import React, { useState, useMemo } from 'react';
// Import your raw JSON exports directly
import phpMyAdminExport from '../data/tomato.json';
import rawCategories from '../data/category.json';

function TomatoDashboard({ userId = 1001 }) {
  const [filters, setFilters] = useState({
    title: '',
    notes: '',
    count: '',
    date: '',
    week: '',
    url: '',
    category: ''
  });

  // 1. EXTRACT THE REAL DATA: Look down inside phpMyAdmin's wrapper structure
  // This safely targets index 2 where the 'data' array lives
  const rawTomatoes = phpMyAdminExport[2]?.data || [];

  const processedTomatoes = useMemo(() => {
    // 2. Filter through the extraction array
    const filtered = rawTomatoes.filter(t => {
      // Rule A: Match user ID (Note: database values are strings like "1001")
      if (Number(t.userid) !== Number(userId)) return false;

      // Rule B: Title Filter
      if (filters.title) {
        const titleStr = t.title || '';
        if (!titleStr.toLowerCase().includes(filters.title.toLowerCase().trim())) {
          return false;
        }
      }

      // Rule C: Notes Filter
      if (filters.notes) {
        const notesStr = t.notes || '';
        if (!notesStr.toLowerCase().includes(filters.notes.toLowerCase().trim())) {
          return false;
        }
      }

      // Rule D: Count Filter
      if (filters.count && Number(t.count) !== Number(filters.count)) {
        return false;
      }

      // Rule E: Date Filter
      if (filters.date && t.tomdate !== filters.date) {
        return false;
      }

      // Rule F: Week Filter
      if (filters.week && t.tomweek?.trim() !== filters.week.trim()) {
        return false;
      }

      // Rule G: URL Filter (Fixed: mapped to uppercase database key 'URL')
      if (filters.url) {
        const urlStr = t.URL || ''; // 'URL' matches your JSON exactly
        if (!urlStr.toLowerCase().includes(filters.url.toLowerCase().trim())) {
          return false;
        }
      }

      // Rule H: Category Filter
      if (filters.category && Number(t.category) !== Number(filters.category)) {
        return false;
      }

      return true;
    });

    // 3. Map/Join Room (LEFT JOIN category_name & calculate hours)
    const joined = filtered.map(t => {
      // Accessing standard categories schema layout
      const categoryArray = rawCategories[2]?.data || rawCategories;
      const match = categoryArray.find(c => Number(c.id) === Number(t.category));
      
      return {
        ...t,
        category_name: match ? match.category : 'Uncategorized',
        hours: (parseFloat(t.count) || 0) / 2 
      };
    });

    // 4. Sort Room (ORDER BY tomdate DESC, id DESC)
    return joined.sort((a, b) => {
      const dateCompare = (b.tomdate || '').localeCompare(a.tomdate || '');
      if (dateCompare !== 0) return dateCompare;
      return Number(b.id) - Number(a.id);
    });

  }, [filters, userId, rawTomatoes]);

  return (
    <div>
      <h3>🍅 Pomodoro Log ({processedTomatoes.length} found)</h3>
      {/* Your table code goes here! */}
    </div>
  );
}

export default TomatoDashboard;