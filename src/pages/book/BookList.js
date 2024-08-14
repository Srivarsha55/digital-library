import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './BookList.css';
import Card from './Card';

const BookList = ({ category, sortOption, userMembership }) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get('search') || '';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books/getall'); 
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };

    fetchBooks();
  }, []);

  let filteredBooks = category === 'all'
    ? books
    : books.filter(book => book.categories.includes(category));

  if (searchTerm) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOption === 'title') {
    filteredBooks = filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'year') {
    filteredBooks = filteredBooks.sort((a, b) => a.year - b.year);
  } else if (sortOption === 'featured') {
    filteredBooks = filteredBooks.sort((a, b) => b.rating - a.rating);
  }

  const handleViewClick = (book) => {
    if (
      (book.membership === 'premium' && userMembership !== 'premium') ||
      (book.membership === 'basic' && userMembership === 'free')
    ) {
      navigate('/membership', { state: { requiredMembership: book.membership } });
    } else {
      navigate(`/book/${book.id}`);
    }
  };

  const handleAddToLibrary = (book) => {
    console.log(`Adding ${book.title} to the library`);

    const savedLibrary = JSON.parse(localStorage.getItem('library')) || [];
    if (!savedLibrary.find(item => item.title === book.title)) {
  
      const updatedLibrary = [...savedLibrary, book];
      localStorage.setItem('library', JSON.stringify(updatedLibrary));
    }
    navigate('/library');
  };

  return (
    <div className="book-list">
      {filteredBooks.map((book, index) => (
        <Card
          key={index}
          book={book}
          onViewClick={() => handleViewClick(book)}
          onAddToLibrary={handleAddToLibrary}
        />
      ))}
    </div>
  );
};

export default BookList;
