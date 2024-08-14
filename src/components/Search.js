import React, { useState } from 'react';
import data from '../pages/book/data'; // Ensure this path is correct

const Search = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      // Filter the data array based on the search term
      const results = data.data.filter(book =>
        book.title.toLowerCase().includes(term.toLowerCase())
      );
      onSearchResults(results);
    } else {
      onSearchResults([]);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default Search;
