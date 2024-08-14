import React, { useState } from 'react';
import './BookBar.css';
import BookList from './BookList';

const BookBar = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOption, setSortOption] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleFilterClick = (event, group) => {
    event.preventDefault();
    setActiveFilter(group);
    if (group !== 'classic') {
      setSelectedGenre('');
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div>
      <header id="header" className={`page-header ${activeFilter === 'classic' ? 'vintage-theme' : ''}`}>
        <div className="page-header-container row">
          <div className="toolbar row">
            <div className="filter-options small-12 medium-8 columns">
              {['all', 'fantasy', 'sci-fi', 'classic', 'fairy', 'young', 'mystery', 'Language'].map((group) => (
                <a
                  href="#"
                  key={group}
                  className={`filter-item ${activeFilter === group ? 'active' : ''}`}
                  data-group={group}
                  onClick={(e) => handleFilterClick(e, group)}
                >
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </a>
              ))}
            </div>
            <div className="small-12 medium-4 columns">
              <select className="sort-options" value={sortOption} onChange={handleSortChange}>
                <option value="" disabled>Sort by</option>
                <option value="featured">Featured</option>
                <option value="title">Alphabetical</option>
                <option value="year">Published</option>
              </select>
              {activeFilter === 'classic' && (
                <select className="genre-options" value={selectedGenre} onChange={handleGenreChange}>
                  <option value="">Select Genre</option>
                  <option value="vintage">Vintage</option>
                  <option value="modern">Modern</option>
                  <option value="retro">Retro</option>
                  <option value="classic">Classic</option>
                </select>
              )}
            </div>
          </div>
        </div>
      </header>
      <BookList category={activeFilter} sortOption={sortOption} genre={selectedGenre} />
    </div>
  );
};

export default BookBar;
