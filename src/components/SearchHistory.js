import React from "react";
import "./SearchHistory.css";

function SearchHistory({ history = [], onSelect, onRemove }) {
  if (!history.length) return null;

  return (
    <div className="search-history">
      <h3>Recent Searches</h3>
      <ul>
        {history.map((city) => (
          <li key={city} className="history-item">
            <button
              className="history-city"
              onClick={() => onSelect(city)}
            >
              {city}
            </button>
            <button
              className="remove-button"
              onClick={() => onRemove(city)}
              aria-label={`Remove ${city}`}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
