// src/components/SearchBar.jsx
export default function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search contacts..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-input"
    />
  );
}
